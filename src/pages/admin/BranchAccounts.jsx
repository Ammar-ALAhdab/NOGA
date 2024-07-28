import CardBox from "../../components/layout/CardBox";
import Title from "../../components/titles/Title";
import adminAccount from "../../assets/admin/admin_acc.svg";
import salesAccounts from "../../assets/admin/sales_acc.svg";
import useLocationState from "../../hooks/useLocationState";
import ButtonComponent from "../../components/buttons/ButtonComponent";
import useGoToBack from "../../hooks/useGoToBack";

const boxes = [
  {
    text: "حساب مدير الفرع",
    color: "#7049A3",
    icon: adminAccount,
    link: "MangerAccount",
  },
  {
    text: "حسابات موظفين المبيعات",
    color: "#D9A322",
    icon: salesAccounts,
    link: "SalesAccounts",
  },
];

function BranchAccounts() {
  const branch = useLocationState();
  const handleClickBack = useGoToBack();
  return (
    <main className="flex flex-col items-center justify-between w-full h-full flex-grow gap-4">
      <Title
        text={`إدارة الحسابات - شركة نوجا تيك فرع: ${branch?.city_name} ${branch?.number}`}
      />
      <section className="flex flex-row-reverse flex-wrap items-center justify-center gap-16 w-full py-8 px-4">
        {boxes.map((box) => {
          return (
            <CardBox
              key={box.text}
              icon={box.icon}
              color={box.color}
              text={box.text}
              link={box.link}
              data={branch}
            />
          );
        })}
        <div className="w-full flex justify-end items-center">
          <ButtonComponent variant={"back"} onClick={handleClickBack} />
        </div>
      </section>
    </main>
  );
}

export default BranchAccounts;
