<template>
  <div id="app">
    <keep-alive include="Notice">
      <router-view />
    </keep-alive>
  </div>
</template>

<style lang="scss">
#app {
  background: white;
}
</style>
