import { useState } from "react";
import ButtonComponent from "../../components/buttons/ButtonComponent";
import DropDownComponent from "../../components/inputs/DropDownComponent";
import SectionTitle from "../../components/titles/SectionTitle";
import Title from "../../components/titles/Title";
import NumberInputComponent from "../../components/inputs/NumberInputComponent";
import DataTable from "../../components/table/DataTable";
import TextAreaComponent from "../../components/inputs/TextAreaComponent";
import useGoToBack from "../../hooks/useGoToBack";
import SearchComponent from "../../components/inputs/SearchComponent";

function SendProducts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const handleSearchClick = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleClickBack = useGoToBack();

  const formatting = (selectedProducts) => {
    const rowsData = selectedProducts.map((row) => ({
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
      field: "productName",
      headerName: "اسم المنتج",
      flex: 1,
    },
    {
      field: "type",
      headerName: "تصنيف",
      flex: 1,
    },
    {
      field: "price",
      headerName: "السعر",
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "الكمية",
      flex: 1,
    },

    {
      field: "barcode",
      headerName: "رقم الباركود",
      flex: 1,
    },
    {
      field: "options",
      headerName: "خيارات",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        return <></>;
      },
    },
  ];

  return (
    <main className="flex flex-col items-center justify-between w-full h-full flex-grow gap-4">
      <Title text={"إرسال منتجات:"} />
      <section className="flex items-center justify-center flex-col gap-4 w-full bg-white rounded-[30px] py-8 px-4 my-box-shadow">
        <div className="w-full">
          <SectionTitle text={"اختر الفرع:"} />
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="flex flex-col items-start justify-center gap-4">
              <DropDownComponent
                data={[]}
                label={"رقم الفرع:"}
                id={"branchNumber"}
                dir="ltr"
              />
            </div>
            <div className="flex flex-col items-center justify-start gap-4">
              <DropDownComponent
                data={[]}
                label={"مدينة:"}
                id={"city"}
                dir="ltr"
              />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-end justify-center mb-4">
          <SectionTitle text={"اختر المنتجات:"} />
          <div className="w-full flex flex-col items-center justify-center gap-4">
            <SearchComponent
              onChange={setSearchQuery}
              value={searchQuery}
              onClickSearch={handleSearchClick}
            />
            {searchQuery ? (
              <DataTable columns={columns} rows={selectedProducts} />
            ) : null}
          </div>
        </div>
        {searchQuery ? (
          <div className="w-full flex items-center justify-end gap-16">
            <ButtonComponent variant={"add"} />
            <NumberInputComponent
              label={"الكمية المراد إضافتها:"}
              id="quantity"
            />
          </div>
        ) : null}
        <div className="w-full flex flex-col items-center justify-start">
          <SectionTitle text={"المنتجات المختارة:"} />
          <DataTable columns={columns} rows={selectedProducts} />
        </div>
        <div className="w-full flex flex-col items-center justify-start">
          <SectionTitle text={"إضافة ملاحظة:"} />
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="flex flex-col items-start justify-center gap-4"></div>
            <div className="flex flex-col items-end justify-center gap-4">
              <TextAreaComponent id={"details"} />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 w-full mt-8">
          <ButtonComponent variant={"back"} onClick={handleClickBack} />
          <ButtonComponent variant={"procedure"} />
        </div>
      </section>
    </main>
  );
}

export default SendProducts;
