<script setup lang="ts">
import { Bell, BellFilled } from "@element-plus/icons-vue";
import { onBeforeMount, ref } from "vue";
import {
  TNotification,
  useNotificationStore,
} from "@/store/useNotificationStore";
import CollabNotificationRow from "@/components/notification/CollabNotificationRow.vue";

const notificationStore = useNotificationStore();

const isHoverNotificationIcon = ref<boolean>(false);
const isVisibleNotificationPopover = ref<boolean>(false);

const setRowClass = (row: {
  checked: boolean;
  name: string;
  address: string;
}) => {
  const result: string[] = ["collab-click-cursor"];
  if (row.checked) result.push("is-checked");

  return result.join(" ");
};

const onClickNotification = (notification: TNotification) => {
  if (!notification.checked) {
    notificationStore.checkNotification(notification.id);
  }
  isVisibleNotificationPopover.value = false;
  console.log(notification.type, JSON.stringify(notification.data, null, 2));
};

onBeforeMount(() => {
  notificationStore.loadNotificationList();
});
</script>

<template>
  <el-popover
    placement="left-end"
    title="알림"
    :width="440"
    trigger="click"
    v-model:visible="isVisibleNotificationPopover"
    popper-class="collab-user-select-none"
  >
    <template #reference>
      <el-badge :value="notificationStore.badge" :max="99" :show-zero="false">
        <el-icon
          class="collab-click-cursor"
          :size="40"
          @mouseenter="isHoverNotificationIcon = true"
          @mouseleave="isHoverNotificationIcon = false"
        >
          <BellFilled
            v-if="isHoverNotificationIcon || isVisibleNotificationPopover"
          />
          <Bell v-else />
        </el-icon>
      </el-badge>
    </template>
    <template #default>
      <div class="notification-body">
        <el-table
          class="notification-table-body"
          :show-header="false"
          :max-height="400"
          :data="notificationStore.notificationData"
          :row-class-name="({ row }) => setRowClass(row)"
        >
          <el-table-column property="name" label="name">
            <template #default="props">
              <collab-notification-row
                :type="props.row.type"
                :title="props.row.title"
                :description="props.row.description"
                :created_at="props.row.created_at"
                @click="onClickNotification(props.row)"
              />
            </template>
          </el-table-column>
        </el-table>
      </div>
    </template>
  </el-popover>
</template>

<style scoped lang="scss">
.notification-table-body {
  min-height: 120px;
}
</style>
