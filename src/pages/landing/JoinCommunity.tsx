import React from "react";
import styled from "styled-components";
import GradientText from "../../components/styles/GradientText";
import { Header3 } from "../../components/styles/Headers";
import telegram from "../../assets/socials/telegram.svg";
import twitter from "../../assets/socials/twitter.svg";
import github from "../../assets/socials/github.svg";

type SocialType = {
  label: string;
  icon: string;
  link: string;
};

const socials: SocialType[] = [
  {
    label: "Telegram →",
    icon: telegram,
    link: "https://t.me/backdchat",
  },
  {
    label: "Twitter →",
    icon: twitter,
    link: "https://twitter.com/backdfund",
  },
  {
    label: "GitHub →",
    icon: github,
    link: "https://github.com/backdfund",
  },
];

const StyledJoinCommunity = styled.div`
  width: 100%;
  margin: var(--section-margin);

  @media (max-width: 600px) {
    margin: var(--mobile-section-margin);
  }
`;

const Socials = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2.3rem;

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 0.6rem;
  }
`;

const Social = styled.div`
  flex: 1;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.4rem;
  background-color: #141128;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  cursor: pointer;

  @media (max-width: 600px) {
    padding: 0.6rem 0.7rem;
  }
`;

const Link = styled(GradientText)`
  flex: 1;
  font-weight: 700;
  font-size: 1.8rem;

  @media (max-width: 600px) {
    font-size: 1.2rem;
    line-height: 2.4rem;
    margin-left: 0.9rem;
  }
`;

const IconContainer = styled.div`
  height: 6rem;
  width: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--main);
  border-radius: 1.4rem;

  @media (max-width: 600px) {
    height: 3.6rem;
    width: 3.6rem;
  }
`;

const Icon = styled.img`
  width: 3.6rem;

  @media (max-width: 600px) {
    width: 2.1rem;
  }
`;

const JoinCommunity = () => {
  return (
    <StyledJoinCommunity>
      <Header3>join the community</Header3>
      <Socials>
        {socials.map((social: SocialType) => (
          <Social
            key={social.label}
            onClick={() => {
              (window as any).open(social.link, "_blank").focus();
            }}
          >
            <Link>{social.label}</Link>
            <IconContainer>
              <Icon src={social.icon} />
            </IconContainer>
          </Social>
        ))}
      </Socials>
    </StyledJoinCommunity>
  );
};

export default JoinCommunity;