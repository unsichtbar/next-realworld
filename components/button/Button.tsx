import React from "react";

import styled from "styled-components";

export const Button = styled.button`
  color: ${(props) => props.theme.secondary};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid ${(props) => props.theme.primary};
  border-radius: 3px;
  &:hover {
    cursor: pointer;
  }
`;
