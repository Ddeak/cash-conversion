import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { Currency } from "./types/currencies";
import { getCurrencies, getConvertedCurrency } from "./api/currencies";
import userEvent from "@testing-library/user-event";

jest.mock("../src/api/currencies");

const mockedGetCurrencies: jest.Mocked<any> = getCurrencies;
const mockedGetConvertedCurrency: jest.Mocked<any> = getConvertedCurrency;

const testCurrencies: Currency[] = [
  {
    code: "code 1",
    decimal_mark: "2",
    id: 1,
    name: "Test Currency 1",
    precision: 2,
    short_code: "short code 1",
    subunit: 1,
    symbol: "a",
    symbol_first: true,
    thousands_separator: ",",
  },
  {
    code: "code 2",
    decimal_mark: "2",
    id: 1,
    name: "Test Currency 2",
    precision: 2,
    short_code: "short code 2",
    subunit: 1,
    symbol: "b",
    symbol_first: true,
    thousands_separator: ",",
  },
];

test("renders the basic conversion form", async () => {
  mockedGetCurrencies.mockResolvedValueOnce(testCurrencies);
  render(<App />);
  const fromSelect = await screen.findByLabelText("From");
  userEvent.click(fromSelect);
  userEvent.selectOptions(
    screen.getByRole("listbox"),
    screen.getByRole("option", { name: "Test Currency 1 (a)" })
  );

  const toSelect = screen.getByLabelText("To");
  userEvent.click(toSelect);
  userEvent.selectOptions(
    screen.getByRole("listbox"),
    screen.getByRole("option", { name: "Test Currency 2 (b)" })
  );

  userEvent.type(screen.getByLabelText("Amount"), "3000");

  userEvent.click(screen.getByRole("button", { name: "Convert" }));

  await waitFor(() => expect(getConvertedCurrency).toHaveBeenCalledTimes(1));

  // TODO if the currency API comes back to life, ensure the correct value is rendered on screen
});
