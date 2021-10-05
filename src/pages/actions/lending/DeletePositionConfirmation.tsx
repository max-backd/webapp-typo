import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { useBackd } from "../../../app/hooks/use-backd";
import { AppDispatch } from "../../../app/store";
import Popup from "../../../components/Popup";
import { Position, Pool, TransactionInfo } from "../../../lib/types";
import { removePosition } from "../../../state/positionsSlice";
import { selectTransactions } from "../../../state/transactionsSlice";
import Button from "../../../components/Button";

const ButtonContainer = styled.div`
  width: 100%;
  display: grid;
  margin-top: 4rem;

  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1.7rem;
  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 1.8rem;
  }
`;

interface Props {
  show: boolean;
  close: () => void;
  position: Position;
  pool: Pool;
  complete: () => void;
}

const DeletePositionConfirmation = ({ show, close, position, pool, complete }: Props) => {
  const { t } = useTranslation();
  const backd = useBackd();
  const dispatch = useDispatch<AppDispatch>();
  const [initialised, setInitialised] = useState(false);
  const pendingTx = useSelector(selectTransactions);

  const loading = pendingTx.some(
    (tx: TransactionInfo) =>
      tx.confirmations === 0 &&
      tx.description.action === "Remove" &&
      tx.description.args?.position.account === position.account &&
      tx.description.args?.position.protocol === position.protocol
  );

  useEffect(() => {
    if (initialised && !loading) {
      complete();
      close();
    }
    setInitialised(true);
  }, [loading]);

  const handleRemovePosition = () => {
    if (!backd) return;
    dispatch(removePosition({ backd, pool, position }));
  };

  return (
    <Popup
      show={show}
      close={close}
      header={t("pool.tabs.positions.delete.header")}
      body={t("pool.tabs.positions.delete.body", {
        asset: pool.underlying.symbol,
        max: position.maxTopUp.toCryptoString(),
        protocol: position.protocol,
      })}
      content={
        <ButtonContainer>
          <Button
            medium
            background="#252140"
            text={t("pool.tabs.positions.delete.cancel")}
            click={() => close()}
          />
          <Button
            medium
            primary
            destructive
            text={t("pool.tabs.positions.delete.header")}
            loading={loading}
            click={() => handleRemovePosition()}
          />
        </ButtonContainer>
      }
      loading={loading}
    />
  );
};

export default DeletePositionConfirmation;
