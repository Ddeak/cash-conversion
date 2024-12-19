import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Currency } from "../types/currencies";

type CurrencySelectProps = {
  id: string;
  currencies: Currency[];
  setSelectedCurrency: (currency: Currency) => void;
  selectedCurrency?: Currency;
};

const CurrencySelect = ({
  id,
  selectedCurrency,
  currencies,
  setSelectedCurrency,
}: CurrencySelectProps) => {
  return (
    <FormControl fullWidth>
      <InputLabel id={`${id}-label`}>{id}</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        value={selectedCurrency}
        label={id}
        onChange={(e) => {
          const found = currencies.find(
            (currency) => currency.short_code === e.target.value
          );
          if (found) setSelectedCurrency(found);
        }}
      >
        <MenuItem value={undefined}></MenuItem>
        {currencies.map((currency) => (
          <MenuItem value={currency.short_code}>
            {currency.name} ({currency.symbol})
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CurrencySelect;
