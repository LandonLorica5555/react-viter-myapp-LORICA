import React from "react";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import CardService from "../../../../partials/CardService";
import TableLoading from "../../../../partials/spinners/TableLoading";
import NoData from "../../../../partials/NoData";
import ServerError from "../../../../partials/ServerError";
import Loadmore from "../../../../partials/Loadmore";

const ServicesList = ({
  handleAdd,
  handleDelete,
  handleEdit,
  result,
  error,
  fetchNextPage,
  hasNextPage,
  isFetching,
  isFetchingNextPage,
  status,
  setPage,
  page,
  ref,
}) => {
  return (
    <>
      <div className="">
        <div className="min-h-96 max-h-96 min-w-full overflow-x-auto flex flex-row items-center gap-10">
          {(status == "pending" || result?.pages[0].data.length == 0) && (
            <div className="text-center w-full">
              {status == "pending" ? <TableLoading /> : <NoData />}
            </div>
          )}
          {error && (
            <div className="text-center w-full">
              <ServerError />
            </div>
          )}
          {result?.pages.map((page, key) => (
            <React.Fragment key={key}>
              {page?.data.map((item, key) => {
                return (
                  <div key={key} className="relative">
                    <div className="bg-gray-200 min-h-80 min-w-96 rounded-md relative">
                      <div className="p-5 flex flex-col items-center gap-3">
                        {/* IMAGE CONTAINER */}
                        <div className="min-w-10 min-h-10">
                          <img
                            src={item.web_services_image}
                            alt={item.web_services_image}
                            className="mb-2"
                          />
                        </div>
                        <div className="text-center">
                          <h4 className="mb-2">{item.web_services_name}</h4>
                          <p>{item.web_services_description}</p>
                        </div>
                      </div>
                    </div>
                    {/* ACTION */}
                    <div className="absolute -top-3 -right-3 z-10">
                      <div className="flex items-center justify-end gap-x-3 mr-5">
                        <button
                          type="button"
                          data-tooltip="Edit"
                          className="tooltip"
                          onClick={() => handleEdit(item)}
                        >
                          <FaPencil className="size-4" />
                        </button>
                        <button
                          type="button"
                          data-tooltip="Delete"
                          className="tooltip"
                          onClick={() => handleDelete(item)}
                        >
                          <FaTrash className="size-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </React.Fragment>
          ))}

          <div className="">
            <Loadmore
              fetchNextPage={fetchNextPage}
              isFetchingNextPage={isFetchingNextPage}
              hasNextPage={hasNextPage}
              result={result?.pages[0]}
              setPage={setPage}
              page={page}
              refView={ref}
            />
          </div>

          {/* <div className="bg-gray-200 min-h-80 min-w-96 rounded-md"></div>
          <div className="bg-gray-200 min-h-80 min-w-96 rounded-md"></div>
          <div className="bg-gray-200 min-h-80 min-w-96 rounded-md"></div>
          <div className="bg-gray-200 min-h-80 min-w-96 rounded-md"></div> */}
        </div>
      </div>
    </>
  );
};

export default ServicesList;
