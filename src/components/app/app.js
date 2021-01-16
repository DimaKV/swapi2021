import React from "react";

import Header from "../header";
import RandomPlanet from "../random-planet";
import ItemList from "../item-list";
import PersonDetails from "../person-details";
import PeoplePage from "../people-page";
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
      <button className='btn btn-primary' onClick={handlerBtn}>
        Toggle Planet
      </button>

      {/* <PeoplePage /> */}

      <div className='row mb2'>
        <div className='col-md-6'>
          <ItemList
            getItemID={getItemID}
            getData={swapi.getAllPlanets}
            render={(item) => {
              return `name: ${item.name}, rotation: ${item.rotationPeriod}`;
            }}
          />
        </div>
        <div className='col-md-6'>
          <PersonDetails personID={ID} />
        </div>
      </div>

      <div className='row mb2'>
        <div className='col-md-6'>
          <ItemList
            getItemID={getItemID}
            getData={swapi.getAllStarships}
            render={(item) => {
              return `name: ${item.name}, crem: ${item.crew}`;
            }}
          />
        </div>
        <div className='col-md-6'>
          <PersonDetails personID={ID} />
        </div>
      </div>
    </SwapiContext.Provider>
  );
};

export default App;
