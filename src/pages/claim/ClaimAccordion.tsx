import React from "react";
import styled from "styled-components";
import Accordion from "../../components/Accordion";
import Asset from "../../components/Asset";
import Button from "../../components/Button";
import GradientText from "../../styles/GradientText";
import accordionChevron from "../../assets/ui/accordion-chevron.svg";
import ClaimRow from "./ClaimRow";

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const AssetContainer = styled.div`
  flex: 1;
`;

const ClaimableContainer = styled.div`
  flex: 1;
`;

const Claimable = styled(GradientText)`
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 2.7rem;
  letter-spacing: 0.15px;
`;

const Apr = styled.div`
  flex: 1;
  font-weight: 900;
  font-size: 1.8rem;
  line-height: 2rem;
  letter-spacing: 0.15px;
`;

const EndContainer = styled.div`
  flex: 1.8;
  display: flex;
  justify-content: flex-end;

  button:first-child {
    margin-right: 1.8rem;
  }
`;

interface ArrowProps {
  open: boolean;
}

const Arrow = styled.img`
  width: 1.2rem;
  margin-right: 1.6rem;
  margin-left: 3.2rem;
  transition: transform 0.3s;
  transform: ${(props: ArrowProps) => (props.open ? "rotate(0deg)" : "rotate(180deg)")};
  user-drag: none;
  user-select: none;
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.9rem 0;
`;

const Breakdown = styled.div`
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: 0.15px;
  opacity: 0.6;
  margin-bottom: 2.4rem;
  margin-left: 1.6rem;
`;

interface Props {
  open: boolean;
  toggle: () => void;
}

const ClaimAccordion = ({ open, toggle }: Props) => {
  return (
    <Accordion
      header={
        <Header>
          <AssetContainer>
            <Asset
              token={{
                address: "skdfj",
                name: "DAI",
                symbol: "DAI",
                decimals: 16,
              }}
              large
            />
          </AssetContainer>
          <ClaimableContainer>
            <Claimable>$430.00</Claimable>
          </ClaimableContainer>
          <Apr>5.2%</Apr>
          <EndContainer>
            <Button text="Claim all" background="#1c0c37" width="12rem" />
            <Button primary text="Claim all & Stake" width="18rem" />
            <Arrow open={open} src={accordionChevron} />
          </EndContainer>
        </Header>
      }
      content={
        <ContentContainer>
          <Breakdown>Breakdown of claimable earnings:</Breakdown>
          <ClaimRow />
          <ClaimRow />
          <ClaimRow />
        </ContentContainer>
      }
      open={open}
      toggle={toggle}
    />
  );
};

export default ClaimAccordion;
