import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import Button from "../../components/styles/Button";
import { Header2, Header4 } from "../../components/styles/Headers";

const StyledHero = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: var(--section-margin);

  @media (max-width: 600px) {
    margin: var(--mobile-section-margin);
  }
`;

const Hero = () => {
  const history = useHistory();

  return (
    <StyledHero>
      <Header2>reactive liquidity</Header2>
      <Header4>
        A trustless and interest generating protocol designed to prevent collateralized loans from
        becoming liquidable.
      </Header4>
      <Button text="view pools" click={() => history.push("/pools")} hero large />
    </StyledHero>
  );
};

export default Hero;