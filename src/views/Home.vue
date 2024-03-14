<script setup>
import { ref,} from "vue";
import Current from "../components/Current.vue";
import Hourly from "../components/Hourly.vue";
import Daily from "../components/Daily.vue";


const img = ref("sunny_day.jpg");
const bgWeather = (main) => {
    switch (main) {
        case "Clouds":
            img.value = "cloudy_day.jpg";
        break;
        case "Thunderstorm":
            img.value = "cloudy_day.jpg";
        break;
        case "Rain":
            img.value = "rain.jpg";
        break;
        case "Drizzle":
            img.value = "rain.jpg";
        break;
        default:
            img.value = "sunny_day.jpg";
    };
}
</script>

<template>
    <div
        v-bind:style="{ 'background': 'url(../../src/assets/backgrounds/' + img + ')' }"
        class="mx-auto p-4 min-h-screen flex flex-col pb-16"
        style="background-size: cover;"
    >
        <!-- Météo instantanée -->
        <Current @bgWeather="bgWeather"></Current>

        <!-- Prévisions par tranches de 2 heures -->
        <Hourly></Hourly>

        <!-- Prévisions pour les jours suivants -->
        <Daily></Daily>

        <div class="fixed inset-x-0 bottom-0 pb-4 flex justify-center">
            <button 
                class="bg-blue-500 hover:bg-blue-700 text-white h-16 w-16 leading-8 rounded-full shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out text-4xl"
            >
            <router-link :to="{ name: 'favorites', params: { backgroundImage: img } }">+</router-link>
            </button>
        </div>
    </div>
</template>
