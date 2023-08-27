import styled from "styled-components";
import { getArticles } from "../../services/articles.service";
import ArticleItem from "./ArticleItem";
import { useEffect, useState } from "react";

const StyledArticleList = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const apiCall = async () => {
      try {
        const res = await getArticles();
        console.log(res.data);
        setArticles(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    apiCall();
  }, []);

  return (
    <StyledArticleList>
      {articles.map((article: any) => {
        return <ArticleItem key={article.id} article={article} />;
      })}
    </StyledArticleList>
  );
};

export default ArticleList;
