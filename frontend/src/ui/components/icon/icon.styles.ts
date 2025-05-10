import styled from "styled-components";

export const components = {
  root: styled.span.withConfig({
    shouldForwardProp: (prop) => !["size"].includes(prop),
  })<{ size?: number }>`
    align-items: center;
    aspect-ratio: 1;
    display: flex;
    flex-shrink: 0;
    height: ${({ size }) => (size ? `${size}px` : "auto")};
    justify-content: center;
    pointer-events: auto;
    width: ${({ size }) => (size ? `${size}px` : "auto")};
  `,
};
