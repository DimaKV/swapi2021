import React, { useState, useEffect, useContext } from "react";
import Spinner from "../Spinner";
import Error from "../ErrorIndicator";
import { SwapiContext } from "../SwapiContext";

import "./random-planet.css";

const RandomPlanet = () => {
  const [data, setData] = useState({});
  const [loaded, setLoaded] = useState(false);

  const swapi = useContext(SwapiContext);

  const updatePlanet = () => {
    const id = Math.floor(Math.random() * 15 + 3);
    swapi
      .getPlanet(id)
      .then((planet) => {
        setData(planet);
        setLoaded(true);
      })
      .catch(() => <Error />);
  };

  useEffect(() => {
    updatePlanet();
    const intervalID = setInterval(updatePlanet, 5000);

    return () => clearInterval(intervalID);
  }, []);

  const spinner = loaded ? null : <Spinner />;
  const planet = loaded ? <PlanetView /> : null;

  return (
    <div className='random-planet jumbotron rounded'>
      {loaded ? <PlanetView data={data} /> : <Spinner />}
    </div>
  );
};

//паттерн: разделение ответственности компонента: есть компоненты только для отображения, а есть только для логики

const PlanetView = ({ data }) => {
  const { id, name, population, rotationPeriod, diameter } = data;
  return (
    <>
      <img
        className='planet-image'
        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
      />
      <div>
        <h4>{name}</h4>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item'>
            <span className='term'>Population</span>
            <span>{population}</span>
          </li>
          <li className='list-group-item'>
            <span className='term'>Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className='list-group-item'>
            <span className='term'>Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default RandomPlanet;
