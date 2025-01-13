import { Button, TextField } from "@mui/material";
import HorizIcon from "@mui/icons-material/SwapHoriz";
import CurrencySelect from "./CurrencySelect";
import CurrencyInput from "./CurrnecyInput";
import { useEffect, useState } from "react";
import { Currency, ErrorType } from "../../types/currencies";
import { getConvertedCurrency, getCurrencies } from "../../api/currencies";
import Loading from "./Loading";
import RecentConversionList from "./RecentConversionList";

const convertToRecentItem = (
  fromCurrency: Currency,
  toCurrency: Currency,
  fromValue: string,
  toValue: string
) => {
  return `Converted ${fromValue} ${fromCurrency.name} ->  ${toValue} ${toCurrency.name}`;
};

const MAX_RECENT_LIST = 5;

const Conversion = () => {
  const [convert, setConvert] = useState<any>("");
  const [fromCurrency, setFromCurrency] = useState<Currency>();
  const [toCurrency, setToCurrency] = useState<Currency>();
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [errors, setErrors] = useState<ErrorType>({});
  const [recentList, setRecentList] = useState<string[]>([]);

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
        fromCurrency.short_code,
        toCurrency.short_code,
        convert
      );
      setConvert(converted);

      setRecentList([
        convertToRecentItem(fromCurrency, toCurrency, convert, converted.value),
        ...recentList.slice(0, MAX_RECENT_LIST - 1),
      ]);
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
        value={convert.value}
        error={!!errors.convert}
        helperText={errors.convert}
      />

      <RecentConversionList recentList={recentList} />
    </>
  );
};

export default Conversion;
