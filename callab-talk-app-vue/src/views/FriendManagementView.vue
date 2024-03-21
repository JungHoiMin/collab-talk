<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import {
  getFriendListByNickName,
  IFriend,
  requestFriendById,
} from "@/apis/friendManagementView/friendManagementViewApi";
import { Promotion } from "@element-plus/icons-vue";
import { TUser, useChatRoomStore } from "@/store/useDirectMessageStore";
import { useRouter } from "vue-router";

const router = useRouter();
const chatStore = useChatRoomStore();

const searchKeyword = ref("");

const filteredFriendList = ref<IFriend[]>([]);
const friendList = ref<IFriend[]>([]);

const getTableDataByKeyword = () => {
  const keyword = searchKeyword.value;
  filteredFriendList.value = keyword
    ? friendList.value.filter(
        (data) =>
          data.nickName.indexOf(keyword) !== -1 || data.id.startsWith(keyword)
      )
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

const addFriendDialogVisible = ref<boolean>(false);
const addFriendInput = ref<string>("");
const addFriendResult = ref<{ type: string; title: string }>({
  type: "none",
  title: "",
});
const addFriendById = () => {
  const target = addFriendInput.value;
  addFriendResult.value = { title: "", type: "none" };

  if (target === "") return;

  requestFriendById(addFriendInput.value).then((res) => {
    if (res) {
      addFriendResult.value.type = "success";
      addFriendResult.value.title = `${target}님에게 친구 요청 성공`;
      friendList.value.push(res);
    } else {
      addFriendResult.value.type = "error";
      addFriendResult.value.title = `${target}님에게 친구 요청 실패`;
    }

    addFriendInput.value = "";
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
    <div class="new-friend">
      <el-button class="btn-new-friend" @click="addFriendDialogVisible = true"
        >새로운 친구 추가하기</el-button
      >
    </div>
    <div class="search">
      <el-input
        class="search-input"
        v-model="searchKeyword"
        @focusout="getTableDataByKeyword()"
        @keydown.enter="getTableDataByKeyword()"
        size="large"
        placeholder="검색하기"
      />
    </div>
    <div class="search-result">
      <el-table
        class="search-result-table"
        :data="filteredFriendList"
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
    <el-dialog v-model="addFriendDialogVisible" title="친구 추가" width="500">
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="addFriendDialogVisible = false">닫기</el-button>
          <el-button type="primary" @click="addFriendById()">
            추가하기
          </el-button>
        </div>
      </template>
      <template #default>
        <el-input
          v-model="addFriendInput"
          @focusout="addFriendById()"
          @keydown.enter="addFriendById()"
          size="large"
          placeholder="ID를 입력하세요."
        />
        <el-alert
          v-if="addFriendResult.type !== 'none'"
          :title="addFriendResult.title"
          :type="addFriendResult.type"
          :closable="false"
        />
      </template>
    </el-dialog>
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

  .new-friend {
    width: 100%;
    height: 7%;
    display: flex;
    align-items: center;
    .btn-new-friend {
      margin-inline: 30px;
    }
  }
  .search {
    width: 100%;
    height: 8%;
    display: flex;
    align-items: center;
    .search-input {
      margin-inline: 30px;
    }
  }
  .search-result {
    width: 100%;
    height: 85%;
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
