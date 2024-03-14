import { reactive } from 'vue';
import { CoordsStore, fetchCoords } from './coords.js';

const apiKey = '';

export const ForecastsStore = reactive({
    getCurrent: async function() {
        await fetchCoords();
        if (!CoordsStore.latitude || !CoordsStore.longitude) {
            throw new Error("Les coordonnées ne sont pas disponibles.");
        }

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${CoordsStore.latitude}&lon=${CoordsStore.longitude}&appid=${apiKey}&lang=fr&units=metric`);
            return await response.json();
        } catch (err) {
            throw err;
        }
    },
    getByCoord: async function() {
        await fetchCoords();
        if (!CoordsStore.latitude || !CoordsStore.longitude) {
            throw new Error("Les coordonnées ne sont pas disponibles.");
        }

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${CoordsStore.latitude}&lon=${CoordsStore.longitude}&appid=${apiKey}&lang=fr&units=metric`);
            return await response.json();
        } catch (err) {
            throw err;
        }
    },
    getByLocation: async function(country) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${country}&appid=${apiKey}&lang=fr&units=metric`);
            return await response.json();
        } catch (err) {
            throw err;
        }
    },
    getLocationByActualPosition: async function() {
        await fetchCoords();
        if (!CoordsStore.currentLatitude || !CoordsStore.currentLongitude) {
            throw new Error("Les coordonnées ne sont pas disponibles.");
        }

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${CoordsStore.currentLatitude}&lon=${CoordsStore.currentLongitude}&appid=${apiKey}&lang=fr&units=metric`);
            return await response.json();
        } catch (err) {
            throw err;
        }
    }
});
