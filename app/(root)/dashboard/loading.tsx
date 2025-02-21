import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Loading() {
  return (
    <div className="px-4 sm:px-8 py-8 mt-[99px] flex flex-col gap-6">
      <h1 className="text-h4 text-dark">Chat Logs</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Question</TableHead>
            <TableHead>Response</TableHead>
            <TableHead>Extracted</TableHead>
            <TableHead>IP</TableHead>
            <TableHead>Location</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(10)].map((_, i) => (
            <TableRow key={i} className="animate-pulse">
              <TableCell className="py-4"><Skeleton className="lg:h-4 h-8 w-48" /></TableCell>
              <TableCell className="py-4"><Skeleton className="lg:h-4 h-8 w-64" /></TableCell>
              <TableCell className="py-4"><Skeleton className="lg:h-4 h-8 w-32" /></TableCell>
              <TableCell className="py-4"><Skeleton className="lg:h-4 h-8 w-24" /></TableCell>
              <TableCell className="py-4"><Skeleton className="lg:h-4 h-8 w-40" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
