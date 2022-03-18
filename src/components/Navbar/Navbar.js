import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ModalContext, VIEWS as VIEWS_MODALS } from "../../context/Modal";
import "./Navbar.css";

const Navbar = () => {
  const { openModal } = useContext(ModalContext);
  const { attributes, isLoggedIn, logout } = useContext(AuthContext);

  const openLoginModalHandler = () => {
    openModal(VIEWS_MODALS.AUTH_LOGIN);
  };

  const logoutHandler = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <ul className="navbar__items">
        {isLoggedIn ? (
          <>
            <li className="navbar__item">
              <span className="navbar__span">
                Bienvenido {attributes.username}
              </span>
            </li>
            <li className="navbar__item">
              <Link className="navbar__link" to="/products">
                Administrar Productos
              </Link>
            </li>
            <li className="navbar__item">
              <button onClick={logoutHandler} className="navbar__link">
                Cerrar Sesión
              </button>
            </li>
          </>
        ) : (
          <li className="navbar__item">
            <button onClick={openLoginModalHandler} className="navbar__link">
              Admin
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
