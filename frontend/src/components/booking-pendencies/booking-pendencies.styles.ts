import styled from "styled-components";

export const components = {
  info: styled.span`
    color: ${({ theme }) => theme.colors.text.default};
    font-size: 0.8125rem;
  `,
  root: styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
  `,
};
