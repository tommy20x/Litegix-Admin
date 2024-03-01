import Swal from "sweetalert2/dist/sweetalert2.js";

export const showSuccessMsgbox = function (text) {
  return Swal.fire({
    text: text,
    icon: "success",
    buttonsStyling: false,
    heightAuto: true,
    confirmButtonText: "Ok, got it!",
    customClass: {
      confirmButton: "btn fw-bold btn-light-primary",
    },
  });
};

export const showConfirmMsgbox = function (text) {
  return Swal.fire({
    text: text,
    icon: "question",
    showConfirmButton: true,
    showCancelButton: true,
    heightAuto: true,
    buttonsStyling: false,
    customClass: {
      confirmButton: "btn btn-light-primary",
      cancelButton: "btn btn-light-secondary",
    },
  });
};

export const showErrorMsgbox = function (text) {
  return Swal.fire({
    text: text,
    icon: "error",
    buttonsStyling: false,
    heightAuto: true,
    confirmButtonText: "Try again!",
    customClass: {
      confirmButton: "btn fw-bold btn-light-danger",
    },
  });
};
