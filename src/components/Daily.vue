<script setup>
import Day from "./Day.vue";
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

  // Initialisation des variables pour la première journée
  let min = 100.0;
  let max = 0.0;
  let weatherIcons = "";

  // Parcours des données de l'API
  for (let i = 0; i < results.value.list.length; i++) {
    const currentData = results.value.list[i];

    // Mettre à jour les valeurs min et max pour la journée en cours
    if (currentData.main.temp_max > max) {
      max = currentData.main.temp_max;
    }
    if (currentData.main.temp_min < min) {
      min = currentData.main.temp_min;
    }

    // Ajouter l'icône météorologique si c'est 12h
    if (new Date(currentData.dt * 1000).getHours() === 13) {
      weatherIcons = currentData.weather[0].icon;
    }
    // Vérifier si c'est la fin de la journée
    if (new Date(currentData.dt * 1000).getHours() === 22) {
      const interpolatedData = {
        dt: currentData.dt,
        main: {
          temp_min: parseFloat(min.toFixed(1)),
          temp_max: parseFloat(max.toFixed(1)),
        },
        icon: weatherIcons
      };
      processedResults.value.push(interpolatedData);

      // Réinitialiser les variables pour une nouvelle journée
      min = 100.0;
      max = 0.0;
      weatherIcons = [];
    }
  }
  processedResults.value.splice(0,1);
};

</script>

<template>
  <section class="bg-white rounded-lg shadow p-5">
    <h2 class="font-bold text-xl mb-4">Prochains Jours</h2>
    <div class="overflow-x-auto">
      <div class="flex space-x-8">
        <!-- Afficher les prévisions journalières -->
        <Day v-for="processedResult in processedResults" :key="processedResult.dt" :processedResult="processedResult"></Day>
      </div>
    </div>
  </section>
</template>
