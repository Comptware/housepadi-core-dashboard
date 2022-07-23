import styled from "styled-components";

export const TableWrapper = styled.div`
  height: ${(props) => (props.extendMinHeight ? "100%" : "")};
  width: 100%;
  padding-bottom: 30px;

  .hub-section-table {
    .rdt_TableCell,
    .rdt_TableCol,
    .rdt_TableCol_Sortable {
    }
    .rdt_TableCell:last-child,
    .rdt_TableCol:last-child,
    .rdt_TableCol_Sortable:last-child {
    }
  }

  .table-container {
    margin-bottom: 24px;
    background: #fff;
    border: 0.5px solid #e1e1e1;
    border-radius: 8px;
    width: 100%;
  }

  .rdt_Table {
    border-radius: 8px;
    height: 100%;
  }

  .rdt_TableHeadRow,
  .rdt_TableRow {
  }

  .rdt_TableHeadRow {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;

    .rdt_TableCol {
      font-family: "Helvetica Neue";
      font-style: normal;
      font-weight: 400;
      font-size: 12.5px;
      line-height: 19px;
      color: #65717c;
      height: 72px;
    }
  }

  .rdt_TableRow {
    .rdt_TableCell {
      font-family: "Helvetica Neue";
      font-style: normal;
      font-weight: 400;
      font-size: 12.5px;
      line-height: 19px;
      display: flex;
      align-items: center;
      color: #000000;
      height: 62px;
    }
  }
`;

export const PaginationWrapper = styled.div`
  .react-paginate {
    display: flex;

    .pagination-page-item,
    .page-item-break {
      margin-right: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      a {
        font-family: "Inter";
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        border-radius: 2px;
        color: #65717c;
        width: 33.49px;
        height: 42px;
        background: #fff;
        padding: 10px;
        text-align: center;
      }
    }

    .pagination-page-item.active-page {
      a {
        color: #000000;
      }
    }
  }
`;
