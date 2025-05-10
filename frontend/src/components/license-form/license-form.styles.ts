import styled from "styled-components";

export const components = {
  form: {
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
    root: styled.form`
      display: flex;
      flex-direction: column;
      gap: 16px;
    `,
  },
  root: styled.div`
    background-color: #fff;
    border-radius: 16px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 24px;
  `,
  title: styled.span`
    color: ${({ theme }) => theme.colors.text.default};
    font-size: 0.9375rem;
    font-weight: 600;
  `,
};
