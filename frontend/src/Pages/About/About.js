import React from 'react'

function About() {
  return (
    <div className="p-8 max-w-2xl mx-auto text-center min-h-screen flex justify-center items-center flex-col">
      <h1 className="text-4xl font-bold mb-4">About Our Project</h1>
      <p className="text-lg mb-6">
        Welcome to our React final project! We are a group of passionate developers from ITI,
        excited to share what we've built with you. This project is the culmination of our learning
        journey in React with Eng: Mariem Hady, where we've applied our skills to create something meaningful and
        impactful.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
      <ul className="list-none">
        <li className="my-2 text-xl">AbdelRahman El Daly</li>
        <li className="my-2 text-xl">Ahmed Hassan</li>
        <li className="my-2 text-xl">Mohammed Hosni</li>
      </ul>
      <p className="text-lg mt-6">
        We have worked collaboratively on this project, each bringing our unique skills and
        expertise to the table. We hope you find our project both useful and enjoyable to explore.
      </p>
    </div>  )
}

export default About