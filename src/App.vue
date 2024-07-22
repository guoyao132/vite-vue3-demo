<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import {initPageTheme} from './hooks/sys/PageTheme.ts'
initPageTheme();
</script>

<style>
html, body, #app{
  width: 100%;
  height: 100%;
  font-size: 14px;
  overflow: hidden;
}
</style>
