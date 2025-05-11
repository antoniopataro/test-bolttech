import styled from "styled-components";

import { Seasons } from "@/shared/enums";

export const components = {
  indicator: styled.span.withConfig({
    shouldForwardProp: (prop) => prop !== "season",
  })<{
    season: Seasons;
  }>`
    background-color: ${({ season }) =>
      season === Seasons.PEAK
        ? "#ff0000"
        : season === Seasons.MID
          ? "#ffa500"
          : "#00ff00"};
    border-radius: 50%;
    height: 6px;
    width: 6px;
  `,
  label: styled.span`
    color: ${({ theme }) => theme.colors.text.default};
    font-size: 0.8125rem;
    font-weight: 400;
  `,
  root: styled.div`
    align-items: center;
    background-color: #fff;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    display: flex;
    gap: 10px;
    padding: 6px 12px;
  `,
};
