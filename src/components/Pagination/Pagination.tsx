import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedPage: number) => void;
}

const Pagination = ({ pageCount, onPageChange }: PaginationProps) => {
  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected + 1); // react-paginate індексує сторінки з 0
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="→"
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      pageCount={pageCount}
      previousLabel="←"
      renderOnZeroPageCount={null}
      containerClassName={css.pagination}
      pageLinkClassName={css.pageLink}
      previousLinkClassName={css.pageLink}
      nextLinkClassName={css.pageLink}
      activeLinkClassName={css.active}
      disabledClassName={css.disabled}
    />
  );
};

export default Pagination;
