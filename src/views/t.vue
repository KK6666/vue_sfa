<template>
  <div class="d" @click="cc">{{ a }}</div>
</template>

<script>
export default {
  data() {
    return {
      a: 0
    }
  },
  methods: {
    cc() {
      this.a++
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  width: 100px;
  height: 100px;
  background-color: red;
  margin: 150px;
  padding: 150px;
  border: 1px solid black;
}
</style>
