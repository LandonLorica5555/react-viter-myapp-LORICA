import React from "react";
import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiPencil,
} from "react-icons/hi";
import CardTestimonial from "../../../../partials/CardTestimonial";
import ModalAddTestimonials from "./ModalAddTestimonials";
import useQueryData from "../../../../custom-hooks/useQueryData";
import { apiVersion } from "../../../../helpers/function-general";

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isModalTestimonials, setIsModalTestimonials] = React.useState(false);

  const {
    isLoading,
    isFetching,
    error,
    data: dataTestimonials,
  } = useQueryData(
    `${apiVersion}/controllers/developer/testimonials/testimonials.php`,
    "get",
    "testimonials"
  );

  const handleAdd = () => {
    setIsModalTestimonials(true);
  };

  return (
    <>
      <section id="testimonials" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-row justify-center items-center gap-4 mb-10">
            <div className="">
              <h2 className="text-3xl font-bold">Client Testimonials</h2>
            </div>
            <button
              className="tooltip"
              data-tooltip={"Add"}
              type="button"
              onClick={handleAdd}
            >
              <HiPencil className="bg-primary text-white size-6 p-1 border transition-all ease-in-out duration-200 rounded-full" />
            </button>
          </div>

          {/* Testimonial Slider */}
          <div className="relative max-w-4xl mx-auto">
            {/* Slides */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {dataTestimonials?.data.map((item, key) => {
                  return (
                    <React.Fragment key={key}>
                      <CardTestimonial item={item} />
                    </React.Fragment>
                  );
                })}
                {/* Testimonial 1 */}
                {/* <CardTestimonial
                  imageUrl={"/images/testimonials-1.webp"}
                  alt={"Sarah Johnson"}
                  testimony={`"The team delivered our project ahead schedule with exceptional quality. Our online sales increased by 120% within three months!"`}
                  name={"Sarah Johnson"}
                  position={"Marketing Director, TechCorp"}
                /> */}

                {/* Testimonial 2 */}
                {/* <CardTestimonial
                  imageUrl={"/images/testimonials-2.webp"}
                  alt={"Michael Chen"}
                  testimony={`"From design to deployment, their attention to detail was impressive. They became true partners in our digital transformation journey."`}
                  name={"Michael Chen"}
                  position={"CEO, StartupHub"}
                /> */}

                {/* Testimonial 3 */}
                {/* <CardTestimonial
                  imageUrl={"/images/testimonials-3.webp"}
                  alt={"Emma Rodriguez"}
                  testimony={`"Their SEO strategy tripled our organic traffic in 6 months. We've seen a dramatic improvement in lead quality and conversion rates."`}
                  name={"Emma Rodriguez"}
                  position={"CMO, GrowthSolutions"}
                /> */}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() =>
                setCurrentSlide((prev) => (prev === 0 ? 2 : prev - 1))
              }
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
            >
              <HiOutlineChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button
              onClick={() =>
                setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1))
              }
              className="absolute right-0 top-1/2 -translate-y-1/2 -ml-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
            >
              <HiOutlineChevronRight className="w-6 h-6 text-gray-600" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full ${
                    currentSlide === index ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {isModalTestimonials && (
        <ModalAddTestimonials setIsModal={setIsModalTestimonials} />
      )}
    </>
  );
};

export default Testimonials;
