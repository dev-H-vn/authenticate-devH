import { useEffect } from "react";
const Toast = ({ msg, handleShow, bgColor }) => {
  useEffect(() => {
    setTimeout(() => {
      handleShow();
    }, 3000);
  });
  return (
    <div
      className={`toast show position-fixed text-light ${bgColor}`}
      style={{ top: "5px", right: "5px", zIndex: 9, maxWidth: "250px" }}
    >
      <div
        className={`toast-header ${bgColor} text-light d-flex justify-content-between`}
      >
        <strong className="mr-auto text-light">{msg.title}</strong>

        <button
          type="button"
          className="ml-2 mb-1 close text-black"
          data-dismiss="toast"
          style={{ outline: "none" }}
          onClick={handleShow}
        >
          &times;
        </button>
      </div>

      <div className="toast-body">
        {msg.msg.map((notify, index) => (
          <p key={index}>
            <span>{index + 1}</span> : {notify}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Toast;
