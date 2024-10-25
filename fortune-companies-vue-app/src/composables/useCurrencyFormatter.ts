export function useCurrencyFormatter() {
  const formatCurrency = (value: number) => {
    return value
      ? value.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) +
          'M'
      : '-'
  }

  return { formatCurrency }
}
