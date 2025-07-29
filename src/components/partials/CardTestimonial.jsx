import React from "react";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

const CardTestimonial = ({ item, handleDelete, handleEdit }) => {
  return (
    <>
      <div className="w-full flex-shrink-0 px-4">
        <div className="bg-white p-8 rounded-xl shadow-md text-center relative">
          <div className="absolute top-0 right-0 size-3">
            <button
              type="button"
              data-tooltip="Edit"
              className="tooltip text-white"
              onClick={() => handleEdit(item)}
            >
              <FaPencil className="p-1 bg-primary rounded-full" />
            </button>
            <button
              type="button"
              data-tooltip="Delete"
              className="tooltip text-red-600"
              onClick={() => handleDelete(item)}
            >
              <FaTrash className="p-1 bg-primary rounded-full" />
            </button>
          </div>
          <img
            src={item.testimonials_image}
            alt={item.testimonials_name}
            className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
          />
          <p className="text-gray-600 italic mb-4">
            {item.testimonials_description}
          </p>
          <h4 className="font-bold">{item.testimonials_name}</h4>
          <p className="text-gray-500 text-sm">{item.testimonials_position}</p>
        </div>
      </div>
    </>
  );
};

export default CardTestimonial;
