/* eslint-disable @next/next/link-passhref */
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "cookie-cutter";
import { notify, deleteUser } from "../redux/reducer/auth";

const Nav = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);

  const active = (pathName) => {
    if (pathName === router.pathname) {
      return "active";
    } else {
      return "";
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("firstLogin");
    Cookies.set("refreshToken", "", {
      path: "api/auth/accessToken",
      expires: new Date(0),
    });
    dispatch(notify({ success: ["Logout Success!"] }));
    dispatch(deleteUser());
    router.push("/login");
  };
  1;
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link href="/">
          <a className="navbar-brand">Dev-H/Ecommerce</a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link href="/cart">
                <a
                  className={`nav-link ${active("/cart")}`}
                  aria-current="page"
                >
                  <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                  Cart
                </a>
              </Link>
            </li>

            {auth.token ? (
              <li className="nav-item dropdown">
                <div
                  className="nav-link dropdown-toggle"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    className="avatar-medium"
                    src={auth.user.avatar}
                    alt={auth.user.avatar}
                  />
                  {auth.user.name}
                </div>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li className="d-flex justify-content-center align-items-center">
                    <a className="dropdown-item" style={{ cursor: "pointer" }}>
                      <i className="fas fa-user" aria-hidden="true"></i>Profile
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      style={{ cursor: "pointer" }}
                      onClick={handleLogout}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            ) : (
              <li>
                <Link href="/login">
                  <a
                    className={`nav-link ${active("/login")}}`}
                    aria-current="page"
                  >
                    <i className="fas fa-user" aria-hidden="true"></i>
                    SignIn
                  </a>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
