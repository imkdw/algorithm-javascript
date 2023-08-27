import styled from "styled-components";
import ArticleList from "../../components/articles/ArticleList";

const StyledArticle = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
`;

const Articles = () => {
  return (
    <StyledArticle>
      <ArticleList />
    </StyledArticle>
  );
};

export default Articles;
