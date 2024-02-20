import { setFilterReport, setOrderData } from "@store/ReportSlice";
import { useDispatch, useSelector } from "react-redux";

import { PaginationProps } from "antd";
import { RootState } from "@store";
import { dateFormat } from "@utils/constant";
import dayjs from "dayjs";
import { getOrderData } from "@api/report";
import { setLoading } from "@store/commonSlice";

const Report = () => {
  const dispatch = useDispatch();
  const { filterReport } = useSelector((state: RootState) => state.report);
  const fetchData = async (searchParam: FilterReportData) => {
    const updatedData = await getOrderData(searchParam);
    if (
      updatedData &&
      updatedData?.orders?.data &&
      updatedData?.orders?.data.length > 0
    ) {
      const data = updatedData.orders.data.map(
        (item: OrderData, index: number) => ({
          ...item,
          key:
            updatedData.orders.currentPage * updatedData.orders.pageSize +
            (index + 1),
        })
      );
      updatedData.orders.data = data;
      dispatch(setOrderData(updatedData.orders));
    } else {
      dispatch(setOrderData({} as OrderResponse));
    }
    dispatch(setLoading(false));
  };

  const onChangePagination = async (pageNumber: number, pageSize: number) => {
    const filter = filterReport;
    filter.pageNumber = pageNumber - 1;
    filter.pageSize = pageSize;
    filterReportFunc(filter);
  };

  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    const filter = filterReport;
    filter.pageNumber = current;
    filter.pageSize = pageSize;
    filterReportFunc(filter);
  };

  const onFinish = (value: ReportData) => {
    const params = [
      { key: "buyer.merchantCode", value: value.buyerCode },
      { key: "buyer.name", value: value.buyerName },
      { key: "buyer.phoneNumber", value: value.buyerPhone },
      { key: "seller.merchantCode", value: value.sellerCode },
      { key: "seller.name", value: value.sellerName },
      { key: "seller.phoneNumber", value: value.sellerPhone },
      { key: "minAmount", value: value.minAmount },
      { key: "maxAmount", value: value.maxAmount },
      {
        key: "fromDate",
        value: value.fromDate ? dayjs(value.fromDate).format(dateFormat) : "",
      },
      {
        key: "toDate",
        value: value.toDate
          ? dayjs(value.toDate)
              .hour(23)
              .minute(59)
              .second(59)
              .format(dateFormat)
          : "",
      },
    ].filter((param) => param.value !== "" && param.value !== undefined);
    filterReportFunc({ filter: params, pageNumber: 0, pageSize: 10 });
  };

  const filterReportFunc = (filter: FilterReportData) => {
    dispatch(setFilterReport(filter));
    dispatch(setLoading(true));
    fetchData(filter);
  };

  return {
    fetchData,
    onFinish,
    onShowSizeChange,
    onChangePagination,
  };
};

export default Report;
