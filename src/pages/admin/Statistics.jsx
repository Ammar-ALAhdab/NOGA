import DropDownComponent from "../../components/inputs/DropDownComponent";
import StatisticsBox from "../../components/layout/StatisticsBox";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import currencyFormatting from "../../util/currencyFormatting";
import SectionTitle from "../../components/titles/SectionTitle";

const chartSetting = {
  yAxis: [
    {
      label: "الأرباح بالليرة سورية",
    },
  ],
  width: 800,
  height: 400,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-60px, 0)",
      fill: "#2DBDA8",
    },
  },
};

const dataset = [
  {
    "حمص 1": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    "دمشق 1": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    "حمص 2": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    "اللاذقية 1": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    month: "Jan",
  },
  {
    "حمص 1": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    "دمشق 1": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    "حمص 2": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    "اللاذقية 1": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    month: "Feb",
  },
  {
    "حمص 1": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    "دمشق 1": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    "حمص 2": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    "اللاذقية 1": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    month: "Mar",
  },
  {
    "حمص 1": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    "دمشق 1": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    "حمص 2": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    "اللاذقية 1": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    month: "Apr",
  },
  {
    "حمص 1": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    "دمشق 1": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    "حمص 2": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    "اللاذقية 1": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    month: "May",
  },
  {
    "حمص 1": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    "دمشق 1": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    "حمص 2": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    "اللاذقية 1": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    month: "June",
  },
  {
    "حمص 1": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    "دمشق 1": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    "حمص 2": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    "اللاذقية 1": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    month: "July",
  },
  {
    "حمص 1": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    "دمشق 1": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    "حمص 2": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    "اللاذقية 1": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    month: "Aug",
  },
  {
    "حمص 1": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    "دمشق 1": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    "حمص 2": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    "اللاذقية 1": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    month: "Sept",
  },
  {
    "حمص 1": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    "دمشق 1": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    "حمص 2": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    "اللاذقية 1": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    month: "Oct",
  },
  {
    "حمص 1": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    "دمشق 1": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    "حمص 2": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    "اللاذقية 1": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    month: "Nov",
  },
  {
    "حمص 1": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    "دمشق 1": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    "حمص 2": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    "اللاذقية 1": Math.floor(Math.random() * (90000000 - 30000000)) + 30000000,
    month: "Dec",
  },
];

console.log(dataset)

function Statistics() {
  const valueFormatter = (value) => currencyFormatting(value);
  return (
    <section className="flex flex-col items-center justify-center gap-8 w-full bg-white rounded-[30px] p-4 my-box-shadow ">
      <div className="flex flex-row-reverse items-center justify-end w-full gap-4">
        <DropDownComponent label="المدة الزمنية:" data={[]} />
        <DropDownComponent label="سنة:" data={[]} />
      </div>
      <div className="flex flex-row-reverse items-center justify-end w-full gap-4">
        <StatisticsBox type={"orangeGold"} />
        <StatisticsBox type={"lavender"} />
        <StatisticsBox type={"halloweenOrange"} />
        <StatisticsBox type={"topaz"} />
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-4">
        <SectionTitle text={"رسم بياني للأرباح حسب كل فرع:"} />
        <div className="w-full flex items-center justify-center">
          <BarChart
            dataset={dataset}
            xAxis={[{ scaleType: "band", dataKey: "month" }]}
            series={[
              {
                dataKey: "حمص 1",
                label: "حمص 1",
                valueFormatter,
              },
              { dataKey: "دمشق 1", label: "دمشق 1", valueFormatter },
              {
                dataKey: "حمص 2",
                label: "حمص 2",
                valueFormatter,
              },
              { dataKey: "اللاذقية 1", label: "اللاذقية 1", valueFormatter },
            ]}
            {...chartSetting}
          />
        </div>
      </div>
    </section>
  );
}

export default Statistics;
