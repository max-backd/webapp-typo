import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ovals from "../../assets/background/ovals.svg";
import icons from "../../assets/background/icons.svg";

const StyledBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

type ScrollProps = {
  transform: string;
};

const Ovals = styled.img.attrs((props: ScrollProps) => ({
  style: {
    transform: props.transform,
  },
}))`
  position: absolute;
  top: ${(props: ScrollProps) => (props.transform ? 0 : 0)};
  top: 0;
  left: 0;
  width: 100%;
  transition: transform 0.1s ease-out;
`;

const Icons = styled.img.attrs((props: ScrollProps) => ({
  style: {
    transform: props.transform,
  },
}))`
  position: absolute;
  top: ${(props: ScrollProps) => (props.transform ? "14rem" : "14rem")};
  left: 0;
  width: 100%;
  transition: transform 0.1s ease-out;
`;

const Background = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <StyledBackground>
      <Ovals src={ovals} transform={`translateY(${-scrollPosition / 4}px)`} />
      <Icons src={icons} transform={`translateY(${-scrollPosition / 2}px)`} />
      {/* TODO */}
    </StyledBackground>
  );
};

export default Background;
