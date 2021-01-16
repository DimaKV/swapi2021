import React from "react";
import ItemList from "../item-list";
import PersonDetails from "../person-details";

import { SwapiContext } from "../SwapiContext";

const PeoplePage = () => {
  const swapi = React.useContext(SwapiContext);

  const [ID, setID] = React.useState(null);
  const getItemID = (id) => {
    setID(id);
  };
  return (
    <div className='row mb2'>
      <div className='col-md-6'>
        <ItemList
          getItemID={getItemID}
          getData={swapi.getAllPeople}
          render={(item) => {
            item.name, item.birthYear;
          }}
        />
      </div>
      <div className='col-md-6'>
        <PersonDetails personID={ID} />
      </div>
    </div>
  );
};

export default PeoplePage;
