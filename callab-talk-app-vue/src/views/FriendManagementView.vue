<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import {
  getFriendListByNickName,
  IFriend,
} from "@/apis/friendManagementView/friendManagementViewApi";

const searchKeyword = ref("");

const tableData = ref<IFriend[]>([]);
const friendList = ref<IFriend[]>([]);

const getTableDataByKeyword = () => {
  const keyword = searchKeyword.value;
  tableData.value = keyword
    ? friendList.value.filter(
        (data) => data.name === keyword || data.nickName === keyword
      )
    : friendList.value;
};

const requestAddFriend = (id: string) => {
  console.log(id);
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
    <div class="search-result">
      <el-table
        class="search-result-table"
        :data="tableData"
        row-class-name="data-row"
        :show-header="false"
      >
        <el-table-column align="center" width="70px">
          <template #default="scope">
            <el-avatar
              shape="circle"
              :size="40"
              :src="scope.row.imgSource"
              fit="contain"
            />
          </template>
        </el-table-column>
        <el-table-column prop="nickName" width="150px" />
        <el-table-column width="200px">
          <template #default="scope">
            <el-button
              class="hover-button"
              @click="requestAddFriend(scope.row.id)"
              >친구추가요청
            </el-button>
          </template>
        </el-table-column>
      </el-table>
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
    padding: 30px 30px 10px;
  }
  .search-result {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    text-align: left;
    .search-result-table {
      width: calc(100% - 60px);
      height: calc(100% - 30px);
      .data-row {
        .hover-button {
          visibility: hidden;
        }
      }
      .data-row:hover {
        .hover-button {
          visibility: visible;
        }
      }
    }
  }
}
</style>
