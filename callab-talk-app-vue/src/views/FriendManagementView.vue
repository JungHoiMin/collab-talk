<script setup lang="ts">
import { computed, onBeforeMount, ref } from "vue";
import CollabTable from "@/components/collabTable/CollabTable.vue";
import {
  CallabTableData,
  CollabTableHeader,
} from "@/components/collabTable/types";
import {
  getFriendListByNickName,
  IFriend,
} from "@/apis/friendManagementView/friendManagementViewApi";

const searchKeyword = ref("");
const tableHeader: CollabTableHeader[] = [];
const tableData = ref<CallabTableData[]>([]);
const friendList = ref<IFriend[]>([]);

const getTableDataByKeyword = () => {
  const keyword = searchKeyword.value;
  const dataList = keyword
    ? friendList.value.filter(
        (data) => data.name === keyword || data.nickName === keyword
      )
    : friendList.value;
  tableData.value = dataList.map((data) => {
    return [
      { key: "nickName", label: data.nickName },
      { key: "imgSource", label: data.imgSource },
    ];
  });
};

onBeforeMount(() => {
  getFriendListByNickName().then((data) => {
    friendList.value = data;
    getTableDataByKeyword();
  });
});
</script>

<template>
  <div class="friend-management">
    <el-input
      class="search-input"
      v-model="searchKeyword"
      @focusout="getTableDataByKeyword()"
      @keydown.enter="getTableDataByKeyword()"
      size="large"
      placeholder="검색하기"
    />
    <CollabTable
      class="friend-table"
      show-header
      :header="tableHeader"
      :data="tableData"
    >
      <template #description>
        <div>온라인 - {{ tableData.length }}명</div>
      </template>
    </CollabTable>
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
    padding: 30px 30px 10px;
  }
  .friend-table {
    height: 100%;
  }
}
</style>
