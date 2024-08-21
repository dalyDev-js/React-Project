import React from "react";

import Header from "../../Components/Header/Header";
import TopRated from "../../Components/TopRated/TopRated";
import Section from "../../Components/Section/Section";
import { useSelector } from "react-redux";

function Home() {
  const translate = useSelector((state) => state.language.translation);

  return (
    <div>
      <Header />
      <div className="mt-5">
        <Section />
      </div>
      <div>
        <p className="text-4xl m-5 font-semibold text-gray-900 mb-4 inline-block">
          {translate.TopRated}
        </p>
      </div>
      <TopRated />
    </div>
  );
}

export default Home;
