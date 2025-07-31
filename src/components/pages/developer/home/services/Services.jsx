import React from "react";
import CardService from "../../../../partials/CardService";
import useQueryData from "../../../../custom-hooks/useQueryData";
import { apiVersion } from "../../../../helpers/function-general";
import { FaList, FaPlus, FaTable, FaTrash } from "react-icons/fa";
import ModalAddServices from "./ModalAddServices";
import { FaPencil } from "react-icons/fa6";
import ModalDeleteServices from "./ModalDeleteServices";
import ServicesList from "./ServicesList";
import ServicesTable from "./ServicesTable";
import { useInfiniteQuery } from "@tanstack/react-query";
import { queryDataInfinite } from "../../../../custom-hooks/queryDataInfinite";
import { useInView } from "react-intersection-observer";

const Services = () => {
  const [isModalServices, setIsModalServices] = React.useState(false);
  const [isDeleteServices, setIsDeleteServices] = React.useState(false);
  const [itemEdit, setItemEdit] = React.useState();
  const [isTable, setIsTable] = React.useState(false);

  const [page, setPage] = React.useState(1);
  const { ref, Inview } = useInView();

  // const {
  //   isLoading,
  //   isFetching: isFetchingDataServices,
  //   error: errorDataServices,
  //   data: dataServices,
  // } = useQueryData(
  //   `${apiVersion}/controllers/developer/web-services/web-services.php`, // endpoint
  //   "get", // post
  //   "web-services" // query key
  // );

  const {
    data: result,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["web-services"],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        ``, // search functionalities
        `${apiVersion}/controllers/developer/web-services/page.php?start=${pageParam}`, // load more or pagination functionalities
        false,
        {},
        "post"
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
      }
      return;
    },
  });

  React.useEffect(() => {
    if (Inview) {
      fetchNextPage();
      setPage((prev) => prev + 1);
    }
  });

  const handleToggleTable = () => {
    setIsTable(!isTable);
  };

  const handleAdd = () => {
    setItemEdit(null);
    setIsModalServices(true);
  };

  const handleEdit = (item) => {
    setItemEdit(item);
    setIsModalServices(true);
  };

  const handleDelete = (item) => {
    setItemEdit(item);
    setIsDeleteServices(true);
  };

  return (
    <>
      <section id="services" className="bg-gray-50 py-12 md:py-20">
        <div className="container">
          {/* Section Header */}
          <div className="relative w-full">
            <div className="text-center mb-12">
              <h2 className="title">Our Web Services</h2>
              <p>
                Professional solutions tailored to boost your online presence
              </p>
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

          {/* 3-Column Grid */}
          {isTable == true ? (
            <ServicesTable
              // isLoading={isLoading}
              // dataServices={dataServices}
              handleAdd={handleAdd}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              result={result}
              error={error}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetching={isFetching}
              isFetchingNextPage={isFetchingNextPage}
              status={status}
              setPage={setPage}
              page={page}
              ref={ref}
            />
          ) : (
            <ServicesList
              // isLoading={isLoading}
              // dataServices={dataServices}
              handleAdd={handleAdd}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              result={result}
              error={error}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetching={isFetching}
              isFetchingNextPage={isFetchingNextPage}
              status={status}
              setPage={setPage}
              page={page}
              ref={ref}
            />
          )}
        </div>
      </section>

      {isModalServices && (
        <ModalAddServices setIsModal={setIsModalServices} itemEdit={itemEdit} />
      )}
      {isDeleteServices && (
        <ModalDeleteServices
          setModalDelete={setIsDeleteServices}
          mySqlEndpoint={`${apiVersion}/controllers/developer/web-services/web-services.php?id=${itemEdit.web_services_aid}`}
          queryKey="web-services"
        />
      )}
    </>
  );
};

export default Services;
