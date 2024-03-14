import { reactive } from 'vue';

export const LocalStore = reactive({
    cities: JSON.parse(localStorage.getItem("cities")) || [],
    current: JSON.parse(localStorage.getItem("current")) || [],
    findAll: function() {
        return this.cities;
    },
    addOne: function(cityData) {
        const isDuplicate = this.cities.some(
        (city) =>
            city.cityName === cityData.cityName &&
            city.countryName === cityData.countryName
        );

        if (!isDuplicate) {
        this.cities.push(cityData);
        this.save();
        }
    },
    removeOne: function(cityName, countryName) {
        this.cities.splice(
            this.cities.findIndex((city) => city.cityName == cityName && city.countryName == countryName),1
        );
        this.save();
    },
    save: function() {
        localStorage.cities = JSON.stringify(this.cities);
    },
    addCurrent: function(cityData) {
        localStorage.removeItem('current');
        this.current = Array.isArray(this.current) ? this.current : [];
        this.current = [cityData];
        localStorage.setItem('current', JSON.stringify(this.current));
    },
    addCurrentToCities: function() {
        this.addOne(this.current[0]);
    },
});
