"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function BasicModal({
  closeModal,
  modalIsOpen = false,
  children,
  backgroundColor = "#ffffff",
  closeButtonColor = "rgba(236, 236, 236, 1)",
  closeButtonBackgroundColor = "black",
  widthSm,
  heightSm,
  widthMd,
  widthLg,
  heightMd,
  heightLg,
  // maxWidth,
  maxHeightSm,
}) {
  //не трогать, уб`т!
  const defaultModalStyle = {
    width: widthSm,
    height: heightSm,
    maxHeight: maxHeightSm,
    backgroundColor,
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "12px",
    overflowY: "auto",
    padding: "8px",
  };

  const [modalRoot, setModalRoot] = useState(null);
  const [modalStyle, setModalStyle] = useState(defaultModalStyle);

  useEffect(() => {
    const currentModalRoot = document.querySelector("#modal-root");
    setModalRoot(currentModalRoot);

    const handleKeyDown = (e) => {
      if (e.code === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    if (modalIsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [closeModal, modalIsOpen]);

  useEffect(() => {
    const updateModalSize = () => {
      const windowWidth = window.innerWidth;
      let newWidth, newHeight, newMaxHeight;
      if (windowWidth < 768) {
        newWidth = widthSm;
        newHeight = heightSm;
        newMaxHeight = maxHeightSm;
      } else if (windowWidth >= 768 && windowWidth < 1440) {
        newWidth = widthMd;
        newHeight = heightMd;
      } else {
        newWidth = widthLg;
        newHeight = heightLg;
      }

      setModalStyle((prevStyle) => ({
        ...prevStyle,
        width: newWidth || prevStyle.width,
        height: newHeight || prevStyle.height,
        maxHeight: newMaxHeight || prevStyle.maxHeight,
      }));
    };

    window.addEventListener("resize", updateModalSize);
    updateModalSize();

    return () => {
      window.removeEventListener("resize", updateModalSize);
    };
  }, [widthSm, heightSm, widthMd, heightMd, widthLg, heightLg]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  if (!modalIsOpen || !modalRoot) return null;

  return createPortal(
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-40"
      onClick={handleBackdropClick}
    >
      <div className="" style={modalStyle}>
        <button
          onClick={closeModal}
          className="closeButton"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "none",
            border: "none",
            cursor: "pointer",
            backgroundColor: closeButtonBackgroundColor,
            borderRadius: "50%",
            width: "24px",
            height: "24px",
          }}
        >
          <svg
            className="absolute top-[5px] right-[5px]"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke={closeButtonColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
}
