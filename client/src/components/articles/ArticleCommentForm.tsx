import { FormEvent, useState } from "react";
import styled from "styled-components";
import { createComment } from "../../services/articles.service";

const StyledForm = styled.form`
  width: 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

interface ArticleCommentFormProps {
  articleId: number;
}

const ArticleCommentForm = ({ articleId }: ArticleCommentFormProps) => {
  const [comment, setComment] = useState("");

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await createComment(articleId, comment);
    } catch (err) {
      console.error(err);
      alert("댓글 작성 실패");
    }
  };

  const inputChangeHandler = (event: FormEvent<HTMLInputElement>) => {
    setComment(event.currentTarget.value);
  };

  return (
    <StyledForm onSubmit={submitHandler}>
      <input type="text" onChange={inputChangeHandler} />
      <button type="submit">입력</button>
    </StyledForm>
  );
};

export default ArticleCommentForm;
