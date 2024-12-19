import "./App.css";
import CurrencySelect from "./components/CurrencySelect";

function App() {
  const temp = (curr: string) => {
    console.log("curr", curr);
  };

  return (
    <div className="App">
      <CurrencySelect
        id="currency1"
        selectedCurrency="GB"
        currencies={["GB", "EU"]}
        setSelectedCurrency={temp}
      />
    </div>
  );
}

export default App;
