<template>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html,
body,
#app {
  height: 100%;
  margin: 0;
}

.collab-user-select-none {
  user-select: none;
}
.collab-click-cursor {
  cursor: pointer;
}

.is-checked * {
  background-color: #dce0e5;
  color: darkgray;
}
.is-checked:hover * {
  background-color: inherit;
}
</style>
