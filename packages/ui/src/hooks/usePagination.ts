import * as React from "react";

export const DOTS = "dots";

export type PaginationParams = {
  initialPage?: number;
  page?: number;
  total: number;
  siblings?: number;
  boundaries?: number;
  onChange?: (page: number) => void;
};

export function usePagination({
  total,
  siblings = 1,
  boundaries = 1,
  page,
  initialPage = 1,
  onChange,
}: PaginationParams) {
  const _total = Math.max(Math.trunc(total), 0);
  const [activePage, setActivePage] = React.useState(
    Math.min(page || initialPage, _total),
  );

  const setPage = (pageNumber: number) => {
    if (pageNumber <= 0) {
      setActivePage(1);
    } else if (pageNumber > _total) {
      setActivePage(_total);
    } else {
      setActivePage(pageNumber);
    }
    onChange?.(pageNumber);
  };

  const next = () => setPage(activePage + 1);
  const previous = () => setPage(activePage - 1);
  const first = () => setPage(1);
  const last = () => setPage(_total);

  const range = React.useCallback((start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => start + idx);
  }, []);

  const paginationRange = React.useMemo((): (number | "dots")[] => {
    if (siblings === 0 && boundaries === 0) {
      const result: (number | "dots")[] = [];
      result.push(1);
      if (_total > 1) {
        if (activePage !== 1 && activePage !== _total) {
          result.push("dots");
        }
        if (activePage !== 1 && activePage !== _total) {
          result.push(activePage);
        }
        if (activePage !== _total) {
          result.push("dots");
        }
        result.push(_total);
      }
      return result;
    }

    const totalPageNumbers = siblings * 2 + 3 + boundaries * 2;
    if (_total <= totalPageNumbers) {
      return range(1, _total);
    }

    const leftSiblingIndex = Math.max(activePage - siblings, 1 + boundaries);
    const rightSiblingIndex = Math.min(
      activePage + siblings,
      _total - boundaries,
    );

    const shouldShowLeftDots = leftSiblingIndex > boundaries + 2;
    const shouldShowRightDots = rightSiblingIndex < _total - boundaries;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = siblings * 2 + boundaries + 2;
      const rightItemCount = boundaries + 1;
      return [
        ...range(1, leftItemCount),
        DOTS,
        ...range(_total - rightItemCount + 2, _total),
      ];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const leftItemCount = boundaries + 1;
      const rightItemCount = siblings * 2 + boundaries + 2;
      return [
        ...range(1, leftItemCount),
        DOTS,
        ...range(_total - rightItemCount + 2, _total),
      ];
    }

    return [
      ...range(1, boundaries),
      DOTS,
      ...range(leftSiblingIndex, rightSiblingIndex),
      DOTS,
      ...range(_total - boundaries + 1, _total),
    ];
  }, [_total, siblings, activePage, boundaries, range]);

  return {
    range: paginationRange,
    active: activePage,
    setPage,
    next,
    previous,
    first,
    last,
  };
}
