<template>
    <!-- Breadcrumbs navigation -->
    <a-breadcrumb class="breadcrumbs">
        <a-breadcrumb-item class="breadcrumbs-active" @click="goBackHome()">
            <HomeOutlined />
        </a-breadcrumb-item>
        <a-breadcrumb-item>
            <a-skeleton v-if="isLoading" active :title="{ width: 100 }" :paragraph="{ rows: 0 }" />
            <div v-if="!isLoading">{{ company.company }}</div>
        </a-breadcrumb-item>
    </a-breadcrumb>

    <!-- CompanyDetail component -->
    <div v-if="!error && !isLoading">
        <CompanyDetail :company="company" />
    </div>

    <!-- Spinner -->
    <a-spin v-if="isLoading" size="large" tip="Loading..." />

    <!-- Errors from server -->
    <ErrorPage v-if="error && !isLoading" :errorCode="errorCode" :errorMessage="error" />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { AxiosError } from "axios";
import { HomeOutlined } from "@ant-design/icons-vue";
import CompanyDetail from "../components/CompanyDetail.vue";
import ErrorPage from "../components/ErrorPage.vue";

export default defineComponent({
    name: "CompanyDetailView",
    components: {
        HomeOutlined,
        CompanyDetail,
        ErrorPage,
    },
    setup() {
        const store = useStore();
        const route = useRoute();
        const router = useRouter();
        const company = ref({ company: null });
        const isLoading = ref(false);
        const error = ref<string | null>(null);
        const errorCode = ref<number>(500);

        const fetchCompanyDetail = async (id: number) => {
            isLoading.value = true;
            try {
                await store.dispatch("fetchCompanyDetail", id);
                company.value = store.getters.companyDetail;
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

        const goBackHome = () => {
            router.push(`/`);
        };

        onMounted(() => {
            const companyId = Number(route.params.id);
            fetchCompanyDetail(companyId);
        });

        return {
            goBackHome,
            isLoading,
            company,
            error,
            errorCode
        };
    },
});
</script>

<style scoped>
.breadcrumbs {
    margin-left: 24px;
    margin-bottom: 24px;
    cursor: pointer;
}

.breadcrumbs-active {
    color: #1677ff;
}

.ant-skeleton {
    padding-top: 4px;
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
</style>