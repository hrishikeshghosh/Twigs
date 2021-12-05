
const TEXTDECODER = (encodedString) => {
    let TagCatcher = [];
    TagCatcher = encodedString.split("<br>");
    return  TagCatcher.map((eachLine)=>{return <p>{eachLine==='\n'?<br/>:eachLine}</p>})
  };

  export default TEXTDECODER
  