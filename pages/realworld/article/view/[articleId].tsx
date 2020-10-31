
import { useRouter } from 'next/router'
import { useArticle, useArticleComments } from "../../../../api/article-api";
import { ArticleModel } from "../../../../models/ArticleModel";
import { CommentModel } from "../../../../models/CommentModel";
import styled from "styled-components";
import { Box } from "../../../../components/box/box";
import { Container } from "../../../../components/container/Container";

export const Article: React.FC<{}> = () => {
  const { articleId: id }: { articleId: string } = useRouter().query as any
  const article = useArticle(id);
  const comments = useArticleComments(id);

  return (
    <section>
      <div>
        {article.isFetching && <span>Loading</span>}
        {article.isFetched && !article.error && (
          <ArticleDisplay article={article.data} />
        )}
      </div>
      <Container>
        <Container>
          {comments.data?.map((comment) => (
            <CommentDisplay comment={comment} key={comment.id} />
          ))}
        </Container>
      </Container>
    </section>
  );
};

export const ArticleDisplay: React.FC<{ article?: ArticleModel }> = (props) => {
  if (props.article) {
    const { author } = props.article;
    console.log(props.article.title);
    return (
      <Box>
        <Box
          style={{
            backgroundColor: "#333",
            color: "#FFF",
            paddingBottom: "2em",
          }}
        >
          <Container>
            <h1 style={{ padding: "1em" }}>{props.article.title}</h1>
            <span>
              <Avatar
                src={author.image ? author.image : ""}
                alt={"Author profile image"}
              />
            </span>
            <span>{author.username}</span>
            <span>{props.article.createdAt.toISOString()}</span>
          </Container>
        </Box>
        <Container style={{ marginTop: "2em" }}>
          {props.article.body}
          <hr />
        </Container>
      </Box>
    );
  } else return null;
};

const CommentDisplay: React.FC<{ comment: CommentModel }> = (props) => {
  return (
    <div>
      <span>{props.comment.body}</span>{" "}
      <span>{props.comment.createdAt.toISOString()}</span>
    </div>
  );
};

export const Avatar = styled.img`
  height: 2em;
  width: 2em;
  border-radius: 25%;
`;


export default Article