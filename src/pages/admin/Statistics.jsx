import DropDownComponent from "../../components/inputs/DropDownComponent";
import StatisticsBox from "../../components/layout/StatisticsBox";
import currencyFormatting from "../../util/currencyFormatting";
import SectionTitle from "../../components/titles/SectionTitle";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import BarChartComponent from "../../components/charts/BarChartComponent";

function Statistics() {
  const [totalEarnings, setTotalEarnings] = useState({});
  const [branchesEarnings, setBranchesEarnings] = useState({});
  const [branchesIncomings, setBranchesIncomings] = useState({});

  const axiosPrivate = useAxiosPrivate();

  const getStatistics = async (link) => {
    try {
      const response = await axiosPrivate.get(link);
      if (link == "/earnings") {
        setTotalEarnings(response.data);
      } else if (link == "/earnings/branches") {
        setBranchesEarnings(response.data);
      } else {
        setBranchesIncomings(response.data);
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStatistics("/earnings");
    getStatistics("/earnings/branches");
    getStatistics("/income/branches");
  }, []);

  return (
    <section className="flex flex-col items-center justify-center gap-8 w-full bg-white rounded-[30px] p-4 my-box-shadow ">
      <div className="flex flex-row-reverse items-center justify-end w-full gap-4">
        <DropDownComponent label="المدة الزمنية:" data={[]} />
        <DropDownComponent label="سنة:" data={[]} />
      </div>
      <div className="flex flex-row-reverse items-center justify-end w-full gap-4">
        <StatisticsBox
          type={"orangeGold"}
          value={currencyFormatting(totalEarnings.total_earning)}
        />
        <StatisticsBox type={"lavender"} />
        <StatisticsBox type={"halloweenOrange"} />
        <StatisticsBox type={"topaz"} />
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-4">
        <SectionTitle text={"المخططات البيانية:"} />
        <div className="w-full flex flex-wrap items-center justify-center">
          <BarChartComponent
            data={branchesEarnings}
            fill="#7049A3"
            hoverFill="#D9A322"
            dataKey="total_earning"
            Yvalue="الأرباح بالليرة السورية"
            title="الأرباح للأفرع"
          />
          <BarChartComponent
            data={branchesIncomings}
            fill="#2DBDA8"
            hoverFill="#D9A322"
            dataKey="total"
            Yvalue="العائدات بالليرة السورية"
            title="العائدات للأفرع"
          />
        </div>
      </div>
    </section>
  );
}

export default Statistics;
