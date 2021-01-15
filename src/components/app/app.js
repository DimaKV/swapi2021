import React from "react";

import Header from "../header";
import RandomPlanet from "../random-planet";
import ItemList from "../item-list";
import PersonDetails from "../person-details";
import SwapiService from "../../services/swapi-service";

import { SwapiContext } from "../SwapiContext";

import "./app.css";

const App = () => {
  const swapi = new SwapiService();

  const [ID, setID] = React.useState(null);
  const [btn, setBtn] = React.useState(true);

  const handlerBtn = () => {
    setBtn(!btn);
  };

  const getItemID = (id) => {
    setID(id);
  };

  return (
    <SwapiContext.Provider value={swapi}>
      <Header />
      {btn && <RandomPlanet />}
      <button className='btn btn-primary' onClick={handlerBtn}>
        Toggle Planet
      </button>

      <div className='row mb2'>
        <div className='col-md-6'>
          <ItemList getItemID={getItemID} />
        </div>
        <div className='col-md-6'>
          <PersonDetails personID={ID} />
        </div>
      </div>
    </SwapiContext.Provider>
  );
};

export default App;
