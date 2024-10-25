export function useValueFormatter() {
  const formatValue = (value: string | number) => {
    return value ? value : 'N/A'
  }

  return { formatValue }
}
