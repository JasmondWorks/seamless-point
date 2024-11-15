// components/LogoSlider.js
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay'; // Not always necessary, but helpful for Swiper configuration
import { Pagination, Autoplay } from 'swiper/modules';

const logos = [
  { src: "/logos/anka.png", alt: "ANKA" },
  { src: "/logos/aramex.png", alt: "ARAMEX" },
  { src: "/logos/dhl.png", alt: "DHL" },
  { src: "/logos/fedex.png", alt: "FEDEX" },
  { src: "/logos/red-star-express.png", alt: "RED STAR EXPRESS" },
  { src: "/logos/ups.png", alt: "UPS" },
];

const LogoSlider = ({
  // logos,
  logosPerScreen = { mobile: 2, tablet: 4, desktop: 6 },
  autoplay = true,
  showDots = true,
  autoplaySpeed = 3000,
  loop = true,
}) => {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      slidesPerView={logosPerScreen.desktop}
      loop={loop}
      autoplay={autoplay ? { delay: autoplaySpeed, disableOnInteraction: false } : false}
      pagination={showDots ? { clickable: true } : false}
      breakpoints={{
        640: { slidesPerView: logosPerScreen.mobile },
        1024: { slidesPerView: logosPerScreen.tablet },
        1440: { slidesPerView: logosPerScreen.desktop },
      }}
      className="logo-slider"
    >
      {logos.map((logo, index) => (
        <SwiperSlide key={index} className="logo-slide">
          <img src={logo.src} alt={logo.alt} className="logo-image" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default LogoSlider;
