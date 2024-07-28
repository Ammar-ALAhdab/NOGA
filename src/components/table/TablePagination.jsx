import PropTypes from "prop-types";
import Pagination from "@mui/material/Pagination";

function TablePagination({ count = 5, handleChangePage, rowsName }) {
  return (
    <div className="w-[95%] flex items-center p-4">
      <div className="flex flex-1 justify-center items-center">
        <Pagination
          count={Math.ceil(count / 5)}
          showFirstButton
          showLastButton
          onChange={handleChangePage}
          shape="rounded"
          color="primary"
        />
      </div>
      <span className="w-[auto] font-bold">
        عدد {rowsName} :{count}
      </span>
    </div>
  );
}

TablePagination.propTypes = {
  count: PropTypes.number,
  handleChangePage: PropTypes.func,
  rowsName: PropTypes.string,
};


export default TablePagination;
