import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

function Section() {
  const translate = useSelector((state) => state.language.translation);

  return (
    <div >
    <div class="flex flex-wrap items-center">
    <div class="w-full md:w-5/12 lg:w-1/2">
      <div class="mb-12 md:mb-0">
        <img src="/assets/image-01.jpg" alt="product" class="w-full"/>
      </div>
    </div>

    <div class="w-full md:w-7/12 lg:w-1/2">
      <div class="mx-8 mb-20 max-w-[520px] md:mb-0 2xl:ml-20">
        <span class="mb-3 block text-lg font-semibold text-blue-600 lg:leading-[40px] lg:text-[28px]">
          {translate.Trending}
        </span>
        <h1 class="mb-[18px] text-3xl font-bold !leading-[1.2] text-dark dark:text-white lg:text-4xl xl:text-[48px]">
          {translate.NewArrival}
        </h1>
        <p class="mb-10 text-base text-body-color dark:text-dark-6">
        {translate.Findout} 
        </p>
        <Link to="/products" class="inline-flex items-center justify-center py-3 text-base font-medium text-center transition border border-dark dark:border-white px-7 text-dark dark:text-white hover:bg-dark hover:text-black dark:hover:bg-white dark:hover:text-dark">
          {translate.Shop}
        </Link>
      </div>
    </div>
  </div>
  </div>
  )
}

export default Section