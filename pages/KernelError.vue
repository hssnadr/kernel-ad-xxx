<template>
  <h2>
    Kernel Error
  </h2>
</template>

<script>
export default {
  mounted() {
    // Hide side bar
    this.$store.commit('sidemenu/SetState', false)
    this.$store.commit('sidemenu/HIDE_SIDEBAR', true)
  },
}
</script>
