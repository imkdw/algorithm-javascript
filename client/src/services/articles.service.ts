import client from "./axios";

export async function getArticles() {
  const res = await client.get("/articles");
  return res;
}

export async function createComment(articleId: number, comment: string) {
  const res = await client.post(`/articles/${articleId}/comments`, { content: comment });
  return res;
}
