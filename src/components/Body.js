import RestrauntCard from "./RestrauntCard";
import { useState } from "react";
import { Link } from "react-router-dom";

const Body = ({ cityName, apiWaleRestaurants }) => {
  const [listOfRestaurants, setListOfRestaurants] =
    useState(apiWaleRestaurants);
  const [above45, setAbove45] = useState(false);
  const [searchText, setSearchText] = useState("");

  const topRated = () => {
    if (!above45) {
      const filteredList = apiWaleRestaurants?.filter(
        (res) => res.info.avgRating > 4.5
      );
      setListOfRestaurants(filteredList);
      setAbove45(true);
    } else {
      setListOfRestaurants(apiWaleRestaurants);
      setAbove45(false);
    }
  };

  return (
    <div className="body">
      <div>
        <h2 className="cityHeading">
          Checking in <div className="cityName">{cityName} Restaurants</div>
        </h2>
      </div>
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            placeholder="Search"
            onChange={(e) => {
              setSearchText(e.target.value);
              if (e.target.value === "") {
                setListOfRestaurants(apiWaleRestaurants);
                setAbove45(false);
              } else {
                setAbove45(true);
                const filteredRestaurants = apiWaleRestaurants?.filter(
                  (res) =>
                    res.info.name
                      .toLowerCase()
                      .includes(e.target.value.trim().toLowerCase()) ||
                    res.info.cuisines
                      .join(", ")
                      .toLowerCase()
                      .includes(e.target.value.trim().toLowerCase())
                );
                setListOfRestaurants(filteredRestaurants);
              }
            }}
          />
        </div>
        <button className="filter-btn-1" onClick={topRated}>
          {!above45 ? "Show Top Rated" : "Show All"}
        </button>
      </div>
      <div className="res-container">
        {listOfRestaurants?.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
          >
            <RestrauntCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
