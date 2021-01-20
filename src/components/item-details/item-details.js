import React, { useState, useEffect, useContext } from "react";
import Spinner from "../Spinner";
import { SwapiContext } from "../SwapiContext";

import "./item-details.css";

const Record = ({ data, field, label }) => {
  return (
    <li className='list-group-item'>
      <span className='term'>{label}</span>
      <span>{data[field]}</span>
    </li>
  );
};

export { Record };

const ItemDetails = ({ itemID, getData, getUrlImg, children }) => {
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

  const { id, name, gender, birthYear, hairColor } = data;

  return (
    <div className='person-details card'>
      {itemID ? (
        loaded ? (
          <>
            <img className='person-image' src={getUrlImg(id)} />
            <div className='card-body'>
              <h4>{name}</h4>
              <ul className='list-group list-group-flush'>
                {React.Children.map(children, (child) => {
                  return React.cloneElement(child, { data });
                })}
              </ul>
            </div>
          </>
        ) : (
          <Spinner />
        )
      ) : (
        "Nothing to show"
      )}
    </div>
  );
};

// const ItemView = ({ data, getUrlImg, children }) => {
//   const { id, name, gender, birthYear, hairColor } = data;
//   return (
//     <>
//       <img className='person-image' src={getUrlImg(id)} />
//       <div className='card-body'>
//         <h4>{name}</h4>
//         <ul className='list-group list-group-flush'>
//           {React.Children.map(children, (child, indx) => {
//             return child;
//           })}
//         </ul>
//       </div>
//     </>
//   );
// };

export default ItemDetails;
