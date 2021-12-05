const checkPassword = (password) => {
  var lowerCase = /[a-z]/g;
  var upperCase = /[A-Z]/g;
  var numbers = /\d/g;
  if (password.length >= 8) {
    if (password.match(lowerCase)) {
      if (password.match(upperCase)) {
        if (password.match(numbers)) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export default checkPassword;
