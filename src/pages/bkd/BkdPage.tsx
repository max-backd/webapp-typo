import styled from "styled-components";
import { useTranslation } from "react-i18next";

import Seo from "../../components/Seo";
import BkdSummary from "./BkdSummary";
import Overview from "../../components/Overview";
import BoostChart from "./BoostChart";
import StakeBkd from "./StakeBkd";
import BasicCard from "../../components/BasicCard";

const StyledBkdPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  width: 100%;
  display: flex;

  @media (max-width: 1220px) {
    flex-direction: column;
  }
`;

const Content = styled.div`
  flex: 6;
  display: flex;
  flex-direction: column;

  @media (max-width: 1220px) {
    flex: auto;
  }
`;

const StatContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1.6rem;

  @media (max-width: 1220px) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 2.4rem;
  }
`;

const InfoCards = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  margin-right: 1.6rem;

  @media (max-width: 1220px) {
    margin-right: 0;
    flex: auto;
    margin-bottom: 2.4rem;
  }
`;

const BkdPage = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <StyledBkdPage>
      <Seo title={t("metadata.bkd.title")} description={t("metadata.bkd.description")} />
      <BkdSummary />
      <Container>
        <InfoCards>
          <Overview
            defaultClosed
            description={t("bkd.overview")}
            link="https://docs.backd.fund/protocol-architecture/tokenomics/token-income"
          />
          <div>
            <StakeBkd />
          </div>
        </InfoCards>
        <Content>
          <BoostChart />
          <StatContainer>
            <BasicCard
              label={t("bkd.statistics.stkbkd.header")}
              value="312.34 stkBKD"
              subValue="= 1000 BKD"
            />
            <BasicCard
              label={t("bkd.statistics.boost.header")}
              value="2.6x"
              subValue={t("bkd.statistics.boost.subHeader")}
            />
          </StatContainer>
        </Content>
      </Container>
    </StyledBkdPage>
  );
};

export default BkdPage;
