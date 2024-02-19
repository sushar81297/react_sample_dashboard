import {
  Ge,
  Le,
  Like,
} from "spring-filter-query-builder/dist/types/comparators";
import { Item, sfAnd, sfGe, sfLe, sfLike } from "spring-filter-query-builder";

import axios from "axios";

const baseurl = import.meta.env.VITE_API_URL as string;

export async function getOrderData(searchParam: FilterReportData) {
  try {
    let uri = `${baseurl}/order?filter=&page=${searchParam.pageNumber}&page_size=${searchParam.pageSize}`;
    const conditionArr:
      | Item[]
      | { (arg0: Like): void; push: (arg0: Ge | Le) => void } = [];
    if (searchParam.filter && searchParam.filter.length) {
      searchParam.filter.map((f) => {
        if (f.key === "minAmount")
          conditionArr.push(sfGe("netAmount", f.value));
        else if (f.key === "maxAmount")
          conditionArr.push(sfLe("netAmount", f.value));
        else if (f.key === "fromDate")
          conditionArr.push(sfGe("orderDate", f.value));
        else if (f.key === "toDate")
          conditionArr.push(sfLe("orderDate", f.value));
        else conditionArr.push(sfLike(f.key, f.value));
      });
      const query = sfAnd(conditionArr);
      uri = `${baseurl}/order?filter=${query.toString()}&page=${
        searchParam.pageNumber
      }&page_size=${searchParam.pageSize}`;
    }
    const response = await axios.get(uri);
    return response.data.data;
  } catch (error) {
    return error;
  }
}

export async function getOrderById(orderId: string) {
  try {
    const response = await axios.get(`${baseurl}/order-detail/${orderId}`);
    return response.data.data;
  } catch (error) {
    return error;
  }
}
