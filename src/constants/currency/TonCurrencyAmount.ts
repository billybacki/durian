import invariant from 'tiny-invariant'
import JSBI from 'jsbi'
import _Big from 'big.js'
import toFormat from 'toformat'
import BigNumber from 'bignumber.js'
import { TonCurrency } from './TonCurrency'
import { Fraction } from './fraction'
import { BigintIsh, Rounding, SolidityType, TEN } from './constants'
import { parseBigintIsh, validateSolidityTypeInstance } from './utils'
import { tryParseAmount } from '@/utils/parseAmount'

const Big = toFormat(_Big)

export class TonCurrencyAmount extends Fraction {
  public currency: TonCurrency

  /**
   * ！Deprecated method, do not use
   * Helper that calls the constructor with the ETHER currency
   * @param amount ether amount in wei
   */
  public static ether(amount: BigintIsh): TonCurrencyAmount {
    return new TonCurrencyAmount(TonCurrency.getNativeCurrency(), amount)
  }

  // amount _must_ be raw, i.e. in the native representation
  constructor(currency: TonCurrency, amount: BigintIsh) {
    const parsedAmount = parseBigintIsh(amount)
    validateSolidityTypeInstance(parsedAmount, SolidityType.uint256)

    super(parsedAmount, JSBI.exponentiate(TEN, JSBI.BigInt(currency.decimals)))
    this.currency = currency
  }

  public get raw(): JSBI {
    return this.numerator
  }

  public add(other: TonCurrencyAmount): TonCurrencyAmount {
    invariant(currencyEquals(this.currency, other.currency), 'JETTON')
    return new TonCurrencyAmount(this.currency, JSBI.add(this.raw, other.raw))
  }

  public subtract(other: TonCurrencyAmount): TonCurrencyAmount {
    invariant(currencyEquals(this.currency, other.currency), 'JETTON')
    return new TonCurrencyAmount(this.currency, JSBI.subtract(this.raw, other.raw))
  }

  public toSignificant(
    significantDigits = 6,
    format: Record<string, unknown> = { groupSeparator: ',' },
    rounding: Rounding = Rounding.ROUND_DOWN
  ): string {
    return super.toSignificant(significantDigits, format, rounding)
  }

  public toFixed(
    decimalPlaces: number = this.currency.decimals,
    format?: Record<string, unknown>,
    rounding: Rounding = Rounding.ROUND_DOWN
  ): string {
    invariant(decimalPlaces <= this.currency.decimals, 'DECIMALS')
    return super.toFixed(decimalPlaces, format, rounding)
  }

  public toExact(format: Record<string, unknown> = { groupSeparator: '' }): string {
    Big.DP = this.currency.decimals
    return new Big(this.numerator.toString()).div(this.denominator.toString()).toFormat(format)
  }

  public mul(other: TonCurrencyAmount | JSBI | number | BigNumber): TonCurrencyAmount {
    const val = other instanceof TonCurrencyAmount ? other.toExact() : other instanceof JSBI ? other.toString() : other
    return TonCurrencyAmount.fromAmount(
      this.currency,
      new BigNumber(val).times(this.toExact()).toString()
    ) as TonCurrencyAmount
  }

  public div(other: TonCurrencyAmount | JSBI | number | BigNumber): TonCurrencyAmount {
    const val = other instanceof TonCurrencyAmount ? other.toExact() : other instanceof JSBI ? other.toString() : other
    return TonCurrencyAmount.fromAmount(
      this.currency,
      new BigNumber(this.toExact()).div(val).toString()
    ) as TonCurrencyAmount
  }

  /**
   * Returns a new currency amount instance from the unitless amount of token, i.e. the raw amount
   * @param currency the currency in the amount
   * @param rawAmount the raw token or ether amount
   */
  public static fromRawAmount(currency: TonCurrency, rawAmount: BigintIsh): TonCurrencyAmount {
    return new TonCurrencyAmount(currency, rawAmount)
  }

  /**
   * Returns a new currency amount instance from the user input amount of token
   * @param amount the raw token or ether amount
   * @param currency the currency in the amount
   */
  public static fromAmount(currency: TonCurrency, amount: string | number): TonCurrencyAmount | undefined {
    return tryParseAmount(amount.toString(), currency)
  }
}

function currencyEquals(currencyA: TonCurrency, currencyB: TonCurrency): boolean {
  if (currencyA instanceof TonCurrency && currencyB instanceof TonCurrency) {
    return currencyA.equals(currencyB)
  } else if (currencyA instanceof TonCurrency) {
    return false
  } else if (currencyB instanceof TonCurrency) {
    return false
  } else {
    return currencyA === currencyB
  }
}
