import React from "react";
import styled from "styled-components";

const StyledContentSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: 1.4rem;
  background-color: rgba(21, 14, 59, 0.5);
`;

const HeaderContainer = styled.h2`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(252, 40, 211, 0.05);
  box-shadow: 0px 0px 12px rgba(23, 18, 22, 0.05);
  border-top-right-radius: 1.4rem;
  border-top-left-radius: 1.4rem;

  padding: 2rem 1.6rem;
  @media (max-width: 600px) {
    padding: 1.6rem;
  }
`;

const Header = styled.h2`
  font-weight: 700;
  letter-spacing: 0.25px;

  font-size: 2.4rem;
  @media (max-width: 600px) {
    font-size: 1.8rem;
  }
`;

const Key = styled.div`
  font-weight: 700;
  font-size: 1.6rem;
  letter-spacing: 0.25px;
`;

interface LineProps {
  large?: boolean;
}

const Line = styled.div`
  width: 100%;
  height: ${(props: LineProps) => (props.large ? "5px" : "2px")};
  background: var(--gradient);
  opacity: 0.2;
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 2.4rem 1.6rem;
`;

interface Props {
  header: string;
  statistics?: JSX.Element;
  content: JSX.Element;
  nav?: string;
}

const ContentSection = ({ header, statistics, content, nav }: Props): JSX.Element => {
  return (
    <StyledContentSection>
      <HeaderContainer>
        <Header>{header}</Header>
        {nav && <Key>{nav}</Key>}
      </HeaderContainer>
      <Line large />
      {statistics && statistics}
      {statistics && <Line />}
      <Content>{content}</Content>
    </StyledContentSection>
  );
};

export default ContentSection;
