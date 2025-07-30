import React from "react";
import ModalWrapper from "../../../../partials/modal/ModalWrapper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryData } from "../../../../custom-hooks/queryData";
import { apiVersion } from "../../../../helpers/function-general";
import { FaTimes } from "react-icons/fa";
import { InputText, InputTextArea } from "../../../../helpers/FormInputs";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const ModalEditContact = ({ setIsModal, itemEdit }) => {
  const [animate, setAnimate] = React.useState("translate-x-full");
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

      if (!data.success) {
        window.prompt(data.error);
      } else {
        window.prompt(`Successfully edited.`);
        setIsModal(false);
      }
    },
  });

  const initVal = {
    contact_fullname: itemEdit ? itemEdit.contact_fullname : "",
    contact_email: itemEdit ? itemEdit.contact_email : "",
    contact_message: itemEdit ? itemEdit.contact_message : "",

    // validating when edit/update in modal edit contact
    contact_email_old: itemEdit ? itemEdit.contact_email : "",
  };

  const yupSchema = Yup.object({
    contact_fullname: Yup.string().required("required"),
    contact_email: Yup.string()
      .email("Must put a valid email")
      .required("required"),
    contact_message: Yup.string().required("required"),
  });

  const handleClose = () => {
    if (mutation.isPending) return; // dont close while query is ongoing
    setAnimate("translate-x-full"); // animate close of modal
    setTimeout(() => {
      setIsModal(false); // close upon animation exit
    }, 200);
  };

  React.useEffect(() => {
    setAnimate("");
  }, []);
  return (
    <>
      <ModalWrapper className={`${animate}`} handleClose={handleClose}>
        <div className="modal_header relative mb-4">
          <h3 className="text-sm">Edit Contact</h3>
          <button
            type="button"
            className="absolute top-0.5 right-0"
            onClick={handleClose}
          >
            <FaTimes className="size-4" />
          </button>
        </div>
        <div className="modal_body overflow-y-auto overflow-x-hidden max-h-[calc(100dvh-40px)]">
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
                  <div className="modal-overflow">
                    <div className="relative mt-3 mb-6">
                      <InputText
                        label="Full Name"
                        name="contact_fullname"
                        type="text"
                        disabled={mutation.isPending}
                      />
                    </div>
                    <div className="relative mt-3 mb-6">
                      <InputText
                        label="Email"
                        name="contact_email"
                        type="email"
                        disabled={mutation.isPending}
                      />
                    </div>
                    <div className="relative mt-3 mb-6">
                      <InputTextArea
                        label="Message"
                        rows="5"
                        name="contact_message"
                        type="text"
                        disabled={mutation.isPending}
                      />
                    </div>
                  </div>
                  <div className="modal__action flex justify-end absolute w-full bottom-0 mt-6 mb-4 gap-2 left-0 px-6">
                    <button
                      type="submit"
                      disabled={mutation.isPending}
                      className="btn-modal-submit"
                    >
                      {mutation.isPending
                        ? "Loading..."
                        : itemEdit
                        ? "Save"
                        : ""}
                    </button>
                    <button
                      type="reset"
                      disabled={mutation.isPending}
                      className="btn-modal-cancel"
                      onClick={handleClose}
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </ModalWrapper>
    </>
  );
};

export default ModalEditContact;
