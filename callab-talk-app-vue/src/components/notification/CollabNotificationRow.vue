<script setup lang="ts">
import { computed, defineProps } from "vue";
import { dateTimeToString } from "@/utils/dateUtils";
import { InfoFilled, Notification, UserFilled } from "@element-plus/icons-vue";
const props = defineProps<{
  type: string;
  title: string;
  description: string;
  created_at: Date;
}>();

const getDate = computed(() => dateTimeToString(props.created_at));
</script>

<template>
  <div class="notification-row">
    <div class="circle-icon">
      <el-icon size="40">
        <Notification v-if="props.type === 'notice'" />
        <UserFilled v-else-if="props.type === 'friend'" />
        <InfoFilled v-else />
      </el-icon>
    </div>
    <div class="notification-row-title">
      <h2>{{ props.title }}</h2>
    </div>
    <div class="notification-row-description">
      <span>{{ props.description }}</span>
    </div>
    <div class="notification-row-date">{{ getDate }}</div>
  </div>
</template>

<style scoped lang="scss">
.notification-row {
  display: grid;
  grid-template-columns: 60px auto;
  grid-template-rows: 36px 48px 14px;
  * {
    display: flex;
    align-items: center;
    justify-content: left;
    color: inherit;
  }
  .circle-icon {
    grid-row: 1 / span 3;
  }
  .notification-row-title {
  }
  .notification-row-description {
    margin-bottom: 10px;
    align-items: start;
    span {
      font-size: 16px;
      display: block;
      overflow: hidden;
      line-height: 1.2;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
  }
  .notification-row-date {
    justify-content: right;
    color: darkgrey;
  }
}
</style>
