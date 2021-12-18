import { useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../stores/modal/action";

const section = document.getElementById("modal-root");
const el = document.createElement("div");
export const Modal = () => {
  const dispatch = useDispatch();
  const msg = useSelector((state) => state.modalReducer.msg);
  useEffect(() => {
    section?.appendChild(el);
    if (msg?.key === "snapback") {
      setTimeout(function () {
        section?.removeChild(el);
        dispatch(closeModal());
      }, 2000);
    }
  }, [msg]);
  useEffect(() => {
    return () => {
      section?.removeChild(el);
    };
  }, []);
  const onClickClose = () => {
    dispatch(closeModal());
  };
  return ReactDOM.createPortal(
    msg && (
      <>
        {msg?.key === "snapback" ? (
          <div id="snackbar" className="show">
            <p>{msg.title}</p>
            <p>{msg.content}</p>
          </div>
        ) : (
          <>
            <div className="modal-overlay" />
            <div
              className="modal-wrapper"
              aria-modal
              aria-hidden
              tabIndex={-1}
              role="dialog"
            >
              <div className="modal-children">
                <div className="modal-header">
                  {msg?.key !== "component" && (
                    <button
                      type="button"
                      className="modal-close-button"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={() => onClickClose()}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  )}
                </div>
                {msg?.key === "confirm" ? (
                  <>
                    <p className="confirm-title text-center">{msg.title}</p>
                    <p className="confirm-content text-center">{msg.content}</p>
                    <div className="text-center btn-wrapper">
                      <button
                        className="btn btn-primary btn-submit"
                        onClick={msg.confirmFunc}
                      >
                        {msg.btn.yes}
                      </button>
                      {msg?.cancelFunc ? (
                        <button
                          className="btn btn-primary btn-cancel 1"
                          onClick={msg.cancelFunc}
                        >
                          {msg.btn.no}
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary btn-cancel"
                          onClick={() => onClickClose()}
                        >
                          {msg.btn.no}
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <p className="error-title text-center">{msg.title}</p>
                    <div className="error-content text-center">
                      {msg.content}
                    </div>
                  </>
                )}
              </div>
            </div>{" "}
          </>
        )}
      </>
    ),
    el
  );
};
