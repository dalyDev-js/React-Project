import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../Hooks/Redux/Slices/LanguageSlice";

function LanguageSwitcher() {
  const language = useSelector((state) => state.language.myLang);
  const dispatch = useDispatch();
  console.log(language);

  function changeToAR() {
    dispatch(setLanguage("ar"));
  }
  function changeToEN() {
    dispatch(setLanguage("en"));
  }

  return (
    <div>
      {language === "ar" ? (
        <button onClick={() => changeToEN()}>EN</button>
      ) : (
        <button onClick={() => changeToAR()}>AR</button>
      )}
    </div>
  );
}

export default LanguageSwitcher;
