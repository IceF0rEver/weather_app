<script setup>
import Hour from "./Hour.vue";
import { ref, onMounted } from 'vue';
import { ForecastsStore } from "../stores/forecasts.js";

const results = ref(null);
const processedResults = ref(null);

onMounted(async () => {
  try {
    results.value = await ForecastsStore.getByCoord();
    processResults();
  } catch (error) {
    console.error(error.message);
  }
});

const processResults = () => {
  if (!results.value) return;

  // Initialisation du tableau traité
  processedResults.value = [];

  // Parcours des données de l'API
  for (let i = 0; i < results.value.list.length; i++) {
    const currentData = results.value.list[i];
    const nextData = results.value.list[i + 1];

    // Ajout des données actuelles au tableau traité
    processedResults.value.push(currentData);

    // Calcul des moyennes et ajout des données intermédiaires
    if (nextData) {
      const numberOfIntervals = 3; // Nombre d'intervalles entre deux données

      for (let j = 1; j < numberOfIntervals; j++) {
        const interpolatedData = {
            dt: currentData.dt + (j * (nextData.dt - currentData.dt) / numberOfIntervals),
          main: {
            temp: parseFloat((currentData.main.temp + (j * (nextData.main.temp - currentData.main.temp) / numberOfIntervals)).toFixed(2)),
          },
          weather: [...currentData.weather], // Vous pouvez également interpoler d'autres propriétés
        };

        processedResults.value.push(interpolatedData);

        // Limite à 12 résultats
        if (processedResults.value.length >= 12) {
          break;
        }
      }
    }

    // Limite à 12 résultats
    if (processedResults.value.length >= 12) {
      break;
    }
  }
};
</script>

<template>
  <section class="bg-white rounded-lg shadow p-5 mb-6">
    <h2 class="font-bold text-xl mb-4">Prochaines Heures</h2>
    <div class="overflow-x-auto">
      <div class="flex space-x-8">
        <Hour v-for="processedResult in processedResults" :key="processedResult.dt" :processedResult="processedResult"></Hour>
      </div>
    </div>
  </section>
</template>
