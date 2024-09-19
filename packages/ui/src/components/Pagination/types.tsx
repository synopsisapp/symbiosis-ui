import type { Sizes } from "../../designSystemTokens";

export type PaginationProps = {
  total: number;
  initialPage?: number;
  onPageChange?: (page: number) => void;
  size?: Sizes;
  hasEdges?: boolean;
  className?: string;
};
