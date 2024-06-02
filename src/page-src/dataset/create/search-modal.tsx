import styled from "@emotion/styled";
import Image from "next/image";
import { MouseEventHandler, ReactNode } from "react";
import { ScreenClose } from "../../../../public/svgs";

interface Props {
  title: string;
  onClose: MouseEventHandler<HTMLImageElement>;
  children?: ReactNode;
}

export function SearchModal({ title, onClose, children }: Props) {
  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        <Image
          alt="닫기"
          src={ScreenClose}
          onClick={onClose}
          style={{ cursor: "pointer" }}
        />
      </Header>
      <Contents>{children}</Contents>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  z-index: 999;
  width: 31.25rem;
  max-width: 500px;
  margin: 10% auto;
  background-color: #fff;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  overflow-y: scroll;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.125rem 2.25rem;
  border-bottom: 1px solid #dcdcdc;
`;

const Title = styled.h1`
  /* font-size: 0.875rem; */
`;

const Contents = styled.div`
  padding: 2rem;
`;
