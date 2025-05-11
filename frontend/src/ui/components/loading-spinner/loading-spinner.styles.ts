import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const components = {
  root: styled.div`
    animation: ${spin} 1s linear infinite;
    border: 2px solid ${({ theme }) => theme.colors.primary[8]};
    border-radius: 50%;
    border-top-color: ${({ theme }) => theme.colors.primary.default};
    height: 16px;
    width: 16px;
  `,
};
