<script lang="ts" setup>
import { locale } from '@/store';
import App from './App.vue';
</script>

<template>
  <el-config-provider :locale="locale">
    <App />
  </el-config-provider>
</template>
