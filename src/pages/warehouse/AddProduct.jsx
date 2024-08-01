import ButtonComponent from "../../components/buttons/ButtonComponent";
import DropDownComponent from "../../components/inputs/DropDownComponent";
import TextInputComponent from "../../components/inputs/TextInputComponent";
import Title from "../../components/titles/Title";
import useGoToBack from "../../hooks/useGoToBack";
import NumberInputComponent from "../../components/inputs/NumberInputComponent";
import SectionTitle from "../../components/titles/SectionTitle";
import DateInputComponent from "../../components/inputs/DateInputComponent";
import CheckInputComponent from "../../components/inputs/CheckInputComponent";
import TextAreaComponent from "../../components/inputs/TextAreaComponent";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import useToast from "../../hooks/useToast";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const dropDownData = [
  { id: 1, type: "موبايل" },
  { id: 2, type: "إكسسوار" },
];

const initDetailsSittings = {
  show: false,
  value: "",
  type: "",
  title: "",
  inputLabel: "",
};

const DETAILS_BODY_REQUEST = {
  phone_brands: "brand_name",
  cpus: "CPU_brand",
  colors: "color",
};

function AddProduct() {
  const handleClickBack = useGoToBack();
  //START: THIS STATES FOR ADDING BRAND MANUFACTURE, CPU OR COLOR
  const [addDetailsSettings, setDetailsSettings] =
    useState(initDetailsSittings);
  const [scrollTop, setScrollTop] = useState(0);
  const [brands, setBrands] = useState([]);
  const [CPUS, setCPUS] = useState([]);
  const [colors, setColors] = useState([]);
  //END: THIS STATES FOR ADDING BRAND MANUFACTURE, CPU OR COLOR
  const Toast = useToast();
  const axiosPrivate = useAxiosPrivate();

  //START: THIS LOGIC FOR ADDING BRAND MANUFACTURE, CPU OR COLOR

  const updateDetailsSettings = (settingObject) => {
    setDetailsSettings((prevState) => ({
      ...prevState,
      ...settingObject,
    }));
  };

  const updateDetailsValue = (value) => {
    setDetailsSettings((prevState) => ({
      ...prevState,
      value,
    }));
  };

  const handleAddingDetails = () => {
    addDetails(addDetailsSettings);
    handleCloseAddBox();
  };

  const getDetails = async (link, storeData) => {
    try {
      const response = await axiosPrivate.get(link);
      if (storeData == "phone_brands") {
        setBrands((prev) => [...prev, ...response.data.results]);
      } else if (storeData == "cpus") {
        setCPUS((prev) => [...prev, ...response.data.results]);
      } else  if (storeData == "colors") {
        setColors((prev) => [...prev, ...response.data.results]);
      }
      if (response.data.next) {
        getDetails(response.data.next);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addDetails = async (detail) => {
    try {
      await axiosPrivate.post(
        `/${detail.type}`,
        JSON.stringify({ [DETAILS_BODY_REQUEST[detail.type]]: detail.value })
      );
      if (detail.type == "phone_brands") {
        setBrands([]);
      } else if (detail.type == "cpus") {
        setCPUS([]);
      } else {
        setColors([]);
      }
      getDetails(`/${detail.type}`, detail.type);
      setDetailsSettings(initDetailsSittings);
      Toast.fire({
        icon: "success",
        title: "تمت عملية الإضافة بنجاح",
      });
    } catch (error) {
      console.log(error);
      if (error?.response?.status === 400) {
        const errorMassage = error?.response?.data;
        const arr = [];
        Object.entries(errorMassage).forEach(([fieldName, messages]) => {
          const errorMessage = fieldName + " " + messages.join(" ");
          arr.push(errorMessage);
        });
        Toast.fire({
          icon: "error",
          title: `${arr.join(" ")}`,
        });
      }
      if (error?.response?.status === 403) {
        const errorMassage = error?.response?.data?.detail;
        Toast.fire({
          icon: "error",
          title: `${errorMassage}`,
        });
      }
    }
  };

  const handleShowAddBox = (title, inputLabel, type) => {
    updateDetailsSettings({ show: true, title, inputLabel, type });
    document.body.style.overflow = "hidden";
    setScrollTop(document.documentElement.scrollTop);
    document.documentElement.scrollTop = 0;
    console.log(colors);
  };

  const handleCloseAddBox = () => {
    updateDetailsSettings({ show: false });
    document.body.style.overflow = "auto";
    setTimeout(() => {
      document.documentElement.scrollTop = scrollTop;
    }, 300);
  };

  useEffect(() => {
    getDetails("/phone_brands", "phone_brands");
    getDetails("/cpus", "cpus");
    getDetails("/colors", "colors");
  }, []);

  //END: THIS LOGIC FOR ADDING BRAND MANUFACTURE, CPU OR COLOR

  return (
    <main className="flex flex-col items-center justify-between w-full h-full flex-grow gap-4">
      <Title text={"إضافة منتج:"} />
      <section className="flex items-center justify-center flex-col gap-4 w-full bg-white rounded-[30px] py-8 px-4 my-box-shadow">
        {/* ################################### Start Add Box ################################### */}

        <div
          className="absolute my-filter-box flex flex-col items-center justify-center w-full h-full p-4 z-[200]"
          style={{
            opacity: addDetailsSettings.show ? 1 : 0,
            visibility: addDetailsSettings.show ? "visible" : "hidden",
          }}
        >
          <div className="flex flex-col items-center justify-center gap-2 relative w-fit pl-8 pr-8 pb-8 pt-4 rounded-3xl bg-white my-box-shadow">
            <SectionTitle text={addDetailsSettings?.title} />
            <button
              className="absolute top-3 left-3 w-8 h-8 bg-halloweenOrange text-white z-100 rounded-full"
              onClick={handleCloseAddBox}
            >
              <FontAwesomeIcon icon={faX} />
            </button>
            <div className="flex flex-row-reverse items-center justify-start gap-2 w-full">
              <TextInputComponent
                label={addDetailsSettings?.inputLabel}
                value={addDetailsSettings.value}
                onChange={updateDetailsValue}
              />
              <ButtonComponent onClick={handleAddingDetails} />
            </div>
          </div>
        </div>

        {/* ################################### END Add Box ################################### */}
        <div className="w-full">
          <SectionTitle text={"معلومات المنتج العامة:"} />
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="flex flex-col items-end justify-start gap-4">
              <NumberInputComponent label={"الكمية:"} id={"quantity"} />
              <TextInputComponent
                label={"سعر التكلفة:"}
                id={"capitalPrice"}
                dir={"ltr"}
              />
              <TextInputComponent
                label={"سعر المبيع:"}
                id={"sellingPrice"}
                dir={"ltr"}
              />
            </div>
            <div className="flex flex-col items-start justify-start gap-4">
              <TextInputComponent label={"اسم المنتج:"} id={"productName"} />
              <DropDownComponent
                data={dropDownData}
                dataProp={"type"}
                ButtonText={"اختر النوع"}
                label={"النوع:"}
              />
            </div>
          </div>
        </div>
        <div className="w-full">
          <SectionTitle text={"معلومات المنتج التفصيلية:"} />
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="flex flex-col items-center justify-start gap-4">
              <ButtonComponent
                textButton={"إضافة شركة مصنعة"}
                onClick={() =>
                  handleShowAddBox(
                    "إضافة شركة مصنعة جديدة:",
                    "الشركة المصنعة:",
                    "phone_brands"
                  )
                }
              />
            </div>
            <div className="flex flex-col items-center justify-start gap-4">
              <DropDownComponent
                data={brands}
                dataTitle={"brand_name"}
                dataValue={"id"}
                label={"الشركة المصنعة:"}
                ButtonText="اختر الشركة"
              />
              <DateInputComponent label={"تاريخ الإصدار:"} />
            </div>
          </div>
        </div>
        <div className="w-full">
          <SectionTitle text={"المعالج:"} />
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="flex flex-col items-center justify-start gap-4">
              <ButtonComponent
                textButton={"إضافة شركة مصنعة للمعالج"}
                onClick={() =>
                  handleShowAddBox(
                    "إضافة شركة مصنعة للمعالج جديدة:",
                    "الشركة المصنعة:",
                    "cpus"
                  )
                }
              />
            </div>
            <div className="flex flex-col items-start justify-center gap-4">
              <DropDownComponent
                data={CPUS}
                dataTitle={"CPU_brand"}
                dataValue={"id"}
                label={"الشركة المصنعة للمعالج:"}
                ButtonText="اختر الشركة"
              />
              <TextInputComponent
                label={"اسم المعالج:"}
                id={"cpuType"}
                dir="ltr"
              />
            </div>
          </div>
        </div>
        <div className="w-full">
          <SectionTitle text={"الذاكرة والتخزين:"} />
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="flex flex-col items-center justify-start gap-4">
              <TextInputComponent
                label={"سعة التخزين الداخلي:"}
                id={"storage"}
                dir="ltr"
              />
            </div>
            <div className="flex flex-col items-start justify-center gap-4">
              <TextInputComponent
                label={"سعة ذاكرة الوصول العشوائي:"}
                id={"ram"}
                dir="ltr"
              />
              <CheckInputComponent
                label={"دعم ذاكرة خارجية SD:"}
                id={"sdCard"}
              />
            </div>
          </div>
        </div>
        <div className="w-full">
          <SectionTitle text={"الكاميرا:"} />
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="flex flex-col items-start justify-center gap-4">
              <TextInputComponent
                label={"دقة الكاميرا الخلفية:"}
                id={"backCamera"}
                dir="ltr"
              />
            </div>
            <div className="flex flex-col items-center justify-start gap-4">
              <TextInputComponent
                label={"دقة الكاميرا الأمامية:"}
                id={"frontCamera"}
                dir="ltr"
              />
            </div>
          </div>
        </div>
        <div className="w-full">
          <SectionTitle text={"شاشة العرض:"} />
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="flex flex-col items-start justify-center gap-4">
              <TextInputComponent
                label={"حجم الشاشة:"}
                id={"screenSize"}
                dir="ltr"
              />
            </div>
            <div className="flex flex-col items-center justify-start gap-4">
              <TextInputComponent
                label={"نوع الشاشة:"}
                id={"screenType"}
                dir="ltr"
              />
            </div>
          </div>
        </div>
        <div className="w-full">
          <SectionTitle text={"البطارية:"} />
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="flex flex-col items-start justify-center gap-4"></div>
            <div className="flex flex-col items-center justify-start gap-4">
              <TextInputComponent
                label={"سعة البطارية:"}
                id={"battery"}
                dir="ltr"
              />
            </div>
          </div>
        </div>
        <div className="w-full">
          <SectionTitle text={"شرائح الاتصال:"} />
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="flex flex-col items-start justify-center gap-4"></div>
            <div className="flex flex-col items-end justify-center gap-4">
              <NumberInputComponent
                label={"عدد شرائح الاتصال:"}
                id={"simCard"}
                dir="ltr"
                min={1}
                max={3}
              />
            </div>
          </div>
        </div>
        <div className="w-full">
          <SectionTitle text={"المعالج:"} />
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="flex flex-col items-center justify-start gap-4">
              <ButtonComponent
                textButton={"إضافة لون جديد"}
                onClick={() =>
                  handleShowAddBox(
                    "إضافة لون جديد:",
                    "اللون:",
                    "colors"
                  )
                }
              />
            </div>
            <div className="flex flex-col items-start justify-center gap-4">
              <DropDownComponent
                data={colors}
                dataTitle={"color"}
                dataValue={"id"}
                label={"اللون:"}
                ButtonText="اختر اللون"
              />
            </div>
          </div>
        </div>
        <div className="w-full">
          <SectionTitle text={"الوصف:"} />
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="flex flex-col items-start justify-center gap-4"></div>
            <div className="flex flex-col items-end justify-center gap-4">
              <TextAreaComponent id={"details"} />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-4 w-full mt-8">
          <ButtonComponent variant={"back"} onClick={handleClickBack} />
          <ButtonComponent variant={"add"} type={"submit"} />
        </div>
      </section>
    </main>
  );
}

export default AddProduct;
