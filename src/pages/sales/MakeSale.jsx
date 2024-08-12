import { useEffect, useState, useRef } from "react";
import Title from "../../components/titles/Title";
import useLocationState from "../../hooks/useLocationState";
import currencyFormatting from "../../util/currencyFormatting";
import ButtonComponent from "../../components/buttons/ButtonComponent";
import phone from "../../assets/warehouse admin/phone.jpg";
import accessor from "../../assets/warehouse admin/accessor.png";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import NoDataError from "../../components/actions/NoDataError";
import LoadingSpinner from "../../components/actions/LoadingSpinner";
import useGoToBack from "../../hooks/useGoToBack";
import DataTableEditRow from "../../components/table/DataTableEditRow";
import SectionTitle from "../../components/titles/SectionTitle";
import SearchComponent from "../../components/inputs/SearchComponent";
import TextInputComponent from "../../components/inputs/TextInputComponent";
import useSaleContext from "../../hooks/useSaleContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useScreenshot, createFileName } from "use-react-screenshot";

const formatting = (unFormattedData) => {
  const rowsData = {
    id: unFormattedData.product.id,
    profilePhoto:
      unFormattedData.product.category_name == "Phone" ? phone : accessor,
    barcode: unFormattedData.product.qr_code
      ? unFormattedData.product.qr_code
      : "لايوجد",
    productName: unFormattedData.product.product_name,
    type:
      unFormattedData.product.category_name == "Phone" ? "موبايل" : "إكسسوار",
    sellingPrice: currencyFormatting(unFormattedData.product.selling_price),
    quantity: unFormattedData.quantity,
    wantedQuantity: "",
    options: <ButtonComponent />,
  };
  return rowsData;
};

function MakeSale() {
  const { selectedProducts, setSelectedProducts } = useSaleContext();
  const uniqueIds = new Set();
  // Filter the original array to keep only unique objects based on the 'id' property
  const uniqueSelectedProducts = selectedProducts.filter((obj) => {
    if (!uniqueIds.has(obj.id)) {
      uniqueIds.add(obj.id);
      return true;
    }
    return false;
  });
  const productIDs = useLocationState("productsIDs");
  const [customer, setCustomer] = useState(true);
  const [loadingCustomer, setLoadingCustomer] = useState(true);
  const [errorCustomer, setErrorCustomer] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorProducts, setErrorProducts] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [finalPrice, setFinalPrice] = useState(0);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const handleClickBack = useGoToBack();
  const branchID = JSON.parse(localStorage.getItem("branchID"));
  // For Take Snap Shot Of bill
