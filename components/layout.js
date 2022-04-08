import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "./nav";
import Notify from "./notify";
import { getUser } from "../redux/reducer/auth";

function Layout({ children }) {
  const dispatch = useDispatch();

  const { auth } = useSelector((state) => state);

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      dispatch(getUser());
    }
  }, [dispatch]);
  return (
    <div className="container">
      <Nav />
      <Notify />
      {children}
    </div>
  );
}

export default Layout;
