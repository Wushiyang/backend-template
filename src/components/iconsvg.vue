<template>
  <svg class="svg-icon" aria-hidden="true" @click="$emit('click', $event)">
    <use :xlink:href="getIconName"></use>
  </svg>
</template>

<script>
export default {
  name: 'icon-svg',
  props: {
    iconClass: {
      type: String,
      required: true
    }
  },
  computed: {
    getIconName () {
      return `#${this.iconClass}`
    }
  },
  methods: {
    test () {
      console.log('test')
    }
  }
}
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: inherit;
  overflow: hidden;
}
</style>