const ref = useRef(null);
  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
  });

  const download = (image, { name = "img", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const downloadScreenshot = () => takeScreenShot(ref.current).then(download);

  const updateFunction = (newRow) => {
    setSelectedProducts(
      uniqueSelectedProducts.map((row) => (row.id === newRow.id ? newRow : row))
    );
  };

  const deleteFunction = (id) => {
    setSelectedProducts(uniqueSelectedProducts.filter((p) => p.id != id));
  };

  const handleSearchClick = () => {
    getCustomers(`/customers?search=${searchQuery}`);
  };

  const calculateTotalPrice = (rows) => {
    let total = 0;
    rows?.forEach((row) => {
      const quantity = row?.wantedQuantity == "" ? 0 : row?.wantedQuantity;
      total += parseFloat(
        quantity * row?.sellingPrice?.match(/[\d,]+/)[0]?.replace(/,/g, "")
      );
    });
    return total;
  };

  const getCustomers = async (link = "/customers") => {
    try {
      setLoadingCustomer(true);
      setErrorCustomer(false);
      setCustomer({});
      const response = await axiosPrivate.get(link);
      console.log(response.data);
      if (response.data.results[0]) {
        const { first_name, middle_name, last_name, national_number, id } =
          response.data.results[0];
        const customer = {
          fullName: `${first_name} ${middle_name} ${last_name}`,
          id: id,
          nationalNumber: national_number,
        };
        setCustomer(customer);
      } else if (response.data.results.length == 0) {
        setErrorCustomer(true);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingCustomer(false);
    }
  };

  const getProducts = async () => {
    try {
      setLoadingProducts(true);
      setErrorProducts(null);

      for (let i = 0; i < productIDs?.length; i++) {
        const response = await axiosPrivate.get(
          `/products/branch?branch__id=${branchID}&product__id=${productIDs[i]}`
        );
        const p = response.data?.results;
        const formattedProduct = formatting(...p);
        setSelectedProducts((prev) => [...prev, formattedProduct]);
      }
    } catch (error) {
      console.log(error);
      setErrorProducts(error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleMakeSale = () => {
    const saleProcess = {
      branch_id: branchID,
      customer_id: customer.id,
      products: [
        ...uniqueSelectedProducts.map((p) => {
          return {
            product_id: p.id,
            purchased_quantity: p.wantedQuantity,
          };
        }),
      ],
    };
    const purchaseProducts = () => {
      Swal.fire({
        title: "هل أنت متأكد من عملية الشراء",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "لا",
        confirmButtonColor: "#E76D3B",
        cancelButtonColor: "#3457D5",
        confirmButtonText: "نعم",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosPrivate
            .post("/purchase", JSON.stringify(saleProcess))
            .then(() => {
              Swal.fire({
                title: "تمت عملية الشراء بنجاح",
                icon: "success",
              });
              setSelectedProducts([]);
              navigate(-1)
              downloadScreenshot()
            })
            .catch((error) => {
              console.error(error);
              Swal.fire({
                title: "خطأ",
                text: "حدث خطأ ما في عملية الشراء",
                icon: "error",
                confirmButtonColor: "#3457D5",
                confirmButtonText: "حسناً",
              });
            });
        }
      });
    };
    purchaseProducts();
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
      field: "productName",
      headerName: "اسم المنتج",
      width: 150,
    },
    {
      field: "sellingPrice",
      headerName: "السعر",
      width: 150,
    },
    {
      field: "quantity",
      headerName: "الكمية المتوفرة",
      width: 150,
    },
    {
      field: "wantedQuantity",
      headerName: "الكمية المطلوبة",
      flex: 1,
      editable: true,
    },
    {
      field: "totalPrice",
      headerName: "المبلغ الإجمالي",
      width: 150,
      renderCell: (params) => {
        // Return Total Price
        return currencyFormatting(
          params?.row?.wantedQuantity *
            params?.row?.sellingPrice?.match(/[\d,]+/)[0].replace(/,/g, "")
        );
      },
    },
  ];

  useEffect(() => {
    setFinalPrice(calculateTotalPrice(uniqueSelectedProducts));
  }, [uniqueSelectedProducts]);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <main className="flex flex-col items-center justify-between w-full h-full flex-grow">
      <Title text={"إجراء عملية بيع:"} />
      <div className="w-full flex items-center flex-row-reverse gap-2 mb-4">
        <section className="flex flex-col items-center justify-center w-full bg-white rounded-[30px] p-4 my-box-shadow gap-8">
          <SectionTitle text={"معلومات المشتري:"} />
          <SearchComponent
            onChange={setSearchQuery}
            value={searchQuery}
            onClickSearch={handleSearchClick}
          />

          {!loadingCustomer ? (
            errorCustomer ? (
              <div className="flex items-center justify-center gap-4">
                <ButtonComponent
                  textButton="إنشاء"
                  onClick={() => navigate("/salesOfficer/addCustomer")}
                />
                <p className="font-bold">
                  لا يوجد سجل لللزبون المطلوب! هل تريد إنشاء سجل له؟
                </p>
              </div>
            ) : (
              <div className="grid lg:grid-cols-2 gap-4 w-full">
                <div className="flex flex-col items-end justify-end gap-4">
                  <TextInputComponent
                    label={"الرقم الوطني:"}
                    value={customer.nationalNumber}
                    disabled={true}
                  />
                </div>
                <div className="flex flex-col items-end justify-start gap-4">
                  <TextInputComponent
                    label={"الاسم الثلاثي:"}
                    value={customer.fullName}
                    disabled={true}
                  />
                </div>
              </div>
            )
          ) : null}
          {uniqueSelectedProducts.length > 0 && (
            <SectionTitle text={"المنتجات المختارة:"} />
          )}
          {loadingProducts ? (
            <div className="flex justify-center items-center h-[400px]">
              <LoadingSpinner />
            </div>
          ) : errorProducts ? (
            <NoDataError error={errorProducts} />
          ) : uniqueSelectedProducts.length > 0 ? (
            <div
              className="flex flex-col justify-start items-center gap-4 p-4"
              ref={ref}
            >
              <DataTableEditRow
                columns={columns}
                rows={uniqueSelectedProducts}
                updateFunction={updateFunction}
                deleteFunction={deleteFunction}
                dir={"rtl"}
              />
              <p className="font-bold w-full text-right ar-txt">
                {`المبلغ الكلي: ${currencyFormatting(finalPrice)}`}
              </p>
            </div>
          ) : null}

          <div className="flex items-center justify-end gap-4 w-full">
            <ButtonComponent variant={"back"} onClick={downloadScreenshot} />
            <ButtonComponent
              variant={"procedure"}
              onClick={handleMakeSale}
              disabled={uniqueSelectedProducts.length == 0}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

export default MakeSale;
