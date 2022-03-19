import { useContext, useEffect } from "react";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Header from "../../containers/Header/Header";
import ProductList from "../../containers/Products/ProductList/ProductList";
import "./Admin.css";
import { ModalContext, VIEWS } from "../../context/Modal";

const Admin = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const { openModal } = useContext(ModalContext);
  const navigate = useNavigate();

  const onOpenModalHandler = () => {
    openModal(VIEWS.PRODUCT_ADD);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <div className="admin-container">
      <Header />
      {isLoggedIn && (
        <div className="add-product">
          <button onClick={onOpenModalHandler} className="">
            <MdOutlineAddCircleOutline />
            Agregar producto
          </button>
        </div>
      )}
      {isLoggedIn && <ProductList isAdminView />}
    </div>
  );
};

export default Admin;
