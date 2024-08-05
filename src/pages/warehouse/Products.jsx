import { useEffect, useReducer, useState } from "react";
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
import SectionTitle from "../../components/titles/SectionTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import FilterInputComponent from "../../components/inputs/FilterInputComponent";
import FilterDropDown from "../../components/inputs/FilterDropDown";

const initialFilterState = {
  filter: false,
  name: "",
  minPrice: "",
  maxPrice: "",
  productType: "",
  brand: "",
  cpu: "",
  color: "",
  accessoriesCategory: "",
  ordering: "",
  orderingType: "",
};

const ORDERING_FIELDS = [
  { id: "product_name", title: "اسم المنتج" },
  { id: "wholesale_price", title: "سعر التكلفة" },
  { id: "selling_price", title: "سعر المبيع" },
  { id: "quantity", title: "الكمية" },
];

const ORDERING_TYPE = [
  { id: 1, title: "تصاعدي" },
  { id: 2, title: "تنازلي" },
];

const PRODUCT_TYPE = [
  { id: 1, title: "موبايل" },
  { id: 2, title: "إكسسوار" },
];

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value, filter: true };
    case "RESET":
      return initialFilterState;
    default:
      return state;
  }
};

const formatting = (unFormattedData) => {
  const rowsData = unFormattedData.map((row) => ({
    id: row.id,
    profilePhoto: row.category_name == "Phone" ? phone : accessor,
    barcode: row.qr_code ? row.qr_code : "لايوجد",
    productName: row.product_name,
    type: row.category_name == "Phone" ? "موبايل" : "إكسسوار",
    sellingPrice: currencyFormatting(row.selling_price),
    wholesalePrice: currencyFormatting(row.wholesale_price),
    quantity: row.quantity,
    options: <ButtonComponent />,
  }));
  return rowsData;
};

