import { Form, Formik } from "formik";
import React from "react";
import { InputText, InputTextArea } from "../../../../helpers/FormInputs";
import * as Yup from "yup";
import { FaList, FaPlus, FaTable } from "react-icons/fa";
import { apiVersion } from "../../../../helpers/function-general";
import useQueryData from "../../../../custom-hooks/useQueryData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryData } from "../../../../custom-hooks/queryData";
import ContactTable from "./ContactTable";
import ContactList from "./ContactList";

const Contact = () => {
  const [isDeleteContact, setIsDeleteContact] = React.useState(false);
  const [itemEdit, setItemEdit] = React.useState();
  const [isTable, setIsTable] = React.useState(false);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `${apiVersion}/controllers/developer/contact/contact.php?id=${itemEdit.contact_aid}`
          : `${apiVersion}/controllers/developer/contact/contact.php`,
        itemEdit
          ? "put" // UPDATE
          : "post", // CREATE
        values
      ),
    onSuccess: (data) => {
      // validate reading
      queryClient.invalidateQueries({ queryKey: ["contact"] }); // give id for refetching data.

      if (data.success) {
        alert(itemEdit ? "Successfully edited." : "Successfully created.");
      } else {
        alert(data.error);
      }
    },
  });

  const {
    isLoading,
    isFetching,
    error,
    data: dataContact,
  } = useQueryData(
    `${apiVersion}/controllers/developer/contact/contact.php`,
    "get",
    "contact"
  );

  const initVal = {
    contact_fullname: itemEdit ? itemEdit.contact_fullname : "",
    contact_email: itemEdit ? itemEdit.contact_email : "",
    contact_message: itemEdit ? itemEdit.contact_message : "",
  };

  const yupSchema = Yup.object({
    contact_fullname: Yup.string().required("required"),
    contact_email: Yup.string()
      .email("Must put a valid email")
      .required("required"),
    contact_message: Yup.string().required("required"),
  });

  const handleToggleTable = () => {
    setIsTable(!isTable);
  };

  const handleAdd = () => {
    setItemEdit(null);
  };

  const handleEdit = (item) => {
    setItemEdit(item);
  };

  const handleDelete = (item) => {
    setItemEdit(item);
    setIsDeleteContact(true);
  };

  return (
    <>
      <section id="contact">
        <div className="container bg-white py-12 md:py-20">
          <h2 className="title text-center">Get In Touch</h2>
          <div className="flex flex-col gap-10 mt-12 md:flex-row">
            <div className="bg-gray-50 rounded-xl p-8 h-fit md:w-1/2">
              <h5>Our Office</h5>
              {/* address */}
              <ul className="flex gap-3 mt-6 mb-4">
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-map-pin-icon lucide-map-pin"
                  >
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </li>
                <li>
                  <h6 className="font-medium">Address</h6>
                  <p>123 Business Avenue</p>
                  <p>San Francisco, CA 94107</p>
                </li>
              </ul>
              {/* phone */}
              <ul className="flex gap-3 mb-4">
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-phone-icon lucide-phone"
                  >
                    <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
                  </svg>
                </li>
                <li>
                  <h6 className="font-medium">Phone</h6>
                  <p>+1 (555) 123-4567</p>
                </li>
              </ul>
              {/* email */}
              <ul className="flex gap-3 mb-8">
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-mail-icon lucide-mail"
                  >
                    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                  </svg>
                </li>
                <li>
                  <h6 className="font-medium">Email</h6>
                  <p>hello@myapp.com</p>
                </li>
              </ul>
              <h6 className="font-medium mb-4">Business Hours</h6>
              <ul className="flex justify-between items-center">
                <li>
                  <p>Monday - Friday</p>
                </li>
                <li>
                  <p>9:00 AM - 5:00 PM</p>
                </li>
              </ul>
              <ul className="flex justify-between items-center">
                <li>
                  <p>Saturday</p>
                </li>
                <li>
                  <p>10:00 AM - 2:00 PM</p>
                </li>
              </ul>
              <ul className="flex justify-between items-center">
                <li>
                  <p>Sunday</p>
                </li>
                <li>
                  <p>Closed</p>
                </li>
              </ul>
            </div>
            {/* Forms Section */}
            <div className="contacts bg-gray-50 rounded-xl p-8 h-fit md:w-1/2 relative">
              <div className="absolute top-0 right-0">
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
                  {/* <button
                    className="flex items-center gap-2 hover:underline hover:text-primary"
                    type="button"
                    onClick={handleAdd}
                  >
                    <FaPlus className="size-3" />
                    Add
                  </button> */}
                </div>
              </div>
              {/* Forms */}
              {isTable == true ? (
                <ContactTable
                  isLoading={isLoading}
                  isFetching={isFetching}
                  error={error}
                  dataContact={dataContact}
                  handleAdd={handleAdd}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              ) : (
                <ContactList
                  isLoading={isLoading}
                  isFetching={isFetching}
                  error={error}
                  dataContact={dataContact}
                  initVal={initVal}
                  yupSchema={yupSchema}
                  mutation={mutation}
                  itemEdit={itemEdit}
                  handleAdd={handleAdd}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              )}
            </div>

            {/* <form
              action=""
              className="contacts bg-gray-50 rounded-xl p-8 h-fit md:w-1/2"
            >
              <div className="relative mb-6">
                <label for="" className="">Full Name</label>
                <input type="text" />
              </div>
              <div className="relative mb-6">
                <label for="">Email Address</label>
                <input type="email" />
              </div>
              <div className="relative mb-6">
                <label for="">Message</label>
                <textarea name="" id="" rows="6" className="resize-none"></textarea>
              </div>
              <button className="btn btn--blue w-full">Send Message</button>
            </form> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
