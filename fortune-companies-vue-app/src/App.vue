<template>
  <a-layout class="layout">
    <a-layout-header>
      <h1 style="color: white">Fortune 500 Companies</h1>
    </a-layout-header>
    <a-layout-content class="layout-content">
      <router-view />
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<style>
body {
  margin: 0;
  background: #f5f5f5;
}

.layout {
  height: 100%;

  .ant-layout-header {
    padding-inline: 48px;
    cursor: context-menu;
  }
}

.layout-content {
  height: 100%;
  margin: 24px;
}
</style>
