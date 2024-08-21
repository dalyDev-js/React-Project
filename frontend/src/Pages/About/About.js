import React from 'react'
import { useSelector } from 'react-redux';

function About() {
  const translate = useSelector((state) => state.language.translation);

  return (
    <div className="p-8 max-w-2xl mx-auto text-center min-h-screen flex justify-center items-center flex-col">
      <h1 className="text-4xl font-bold mb-4">{translate.Project}</h1>
      <p className="text-lg mb-6">
{translate.AboutProject}
      </p>
      <h2 className="text-2xl font-semibold mb-4">{translate.OurTeam}</h2>
      <ul className="list-none">
        <li className="my-2 text-xl">{translate.Name1}</li>
        <li className="my-2 text-xl">{translate.Name2}</li>
        <li className="my-2 text-xl">{translate.Name3}</li>
      </ul>
      <p className="text-lg mt-6">
      {translate.Brief}
      </p>
    </div>  )
}

export default About