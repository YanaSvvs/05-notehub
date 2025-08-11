import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedPage: number) => void;
  currentPage: number; 
}

const Pagination = ({
  pageCount,
  onPageChange,
  currentPage,
}: PaginationProps) => {
  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected + 1); 
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="→"
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      pageCount={pageCount}
      forcePage={currentPage - 1} 
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