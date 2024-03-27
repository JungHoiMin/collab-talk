<script setup lang="ts">
import CollabNotification from "@/components/notification/CollabNotification.vue";
</script>

<template>
  <div class="collab-header collab-user-select-none">
    <img class="logo collab-click-cursor" alt="logo" src="@/assets/logo.png" />
    <div>
      <collab-notification />
      <button>자기 프로필</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.collab-header {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo {
    width: 300px;
    height: auto;
  }
}
</style>
