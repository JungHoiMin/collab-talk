<script setup lang="ts">
import { defineModel, ref } from "vue";
import { useFriendStore } from "@/store/useFriendStore";
import CollabNewFriendRow from "@/components/friend/CollabNewFriendRow.vue";

const addFriendDialogVisible = defineModel();

const friendStore = useFriendStore();

const addFriendInput = ref<string>("");
const addFriendResult = ref<{
  type: "warning" | "success" | "error" | "none";
  title: string;
}>({
  type: "none",
  title: "",
});
const addFriendById = async () => {
  const id = addFriendInput.value;
  addFriendResult.value = { title: "", type: "none" };

  if (id === "") return;

  if (await friendStore.isAlreadyExisting("sent", id)) {
    addFriendResult.value = {
      type: "warning",
      title: `${id}님에게 이미 친구요청을 한 상태입니다.`,
    };
  } else if (await friendStore.isAlreadyExisting("received", id)) {
    await friendStore.acceptReceivedFriendRequest(id);
    addFriendResult.value = {
      type: "success",
      title: `${id}님이 이미 친구요청을 해서 수락합니다.`,
    };
  } else if (await friendStore.isAlreadyExisting("friend", id)) {
    addFriendResult.value = {
      type: "warning",
      title: `${id}님과 이미 친구입니다.`,
    };
  } else {
    friendStore.sendFriendRequest(addFriendInput.value).then((res) => {
      if (res) {
        addFriendResult.value.type = "success";
        addFriendResult.value.title = `${id}님에게 친구 요청 성공`;
      } else {
        addFriendResult.value.type = "error";
        addFriendResult.value.title = `친구 요청 실패. ${id}라는 사용자를 찾을 수 없습니다.`;
      }
    });
  }
  addFriendInput.value = "";
};
</script>

<template>
  <el-dialog
    v-model="addFriendDialogVisible"
    title="새로운 친구 관리"
    :width="620"
  >
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="addFriendDialogVisible = false">닫기</el-button>
      </div>
    </template>
    <template #default>
      <div class="friend-management-view">
        <div class="friend-add">
          <h3>친구 추가</h3>
          <div class="friend-add-body">
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
          </div>
          <div class="friend-add-footer">
            <el-button type="primary" @click="addFriendById()">
              추가하기
            </el-button>
          </div>
        </div>
        <div class="friend-request-management">
          <div class="friend-request">
            <h3>나에게 온 요청</h3>
            <el-table
              class="friend-request-received"
              :show-header="false"
              :height="300"
              :max-height="300"
              :data="friendStore.receivedFriendRequestList"
            >
              <el-table-column>
                <template #default="props">
                  <collab-new-friend-row
                    type="received"
                    :request-id="props.row.id"
                    :nick-name="props.row.nickName"
                    :img-source="props.row.imgSource"
                    :requested_at="props.row.requested_at"
                  />
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="friend-request">
            <h3>내가 보낸 요청</h3>
            <el-table
              class="friend-request-sent"
              :show-header="false"
              :height="300"
              :max-height="300"
              :data="friendStore.sentFriendRequestList"
            >
              <el-table-column>
                <template #default="props">
                  <collab-new-friend-row
                    type="sent"
                    :request-id="props.row.id"
                    :nick-name="props.row.nickName"
                    :img-source="props.row.imgSource"
                    :requested_at="props.row.requested_at"
                  />
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.friend-management-view {
  user-select: none;
  padding-inline: 20px;
  .friend-add {
    margin-bottom: 30px;
    text-align: left;
    background-color: antiquewhite;
    padding: 2px 20px 10px;
    .friend-add-body {
      padding-bottom: 10px;
    }
    .friend-add-footer {
      display: flex;
      justify-content: right;
    }
  }
  .friend-request-management {
    display: flex;
    justify-content: space-between;
    .friend-request {
      text-align: left;
      background-color: antiquewhite;
      padding: 10px;
      .friend-request-sent,
      .friend-request-received {
        width: 240px;
      }
    }
  }
}
</style>
