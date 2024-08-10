import ButtonComponent from "../../components/buttons/ButtonComponent";
import DataTable from "../../components/table/DataTable";
import Title from "../../components/titles/Title";
import useLocationState from "../../hooks/useLocationState";
import phone from "../../assets/warehouse admin/phone.jpg";
import accessor from "../../assets/warehouse admin/accessor.png";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";

const formatting = (unFormattedData) => {
  const rowsData = unFormattedData.map((row) => ({
    id: row.product_id,
    profilePhoto: row.product.category_name == "Phone" ? phone : accessor,
    barcode: row.product.qr_code ? row.qr_code : "لايوجد",
    productName: row.product.product_name,
    totalQuantity: row.product.quantity,
    wantedQuantity: row.quantity,
    options: <ButtonComponent />,
  }));
  return rowsData;
};

function Request() {
  const products = useLocationState("products");
  const [productsRows, setProductsRows] = useState(formatting(products));
  const axiosPrivate = useAxiosPrivate();
  const { RequestId } = useParams();

  const acceptOrRejectAll = async (type) => {
    const responseToProductsRequests = (type) => {
      Swal.fire({
        title: `هل أنت متأكد من عملية ${
          type == "accept-all" ? "قبول" : "رفض"
        } كل طلبات المنتجات`,
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "لا",
        confirmButtonColor: "#E76D3B",
        cancelButtonColor: "#3457D5",
        confirmButtonText: "نعم",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosPrivate
            .post(
              `/products/request/${type}`,
              JSON.stringify({ request_id: RequestId })
            )
            .then(() => {
              Swal.fire({
                title: "تمت عملية معالجة الطلب  بنجاح",
                icon: "success",
              });
              setProductsRows([]);
            })
            .catch((error) => {
              console.error(error);
              Swal.fire({
                title: "خطأ",
                text: "حدث خطأ ما في معالجة كل الطلب",
                icon: "error",
                confirmButtonColor: "#3457D5",
                confirmButtonText: "حسناً",
              });
            });
        }
      });
    };
    responseToProductsRequests(type);
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
      field: "barcode",
      headerName: "معرف المنتج",
      width: 150,
    },
    {
      field: "totalQuantity",
      headerName: "الكمية المتوفرة",
      width: 150,
    },
    {
      field: "wantedQuantity",
      headerName: "الكمية المطلوبة",
      width: 150,
    },
    {
      field: "options",
      headerName: "خيارات",
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="flex justify-center items-center gap-4 w-full h-full">
            <ButtonComponent
              variant={"procedure"}
              textButton="معالجة الطلب"
              small={true}
              onClick={
                () => {}
                //  handleClickGotoProductById(params.id, params.row.type)
              }
            />
            <ButtonComponent
              variant={"reject"}
              textButton="رفض الطلب"
              small={true}
              onClick={
                () => {}
                //  handleClickGotoProductById(params.id, params.row.type)
              }
            />
          </div>
        );
      },
    },
  ];
  return (
    <main className="flex flex-col items-center justify-between w-full h-full flex-grow">
      <Title text={"إدارة طلبات المنتجات:"} />
      <section
        className="flex flex-col items-center justify-center w-full bg-white rounded-[30px] p-4 my-box-shadow gap-8"
        onClick={() => console.log(products)}
      >
        <div className="flex justify-end items-center w-full gap-4">
          <ButtonComponent
            textButton="رفض الكل"
            variant={"reject"}
            onClick={() => acceptOrRejectAll("reject-all")}
          />
          <ButtonComponent
            textButton="قبول الكل"
            variant={"accept"}
            onClick={() => acceptOrRejectAll("accept-all")}
          />
        </div>

        <DataTable columns={columns} rows={productsRows} />
      </section>
    </main>
  );
}

export default Request;
