<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { Promotion } from "@element-plus/icons-vue";
import { TUser, useChatRoomStore } from "@/store/useChatRoomStore";
import { useRouter } from "vue-router";
import { TFriend, useFriendStore } from "@/store/useFriendStore";
import CollabNewFriend from "@/components/friend/CollabNewFriend.vue";
import { useNotificationStore } from "@/store/useNotificationStore";

const router = useRouter();
const chatStore = useChatRoomStore();
const friendStore = useFriendStore();
const notificationStore = useNotificationStore();

const searchKeyword = ref("");

const filteredFriendList = ref<TFriend[]>([]);

const getTableDataByKeyword = () => {
  const keyword = searchKeyword.value;
  filteredFriendList.value = keyword
    ? friendStore.friendList.filter(
        (data) =>
          data.nickName.indexOf(keyword) !== -1 || data.id.startsWith(keyword)
      )
    : friendStore.friendList;
};

const requestAddFriend = async (selectedUser: TUser) => {
  let dmId =
    chatStore.dmList.find(({ user }) => user.id === selectedUser.id)?.id || "";

  if (!dmId) dmId = await chatStore.addNewDM(selectedUser);

  await router.push({
    name: "dm",
    params: {
      id: dmId,
    },
  });
};

const addFriendDialogVisible = ref<boolean>(false);

onBeforeMount(() => {
  friendStore.loadFriendList().then((value) => {
    if (value) getTableDataByKeyword();
  });
});
</script>

<template>
  <div class="friend-management">
    <div class="new-friend">
      <el-badge
        class="btn-new-friend-badge"
        :value="notificationStore.receivedFriendRequestBadge"
        :max="99"
        :show-zero="false"
      >
        <el-button @click="addFriendDialogVisible = true">
          새로운 친구
        </el-button>
      </el-badge>
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
    <CollabNewFriend v-model="addFriendDialogVisible" />
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
    .btn-new-friend-badge {
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
