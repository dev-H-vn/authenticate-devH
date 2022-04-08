import Loading from "./loading";
import Toast from "./toast";
import { useSelector, useDispatch } from "react-redux";
import { notify } from "../redux/reducer/auth";

const Notify = () => {
  const { auth } = useSelector((stare) => stare);
  const dispatch = useDispatch();

  return (
    <>
      {auth.notify.loading && <Loading />}
      {auth.notify.error && (
        <Toast
          msg={{ msg: auth.notify.error, title: "Error" }}
          handleShow={() => dispatch(notify(""))}
          bgColor="bg-danger"
        />
      )}

      {auth.notify.success && (
        <Toast
          msg={{ msg: auth.notify.success, title: "Success" }}
          handleShow={() => dispatch(notify(""))}
          bgColor="bg-success"
        />
      )}
    </>
  );
};

export default Notify;
