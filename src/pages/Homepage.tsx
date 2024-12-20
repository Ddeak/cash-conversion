import {
  AppBar,
  Button,
  Grid2,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import HorizIcon from "@mui/icons-material/SwapHoriz";
import { useEffect, useState } from "react";
import { getConvertedCurrency, getCurrencies } from "../api/currencies";
import { Currency } from "../types/currencies";
import CurrencySelect from "../components/CurrencySelect";
import Loading from "../components/Loading";
import CurrencyInput from "../components/CurrnecyInput";

const Homepage = () => {
  const [convert, setConvert] = useState("");
  const [fromCurrency, setFromCurrency] = useState<Currency>();
  const [toCurrency, setToCurrency] = useState<Currency>();
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [error, setError] = useState({});

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const currencies = await getCurrencies();
        setCurrencies(currencies);
      } catch (error) {
        setError("Failed to get currencies!");
      }
    };

    fetchCurrencies();
  }, []);

  const convertCurrency = async () => {
    if (!fromCurrency) {
      return setError({ from: "Please select a Currency From" });
    }
    if (!toCurrency) {
      return setError({ to: "Please select a Currency To" });
    }
    try {
      const converted = await getConvertedCurrency(
        fromCurrency.code,
        toCurrency.code,
        convert
      );
      setConvert(converted);
    } catch (error) {
      setError({
        convert: "There was an error trying to convert. Please try again later",
      });
    }
  };

  if (currencies.length === 0) return <Loading />;

  return (
    <Grid2 container direction="column" alignItems="center">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            Cash-Conversion
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid2
        container
        direction="column"
        rowGap={2}
        maxWidth={500}
        width="100%"
        padding={2}
      >
        <CurrencySelect
          id="From"
          selectedCurrency={fromCurrency}
          currencies={currencies}
          setSelectedCurrency={(currency) => setFromCurrency(currency)}
        />

        <CurrencySelect
          id="To"
          selectedCurrency={toCurrency}
          currencies={currencies}
          setSelectedCurrency={(currency) => setToCurrency(currency)}
        />

        <CurrencyInput
          value={convert}
          onChange={(value) => setConvert(value)}
        />

        <Button
          onClick={() => convertCurrency()}
          variant="outlined"
          startIcon={<HorizIcon />}
        >
          Convert
        </Button>

        <TextField value={"0"} />
      </Grid2>
    </Grid2>
  );
};

export default Homepage;
