import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { Pool } from "../../lib";
import {
  selectUsersPoolUnderlyingUnlocked,
  selectUsersPoolUsdUnlocked,
} from "../../state/valueSelectors";
import Asset from "../../components/Asset";
import { GradientText } from "../../styles/GradientText";
import { TOPUP_ACTION_ROUTE } from "../../lib/constants";
import Loader from "../../components/Loader";

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.2rem;
`;

const AssetContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ManageButton = styled.button`
  margin-left: 1rem;
  cursor: pointer;
`;

const ManageText = styled(GradientText)`
  font-size: 1rem;
`;

const Balances = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Underlying = styled.div`
  font-weight: 500;
  letter-spacing: 0.46px;
  margin-bottom: 0.2rem;

  font-size: 1.4rem;
  @media (max-width: 600px) {
    font-size: 1.3rem;
  }

  @media only percy {
    opacity: 0;
  }
`;

const Usd = styled.div`
  font-weight: 500;
  letter-spacing: 0.46px;
  opacity: 0.5;

  font-size: 1.2rem;
  @media (max-width: 600px) {
    font-size: 1.1rem;
  }

  @media only percy {
    opacity: 0;
  }
`;

interface Props {
  pool: Pool;
}

const YourDepositsRow = ({ pool }: Props): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const usersPoolUnderlyingUnlocked = useSelector(selectUsersPoolUnderlyingUnlocked(pool));
  const usersPoolUsdUnlocked = useSelector(selectUsersPoolUsdUnlocked(pool));

  return (
    <Row id={`your-deposits-${pool.underlying.symbol.toLowerCase()}`} key={pool.name}>
      <AssetContainer>
        <Asset tiny token={pool.underlying} />
        <ManageButton
          onClick={() => {
            navigate(`${TOPUP_ACTION_ROUTE}/deposit/${pool.lpToken.symbol.toLowerCase()}`);
          }}
        >
          <ManageText>{t("actions.deposits.manage")}</ManageText>
        </ManageButton>
      </AssetContainer>

      <Balances>
        <Underlying>
          {usersPoolUnderlyingUnlocked ? (
            `${usersPoolUnderlyingUnlocked.toCryptoString()} ${pool.underlying.symbol}`
          ) : (
            <Loader />
          )}
        </Underlying>
        <Usd>{usersPoolUsdUnlocked ? usersPoolUsdUnlocked.toUsdValue(1) : <Loader />}</Usd>
      </Balances>
    </Row>
  );
};

export default YourDepositsRow;
