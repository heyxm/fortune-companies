import { createStore } from 'vuex'
import axios from 'axios'
import type { EnumType } from 'typescript'
import type { ActionContext } from 'vuex/types/index.js'

interface Company {
  rankId: number
  company: string
  ticker: string
  sector: string
  industry: string
  profitable: EnumType
  founderIsCEO: EnumType
  femaleCEO: EnumType
  growthInJobs: EnumType
  changeInRank: number
  gainedInRank: EnumType
  droppedInRank: EnumType
  newcomerToTheFortune500: EnumType
  global500: EnumType
  worldsMostAdmiredCompanies: EnumType
  bestCompanies_toWorkFor: EnumType
  numberOfEmployees: number
  marketCapMarch28M: number | null
  revenuesM: number | null
  revenuePercentChange: number | null
  profitsM: number | null
  profitsPercentChange: number | null
  assetsM: number | null
  CEO: string | null
  aountry: string | null
  headquartersCity: string | null
  headquartersState: string | null
  website: string | null
  companyType: string | null
  footnote: string | null
  marketCapUpdatedM: number | null
  updated: Date
}

interface State {
  companies: Company[]
  total: number
  companyDetail: Company | null
}

interface CompaniesPayload {
  companies: Company[]
  total: number
}

interface CompanyDetailPayload {
  data: Company[]
}

const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // Same host and port as for backend
  headers: {
    'Content-Type': 'application/json',
  },
})

export default createStore({
  state: {
    companies: [],
    total: 0,
    companyDetail: null,
  },
  mutations: {
    setCompanies(state: State, payload: CompaniesPayload) {
      state.companies = payload.companies
      state.total = payload.total
    },
    setCompanyDetail(state: State, payload: CompanyDetailPayload) {
      state.companyDetail = payload.data[0]
    },
  },
  actions: {
    // Fetch list of companies with pagination and optionally with a search query
    async fetchCompanies(
      { commit }: ActionContext<State, State>,
      {
        searchQuery,
        page,
        perPage,
      }: { searchQuery: string; page: number; perPage: number },
    ) {
      const response = await apiClient.get(`/companies`, {
        params: searchQuery
          ? {
              search: searchQuery,
              page,
              perPage,
            }
          : {
              page,
              perPage,
            },
      })
      commit('setCompanies', {
        companies: response.data,
        total: response.data.total,
      })
    },

    // Fetch company details by rankId
    async fetchCompanyDetail(
      { commit }: ActionContext<State, State>,
      id: string | number,
    ) {
      const response = await apiClient.get(`/companies/${id}`)
      commit('setCompanyDetail', response.data)
    },
  },
  getters: {
    companies: (state: State) => state.companies,
    total: (state: State) => state.total,
    companyDetail: (state: State) => state.companyDetail,
  },
})
