export function useProfitableFormatter() {
  const formatProfitable = (value: string) => {
    if (!value) return 'N/A'
    return value === 'yes' ? 'Profitable' : 'Non Profitable'
  }

  return { formatProfitable }
}
