import React, { ChangeEvent, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

type AmountInputFormProps = {
  assetName: string;
  maxAmount: number;
  submitText: string;
};

export function AmountInputForm({
  assetName,
  maxAmount,
  submitText,
}: AmountInputFormProps) {
  const [value, setValue] = useState(0);
  const [valueError, setValueError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawNewValue = e.target.value;
    const newValue = parseInt(rawNewValue, 10);
    let error = "";
    if (newValue > maxAmount) {
      error = "Not enough funds available";
    }
    if (!isNaN(newValue)) {
      setValue(newValue);
      setValueError(error);
    }
  };

  return (
    <Form>
      <Form.Group controlId="formBasicRange">
        <InputGroup className="mb-2">
          <Form.Control
            type="number"
            value={value.toString()}
            onChange={handleChange}
            isInvalid={valueError.length > 0}
          />
          <InputGroup.Append>
            <InputGroup.Text>{assetName}</InputGroup.Text>
          </InputGroup.Append>

          <Form.Control.Feedback type="invalid">
            {valueError}
          </Form.Control.Feedback>
        </InputGroup>
        <Form.Control
          type="range"
          value={value}
          max={maxAmount}
          onChange={handleChange}
        />
      </Form.Group>

      <div className="text-center mt-4">
        <Button variant="primary" type="submit">
          {submitText}
        </Button>
      </div>
    </Form>
  );
}