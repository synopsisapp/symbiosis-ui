import * as React from "react";
import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  type HeaderContext,
  type CellContext,
} from "@tanstack/react-table";
import { Text } from "../Text";
import { Dropdown } from "../Dropdown";
import { IconButton } from "../IconButton";
import { Button } from "../Button";
import { Checkbox } from "../Checkbox";
import { Pagination } from "../Pagination";
import { Table } from "../Table";
import type {
  DataTableColumnProps,
  ActionColumnProps,
  ActionTextColumnProps,
  ColumnProps,
  DataTableProps,
  SortStatus,
} from "./types";
import { cn } from "../../utils/cn";
import { tableCellStyles } from "./styles";
import { TextField } from '../TextField';
import { Icon } from '../Icon';
import debounce from 'lodash/debounce';

const DataTableHeaderSortButton = <TData, TValue>({
  column,
  label,
  onSort,
}: HeaderContext<TData, TValue> & { label: string, onSort?: (sorting: SortStatus, columnId: string) => void }) => {
  const isSorted = column.getIsSorted();

  const sortIcon = React.useMemo(() => {
    switch (isSorted) {
      case "asc":
        return "symbiosis-sort-rows-asc";
      case "desc":
        return "symbiosis-sort-rows-desc";
      default:
        return "symbiosis-select";
    }
  }, [isSorted]);

  const onPress = React.useCallback(() => {
    switch (isSorted) {
      case "asc":
        column.toggleSorting(true, false);
        onSort?.('desc', column.id);
        break;
      case "desc":
        column.clearSorting();
        onSort?.(false, column.id);
        break;
      default:
        column.toggleSorting(false, false);
        onSort?.('asc', column.id);
        break;
    }
  }, [isSorted, column, onSort]);

  return (
    <Button
      variant="ghost"
      label={label}
      tone="monochrome-dark"
      size="small-100"
      rightIcon={sortIcon}
      onPress={onPress}
      iconClassName="-ml-1"
      className="-ml-[6px]"
    />
  );
};

const SearchBar = ({
	onSearchChange,
	hasClearButton = true,
	className,
}: {
	onSearchChange?: (value: string) => void;
	hasClearButton?: boolean;
	className?: string;
}) => {
	const [search, setSearch] = React.useState('');
	const debouncedOnChange = React.useMemo(
		() => (onSearchChange ? debounce(onSearchChange, 300) : () => {}),
		[onSearchChange]
	);

	return (
		<div className='relative max-w-72 mb-4'>
			<TextField
				className={cn("[&_[data-symbiosis-textfield='field']]:pr-6", className)}
				icon='symbiosis-search'
				value={search}
				onChange={(value) => {
					setSearch(value);
					debouncedOnChange(value);
				}}
			/>
			{hasClearButton && Boolean(search) && (
				<button
					className='absolute right-2 top-1/2 -translate-y-1/2 z-10 text-slate-500'
					type='button'
					onClick={() => {
						onSearchChange?.('');
						setSearch('');
					}}>
					<Icon size='small-200' name='symbiosis-x' />
				</button>
			)}
		</div>
	);
};

