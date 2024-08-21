import React from "react";
import ImageGallery from "react-image-gallery";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "react-image-gallery/styles/css/image-gallery.css";

function MyGallery() {
  const translate = useSelector((state) => state.language.translation);

  const items = [
    { type: "text", content: translate.c1 },
    {
      type: "cards",
      content: [
        {
          title: translate.product1,
          image: "https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/1.png",
          link: "#",
        },
        {
          title: translate.product2,
          image: "https://cdn.dummyjson.com/products/images/beauty/Red%20Nail%20Polish/1.png",
          link: "#",
        },
        {
          title: translate.product3,
          image: "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/1.png",
          link: "#",
        },
      ],
    },
    { type: "text", content: translate.c3 },
  ];

  const renderItem = (item) => {
    switch (item.type) {
      case "text":
        return (
          <div className="image-gallery-image flex items-center justify-center flex-col gap-5 min-w-full p-10">
            <h1 className="mb-4 font-extrabold leading-none tracking-tight text-xl sm:text-2xl text-white md:text-4xl lg:text-6xl dark:text-white">
              {item.content}
            </h1>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              {translate.ShopNow}
            </button>
          </div>
        );

      case "cards":
        return (
          <div className="image-gallery-image flex flex-col items-center justify-center gap-5 min-w-full p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-4">
              {item.content.map((card, index) => (
                <div
                  key={index}
                  className="card-container max-w-sm overflow-hidden p-12 bg-white border dark:bg-gray-800 dark:border-gray-700">
                  <Link to={card.link}>
                    <img className="h-60" src={card.image} alt="" />
                  </Link>
                  <div className="flex justify-center items-center flex-col gap-3">
                    <Link to={card.link}>
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {card.title}
                      </h5>
                    </Link>
                    <p className="mb-5 font-normal text-gray-700 dark:text-gray-400">
                      {card.description}
                    </p>
                    <Link
                      to={card.link}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      {translate.readMore}
                      <svg
                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10">
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="carousel-container">
      <div className="w-full">
        <ImageGallery
          items={items}
          renderItem={renderItem}
          showThumbnails={false}
          showBullets={false}
          showFullscreenButton={false}
          showPlayButton={false}
          lazyLoad={true}
          autoPlay={false}
        />
      </div>
    </div>
  );
}

export default MyGallery;