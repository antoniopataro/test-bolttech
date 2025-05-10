import { Link } from "react-router-dom";
import styled from "styled-components";

import { Input } from "@/ui/components/input/input";

export const components = {
  container: styled.div`
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    justify-content: center;
    max-width: 384px;
    padding: 24px;
    width: 100%;
  `,
  fields: {
    input: {
      error: styled.p`
        color: #ff0000;
        font-size: 0.6875rem;
        font-weight: 500;
      `,
      input: styled(Input)``,
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
    link: styled(Link)`
      color: ${({ theme }) => theme.colors.primary.default};
      font-size: 0.8125rem;
      text-decoration: underline;
    `,
    root: styled.div`
      display: flex;
      flex-direction: column;
      gap: 2px;
    `,
    subtitle: styled.h2`
      color: ${({ theme }) => theme.colors.text[8]};
      font-size: 0.8125rem;
      font-weight: 400;
    `,
    title: styled.h1`
      color: ${({ theme }) => theme.colors.text.default};
      font-size: 0.9375rem;
      font-weight: 600;
    `,
  },
  root: styled.form`
    align-items: center;
    background-color: #f0f0f0;
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
    padding: 16px;
    width: 100vw;
  `,
};
