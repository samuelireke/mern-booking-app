import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex flex-wrap justify-between items-center px-4">
        <span className="text-3xl  text-white font-bold tracking-tight">
          <Link to="/">MernHolidays.com</Link>
        </span>
        <span className="flex space-x-2 md:space-x-4 gap-5">
          {isLoggedIn ? (
            <>
              <Link
                className="flex items-center text-white px-3 font-semibold hover:bg-blue-700 rounded"
                to="/my-bookings"
              >
                My Bookings
              </Link>
              <Link
                className="flex items-center text-white px-3 font-semibold hover:bg-blue-700 rounded"
                to="/my-hotels"
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex items-center text-blue-600 bg-white px-3 font-bold hover:bg-gray-100 rounded"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
