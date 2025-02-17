import type {
  AccessorFn,
  CellContext,
  ColumnPinningState,
  SortDirection,
  SortingFnOption,
  SortingState,
} from "@tanstack/react-table";
import type { IconProps } from "../Icon/types";

export type SortStatus = false | SortDirection;

export type ColumnProps<TData, TValue> = {
  id: string;
  accessorFn?: AccessorFn<TData, TValue>;
  header?: string;
  isSortable?: boolean;
  sortingFn?: SortingFnOption<TData>;
} & (
  | {
      type: "cell";
      cell: (item: CellContext<TData, TValue>) => React.ReactNode;
    }
  | {
      type: "text";
      text: (item: CellContext<TData, TValue>) => string | number;
    }
);

export type ActionMenu<TData> =
  | {
      text: string;
      icon?: IconProps["name"];
      onSelect: (item: TData) => void;
      wrapperClassName?: string;
      isSeparated?: boolean;
    }
  | undefined;

export type ActionColumnProps<TData, TValue> =
  | ActionTextColumnProps<TData>
  | ActionCellColumnProps<TData, TValue>;

export type ActionTextColumnProps<TData> = {
  id: "actions";
  item: (item: TData) => ActionMenu<TData>[];
  type: "text";
};

export type ActionCellColumnProps<TData, TValue> = {
  id: "actions";
  type: "cell";
  cell: (item: CellContext<TData, TValue>) => React.ReactNode;
};

export type DataTableColumnProps<TData, TValue> = (
  | ColumnProps<TData, TValue>
  | ActionColumnProps<TData, TValue>
) & {
  onSort?: (sorting: SortStatus, columnId: string) => void;
};

export type DataTableProps<TData, TValue> = {
  data: TData[];
  columns: DataTableColumnProps<TData, TValue>[];
  maxPerPage?: number;
  pinningState?: ColumnPinningState;
  hiddenHeader?: boolean;
  isSelectable?: boolean;
  isSearchable?: boolean;
  headerActions?: ActionMenu<TData[]>[];
  onRowSelectionChange?: (rows: TData[]) => void;
  defaultSelectedRows?: TData[];
  defaultSorting?: SortingState;
  getRowId?: (data: TData) => string;
  noResultsFoundText?: string;
  quickActionsText?: string;
  stickyHeader?: boolean;
  className?: string;
  selectedRows?: TData[];
  onSort?: (sorting: SortStatus, columnId: string) => void;
};
