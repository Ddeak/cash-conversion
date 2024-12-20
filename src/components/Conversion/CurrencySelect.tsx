import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Currency } from "../../types/currencies";

type CurrencySelectProps = {
  id: string;
  currencies: Currency[];
  setSelectedCurrency: (currency: Currency) => void;
  error?: string;
  selectedCurrency?: Currency;
};

const CurrencySelect = ({
  id,
  selectedCurrency,
  currencies,
  error,
  setSelectedCurrency,
}: CurrencySelectProps) => {
  return (
    <FormControl fullWidth>
      <InputLabel id={`${id}-label`}>{id}</InputLabel>
      <Select
        error={!!error}
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
          <MenuItem key={currency.id} value={currency.short_code}>
            {currency.name} ({currency.symbol})
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default CurrencySelect;
