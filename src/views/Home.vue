<template>
  <div>
    <TopHead title="SFA">
      <router-link
        class="icon iconfont icon-user"
        to="/user"
        slot="r"
      ></router-link>
    </TopHead>
  </div>
</template>

<script>
import TopHead from '../components/TopHead'
export default {
  name: 'Home',
  components: {
    TopHead
  },
  methods: {}
}
</script>

<style></style>
