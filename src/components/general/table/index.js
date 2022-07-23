import DataTable, { createTheme } from "react-data-table-component";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";
import { TableWrapper, PaginationWrapper } from "./table.style";

createTheme("default", {
  text: {
    primary: "#65717c",
    secondary: "#000000",
  },
  background: {
    default: "transparent",
  },
  divider: {
    default: "rgba(245, 246, 250, 1);",
  },
  action: {
    hover: "yellow",
  },
});

export default function Table({
  columns,
  data,
  extendMinHeight,
  isLoading,
  extraChild,
  pageCount,
  onPageChange,
  currentPage,
  tableClassName,
  isAlt,
  ...rest
}) {
  return (
    <TableWrapper extendMinHeight={extendMinHeight}>
      <div className={`${isAlt ? "" : "table-container"} ${tableClassName}`}>
        <DataTable
          columns={columns}
          data={data}
          theme="default"
          progressPending={isLoading}
          progressComponent={<h1>Loading...</h1>}
          {...rest}
        />
        {extraChild}
      </div>

      {pageCount && pageCount > 1 ? (
        <PaginationWrapper>
          <ReactPaginate
            className="react-paginate"
            pageClassName="pagination-page-item"
            activeClassName="active-page"
            breakLabel="..."
            nextLabel={null}
            onPageChange={(page) => onPageChange(page.selected + 1)} // Library uses zero index for page number
            pageRangeDisplayed={7}
            marginPagesDisplayed={3}
            pageCount={pageCount}
            previousLabel={null}
            forcePage={currentPage - 1} // Library uses zero index for page number
            breakClassName="page-item-break"
            renderOnZeroPageCount={null}
          />
        </PaginationWrapper>
      ) : null}
    </TableWrapper>
  );
}

Table.propTypes = {
  extendMinHeight: PropTypes.bool,
  columns: PropTypes.array,
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  rest: PropTypes.object,
  extraChild: PropTypes.elementType,
  pageCount: PropTypes.number,
  onPageChange: PropTypes.func,
  currentPage: PropTypes.number,
  isAlt: PropTypes.bool,
  tableClassName: PropTypes.string,
};
