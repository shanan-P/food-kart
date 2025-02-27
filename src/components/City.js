import { useState, useEffect } from "react";
import Body from "./Body";
import Shimmer from "./Shimmer";
import { CITY_API } from "../utils/constants";
import { KOTA, KALOL, INDORE } from "../utils/constants";
import useOnlineStatus from "../utils/useOnlineStatus";

const City = () => {
  const [cityCode, setCityCode] = useState("");
  const [indexApi, setIndexApi] = useState(undefined);
  const [cityName, setCityName] = useState("");
  const [apiWaleRestaurants, setApiWaleRestaurants] = useState([]);
  const [btnTxt, setBtnTxt] = useState("");

  useEffect(() => {
    fetchData();
  }, [indexApi]);

  const fetchData = async () => {
    if(cityCode==="")return;
    
    try {
      const data = await fetch(CITY_API + cityCode);
  
      const json = await data.json();
      setApiWaleRestaurants(
        json?.data?.cards[indexApi]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
    } catch (err) {
      console.error(err);
    }
  };

  const onlineStatus = useOnlineStatus();

  if(onlineStatus === false)
    return (
      <h1>Looks like you are offline! 😕</h1>
    );

  return apiWaleRestaurants.length===0 ? (
    <>
      <button className="cityBtn"
        onClick={async () => {
          setCityName("Kalol");
          setCityCode(KALOL);
          setIndexApi(2);
          setBtnTxt("Loading Kalol's Restraunts");
        }}
      >
        {!btnTxt.includes("Kalol") ? "Check In Kalol" : btnTxt}
      </button>
      <button className="cityBtn"
        onClick={() => {
          setCityName("Indore");
          setCityCode(INDORE);
          setIndexApi(1);
          setBtnTxt("Loading Indore's Restraunts")
        }}
      >
        {!btnTxt.includes("Indore") ? "Check In Indore" : btnTxt}
      </button>

      <button className="cityBtn"
        onClick={() => {
          setCityName("Kota");
          setCityCode(KOTA);
          setIndexApi(1);
          setBtnTxt("Loading Kota's Restraunts")
        }}
      >
        {!btnTxt.includes("Kota") ? "Check In Kota" : btnTxt}
      </button>
      <Shimmer/>
      
    </>
  ) : (<>
    <Body cityName={cityName} apiWaleRestaurants={apiWaleRestaurants} />
    jkk
  </>
  );
};

export default City;
