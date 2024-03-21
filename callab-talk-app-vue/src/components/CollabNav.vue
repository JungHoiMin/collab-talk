<script setup lang="ts">
import { onBeforeMount } from "vue";
import { UserFilled as FriendsIcon } from "@element-plus/icons-vue";
import { useChatRoomStore } from "@/store/useDirectMessageStore";
const chatStore = useChatRoomStore();

onBeforeMount(() => {
  chatStore.loadDmList();
  chatStore.loadRoomList();
});
</script>

<template>
  <el-menu default-active="/" class="nav-menu" router>
    <el-menu-item index="/friend">
      <el-icon>
        <friends-icon />
      </el-icon>
      <span>친구</span>
    </el-menu-item>
    <el-sub-menu index="/dm">
      <template #title><span>DM</span></template>
      <el-menu-item
        class="chat-item"
        v-for="{ id, user, badge } in chatStore.dmList"
        :key="id"
        :index="`/dm/${id}`"
      >
        <el-avatar
          class="chat-profile"
          shape="circle"
          :size="40"
          :src="user.imgSource"
          fit="contain"
        />
        <span class="chat-name">{{ user.name }}</span>
        <el-badge v-if="badge > 0" :value="badge" class="badge"></el-badge>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="/room">
      <template #title><span>ROOM</span></template>
      <el-menu-item
        class="chat-item"
        v-for="{ id, name, imgSource, badge } in chatStore.roomList"
        :key="id"
        :index="`/room/${id}`"
      >
        <el-avatar
          class="chat-profile"
          shape="circle"
          :size="40"
          :src="imgSource"
          fit="contain"
        />
        <el-badge v-if="badge > 0" :value="badge" class="badge">
          <span class="chat-name">{{ name }}</span>
        </el-badge>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<style scoped lang="scss">
.nav-menu {
  user-select: none;

  .chat-item {
    .chat-profile {
      margin-right: 10px;
    }

    .chat-name {
    }

    .badge {
      margin-bottom: 40px;
      margin-left: 10px;
    }
  }
}
</style>