const SimpleColumn = <TData, TValue>({
  id,
  onSort,
  ...unknownColumn
}: DataTableColumnProps<TData, TValue>): ColumnDef<TData, TValue> => {
  if (id !== "actions") {
    const { accessorFn, header, isSortable = false, ...restColumn } = unknownColumn as ColumnProps<TData, TValue>;
    return {
      id,
      accessorFn,
      sortingFn: restColumn.sortingFn ?? "auto",
      header: (props: HeaderContext<TData, TValue>) =>
        isSortable ? (
          <DataTableHeaderSortButton {...props} label={header ?? id} onSort={onSort} />
        ) : (
          <Text noTranslations variant="body-small-100" className="leading-none">
            {header}
          </Text>
        ),
      cell:
        restColumn.type === "cell"
          ? restColumn.cell
          : (props: CellContext<TData, TValue>) => (
              <Text noTranslations variant="body-small-100">
                {restColumn.text(props)}
              </Text>
            ),
    };
  }

  const column = unknownColumn as ActionColumnProps<TData, TValue>;

  if (column.type === "cell") {
    return { id, cell: column.cell };
  }

  const { item } = column as ActionTextColumnProps<TData>;

  return {
    id,
    cell: (props: CellContext<TData, TValue>) => (
      <div className="flex justify-end">
        <Dropdown.Root>
          <Dropdown.Trigger asChild>
            <IconButton
              variant="ghost"
              icon="symbiosis-kebab"
              size="small-100"
              renderAs="button"
              tone="monochrome-dark"
            />
          </Dropdown.Trigger>
          <Dropdown.Portal>
            <Dropdown.Content>
              {item(props.row.original).map((action) => {
                if (!action) return null;
                return (
                  <React.Fragment key={`${id}-${action.text}`}>
                    {action.isSeparated && <Dropdown.Separator />}
                    <div className={action.wrapperClassName}>
                      <Dropdown.SimpleItem
                        text={action.text}
                        icon={action.icon}
                        onSelect={() => action.onSelect(props.row.original)}
                      />
                    </div>
                  </React.Fragment>
                );
              })}
            </Dropdown.Content>
          </Dropdown.Portal>
        </Dropdown.Root>
      </div>
    ),
  };
};

const SelectableColumn = <TData, TValue>(onRowSelectionChange?: (rows: TData[]) => void) => ({
  id: "select",
  header: (props: HeaderContext<TData, TValue>) => (
    <Checkbox
      value={props.table.getIsAllRowsSelected()}
      indeterminate={props.table.getIsSomeRowsSelected()}
      onChange={(value) => {
        props.table.toggleAllRowsSelected(value);
        if (value) {
          onRowSelectionChange?.(props.table.getCoreRowModel().flatRows.map((r) => r.original));
        } else {
          onRowSelectionChange?.([]);
        }
      }}
      size="base"
    />
  ),
  cell: (props: CellContext<TData, TValue>) => (
    <Checkbox
      value={props.row.getIsSelected()}
      onChange={(value) => {
        const newSelectedRows = [...props.table.getFilteredSelectedRowModel().rows.map((r) => r.original)];
        if (value) {
          newSelectedRows.push(props.row.original);
        } else {
          const index = newSelectedRows.findIndex((r) => r === props.row.original);
          newSelectedRows.splice(index, 1);
        }
        props.row.toggleSelected(!!value);
        onRowSelectionChange?.(newSelectedRows);
      }}
      size="base"
    />
  ),
});

