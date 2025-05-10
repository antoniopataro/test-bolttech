import styled from "styled-components";

export const components = {
  fields: {
    date: {
      error: styled.p`
        color: #ff0000;
        font-size: 0.6875rem;
        font-weight: 500;
      `,
      root: styled.div`
        display: flex;
        flex-direction: column;
        gap: 4px;
      `,
    },
    root: styled.div`
      display: flex;
      flex-direction: column;
      gap: 8px;
    `,
  },
  header: {
    root: styled.div`
      display: flex;
      flex-direction: column;
      gap: 4px;
    `,
    subtitle: styled.h3`
      color: ${({ theme }) => theme.colors.text[8]};
      font-size: 0.8125rem;
      font-weight: 300;
    `,
    title: styled.h2`
      color: ${({ theme }) => theme.colors.text.default};
      font-size: 0.9375rem;
      font-weight: 600;
    `,
  },
  root: styled.form`
    background-color: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    gap: 16px;
    border-radius: 16px;
    padding: 24px;
    max-width: ${({ theme }) => theme.breakpoints.md};
    width: 100%;
  `,
};
