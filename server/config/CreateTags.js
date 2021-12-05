const CreateTags = (tags) => {
  tags = tags.toLowerCase() + " ";
  let tagArray = new Array();
  let newtag = "";
  let pointer = "";
  for (var i = 0; i < tags.length; i++) {
    pointer = tags.charAt(i);
    if (pointer === " ") {
      tagArray.push(newtag);
      newtag = "";
    } else {
      newtag = newtag + pointer;
    }
  }
  return tagArray;
};

export default CreateTags;
