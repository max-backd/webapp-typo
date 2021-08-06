import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { ethers } from "ethers";

import { useBackd } from "../../app/hooks/use-backd";
import Dropdown from "../../components/Dropdown";
import Button from "../../components/Button";
import { approve, selectBalance, selectToupAllowance } from "../../state/userSlice";
import { Pool } from "../../lib";
import { Position } from "../../lib/types";
import NewPositionConfirmation from "./NewPositionConfirmation";
import NewPositionInput from "./NewPositionInput";
import { AppDispatch } from "../../app/store";
import { selectPositions } from "../../state/positionsSlice";
import { TokenValue } from "../../lib/token-value";
import { INFINITE_APPROVE_AMMOUNT } from "../../lib/constants";
import { useDevice } from "../../app/hooks/use-device";

const Border = styled.div`
  width: 100%;
  background: linear-gradient(to right, #c532f9 1%, #32b2e5 101%);
  margin-top: 0.6rem;
  padding: 1px;

  border-radius: 1.3rem;
  @media (max-width: 600px) {
    border-radius: 0;
  }
`;

const StyledNewPosition = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to right, #451467, #173d63);

  padding: 0.9rem 2rem;
  border-radius: 1.2rem;
  @media (max-width: 600px) {
    align-items: center;
    justify-content: center;
    padding: 0 1.6rem;
    height: 3.8rem;
    border-radius: 0;
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  > div:last-child {
    justify-content: flex-end;
  }
`;

const ErrorSpacing = styled.div`
  height: 2.8rem;
`;

export const Value = styled.div`
  flex: 1;
  font-weight: 400;
  font-size: 1.4rem;
  letter-spacing: 0.15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

interface Props {
  pool: Pool;
}

const NewPosition = ({ pool }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const backd = useBackd();
  const { isMobile } = useDevice();
  const allowance = useSelector(selectToupAllowance(backd, pool));
  const balance = useSelector(selectBalance(pool));
  const positions = useSelector(selectPositions);

  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [protocol, setProtocol] = useState("");
  const [address, setAddress] = useState("");
  const [threshold, setThreshold] = useState("");
  const [single, setSingle] = useState("");
  const [max, setMax] = useState("");

  const approved = allowance.gte(TokenValue.fromUnscaled(max, pool.underlying.decimals));

  const addressError = () => {
    if (!address) return "";
    if (!ethers.utils.isAddress(address)) return "Invalid Address";
    if (
      protocol &&
      positions.filter(
        (position: Position) => position.protocol === protocol && position.account === address
      ).length > 0
    )
      return "Max of one position per protocol and address";
    return "";
  };

  const thresholdError = () => {
    if (!threshold) return "";
    const number = Number(threshold);
    if (number <= 1) return "Must be above 1";
    return "";
  };

  const singleError = () => {
    if (!single) return "";
    try {
      const number = TokenValue.fromUnscaled(single, pool.underlying.decimals);
      if (number.isZero()) return "Must be positive number";
      const maxNumber = TokenValue.fromUnscaled(max, pool.underlying.decimals);
      if (max && number.gt(maxNumber)) return "Must be less than max top up";
      return "";
    } catch {
      return "Invalid number";
    }
  };

  const maxError = () => {
    if (!max) return "";
    try {
      const number = TokenValue.fromUnscaled(max, pool.underlying.decimals);
      if (number.isNegative()) return "Must be positive number";
      if (number.gt(balance)) return "Exceeds deposited balance";
      return "";
    } catch {
      return "Invalid number";
    }
  };

  const hasError = !!(addressError() || thresholdError() || singleError() || maxError());

  const position: Position = {
    protocol,
    account: address,
    threshold: Number(threshold),
    singleTopUp: TokenValue.fromUnscaled(single, pool.underlying.decimals),
    maxTopUp: TokenValue.fromUnscaled(max, pool.underlying.decimals),
    maxGasPrice: 0,
    actionToken: pool.underlying.address,
    depositToken: pool.lpToken.address,
  };

  const buttonHoverText = () => {
    if (!protocol) return "Select Protocol";
    if (!address) return "Enter Address";
    if (!threshold) return "Enter Threshold";
    if (!single) return "Enter Single Top Up";
    if (!max) return "Enter Max Top Up";
    return "";
  };

  const executeApprove = () => {
    if (!backd) return;
    setLoading(true);
    const approveArgs = {
      amount: TokenValue.fromUnscaled(INFINITE_APPROVE_AMMOUNT, pool.underlying.decimals),
      backd,
      spender: backd.topupActionAddress,
      token: pool.lpToken,
    };
    dispatch(approve(approveArgs)).then(() => {
      setLoading(false);
    });
  };

  const clearInputs = () => {
    setProtocol("");
    setAddress("");
    setThreshold("");
    setSingle("");
    setMax("");
  };

  return (
    <Border>
      <StyledNewPosition>
        <Content>
          <Value>
            <Dropdown
              value={protocol}
              options={["Aave", "Compound"]}
              setValue={(v: string) => setProtocol(v)}
            />
          </Value>
          <NewPositionInput
            type="text"
            value={address}
            setValue={(v: string) => setAddress(v)}
            error={addressError()}
          />
          <NewPositionInput
            type="number"
            value={threshold}
            setValue={(v: string) => setThreshold(v)}
            error={thresholdError()}
          />
          <NewPositionInput
            type="number"
            value={single}
            setValue={(v: string) => setSingle(v)}
            error={singleError()}
          />
          <NewPositionInput
            type="number"
            value={max}
            setValue={(v: string) => setMax(v)}
            error={maxError()}
          />
          <Value>
            <Button
              primary
              small={isMobile}
              disabled={!(protocol && address && threshold && single && max) || hasError}
              text={approved && max !== "" ? "create 2/2" : "approve 1/2"}
              click={() => {
                if (approved) setConfirming(true);
                else executeApprove();
              }}
              hoverText={buttonHoverText()}
              loading={loading}
            />
          </Value>
        </Content>
        {hasError && <ErrorSpacing />}
      </StyledNewPosition>
      <NewPositionConfirmation
        show={confirming}
        close={() => setConfirming(false)}
        position={position}
        pool={pool}
        complete={() => clearInputs()}
      />
    </Border>
  );
};

export default NewPosition;
