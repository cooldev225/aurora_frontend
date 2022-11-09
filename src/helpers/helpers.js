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
