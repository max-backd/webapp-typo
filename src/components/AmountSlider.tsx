import { Slider, withStyles } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

const Gradient = "linear-gradient(to right, rgba(197, 50, 249, 1), rgba(50, 178, 229, 1))";
const GradientLight =
  "linear-gradient(to right, rgba(197, 50, 249, 0.38), rgba(50, 178, 229, 0.38))";
const steps: number[] = [0.25, 0.5, 0.75, 1];

const StyledAmountSlider = styled.div`
  position: relative;
  width: 100%;
`;

type StepProps = {
  percent: string;
  active: boolean;
};

const Step = styled.button`
  position: absolute;
  bottom: 1.4rem;
  left: ${(props: StepProps) => props.percent};
  transform: translateX(-50%);
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: ${(props: StepProps) =>
    props.active ? "linear-gradient(to right, #80499F, #517497)" : "#57536f"};
  border: 2px solid #10092e;
  cursor: pointer;
`;

const BackdSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8,
    marginTop: 18,
  },
  thumb: {
    height: 18,
    width: 18,
    marginTop: -7,
    marginLeft: -9,
    borderRadius: 9,
    background: Gradient,
    zIndex: 1,
  },
  track: {
    height: 3,
    borderRadius: 2,
    background: GradientLight,
  },
  valueLabel: {
    left: -8,
    "& span": {
      background: "#433b6b",
      fontSize: 11,
    },
    "& span > span": {
      background: "transparent",
    },
  },
  rail: {
    height: 3,
    borderRadius: 2,
    background: "#C4C4C4",
  },
  mark: {
    display: "none",
  },
})(Slider);

const valuetext = (value: any) => `${value}%`;

type Props = {
  value: string;
  max: number;
  setValue: (value: string) => void;
};

const AmountSlider = (props: Props) => {
  const percent = (Number(props.value) / props.max) * 100;

  return (
    <StyledAmountSlider>
      <BackdSlider
        marks
        defaultValue={0}
        step={25}
        min={0}
        max={100}
        value={percent}
        onChange={(e: any, value: any) => props.setValue(((value * props.max) / 100).toString())}
        valueLabelDisplay="auto"
        valueLabelFormat={valuetext}
      />
      {steps.map((step: number) => (
        <Step
          percent={`${step * 100}%`}
          onClick={() => props.setValue((step * props.max).toString())}
          active={Number(props.value) / props.max > step}
        />
      ))}
    </StyledAmountSlider>
  );
};

export default AmountSlider;
