<template>
  <collab-layout class="main">
    <template #header>
      <collab-header />
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
import CollabHeader from "@/components/CollabHeader.vue";
</script>

<style scoped lang="scss">
.main {
}
</style>
