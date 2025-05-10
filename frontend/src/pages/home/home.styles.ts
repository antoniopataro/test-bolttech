import styled from "styled-components";

export const components = {
  root: styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 16px;
    width: 100%;
    @media screen and (max-width: calc(${({ theme }) =>
        theme.breakpoints.md} + 64px)) {
      justify-content: flex-start;
    }
  `,
};
