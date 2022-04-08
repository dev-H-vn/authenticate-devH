const valid = (name, email, password, cf_password) => {
  const errMsg = [];
  if (!name || !email || !password) errMsg.push("Please add all fields.");

  if (!validateEmail(email)) errMsg.push("Invalid emails.");

  if (password.length < 6)
    errMsg.push("Password must be at least 6 characters.");

  if (password !== cf_password) errMsg.push("Confirm password did not match.");
  return errMsg;
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export default valid;
