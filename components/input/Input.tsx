import React from "react";
import styled from "styled-components";

export const Input = styled.input`
  background: white;

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid ${(props) => props.theme.primary};
  border-radius: 3px;
`;
