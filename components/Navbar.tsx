import React from "react";
import Link from 'next/link'
import styled from "styled-components";
import { useUser } from "../../../../lib/auth/Authentication";

export const Navbar: React.FC<{}> = (props) => {
  const { user } = useUser();
  return (
    <NavbarStyled>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1em",
        }}
      >
        <span>
          <Link href="/">Home</Link>
        </span>
        <span
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "10em",
          }}
        >
          <span>
            <Link href={user ? "/logout" : "/login"}>
              {user ? "Logout" : "Login"}
            </Link>
          </span>
          <span>{!user && <Link href="/register">Register</Link>}</span>
        </span>
      </div>
    </NavbarStyled>
  );
};

const NavbarStyled = styled.nav`
  background-color: ${(props) => props.theme.primary};
`;
