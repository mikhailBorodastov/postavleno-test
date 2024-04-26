<template>
  <div v-if="logData.length">
    <h2>Лог редактирования:</h2>
    <ul v-for="(logEntry, index) in logData" :key="index">
      <li>{{ logEntry }}</li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  logData: {
    type: Array,
    required: true,
  },
});
</script>
