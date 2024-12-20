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
    id: 2,
    name: "Test Currency 2",
    precision: 2,
    short_code: "short code 2",
    subunit: 1,
    symbol: "b",
    symbol_first: true,
    thousands_separator: ",",
  },
];

describe("Homepage Tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("basic conversion flow", async () => {
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

  test("basic amount validation", async () => {
    mockedGetCurrencies.mockResolvedValueOnce(testCurrencies);
    render(<App />);
    const amountInput = await screen.findByLabelText("Amount");

    userEvent.type(amountInput, "abc200@!#12");

    expect(amountInput).toHaveValue(20012);
  });

  test("basic error validation", async () => {
    mockedGetCurrencies.mockResolvedValueOnce(testCurrencies);
    render(<App />);
    await screen.findByLabelText("Amount");

    userEvent.click(screen.getByRole("button", { name: "Convert" }));

    expect(
      screen.queryByText("Please select a Currency From")
    ).toBeInTheDocument();

    const fromSelect = screen.getByLabelText("From");
    userEvent.click(fromSelect);
    userEvent.selectOptions(
      screen.getByRole("listbox"),
      screen.getByRole("option", { name: "Test Currency 1 (a)" })
    );

    userEvent.click(screen.getByRole("button", { name: "Convert" }));

    expect(
      screen.queryByText("Please select a Currency To")
    ).toBeInTheDocument();
  });
});
