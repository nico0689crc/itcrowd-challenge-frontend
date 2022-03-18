import { useContext } from "react";
import PriceFormater from "../../../components/PriceFormater/PriceFormater";
import { ModalContext, VIEWS } from "../../../context/Modal";
import "./ProductItem.css";

const ProductItem = ({ product }) => {
  const { image_url, price, name } = product;
  const { openModal } = useContext(ModalContext);

  const openModalHandler = () => {
    openModal(VIEWS.PRODUCT_DETAILS, product);
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
    </article>
  );
};

export default ProductItem;
