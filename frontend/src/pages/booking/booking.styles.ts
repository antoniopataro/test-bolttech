import { Link } from "react-router-dom";
import styled from "styled-components";

export const components = {
  back: styled(Link)`
    color: ${({ theme }) => theme.colors.primary.default};
    font-size: 0.8125rem;
    width: fit-content;
  `,
  info: styled.span`
    color: ${({ theme }) => theme.colors.text.default};
    font-size: 0.8125rem;
  `,
  root: styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin: 0 auto;
    max-width: ${({ theme }) => theme.breakpoints.md};
    padding: 16px;
    width: 100%;
  `,
};
