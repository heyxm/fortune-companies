import { useValueFormatter } from '@/composables/useValueFormatter'

const { formatValue } = useValueFormatter()

export function useLocationFormatter() {
  const formatLocation = (city: string, state: string, country: string) => {
    const stateValue = state ? state + ', ' : ''
    return formatValue(city) + ', ' + stateValue + formatValue(country)
  }

  return { formatLocation }
}
