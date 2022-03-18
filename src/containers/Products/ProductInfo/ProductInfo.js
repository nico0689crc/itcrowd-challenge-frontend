import PriceFormater from "../../../components/PriceFormater/PriceFormater";
import "./ProductInfo.css";

const ProductInfo = ({ product }) => {
  console.log(product.data);
  const { price, name, description, image_url, brand } = product.data;

  return (
    <div className="product-details__content">
      <div className="product-details__info">
        <div className="product-details__left-side">
          <img src={image_url} />
        </div>
        <div className="product-details__rigth-side">
          <h2 className="product__name">{name}</h2>
          <div className="product__brand">
            <img src={brand.logo_url} />
          </div>
          <p className="product__description">{description}</p>
          <div className="product__prices">
            <span className="product__price">
              <PriceFormater price={price} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
