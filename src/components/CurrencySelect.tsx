import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

type CurrencySelectProps = {
  id: string;
  selectedCurrency: string;
  currencies: string[];
  setSelectedCurrency: (currency: string) => void;
};

const CurrencySelect = ({
  id,
  selectedCurrency,
  currencies,
  setSelectedCurrency,
}: CurrencySelectProps) => {
  return (
    <FormControl fullWidth>
      <InputLabel id={`${id}-label`}>Currnecy</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        value={selectedCurrency}
        label="Currency"
        onChange={(e) => setSelectedCurrency(e.target.value)}
      >
        {currencies.map((currency) => (
          <MenuItem value={currency}>{currency}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CurrencySelect;
