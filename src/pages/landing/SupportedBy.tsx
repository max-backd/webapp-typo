import React from "react";
import styled from "styled-components";
import { Header3 } from "../../styles/Headers";
import divergence from "../../assets/protocols/divergence.svg";
import curve from "../../assets/protocols/curve.svg";
import aave from "../../assets/protocols/aave.svg";

type ProtocolType = {
  image: string;
  link: string;
};

const protocols: ProtocolType[] = [
  {
    image: divergence,
    link: "https://www.div.vc/",
  },
  {
    image: curve,
    link: "https://curve.fi/",
  },
  {
    image: aave,
    link: "http://aave.com/",
  },
];

const StyledSupportedBy = styled.div`
  width: 100%;
  margin: var(--section-margin);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Protocols = styled.div`
  display: flex;
  align-items: center;
  margin: 3rem 0;
`;

const ProtocolContainer = styled.div`
  width: 32.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5.4rem;
`;

const Protocol = styled.img`
  max-width: 32.2rem;
  max-height: 7.7rem;
`;

const SupportedBy = () => {
  return (
    <StyledSupportedBy>
      <Header3>supported by</Header3>
      <Protocols>
        {protocols.map((protocol: ProtocolType) => (
          <ProtocolContainer>
            <Protocol
              onClick={() => {
                (window as any).open(protocol.link, "_blank").focus();
              }}
              src={protocol.image}
            />
          </ProtocolContainer>
        ))}
      </Protocols>
    </StyledSupportedBy>
  );
};

export default SupportedBy;
