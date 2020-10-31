import React from "react";
import { Box } from "../../../../components/box/box";
import { TagModel } from "../../../../models/TagModel";
import { useCreateArticle } from "../../../../api/create-article-api";
import { useUser } from "../../../../lib/auth/Authentication";
import { LoginRedirect } from "../../../../components/LoginRedirect";
import { Input } from "../../../../components/input/Input";
import { Button } from "../../../../components/button/Button";
import { TextArea } from "../../../../components/textarea/TextArea";

export interface CreateArticleFormInputs {
  title: string;
  description: string;
  body: string;
  tagList: TagModel[];
}

const initialFormValues: CreateArticleFormInputs = {
  title: "",
  description: "",
  body: "",
  tagList: [],
};

export const CreateArticle: React.FC<{}> = () => {
  const { user } = useUser();
  const [formValues, setFormValues] = React.useState(initialFormValues);
  const [mutate] = useCreateArticle();

  if (!user) {
    return <LoginRedirect />;
  }

  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = mutate(formValues);
  }

  function changeForm(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    e.preventDefault();
    const { name, value } = e.currentTarget as {
      name: keyof Omit<CreateArticleFormInputs, "tagList">;
      value: string;
    };
    const cloned: CreateArticleFormInputs = JSON.parse(
      JSON.stringify(formValues)
    );
    cloned[name] = value;
    setFormValues(cloned);
  }
  return (
    <Box>
      <form onSubmit={submitForm}>
        <div>
          <Input
            type="text"
            name="title"
            placeholder="title"
            value={formValues.title}
            onChange={changeForm}
          />
        </div>
        <div>
          <Input
            type="text"
            name="description"
            placeholder="description"
            value={formValues.description}
            onChange={changeForm}
          />
        </div>
        <TextArea
          name="body"
          placeholder="body"
          value={formValues.body}
          onChange={changeForm}
          size="sm"
        />
        <div>
          <Button type="submit">Submit</Button>
        </div>{" "}
      </form>
    </Box>
  );
};
