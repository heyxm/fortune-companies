<template>
    <a-card>
        <template #title>
            <div class="title-wrapper">
                <!-- Title: company, ticker ans website link -->
                <div class="title">
                    <h2 class="title-label">{{ company.company + " (" + company.ticker + ")" }}</h2>
                    <a class="title-link" :href="company.website" target=”_blank” v-on:click.stop>
                        <ExportOutlined />
                    </a>
                </div>
                <!-- Tags for rankId, gainedInRank, droppedInRank, companyType, profitable, global500, newcomerToTheFortune500,
                 founderIsCEO, femaleCEO, worldsMostAdmiredCompanies, bestCompaniesToWorkFor and growthInJobs -->
                <div class="tags">
                    <a-tag class="title-tag" color="blue">Rank: {{ company.rankId }}</a-tag>
                    <a-tag v-if="company.gainedInRank === 'yes'" class="title-tag" color="green">Gained in rank: {{
                        company.changeInRank }}</a-tag>
                    <a-tag v-if="company.droppedInRank === 'yes'" class="title-tag" color="red">Dropped in rank: {{
                        company.changeInRank }}</a-tag>
                    <a-tag class="title-tag" color="blue">{{ company.companyType }}</a-tag>
                    <a-tag class="title-tag" color="blue">{{ formatProfitable(company.profitable) }}</a-tag>
                    <a-tag v-if="company.global500 === 'yes'" class="title-tag" color="blue">Global 500</a-tag>
                    <a-tag v-if="company.newcomerToTheFortune500 === 'yes'" class="title-tag" color="blue">Newcomer to
                        the
                        Fortune 500</a-tag>
                    <a-tag v-if="company.founderIsCEO === 'yes'" class="title-tag" color="blue">Founder is CEO</a-tag>
                    <a-tag v-if="company.femaleCEO === 'yes'" class="title-tag" color="blue">Female CEO</a-tag>
                    <a-tag v-if="company.worldsMostAdmiredCompanies === 'yes'" class="title-tag" color="blue">Worlds
                        most
                        admired
                        companies</a-tag>
                    <a-tag v-if="company.bestCompaniesToWorkFor === 'yes'" class="title-tag" color="blue">Best companies
                        to
                        work
                        for</a-tag>
                    <a-tag v-if="company.growthInJobs === 'yes'" class="title-tag" color="blue">Growth in jobs</a-tag>
                </div>
            </div>
        </template>
        <!-- Company info: CEO, Industry (Sector + Industry), Location (headquartersCity + headquartersState + country),
         footnote and date of last update (updated) -->
        <div class="company-info">
            <div class="company-info-text">
                <div>CEO: {{ company.CEO }}</div>
                <div>Industry: {{ formatIndustry(company.industry, company.sector) }}</div>
                <div>Location: {{ formatLocation(company.headquartersCity, company.headquartersState, company.country)
                    }}
                </div>
                <div>{{ company.footnote }}</div>
                <div>Last Updated: {{ formatDate(company.updated) }}</div>
            </div>
            <!-- Statistics for revenuesM, revenuePercentChange, profitsM, profitsPercentChange, marketCapMarch28M,
             marketCapUpdatedM, assetsM and numberOfEmployees -->
            <div class="statistics">
                <a-card>
                    <a-statistic title="Revenue ($M)" :value="company.revenuesM" />
                    <!-- Custom Statistics component with Caret up and down icons -->
                    <CustomStatistics title="Revenue Percent Change" :value="company.revenuePercentChange" />
                </a-card>
                <a-card>
                    <a-statistic title="Profits ($M)" :value="company.profitsM" />
                    <CustomStatistics title="Profits Percent Change" :value="company.profitsPercentChange" />
                </a-card>
                <a-card>
                    <a-statistic title="MarketCap March 28 ($M)" :value="company.marketCapMarch28M" />
                    <a-statistic title="Market Cap Updated ($M)" :value="company.marketCapUpdatedM" />
                </a-card>
                <a-card>
                    <a-statistic title="Assets ($M)" :value="company.assetsM" />
                </a-card>
                <a-card>
                    <a-statistic title="Number Of Employees" :value="company.numberOfEmployees" />
                </a-card>
            </div>
        </div>
    </a-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ExportOutlined } from "@ant-design/icons-vue";
import { useCurrencyFormatter } from "@/composables/useCurrencyFormatter";
import { useLocationFormatter } from "@/composables/useLocationFormatter";
import { useIndustryFormatter } from "@/composables/useIndustryFormatter";
import { useProfitableFormatter } from "@/composables/useProfitableFormatter";
import { useDateFormatter } from "@/composables/useDateFormatter";
import CustomStatistics from "./CustomStatistics.vue";

export default defineComponent({
    name: "CompanyDetail",
    components: {
        ExportOutlined,
        CustomStatistics
    },
    setup() {
        const { formatCurrency } = useCurrencyFormatter();
        const { formatLocation } = useLocationFormatter();
        const { formatIndustry } = useIndustryFormatter();
        const { formatProfitable } = useProfitableFormatter();
        const { formatDate } = useDateFormatter();

        return {
            formatCurrency,
            formatLocation,
            formatIndustry,
            formatProfitable,
            formatDate
        };
    },
    props: {
        company: {
            type: Object,
            required: true,
        },
    },
});
</script>

<style scoped>
.title-wrapper {
    margin: 20px 0 14px 0;
}

.title {
    display: flex;
    align-items: center;
    margin-bottom: 2px;

    .title-label {
        margin: 0;
    }

    .title-link {
        margin-left: 10px;
    }
}

.tags {
    display: flex;
    flex-wrap: wrap;
}

.title-tag {
    margin-bottom: 6px;
}

.company-info {
    display: flex;
    justify-content: space-between;
}

.company-info-text>* {
    padding-bottom: 2px;
}

.statistics {
    display: flex;
}

.statistics>* {
    margin-bottom: 20px;
}

.statistics>*:not(:last-child) {
    margin-right: 20px;
}

.statistics :deep(.ant-statistic-content-value) {
    font-size: 21px;
}

.statistics :deep(.ant-card-bod)y {
    padding: 20px;
}

@media only screen and (max-width: 600px) {
    .company-info {
        flex-wrap: wrap;
    }

    .statistics {
        flex-wrap: wrap;
    }
}
</style>