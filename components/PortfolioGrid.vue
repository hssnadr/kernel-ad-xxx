<template>
  <div v-scroll-lock="isWatching">
    <transition-group
      v-if="isEmptySel"
      id="gridProjects"
      :duration="{ enter: 500, leave: 800 }"
      name="card-swap"
      tag="ul"
    >
      <Cardboard
        v-for="prj_ in displayProjects"
        :key="prj_.id"
        :project="prj_"
        class="item-project"
        @selected="WatchProject"
      />
    </transition-group>
    <div v-else>
      <p>No projects selected! It works!!</p>
    </div>

    <div
      v-if="isWatching"
      id="myModal"
      class="modal"
      @click="CloseProject"
      @keyup.esc="CloseProject"
    >
      <span class="close-project" @click="CloseProject()">&times;</span>
      <iframe id="iframe-project" :src="linkProject"></iframe>
    </div>
  </div>
  <!-- il faudra rajouter un prevent au dessus si la page nexiste pas!! -->
</template>

<script>
import { mapGetters } from 'vuex'
import Cardboard from '~/components/Cardboard.vue'

export default {
  components: {
    Cardboard,
  },
  data() {
    return {
      isWatching: false,
      linkProject: '',
      idToWatch: '',
    }
  },
  computed: {
    isEmptySel() {
      let isEmpt_ = false
      if (this.displayProjects.length > 0) {
        isEmpt_ = true
      }
      return isEmpt_
    },
    ...mapGetters({
      displayProjects: 'projects/selectedProjects',
    }),
  },
  mounted() {
    if (typeof this.$redrawVueMasonry === 'function') {
      this.$redrawVueMasonry()
    }
  },
  methods: {
    WatchProject(data) {
      this.$store.commit('projects/setCurrentProjectId', data.id)

      if (window.innerWidth > 800) {
        // Large screen (iframe)
        this.linkProject = '/projects/' + data.id
        this.isWatching = true
      } else {
        // Small screen (link to)
        window.location.href = '/projects/' + data.id
      }
    },
    CloseProject() {
      this.isWatching = false
    },
  },
}
</script>

<style lang="scss">
#gridProjects {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  min-height: 80vh;
  align-content: center;

  padding: 20px;
}

.item-project {
  width: 300px;
  height: 490px;
  margin: 7px;
  // align-self: center; /* alignement axe secondaire */
  border-radius: 0;
  border: none;
}

#iframe-project {
  display: block;
  height: 100%;
  width: 80%;
  min-width: 700px;
  margin: auto;
}

.modal {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 10; /* Sit on top */
  // padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100vh; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  // background-color: rgb(0, 0, 0); // Fallback color
  background-color: rgba(0, 0, 0, 0.9); /* Black w/ opacity */
}

/* Modal Content (image) */
// .modal-content {
//   margin: auto;
//   display: block;
//   width: 100%;
//   height: 100vh;
//   background: rgba(0, 255, 0, 0.5);
// }

.background-project {
  // position: fixed;
  // top: 0;
  // left: 0;
  width: 100vw;
  min-height: 100vh;
  padding: 30px 0;
  background: transparentize($color: $primary-color, $amount: 0.15);
}

/* The Close Button */
.close-project {
  position: fixed;
  top: 15px;
  right: 35px;
  color: #f1f1f1;
  font-size: 40px;
  font-weight: bold;
  transition: 0.3s;
  z-index: 9999;

  &:hover,
  &:focus {
    color: #bbb;
    text-decoration: none;
    cursor: pointer;
  }
}

/* ENTER */
.card-swap-enter
/* enter from */ {
  opacity: 0;
  transform: scale(0.5);
}

.card-swap-enter-active {
}

.card-swap-enter-to {
  opacity: 1;
  transform: scale(1);
}

/* MOVE */
.card-swap-move {
  position: relative;
}

/* LEAVE */
.card-swap-leave {
  opacity: 1;
  transform: scale(1);
}

.card-swap-leave-active {
  position: absolute;
}

.card-swap-leave-to
/* .card-swap-leave-active for <2.1.8 */ {
  opacity: 0;
  transform: translate(0, 0, 0) scale(0.1);
}
</style>
