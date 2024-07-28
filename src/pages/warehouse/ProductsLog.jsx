import Title from "../../components/titles/Title";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import axios from "axios";
import DataTableAccordion from "../../components/table/DataTableAccordion";

const statusFormat = {
  Accepted: "مقبول",
  Rejected: "مرفوض",
  "Partially Accepted": "مقبول جزئياً",
  pending: "معلق",
};

const statusColors = {
  مقبول: "#2DBDA8",
  مرفوض: "#E76D3B",
  "مقبول جزئياً": "#D9A322",
  معلق: "#7049A3",
};

const columns = [
  { field: "id", headerName: "", width: 50 },
  {
    field: "idOfOrder",
    headerName: "معرف الطلب",
    width: 100,
    valueGetter: (value, row) => `#${row.id}`,
  },
  { field: "date", headerName: "التاريخ", flex: 1 },
  { field: "time", headerName: "الوقت", flex: 1 },
  { field: "productCount", headerName: "عدد المنتجات", flex: 1 },
  {
    field: "status",
    headerName: "الحالة",
    flex: 1,
    renderCell: (params) => {
      console.log(params);
      return (
        <span
          className="font-bold"
          style={{ color: statusColors[params.row.status] }}
        >
          {params.row.status}
        </span>
      );
    },
  },
];

const formatting = (unFormattedData) => {
  const rowsData = unFormattedData.map((row) => ({
    id: row.id,
    idOfOrder: row.id,
    date: row.date,
    time: row.time,
    productCount: row.productCount,
    status: statusFormat[row.status],
    productsOrder: row.productsOrder,
  }));
  return rowsData;
};

function ProductsLog() {
  const [formattedData, setFormattedData] = useState([]);
  const [paginationSettings, setPaginationSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const axiosPrivate = useAxiosPrivate();

  const getProductsLog = async (link = "http://localhost:3000/productsLog") => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(link);
      const data = formatting(response?.data);
      setFormattedData(data);
      setPaginationSettings({
        count: response?.data?.count,
        next: response?.data?.next,
        previous: response?.data?.previous,
      });
    } catch (e) {
      console.log(e)
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
      <Title text={"سجل المنتجات:"} />
      <section className="flex items-center justify-center flex-col gap-4 w-full bg-white rounded-[30px] py-8 px-4 my-box-shadow">
        <DataTableAccordion columns={columns} rows={formattedData} />
      </section>
    </main>
  );
}

export default ProductsLog;