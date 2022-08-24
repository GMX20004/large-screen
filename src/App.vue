<template>
  <router-view />
</template>
<script setup lang="ts">
import { getCurrentInstance, provide } from "vue";
const { proxy } = getCurrentInstance() as any;
provide('proxy',proxy);
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  user-select: none;
}
</style>
