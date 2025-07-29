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
import { FaList, FaPlus, FaTable } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import TestimonialsTable from "./TestimonialsTable";
import TestimonialsList from "./TestimonialsList";
import ModalDeleteTestimonials from "./ModalDeleteTestimonials";

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isModalTestimonials, setIsModalTestimonials] = React.useState(false);
  const [isDeleteTestimonials, setIsDeleteTestimonials] = React.useState(false);
  const [itemEdit, setItemEdit] = React.useState();
  const [isTable, setIsTable] = React.useState(false);

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

  const handleToggleTable = () => {
    setIsTable(!isTable);
  };

  const handleAdd = () => {
    setItemEdit(null);
    setIsModalTestimonials(true);
  };

  const handleEdit = (item) => {
    setItemEdit(item);
    setIsModalTestimonials(true);
  };

  const handleDelete = (item) => {
    setItemEdit(item);
    setIsDeleteTestimonials(true);
  };

  return (
    <>
      <section id="testimonials" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex- md:flex-row justify-center items-center gap-4 mb-10 relative">
            <div className="">
              <h2 className="text-3xl font-bold">Client Testimonials</h2>
            </div>
            <div className="absolute right-0 top-1/3">
              <div className="flex items-center gap-x-3">
                <button
                  className="flex items-center gap-2 hover:underline hover:text-primary"
                  type="button"
                  onClick={handleToggleTable}
                >
                  {isTable == true ? (
                    <>
                      <FaList className="size-3" />
                      List
                    </>
                  ) : (
                    <>
                      <FaTable className="size-3" />
                      Table
                    </>
                  )}
                </button>
                <button
                  className="flex items-center gap-2 hover:underline hover:text-primary"
                  type="button"
                  onClick={handleAdd}
                >
                  <FaPlus className="size-3" />
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Testimonial Slider */}
          {isTable == true ? (
            <TestimonialsTable
              isLoading={isLoading}
              isFetching={isFetching}
              error={error}
              dataTestimonials={dataTestimonials}
              handleAdd={handleAdd}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ) : (
            <TestimonialsList
              isLoading={isLoading}
              isFetching={isFetching}
              error={error}
              dataTestimonials={dataTestimonials}
              handleAdd={handleAdd}
              handleEdit={handleEdit}
              setCurrentSlide={setCurrentSlide}
              currentSlide={currentSlide}
              handleDelete={handleDelete}
            />
          )}
        </div>
      </section>

      {isModalTestimonials && (
        <ModalAddTestimonials
          setIsModal={setIsModalTestimonials}
          itemEdit={itemEdit}
        />
      )}
      {isDeleteTestimonials && (
        <ModalDeleteTestimonials
          dataTestimonials={dataTestimonials}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
          setModalDelete={setIsDeleteTestimonials}
          mySqlEndpoint={`${apiVersion}/controllers/developer/testimonials/testimonials.php?id=${itemEdit.testimonials_aid}`}
          queryKey="testimonials"
        />
      )}
    </>
  );
};

export default Testimonials;
