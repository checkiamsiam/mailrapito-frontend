"use client";

import { Pagination } from "@saas/shared/components/Pagination";
import { apiClient } from "@shared/lib/api-client";
import { keepPreviousData } from "@tanstack/react-query";
import type { ColumnFiltersState, SortingState } from "@tanstack/react-table";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Icon } from "@ui/components/icon";
import { Input } from "@ui/components/input";
import { Table, TableBody, TableCell, TableRow } from "@ui/components/table";
import { useToast } from "@ui/hooks/use-toast";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import type { IBlog } from "../../../../interface/commonInterface";

export function BlogsList() {
  const t = useTranslations();
  const { toast } = useToast();
  const [itemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useDebounceValue("", 200);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const { data, isLoading } = apiClient.blogs.allBlogs.useQuery(
    {
      limit: itemsPerPage,
      offset: (currentPage - 1) * itemsPerPage,
      searchTerm,
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
      placeholderData: keepPreviousData,
    },
  );

  console.log(data);

  const columnHelper = createColumnHelper<IBlog>();

  const columns = [
    columnHelper.accessor("title", {
      header: "Title",
    }),
    columnHelper.accessor("views", {
      header: "Views",
    }),
  ];

  const blogs = useMemo(() => data ?? [], [data]);

  const table = useReactTable({
    data: blogs,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm ">
      <h2 className="mb-4 text-2xl font-semibold">{t("admin.users.title")}</h2>
      <Input
        type="search"
        placeholder={t("admin.users.search")}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />

      <div className="rounded-md border">
        <Table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="group"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="py-2 group-first:rounded-t-md group-last:rounded-b-md"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {isLoading ? (
                    <div className="flex h-full items-center justify-center">
                      <Icon.spinner className="text-primary mr-2 h-4 w-4 animate-spin" />
                      {t("admin.users.loading")}
                    </div>
                  ) : (
                    <p>No results.</p>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {blogs.length > 0 && (
        <Pagination
          className="mt-4"
          totalItems={data?.allBlogs?.length ?? 0}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onChangeCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}
