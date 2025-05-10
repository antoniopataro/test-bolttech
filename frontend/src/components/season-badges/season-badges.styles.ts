import styled from "styled-components";

export const components = {
  root: styled.div`
    align-items: center;
    display: flex;
    gap: 8px;
    max-width: ${({ theme }) => theme.breakpoints.md};
    width: 100%;
  `,
};
