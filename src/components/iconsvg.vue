<template>
  <svg class="icon-svg" aria-hidden="true" @click="$emit('click', $event)">
    <use :xlink:href="`#${iconClass}`"></use>
  </svg>
</template>

<script>
export default {
  name: 'IconSvg',
  props: {
    iconClass: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-svg {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: inherit;
  overflow: hidden;
}
</style>
