import { Item, sfAnd, sfGe, sfLe, sfLike } from "spring-filter-query-builder";

import type { AxiosError } from "axios";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getOrderData = async (
  searchParam: FilterReportData
): Promise<OrderResponse> => {
  const uri = `/order?filter=${getFilterQuery(searchParam)}&page=${
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
  return sfAnd(conditionArr).toString();
};

export const useGetOrderData = (reqData: FilterReportData) => {
  return useQuery<OrderResponse, AxiosError>({
    queryKey: ["getOrderData", reqData],
    queryFn: () => getOrderData(reqData),
  });
};
