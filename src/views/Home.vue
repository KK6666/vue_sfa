<template>
  <div @click="backtoLog">
    home
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    backtoLog () {
      this.$router.push("/")
    }
  }
}
</script>

<style>

</style>