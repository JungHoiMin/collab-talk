<script setup lang="ts">
import { computed, defineProps } from "vue";
import { Check, CloseBold } from "@element-plus/icons-vue";
import { useFriendStore } from "@/store/useFriendStore";
import { dateTimeToString } from "@/utils/dateUtils";
import { useNotificationStore } from "@/store/useNotificationStore";
const props = defineProps<{
  type: "received" | "sent";
  requestId: string;
  nickName: string;
  imgSource: string;
  requested_at: Date;
}>();

const friendStore = useFriendStore();
const getDate = computed(() => dateTimeToString(props.requested_at));

const onBtnClickOk = () => {
  if (props.type === "sent") {
    return;
  } else if (props.type === "received") {
    friendStore.acceptReceivedFriendRequest(props.requestId);
  }
};
const onBtnClickNo = () => {
  if (props.type === "sent") {
    friendStore.cancelSentFriendRequest(props.requestId);
  } else if (props.type === "received") {
    friendStore.rejectReceivedFriendRequest(props.requestId);
  }
};
</script>

<template>
  <div class="new-friend-row">
    <div class="friend-image">
      <el-avatar
        shape="circle"
        :size="40"
        :src="props.imgSource"
        fit="contain"
      />
    </div>
    <div class="friend-nickName">
      <span>{{ props.nickName }}</span>
    </div>
    <div class="action-buttons">
      <el-button
        v-if="props.type !== 'sent'"
        circle
        color="lightgreen"
        :icon="Check"
        @click="onBtnClickOk"
      />
      <el-button circle color="red" :icon="CloseBold" @click="onBtnClickNo" />
    </div>
    <div class="request-date">
      <!--      <span>{{ getDate }}</span>-->
    </div>
  </div>
</template>

<style scoped lang="scss">
.new-friend-row {
  padding: 2px;
  display: grid;
  grid-template-columns: 46px auto 70px;
  grid-template-rows: 30px 16px;
  .friend-image {
    grid-row: 1 / span 2;
  }
  .friend-nickName {
    display: flex;
    align-items: center;
  }
  .action-buttons {
    display: flex;
    justify-content: right;
  }
  .request-date {
    grid-column: 2 / span 2;
    text-align: right;
    span {
      font-size: 10px;
    }
  }
}
</style>
