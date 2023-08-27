import styled from "styled-components";

const StyledArticleComment = styled.div`
  width: 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid;
  overflow: scroll;
`;

interface ArticleCommentProps {
  comment: any;
}

const ArticleComment = ({ comment }: ArticleCommentProps) => {
  return (
    <StyledArticleComment>
      {comment.map((comment: any) => {
        return (
          <div key={comment.id}>
            {comment.regId} : {comment.content}
          </div>
        );
      })}
    </StyledArticleComment>
  );
};

export default ArticleComment;
