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
    .react-datepicker-wrapper {
      width: 100%;
    }
    .react-datepicker {
      border: 1px solid rgba(0, 0, 0, 0.15);
      border-radius: 8px;
      font-family: inherit;
    }
    .react-datepicker__header {
      background-color: #ffffff;
      border-bottom: 1px solid rgba(0, 0, 0, 0.15);
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      padding-top: 8px;
    }
    .react-datepicker__day {
      border-radius: 4px;
      margin: 0.2rem;
      width: 2rem;
      &:hover {
        background-color: ${({ theme }) => theme.colors.primary[8]};
      }
      &--selected {
        background-color: ${({ theme }) =>
          theme.colors.primary.default} !important;
        color: white !important;
      }
      &--keyboard-selected {
        background-color: ${({ theme }) => theme.colors.primary[8]};
      }
    }
    .react-datepicker__day-name {
      color: ${({ theme }) => theme.colors.text[8]};
      font-size: 0.75rem;
      font-weight: 500;
      margin: 0.2rem;
      width: 2rem;
    }
    .react-datepicker__current-month {
      color: ${({ theme }) => theme.colors.text.default};
      font-size: 0.875rem;
      font-weight: 600;
      margin-bottom: 8px;
    }
    .react-datepicker__navigation {
      top: 8px;
    }
  `,
};
