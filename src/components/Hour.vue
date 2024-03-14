<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  processedResult: Object,
});

</script>

<template>
  <div class="text-center">
    <p class="text-lg">
      <time class="text-gray-600" :datetime="processedResult.dt">
        {{ new Date(processedResult.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
      </time>
    </p>
    <div class="w-10 h-10 bg-blue-300 rounded-full mx-auto my-2">
      <img :src="'https://openweathermap.org/img/wn/' + processedResult.weather[0].icon + '@2x.png'">

    </div>
    <p class="text-lg">{{ processedResult.main.temp.toFixed(1) }}°C</p>
  </div>
</template>
