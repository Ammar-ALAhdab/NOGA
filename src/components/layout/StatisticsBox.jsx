import PropTypes from "prop-types";

const variant = {
  orangeGold: {
    color:
      "linear-gradient(120deg, rgba(249,200,85,1) 29%, rgba(217,163,34,1) 69%)",
    text: "صافي الأرباح",
    icon: "",
  },
  lavender: {
    color:
      "linear-gradient(120deg, rgba(165,104,245,1) 29%, rgba(112,73,163,1) 69%)",
    text: "المنتجات المباعة",
    icon: "",
  },
  halloweenOrange: {
    color:
      "linear-gradient(120deg, rgba(249,141,97,1) 29%, rgba(231,109,59,1) 69%)",
    text: "المنتج الأكثر شعبية",
    icon: "",
  },
  topaz: {
    color:
      "linear-gradient(120deg, rgba(88,236,214,1) 29%, rgba(45,189,168,1) 69%",
    text: "الزبائن الجدد",
    icon: "",
  },
};

function StatisticsBox({ type }) {
  return (
    <div
      className="w-1/4 h-[150px] rounded-3xl flex justify-center items-center p-4"
      style={{ background: variant[type].color }}
    >
      <h2 className="text-white font-bold">:{variant[type].text}</h2>
    </div>
  );
}

StatisticsBox.propTypes = {
  type: PropTypes.string,
};

export default StatisticsBox;
