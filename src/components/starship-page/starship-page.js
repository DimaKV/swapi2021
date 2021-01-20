import React from "react";
import ItemList from "../item-list";
import ItemDetails from "../item-details";
import Row from "../row";

import { Record } from "../item-details/item-details";

import { SwapiContext } from "../SwapiContext";

const StarshipPage = () => {
  const swapi = React.useContext(SwapiContext);

  const [ID, setID] = React.useState(null);
  const getItemID = (id) => {
    setID(id);
  };

  const itemList = (
    <ItemList getItemID={getItemID} getData={swapi.getAllStarships}>
      {(item) => {
        return `name: ${item.name}, crew: ${item.crew}`;
      }}
    </ItemList>
  );

  const itemDetails = (
    <ItemDetails
      itemID={ID}
      getData={swapi.getStarship}
      getUrlImg={swapi.getStarshipImg}
    >
      <Record field='crew' label='Crew' />
      <Record field='model' label='model' />
      <Record field='costInCredits' label='Cost' />
    </ItemDetails>
  );

  return <Row left={itemList} right={itemDetails} />;
};

export default StarshipPage;
