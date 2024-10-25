import { useValueFormatter } from '@/composables/useValueFormatter'

const { formatValue } = useValueFormatter()

export function useIndustryFormatter() {
  const formatIndustry = (industry: string, sector: string) => {
    return formatValue(industry) + ', ' + formatValue(sector)
  }

  return { formatIndustry }
}
