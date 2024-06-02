"use client";

import Image from "next/image";
import styles from "./quick-menu.module.css";
import { CSSProperties } from "react";
import styled from "@emotion/styled";

interface Props {
  image: string;
  title: string;
  className?: string;
  style?: CSSProperties;
}

export function QuickMenu({ image, title, className, style }: Props) {
  return (
    <Container className={`${className}`} style={style}>
      <Image alt={`${title}`} className={styles.image} src={image} />
      <h3 className={styles.title}>{title}</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 6.25rem;
  height: 8.125rem;

  &:hover {
    & > img {
      opacity: 0.5;
    }
  }
`;
