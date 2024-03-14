import { reactive } from 'vue';
import { GeoLocationStore } from "./locations.js";

export const CoordsStore = reactive({
    latitude: null,
    longitude: null,
    currentLatitude: null,
    currentLongitude: null,
});

export const fetchCoords = async () => {
    if (CoordsStore.latitude == null && CoordsStore.longitude == null) {
        try {
            const newCoords = await GeoLocationStore.getCoords();
            CoordsStore.latitude = newCoords.latitude;
            CoordsStore.longitude = newCoords.longitude;
            CoordsStore.currentLatitude = newCoords.latitude;
            CoordsStore.currentLongitude = newCoords.longitude;
        } catch (err) {
            console.error(err.message);
        }
    }
};
