import React from "react";

import Header from "../../Components/Header/Header";
import TopRated from "../../Components/TopRated/TopRated";

function Home() {
  return (
    <div>
      <Header />
      <div>
        <p  className="text-4xl m-5 font-semibold text-gray-900 mb-4 inline-block">
          Top Rated
        </p>
      </div>
      <TopRated />
    </div>
  );
}

export default Home;
