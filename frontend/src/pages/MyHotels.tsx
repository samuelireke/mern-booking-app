import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { useQuery } from "react-query";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

const MyHotels = () => {
  const { data: hotelData } = useQuery(
    "fetchMyHotels",
    apiClient.fetchMyHotels,
    {
      onError: () => {},
    }
  );
  if (!hotelData) {
    return <span> No Hotels found</span>;
  }

  return (
    <div className="space-y-6">
      <span className="flex justify-between mt-6">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to={"/add-hotel"}
          className="bg-blue-600 
              text-white 
              px-8 
              py-2 
              rounded-md 
              font-semibold 
              text-lg
              hover:bg-blue-700 
              transition-colors 
              duration-200"
        >
          Add Hotel
        </Link>
      </span>
      <div className="flex flex-col gap-8">
        {hotelData.map((hotel) => (
          <div className="flex sm:flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5">
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <div className="whitespace-pre-line">{hotel.description}</div>
            <div className="flex flex-col sm:flex-row justify-between gap-2">
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsMap className="mr-1" />
                {hotel.city}, {hotel.country}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsBuilding className="mr-1" />
                {hotel.type}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiMoney className="mr-1" />£{hotel.pricePerNight} per night
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiHotel className="mr-1" />
                {hotel.adultCount} adults, {hotel.childCount} children
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiStar className="mr-1" />
                {hotel.starRating} Star Rating
              </div>
            </div>
            <span className="flex justify-end mt-6">
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="bg-blue-600 
              text-white 
              px-6 
              py-2 
              rounded-md 
              font-semibold 
              text-md
              hover:bg-blue-700 
              transition-colors 
              duration-200"
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
