import { useEffect, useState } from "react";
import ButtonComponent from "../../components/buttons/ButtonComponent";
import DataTable from "../../components/table/DataTable";
import LoadingSpinner from "../../components/actions/LoadingSpinner";
import NoDataError from "../../components/actions/NoDataError";

function Statistics() {
  const [formattedData, setFormattedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("http://localhost:3000/branches");
        if (!response.ok) {
          throw new Error("!حدث خطأ في جلب البيانات");
        }
        const json = await response.json();
        const data = formatting(json);
        setFormattedData(data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const formatting = (unFormattedData) => {
    const rowsData = unFormattedData.map((row) => ({
      id: row.id,
      branchName: `${row.city} ${row.branchNumber}`,
      address: `${row.street}, ${row.area}, ${row.city}`,
      branchManager: row.branchManager,
      options: <ButtonComponent />,
    }));
    return rowsData;
  };

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "branchName",
      headerName: "الفرع",
      flex: 1,
    },
    {
      field: "address",
      headerName: "العنوان",
      flex: 1,
    },
    {
      field: "branchManager",
      headerName: "مدير الفرع",
      flex: 1,
    },
    {
      field: "options",
      headerName: "خيارات",
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return (
          <ButtonComponent variant={"show"} small={true} onClick={() => {}} />
        );
      },
    },
  ];
  return (
    <section className="flex flex-col items-center justify-center gap-8 w-full bg-white rounded-[30px] p-4 my-box-shadow ">
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <NoDataError error={error} />
      ) : (
        <DataTable columns={columns} rows={formattedData} />
      )}
    </section>
  );
}

export default Statistics;
