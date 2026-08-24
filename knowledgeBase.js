const KnowledgeBase = {
  data: DESTINATIONS,

  getById(id) {
    return this.data.find((d) => d.id === id) || null;
  },

  byCity(city) {
    if (!city) return this.data;
    return this.data.filter((d) => d.city.toLowerCase() === city.toLowerCase());
  },

  near(destinationId) {
    const dest = this.getById(destinationId);
    if (!dest) return [];
    return dest.nearBy.map((id) => this.getById(id)).filter(Boolean);
  },

  search({ city, tags = [], maxBudget, indoorOnly, weather } = {}) {
    return this.data.filter((d) => {
      if (city && d.city.toLowerCase() !== city.toLowerCase()) return false;
      if (tags.length && !tags.some((t) => d.tags.includes(t))) return false;
      if (maxBudget && d.avgCost > maxBudget) return false;
      if (indoorOnly && d.indoorOutdoor === "outdoor") return false;
      if (weather && !d.bestWeather.includes("any") && !d.bestWeather.includes(weather)) {
        return false;
      }
      return true;
    });
  }
};