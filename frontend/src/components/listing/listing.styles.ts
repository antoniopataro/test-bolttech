import { Link } from "react-router-dom";
import styled from "styled-components";

export const components = {
  empty: {
    link: styled(Link)`
      color: ${({ theme }) => theme.colors.primary.default};
      font-size: 0.8125rem;
      text-decoration: underline;
    `,
    paragraph: styled.p``,
    text: styled.span`
      color: ${({ theme }) => theme.colors.text.default};
      font-size: 0.8125rem;
    `,
  },
  item: styled.li`
    list-style: none;
    width: 100%;
  `,
  link: styled(Link)`
    border: 1px solid;
    border-color: transparent;
    border-radius: 16px;
    display: flex;
    text-decoration: none;
    transition: border-color 0.1s ease-in-out;
    &:hover {
      border-color: ${({ theme }) => theme.colors.primary.default};
    }
  `,
  root: styled.ul`
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-width: ${({ theme }) => theme.breakpoints.md};
    width: 100%;
  `,
};
