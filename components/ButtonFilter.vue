<template>
  <div>
    <label class="switch">
      <input id="id" v-model="isCheck" type="checkbox" @change="emitState" />
      <span class="slider round"></span>
      <label class="container-fluid" for="id"
        >{{ id }} {{ isCheck }} {{ testmessage }}</label
      >
    </label>
  </div>
</template>

<script>
export default {
  name: 'ButtonFilter',
  props: {
    id: {
      type: String,
      default: '-',
      useDefaultForNull: true,
    },
    init: {
      type: Boolean,
      default: false,
      useDefaultForNull: true,
    },
  },
  data() {
    return {
      testmessage: 'nothing',
      isCheck: this.init,
    }
  },
  methods: {
    emitState() {
      this.testmessage = 'Not nothing!!' + this.isCheck
      this.$emit('selected', { id: this.id, state: this.isCheck })
    },
  },
}
</script>

<style>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: '';
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
