import { Link } from "react-router-dom";
import styled from "styled-components";

export const components = {
  outlet: {
    box: styled.div`
      background-color: #f0f0f0;
      border: 1px solid rgba(0, 0, 0, 0.05);
      border-radius: 16px;
      display: flex;
      flex-grow: 1;
      width: 100%;
    `,
  },
  root: styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-height: 100dvh;
    padding: 16px;
    width: 100%;
  `,
  top: {
    link: styled(Link)`
      text-decoration: none;
    `,
    logout: styled.button`
      background-color: #f0f0f0;
      border: 1px solid rgba(0, 0, 0, 0.05);
      border-radius: 8px;
      cursor: pointer;
      padding: 6px;
    `,
    root: styled.header`
      align-items: center;
      display: flex;
      gap: 16px;
    `,
    title: styled.h1`
      color: ${({ theme }) => theme.colors.text.default};
      font-size: 1.5rem;
      font-weight: 700;
    `,
  },
};
