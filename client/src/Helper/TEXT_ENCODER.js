const TEXTENCODER = (text) => {
  let lineBreak = /\n/g;

  let formattedString = "";
  for (var i = 0; i < text.length; i++) {
    if (text.charAt(i).match(lineBreak)) {
      formattedString = formattedString + text.charAt(i) + "<br>";
    } else {
      formattedString = formattedString + text.charAt(i);
    }
  }
  return formattedString;
};

export default TEXTENCODER;
