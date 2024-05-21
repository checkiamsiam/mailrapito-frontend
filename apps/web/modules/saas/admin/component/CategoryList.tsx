"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { Button } from "@ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@ui/components/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@ui/components/form";
import { Icon } from "@ui/components/icon";
import { Input } from "@ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/components/select";
import { Table, TableBody, TableCell, TableRow } from "@ui/components/table";
import { toast } from "@ui/hooks/use-toast";
import { useEffect, useMemo, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";

const languageOptions = [
  {
    label: "English",
    value: "en",
  },
  {
    label: "French",
    value: "fr",
  },
  {
    label: "Spanish",
    value: "es",
  },
  {
    label: "Arabic",
    value: "ar",
  },
];

const formSchema = z.object({
  name: z.string().min(1, { message: "Required" }),
  language: z.enum(["en", "fr", "es", "ar"]),
});

type FormValues = z.infer<typeof formSchema>;

interface Category {
  id: string;
  name: string;
  language: string;
}

export function CategoryList() {
  const [itemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [open, setOpen] = useState(false);

  const createCategoryMutation = apiClient.posts.createCategory.useMutation();
  const deleteCategoryMutation = apiClient.posts.deleteCategory.useMutation();

  const { data, isLoading, refetch } = apiClient.posts.getCategories.useQuery({
    enabled: false,
  });

  const columnHelper = createColumnHelper<Category>();

  const deleteCategory = async (id: string) => {
    const deleteCategoryToast = toast({
      variant: "loading",
      title: "Deleting category",
    });
    try {
      await deleteCategoryMutation.mutateAsync({
        id,
      });
      deleteCategoryToast.update({
        id: deleteCategoryToast.id,
        variant: "success",
        title: "Category deleted successfully",
        duration: 5000,
      });
      await refetch();
    } catch (e) {
      deleteCategoryToast.dismiss();
      toast({
        variant: "error",
        title: "Failed to delete category",
      });
    }
  };

  const columns: ColumnDef<any>[] = [
    columnHelper.accessor("name", {
      header: "Name",
    }),
    columnHelper.accessor("language", {
      header: "Language",
    }),
    {
      accessorKey: "actions",
      header: "",

      cell: ({ row }) => {
        return (
          <div className="flex flex-row justify-end gap-2">
            <Button
              variant="link"
              onClick={async () => {
                await deleteCategory(row.original.id as string);
              }}
            >
              <Icon.delete className="h-6 w-6" color="gray" />
            </Button>
          </div>
        );
      },
    },
  ];

  const categories = useMemo(() => data ?? [], [data]);

  const table = useReactTable({
    data: categories,
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

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      language: "en",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    toast({
      variant: "loading",
      title: "Adding category",
    });

    try {
      await createCategoryMutation.mutateAsync({
        ...values,
      });
      toast({
        variant: "success",
        title: "Category added successfully",
        duration: 5000,
      });
      await refetch();
      form.reset();
      setOpen(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    refetch();
  }, []);

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm ">
      <h2 className="mb-4 text-2xl font-semibold">Categories</h2>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="mb-4 flex w-full justify-end">
          <Button
            onClick={() => {
              setOpen(!open);
            }}
          >
            Add Category
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[600px]">
          <DialogTitle>
            <div>Add Category</div>
          </DialogTitle>
          <DialogDescription>
            {" "}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="@container"
              >
                <div className="">
                  <div className="">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input type="title" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mt-2">
                    <FormField
                      control={form.control}
                      name="language"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Language</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {languageOptions.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="mt-10 flex justify-end border-t pt-3">
                  <Button type="submit" loading={form.formState.isSubmitting}>
                    Add Category
                  </Button>
                </div>
              </form>
            </Form>
          </DialogDescription>
        </DialogContent>
      </Dialog>
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
                      Loading categories
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

      {categories.length > 0 && (
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
