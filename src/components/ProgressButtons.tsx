import React, { useState } from "react";
import styled from "styled-components";
import Button from "./styles/Button";

const StyledProgressButtons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
`;

const ButtonContainer = styled.div`
  flex: 1;
`;

const ProgressContainer = styled.div`
  width: 100%;
  display: flex;
`;

const ProgressSection = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type NumberProps = {
  current: boolean;
  complete: boolean;
};

const Number = styled.div`
  position: relative;
  width: 3.1rem;
  height: 3.1rem;
  border-radius: 50%;
  background: ${(props: NumberProps) =>
    props.current
      ? "linear-gradient(to right, #C532F9, #32B2E5)"
      : props.complete
      ? "#C532F9"
      : "rgba(83, 80, 104, 1)"};
  color: ${(props: NumberProps) =>
    props.complete || props.current ? "var(--main)" : "rgba(0, 0, 0, 0.87)"};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 2.2rem;
  letter-spacing: 0.15px;
`;

const Line = styled.div`
  position: absolute;
  width: 100%;
  height: 4px;
  top: 50%;
  left: 0;
  transform: translate(50%, calc(-50% - 1px));
  background: ${(props: NumberProps) =>
    props.complete
      ? "linear-gradient(to right, #C532F9, #32B2E5)"
      : props.current
      ? "linear-gradient(to right, #32B2E5, rgba(83, 80, 104, 1))"
      : "rgba(83, 80, 104, 1)"};
`;

type Props = {
  token: string;
  symbol: string;
  buttonText: string;
};

const ProgressButtons = (props: Props) => {
  const [approved, setApproved] = useState(false);

  return (
    <StyledProgressButtons>
      <Buttons>
        <ButtonContainer>
          <Button
            primary
            text={`Approve ${props.symbol.toUpperCase()}`}
            click={() => setApproved(true)}
          />
        </ButtonContainer>
        <ButtonContainer>
          <Button primary text={props.buttonText} />
        </ButtonContainer>
      </Buttons>
      <ProgressContainer>
        <ProgressSection>
          <Line complete={approved} current={!approved} />
          <Number complete={approved} current={!approved}>
            1
          </Number>
        </ProgressSection>
        <ProgressSection>
          <Number complete={false} current={approved}>
            2
          </Number>
        </ProgressSection>
      </ProgressContainer>
    </StyledProgressButtons>
  );
};

export default ProgressButtons;