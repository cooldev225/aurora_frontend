export function validatePhone(rule, value, callback) {
  const phone_regex = /^\(?([0-9]{2})\)?[-]?([0-9]{4})[-]?([0-9]{4})$/;
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
import * as shajs from "sha.js";
import * as qz from "qz-tray";
import IPatient from "@/store/interfaces/IPatient";
export function printPatientLabel(patient: IPatient, printerName: string) {
  qz.api.setSha256Type(function (data) {
    return shajs("sha256").update(data).digest("hex");
  });
  qz.api.setPromiseType(function (resolver) {
    return new Promise(resolver);
  });
  qz.websocket
    .connect()
    .then(function () {
      // Pass the printer name into the next Promise
      return qz.printers.find(printerName);
    })
    .then(function (printer) {
      // Create a default config for the found printer
      const config = qz.configs.create(printer);

      // Raw ZPL
      const data = [
        "^XA^MMT^PW312^LL0200^LS24" +
          "^FT40,27^A0N,20,19^FH^FD" +
          patient.last_name +
          "^FS" +
          "^FT40,49^A0N,20,19^FH^FD" +
          patient.first_name +
          "^FS" +
          "^FT40,71^A0N,20,19^FH^FD" +
          patient.address +
          "^FS" +
          "^FT40,92^A0N,20,19^FH^FD" +
          "suburb" +
          ", " +
          patient.postcode +
          ", " +
          "state" +
          "^FS" +
          "^FT40,116^A0N,20,19^FH^FDRef Doc: Dr man person^FS" +
          "^FT40,139^A0N,20,19^FH^FDreffering doc address^FS" +
          "^FT40,165^A0N,20,19^FH^FDM/C#: 5623 6546 8448 4663 - 3^FS" +
          "^FT40,191^A0N,20,19^FH^FD(H)- (M) - " +
          patient.contact_number +
          " ^FS" +
          "^FT217,47^A0N,20,24^FB85,1,0,R^FH^FDpatientid^FS" +
          "^FT148,26^A0N,14,19^FB156,1,0,R^FH^FDDOB: " +
          patient.date_of_birth +
          "^FS^PQ1,0,1,Y^XZ",
      ];

      return qz.print(config, data);
    })
    .catch(function (e) {
      console.error(e);
    });
}
