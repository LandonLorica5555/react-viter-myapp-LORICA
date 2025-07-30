import { Form, Formik } from "formik";
import React from "react";
import { InputText, InputTextArea } from "../../../../helpers/FormInputs";
import * as Yup from "yup";

const ContactList = ({
  isLoading,
  isFetching,
  error,
  dataContact,
  mutation,
  itemEdit,
  handleAdd,
  handleDelete,
  handleEdit,
}) => {
  const initVal = {
    contact_fullname: "",
    contact_email: "",
    contact_message: "",
  };

  const yupSchema = Yup.object({
    contact_fullname: Yup.string().required("required"),
    contact_email: Yup.string()
      .email("Must put a valid email")
      .required("required"),
    contact_message: Yup.string().required("required"),
  });

  return (
    <>
      <Formik
        initialValues={initVal}
        validationSchema={yupSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          console.log(values);
          mutation.mutate(values);
          resetForm();
        }}
      >
        {(props) => {
          return (
            <Form>
              {/* Forms */}
              <div className="relative mb-6 border border-black/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-2 focus:outline-blue-500">
                <InputText
                  label="Full Name"
                  name="contact_fullname"
                  type="text"
                />
              </div>
              <div className="relative mb-6 border border-black/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-2 focus:outline-blue-500">
                <InputText label="Email" name="contact_email" type="email" />
              </div>
              <div className="relative mb-6 border border-black/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-2 focus:outline-blue-500">
                <InputTextArea
                  className="resize-none"
                  rows="5"
                  label="Message"
                  name="contact_message"
                  type="email"
                />
              </div>
              <button
                type="submit"
                disabled={mutation.isPending}
                className="btn btn--blue w-full"
              >
                Send Message
              </button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default ContactList;
