const Footer = () => {
  return (
    <div className="bg-blue-800 py-10">
      <div className="container mx-auto flex justify-between items-center px-4 flex-wrap">
        <span className="text-3xl text-white font-bold tracking-tight">
          {" "}
          MernHolidays.com
        </span>
        <span className="text-white font-semibold tracking-tight flex gap-4">
          <p className="cursor-pointer hover:bg-blue-700 rounded  px-3 ">
            Privacy Policy
          </p>
          <p className="cursor-pointer hover:bg-blue-700 rounded  px-3 ">
            Terms of Service
          </p>
        </span>
      </div>
    </div>
  );
};

export default Footer;
