import { CDN_URL } from "../utils/constants";

const RestrauntCard = (props) => {
    
    const {resData} = props;

    const {cloudinaryImageId, name, avgRating, cuisines, costForTwo} = resData?.info;
    const {deliveryTime} = resData?.info.sla;

    return (
        <div className="res-card" style={{backgroundColor: "#f0f0f0", border: "2px double burlywood"}}>
            <img className="res-logo" style={{border: "2px solid lightcoral"}} src={CDN_URL
            + cloudinaryImageId}/>
            <h3>{name}</h3>
            <h4>{cuisines.join(", ")}</h4>
            <h4>{avgRating} stars</h4>
            <h4>{costForTwo}</h4>
            <h4>{deliveryTime} minutes</h4>
        </div>
    )
}

export default RestrauntCard;