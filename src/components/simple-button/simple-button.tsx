import styled from "@emotion/styled";
import React, { CSSProperties, MouseEventHandler } from "react";

interface Props {
  isActive: boolean;
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  style?: CSSProperties;
}

export function SimpleButton({ onClick, isActive, text, style }: Props) {
  return (
    <Container style={style} onClick={onClick} isActive={isActive}>
      {text}
    </Container>
  );
}

const Container = styled.button<{ isActive: boolean }>`
  cursor: ${(props) => (props.isActive ? `pointer` : `default`)};

  text-align: center;

  color: ${(props) => (props.isActive ? `white` : "#0066ff")};
  background-color: ${(props) => (props.isActive ? `#0066ff` : `white`)};
  border: 2px solid #0066ff;

  min-width: 100px;
  padding: 0.5rem 3.75rem;

  border-radius: 4px;
`;
