import DropDownComponent from "../../components/inputs/DropDownComponent";
import StatisticsBox from "../../components/layout/StatisticsBox";
import currencyFormatting from "../../util/currencyFormatting";
import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import DateInputComponent from "../../components/inputs/DateInputComponent";
import ButtonComponent from "../../components/buttons/ButtonComponent";
import Title from "../../components/titles/Title";

const time = [
  { id: 1, value: "year", title: "سنوية" },
  { id: 2, value: "month", title: "شهرية" },
  { id: 3, value: "day", title: "يومية" },
];

function ManagerStatistics() {
  const [branchEarnings, setBranchEarnings] = useState({ total_earning: 0 });
  const [branchIncomings, setBranchIncomings] = useState({
    total_income: 0,
  });
  const [periodTime, setPeriodTime] = useState("");
  const [dateTime, setDateTime] = useState("");
  const branchID = JSON.parse(localStorage.getItem("branchID"));
  const branchName = JSON.parse(localStorage.getItem("branchName"));
  const axiosPrivate = useAxiosPrivate();

  const getBranchEarnings = async (link) => {
    try {
      const response = await axiosPrivate.get(link);
      setBranchEarnings(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getBranchIncomings = async (link) => {
    try {
      const response = await axiosPrivate.get(link);
      setBranchIncomings(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const showStatistics = () => {
    getBranchEarnings(
      `/earnings/branches/${branchID}?${periodTime}=${dateTime}`
    );
    getBranchIncomings(
      `/income/branches/${branchID}?${periodTime}=${dateTime}`
    );
  };

  return (
    <section className="flex flex-col items-center justify-center gap-8 w-full bg-white rounded-[30px] p-4 my-box-shadow ">
      <Title text={`إحصائيات فرع: ${branchName}`} />
      <div className="flex flex-row-reverse items-center justify-end w-full gap-4">
        <DateInputComponent
          label={"التاريخ:"}
          value={dateTime}
          onChange={setDateTime}
        />
        <DropDownComponent
          label="الفترة الزمنية:"
          data={time}
          dataTitle={"title"}
          dataValue={"value"}
          ButtonText={"اختر الفترة"}
          value={periodTime}
          onSelect={setPeriodTime}
        />
      </div>
      <div className="flex items-center justify-center w-full">
        <ButtonComponent
          textButton="عرض الإحصائيات"
          variant={"show"}
          onClick={showStatistics}
        />
      </div>
      <div className="flex flex-row-reverse items-center justify-end w-full gap-4">
        <StatisticsBox
          type={"orangeGold"}
          value={currencyFormatting(branchEarnings.total_earning)}
        />
        <StatisticsBox
          type={"topazManager"}
          value={currencyFormatting(branchIncomings.total_income)}
        />
        <StatisticsBox type={"lavender"} />
        <StatisticsBox type={"halloweenOrange"} />
      </div>
    </section>
  );
}

export default ManagerStatistics;
