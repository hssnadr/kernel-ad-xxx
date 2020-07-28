<template>
  <div
    :class="[isSidebar ? 'hamburger-cross' : 'hamburger']"
    @click="$store.dispatch('sidemenu/toggleSidebar')"
  >
    <span></span>
  </div>
</template>

<script>
export default {
  computed: {
    isSidebar() {
      return this.$store.getters['sidemenu/isSidebar']
    },
  },
}
</script>

<style lang="scss">
.hamburger {
  $hbg-backcol: transparent;
  $hbg-frontcol: $primary-color;

  position: relative;
  width: 54px;
  height: 54px;
  background: $hbg-backcol;
  border-radius: 50%;
  transform: rotate(0);
  transition: none;

  // variables
  $width-bar: 20px;
  $height-bar: 2px;
  $space-between: 0.4em; //6px;
  $offset: 0.1em; //1px;
  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);

    display: block;
    background: $hbg-frontcol;
    width: $width-bar;
    height: $height-bar;

    transition: 0.3s ease-out;
    &::before,
    &::after {
      content: '';

      position: absolute;
      top: 0;
      left: 0;

      display: block;
      background: $hbg-frontcol;
      width: $width-bar;
      height: $height-bar;

      transform: translateY(-$space-between);
      transition: 0.3s;
    }

    &:after {
      transform: translateY($space-between);
    }
  }

  // &:hover {
  //   span {
  //     &:before {
  //       transform: translateY(-($space-between + $offset));
  //     }

  //     &:after {
  //       transform: translateY($space-between + $offset);
  //     }
  //   }
  // }
}

.hamburger-cross {
  @extend.hamburger;
  transform: rotate(90deg);
  transition: 0.5s ease-out;

  span {
    background: transparent;
    transition: 0.3s ease-out;

    &::before {
      transform: translateY(0) rotate(45deg);
    }

    &::after {
      transform: translateY(0) rotate(-45deg);
    }
  }
  &:hover {
    transition: 0.3s ease-out;
    span {
      &:before {
        transform: translateY(0) rotate(135deg);
      }

      &:after {
        transform: translateY(0) rotate(45deg);
      }
    }
  }
}
</style>
