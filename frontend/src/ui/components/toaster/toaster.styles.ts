import styled, { css } from "styled-components";

export const components = {
  container: styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== "type",
  })<{ type: string }>`
    align-items: center;
    background-color: #fff;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    color: ${({ theme }) => theme.colors.text.default};
    display: flex;
    font-size: 0.8125rem;
    font-weight: 500;
    gap: 8px;
    min-width: 256px;
    padding: 6px 12px;
    ${({ type }) => {
      switch (type) {
        case "error":
          return css`
            border-left: 4px solid #ff0000;
          `;
        case "success":
          return css`
            border-left: 4px solid #00ff00;
          `;
        default:
          return css`
            border-left: 4px solid gray;
          `;
      }
    }}
  `,
};
