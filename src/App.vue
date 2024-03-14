<script setup>
import { reactive, onMounted } from "vue";
import { CoordsStore, fetchCoords } from "./stores/coords.js";

const coords = reactive(CoordsStore);

onMounted(fetchCoords);
</script>

<template>
    <router-view :coords="coords"></router-view>
</template>
