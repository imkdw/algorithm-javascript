import styled from "styled-components";
import ArticleCommentForm from "./ArticleCommentForm";
import ArticleComment from "./ArticleComment";

const StyledArticleItem = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  border: 1px solid;
`;

const ArticleProperty = styled.div`
  width: 100px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface ArticleItemProps {
  article: any;
}

const ArticleItem = ({ article }: ArticleItemProps) => {
  return (
    <StyledArticleItem>
      <ArticleProperty>{article.id}</ArticleProperty>
      <ArticleProperty>{article.title}</ArticleProperty>
      <ArticleProperty>{article.content}</ArticleProperty>
      <ArticleComment comment={article.articleComment} />
      <ArticleCommentForm articleId={article.id} />
    </StyledArticleItem>
  );
};

export default ArticleItem;
