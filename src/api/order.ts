import { Item, sfAnd, sfGe, sfLe, sfLike } from "spring-filter-query-builder";

import axios from "axios";

const baseurl = import.meta.env.VITE_API_URL as string;

export async function getOrderData(searchParam: FilterReportData) {
  try {
    const uri = `${baseurl}/order?filter=${getFilterQuery(searchParam)}&page=${
      searchParam.pageNumber
    }&page_size=${searchParam.pageSize}`;
    const response = await axios.get(uri);
    return response.data.data;
  } catch (error) {
    return error;
  }
}

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

export async function getOrderById(orderId: string) {
  try {
    const response = await axios.get(`${baseurl}/order-detail/${orderId}`);
    return response.data.data;
  } catch (error) {
    return error;
  }
}
