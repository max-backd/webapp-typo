import React, { useState } from "react";
import styled from "styled-components";
import Seo from "../../components/Seo";
import StakeSummary from "./StakeSummary";
import StakeAccordion from "./StakeAccodion";

const pools: string[] = ["meow", "woof"];

const StyledPoolsPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Headers = styled.div`
  display: flex;
  width: 100%;
  padding: 0 1.6rem;
  margin-bottom: 0.5rem;

  @media (max-width: 600px) {
    > div:first-child {
      flex: 1.3;
    }
  }
`;

interface HeaderProps {
  hideMobile?: boolean;
}

const Header = styled.div`
  flex: 1;
  font-weight: 700;
  line-height: 2.4rem;
  letter-spacing: 0.15px;
  color: rgba(255, 255, 255, 0.87);
  opacity: 0.6;

  font-size: 1.4rem;
  @media (max-width: 600px) {
    font-size: 1.2rem;
    display: ${(props: HeaderProps) => (props.hideMobile ? "none" : "flex")};
  }
`;

const ArrowHeader = styled.div`
  flex: 0.2;
`;

const StakePage = (): JSX.Element => {
  const [activePool, setActivePool] = useState<number | null>(0);

  const isOpen = (index: number): boolean => activePool !== null && activePool === index;

  return (
    <StyledPoolsPage>
      <Seo title="" description="" />
      <StakeSummary />
      <Headers>
        <Header>Asset</Header>
        <Header hideMobile>Claimable (USD)</Header>
        <Header>APR</Header>
        <Header>Staked</Header>
        <Header hideMobile>TVL</Header>
        <ArrowHeader />
      </Headers>
      {pools.map((pool: string, index: number) => (
        <StakeAccordion
          key={pool}
          open={isOpen(index)}
          toggle={() => {
            if (isOpen(index)) setActivePool(null);
            else setActivePool(index);
          }}
        />
      ))}
    </StyledPoolsPage>
  );
};

export default StakePage;
