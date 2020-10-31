import Link from "next/link";
import React from "react";
import { Button } from "./button/Button";
export const LoginRedirect: React.FC<any> = (props) => {
  return (
    <>
      <div>You must be logged in to do that!</div>
      <div>
        <Link href="/login">
          <Button>Click here to login</Button>
        </Link>
      </div>
    </>
  );
};
