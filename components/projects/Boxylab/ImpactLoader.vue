<template>
  <div>
    <!-- <p
      style="color: white; font-size: 10em; font-style: bold; padding-left: 2rem;"
    >
      {{ score }}
    </p> -->

    <div class="impact-container" @click="setImpact()">
      <div
        v-for="item in animStates"
        :key="item.index"
        ref="dash"
        :class="[
          item.state ? 'loader-dash-anim' : 'loader-dash',
          { 'loader-dash-max': isMax },
        ]"
      ></div>
      <div
        :class="[
          isAnim ? 'loader-launcher-anim' : 'loader-launcher',
          { 'loader-launcher-max': isMax },
        ]"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nDash: 5,
      animStates: [],
      indxAnim: 0,
      isAnim: false,
      scoreIndex: 0,
      score: 0,
    }
  },
  computed: {
    isMax() {
      const lastDash_ = this.animStates.find(
        (d) => d.index === this.animStates.length - 1
      )
      return lastDash_.state
    },
  },
  created() {
    for (let i = 0; i < this.nDash; i++) {
      const indx_ = this.nDash - i - 1 // reverse order to start animation from bottom
      this.animStates.push({ index: indx_, state: false })
    }
  },
  methods: {
    animState(ind) {
      if (ind < this.animStates.length) {
        return this.animStates[ind].state
      } else {
        return false
      }
    },

    setImpact() {
      this.score++ // simulate a real impact

      // increment and constrain current score index
      this.scoreIndex++
      this.scoreIndex =
        this.scoreIndex > this.nDash
          ? this.nDash
          : this.scoreIndex < 0
          ? 0
          : this.scoreIndex // constrain this.score between 0 and nDash

      // Gameplay trick : lower indxAnim while score is decreasing to improve combo life time
      if (this.indxAnim > this.scoreIndex) {
        this.indxAnim--
      }

      if (!this.isAnim) {
        this.isAnim = true
        this.indxAnim = 0 // be sure reset animation
        this.score = 1 // reset score
        this.trigAnimation()
      }
    },

    trigAnimation() {
      this.$interval = setInterval(() => {
        if (this.indxAnim < this.scoreIndex) {
          const dash_ = this.animStates.find((d) => d.index === this.indxAnim)
          dash_.state = true
        } else {
          const dash_ = this.animStates.find(
            (d) => d.index === 2 * this.scoreIndex - this.indxAnim - 1
          )
          dash_.state = false
        }

        // Update index animation and stop/kill interval if combo is over
        this.indxAnim++
        if (this.indxAnim > 2 * this.scoreIndex - 1) {
          clearInterval(this.$interval) // stop interval
          this.isAnim = false
          this.scoreIndex = 0
        }
      }, 220)
    },
  },
}
</script>

<style lang="scss">
$loader-color: $boxy-white; // ~/css/_variables.scss
$loarder-dash-space: em(3px);

.impact-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: $loarder-dash-space;
  min-height: em(280px);
}

.loader-dash {
  width: em(17px);
  height: em(30px);
  margin: $loarder-dash-space;
  background: transparent;
  border: 1px solid $loader-color;
  border-radius: 4px;
  transition: all 0.3s ease-out;
}

.loader-dash-anim {
  @extend .loader-dash;
  background: $loader-color;
}

.loader-dash-max {
  background: $boxy-red;
  border-color: $boxy-red;
  transition: none;
}

.loader-launcher {
  @extend .loader-dash;
  @include linear-gradient($loader-color, transparent 100%);
  opacity: 0;
  border: none;
  transition: all 1s;
}

.loader-launcher-anim {
  @extend .loader-launcher;
  opacity: 1;
  height: em(80px);
}

.loader-launcher-max {
  @include linear-gradient($boxy-red, transparent 100%);
  transition: none;
}
</style>
