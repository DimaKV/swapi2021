export default class SwapiService {
  _apiBase = "https://swapi.dev/api";

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` + `, received ${res.status}`);
    }
    return await res.json();
  }

  getAllPeople = async () => {
    const res = await this.getResource(`/people/`);
    return res.results.map(this._transformPerson);
  };

  getPerson = async (id) => {
    const res = await this.getResource(`/people/${id}/`);
    return this._transformPerson(res);
  };

  getAllPlanets = async () => {
    const res = await this.getResource(`/planets/`);
    return res.results.map(this._transformPlanet);
  };

  getPlanet = async (id) => {
    const res = await this.getResource(`/planets/${id}/`);
    return this._transformPlanet(res);
  };

  getAllStarships = async () => {
    const res = await this.getResource(`/starships/`);
    return res.results;
  };

  getStarship = async (id) => {
    const res = await this.getResource(`/starships/${id}/`);
    return res.results.map(this._transformStarship);
  };

  _transformPlanet = (planet) => {
    return {
      id: this._getIDfromURL(planet.url),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter,
    };
  };

  _transformStarship = (starship) => {
    return {
      id: this._getIDfromURL(starship.url),
      name: starship.name,
      model: starship.model,
      manufacture: starship.manufacture,
      costInCredits: starship.cost_in_credits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargo_capacity,
    };
  };

  _transformPerson = (person) => {
    return {
      id: this._getIDfromURL(person.url),
      name: person.name,
      gender: person.gender,
      birthYear: person.birth_year,
      hairColor: person.hair_color,
    };
  };

  _getIDfromURL = (url) => {
    const urlArr = url.split("/");
    const id = urlArr[urlArr.length - 2];
    return id;
  };
}
