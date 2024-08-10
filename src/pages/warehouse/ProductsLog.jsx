import Title from "../../components/titles/Title";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import DataTableAccordion from "../../components/table/DataTableAccordion";
import LoadingSpinner from "../../components/actions/LoadingSpinner";
import NoDataError from "../../components/actions/NoDataError";
import TablePagination from "../../components/table/TablePagination";

const columns = [
  { field: "id", headerName: "", width: 50 },
  {
    field: "idOfOrder",
    headerName: "معرف الطلب",
    width: 100,
    valueGetter: (value, row) => `#${row.id}`,
  },
  { field: "date", headerName: "التاريخ", flex: 1 },
  { field: "branch", headerName: "الفرع", flex: 1 },
  { field: "productCount", headerName: "عدد المنتجات", flex: 1 },
  {
    field: "status",
    headerName: "الحالة",
    flex: 1,
    renderCell: (params) => {
      return (
        <span
          className="font-bold"
          style={{
            color: params.row.status == "إرسال" ? "#2DBDA8" : "#E76D3B",
          }}
        >
          {params.row.status}
        </span>
      );
    },
  },
];

const detailColumns = [
  { field: "id", headerName: "", width: 50 },
  { field: "product_name", headerName: "اسم المنتج", flex: 1 },
  {
    field: "category_name",
    headerName: "النوع",
    align: "center",
    flex: 1,
  },
  { field: "qr_code", headerName: "الباركود", flex: 1 },
  {
    field: "quantity",
    headerName: "الكمية",
    flex: 1,
  },
];

function ProductsLog() {
  const [productsTransportLog, setProductsTransportLog] = useState([]);
  const [paginationSettings, setPaginationSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const axiosPrivate = useAxiosPrivate();

  const handleChangePage = (event, value) => {
    setPage(value);
    getProductsLog(
      `/products/transport?&page=${value}${
        searchQuery ? `&search=${searchQuery}` : ""
      }`
      // ${state.filter ? `${filterTerms}` : ""}`
    );
  };

  const formatting = (unFormattedData) => {
    const rowsData = unFormattedData?.map((row) => {
      return {
        id: row.id,
        idOfOrder: row.id,
        date: row.date_of_process,
        branch: "",
        productCount: row?.transported_product?.length,
        status: row.movement_type == true ? "إرسال" : "إستعادة",
        productsOrder: row.productsOrder,
        transportedProduct: row.transported_product?.map((tp) => {
          delete tp.product.quantity;
          tp.product.quantity = tp.quantity;
          return tp.product;
        }),
      };
    });
    return rowsData;
  };

  const getProductsLog = async (link = "/products/transport") => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosPrivate.get(link);
      const data = formatting(response?.data?.results);
      setProductsTransportLog(data);
      setPaginationSettings({
        count: response?.data?.count,
        next: response?.data?.next,
        previous: response?.data?.previous,
      });
    } catch (e) {
      console.log(e);
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductsLog();
  }, []);

  return (
    <main className="flex flex-col items-center justify-between w-full h-full flex-grow gap-4">
      <Title text={"سجل حركة المنتجات:"} />
      <section
        className="flex items-center justify-center flex-col gap-4 w-full bg-white rounded-[30px] py-8 px-4 my-box-shadow"
      >
        {loading ? (
          <div className="flex justify-center items-center h-[400px]">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <NoDataError error={error} />
        ) : (
          <DataTableAccordion
            columns={columns}
            rows={productsTransportLog}
            detailColumns={detailColumns}
            detailRows={"transportedProduct"}
          />
        )}
        <TablePagination
          count={paginationSettings?.count}
          handleChangePage={handleChangePage}
          rowsName={"المنتجات"}
          page={page}
        />
      </section>
    </main>
  );
}

export default ProductsLog;
