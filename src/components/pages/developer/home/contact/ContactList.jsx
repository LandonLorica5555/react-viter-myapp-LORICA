import { Form, Formik } from "formik";
import React from "react";
import { InputText, InputTextArea } from "../../../../helpers/FormInputs";

const ContactList = ({
  isLoading,
  isFetching,
  error,
  dataContact,
  initVal,
  yupSchema,
  mutation,
  itemEdit,
  handleAdd,
  handleDelete,
  handleEdit,
}) => {
  return (
    <>
      <Formik
        initialValues={initVal}
        validationSchema={yupSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          console.log(values);
          mutation.mutate(values);
        }}
      >
        {(props) => {
          return (
            <Form>
              {/* Forms */}
              <div className="relative mb-6">
                <InputText
                  label="Full Name"
                  name="contact_fullname"
                  type="text"
                />
              </div>
              <div className="relative mb-6">
                <InputText label="Email" name="contact_email" type="email" />
              </div>
              <div className="relative mb-6">
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
                {itemEdit ? "Edit" : "Send"} Message
              </button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default ContactList;
