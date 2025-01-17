import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { PrivateKeyConnector } from "../lib/private-key-connector";
import { INFURA_ID } from "../lib/constants";

export const privateKeyConnector = new PrivateKeyConnector({
  supportedChainIds: [42],
});

export const supportedChainIds = [
  ...Array.from(Array(1000).keys()),
  1337,
  42161,
  43114,
  8217,
  42220,
  42262,
  32659,
  1284,
  4689,
  10000,
  333999,
  1313161554,
  1666600000,
];

export const injectedConnector = new InjectedConnector({
  supportedChainIds,
});

export const walletConnectConnector = new WalletConnectConnector({
  supportedChainIds,
  rpc: {
    1: `https://mainnet.infura.io/v3/${INFURA_ID}`,
    3: `https://ropsten.infura.io/v3/${INFURA_ID}`,
    4: `https://rinkeby.infura.io/v3/${INFURA_ID}`,
    5: `https://goerli.infura.io/v3/${INFURA_ID}`,
    42: `https://kovan.infura.io/v3/${INFURA_ID}`,
    1337: ``,
  },
  qrcode: true,
});
