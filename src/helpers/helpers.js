export function validatePhone(rule, value, callback) {
  var phone_regex = /^\(?([0-9]{2})\)?[-]?([0-9]{4})[-]?([0-9]{4})$/;
  if (value.match(phone_regex) === null) {
    callback(new Error("Phone number should be 0#-####-####"));
  } else {
    callback();
  }
}

export function validatePass(rule, value, callback) {
  if (value === "") {
    callback(new Error("Please input the password"));
  } else {
    // 20 score
    if (/[a-z]/.test(value) === false) {
      callback(new Error("Please input lowercase character"));
    } else if (/[A-Z]/.test(value) === false) {
      // 20 score
      callback(new Error("Please input uppercase character"));
    } else if (/[0-9]/.test(value) === false) {
      // 20 score
      callback(new Error("Please input digit"));
    } else if (
      /* eslint-disable no-useless-escape */
      /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(value) === false
    ) {
      // 20 score
      callback(new Error("Please input symbol character"));
    } else {
      callback();
    }
  }
}

import Swal from "sweetalert2/dist/sweetalert2.min.js";
import { ElMessage } from "element-plus";

export function displayServerError(response, action) {
  let html = "";
  if (!response.data) {
    html =
      "<h1>ERROR </h1><textarea style='height: 160px; width: 100%; padding: 10px; color: grey; font-size: small;' readonly>" +
      response +
      "</textarea>";
  } else {
    html =
      "<h1>ERROR " +
      response.status +
      "</h1><textarea style='height: 160px; width: 100%; padding: 10px; color: grey; font-size: small;' readonly>" +
      response.data.message +
      "</textarea>";
  }
  Swal.fire({
    html: html,
    icon: "error",
    buttonsStyling: false,
    confirmButtonText: "Try again later",
    customClass: {
      confirmButton: "btn btn-warning",
    },
  });
}

export function displaySuccessToast(message) {
  ElMessage.success(message);
}

export function displaySuccessModal(text) {
  Swal.fire({
    text: text,
    icon: "success",
    buttonsStyling: false,
    confirmButtonText: "Ok, got it!",
    customClass: {
      confirmButton: "btn btn-primary",
    },
  });
}
