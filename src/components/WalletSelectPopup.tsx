import { useWeb3React } from "@web3-react/core";
import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import LaunchIcon from "@material-ui/icons/Launch";
import { AbstractConnector } from "@web3-react/abstract-connector";

import { injectedConnector, walletConnectConnector } from "../app/web3";
import metamask from "../assets/wallets/metamask.svg";
import walletConnect from "../assets/wallets/wallet-connect.svg";
import Popup from "./Popup";

type WalletOption = {
  name: string;
  icon: string;
  leftColor: string;
  rightColor: string;
  connector: AbstractConnector;
};

const walletOptions: WalletOption[] = [
  {
    name: "walletConnect.wallets.metaMask",
    icon: metamask,
    leftColor: "#FF5407",
    rightColor: "#FFD523",
    connector: injectedConnector,
  },
  {
    name: "walletConnect.wallets.walletConnect",
    icon: walletConnect,
    leftColor: "#8400FE",
    rightColor: "#0C00FE",
    connector: walletConnectConnector,
  },
];

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const SubHeaderContainer = styled.div`
  display: flex;
  margin: auto;

  margin-bottom: 6rem;
  @media (max-width: 600px) {
    flex-direction: column;
    margin-bottom: 2rem;
  }
`;

const SubHeader = styled.div`
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: 0.15px;
  text-align: center;
  margin-right: 0.5rem;

  @media (max-width: 600px) {
    margin-bottom: 0.2rem;
  }
`;

const Highlight = styled.a`
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: 0.15px;
  text-align: center;
  cursor: pointer;
  background: var(--gradient);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  > svg {
    margin-left: 0.3rem;
    transform: translateY(2px);
  }
`;

type OptionProps = {
  leftColor: string;
  rightColor: string;
};

const Option = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 1.4rem;
  background: linear-gradient(
    to right,
    ${(props: OptionProps) => props.leftColor},
    ${(props: OptionProps) => props.rightColor}
  );
  margin-top: 1.2rem;
  cursor: pointer;

  padding: 1.9rem 2.2rem;
  @media (max-width: 600px) {
    padding: 1.5rem 2rem;
  }
`;

const Name = styled.div`
  line-height: 2.8rem;

  font-weight: 700;
  font-size: 2.1rem;
  @media (max-width: 600px) {
    font-weight: 700;
    font-size: 2rem;
  }
`;

const IconContainer = styled.div`
  width: 5.4rem;
  height: 3.9rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.img`
  max-height: 100%;
  max-width: 100%;
`;

type Props = {
  show: boolean;
  close: () => void;
};

const WalletSelectPopup = (props: Props): JSX.Element => {
  const { activate } = useWeb3React();
  const { t } = useTranslation();

  const connect = async (connector: AbstractConnector) => {
    await activate(connector);
    props.close();
  };

  return (
    <Popup
      show={props.show}
      close={props.close}
      header={t("walletConnect.header")}
      content={
        <Content>
          <SubHeaderContainer>
            <SubHeader>{t("walletConnect.newToEthereum")}</SubHeader>
            <Highlight
              href="https://backd-1.gitbook.io/backd/resources/faq/general"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("walletConnect.aboutWallets")}
              <LaunchIcon style={{ fill: "var(--secondary)" }} />
            </Highlight>
          </SubHeaderContainer>

          {walletOptions.map((option: WalletOption) => (
            <Option
              key={option.name}
              leftColor={option.leftColor}
              rightColor={option.rightColor}
              onClick={() => connect(option.connector)}
            >
              <Name>{t(option.name)}</Name>
              <IconContainer>
                <Icon src={option.icon} alt={`${option.name} logo`} />
              </IconContainer>
            </Option>
          ))}
        </Content>
      }
    />
  );
};

export default WalletSelectPopup;
