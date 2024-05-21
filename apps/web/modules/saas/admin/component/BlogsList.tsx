"use client";

import { Pagination } from "@saas/shared/components/Pagination";
import { apiClient } from "@shared/lib/api-client";
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
} from "@tanstack/react-table";
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
import { Table, TableBody, TableCell, TableRow } from "@ui/components/table";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface Blog {
  id: string;
  title: string;
  keywords: string;
  description: string;
  language: string | null;
  status: string | null;
  author: string;
  slug: string;
  category: string | null;
  views: number;
}

export function BlogsList() {
  const t = useTranslations();
  const [itemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const router = useRouter();

  const { data, isLoading, refetch } = apiClient.posts.publishedPosts.useQuery({
    enabled: false,
  });

  const columnHelper = createColumnHelper<Blog>();

  const columns: ColumnDef<any>[] = [
    columnHelper.accessor("title", {
      header: "Title",
    }),
    columnHelper.accessor("category", {
      header: "Category",
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

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    refetch();
  }, []);

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm ">
      <h2 className="mb-4 text-2xl font-semibold">Published Posts</h2>
      <div className="rounded-md border">
        <Table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="pl-4 pt-2 text-left">
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
                  className="group cursor-pointer transition-colors duration-200 ease-in-out hover:bg-gray-100"
                  onClick={() => {
                    const id = row.original.id;
                    router.push(`/app/blogs/${id}`);
                  }}
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
                      Loading posts
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
          totalItems={data?.length ?? 0}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onChangeCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}
