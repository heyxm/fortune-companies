<template>
    <div class="company-search-wrapper" v-if="!error">
        <!-- Search bar and button to clear search query -->
        <div class="search"><a-input-search v-model:value="searchQuery" placeholder="Search companies"
                enter-button="Search" @search="searchCompanies(true)" style="margin-bottom: 16px" />
            <a-button class="search-clear" @click="clearSearch">Clear</a-button>
        </div>

        <!-- List of results -->
        <CompanySearch v-if="!isLoading" :companies="companies" :isLoading="isLoading" />

        <!-- Pagination -->
        <a-pagination v-if="total > 0 && !isLoading" :current="currentPage" :total="total" :pageSize="pageSize"
            @change="handlePageChange" style="margin-top: 16px; text-align: center" />
    </div>

    <!-- No data for search query -->
    <a-empty v-if="!companies.length" :image="simpleImage" />

    <!-- Spinner -->
    <a-spin v-if="isLoading" size="large" tip="Loading..." />

    <!-- Error from server -->
    <ErrorPage v-if="error && !isLoading" :errorCode="errorCode" :errorMessage="error" />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { AxiosError } from "axios";
import { Empty } from 'ant-design-vue';
import CompanySearch from "../components/CompanySearch.vue";
import ErrorPage from "../components/ErrorPage.vue";

export default defineComponent({
    name: "CompanySearchView",
    components: {
        CompanySearch,
        ErrorPage
    },
    setup() {
        const store = useStore();
        const companies = ref([]);
        const searchQuery = ref("");
        const currentPage = ref(1);
        const total = ref(0);
        const pageSize = ref(10);
        const isLoading = ref(false);
        const error = ref<string | null>(null);
        const errorCode = ref<number>(500);

        const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;

        const searchCompanies = async (isSearch = false) => {
            isLoading.value = true;
            if (isSearch) currentPage.value = 1;
            try {
                await store.dispatch("fetchCompanies", { searchQuery: searchQuery.value, page: currentPage.value, perPage: pageSize.value });
                companies.value = store.getters.companies.data;
                total.value = store.getters.companies.total;
                currentPage.value = store.getters.companies.pagination.page;
                pageSize.value = store.getters.companies.pagination.perPage;
            } catch (err: unknown) {
                if (err instanceof AxiosError && err.response) {
                    errorCode.value = err.response.status;
                    error.value = err.response.data.message || "Error loading company details.";
                } else {
                    errorCode.value = 500;
                    error.value = "Something went wrong.";
                }
            }
            isLoading.value = false;
        };

        const clearSearch = () => {
            searchQuery.value = "";
            currentPage.value = 1;
            searchCompanies();
        }

        const handlePageChange = (page: number, perPage: number) => {
            currentPage.value = page;
            pageSize.value = perPage;
            searchCompanies();
        };

        onMounted(() => {
            searchCompanies();
        });

        return {
            companies,
            searchQuery,
            currentPage,
            total,
            pageSize,
            isLoading,
            error,
            errorCode,
            simpleImage,
            searchCompanies,
            clearSearch,
            handlePageChange
        };
    }
});
</script>

<style scoped>
.company-search-wrapper {
    display: flex;
    flex-direction: column;
}

.search {
    display: flex;

    .search-clear {
        margin-left: 10px;
    }
}

.ant-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
}

.ant-spin {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
}

.ant-spin :deep(.ant-spin-text) {
    margin-top: 10px;
}

.ant-pagination {
    margin-bottom: 24px;
}
</style>