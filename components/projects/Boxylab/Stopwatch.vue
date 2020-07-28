<template>
  <div id="stopwatch-container" ref="swtcontainer" class="disable-select">
    <!-- <div style="color: white;">{{ player2.id }} {{ player2.record }}</div> -->
    <div id="stopwatch-view">
      <!-- <img src="http://via.placeholder.com/400c" /> -->
      <div
        v-for="i in ngrad"
        :key="i"
        :class="[isColorSwitch(i) ? 'graduation-colorSwitch' : 'graduation']"
        :style="setTransform(i)"
      ></div>
      <div class="stwt-hud">
        <div class="player2-score">{{ player2.score }}</div>
        <div class="time-display">{{ timerSecond }}'</div>
        <div class="player1-score">{{ player1.score }}</div>
      </div>
    </div>
    <!-- <div style="color: white;">{{ player1.id }} {{ player1.record }}</div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      ngrad: 180,
      radius: 150, // px
      arc: 360, // deg
      timerIndex: 0,
      color0: '',
      player1: {
        id: 'Me',
        score: 261,
        record: 727,
      },
      player2: {
        id: 'Léon',
        score: 289,
        record: 696,
      },
    }
  },
  computed: {
    timerSecond() {
      const s_ = Math.ceil((60 * this.timerIndex) / this.ngrad)
      return s_
    },
  },
  mounted() {
    // On monte une fonction qui incrémente 'seconds' à chaque intervalle de 1000ms
    this.$interval = setInterval(() => {
      // on utilise $ pour des variables autres que celles de data et qui ne servent qu'à la logique du code
      // console.log(this.second)
      this.timerIndex++
    }, (1000 * 60) / this.ngrad)
  },
  destroyed() {
    // Penser à détruire les événements appelés dans le mounted
    clearInterval(this.$interval)
  },
  methods: {
    setTransform(ind_) {
      const posGraduation = {
        transform: '',
      }

      let angl_ = 0
      ind_ = ind_ - 1 // v-for start at 1

      if (this.arc === 360) {
        angl_ = (this.arc * ind_) / this.ngrad
      } else {
        angl_ = (this.arc * ind_) / (this.ngrad - 1)
      }

      posGraduation.transform =
        'rotate(' +
        angl_ +
        'deg) translateX(-50%) translateY(-' +
        this.radius +
        'px)'

      return posGraduation
    },

    isColorSwitch(ind_) {
      const timePhase_ = Math.floor(this.timerIndex / this.ngrad)
      const timePos_ = this.timerIndex % this.ngrad
      let isTrue_ = false

      if (timePhase_ % 2 === 0) {
        isTrue_ = ind_ < timePos_
      } else {
        isTrue_ = ind_ > timePos_
      }

      return isTrue_
    },
  },
}
</script>

<style lang="scss">
$stwt-back: $boxy-black;
$stwt-grad: $boxy-white;
$stwt-grad-switch: $boxy-red;

$width-screen: 350px;

#stopwatch-container {
  width: 400px;
  height: 400px;
  background-color: $stwt-back;
}

#stopwatch-view {
  position: relative;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: auto;
    opacity: 0;
  }
}

.stwt-hud {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.player1-score {
  color: $stwt-grad;
  font-size: 6em;
}

.player2-score {
  @extend .player1-score;
  color: $stwt-back;
  @include text-stroke($color: $boxy-white, $thikness: 1px);
  transform: translateY(-20%);
}

.time-display {
  // position: absolute;
  // top: 50%;
  // left: 50%;
  font-style: italic;
  font-size: 5rem;
  color: $secondary-color;
  // transform: translateX(-50%) translateY(-50%);
}

.graduation {
  position: absolute;
  background-color: $stwt-grad;
  color: $stwt-grad;
  width: 1px;
  height: 10px;
  top: 50%;
  left: 50%;
  transform-origin: top left;
  // test --> // transform: rotate(45deg) translateX(-50%) translateY(-100px);

  // animation: 0.3s graduation-enter ease-out;
}

.graduation-colorSwitch {
  @extend .graduation;
  background-color: $stwt-grad-switch;
}

@keyframes graduation-enter {
  0% {
    opacity: 0;
    height: 0px;
  }
  100% {
    opacity: 1;
  }
}
</style>
