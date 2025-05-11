import { Link } from "react-router-dom";
import styled from "styled-components";

export const components = {
  empty: {
    link: styled(Link)`
      color: ${({ theme }) => theme.colors.primary.default};
      font-size: 0.8125rem;

      text-decoration: underline;
    `,
    paragraph: styled.p`
      margin: auto;
    `,
    text: styled.span`
      color: ${({ theme }) => theme.colors.text.default};
      font-size: 0.8125rem;
    `,
  },
  loading: styled.div`
    margin: auto;
  `,
  root: styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
    width: 100%;
    @media screen and (max-width: calc(${({ theme }) =>
        theme.breakpoints.md} + 64px)) {
      justify-content: flex-start;
    }
  `,
};
