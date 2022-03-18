import { useContext } from "react";
import { ModalContext, VIEWS } from "../../context/Modal";
import Login from "../Login/Login";
import ProductDetails from "../Products/ProductDetails/ProductDetails";

import Modal from "./Modal";

const ModalContainer = () => {
  const { state, closeModal } = useContext(ModalContext);

  return (
    <>
      {state.view ? (
        <Modal
          onClose={closeModal}
          open={state.isOpen}
          className={state.view.className}
        >
          {state.view.name === VIEWS.PRODUCT_DETAILS.name && (
            <ProductDetails product={state.data} />
          )}
          {state.view.name === VIEWS.AUTH_LOGIN.name && <Login />}
        </Modal>
      ) : null}
    </>
  );
};

export default ModalContainer;
