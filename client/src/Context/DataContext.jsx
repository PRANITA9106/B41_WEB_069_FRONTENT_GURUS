import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

let newURL = 'https://myapp-25758-default-rtdb.firebaseio.com/TaskVista.json';

export const DataProvider = ({ children }) => {
  const [getData, setGetData] = useState([]);

  let fetchData = async (newURL) => {
    try {
      let responses = await axios.get(newURL);
      const data = responses.data;
      if (data && typeof data === 'object') {
        const dataArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key]
        }));
        setGetData(dataArray);
      } else {
        setGetData([]);
      }
    } catch (error) {
      console.log(error);
      setGetData([]);
    }
  };

  useEffect(() => {
    fetchData(newURL);
  }, []);

  return (
    <DataContext.Provider value={{ getData, fetchData }}>
      {children}
    </DataContext.Provider>
  );
};
