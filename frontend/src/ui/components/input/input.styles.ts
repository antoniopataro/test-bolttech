import styled from "styled-components";

export const components = {
  input: styled.input`
    background-color: transparent;
    border: none;
    outline: none;
    padding: 12px 16px;
    text-overflow: ellipsis;
    width: 100%;
    &::placeholder {
      font-weight: 300;
    }
  `,
  root: styled.div`
    align-items: center;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.25);
    display: flex;
    overflow: hidden;
    padding-right: 16px;
    width: 100%;
  `,
};
