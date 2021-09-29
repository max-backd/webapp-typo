import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import ContentSection from "../../components/ContentSection";
import NewPosition from "./NewPosition";
import Tooltip from "../../components/Tooltip";
import { Pool } from "../../lib";
import { selectPoolPositions } from "../../state/positionsSlice";
import { Position } from "../../lib/types";
import PositionRow from "./PositionRow";
import PoolStatistics from "./PoolStatistics";

type HeaderType = {
  label: string;
  tooltip: string;
};

const headers: HeaderType[] = [
  {
    label: "pool.tabs.positions.fields.protocol.label",
    tooltip: "pool.tabs.positions.fields.protocol.tooltip",
  },
  {
    label: "pool.tabs.positions.fields.address.label",
    tooltip: "pool.tabs.positions.fields.address.tooltip",
  },
  {
    label: "pool.tabs.positions.fields.threshold.label",
    tooltip: "pool.tabs.positions.fields.threshold.tooltip",
  },
  {
    label: "pool.tabs.positions.fields.single.label",
    tooltip: "pool.tabs.positions.fields.single.tooltip",
  },
  {
    label: "pool.tabs.positions.fields.max.label",
    tooltip: "pool.tabs.positions.fields.max.tooltip",
  },
];

const StyledPositions = styled.div`
  position: relative;
  width: 100%;

  @media (max-width: 900px) {
    width: calc(100% + 3.2rem);
    overflow-x: auto;
    left: -1.6rem;
  }
`;

const PositionContent = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 900px) {
    width: 720px;
    overflow-x: auto;
  }
`;

const Headers = styled.div`
  width: 100%;
  display: flex;
  padding: 0 2rem;
  white-space: nowrap;

  margin-bottom: 0.2rem;
  @media (max-width: 900px) {
    margin-bottom: 0;
  }

  @media (min-width: 1440px) {
    > div:last-child {
      min-width: 14rem;
    }
  }
`;

const Header = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const HeaderText = styled.div`
  line-height: 2.4rem;
  letter-spacing: 0.15px;
  opacity: 0.6;

  font-weight: 500;
  font-size: 1.4rem;
  @media (max-width: 900px) {
    font-weight: 700;
    font-size: 1.2rem;
  }
`;

interface ScrollShadowProps {
  show: boolean;
}

const ScrollShadow = styled.div`
  position: absolute;
  right: -1px;
  top: 50%;
  background: linear-gradient(to right, transparent, #10082f 90%, #10082f 100%);
  width: 20px;
  transform: translateY(-50%);
  height: 90%;

  transition: opacity 0.3s;
  opacity: ${(props: ScrollShadowProps) => (props.show ? 1 : 0)};

  @media (min-width: 901px) {
    display: none;
  }
`;

type Props = {
  pool: Pool;
};

const PoolPositions = ({ pool }: Props): JSX.Element => {
  const { t } = useTranslation();
  const positions = useSelector(selectPoolPositions(pool));
  const [showShadow, setShowShadow] = useState(true);
  const positionContentRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    setShowShadow(
      (positionContentRef.current?.getBoundingClientRect().right || 1000) > window.innerWidth
    );
  };

  return (
    <ContentSection
      header={t("pool.tabs.positions.header", { asset: pool.underlying.symbol })}
      statistics={<PoolStatistics pool={pool} />}
      content={
        <>
          <StyledPositions onScroll={handleScroll}>
            <PositionContent ref={positionContentRef}>
              <Headers>
                {headers.map((header: HeaderType) => (
                  <Header key={header.label}>
                    <HeaderText>{t(header.label)}</HeaderText>
                    <Tooltip content={t(header.tooltip)} />
                  </Header>
                ))}
                <Header />
              </Headers>
              <NewPosition pool={pool} />
              {positions.map((position: Position, index: number) => (
                <PositionRow key={index} position={position} pool={pool} />
              ))}
            </PositionContent>
          </StyledPositions>
          <ScrollShadow show={showShadow} />
        </>
      }
    />
  );
};

export default PoolPositions;
