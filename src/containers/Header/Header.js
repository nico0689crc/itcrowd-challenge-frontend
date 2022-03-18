import Logo from "../../components/Logo/Logo";
import Navbar from "../../components/Navbar/Navbar";
import "./Header.css";

const Header = () => {
  return (
    <header className="header__container">
      <Logo />
      <Navbar />
    </header>
  );
};

export default Header;
