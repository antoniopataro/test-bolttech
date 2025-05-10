import styled from "styled-components";

export const components = {
  center: {
    description: {
      brand: styled.span`
        color: ${({ theme }) => theme.colors.primary.default};
        font-size: 0.8125rem;
        text-transform: capitalize;
        width: fit-content;
      `,
      model: styled.span`
        color: ${({ theme }) => theme.colors.text.default};
        font-size: 1.25rem;
        font-weight: 700;
        text-transform: capitalize;
        width: fit-content;
      `,
      root: styled.div`
        display: flex;
        flex-direction: column;
      `,
    },
    root: styled.div`
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 100%;
    `,
    stock: styled.span`
      color: ${({ theme }) => theme.colors.text[8]};
      font-size: 0.6875rem;
      width: fit-content;
    `,
  },
  left: {
    image: styled.img`
      height: 100%;
      object-fit: cover;
      width: 100%;
    `,
    root: styled.div`
      align-items: center;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      height: 128px;
      justify-content: center;
      width: 128px;
      @media screen and (max-width: calc(${({ theme }) =>
          theme.breakpoints.xs} + 64px)) {
        display: none;
      }
    `,
  },
  right: {
    pricing: {
      daily: styled.span`
        color: ${({ theme }) => theme.colors.text.default};
        font-size: 1.25rem;
        font-weight: 700;
      `,
      root: styled.div`
        align-items: flex-end;
        display: flex;
        flex-direction: column;
        gap: 4px;
      `,
      total: styled.span`
        color: ${({ theme }) => theme.colors.text[8]};
        font-size: 0.6875rem;
      `,
    },
    root: styled.div`
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
    `,
  },
  root: styled.div`
    align-items: center;
    background-color: #fff;
    border-radius: 16px;
    border: 1px solid;
    border-color: rgba(0, 0, 0, 0.15);
    display: flex;
    gap: 24px;
    padding: 0 24px 0 2px;
    transition: border-color 0.1s ease-in-out;
    width: 100%;
    @media screen and (max-width: calc(${({ theme }) =>
        theme.breakpoints.xs} + 64px)) {
      padding: 24px;
    }
  `,
};
