<script setup>
const props = defineProps({
  iconWidth: String,
  iconHeight: String,
  iconClass: String,
})
</script>


<template>
  <svg
    aria-hidden="true"
    :width="iconWidth"
    :height="iconHeight"
    class="za-svg-icon"
    :class="iconClass"
  >
    <use :xlink:href="`#${iconClass}`"></use>
  </svg>
</template>