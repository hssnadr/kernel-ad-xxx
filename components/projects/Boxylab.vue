<template>
  <div class="boxylab-body" @click="setImpact()">
    <div class="boxylogo">
      <logo-boxylab />
    </div>

    <div id="boxy-intro" ref="boxyintro">
      <div class="stopwatch-container">
        <stopwatch-vue />
      </div>
      <div v-if="viewOnIntroduction < 1" class="wireframes">
        <smartphone-wireframe
          class="smartphone-wireframe"
          :style="styleIntroSmartphone"
        />
        <frappe-wireframe class="frappe-wireframe" :style="styleIntroFrappe" />
      </div>
    </div>

    <div class="boxinteract">
      <impact-loader ref="impactloader" />
      <boxing-frames ref="boxingframes" />
    </div>

    <button class="boxy-button">
      Go to website
    </button>
  </div>
</template>

<script>
import LogoBoxylab from './Boxylab/LogoBoxylab.vue'
import StopwatchVue from './Boxylab/Stopwatch.vue'
import ImpactLoader from './Boxylab/ImpactLoader.vue'
import BoxingFrames from './Boxylab/BoxingFrames.vue'
import FrappeWireframe from './Boxylab/FrappeWireframe.vue'
import SmartphoneWireframe from './Boxylab/SmartphoneWireframe.vue'

export default {
  layout: 'ProjectLayout',
  components: {
    LogoBoxylab,
    StopwatchVue,
    ImpactLoader,
    BoxingFrames,
    FrappeWireframe,
    SmartphoneWireframe,
  },
  data() {
    return {
      yIntroduction: 0,
      scrollY: 0,
      windowHeight: 0,
      yTrigAnim: 0,
    }
  },
  computed: {
    viewOnIntroduction() {
      // factor between -1 and 1 giving the amount of view on the introduction compared to all current viewport
      // 0 correspond to viewport center on the introduction
      let foo_ = (this.yIntroduction - this.scrollY) / this.windowHeight
      if (Math.abs(foo_) > 1) {
        foo_ = 1
      }
      return foo_
    },
    styleIntroSmartphone() {
      const r_ = -10 * this.viewOnIntroduction
      const style_ = {
        top: 25 - 20 * this.viewOnIntroduction + '%',
        transform: 'rotate(' + r_ + 'deg)',
        strokeDashoffset: 3000 * this.viewOnIntroduction,
        opacity: 0.5 + 0.5 * (1 - Math.abs(this.viewOnIntroduction)),
      }
      return style_
    },
    styleIntroFrappe() {
      const r_ = 30 + 15 * this.viewOnIntroduction
      const style_ = {
        // top: 2.5 + 2.5 * this.viewOnIntroduction + '%',
        transform: 'rotate(' + r_ + 'deg)',
        strokeDashoffset: 800 * this.viewOnIntroduction,
        opacity: 0.5 + 0.5 * (1 - Math.abs(this.viewOnIntroduction)),
      }
      return style_
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.windowResize)
    window.removeEventListener('scroll', this.scrollEvent)
  },
  mounted() {
    this.$nextTick(function () {
      window.addEventListener('resize', this.windowResize)
      this.windowResize()
    })

    this.$nextTick(function () {
      window.addEventListener('scroll', this.scrollEvent)
      this.scrollEvent()
    })
  },
  methods: {
    setImpact() {
      this.$refs.boxingframes.randomMove()
      this.$refs.impactloader.setImpact()
    },
    scrollEvent(event) {
      this.scrollY = window.scrollY
      if (Math.abs(this.yTrigAnim - window.scrollY) > 80) {
        this.setImpact()
        this.yTrigAnim = window.scrollY
      }
    },
    windowResize(event) {
      this.yIntroduction =
        this.$refs.boxyintro.getBoundingClientRect().top + window.scrollY
      this.windowHeight = document.documentElement.clientHeight
    },
  },
}
</script>

<style lang="scss">
.boxylab-body {
  background: $boxy-black;
}

.boxylogo {
  width: 100%;
  display: flex;
  justify-content: center;
}

#boxy-intro {
  display: block;
  height: 600px;
  position: relative;
  stroke: $boxy-white;
  fill: transparent;

  @media #{$medium-down} {
    height: 100vw;
  }
}

.smartphone-wireframe {
  width: 90vh;
  height: auto;
  transform-origin: center;

  position: absolute;
  top: 20%;
  left: 10%;

  stroke-dasharray: 3000;
  stroke-dashoffset: 0;
  stroke-width: em(3px);

  @media #{$medium-down} {
    width: 76vw;
  }
}

.frappe-wireframe {
  @extend .smartphone-wireframe;
  height: 95vh;
  width: auto;
  bottom: 2.5%;
  top: auto;
  right: 24%;
  left: auto;
  stroke-dasharray: 800;

  @media #{$medium-down} {
    height: 80vw;
  }
}

.stopwatch-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.boxinteract {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.boxy-button {
  font-family: 'SharpGrotesk', sans-serif;
  font-weight: 800;
  font-size: 2em;
  background: transparent;
  border: 1px solid $boxy-white;
  color: $boxy-white;
  display: block;
  height: 70px;
  width: 300px;
  margin-left: auto;
  margin-right: auto;

  border-radius: 35px;

  transition: all 0.5s;

  &:hover {
    border-color: $boxy-red;
    background: $boxy-red;
    color: $boxy-white;
  }

  &:active {
    transition: none;
    color: $boxy-red;
    border-color: $boxy-black;
    background: $boxy-white;
  }

  &:focus {
    outline: 0;
  }
}
</style>
