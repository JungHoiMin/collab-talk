<template>
  <div class="home">
    <header><CollabHeader /></header>
    <div class="body">
      <CollabNav />
      <main>
        <router-view />
      </main>
    </div>
    <footer></footer>
  </div>
</template>

<script setup lang="ts">
import CollabHeader from "@/components/CollabHeader.vue";
import CollabNav from "@/components/CollabNav.vue";
import axios from "axios";

const getData = () => {
  axios
    .get("/test.json")
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
};
</script>

<style scoped lang="scss">
$breakpoint-half-window: 1200px;
$breakpoint-full-window: 2400px;
@mixin half {
  @media (max-width: #{$breakpoint-half-window - 1}) {
    @content;
  }
}
@mixin full {
  @media (min-width: #{$breakpoint-half-window}) {
    @content;
  }
}

.home {
  height: 100%;

  header {
    height: 60px;
  }
  @include half {
    .body {
      height: calc(100% - 60px - 30px);
      display: flex;
      main {
        width: calc(100% - 24px);
        background-color: blueviolet;
      }
    }
  }
  @include full {
    .body {
      height: calc(100% - 60px - 30px);
      display: flex;
      main {
        width: calc(100% - 24px);
        background-color: lightskyblue;
      }
    }
  }
}
footer {
  height: 30px;
}
</style>
