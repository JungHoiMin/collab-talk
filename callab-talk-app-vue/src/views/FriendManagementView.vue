<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import {
  getFriendListByNickName,
  IFriend,
} from "@/apis/friendManagementView/friendManagementViewApi";
import { Promotion } from "@element-plus/icons-vue";
import { TUser, useChatRoomStore } from "@/store/useDirectMessageStore";
import { useRouter } from "vue-router";

const router = useRouter();
const chatStore = useChatRoomStore();

const searchKeyword = ref("");

const tableData = ref<IFriend[]>([]);
const friendList = ref<IFriend[]>([]);

const getTableDataByKeyword = () => {
  const keyword = searchKeyword.value;
  tableData.value = keyword
    ? friendList.value.filter((data) => data.nickName.indexOf(keyword) !== -1)
    : friendList.value;
};

const requestAddFriend = async (selectedUser: TUser) => {
  let dmId =
    chatStore.dmList.find(({ user }) => user.id === selectedUser.id)?.id || "";

  if (dmId) await router.push(`/chat/${dmId}`);
  else {
    dmId = await chatStore.addNewDM(selectedUser);
    await router.push(`/chat/${dmId}`);
  }
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
        <el-table-column prop="nickName" />
        <el-table-column width="100px">
          <template #default="scope">
            <el-button
              size="large"
              circle
              :icon="Promotion"
              type="info"
              @click="requestAddFriend(scope.row)"
            />
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
      margin-inline: 30px;
      //width: calc(100% - 60px);
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
