import styled from "styled-components";

export const components = {
  label: styled.span`
    color: ${({ theme }) => theme.colors.text.default};
    font-size: 0.8125rem;
    font-weight: 400;
  `,
  root: styled.div`
    align-items: center;
    background-color: #fff;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    display: flex;
    gap: 8px;
    padding: 6px 12px;
  `,
};
