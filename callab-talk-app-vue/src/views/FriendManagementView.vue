<script setup lang="ts">
import { ref } from "vue";
import CollabTable from "@/components/collabTable/CollabTable.vue";
import {
  CallabTableData,
  CollabTableHeader,
} from "@/components/collabTable/types";

const keyword = ref("");
const header: CollabTableHeader[] = [];
const friendList = ref<CallabTableData[]>([]);
</script>

<template>
  <div class="friend-management">
    <el-input
      class="search-input"
      v-model="keyword"
      placeholder="Please input"
    />
    <CollabTable show-header :header="header" :data="friendList">
      <template #description> 모든 친구 - {{ friendList.length }}명 </template>
    </CollabTable>
    <div class="friend-table">
      <p class="table"></p>
      <div class="table-body"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.friend-management {
  height: calc(100% - 20px);
  margin: 10px;
  background-color: antiquewhite;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .search-input {
    width: 100%;
  }
  .friend-table {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
