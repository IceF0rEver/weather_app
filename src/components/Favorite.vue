<script setup>
import { defineProps } from "vue";
import { LocalStore } from "../stores/local.js";
import { CoordsStore } from "../stores/coords.js";
import { useRouter } from 'vue-router';

const props = defineProps({
  city: Object,
});

const router = useRouter();

const handleClick = () => {
  CoordsStore.latitude = props.city.cityCoord.lat;
  CoordsStore.longitude = props.city.cityCoord.lon;
  router.push({ name: 'home' });
};

</script>

<template>
  <div class="bg-gray-200 hover:bg-blue-500 hover:text-white rounded-lg p-4 flex justify-between items-center">
    <span @click="handleClick">{{ props.city.cityName }}, {{ props.city.countryName }}</span>
    <div>
      <button
        @click="LocalStore.removeOne(props.city.cityName, props.city.countryName)"
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
      >
        Supprimer
      </button>
    </div>
  </div>
</template>
