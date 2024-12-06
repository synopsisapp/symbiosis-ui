import * as React from "react";
import { IconButton } from "../IconButton";
import { Icon } from "../Icon";
import { usePagination } from "../../hooks/usePagination";
import { cn } from "../../utils/cn";
import type { PaginationProps } from "./types";

const Pagination = ({
  total,
  initialPage = 1,
  onPageChange,
  size = "base",
  hasEdges = true,
  className,
}: PaginationProps) => {
  const [activePage, setActivePage] = React.useState(initialPage);
  const { range, setPage, next, previous } = usePagination({
    initialPage,
    onChange: setActivePage,
    total,
  });

  const isFirst = activePage === 1;
  const isLast = activePage === total;

  // biome-ignore lint/correctness/useExhaustiveDependencies: it only reruns when activePage changes
  React.useEffect(() => {
    if (activePage === initialPage) {
      return;
    }
    onPageChange?.(activePage);
  }, [activePage]);

  return (
    <div className={cn("flex gap-2 items-center", className)}>
      {hasEdges && (
        <IconButton
          variant="ghost"
          size={size}
          isDisabled={isFirst}
          onPress={() => previous()}
          icon="symbiosis-chevron-left"
          tone="monochrome-dark"
        />
      )}
      {range.map((page, idx) => {
        if (page === "dots") {
          return <Icon name="symbiosis-dots" size={size} className="text-slate-700" key={idx + page} />;
        }

        return (
          <IconButton
            variant={activePage === page ? "outline" : "ghost"}
            size={size}
            onPress={() => setPage(page)}
            key={page}
            value={page}
            tone="monochrome-dark"
          />
        );
      })}
      {hasEdges && (
        <IconButton
          variant="ghost"
          size={size}
          isDisabled={isLast}
          onPress={() => next()}
          icon="symbiosis-chevron-right"
          tone="monochrome-dark"
        />
      )}
    </div>
  );
};

Pagination.displayName = "Pagination";

export { Pagination };
