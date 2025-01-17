import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { ScaledNumber } from "scaled-number";

import { useDevice } from "../../app/hooks/use-device";
import AmountInput from "../../components/AmountInput";
import { selectUsersPoolUnderlyingUnlocked } from "../../state/valueSelectors";
import { Pool } from "../../lib";
import WithdrawalButton from "./WithdrawButton";
import { Optional } from "../../lib/types";

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

interface Props {
  pool: Optional<Pool>;
}

const PoolWithdraw = ({ pool }: Props): JSX.Element => {
  const { t } = useTranslation();
  const usersPoolUnderlyingUnlocked = useSelector(selectUsersPoolUnderlyingUnlocked(pool));
  const { isMobile } = useDevice();

  const [withdrawAmount, setWithdrawAmount] = useState("");
  const value = ScaledNumber.fromUnscaled(withdrawAmount, pool?.lpToken.decimals);

  const error = () => {
    if (!usersPoolUnderlyingUnlocked) return "";
    if (withdrawAmount && Number(withdrawAmount) <= 0) return t("amountInput.validation.positive");
    try {
      const amount = ScaledNumber.fromUnscaled(withdrawAmount, pool?.underlying.decimals);
      if (amount.gt(usersPoolUnderlyingUnlocked)) return t("amountInput.validation.exceedsBalance");
      return "";
    } catch {
      return t("amountInput.validation.invalid");
    }
  };

  const inputLabel = isMobile
    ? t("pool.tabs.withdraw.input.labelMobile")
    : t("pool.tabs.withdraw.input.labelDesktop", { asset: pool?.underlying.symbol || "---" });

  return (
    <Content>
      <AmountInput
        value={withdrawAmount}
        setValue={(v: string) => setWithdrawAmount(v)}
        label={inputLabel}
        balance={usersPoolUnderlyingUnlocked}
        error={error()}
        symbol={pool?.underlying.symbol || "---"}
      />
      <WithdrawalButton
        pool={pool}
        value={value}
        complete={() => setWithdrawAmount("")}
        valid={!error() && !value.isZero()}
      />
    </Content>
  );
};

export default PoolWithdraw;
