import React from "react";
import styled from "styled-components";

interface TextAreaProps {
  size: "sm";
}
export const TextArea = styled.textarea<TextAreaProps>`
  background: white;
  width: ${(props) => (props.size === "sm" ? "25%" : "")};
  height: ${(props) => (props.size === "sm" ? "5em" : "")};
  overflow: visible;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid ${(props) => props.theme.primary};
  border-radius: 3px;
`;
