<template>
  <div>
    <portfolio-grid />
  </div>
</template>

<script>
import PortfolioGrid from '~/components/PortfolioGrid.vue'

export default {
  components: {
    PortfolioGrid,
  },

  data() {
    return {
      curSection: 'portfolio',
    }
  },
  mounted() {
    // Show side bar button
    this.$store.commit('sidemenu/HIDE_SIDEBAR', false)
  },
}
</script>

<style lang="scss">
.title {
  color: $secondary-color;
}
</style>
