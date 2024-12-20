import { Button, TextField } from "@mui/material";
import HorizIcon from "@mui/icons-material/SwapHoriz";
import CurrencySelect from "./CurrencySelect";
import CurrencyInput from "./CurrnecyInput";
import { useEffect, useState } from "react";
import { Currency, ErrorType } from "../../types/currencies";
import { getConvertedCurrency, getCurrencies } from "../../api/currencies";
import Loading from "./Loading";

const Conversion = () => {
  const [convert, setConvert] = useState("");
  const [fromCurrency, setFromCurrency] = useState<Currency>();
  const [toCurrency, setToCurrency] = useState<Currency>();
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [errors, setErrors] = useState<ErrorType>({});

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const currencies = await getCurrencies();
        setCurrencies(currencies);
      } catch (error) {
        setErrors({ fetch: "Failed to get currencies!" });
      }
    };

    fetchCurrencies();
  }, []);

  const convertCurrency = async () => {
    setErrors({});

    if (!fromCurrency) {
      return setErrors({ from: "Please select a Currency From" });
    }
    if (!toCurrency) {
      return setErrors({ to: "Please select a Currency To" });
    }
    try {
      const converted = await getConvertedCurrency(
        fromCurrency.code,
        toCurrency.code,
        convert
      );
      setConvert(converted);
    } catch (error) {
      setErrors({
        convert: "There was an error trying to convert. Please try again later",
      });
    }
  };

  if (currencies.length === 0) return <Loading />;

  return (
    <>
      <CurrencySelect
        id="From"
        selectedCurrency={fromCurrency}
        currencies={currencies}
        setSelectedCurrency={(currency) => {
          setErrors({ from: undefined });
          setFromCurrency(currency);
        }}
        error={errors.from}
      />

      <CurrencySelect
        id="To"
        selectedCurrency={toCurrency}
        currencies={currencies}
        setSelectedCurrency={(currency) => {
          setErrors({ to: undefined });
          setToCurrency(currency);
        }}
        error={errors.to}
      />

      <CurrencyInput value={convert} onChange={(value) => setConvert(value)} />

      <Button
        onClick={() => convertCurrency()}
        variant="outlined"
        startIcon={<HorizIcon />}
      >
        Convert
      </Button>

      <TextField
        value={0}
        error={!!errors.convert}
        helperText={errors.convert}
      />
    </>
  );
};

export default Conversion;
