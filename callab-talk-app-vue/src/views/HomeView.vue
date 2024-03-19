<template>
  <collab-layout class="main">
    <template #header>
      <img src="../assets/logo.png" alt="logo" :width="400" />
    </template>
    <template #nav>
      <collab-nav />
    </template>
    <template #default>
      <router-view />
    </template>
  </collab-layout>
</template>

<script setup lang="ts">
import CollabLayout from "@/views/layout/CollabLayout.vue";
import CollabNav from "@/components/CollabNav.vue";
</script>

<style scoped lang="scss">
.main {
}
</style>
