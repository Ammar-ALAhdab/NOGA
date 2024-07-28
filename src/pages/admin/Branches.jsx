import { useEffect, useState } from "react";
import Title from "../../components/titles/Title";
import ButtonComponent from "../../components/buttons/ButtonComponent";
import DataTable from "../../components/table/DataTable";
import LoadingSpinner from "../../components/actions/LoadingSpinner";
import NoDataError from "../../components/actions/NoDataError";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import TablePagination from "../../components/table/TablePagination";
import SearchComponent from "../../components/inputs/SearchComponent";

const formatting = (unFormattedData) => {
  const rowsData = unFormattedData.map((row) => ({
    id: row.id,
    branchName: `${row.city_name} ${row.number}`,
    address: `${row.street}, ${row.area}, ${row.city_name}`,
    branchManager: row.manager_name,
    options: <ButtonComponent />,
  }));
  return rowsData;
};

function Branches() {
  const [formattedData, setFormattedData] = useState(null);
  const [paginationSettings, setPaginationSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleChangePage = (event, value) => {
    getBranches(`/branches?page=${value}`);
  };

  const navigate = useNavigate();
  const navigateToBranchByID = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const handleClick = () => {
    navigate("AddBranch");
  };

  const getBranches = async (link = "/branches") => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosPrivate.get(link);
      const data = formatting(response.data.results);
      setFormattedData(data);
      setPaginationSettings({
        count: response.data.count,
        next: response.data.next,
        previous: response.data.previous,
      });
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getBranches();
  }, []);

  const handleGetBranchById = async (branchId) => {
    try {
      const response = await axiosPrivate.get(`/branches?id=${branchId}`);
      const branchData = response?.data?.results;
      navigateToBranchByID(`${branchId}`, {
        state: { branch: branchData },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchClick = () => {
    getBranches(`/branches?search=${searchQuery}`);
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
      width: 150,
      sortable: false,
      renderCell: (params) => {
        return (
          <ButtonComponent
            variant={"show"}
            small={true}
            onClick={() => handleGetBranchById(params.id)}
          />
        );
      },
    },
  ];

  return (
    <main className="flex flex-col items-center justify-between w-full h-full flex-grow">
      <Title text={"إدارة الأفرع:"} />
      <div className="w-full flex items-center flex-row-reverse gap-2 mb-4">
        <ButtonComponent variant={"add"} onClick={handleClick} />
      </div>
      <section className="flex flex-col items-center justify-center w-full bg-white rounded-[30px] p-4 my-box-shadow gap-8">
        <SearchComponent
          onChange={setSearchQuery}
          value={searchQuery}
          onClickSearch={handleSearchClick}
        />
        {loading ? (
          <div className="flex justify-center items-center h-[400px]">
            <LoadingSpinner w="64px" h="64px" />
          </div>
        ) : error ? (
          <NoDataError error={error} />
        ) : (
          <DataTable columns={columns} rows={formattedData} />
        )}
        <TablePagination
          count={paginationSettings?.count}
          handleChangePage={handleChangePage}
          rowsName={"الأفرع"}
        />
      </section>
    </main>
  );
}

export default Branches;
