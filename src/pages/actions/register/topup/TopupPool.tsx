import { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import ContentSection from "../../../../components/ContentSection";
import Button from "../../../../components/Button";
import RowSelector from "../../../../components/RowSelector";
import { selectPool, selectPools } from "../../../../state/poolsListSlice";
import { Pool } from "../../../../lib";
import Asset from "../../../../components/Asset";
import { RowOptionType } from "../../../../components/RowOption";
import { TOPUP_ACTION_ROUTE } from "../../../../lib/constants";
import TopupPoolDeposits from "./TopupPoolDeposits";
import TopupPoolTvl from "./TopupPoolTvl";
import {
  selectUsersPoolLpUnlocked,
  selectUsersTotalUsdUnlocked,
} from "../../../../state/valueSelectors";
import { useNavigateToTop } from "../../../../app/hooks/use-navigate-to-top";

const Container = styled.div`
  position: relative;
`;

const Header = styled.div`
  font-weight: 600;
  letter-spacing: 0.25px;

  font-size: 2.2rem;
  @media (max-width: 600px) {
    font-size: 1.6rem;
  }
`;

const SubHeader = styled.div`
  font-size: 1.7rem;
  font-weight: 500;
  opacity: 0.8;
  margin-top: 1.6rem;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  margin-top: 6rem;
  @media (max-width: 600px) {
    margin-top: 4rem;
  }
`;

const TopupPool = (): JSX.Element => {
  const { t } = useTranslation();
  const { address, protocol } = useParams<"address" | "protocol">();
  const navigate = useNavigateToTop();
  const pools = useSelector(selectPools);
  const usersTotalUsdUnlocked = useSelector(selectUsersTotalUsdUnlocked);
  const [poolName, setPoolName] = useState("");
  const pool = useSelector(selectPool(poolName));
  const usersPoolLpUnlocked = useSelector(selectUsersPoolLpUnlocked(pool));

  const hasDeposits = !usersTotalUsdUnlocked?.isZero();

  const options: RowOptionType[] = pools
    ? pools.map((pool: Pool) => {
        return {
          value: pool.lpToken.symbol.toLowerCase(),
          id: `${pool.underlying.symbol.toLowerCase()}-pool-option`,
          columns: [
            {
              label: t("headers.asset"),
              value: <Asset tiny token={pool.underlying} />,
            },
            {
              label: t("headers.deposits"),
              value: <TopupPoolDeposits pool={pool} />,
            },
            {
              label: t("headers.apy"),
              value: pool.apy ? pool.apy.toPercent() : null,
            },
            {
              label: t("headers.tvl"),
              value: <TopupPoolTvl pool={pool} />,
            },
          ],
        };
      })
    : [];

  return (
    <Container>
      <ContentSection
        header={t("actions.register.header")}
        subHeader={t("actions.topup.label")}
        nav={t("actions.register.step", { step: "3/4" })}
      >
        <Header id="register-topup-pool-header">
          {hasDeposits
            ? t("actions.topup.stages.pool.header")
            : t("actions.topup.stages.pool.noDepositsHeader")}
        </Header>
        {!hasDeposits && <SubHeader>{t("actions.topup.stages.pool.subHeader")}</SubHeader>}
        <RowSelector
          value={poolName}
          setValue={(value: string) => setPoolName(value)}
          options={options}
        />
        <ButtonContainer>
          <Button
            id="register-topup-pool-button"
            primary
            medium
            width="30rem"
            click={() => {
              if (usersPoolLpUnlocked && usersPoolLpUnlocked?.isZero())
                navigate(`${TOPUP_ACTION_ROUTE}/deposit/${poolName}/${address}/${protocol}`);
              else navigate(`${TOPUP_ACTION_ROUTE}/${address}/${protocol}/${poolName}`);
            }}
            disabled={!pool}
            hoverText={t("actions.topup.stages.pool.incomplete")}
          >
            {t("components.continue")}
          </Button>
        </ButtonContainer>
      </ContentSection>
    </Container>
  );
};

export default TopupPool;
