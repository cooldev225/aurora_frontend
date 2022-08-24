export function validatePhone(rule, value, callback) {
  var phone_regex = /^\(?([0-9]{2})\)?[-]?([0-9]{4})[-]?([0-9]{4})$/;
  if (value.match(phone_regex) === null) {
    callback(new Error("Phone number should be 0#-####-####"));
  } else {
    callback();
  }
}
