import React from "react";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import CardService from "../../../../partials/CardService";

const ServicesList = ({
  isLoading,
  isFetching,
  error,
  dataServices,
  handleAdd,
  handleDelete,
  handleEdit,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {dataServices?.data.map((item, key) => {
          return (
            <div key={key} className="relative">
              <div className="absolute -top-2 right-0 size-3">
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
              <CardService item={item} />
            </div>
          );
        })}
        {/* Card 1 */}
        {/* <CardService
              imageUrl={"../images/card-icon-web-development.webp"}
              alt={"Web Development Image"}
              title={"Web Development"}
              description={
                "Custom websites built with modern frameworks like Next.js and React for optiomal performance."
              }
              aText={"View Packages"}
            /> */}

        {/* Card 2 */}
        {/* <CardService
              imageUrl={"/images/card-icon-ui-ux-design.webp"}
              alt={"UI/UX Design Image"}
              title={"UI/UX Design"}
              description={
                "Beautiful interfaces designed to convert visitors with strategic user experience flaws."
              }
              aText={"See Portfolio"}
            /> */}

        {/* Card 3 */}
        {/* <CardService
              imageUrl={"/images/card-icon-seo-optimization.webp"}
              alt={"SEO Optimization Image"}
              title={"SEO Optimization"}
              description={
                "Increase your visibility on search engines with our data-driven SEO strategies."
              }
              aText={"Get Audit"}
            /> */}
      </div>
    </>
  );
};

export default ServicesList;
