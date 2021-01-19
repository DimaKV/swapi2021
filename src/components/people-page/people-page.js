import React from "react";
import ItemList from "../item-list";
import ItemDetails from "../item-details";
import Row from "../row";

import { SwapiContext } from "../SwapiContext";

const PeoplePage = () => {
  const swapi = React.useContext(SwapiContext);

  const [ID, setID] = React.useState(null);
  const getItemID = (id) => {
    setID(id);
  };

  const itemList = (
    <ItemList getItemID={getItemID} getData={swapi.getAllPeople}>
      {(item) => {
        return `name: ${item.name}, gender: ${item.gender}`;
      }}
    </ItemList>
  );

  const itemDetails = <ItemDetails itemID={ID} getData={swapi.getPerson} />;

  return <Row left={itemList} right={itemDetails} />;
};

export default PeoplePage;
