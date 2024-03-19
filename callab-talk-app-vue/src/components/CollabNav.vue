<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { UserFilled as FriendsIcon } from "@element-plus/icons-vue";
import { useChatRoomStore } from "@/store/useDirectMessageStore";
import { useRouter } from "vue-router";

const router = useRouter();
const chatStore = useChatRoomStore();

const goPage = (path: string) => {
  router.push(path);
};

onBeforeMount(() => {
  chatStore.loadDmList();
  chatStore.loadRoomList();
});
</script>

<template>
  <el-menu default-active="2" class="nav-menu">
    <el-menu-item index="1" @click="goPage('/friend')">
      <el-icon>
        <friends-icon />
      </el-icon>
      <span>친구</span>
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title><span>DM</span></template>
      <el-menu-item
        class="chat-item"
        v-for="({ id, user, badge }, idx) in chatStore.dmList"
        :key="id"
        :index="`2-${idx}`"
        @click="goPage(`/chat/${id}`)"
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
    <el-sub-menu index="3">
      <template #title><span>ROOM</span></template>
      <el-menu-item
        class="chat-item"
        v-for="({ id, name, imgSource, badge }, idx) in chatStore.roomList"
        :key="id"
        :index="`3-${idx}`"
        @click="goPage(`/chat/${id}`)"
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
