import { useMutation } from "react-query";
import { useHttpClient } from "../lib/http/HttpClient";
import { CreateArticleFormInputs } from "../pages/realworld/article/create";

interface CreateArticleRequestPayload {
  article: {
    title: string;
    description: string;
    body: string;
    tagList?: string[];
  };
}

function mapToHttp(formInputs: CreateArticleFormInputs) {
  return { article: formInputs } as CreateArticleRequestPayload;
}

export function useCreateArticle() {
  const httpClient = useHttpClient();
  return useMutation((payload: CreateArticleFormInputs) => {
    const mapped: CreateArticleRequestPayload = mapToHttp(payload);
    return httpClient.post("/api/articles", mapped);
  });
}
