import { Button } from "@/app/_components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({ totalPages, onPageChange }: PaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);

  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  function handleGoToPreviousPage() {
    router.push(`${pathname}?page=${currentPage - 1}`);
  }
  function handleGoToNextPage() {
    router.push(`${pathname}?page=${currentPage + 1}`);
  }

  return (
    <div className="flex items-center justify-between space-x-2 mt-5">
      <div className="flex-1 text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </div>
      <div className="space-x-2">
        <Button
          variant="outline"
          disabled={currentPage === 1}
          onClick={handleGoToPreviousPage}
          className="btn btn-primary"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={handleGoToNextPage}
          className="btn btn-primary"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
