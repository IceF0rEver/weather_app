<script setup>
import AddFrom from "../components/AddFrom.vue";
import FavoritesList from "../components/FavoritesList.vue";


</script>

<template>
     <div
        v-bind:style="{ 'background': 'url(../../src/assets/backgrounds/' + $route.params.backgroundImage + ')' }"
        class="mx-auto p-4 min-h-screen flex flex-col"
        style="background-size: cover;"

    >
      <div class="fixed top-2 right-5 text-4xl">
        <a href="" class="text-white"><router-link :to="{name: 'home'}">x</router-link></a>
      </div>
      <!-- Formulaire d'ajout de localisation -->
      <AddFrom></AddFrom>

      <!-- Liste des localisations favorites -->
      <FavoritesList></FavoritesList>
    </div>
</template>