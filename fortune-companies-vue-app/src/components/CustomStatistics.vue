<template>
    <a-statistic :title="title" :value="!!value ? value : '0'"
        :value-style="{ color: !!value && getColorBasedOnValue(value) }">
        <template #suffix>
            %
            <CaretUpOutlined v-if="value > 0" />
            <CaretDownOutlined v-if="value < 0" />
        </template>
    </a-statistic>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons-vue";

export default defineComponent({
    name: "CustomStatistics",
    components: {
        CaretUpOutlined,
        CaretDownOutlined
    },
    setup() {
        const redColor = "#cf1322";
        const greenColor = "#3f8600";

        const getColorBasedOnValue = (value: number) => {
            if (value > 0) return greenColor;
            if (value < 0) return redColor;
        }

        return {
            getColorBasedOnValue
        }
    },
    props: {
        title: {
            type: String,
            required: true,
        },
        value: {
            type: Number,
            required: true,
        },
    },
});
</script>

<style scoped>
.statistics {
    display: flex;
}

.statistics>* {
    margin: 0 0 20px 20px;
}

.statistics :deep(.ant-statistic-content) {
    font-size: 21px;
}

.statistics :deep(.ant-card-bod)y {
    padding: 20px;
}
</style>