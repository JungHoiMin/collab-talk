<script setup lang="ts"></script>

<template>
  <div class="main">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="body">
      <div class="nav" ref="nav">
        <slot name="nav"></slot>
      </div>
      <div class="main-section">
        <slot name="default"></slot>
      </div>
    </div>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main {
  width: auto;

  .header {
    width: auto;
    background-color: red;
    height: 11vh;
    padding-inline: 30px;
  }

  .body {
    background-color: yellow;
    display: flex;
    align-items: stretch;
    height: 86vh;

    .nav {
      background-color: antiquewhite;
      width: 210px;
    }

    .main-section {
      width: calc(100% - 210px);
      background-color: blueviolet;
    }
  }

  .footer {
    width: 100%;
    background-color: black;
    height: 3vh;
  }
}
</style>
