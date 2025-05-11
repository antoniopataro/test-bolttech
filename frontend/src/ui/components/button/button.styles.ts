import styled from "styled-components";

export const components = {
  root: styled.button`
    background-color: ${({ theme }) => theme.colors.primary.default};
    border-radius: 8px;
    border: none;
    color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
    display: flex;
    flex-shrink: 0;
    font-size: 0.8125rem;
    font-weight: 500;
    gap: 8px;
    justify-content: center;
    outline-color: ${({ theme }) => theme.colors.primary.hover};
    padding: 12px 16px;
    transition: background-color 0.1s ease-in-out;
    &:disabled {
      cursor: default;
      opacity: 0.75;
    }
    &:hover {
      background-color: ${({ theme }) => theme.colors.primary.hover};
    }
  `,
};
