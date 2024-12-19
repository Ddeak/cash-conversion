import { TextField } from "@mui/material";
import { ChangeEventHandler } from "react";

const CURRENCY_REGEX = /^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$/;

type CurrencyInputProps = {
  value: string;
  onChange: (value: string) => void;
};

const CurrencyInput = ({ value, onChange }: CurrencyInputProps) => {
  const onCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (CURRENCY_REGEX.test(e.target.value)) onChange(e.target.value);
  };

  return (
    <TextField
      type="number"
      value={value}
      onChange={onCurrencyChange}
      variant="outlined"
    />
  );
};

export default CurrencyInput;
