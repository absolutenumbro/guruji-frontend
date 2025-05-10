import React from 'react';
import Slider from 'react-slick';
import './Testimonials.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const testimonialsData = [
  {
    id: 1,
    name: "Ravi Sharma",
    role: "Software Engineer",
    image: "https://media.istockphoto.com/id/1277971635/photo/portrait-of-a-smiling-man-of-indian-ethnicity.jpg?s=612x612&w=0&k=20&c=CnPwvagPlklsAjejUNkuKv_QXtaXPYFQ64AQYb-IAjA=",
    text: "Sri Kushaagar Das Ji's mobile numerology helped me achieve career growth. Thank you Absolute Numbro Astro Services!"
  },
  {
    id: 2,
    name: "Priya Mehta",
    role: "Entrepreneur",
    image: "https://media.istockphoto.com/id/1293903541/photo/young-woman-stock-photo.jpg?s=612x612&w=0&k=20&c=AvQGpGDrH-0nUNAL-uHuc1uidcTiiLbovyKJjsN_mOk=",
    text: "The horoscope reading was spot on. Helped me make crucial business decisions. Highly recommend!"
  },
  {
    id: 3,
    name: "Amit Verma",
    role: "Bank Manager",
    image: "https://t4.ftcdn.net/jpg/02/45/80/65/240_F_245806560_48qNcEXwaVFE2juRc26RHpZtPbqpAOM5.jpg",
    text: "Thanks to Guruji’s Vastu advice, our home now feels more peaceful and balanced."
  },
  {
    id: 4,
    name: "Sneha Kapoor",
    role: "Interior Designer",
    image: "https://media.istockphoto.com/id/1254176393/photo/portrait-of-a-happy-woman-of-indian-ethnicity.jpg?s=612x612&w=0&k=20&c=In7iJKJ0GXYatpVnLbSRqN-bbqwnXJqy4C0AjGgyUzE=",
    text: "I got a lucky business name based on numerology. My clientele doubled in just 3 months!"
  },
  {
    id: 5,
    name: "Rohan Malhotra",
    role: "CA Aspirant",
    image: "https://t3.ftcdn.net/jpg/07/96/86/50/240_F_796865040_sm4wZxQzHYCbAAdxi4vO2dc1GMd9PhdX.jpg",
    text: "My concentration and confidence improved after a name correction session with Absolute Numbro Astro Services."
  },
  {
    id: 6,
    name: "Kavita Rathi",
    role: "Housewife",
    image: "https://t4.ftcdn.net/jpg/05/70/57/47/240_F_570574724_HWfki1q3XZt9WzVlCcQujOV5Jxe8UBG1.jpg",
    text: "Family harmony returned after following Vastu remedies given by Sri Kushaagar Das Ji."
  },
  {
    id: 7,
    name: "Vikram Patil",
    role: "Startup Founder",
    image: "https://t4.ftcdn.net/jpg/10/74/78/83/240_F_1074788373_oD8A6zzN84eSQr159d9AyeVPPW5B1skx.jpg    ",
    text: "My startup flourished after choosing a number suggested by Guruji. Deeply grateful!"
  },
  {
    id: 8,
    name: "Neha Bansal",
    role: "Marketing Consultant",
    image: "https://t4.ftcdn.net/jpg/03/71/51/23/240_F_371512305_o65E6vhP22MY2Ti2neGcsVA6IhOxOHC2.jpg",
    text: "I gained clarity in my career path after a powerful numerology session. Thank you, Absolute Numbro Astro Services!"
  }
];

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
      slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    <section className="testimonials-section">
      <h2>What Our Clients Say</h2>
      <p className="subtitle">Real Experiences | Real Transformations | Guided by Sri Kushaagar Das Ji</p>
      <div className="carousel-wrapper">
        <Slider {...settings}>
          {testimonialsData.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-image">
                <img src={testimonial.image} alt={testimonial.name} />
              </div>
              <p className="testimonial-text">“{testimonial.text}”</p>
              <h4>{testimonial.name}</h4>
              <p className="testimonial-role">{testimonial.role}</p>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;
