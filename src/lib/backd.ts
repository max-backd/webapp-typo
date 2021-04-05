import contracts from "@backdfund/protocol/build/deployments/map.json";
import { Controller } from "@backdfund/protocol/typechain/Controller";
import { ControllerFactory } from "@backdfund/protocol/typechain/ControllerFactory";
import { Eip20InterfaceFactory } from "@backdfund/protocol/typechain/Eip20InterfaceFactory";
import { LiquidityPoolFactory } from "@backdfund/protocol/typechain/LiquidityPoolFactory";
import { ContractTransaction, providers, Signer } from "ethers";
import { getPrices } from "./coingecko";
import { bigNumberToFloat, floatToBigNumber, scale } from "./numeric";
import {
  Address,
  AllowanceQuery,
  Balances,
  Pool,
  Position,
  Prices,
  Token,
  transformPool,
} from "./types";

export type BackdOptions = {
  chainId: number;
};

export interface Backd {
  currentAccount(): Promise<Address>;
  listPools(): Promise<Pool[]>;
  getPositions(pool: Address): Promise<Position[]>;
  getBalance(address: Address, account?: Address): Promise<number>;
  getBalances(addresses: Address[], account?: Address): Promise<Balances>;
  getAllowance(token: Token, spender: Address, account?: string): Promise<number>;
  getAllowances(queries: AllowanceQuery[]): Promise<Record<string, Balances>>;
  getPrices(symbol: string[]): Promise<Prices>;
  approve(token: Token, spender: Address, amount: number): Promise<ContractTransaction>;
  deposit(poolAddress: Address, amount: number): Promise<ContractTransaction>;
  provider: providers.Provider;
}

export class Web3Backd implements Backd {
  private controller: Controller;

  constructor(private _provider: Signer | providers.Provider, private options: BackdOptions) {
    const contracts = this.getContracts(options.chainId);

    this.controller = ControllerFactory.connect(contracts["Controller"][0], _provider);
  }

  get provider(): providers.Provider {
    const provider = this._provider;
    if (provider instanceof Signer) {
      return provider.provider!!;
    }
    return provider;
  }

  private getContracts(chainId: number): Record<string, string[]> {
    switch (chainId) {
      case 1337:
        return contracts["1337"];
      default:
        throw new Error("Wrong network selected, please use a development network");
    }
  }

  currentAccount(): Promise<string> {
    const signer = this._provider;
    if (signer instanceof Signer) {
      return signer.getAddress();
    }
    return Promise.resolve("");
  }

  async listPools(): Promise<Pool[]> {
    const markets = await this.controller.allMarkets();
    return Promise.all(markets.map((v) => this.getPoolInfo(v)));
  }

  async getTokenInfo(tokenAddress: Address): Promise<Token> {
    const token = Eip20InterfaceFactory.connect(tokenAddress, this._provider);
    const [name, symbol, decimals] = await Promise.all([
      token.name(),
      token.symbol(),
      token.decimals(),
    ]);
    return { address: tokenAddress, name, symbol, decimals };
  }

  private async getPoolInfo(address: Address): Promise<Pool> {
    const pool = LiquidityPoolFactory.connect(address, this._provider);
    const [
      name,
      lpTokenAddress,
      underlyingAddress,
      totalAssets,
      rawApy,
      exchangeRate,
    ] = await Promise.all([
      pool.name(),
      pool.getLpToken(),
      pool.getUnderlying(),
      pool.totalUnderlying(),
      pool.computeAPY(),
      pool.currentExchangeRate(),
    ]);
    const [lpToken, underlying] = await Promise.all([
      this.getTokenInfo(lpTokenAddress),
      this.getTokenInfo(underlyingAddress),
    ]);
    const apy = rawApy.sub(scale(1));

    const rawPool = {
      name,
      underlying,
      lpToken,
      apy,
      address,
      totalAssets,
      exchangeRate,
    };
    return transformPool(rawPool, bigNumberToFloat);
  }

  async getPositions(pool: string): Promise<Position[]> {
    return [];
  }

  async getAllowance(token: Token, spender: Address, account?: string): Promise<number> {
    const tokenContract = Eip20InterfaceFactory.connect(token.address, this._provider);
    if (!account) {
      account = await this.currentAccount();
    }
    const rawAllowance = await tokenContract.allowance(account, spender);
    return bigNumberToFloat(rawAllowance, token.decimals);
  }

  async getAllowances(queries: AllowanceQuery[]): Promise<Record<string, Balances>> {
    const allowances = await Promise.all(
      queries.map((q) => this.getAllowance(q.token, q.spender, q.onBehalfOf))
    );
    const result: Record<string, Balances> = {};
    queries.forEach((query, index) => {
      if (!result[query.token.address]) {
        result[query.token.address] = {};
      }
      result[query.token.address][query.spender] = allowances[index];
    });
    return result;
  }

  async approve(token: Token, spender: Address, amount: number): Promise<ContractTransaction> {
    const tokenContract = Eip20InterfaceFactory.connect(token.address, this._provider);
    const scaledAmount = floatToBigNumber(amount, token.decimals);
    return tokenContract.approve(spender, scaledAmount);
  }

  async deposit(pool: Address, amount: number): Promise<ContractTransaction> {
    const poolContract = LiquidityPoolFactory.connect(pool, this._provider);
    const scaledAmount = floatToBigNumber(amount);
    return poolContract.deposit(scaledAmount);
  }

  async getBalance(address: string, account?: string): Promise<number> {
    const token = Eip20InterfaceFactory.connect(address, this._provider);
    if (!account) {
      account = await this.currentAccount();
    }
    const rawBalance = await token.balanceOf(account);
    return bigNumberToFloat(rawBalance);
  }

  async getBalances(addresses: string[], account?: string): Promise<Balances> {
    const promises = addresses.map((a) => this.getBalance(a, account));
    const balances = await Promise.all(promises);
    return Object.fromEntries(addresses.map((a, i) => [a, balances[i]]));
  }

  async getPrices(symbols: string[]): Promise<Prices> {
    return getPrices(symbols);
  }
}
