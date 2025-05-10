const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

class CurrencyUtils {
  public formatCurrency(value: number) {
    return formatter.format(value);
  }
}

export const currencyUtils = new CurrencyUtils();
