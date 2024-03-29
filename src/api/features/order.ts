import { Item, sfAnd, sfGe, sfLe, sfLike } from "spring-filter-query-builder";

import type { AxiosError } from "axios";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const baseurl = import.meta.env.VITE_API_URL as string;

const getOrderData = async (
  searchParam: FilterReportData
): Promise<OrderResponse> => {
  const uri = `${baseurl}/order?filter=${getFilterQuery(searchParam)}&page=${
    searchParam.pageNumber
  }&page_size=${searchParam.pageSize}`;
  const res = await axios.get(uri);
  return res.data;
};

const getFilterQuery = (searchParam: FilterReportData) => {
  const conditionArr: Item[] = [];
  if (searchParam.filter && searchParam.filter.length) {
    searchParam.filter.forEach((f) => {
      if (f.key === "minAmount") conditionArr.push(sfGe("netAmount", f.value));
      else if (f.key === "maxAmount")
        conditionArr.push(sfLe("netAmount", f.value));
      else if (f.key === "fromDate")
        conditionArr.push(sfGe("orderDate", f.value));
      else if (f.key === "toDate")
        conditionArr.push(sfLe("orderDate", f.value));
      else conditionArr.push(sfLike(f.key, f.value));
    });
  }
  if (conditionArr.length > 0) return sfAnd(conditionArr).toString();
  return "";
};

export const useGetOrderData = (reqData: FilterReportData) => {
  return useQuery<OrderResponse, AxiosError>({
    queryKey: ["getOrderData", reqData],
    queryFn: () => getOrderData(reqData),
  });
};

const getOrderById = async (orderId: string): Promise<OrderResponse> => {
  const uri = `${baseurl}/order-detail/${orderId}`;
  const res = await axios.get(uri);
  return res.data;
};

export const useGetOrderById = (reqData: string) => {
  return useQuery<OrderResponse, AxiosError>({
    queryKey: ["getOrderById", reqData],
    queryFn: () => getOrderById(reqData),
    enabled: false,
  });
};
