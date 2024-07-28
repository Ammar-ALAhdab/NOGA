import { useEffect, useState } from "react";
import Title from "../../components/titles/Title";
import ButtonComponent from "../../components/buttons/ButtonComponent";
import DataTable from "../../components/table/DataTable";
import LoadingSpinner from "../../components/actions/LoadingSpinner";
import NoDataError from "../../components/actions/NoDataError";
import { useNavigate } from "react-router-dom";
import currencyFormatting from "../../util/currencyFormatting";
import phone from "../../assets/warehouse admin/phone.jpg";
import accessor from "../../assets/warehouse admin/accessor.png";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import TablePagination from "../../components/table/TablePagination";
import SearchComponent from "../../components/inputs/SearchComponent";

const formatting = (unFormattedData) => {
  const rowsData = unFormattedData.map((row) => ({
    id: row.id,
    profilePhoto: row.category_name == "Phone" ? phone : accessor,
    barcode: row.id,
    productName: row.product_name,
    type: row.category_name == "Phone" ? "موبايل" : "إكسسوار",
    sellingPrice: currencyFormatting(row.selling_price),
    quantity: row.quantity,
    options: <ButtonComponent />,
  }));
  return rowsData;
};

function Products() {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorProducts, setErrorProducts] = useState(null);
  const [paginationSettings, setPaginationSettings] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const navigateToBranchByID = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const handleClick = () => {
    navigate("addProduct");
  };

  const handleChangePage = (event, value) => {
    getProducts(`/products?page=${value}`);
  };

  const handleSearchClick = () => {
    getProducts(`/products?search=${searchQuery}`);
  };

  const getProducts = async (link = "/products") => {
    try {
      setLoadingProducts(true);
      setErrorProducts(null);
      const response = await axiosPrivate.get(link);
      const formattedProducts = formatting(response?.data?.results);
      setProducts((prev) => [...prev, ...formattedProducts]);
      setPaginationSettings({
        count: response.data.count,
        next: response.data.next,
        previous: response.data.previous,
      });
      if (response.data.next) {
        getProducts(response.data.next);
      }
    } catch (error) {
      console.log(error);
      setErrorProducts(error);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const fetchBranchById = async (branchId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/branches/${branchId}`
      );
      if (!response.ok) {
        new Error("Server responded with status:", response.status);
      } else {
        const branchData = await response.json();
        navigateToBranchByID(`${branchId}`, {
          state: { branch: branchData },
        });
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  const handleClickFetchBranchById = (branchId) => {
    fetchBranchById(branchId);
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
      field: "barcode",
      headerName: "معرف المنتج",
      flex: 1,
    },
    {
      field: "productName",
      headerName: "اسم المنتج",
      flex: 1,
    },
    {
      field: "type",
      headerName: "النوع",
      flex: 1,
    },
    {
      field: "sellingPrice",
      headerName: "السعر",
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "الكمية",
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
            onClick={() => handleClickFetchBranchById(params.id)}
          />
        );
      },
    },
  ];
  return (
    <main className="flex flex-col items-center justify-between w-full h-full flex-grow">
      <Title text={" قائمة منتجات المستودع المركزي:"} />
      <div className="w-full flex items-center flex-row-reverse gap-2 mb-4">
        <ButtonComponent variant={"add"} onClick={handleClick} />
      </div>
      <section className="flex flex-col items-center justify-center w-full bg-white rounded-[30px] p-4 my-box-shadow gap-8">
        <SearchComponent
          onChange={setSearchQuery}
          value={searchQuery}
          onClickSearch={handleSearchClick}
        />
        {loadingProducts ? (
          <div className="flex justify-center items-center h-[400px]">
            <LoadingSpinner />
          </div>
        ) : errorProducts ? (
          <NoDataError error={errorProducts} />
        ) : (
          <DataTable columns={columns} rows={products} />
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

export default Products;
