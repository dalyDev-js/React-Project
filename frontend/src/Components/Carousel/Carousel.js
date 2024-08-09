import ImageGallery from "react-image-gallery";
// import stylesheet if you're not already using CSS @import
import "react-image-gallery/styles/css/image-gallery.css";
import { Link } from "react-router-dom";

const items = [
  { type: "text", content: "Explore the Treasures of Your Top Shop!" },
  {
    type: "cards",
    content: [
      {
        title: "Card 1",
        description: "This is the description for card 1.",
        image:
          " https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/1.png   ",
        link: "#",
      },
      {
        title: "Card 2",
        description: "This is the description for card 2.",
        image:
          " https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/1.png   ",
        link: "#",
      },
      {
        title: "Card 3",
        description: "This is the description for card 3.",
        image:
          " https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/1.png   ",
        link: "#",
      },
    ],
  },
  { type: "text", content: "Discover Amazing Deals and Offers!" },
];

const renderItem = (item) => {
  switch (item.type) {
    case "text":
      return (
        <div className="image-gallery-image flex items-center justify-center flex-col gap-5 min-w-full   p-10">
          <h1 className="mb-4 font-extrabold leading-none tracking-tight text-xl sm:text-2xl text-white md:text-4xl lg:text-6xl dark:text-white">
            {item.content}
          </h1>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Shop Now
          </button>
        </div>
      );

    case "cards":
      return (
        <div className="image-gallery-image flex flex-col items-center justify-center gap-5 min-w-full  p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-4">
            {item.content.map((card, index) => (
              <div class="card-container max-w-sm overflow-hidden p-12 h  bg-white border      dark:bg-gray-800 dark:border-gray-700">
                <Link href="#">
                  <img class="  h-60" src={card.image} alt="" />
                </Link>
                <div class=" flex justify-center items-center flex-col gap-3">
                  <Link href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {card.title}
                    </h5>
                  </Link>
                  <p class=" mb-5 font-normal text-gray-700 dark:text-gray-400">
                    {card.description}
                  </p>
                  <Link
                    href="#"
                    class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                    <svg
                      class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
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
            <div className="me-2 mb-2"></div>
          </div>
        </div>
      );

    default:
      return null;
  }
};

function MyGallery() {
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
