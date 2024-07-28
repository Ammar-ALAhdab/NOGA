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

const dropDownData = [
  { id: 1, type: "موبايل" },
  { id: 2, type: "إكسسوار" },
];

function AddProduct() {
  const handleClickBack = useGoToBack();

  return (
    <main className="flex flex-col items-center justify-between w-full h-full flex-grow gap-4">
      <Title text={"إضافة منتج:"} />
      <section className="flex items-center justify-center flex-col gap-4 w-full bg-white rounded-[30px] py-8 px-4 my-box-shadow">
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
            <div className="flex flex-col items-start justify-center gap-4">
              <DateInputComponent label={"تاريخ الإصدار:"} />
            </div>
            <div className="flex flex-col items-center justify-start gap-4">
              <TextInputComponent
                label={"الشركة المصنعة:"}
                id={"manufacture"}
                dir="ltr"
              />
            </div>
          </div>
        </div>
        <div className="w-full">
          <SectionTitle text={"المعالج:"} />
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="flex flex-col items-center justify-start gap-4">
              <TextInputComponent
                label={"اسم المعالج:"}
                id={"cpuType"}
                dir="ltr"
              />
            </div>
            <div className="flex flex-col items-start justify-center gap-4">
              <TextInputComponent
                label={"الشركة المصنعة:"}
                id={"cpuManufacture"}
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
