import { setFilterReport, setOrderData } from "@store/ReportSlice";
import { useDispatch, useSelector } from "react-redux";

import { PaginationProps } from "antd";
import { RootState } from "@store";
import { dateFormat } from "@utils/constant";
import dayjs from "dayjs";
import { setLoading } from "@store/commonSlice";
import { useGetOrderData } from "@api/features/order";

const Report = () => {
  const dispatch = useDispatch();
  const { filterReport } = useSelector((state: RootState) => state.report);

  const queryResponse = useGetOrderData(filterReport);

  // const fetchData = async () => {
  // const updatedData = await getOrderData(searchParam);
  // if (
  //   updatedData &&
  //   updatedData?.orders?.data &&
  //   updatedData?.orders?.data.length > 0
  // ) {
  //   const data = updatedData.orders.data.map(
  //     (item: OrderData, index: number) => ({
  //       ...item,
  //       key:
  //         updatedData.orders.currentPage * updatedData.orders.pageSize +
  //         (index + 1),
  //     })
  //   );
  //   updatedData.orders.data = data;
  //   dispatch(setOrderData(updatedData.orders));
  // } else {
  //   dispatch(setOrderData({} as OrderResponse));
  // }
  // dispatch(setLoading(false));
  // };

  const onChangePagination = async (pageNumber: number, pageSize: number) => {
    const updatedFilter = {
      ...filterReport,
      pageNumber: pageNumber - 1,
      pageSize: pageSize,
    };

    await filterReportFunc(updatedFilter);
  };
  const onShowSizeChange: PaginationProps["onShowSizeChange"] = async (
    current,
    pageSize
  ) => {
    const updatedFilter = {
      ...filterReport,
      pageNumber: current,
      pageSize: pageSize,
    };
    await filterReportFunc(updatedFilter);
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
    queryResponse.refetch();
  };

  const handleResponse = (updatedData: any) => {
    if (!updatedData || !updatedData.data) {
      dispatch(setOrderData({} as OrderResponse));
      dispatch(setLoading(false));
      return;
    }

    const { data } = updatedData;
    const { orders } = data;

    if (!orders || !orders.data || orders.data.length === 0) {
      dispatch(setOrderData({} as OrderResponse));
      dispatch(setLoading(false));
      return;
    }

    const { currentPage, pageSize } = orders;
    const newData = {
      ...data,
      orders: {
        ...orders,
        data: orders.data.map((item: OrderData, index: number) => ({
          ...item,
          key: currentPage * pageSize + (index + 1),
        })),
      },
    };
    dispatch(setOrderData(newData.orders as OrderResponse));
    dispatch(setLoading(false));
  };

  return {
    handleResponse,
    onFinish,
    onShowSizeChange,
    onChangePagination,
  };
};

export default Report;
