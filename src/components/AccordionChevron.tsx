import React from "react";
import styled from "styled-components";
import accordionChevron from "../assets/ui/accordion-chevron.svg";

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

interface Props {
  open: boolean;
}

const AccordionChevron = ({ open }: Props) => {
  return <Arrow open={open} src={accordionChevron} />;
};

export default AccordionChevron;