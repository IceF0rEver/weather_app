<script setup>
import { ref, onMounted, defineEmits } from 'vue';
import { ForecastsStore } from "../stores/forecasts.js";
import { LocalStore } from "../stores/local.js";

const resultCurrent = ref(null);
const resultCurrentPosition = ref(null);

const emits = defineEmits(["bgWeather"]);

onMounted(async () => {
  try {
    resultCurrent.value = await ForecastsStore.getCurrent();
    resultCurrentPosition.value = await ForecastsStore.getLocationByActualPosition();

    emits('bgWeather', resultCurrent.value.weather[0].main)

    const cityData = {
      cityCoord: resultCurrentPosition.value.coord,
      cityName: resultCurrentPosition.value.name,
      countryName: resultCurrentPosition.value.sys.country,
    };
    LocalStore.addCurrent(cityData);

  } catch (error) {
    console.error(error.message);
  }
});

</script>

<template>
 <!-- Météo instantanée -->
 <section
        v-if="resultCurrent"
        class="bg-white bg-opacity-75 rounded-lg shadow p-5 mb-6 grow flex flex-col"
        style="flex-grow: 1"
      >
        <header class="mb-4">
          <h2 class="font-bold text-xl">Météo Instantanée</h2>
        </header>
        <article
          class="flex items-center justify-between grow"
          style="flex-grow: 1"
        >
          <div>
            <h3 class="text-lg font-semibold">{{ resultCurrent.name }}</h3>
            <time class="text-sm text-gray-600" :datetime="resultCurrent.dt">
              {{ new Date(resultCurrent.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}<br />
              {{ new Date(resultCurrent.dt * 1000).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) }}
            </time>
          </div>
          <div class="flex">
            <div class="text-right">
              <p class="text-5xl">{{ resultCurrent.main.temp.toFixed(1) }}°C</p>
              <p class="text-lg text-gray-600">{{ resultCurrent.weather[0].description }}</p>
            </div>
            <!-- Icône météo (à remplacer par une vraie image) -->
            <div class="ml-2 w-20 h-20 bg-blue-300 rounded-full">
              <img :src="'https://openweathermap.org/img/wn/' + resultCurrent.weather[0].icon + '@2x.png'">
            </div>
          </div>
        </article>
      </section>
</template>
