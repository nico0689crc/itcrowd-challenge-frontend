import { useContext } from "react";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import PriceFormater from "../../../components/PriceFormater/PriceFormater";
import { ModalContext, VIEWS } from "../../../context/Modal";

import "./ProductItem.css";

const ProductItem = ({ product, isAdminView }) => {
  const { image_url, price, name } = product;
  const { openModal } = useContext(ModalContext);

  const openModalHandler = () => {
    openModal(VIEWS.PRODUCT_DETAILS, product);
  };

  const onDeleteHandler = () => {
    openModal(VIEWS.PRODUCT_DELETE, product);
  };

  const onUpdateHandler = () => {
    openModal(VIEWS.PRODUCT_EDIT, product);
  };

  return (
    <article className="product-list__item">
      <div onClick={openModalHandler} className="product-item__image">
        <img src={image_url}></img>
      </div>
      <header onClick={openModalHandler} className="product-item__info">
        <div className="product-item__prices">
          <span className="product-item__price">
            <PriceFormater price={price} />
          </span>
        </div>
        <h3 className="product-item__name">{name}</h3>
      </header>
      {isAdminView && (
        <div className="product-item__actions">
          <button onClick={onUpdateHandler} className="button__edit">
            <FiEdit />
            Editar
          </button>
          <button onClick={onDeleteHandler} className="button__delete">
            <BsTrash />
            Eliminar
          </button>
        </div>
      )}
    </article>
  );
};

export default ProductItem;
