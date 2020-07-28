<template>
  <div class="project-container">
    <!-- Header information -->
    <header>
      <div class="project-header">
        <div class="project-overview">
          <div class="format">
            <p>{{ project.format[0] }} project &bull; {{ years }}</p>
          </div>
          <div class="description">
            {{ project.description }}
          </div>
        </div>
        <div class="project-institute">
          <span
            class="logo"
            :class="{ 'cursor-pointer': isLink(institute) }"
            @click="goToReference(institute)"
          >
            <component
              :is="'logo-' + institute"
              v-if="isFile('logo-' + institute)"
              class="svg"
            ></component>
            <span v-else>
              {{ refName(institute) }}
            </span>
          </span>
        </div>
        <div class="line-spacer"></div>
      </div>
      <h1 class="project-title">{{ project.title }}</h1>
    </header>

    <!-- Dedicated project page (referenced as component) -->
    <div v-if="isExtComponent">
      <component :is="id"></component>
    </div>
    <div v-else>
      <!-- Gallery from projects/store -->
      <div v-if="isGallery">
        <img
          v-for="(img_, index) in project.media.images"
          :key="index"
          :src="img_"
          class="project-pictures"
        />
      </div>
      <!-- iFrame from projects/store -->
      <div v-if="isIframe">
        <div v-for="(ifr_, index) in project.media.iframes" :key="index">
          <p><span v-html="ifr_"></span></p>
        </div>
      </div>
      <!-- Footer (related project) -->
    </div>
  </div>
</template>

<script>
export default {
  layout: 'ProjectLayout',
  data() {
    return {
      id: '',
      isExtComponent: false,
    }
  },
  computed: {
    project() {
      return this.$store.getters['projects/getProjectByid'](this.id)
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
    isGallery() {
      let is_ = false
      if (Object.prototype.hasOwnProperty.call(this.project, 'media')) {
        if (
          Object.prototype.hasOwnProperty.call(this.project.media, 'images')
        ) {
          if (this.project.media.images != null) {
            is_ = this.project.media.images.length > 0
          }
        }
      }
      return is_
    },
    isIframe() {
      let is_ = false
      if (Object.prototype.hasOwnProperty.call(this.project, 'media')) {
        if (
          Object.prototype.hasOwnProperty.call(this.project.media, 'iframes')
        ) {
          if (this.project.media.iframes != null) {
            is_ = this.project.media.iframes.length > 0
          }
        }
      }
      return is_
    },
  },
  created() {
    this.id = this.$route.params.id
    this.isExtComponent = this.id in this.$options.components // check if there's a component refering to this project to present it in the project page
  },
  methods: {
    isFile(file_) {
      return file_ in this.$options.components
    },
    refName(ref_) {
      return this.$store.getters['references/getName'](ref_)
    },
    isLink(ref_) {
      const link_ = this.$store.getters['references/getLink'](ref_)
      return link_ !== null
    },
    goToReference(ref_) {
      const link_ = this.$store.getters['references/getLink'](ref_)
      if (link_ !== null) {
        window.open(link_, '_blank')
      }
    },
  },
}
</script>

<style lang="scss">
.project-container {
  background: $base-color;
}

.project-header {
  display: flex;
  flex-wrap: wrap;
  padding: 30px;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  min-height: 200px;
  border-bottom: 2px solid $primary-color;
}

.project-overview {
  display: block;
  margin: auto;
  width: 100%;
  color: $primary-color;
  $space-border: 0.2rem;

  .format {
    font-size: 1.2em;
    margin-bottom: $space-border;
  }

  .description {
    font-family: 'Poppins', 'Roboto', sans-serif;
    font-weight: 200;
    font-style: normal;
    border-top: 2px solid $primary-color;
    padding-top: $space-border;
  }
}

.project-institute {
  display: block;
  margin: auto;
  width: 100%;
  .logo {
    display: block;
    margin: auto;
    color: $primary-color;
    text-align: center;
    .svg {
      width: 200px;
      fill: $primary-color;
    }
  }
}

.project-title {
  width: 100%;
  text-align: center;
  font-size: 3em;

  // color: $primary-color;
  color: $base-color;
  @include text-stroke($color: $primary-color, $thikness: 1px);

  padding: 1em 0.5em;
  margin: 0;
}

.project-pictures {
  width: 100%;
  height: auto;
}

@media #{$small-up} {
  .project-overview {
    width: 30%;
  }

  .project-institute {
    width: 30%;
  }

  .project-title {
    font-size: 4em;
  }
}
</style>
