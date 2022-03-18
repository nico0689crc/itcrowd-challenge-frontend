import { Link } from "react-router-dom";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="logo__container">
      <Link className="logo__link" to="/">
        <span className="logo__text">ITCrowd Challenge</span>
      </Link>
    </div>
  );
};

export default Logo;
