<script setup>
import Favorite from "./Favorite.vue";
import { LocalStore } from "../stores/local.js";
</script>

<template>
    <section class="bg-white rounded-lg shadow p-5">
        <h2 class="font-bold text-xl mb-4">Vos Localisations Favorites</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <!-- Exemple de localisation favorite -->
            <Favorite v-for="city in LocalStore.findAll()" :key="city.cityName && city.countryName" :city="city"></Favorite>
        </div>
      </section>
</template>