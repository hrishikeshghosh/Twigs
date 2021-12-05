import { useSelector } from "react-redux";

const FindPost = () => {
  const { blogs, arts } = useSelector((state) => state.posts);
  const posts = new Array();
  blogs.forEach((element) => {
    posts.push(element);
  });

  arts.forEach((el) => {
    posts.push(el);
  });

  return posts;
};

export default FindPost();
