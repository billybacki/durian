import { Currency } from '@/constants/currency/currency'
import { CurrencyAmount } from '@/constants/currency/CurrencyAmount'
import { TonCurrency } from '@/constants/currency/TonCurrency'
import { TonCurrencyAmount } from '@/constants/currency/TonCurrencyAmount'
// import { TonCurrency } from '@/constants/currency/TonCurrency'
import BigNumber from 'bignumber.js'
import JSBI from 'jsbi'

// function formatUnits(value: string | number, decimals = 9) {
//   return new BigNumber(value).dividedBy(new BigNumber(10).pow(decimals)).toString()
// }

function parseUnits(value: string | number, decimals = 9) {
  return new BigNumber(value).multipliedBy(new BigNumber(10).pow(decimals))
}

export function tryParseAmount(value: string, currency: Currency): CurrencyAmount | undefined
export function tryParseAmount(value: string, currency: TonCurrency): TonCurrencyAmount | undefined
export function tryParseAmount(value?: string, currency?: Currency | TonCurrency) {
  if (!value || !currency) {
    return undefined
  }
  try {
    const str = value.split('.')
    if (str.length === 2) {
      value = `${str[0]}.${str[1].slice(0, currency.decimals)}`
    }
    const typedValueParsed = parseUnits(value, currency.decimals).toString()
    if (typedValueParsed !== '0') {
      if (currency instanceof Currency) return new CurrencyAmount(currency, JSBI.BigInt(typedValueParsed))
      else return new TonCurrencyAmount(currency, JSBI.BigInt(typedValueParsed))
    }
  } catch (error) {
    // should fail if the user specifies too many decimal places of precision (or maybe exceed max uint?)
    console.debug(`Failed to parse input amount: "${value}"`, error)
  }
  // necessary for all paths to return a value
  return undefined
}

// const absolute = (val: string) => {
//   if (val && val[0] === '-') {
//     return val.slice(1)
//   }
//   return val
// }

// export const parseBalance = (val: string | undefined, token: Currency, toSignificant = 6): string => {
//   const string = val?.toString()
//   const amount = new CurrencyAmount(token, JSBI.BigInt(absolute(string ?? ''))).toSignificant(toSignificant)
//   if (string && string[0] === '-') {
//     return '-' + amount
//   } else {
//     return amount
//   }
// }

// export function formatDecimals(value: string) {
//   return value.replace(/^\D*(\d*(?:\.\d*)?).*$/g, '$1')
// }