function Products() {
  const [products, setProducts] = useState([]);
  const [rowSelectionID, setRowSelectionID] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorProducts, setErrorProducts] = useState(null);
  const [paginationSettings, setPaginationSettings] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterShow, setFilterShow] = useState(false);
  const [filterTerms, setFilterTerms] = useState("");
  const [scrollTop, setScrollTop] = useState(0);
  const [brands, setBrands] = useState([]);
  const [CPUS, setCPUS] = useState([]);
  const [colors, setColors] = useState([]);
  const [accessoriesCategories, setAccessoriesCategories] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const axiosPrivate = useAxiosPrivate();
  const handleClickAdd = () => {
    navigate("addProduct");
  };

  const handleChangePage = (event, value) => {
    setPage(value);
    getProducts(
      `/products?page=${value}${searchQuery ? `&search=${searchQuery}` : ""}${
        state.filter ? `${filterTerms}` : ""
      }`
    );
  };

  const handleSearchClick = () => {
    setPage(1);
    getProducts(`/products?search=${searchQuery}`);
  };

  const [state, dispatch] = useReducer(reducer, initialFilterState);

  const handleFilterTerms = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD", field: name, value });
  };

  const handleFilterClick = () => {
    let nameFilter = state.name ? `&search=${state.name}` : "";
    let minPriceFilter = state.minPrice ? `&min_price=${state.minPrice}` : "";
    let maxPriceFilter = state.maxPrice ? `&max_price=${state.maxPrice}` : "";
    let productTypeFilter = state.productType
      ? `&category_type=${state.productType}`
      : "";
    let brandFilter = state.brand ? `&phone__brand_id=${state.brand}` : "";
    let cpuFilter = state.cpu ? `&phone__CPU_id=${state.cpu}` : "";
    let colorFilter = state.color ? `&phone__color_id=${state.color}` : "";
    let accessoriesCategoryFilter = state.accessoriesCategory
      ? `&accessory__accessory_category=${state.accessoriesCategory}`
      : "";
    let orderingTypeFilter =
      state.orderingType == 1 || state.orderingType == "" ? "" : "-";
    let orderingFilter = state.ordering
      ? `&ordering=${orderingTypeFilter}${state.ordering}`
      : "";
    let filter =
      nameFilter +
      minPriceFilter +
      maxPriceFilter +
      productTypeFilter +
      brandFilter +
      cpuFilter +
      colorFilter +
      accessoriesCategoryFilter +
      orderingFilter;
    setFilterTerms(filter);
    setPage(1);
    getProducts(`/products?${filter}`);
    handleCloseFilter();
  };

  const handleShowFilter = () => {
    setFilterShow(true);
    document.body.style.overflow = "hidden";
    setScrollTop(document.documentElement.scrollTop);
    document.documentElement.scrollTop = 0;
  };

  const handleCloseFilter = () => {
    setFilterShow(false);
    document.body.style.overflow = "auto";
    setTimeout(() => {
      document.documentElement.scrollTop = scrollTop;
    }, 300);
  };

  const getProducts = async (link = "/products") => {
    try {
      setLoadingProducts(true);
      setErrorProducts(null);
      const response = await axiosPrivate.get(link);
      const formattedProducts = formatting(response?.data?.results);
      setProducts(formattedProducts);
      setPaginationSettings({
        count: response.data.count,
        next: response.data.next,
        previous: response.data.previous,
      });
    } catch (error) {
      console.log(error);
      setErrorProducts(error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const getFilterSettings = async (link, storeData) => {
    try {
      const response = await axiosPrivate.get(link);
      if (storeData == "phone_brands") {
        setBrands((prevData) => [...prevData, ...response.data.results]);
      } else if (storeData == "cpus") {
        setCPUS((prevData) => [...prevData, ...response.data.results]);
      } else if (storeData == "colors") {
        setColors((prevData) => [...prevData, ...response.data.results]);
      } else if (storeData == "accessories_categories") {
        setAccessoriesCategories((prevData) => [
          ...prevData,
          ...response.data.results,
        ]);
      }
      if (response.data.next) {
        getFilterSettings(response.data.next, storeData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFilterSettings("/phone_brands", "phone_brands");
    getFilterSettings("/cpus", "cpus");
    getFilterSettings("/colors", "colors");
    getFilterSettings("/accessories_categories", "accessories_categories");
    getProducts();
  }, []);

  const handleClickGotoProductById = (productId, type) => {
    const toProduct =
      type == "موبايل" ? `phone/${productId}` : `accessory/${productId}`;
    navigate(toProduct, {
      state: { product: productId },
    });
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
      width: 150,
    },
    {
      field: "type",
      headerName: "النوع",
      flex: 1,
    },
    {
      field: "wholesalePrice",
      headerName: "سعر التكلفة",
      width: 150,
    },
    {
      field: "sellingPrice",
      headerName: "سعر المبيع",
      width: 150,
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
            onClick={() =>
              handleClickGotoProductById(params.id, params.row.type)
            }
          />
        );
      },
    },
  ];
  return (
    <main className="flex flex-col items-center justify-between w-full h-full flex-grow">
      <Title text={" قائمة منتجات المستودع المركزي:"} />
      <div className="w-full flex items-center flex-row-reverse gap-2 mb-4">
        <ButtonComponent variant={"add"} onClick={handleClickAdd} />
        {rowSelectionID.length > 0 && (
          <ButtonComponent
            textButton="تعديل المنتجات المحددة"
            variant={"edit"}
            onClick={() => {
              navigate("editProducts", {
                state: { productsIDs: rowSelectionID },
              })
            }}
          />
        )}
      </div>
      <section className="flex flex-col items-center justify-center w-full bg-white rounded-[30px] p-4 my-box-shadow gap-8">
        {/* ################################### START SEARCH AND FILTER ################################### */}
        <div className="flex flex-col items-center justify-center gap-2 w-full">
          <div className="flex items-center justify-center gap-8 w-full">
            <ButtonComponent variant={"filter"} onClick={handleShowFilter} />
            <SearchComponent
              onChange={setSearchQuery}
              value={searchQuery}
              onClickSearch={handleSearchClick}
            />
          </div>

          <div
            className="absolute my-filter-box flex flex-col items-center justify-center w-full h-full p-4 z-[200]"
            style={{
              opacity: filterShow ? 1 : 0,
              visibility: filterShow ? "visible" : "hidden",
            }}
          >
            <div className="flex flex-col items-center justify-center gap-2 relative w-fit pl-8 pr-8 pb-8 pt-4 rounded-3xl bg-white my-box-shadow">
              <SectionTitle text={"خيارات الفلترة:"} />
              <button
                className="absolute top-3 left-3 w-8 h-8 bg-halloweenOrange text-white z-100 rounded-full"
                onClick={handleCloseFilter}
              >
                <FontAwesomeIcon icon={faX} />
              </button>
              <div className="flex flex-row-reverse items-center justify-center gap-2 w-full">
                <FilterInputComponent
                  name="name"
                  placeholder="فتلرة حسب اسم المنتج"
                  value={state.name}
                  onChange={handleFilterTerms}
                />
                <FilterInputComponent
                  name="minPrice"
                  placeholder="فتلرة حسب أقل سعر تكلفة"
                  value={state.minPrice}
                  onChange={handleFilterTerms}
                />
                <FilterInputComponent
                  name="maxPrice"
                  placeholder="فتلرة حسب أكبر سعر تكلفة"
                  value={state.maxPrice}
                  onChange={handleFilterTerms}
                />
              </div>
              <div className="flex flex-row-reverse items-center justify-center gap-2 w-full">
                <FilterDropDown
                  data={PRODUCT_TYPE}
                  dataTitle={"title"}
                  value={state.productType}
                  label={"فلترة حسب تصنيف المنتج"}
                  name={"productType"}
                  onChange={handleFilterTerms}
                />
              </div>
              {state.productType == 1 && (
                <div className="flex flex-row-reverse items-center justify-center gap-2 w-full">
                  <FilterDropDown
                    data={brands}
                    dataTitle={"brand_name"}
                    value={state.brand}
                    label={"فرز حسب الشركة المصنعة"}
                    name={"brand"}
                    onChange={handleFilterTerms}
                  />
                  <FilterDropDown
                    data={CPUS}
                    dataTitle={"CPU_brand"}
                    value={state.cpu}
                    label={"فرز حسب المعالج"}
                    name={"cpu"}
                    onChange={handleFilterTerms}
                  />
                  <FilterDropDown
                    data={colors}
                    dataTitle={"color"}
                    value={state.color}
                    label={"فرز حسب اللون"}
                    name={"color"}
                    onChange={handleFilterTerms}
                  />
                </div>
              )}
              {state.productType == 2 && (
                <FilterDropDown
                  data={accessoriesCategories}
                  dataTitle={"category_name"}
                  value={state.accessoriesCategory}
                  label={"فرز حسب نوع الإكسسوار"}
                  name={"accessoriesCategory"}
                  onChange={handleFilterTerms}
                />
              )}
              <div className="flex flex-row-reverse items-center justify-center gap-2 w-full">
                <FilterDropDown
                  data={ORDERING_FIELDS}
                  dataTitle={"title"}
                  value={state.ordering}
                  label={"ترتيب حسب حقل"}
                  name={"ordering"}
                  onChange={handleFilterTerms}
                />
                <FilterDropDown
                  data={ORDERING_TYPE}
                  dataTitle={"title"}
                  value={state.orderingType}
                  label={"نمط الترتيب"}
                  name={"orderingType"}
                  onChange={handleFilterTerms}
                />
              </div>
              <div className="flex flex-row-reverse items-center justify-center gap-2 w-full">
                <ButtonComponent
                  variant={"delete"}
                  textButton="إزالة الفلتر"
                  onClick={() => dispatch({ type: "RESET" })}
                />
                <ButtonComponent
                  variant={"filter"}
                  textButton="بحث حسب الفلتر"
                  onClick={handleFilterClick}
                />
              </div>
            </div>
          </div>
        </div>
        {/* ################################### END SEARCH AND FILTER ################################### */}

        {loadingProducts ? (
          <div className="flex justify-center items-center h-[400px]">
            <LoadingSpinner />
          </div>
        ) : errorProducts ? (
          <NoDataError error={errorProducts} />
        ) : (
          <DataTable
            columns={columns}
            rows={products}
            hideSelectRows={false}
            onRowSelectionModelChange={(newRowSelectionModel) => {
              setRowSelectionID(newRowSelectionModel);
            }}
            rowSelectionModel={rowSelectionID}
            hideFooter={false}
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

export default Products;
