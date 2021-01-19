import React, { useState, useEffect, useContext } from "react";
import Spinner from "../Spinner";
import { SwapiContext } from "../SwapiContext";

import "./item-details.css";

const ItemDetails = ({ itemID, getData }) => {
  const [data, setData] = useState({});
  const [loaded, setLoaded] = useState(false);

  const swapi = useContext(SwapiContext);

  const updateItem = () => {
    getData(itemID).then((item) => {
      setData(item);
      setLoaded(true);
    });
  };

  useEffect(() => {
    itemID && updateItem();
    return setLoaded(false);
  }, [itemID]);

  return (
    <div className='person-details card'>
      {itemID ? (
        loaded ? (
          <ItemView data={data} />
        ) : (
          <Spinner />
        )
      ) : (
        "Nothing to show"
      )}
    </div>
  );
};

const ItemView = ({ data }) => {
  const { id, name, gender, birthYear, hairColor } = data;
  return (
    <>
      <img
        className='person-image'
        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
      />
      <div className='card-body'>
        <h4>{name}</h4>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item'>
            <span className='term'>Gender</span>
            <span>{gender}</span>
          </li>
          <li className='list-group-item'>
            <span className='term'>Birth Year</span>
            <span>{birthYear}</span>
          </li>
          <li className='list-group-item'>
            <span className='term'>Hair color</span>
            <span>{hairColor}</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ItemDetails;