const DataTable = <TData, TValue>({
  columns,
  data,
  maxPerPage = 10,
  pinningState,
  stickyHeader = false,
  hiddenHeader = false,
  isSelectable,
  isSearchable = false,
  headerActions,
  onRowSelectionChange,
  getRowId,
  defaultSelectedRows = [],
  noResultsFoundText,
  quickActionsText,
  className,
  selectedRows,
  defaultSorting,
  onSort
}: DataTableProps<TData, TValue>) => {
  const [globalSearch, setGlobalSearch] = React.useState('');
  const [sorting, setSorting] = React.useState<SortingState>(defaultSorting ?? []);

  const [rowSelection, setRowSelection] = React.useState(() => {
    const selectedRowsById: Record<string, boolean> = {};
    defaultSelectedRows.forEach((row, idx) => {
      const id = getRowId?.(row) ?? String(idx);
      selectedRowsById[id] = true;
    });
    return selectedRowsById;
  });

  const finalColumns = React.useMemo(() => {
    const adjustedColumns = columns.map((column) => SimpleColumn<TData, TValue>({ ...column, onSort }));
    return isSelectable ? [SelectableColumn<TData, TValue>(onRowSelectionChange), ...adjustedColumns] : adjustedColumns;
  }, [columns, isSelectable, onRowSelectionChange, onSort]);

  const controlledRowSelection = React.useMemo(() => {
    if (!selectedRows) return undefined;
    const selectedRowsById: Record<string, boolean> = {};
    selectedRows.forEach((row, idx) => {
      const id = getRowId?.(row) ?? String(idx);
      selectedRowsById[id] = true;
    });
    return selectedRowsById;
  }, [selectedRows, getRowId]);

  const table = useReactTable({
    data,
    columns: finalColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex: false,
    enablePinning: true,
    enableRowSelection: isSelectable,
    onGlobalFilterChange: setGlobalSearch,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    getRowId,
    state: {
      globalFilter: globalSearch,
      sorting,
      rowSelection: controlledRowSelection ?? rowSelection,
    },
  });

  React.useEffect(() => {
    if (!defaultSorting?.length) return;

    setSorting(defaultSorting);
  }, [defaultSorting]);

  React.useEffect(() => {
    const currentPerPage = table.getState().pagination.pageSize;
    if (currentPerPage === maxPerPage) return;

    table.setPageSize(maxPerPage);
  }, [maxPerPage, table]);

  React.useEffect(() => {
    if (!pinningState) return;

    if (isSelectable) {
      const updatedPinningState = { ...pinningState };
      updatedPinningState.left = ["select", ...(pinningState.left ?? [])];
      table.setColumnPinning(updatedPinningState);
      return;
    }
    table.setColumnPinning(pinningState);
  }, [table, pinningState, isSelectable]);

  const hasSelectedRows = table.getFilteredSelectedRowModel().rows.length > 0;

  return (
    <div className={cn("flex flex-1 w-full flex-col", className)}>
      {Boolean(headerActions?.length) && (
        <div className="min-h-12 w-full flex justify-end">
          {hasSelectedRows && (
            <Dropdown.Root>
              <Dropdown.Trigger>
                <Button
                  variant="outline"
                  tone="monochrome-dark"
                  rightIcon="symbiosis-chevron-down"
                  size="base"
                  label={quickActionsText ?? "Quick actions"}
                />
              </Dropdown.Trigger>
              <Dropdown.Portal>
                <Dropdown.Content>
                  {headerActions?.map((action) => {
                    if (!action) return null;
                    return (
                      <Dropdown.SimpleItem
                        key={action.text}
                        text={action.text}
                        icon={action.icon}
                        onSelect={() =>
                          action.onSelect(table.getFilteredSelectedRowModel().rows.map((r) => r.original))
                        }
                      />
                    );
                  })}
                </Dropdown.Content>
              </Dropdown.Portal>
            </Dropdown.Root>
          )}
        </div>
      )}
      {isSearchable && <SearchBar onSearchChange={setGlobalSearch} />}
      <div className="rounded-md border border-slate-200 w-full flex-1 flex flex-col overflow-hidden">
        <div className="flex flex-1 overflow-auto">
          <Table.Root>
            {!hiddenHeader && (
              <Table.Header
                className={cn({
                  "sticky top-0 z-30 bg-white ": !!stickyHeader,
                })}
              >
                {table.getHeaderGroups().map((headerGroup) => (
                  <Table.Row key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      const pinedPosition = header.column.getIsPinned();
                      const columnIndex = header.column.getIndex();

                      return (
                        <Table.Head
                          key={header.id}
                          className={cn(
                            "whitespace-nowrap z-30",
                            tableCellStyles({
                              pinedPosition,
                              isSelectable,
                              isSecondColumn: columnIndex === 1,
                            }),
                          )}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </Table.Head>
                      );
                    })}
                  </Table.Row>
                ))}
              </Table.Header>
            )}
            <Table.Body>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <Table.Row key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => {
                      const pinedPosition = cell.column.getIsPinned();
                      const columnIndex = cell.column.getIndex();

                      return (
                        <Table.Cell
                          key={cell.id}
                          className={cn(
                            tableCellStyles({
                              pinedPosition,
                              isSelectable,
                              isSecondColumn: columnIndex === 1,
                            }),
                          )}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </Table.Cell>
                      );
                    })}
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell colSpan={columns.length} className="h-24 text-center">
                    {noResultsFoundText ?? "No results found"}
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Root>
        </div>
        {maxPerPage && data.length > table.getState().pagination.pageSize && (
          <div className="w-full flex justify-center py-3">
            <Pagination
              total={table.getPageCount()}
              initialPage={table.getState().pagination.pageIndex + 1}
              hasEdges={true}
              size="small-100"
              onPageChange={(page) => table.setPageIndex(page - 1)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

DataTable.displayName = "DataTable";

export { DataTable };
