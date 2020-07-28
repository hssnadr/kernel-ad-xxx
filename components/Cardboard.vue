<template>
  <div class="card" :style="cardBackground">
    <div class="card-content" @click="emitProject()">
      <div class="top-content">
        <h2>{{ project.title }}</h2>
        <h3 v-if="refName(institute) !== ''">{{ refName(institute) }}</h3>
        <span class="format">
          <p>{{ project.format[0] }} project &bull; {{ years }}</p>
        </span>
        <div class="line-break"></div>
        <div class="description">
          <p>
            {{ project.description }}
          </p>
        </div>
      </div>

      <div class="bottom-content">
        <div class="tools-icon">
          <div v-for="tool_ in project.tools" :key="tool_">
            <component
              :is="'icon-' + tool_"
              v-if="isFile('icon-' + tool_)"
              class="tool-icon"
            ></component>
          </div>
        </div>
        <div class="skills">
          <span v-for="skill_ in project.skills" :key="skill_">
            {{ skill_ }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      default: null,
      required: true,
    },
  },
  data() {
    return {
      cardBackground: {
        backgroundImage: "url('https://via.placeholder.com/320x450')",
      },
    }
  },
  computed: {
    thumbnail() {
      return this.$store.getters['projects/getThumbnailById'](this.project.id)
    },
    years() {
      let years_ = 'unknown'
      if (this.project.years.y0 !== this.project.years.y1) {
        years_ = this.project.years.y0 + ' - ' + this.project.years.y1
      } else {
        years_ = this.project.years.y0
      }

      return years_
    },
    institute() {
      let institute_ = ''
      if (this.project.institutes !== null) {
        institute_ = this.project.institutes[0]
      }
      return institute_
    },
  },
  created() {
    this.cardBackground.backgroundImage =
      'url(' +
      this.$store.getters['projects/getThumbnailById'](this.project.id) +
      ')'
  },
  methods: {
    emitProject() {
      this.$emit('selected', { id: this.project.id })
    },
    isFile(file_) {
      return file_ in this.$options.components
    },
    refName(ref_) {
      return this.$store.getters['references/getName'](ref_)
    },
  },
}
</script>

<style lang="scss">
.card {
  cursor: pointer;
  background-size: cover;
  background-position: center;
}

.card .card-content {
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
  background-color: $primary-color;
  // background-color: transparentize($color: $primary-color, $amount: 0.15);
  // background: linear-gradient(
  //   transparentize($color: black, $amount: 0.01),
  //   transparentize($color: black, $amount: 0.05) 40%,
  //   transparentize($color: black, $amount: 0.4)
  // );
  color: $base-color;
  opacity: 0;

  &:hover {
    opacity: 1;
  }
}

.line-break {
  width: 30%;
  height: 2px;
  margin: 1em 0;
  background: $base-color;
}

.card-content .top-content {
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px;

  h2 {
    font-size: 1.7em;
    margin-bottom: 0.3rem;
    // font-style: italic;
  }

  h3 {
    font-weight: 600;
    font-size: 1.1em;
    text-transform: uppercase;
    margin-bottom: 0.3rem;
    color: $lightgrey; // transparentize($color: $base-color, $amount: 0.2);
  }

  .description {
    text-align: justify;
  }
}

.card-content .bottom-content {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-between;

  .tools-icon {
    width: 50%;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-end;

    .tool-icon {
      width: 45px;
      fill: $base-color;
      margin-right: 4px;
    }
  }

  .skills {
    // width: 50%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column-reverse;
    text-align: right;
    font-weight: 100;
    font-size: 1em;
    color: transparentize($color: $base-color, $amount: 0.2);
  }
}

/*
.card .card-content:after,
.card .card-content:before {
  content: '';
  width: 100px;
  height: 50px;
  position: absolute;
  opacity: 0;
  transform: scale(1.5);
  transition: all 0.6s ease 0.3s;
}
.card .card-content:before {
  border-left: 1px solid #a01f1f;
  border-top: 1px solid #a01f1f;
  top: 19px;
  left: 19px;
}
.card .card-content:after {
  border-bottom: 1px solid #56ec48;
  border-right: 1px solid #56ec48;
  bottom: 19px;
  right: 19px;
}
.card:hover .card-content:after,
.card:hover .card-content:before {
  opacity: 1;
  transform: scale(1);
}
.card .title {
  font-size: 22px;
  color: #000;
  margin: 0;
  position: relative;
  top: 0;
  opacity: 0;
  transition: all 1s ease 10ms;
}
.card:hover .title {
  top: 39%;
  opacity: 1;
  transition: all 0.5s cubic-bezier(1, -0.53, 0.405, 1.425) 10ms;
}
.card .title:after {
  content: '';
  width: 0;
  height: 1px;
  background: #040404;
  position: absolute;
  bottom: -8px;
  left: 0;
  right: 0;
  margin: 0 auto;
  transition: all 1s ease 0s;
}
.card:hover .title:after {
  width: 80%;
  transition: all 1s ease 0.8s;
}
.card .icon {
  width: 100%;
  margin: 0 auto;
  position: absolute;
  bottom: 0;
  opacity: 0;
  transition-duration: 0.6s;
  transition-timing-function: cubic-bezier(1, -0.53, 0.405, 1.425);
  transition-delay: 0.1s;
}
.card:hover .icon {
  bottom: 39%;
  opacity: 1;
}
.card .icon li {
  display: inline-block;
}
.card .icon li a {
  display: block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 50%;
  font-size: 18px;
  color: #000;
  border: 1px solid #000;
  margin-right: 5px;
  transition: all 0.3s ease-in-out 0s;
}
.card .icon li a:hover {
  background: #000;
  color: #fff;
} */
/* @media only screen and (max-width: 990px) {
  .card {
    margin-bottom: 30px;
  }
} */
</style>
