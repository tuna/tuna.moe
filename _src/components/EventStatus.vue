<script setup>
import { defineProps, computed } from "vue";
import today from "../lib/today";
const props = defineProps({
  eventDate: String,
  hideFinished: {
    type: Boolean,
    default: false,
  },
});
const finished = computed(() => {
  const eventDate = Date.parse(props.eventDate);
  return today > eventDate;
});
</script>
<template>
  <span
    :class="['badge', 'text-bg-' + (finished ? 'info' : 'warning')]"
    v-if="!hideFinished || !finished"
  >
    <template v-if="finished"> Finished </template>
    <template v-else> Upcoming </template>
  </span>
</template>
