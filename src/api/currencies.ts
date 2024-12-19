import { Currency } from "../types/currencies"

const API_KEY = "vvBu28oJGHOkSXsCsjNSfq5COhncuWPG"

export const getCurrencies = async (): Promise<Currency[]> => {
    const response = await fetch(`https://api.currencybeacon.com/v1/currencies?api_key=${API_KEY}`)
    const json = await response.json()
    return json.response
}