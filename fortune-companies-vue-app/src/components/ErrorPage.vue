<template>
    <div class="error-page">
        <h1>Error {{ errorCode }}</h1>
        <p>{{ errorMessage }}</p>
        <router-link to="/">Go back to search</router-link>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "ErrorPage",
    props: {
        errorCode: {
            type: Number,
            required: true,
        },
        errorMessage: {
            type: String,
            required: true,
        },
    },
});
</script>

<style scoped>
.error-page {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    width: 100%;
    height: 100%;
    padding: 50px;
}

.error-page h1 {
    font-size: 48px;
    margin-bottom: 20px;
}

.error-page p {
    font-size: 18px;
}
</style>