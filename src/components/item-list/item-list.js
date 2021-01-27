import React, { useState, useEffect, useContext } from "react";

import Spinner from "../Spinner";

import "./item-list.css";

const ItemList = ({ getItemID, children, data }) => {
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
        }}
      >
        {label}
      </li>
    );
  });

  return <ul className='item-list list-group'>{itemsList}</ul>;
};

const withData = (View, getData) => {
  return (props) => {
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

    if (!loaded) {
      return <Spinner />;
    }

    return <View {...props} data={data} />;
  };
};

const { getData } = props;

export default withData(ItemList, getData);
