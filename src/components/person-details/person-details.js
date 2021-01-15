import React, { useState, useEffect, useContext } from "react";
import { SwapiContext } from "../SwapiContext";

import "./person-details.css";

const PersonDetails = ({ personID }) => {
  const [data, setData] = useState({});
  const [loaded, setLoaded] = useState(false);

  const swapi = useContext(SwapiContext);

  const updatePerson = () => {
    swapi.getPerson(personID).then((person) => {
      setData(person);
      setLoaded(true);
    });
  };

  useEffect(() => {
    personID && updatePerson();
  }, [personID]);

  return (
    <div className='person-details card'>
      {personID ? <PersonView data={data} /> : "Nothing to show"}
    </div>
  );
};

const PersonView = ({ data }) => {
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

export default PersonDetails;
