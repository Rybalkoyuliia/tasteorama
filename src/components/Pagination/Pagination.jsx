import React from "react";
import { useDispatch } from "react-redux";
import { fetchRecipesThunk } from "../../redux/operations/recipesOperation";
import s from "./Pagination.module.css";

const Pagination = ({ total, filters }) => {
  const dispatch = useDispatch();
  const { page, totalItems, perPage } = total;

  const totalPages = Math.ceil(totalItems / perPage);
  const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);

  const choosePage = (pageNum) => {
    if (pageNum === page) return;
    dispatch(fetchRecipesThunk({ page: pageNum, perPage: 12, ...filters }));
  };

  const handlePrevPage = () => {
    if (page <= 1) return;
    choosePage(page - 1);
  };

  const handleNextPage = () => {
    if (page >= totalPages) return;
    choosePage(page + 1);
  };

  const getVisiblePages = (currentPage, totalPages) => {
    if (totalPages <= 6) return pagesArray;

    if (currentPage <= 3) {
      return pagesArray.slice(0, 6);
    }

    if (currentPage >= totalPages - 2) {
      return pagesArray.slice(totalPages - 6);
    }

    return pagesArray.slice(currentPage - 3, currentPage + 3);
  };

  const visiblePages = getVisiblePages(page, totalPages);

  return (
    <div className={s.pagination_container}>
      <ul className={s.pagination_list}>
        {totalPages > 6 && (
          <li className={s.pagination_arrow_item}>
            <button
              className={`${s.arrow_btn} ${page > 1 ? s.isActive : s.disabled}`}
              onClick={handlePrevPage}
              disabled={page <= 1}
            >
              <svg width="24" height="24">
                <use href="/sprite.svg#arrow-left" />
              </svg>
            </button>
          </li>
        )}

        {visiblePages.map((pageNum) => (
          <li key={pageNum}>
            <button
              className={`${s.pagination_btn} ${
                pageNum === page ? s.isActive : ""
              }`}
              onClick={() => choosePage(pageNum)}
            >
              {pageNum}
            </button>
          </li>
        ))}

        {totalPages > 6 && (
          <li className={s.pagination_arrow_item}>
            <button
              className={`${s.arrow_btn} ${
                page < totalPages ? s.isActive : s.disabled
              }`}
              onClick={handleNextPage}
              disabled={page >= totalPages}
            >
              <svg width="24" height="24">
                <use href="/sprite.svg#arrow-right" />
              </svg>
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Pagination;
