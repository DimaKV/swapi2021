import React, { useState, useEffect, useContext } from "react";

import Spinner from "../Spinner";

import "./item-list.css";

const ItemList = ({ getItemID, getData, children }) => {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const updateItemsList = () => {
    getData().then((items) => {
      setData(items);
      setLoaded(true);
    });
  };

  useEffect(() => {
    updateItemsList();
  }, []);

  const clickedItem = (id) => {
    getItemID(id);
  };

  const itemsList = data.map((item) => {
    const label = children(item);
    return (
      <li
        className='list-group-item'
        key={item.id}
        onClick={() => {
          clickedItem(item.id);
          console.log(item.id);
        }}
      >
        {label}
      </li>
    );
  });

  return (
    <ul className='item-list list-group'>{loaded ? itemsList : <Spinner />}</ul>
  );
};

export default ItemList;
