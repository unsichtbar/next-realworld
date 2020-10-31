import * as React from "react";
import { useQuery, useMutation, queryCache } from "react-query";

import { postLogin } from "../../../api/login-api";
import { UserModel } from "../../../models/UserModel";
import Link from "next/link";
import { Input } from "../../../components/input/Input";
import { Button } from "../../../components/button/Button";
interface FormValue {
  value: string;
  dirty: boolean;
  touched: boolean;
  errors?: string;
}

function createFormValue() {
  return {
    value: "",
    dirty: false,
    touched: false,
    errors: undefined,
  };
}

function newFormValue(value: string) {
  return {
    value,
    touched: true,
    dirty: true,
    errors: undefined,
  };
}

export const Login: React.FC<{}> = (props) => {
  const [username, setUsername] = React.useState<FormValue>(createFormValue());
  const [password, setPassword] = React.useState<FormValue>(createFormValue);
  const [submitted, setSubmitted] = React.useState<boolean>(false);

  const [login] = useMutation(postLogin, {
    onSuccess: (user: UserModel) => {
      console.log(user);
      alert("you were logged in");
    },
  });

  function onUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setUsername(newFormValue(e.target.value));
  }

  function onPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setPassword(newFormValue(e.target.value));
  }

  function submitForm(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setSubmitted(true);
    if (!username.value) {
      setUsername((username) => {
        return { ...username, errors: "Username is required" };
      });
    }
    if (!password.value) {
      setPassword((password) => {
        return { ...password, errors: "Password is required" };
      });
    }
    if (
      username.value &&
      password.value &&
      !username.errors &&
      !password.errors
    ) {
      login({ username: username.value, password: password.value });
    }
  }

  return (
    <div>
      <form>
        <span>
          <Input
            type="text"
            value={username.value}
            name="username"
            placeholder="Username"
            onChange={onUsernameChange}
          ></Input>
          {submitted && username.errors}
        </span>
        <span>
          <Input
            type="password"
            value={password.value}
            name="password"
            placeholder="Password"
            onChange={onPasswordChange}
          ></Input>
          {submitted && password.errors}
        </span>
        <Button type="submit" onClick={submitForm}>
          Login
        </Button>
      </form>
      <section>
        Not registered? Register <Link href="/register">Here</Link>
      </section>
    </div>
  );
};

export default Login