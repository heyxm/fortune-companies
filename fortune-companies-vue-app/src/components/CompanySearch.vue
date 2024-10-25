<template>
    <a-list v-if="companies.length" :dataSource="companies" bordered>
        <template #renderItem="{ item: record }">
            <a-list-item class="list-item" @click="viewCompanyDetail(record.rankId)">
                <h1 class="list-item-rank">{{ record.rankId }}</h1>
                <a-list-item-meta>
                    <!-- Title: company, ticker and website link -->
                    <template #title>
                        <div class="list-item-title">
                            <h2 class="list-item-title-label">{{ record.company + " (" + record.ticker + ")" }}</h2>
                            <a class="list-item-title-link" :href="record.website" target=”_blank” v-on:click.stop>
                                <ExportOutlined />
                            </a>
                        </div>
                    </template>
                    <!-- Description: companyType, profitable, industry (industry, sector) and location (headquartersCity,
                     headquartersState, country) -->
                    <template #description>
                        <div>{{ record.companyType + " · " + formatProfitable(record.profitable) + " · " +
                            formatIndustry(record.industry, record.sector) + " · " +
                            formatLocation(record.headquartersCity, record.headquartersState, record.country) }}
                        </div>
                        <div>CEO: {{ record.CEO }}</div>
                    </template>
                </a-list-item-meta>
                <!-- Statistics: revenuesM, marketCapMarch28M, profitsM and numberOfEmployees -->
                <div class="statistics">
                    <a-statistic title="Revenue ($M)" :value="record.revenuesM" />
                    <a-statistic title="Market Cap ($M)" :value="record.marketCapMarch28M" />
                    <a-statistic title="Profits ($M)" :value="record.profitsM" />
                    <a-statistic title="Number Of Employees" :value="record.numberOfEmployees" />
                </div>
            </a-list-item>
        </template>
    </a-list>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { ExportOutlined } from "@ant-design/icons-vue";
import { useCurrencyFormatter } from "@/composables/useCurrencyFormatter";
import { useLocationFormatter } from "@/composables/useLocationFormatter";
import { useIndustryFormatter } from "@/composables/useIndustryFormatter";
import { useProfitableFormatter } from "@/composables/useProfitableFormatter";

export default defineComponent({
    name: "CompanySearch",
    components: {
        ExportOutlined
    },
    setup() {
        const router = useRouter();
        const { formatCurrency } = useCurrencyFormatter();
        const { formatLocation } = useLocationFormatter();
        const { formatIndustry } = useIndustryFormatter();
        const { formatProfitable } = useProfitableFormatter();

        const viewCompanyDetail = (companyId: number) => {
            router.push(`/company/${companyId}`);
        };

        return {
            viewCompanyDetail,
            formatCurrency,
            formatLocation,
            formatIndustry,
            formatProfitable
        };
    },
    props: {
        companies: {
            type: Object,
            required: true,
        }
    },
});
</script>

<style scoped>
.ant-list-item {
    flex-wrap: wrap;
    cursor: pointer;
    padding: 20px 24px 8px 24px;
}

.ant-list-item-meta {
    margin-bottom: 12px;
}

.ant-list-item:hover {
    background-color: #f0f0f0;
}

.list-item-rank {
    color: rgba(0, 0, 0, 0.45);
    margin-right: 30px;
}

.list-item-title {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    .list-item-title-link {
        margin-left: 10px;
    }

    .list-item-title-label {
        margin: 0;
    }
}

.statistics {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 12px;
}

.statistics>* {
    margin-left: 20px;
}

.statistics :deep(.ant-statistic-content-value) {
    font-size: 21px;
}
</style>