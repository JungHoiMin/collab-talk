<script setup lang="ts">
import { defineProps } from "vue";
import {
  CallabTableData,
  CollabTableHeader,
} from "@/components/collabTable/types";

const props = defineProps<{
  showHeader?: boolean;
  header?: CollabTableHeader;
  data: CallabTableData;
}>();
</script>

<template>
  <div class="table">
    <div class="table-description">
      <slot name="description" />
    </div>
    <div class="table-main">
      <div v-if="props.showHeader" class="table-header"></div>
      <div class="table-body"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.table {
  width: calc(100% - 60px);
  padding: 30px 30px 10px;
  background-color: #42b983;
  .table-description {
    text-align: left;
  }
  .table-main {
    height: calc(100% - 40px);
    .table-header {
      height: 0;
    }
    .table-body {
      height: 100%;
    }
  }
  .table-main:has(.table-header) {
    height: calc(100% - 40px);
    .table-header {
      height: 40px;
    }
    .table-body {
      height: calc(100% - 40px);
    }
  }
}
</style>
