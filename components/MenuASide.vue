<template>
  <div class="sidenav-container">
    <transition name="button-slide">
      <icon-hbg v-if="!hideSidebar" id="menu-button" />
    </transition>

    <transition name="slide-side">
      <div
        v-if="isSidebar"
        id="foo"
        ref="foo"
        class="sidenav"
        :style="{ width: wSideMenu + 'px' }"
      >
        <main-menu></main-menu>
      </div>
    </transition>
  </div>
</template>

<script>
import MainMenu from '~/components/MenuBMain'
import IconHbg from '~/components/Icon_Hamburger'

export default {
  components: { MainMenu, IconHbg },

  data() {
    return {
      windowWidth: 0,
      widthFactor0: 0.3,
      widthFactor: 0.3,
      breakpoint: 600, // pixel (width)
    }
  },

  computed: {
    isSidebar() {
      return this.$store.getters['sidemenu/isSidebar']
    },
    hideSidebar() {
      return this.$store.getters['sidemenu/hideSidebar']
    },
    wSideMenu() {
      return this.windowWidth * this.widthFactor
    },
  },

  mounted() {
    // Add listener
    this.$nextTick(function () {
      window.addEventListener('resize', this.getWindowWidth) // works also for the height!
      this.getWindowWidth() // init listener
    })
  },

  beforeDestroy() {
    // Destroy listeners
    window.removeEventListener('resize', this.getWindowWidth)
  },

  methods: {
    getWindowWidth(event) {
      this.windowWidth = document.documentElement.clientWidth

      if (this.windowWidth < this.breakpoint) {
        this.widthFactor = 1.0
      } else {
        // ICI ON PEUT CHANGER DE LARGEUR DU MENU EN FONCTION DE LA TAILLE DE L ECRAN
        this.widthFactor = this.widthFactor0
      }

      const w_ = this.windowWidth * this.widthFactor
      this.$store.commit('sidemenu/SetWidth', {
        width: w_,
        factor: this.widthFactor,
      })
    },
  },
}
</script>

<style scoped lang="scss">
.sidenav-container {
  height: 100%;
  width: 100%;
}

.sidenav {
  height: 100%;
  background: $base-color;
  /* width: 300px; */
  z-index: 2;
  position: fixed;
  overflow: auto;
  top: 0;
  left: 0;
  box-sizing: border-box;
  padding: 30px;
  padding-top: 100px;
}

.slide-side-enter-active,
.slide-side-leave-active {
  transition: all 0.5s ease-out;
}
.slide-side-enter,
.slide-side-leave-to {
  transform: translateX(-100%);
}

#menu-button {
  position: fixed;
  display: block;
  top: 20px;
  left: 20px;
  z-index: 3;
  cursor: pointer;
}

.button-slide-enter-active,
.button-slide-leave-active {
  transition: all 0.3s ease-out;
}
.button-slide-enter,
.button-slide-leave-to {
  transform: translateX(-100%);
}
</style>
