<script setup lang="ts">
import { defineProps } from "vue";
import {
  CallabTableData,
  CollabTableHeader,
} from "@/components/collabTable/types";

const props = defineProps<{
  showHeader: boolean;
  header?: CollabTableHeader;
  data: CallabTableData;
}>();
</script>

<template>
  <div>
    <p>adslfs</p>
    <slot name="default" />
    <slot name="description" />
    <slot name="test">테스트 값이 없음.</slot>
  </div>
</template>

<style scoped lang="scss"></style>
