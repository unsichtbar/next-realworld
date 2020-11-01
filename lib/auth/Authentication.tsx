import React from "react";
import { UserModel } from "../../models/UserModel";

function initialUser(): UserModel | null {
  const stored = "";//localStorage.getItem("user");
  if (!stored) {
    return null;
  }
  const parsed = JSON.parse(stored);
  return parsed;
}

//const initialUser: UserModel | null = JSON.parse(localStorage.getItem('user') || null) || null;

const initialValue: {
  user: UserModel | null;
  setUser: (user: UserModel | null) => {};
} = {
  user: initialUser(),
  setUser: (user: any) => {},
} as any;
const AuthContext = React.createContext(initialValue);

export const AuthenticationProvider: React.FC<{}> = (props) => {
  const [user, setUser] = React.useState(initialUser());

  function setUserWithLocalStorage(user: UserModel | null) {
    setUser(user as any);
    // if (!user) {
    //   localStorage.setItem("user", "");
    // } else localStorage.setItem("user", JSON.stringify(user));
  }
  return (
    <>
      <AuthContext.Provider
        value={{ user, setUser: setUserWithLocalStorage as any }}
      >
        {props.children}
      </AuthContext.Provider>
    </>
  );
};

export const useUser = () => {
  const user = React.useContext(AuthContext);
  return user;
};
//export const AuthenticationContext = AuthContext;
