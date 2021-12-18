const Pagination = ({
  currentPage,
  totalPages,
  backPage,
  nextPage,
  goToPage,
}) => {
  const goToFirstPage = (e) => goToPage(e, 1);
  const goToFinalpage = (e) => goToPage(e, totalPages);
  return <div classname="pagination"></div>;
};
