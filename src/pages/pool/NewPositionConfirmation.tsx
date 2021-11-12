import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import LaunchIcon from "@material-ui/icons/Launch";
import { useTranslation } from "react-i18next";
import { useWeb3React } from "@web3-react/core";

import { useBackd } from "../../app/hooks/use-backd";
import { AppDispatch } from "../../app/store";
import Popup from "../../components/Popup";
import { GradientLink } from "../../styles/GradientText";
import Tooltip from "../../components/Tooltip";
import { registerPosition } from "../../state/positionsSlice";
import { shortenAddress } from "../../lib/text";
import { Pool, Position } from "../../lib/types";
import { selectPrice } from "../../state/selectors";
import { useDevice } from "../../app/hooks/use-device";
import { hasPendingTransaction } from "../../state/transactionsSlice";
import { getEtherscanAddressLink } from "../../lib/web3";

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Summary = styled.div`
  width: 100%;
  font-weight: 400;
  line-height: 2.4rem;
  letter-spacing: 0.15px;

  font-size: 1.6rem;
  @media (max-width: 600px) {
    font-size: 1.4rem;
  }
`;

const Address = styled(GradientLink)`
  font-weight: 400;
  line-height: 2.4rem;
  letter-spacing: 0.15px;
  cursor: pointer;
  margin-left: 0.5rem;

  font-size: 1.6rem;
  @media (max-width: 600px) {
    font-size: 1.4rem;
  }
`;

const PositionSummary = styled.div`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(60, 60, 60, 0.5);
  border-radius: 1.4rem;
  display: flex;
  flex-direction: column;
  padding: 1.6rem;

  margin-top: 4.8rem;
  @media (max-width: 600px) {
    margin-top: 1.8rem;
  }
`;

const SummaryRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0.6rem 0;
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  letter-spacing: 0.15px;
  text-transform: capitalize;

  font-size: 1.8rem;
  @media (max-width: 600px) {
    font-size: 1.6rem;
  }
`;

const AddressLabel = styled(GradientLink)`
  font-weight: 500;
  letter-spacing: 0.15px;
  cursor: pointer;

  font-size: 1.8rem;
  @media (max-width: 600px) {
    font-size: 1.6rem;
  }
`;

type Props = {
  show: boolean;
  close: () => void;
  position: Position;
  pool: Pool;
  complete: () => void;
};

const NewPositionConfirmation = ({ show, close, position, pool, complete }: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const backd = useBackd();
  const price = useSelector(selectPrice(pool));
  const loading = useSelector(hasPendingTransaction("Register"));
  const { chainId } = useWeb3React();
  const { isMobile } = useDevice();

  useEffect(() => {
    if (!loading) {
      complete();
      close();
    }
  }, [loading]);

  const executeRegister = () => {
    if (!backd || loading) return;
    dispatch(registerPosition({ position, pool, backd }));
  };

  return (
    <Popup
      id="new-position-confirmation"
      show={show}
      close={close}
      header={t("pool.tabs.positions.confirmation.header")}
      confirm
      submit={() => executeRegister()}
      loading={loading}
      content={
        <Content>
          <Summary>
            {t("pool.tabs.positions.confirmation.summaryStart")}
            <Address
              href={getEtherscanAddressLink(chainId, position.account)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {shortenAddress(position.account, isMobile ? 10 : 26)}
              <LaunchIcon style={{ fill: "var(--secondary)" }} />
            </Address>
            {t("pool.tabs.positions.confirmation.summaryEnd", {
              threshold: position.threshold,
              single: position.singleTopUp,
              asset: pool.underlying.symbol,
              singleUsd: position.singleTopUp.toUsdValue(price),
              max: position.maxTopUp,
              maxUsd: position.maxTopUp.toUsdValue(price),
            })}
          </Summary>
          <PositionSummary>
            <SummaryRow>
              <Label>
                {t("pool.tabs.positions.fields.protocol.label")}
                <Tooltip content={t("pool.tabs.positions.fields.protocol.tooltip")} />
              </Label>
              <Label>{position.protocol}</Label>
            </SummaryRow>
            <SummaryRow>
              <Label>
                {t("pool.tabs.positions.fields.address.label")}
                <Tooltip content={t("pool.tabs.positions.fields.address.tooltip")} />
              </Label>
              <AddressLabel
                href={getEtherscanAddressLink(chainId, position.account)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {shortenAddress(position.account, 8)}
                <LaunchIcon style={{ fill: "var(--secondary)" }} />
              </AddressLabel>
            </SummaryRow>
            <SummaryRow>
              <Label>
                {t("pool.tabs.positions.fields.threshold.label")}
                <Tooltip content={t("pool.tabs.positions.fields.threshold.tooltip")} />
              </Label>
              <Label>{position.threshold.toString()}</Label>
            </SummaryRow>
            <SummaryRow>
              <Label>
                {t("pool.tabs.positions.fields.single.label")}
                <Tooltip content={t("pool.tabs.positions.fields.single.tooltip")} />
              </Label>
              <Label>{position.singleTopUp.toCryptoString()}</Label>
            </SummaryRow>
            <SummaryRow>
              <Label>
                {t("pool.tabs.positions.fields.max.label")}
                <Tooltip content={t("pool.tabs.positions.fields.max.tooltip")} />
              </Label>
              <Label>{position.maxTopUp.toCryptoString()}</Label>
            </SummaryRow>
          </PositionSummary>
        </Content>
      }
    />
  );
};

export default NewPositionConfirmation;
