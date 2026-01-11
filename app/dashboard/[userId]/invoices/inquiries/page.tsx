"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { INQUIRIES } from "@/config/ui-text";

type Inquiry = {
  id: string;
  name: string;
  companyName?: string | null;
  phoneNumber: string;
  email?: string | null;
  status: "미확인" | "확인" | "보관";
  createdAt: string;
};

const PAGE_SIZE = 10;
const PAGE_BLOCK_SIZE = 10;

const InquiriesPage = () => {
  const [inquiriesList, setInquiriesList] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchInquiries = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/dashboard/inquiries", {
          cache: "no-store",
        });

        if (!res.ok) {
          console.error("inquiries fetch failed:", res.status);
          setInquiriesList([]);
          return;
        }

        const data = await res.json();
        setInquiriesList(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("방문자 연결 로드하기 실패: ", error);
        setInquiriesList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  const totalPages = Math.max(1, Math.ceil(inquiriesList.length / PAGE_SIZE));

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const startIdx = (page - 1) * PAGE_SIZE;
  const pagedData = inquiriesList.slice(startIdx, startIdx + PAGE_SIZE);

  const currentBlock = Math.floor((page - 1) / PAGE_BLOCK_SIZE);
  const startPage = currentBlock * PAGE_BLOCK_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_BLOCK_SIZE - 1, totalPages);

  const hasPrevBlock = startPage > 1;
  const hasNextBlock = endPage < totalPages;

  if (loading) {
    return (
      <div className="text-sm text-muted-foreground">{INQUIRIES.LOADING}</div>
    );
  }

  if (!inquiriesList.length) {
    return (
      <div className="p-5">
        <div className="text-sm text-muted-foreground mt-6">
          {INQUIRIES.NOTHING_LIST}
        </div>
      </div>
    );
  }

  return (
    <div className="p-5">
      <div className="mb-10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{INQUIRIES.TABLE_NAME}</TableHead>
              <TableHead>{INQUIRIES.TABLE_COMPANY_NAME}</TableHead>
              <TableHead>{INQUIRIES.TABLE_PHONE_NUMBER}</TableHead>
              <TableHead>{INQUIRIES.TABLE_EMAIL}</TableHead>
              <TableHead>{INQUIRIES.TABLE_READ_STATE}</TableHead>
              <TableHead>{INQUIRIES.TABLE_DATE}</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {pagedData.map((inquiry) => (
              <TableRow key={inquiry.id}>
                <TableCell className="py-3">{inquiry.name}</TableCell>
                <TableCell className="py-3">
                  {inquiry.companyName ?? "-"}
                </TableCell>
                <TableCell className="py-3">{inquiry.phoneNumber}</TableCell>
                <TableCell className="py-3">{inquiry.email ?? "-"}</TableCell>
                <TableCell className="py-3">{inquiry.status}</TableCell>
                <TableCell className="py-3">
                  {new Date(inquiry.createdAt).toLocaleDateString("ko-KR")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="fixed bottom-6 left-0 right-0 bg-background">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (!hasPrevBlock) return;
                  setPage(startPage - 1);
                }}
              />
            </PaginationItem>

            {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
              const pageNumber = startPage + i;
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href="#"
                    isActive={page === pageNumber}
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(pageNumber);
                    }}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (!hasNextBlock) return;
                  setPage(endPage + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default InquiriesPage;
