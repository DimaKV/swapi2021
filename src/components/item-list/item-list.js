import React, { useState, useEffect, useContext } from "react";

import Spinner from "../Spinner";

import { SwapiContext } from "../SwapiContext";

import "./item-list.css";

const ItemList = ({ getItemID }) => {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const swapi = useContext(SwapiContext);

  const updatePeopleList = () => {
    swapi.getAllPeople().then((people) => {
      setData(people);
      setLoaded(true);
    });
  };

  useEffect(() => {
    updatePeopleList();
  }, []);

  const clickedItem = (id) => {
    getItemID(id);
  };

  const peopleList = data.map((person) => {
    return (
      <li
        className='list-group-item'
        key={person.id}
        onClick={() => {
          clickedItem(person.id);
        }}
      >
        {person.name}
      </li>
    );
  });

  return (
    <ul className='item-list list-group'>{data ? peopleList : <Spinner />}</ul>
  );
};

export default ItemList;
