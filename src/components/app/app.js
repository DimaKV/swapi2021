import React from "react";

import Header from "../header";
import RandomPlanet from "../random-planet";
import PeoplePage from "../people-page";
import StarshipPage from "../starship-page";
import SwapiService from "../../services/swapi-service";

import { SwapiContext } from "../SwapiContext";

import "./app.css";

const App = () => {
  const swapi = new SwapiService();

  const [btnState, setBtnState] = React.useState(true);
  const [ID, setID] = React.useState(null);

  const getItemID = (id) => {
    setID(id);
  };

  const handlerBtn = () => {
    setBtnState(!btnState);
  };

  return (
    <SwapiContext.Provider value={swapi}>
      <Header />
      {btnState && <RandomPlanet />}
      <button className='btn btn-danger' onClick={handlerBtn}>
        Toggle Planet
      </button>
      <PeoplePage />
      <br />
      {/* <StarshipPage /> */}
    </SwapiContext.Provider>
  );
};

export default App;
