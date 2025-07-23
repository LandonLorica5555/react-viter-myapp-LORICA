import { Form, Formik } from "formik";
import React from "react";
import { FaTimes } from "react-icons/fa";
import { InputText } from "../../../../helpers/FormInputs";
import ModalWrapper from "../../../../partials/modal/ModalWrapper";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";

const ModalAddHeader = ({ setIsModal }) => {
  const [animate, setAnimate] = React.useState("translate-x-full");
  const mutation = useMutation;
  const handleClose = () => {
    if (mutation.isPending) return; // dont close while query is ongoing
    setAnimate("translate-x-full"); // animate close of modal
    setTimeout(() => {
      setIsModal(false); // close upon animation exit
    }, 200);
  };

  const initVal = {
    header_name: "",
    header_link: "",
  };

  const yupSchema = Yup.object({
    header_name: Yup.string().required("required"),
  });

  // UPON USING THIS MODAL AND ALL ELEMENT TAG ARE RENDERED, RUN THIS CODE
  React.useEffect(() => {
    setAnimate("");
  }, []); // [] is dependencies. if you have a value inside re-run the code inside

  return (
    <ModalWrapper className={`${animate}`} handleClose={handleClose}>
      <div className="modal_header relative mb-4">
        <h3 className="text-sm">Add Header</h3>
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
          }}
        ></Formik>
        {(props) => {
          return (
            <Form>
              <div className="modal-overflow">
                <div className="relative mt-3 mb-6">
                  <InputText
                    label="Name"
                    name="header_name"
                    type="text"
                    disabled={mutation.isPending}
                  />
                </div>
                <div className="relative mt-3 mb-6">
                  <InputText
                    label="Header Link"
                    name="header_link"
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
                  {mutation.isPending ? "Loading..." : "Add"}
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
      </div>
    </ModalWrapper>
  );
};

export default ModalAddHeader;
