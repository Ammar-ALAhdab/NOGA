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

function Employees() {
  const [formattedData, setFormattedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paginationSettings, setPaginationSettings] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [, setPage] = useState(1);
  const navigate = useNavigate();
  const navigateToEmployeeByID = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const handleSearchClick = () => {
    getEmployees(`/employees?search=${searchQuery}`);
  };

  const handleClick = () => {
    navigate("AddEmployee");
  };

  const handleChangePage = (event, value) => {
    setPage(value);
    getEmployees(`/employees?page=${value}`);
  };

  const formatting = (unFormattedData) => {
    const rowsData = unFormattedData.map((row) => ({
      id: row.id,
      profilePhoto: row?.profilePhoto,
      fullName: `${row.first_name} ${row.middle_name} ${row.last_name}`,
      jopTitle: `${row.job_type_title}`,
      branch: row.branch == null ? "لا يوجد" : `${row.branch_name}`,
      nationalId: `${row.national_number}`,
      options: <ButtonComponent />,
    }));
    return rowsData;
  };

  const getEmployees = async (link = "/employees") => {
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
    getEmployees();
  }, []);

  const handleGetEmployeeById = async (employeeId) => {
    try {
      const response = await axiosPrivate.get(`/employees?id=${employeeId}`);
      const employeeData = response?.data?.results;
      navigateToEmployeeByID(`${employeeId}`, {
        state: { employee: employeeData },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "profilePhoto",
      headerName: "",
      width: 60,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="flex justify-center items-center h-full">
            <img
              src={params.row.profilePhoto}
              alt="profile"
              width={60}
              height={60}
              className="rounded-[50%] border-2 border-primary"
            />
          </div>
        );
      },
    },
    {
      field: "fullName",
      headerName: "الاسم",
      flex: 1,
    },
    {
      field: "jopTitle",
      headerName: "المسمى الوظيفي",
      flex: 1,
    },
    {
      field: "branch",
      headerName: "الفرع",
      flex: 1,
    },
    {
      field: "nationalId",
      headerName: "الرقم الوطني",
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
            onClick={() => handleGetEmployeeById(params.id)}
          />
        );
      },
    },
  ];

  return (
    <main className="flex flex-col items-center justify-between w-full h-full flex-grow">
      <Title text={"إدارة الموظفين:"} />
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
          <div className="flex items-center justify-center w-full h-[400px]">
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
          rowsName={"الموظفين"}
        />
      </section>
    </main>
  );
}

export default Employees;
