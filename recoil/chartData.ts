import { atom, useRecoilState } from "recoil";

export const chartDataState = atom({
  key: "chartData",
  default: {},
});

export const useChartDataState = () => {
  return useRecoilState(chartDataState);
};
