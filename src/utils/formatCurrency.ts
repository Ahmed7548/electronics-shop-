const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency:"USD",style:"currency"
});
export const currencyFormater = (number: number): string =>
	CURRENCY_FORMATTER.format(number);
