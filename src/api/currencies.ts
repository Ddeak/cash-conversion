import { Currency } from "../types/currencies"

const API_KEY = "vvBu28oJGHOkSXsCsjNSfq5COhncuWPG"

export const getCurrencies = async (): Promise<Currency[]> => {
    const response = await fetch(`https://api.currencybeacon.com/v1/currencies?api_key=${API_KEY}`)
    const json = await response.json()
    return json.response
}

export const getConvertedCurrency = async (fromCode: string, toCode: string, amount: string) => {
    const response = await fetch(`https://api.currencybeacon.com/v1/convert?api_key=${API_KEY}&from=${fromCode}&to=${toCode}&amount=${amount}`)
    const json = await response.json()
    console.log('json', json)
    return json.response
}