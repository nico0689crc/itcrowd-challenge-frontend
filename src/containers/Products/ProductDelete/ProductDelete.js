import { useContext } from "react";
import { ModalContext } from "../../../context/Modal";
import { useDeleteProductMutation } from "../../../hooks/queries/useDeleteProductMutation";
import Error from "../../../components/Error/Error";
import Loader from "../../../components/Loader/Loader";
import "./ProductDelete.css";

const ProductDelete = ({ product }) => {
  const { closeModal } = useContext(ModalContext);

  const {
    mutate: deleteProduct,
    isLoading,
    error,
    isSuccess,
  } = useDeleteProductMutation();

  const onCancelHandler = () => {
    closeModal();
  };

  const onDeleteHandler = () => {
    deleteProduct(product.id);
  };

  if (error) {
    return (
      <div className="product-delete__container">
        <Error message={error.message} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="product-delete__container">
        <Loader fill="#00a07f" width="100px" />
      </div>
    );
  }

  return (
    <div className="product-delete__container">
      {isSuccess ? (
        <h3>{product.name} eliminado correctamente</h3>
      ) : (
        <h3>Realmente desea eliminar el product {product.name}?</h3>
      )}

      <div className="product-delete__actions">
        {isSuccess || error ? (
          <button onClick={onCancelHandler} className="button__edit">
            Cerrar
          </button>
        ) : (
          <>
            <button onClick={onCancelHandler} className="button__edit">
              Cancelar
            </button>
            <button onClick={onDeleteHandler} className="button__delete">
              {isLoading ? "Eliminando" : "Eliminar"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDelete;
