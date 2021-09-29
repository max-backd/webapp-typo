import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useHistory } from "react-router";

import ContentSection from "../../../components/ContentSection";
import Button from "../../../components/Button";
import BackButton from "../../../components/BackButton";

const Container = styled.div`
  position: relative;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  font-size: 2.2rem;
  font-weight: 600;
  letter-spacing: 0.25px;
  margin-bottom: 3rem;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 6rem;
`;

const RegisterTopupPool = () => {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <Container>
      <BackButton />
      <ContentSection
        header={t("actions.register.header")}
        subHeader={t("actions.topup.label")}
        nav="3/4"
        content={
          <Content>
            <Header>{t("actions.register.choose")}</Header>
            <ButtonContainer>
              <Button
                primary
                medium
                width="44%"
                text={t("components.continue")}
                click={() => history.push(`/actions/register/sskdfk/skdfk/ksdkf/sdf`)}
              />
            </ButtonContainer>
          </Content>
        }
      />
    </Container>
  );
};

export default RegisterTopupPool;
