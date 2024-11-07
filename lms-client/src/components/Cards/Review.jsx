import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { FaHeart,FaClock,FaHashtag } from "react-icons/fa";
import icon from "../../../public/assets/images/image.png"
const Review = () => {
  const story = {
    title: "Top Stories",
    news: [
      {
        title: "Jayson Tatum Debuts",
        text: "Jordan Brands signature model for the past few years, Jayson Tatum will be dawning the Air Jordan 37 this season before attaining potentially his first signature sneaker with Jumpman, which he rumored to be in the works recently via his Twitter.",
        img: {icon},
        url: "https://sneakernews.com/2022/09/14/air-jordan-37-low/",
        like: "3/5",
        time: "11 Mins",
        by: "Jared Ebanks",
        btn: "Read More",
      },
      {
        title: "Bro’s Nike Zoom Freak 4",
        text: "Arriving right time for the Fall, this upcoming take on the Zoom Freak 4 seemingly draws inspiration from Thanksgiving. Orange and brown, two staples of the holiday, are used throughout the upper, dressing the parts not bathed in shades of grey.",
        img: "https://sneakernews.com/wp-content/uploads/2022/09/nike-zoom-freak-4-ironstone-orange-trance-cobblestone-sail-dj6149-003-2.jpg?w=540&h=380&crop=1",
        time: "41 Mins",
        like: "5/5",
        url: "https://sneakernews.com/2022/09/14/nike-zoom-freak-4-ironstone-orange-trance-cobblestone-sail-dj6149-003/",
        by: "Michael Le",
        btn: "Read More",
      },
      {
        title: "Nike Air Max Plus",
        text: "The Nike Air Max Plus has enjoyed the reveal of several colorways these last few of months. And as we officially embark on the Fall season, an additional set have been added to the calendar, including this newly-revealed grey and orange colorway.",
        img: "https://sneakernews.com/wp-content/uploads/2022/09/Nike-Air-Max-Plus-FB3358-001-2.jpg?w=540&h=380&crop=1",
        time: "2 Hours",
        url: "https://sneakernews.com/2022/09/14/nike-air-max-plus-grey-orange-black-fb3358-001/",
        like: "5/5",
        by: "Michael Le",
        btn: "Read More",
      },
      {
        title: "Air Jordan Retro High OG",
        text: "Air Jordan Retro High OG popular series of AJ1s with the popular color-blocking with the original Yellow Toe flavor. The colorway was revealed back PE by musician Zach Myers, nearly four years later, Jordan fanatics will finally get their shot a GR release.",
        img: "https://sneakernews.com/wp-content/uploads/2022/03/yellow-toe-jordan-1-release-date-2.jpg",
        time: "7 Months",
        url: "https://sneakernews.com/2022/03/09/air-jordan-1-retro-high-og-yellow-toe-555088-711/",
        like: "5/5",
        by: "Sneaker News",
        btn: "Read More",
      },
      {
        title: "Nike Air Zoom GT Cut 2",
        text: "The Bred coloryway of Zoom GT Cut 2 will be first to release this Friday, For Nike Members Nation World Wide while Sabrina Ionescus colorway is set for an October 13th release date. In the meantime, enjoy official images of both colorways below.",
        img: "https://sneakernews.com/wp-content/uploads/2022/09/nike-zoom-gt-cut-2-release-date.jpg?w=540&h=380&crop=1",
        time: "1 Months",
        url: "https://sneakernews.com/2022/09/13/nike-zoom-gt-cut-2-officially-unveiled/",
        like: "3/5",
        by: "Jared Ebanks",
        btn: "Read More",
      },
      {
        title: "Puma Announces Breanna",
        text: "For the first time in over a decade, a signature basketball silhouette is being made for one of the WNBA’s best and brightest stars, Olympic Gold Medalist and Seattle Storm superstar Breanna Stewart. Puma Stewie 1 Quiet Fire will be available this Friday.",
        img: "https://sneakernews.com/wp-content/uploads/2022/09/puma-stewie-1-quiet-fire-breanna-stewart-release-date-lead.jpg?w=540&h=380&crop=1",
        time: "25 Days",
        url: "https://sneakernews.com/2022/09/13/nike-zoom-gt-cut-2-officially-unveiled/",
        like: "3/5",
        by: "Jared Ebanks",
        btn: "Read More",
      },
      {
        title: "Nike Air Force Orange Color",
        text: "From lace toggles to city-inspired makeovers, the Nike Air Force 1 has delivered a number of unique modifications. Here though, the brand is taking things down quite a few notches, opting for a simple colorway helmed primarily by black and Laser Orange.",
        img: "https://sneakernews.com/wp-content/uploads/2022/09/Nike-Air-Force-1-Black-Yellow-FB7162-081-8.jpg?w=540&h=380&crop=1",
        url: "https://sneakernews.com/2022/09/09/nike-air-force-1-black-laser-orange-fb7162-081/",
        time: "6 Days",
        like: "4/5",
        by: "Micael Le",
        btn: "Read More",
      },
      {
        title: "Hello Kitty and Adidas",
        text: "The world of Sanrio is vast and replete with many an iconic character. Few among the family, though, rival the immense influence of Hello Kitty, who’s played mascot for everything from Pringles merchandise to sneaker collaborations.",
        img: "https://sneakernews.com/wp-content/uploads/2022/09/hello-kitty-adidas-superstar-GW7168-2.jpg?w=540&h=380&crop=1",
        url: "https://sneakernews.com/2022/09/08/hello-kitty-adidas-originals-gw7166-gw7167-gw7168/",
        time: "5 Days",
        like: "4/5",
        by: "Micael Le",
        btn: "Read More",
      },
      {
        title: "Air Force 1 Low Expands",
        text: "The nighttime aesthetic seen here is applied to the tumbled black leather panels of the upper and perforated mesh construction of the tongue while Royal trim and forefoot Swooshes provide additional intrigue to the darkened palette.",
        img: "https://sneakernews.com/wp-content/uploads/2022/09/nike-air-force-1-low-worldwide-black-royal-fb1840-001-lead.jpg?w=540&h=380&crop=1",
        url: "https://sneakernews.com/2022/09/08/nike-air-force-1-low-worldwide-black-royal-fb1840-001/",
        time: "5 Days",
        like: "4/5",
        by: "Micael Le",
        btn: "Read More",
      },
    ],
  };

  const splideOptions = {
    perPage: 4,
    perMove: 1,
    type: "loop",
    rewind: true,
    keyboard: "global",
    gap: "1rem",
    pagination: false,
    padding: "2rem",
    breakpoints: {
      1200: { perPage: 3 },
      991: { perPage: 2.3 },
      768: { perPage: 2 },
      500: { perPage: 1.3 },
      425: { perPage: 1 },
    },
  };
  return (
    <div>
      <div className="nike-container mb-11">
        <div className="mt-7">
          <Splide options={splideOptions}>
            {story.news.map((val, i) => (
              <SplideSlide key={i} className="mb-0.5">
                <div className=" relative grid  items-center gap-4 pb-4 rounded-lg shadow shadow-slate-200 ring-1 ring-slate-200">
                  <div className=" flex items-centre justify-items-center">
                    <img
                      className="w-28 h-28 object-cover shadow-md shadow-slate-200 rounded-r-lg rounded-l-lg"
                      src={icon}
                      alt={`imgl/story/${i}`}
                    />
                  </div>
                  <div className=" flex items-center justify-between w-full">
                    <div className="">
                      <FaHeart className="icon-style w-5 h-5 text-red-500" />
                      <span className="text-xs font-bold">{val.like}</span>
                    </div>
                    <div className="">
                      <FaClock className="icon-style w-4 h-4 text-black" />
                      <span className="text-xs font-bold">{val.time}</span>
                    </div>
                    <div className="">
                      <FaHashtag className="icon-style  text-blue-600" />
                      <span className="text-xs font-bold text-blue-600">
                        {val.by}
                      </span>
                    </div>
                  </div>
                  <div className=" grid items-center justify-items-start px-4">
                    <h1 className="text-base font-semibold lg:text-sm">
                      {val.title}
                    </h1>
                    <p className="text-sm text-justify lg:text-xs">
                      {val.text}
                    </p>
                  </div>
                  <div className="flex items-center justify-center px-4  w-full">
                    <a
                      href={val.url}
                      target="_blank"
                      role={"button"}
                      className="w-full bg-gradient-to-b from-slate-900 to-black shadow-md shadow-black text-center text-slate-100 py-1.5 button-theme"
                    >
                      {val.btn}{" "}
                    </a>
                  </div>
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
    </div>
  );
};

export default Review;
