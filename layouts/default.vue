<template>
  <div id="mainview" :style="setMargin">
    <side-menu />

    <nav id="navigator" v-scroll-lock="isScrollLock">
      <h1>
        <NuxtLink to="/">
          Portfolio
        </NuxtLink>
      </h1>

      <h1>
        <NuxtLink to="/MotionLab">
          MotionLab
        </NuxtLink>
      </h1>

      <h1>
        <NuxtLink to="/Hitbox">
          Hitbox
        </NuxtLink>
      </h1>

      <h1>
        <NuxtLink to="/KernelError">
          Kernel Error
        </NuxtLink>
      </h1>
    </nav>

    <nuxt />
  </div>
</template>

<script>
import SideMenu from '~/components/MenuASide'

export default {
  components: {
    SideMenu,
  },
  computed: {
    menuWidth() {
      return this.$store.getters['sidemenu/widthPx']
    },
    isSidebar() {
      return this.$store.getters['sidemenu/isSidebar']
    },
    isHover() {
      return this.$store.getters['sidemenu/isHover']
    },
    isScrollLock() {
      if (this.isSidebar && this.isHover) {
        return true
      } else {
        return false
      }
    },
    setMargin() {
      if (this.isSidebar && !this.isHover) {
        let ml_ = this.menuWidth.toString()
        ml_ = ml_.concat('px')

        return { 'margin-left': ml_ }
      } else {
        return { 'margin-left': '0px' }
      }
    },
  },
}
</script>

<style>
#navigator {
  display: flex;
  justify-content: space-around;
}

#mainview {
  transition: margin-left 0.5s ease-out;
  margin-left: 0px;
  padding: 0px;
}
</style>
