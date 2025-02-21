import { prisma } from "@/lib/prisma";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ChatLog } from "@/types/types";

async function getChatLogs() {
    return await prisma.chatLog.findMany({
        orderBy: { createdAt: "desc" },
        take: 50, // Limit to 50 logs
    });
}

function truncateText(text: string, length: number) {
    return text.length > length ? text.slice(0, length) + "..." : text;
}

export default async function Dashboard() {
    const chatLogs = await getChatLogs();

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
                    {chatLogs.map((log: ChatLog) => (
                        <Dialog key={log.id}>
                            <DialogTrigger asChild>
                                <TableRow className="text-main text-dark cursor-pointer hover:bg-gray-100">
                                    <TableCell>{truncateText(log.question, 50)}</TableCell>
                                    <TableCell>{truncateText(log.response, 50)}</TableCell>
                                    <TableCell>{truncateText(log.extracted || "N/A", 30)}</TableCell>
                                    <TableCell>{log.ip || "N/A"}</TableCell>
                                    <TableCell>{truncateText(log.location || "Unknown", 20)}</TableCell>
                                </TableRow>
                            </DialogTrigger>
                            <DialogContent className="max-h-[80vh] overflow-y-auto p-6 rounded-lg">
                                <DialogHeader>
                                    <DialogTitle className="text-h2 text-dark">Chat Log Details</DialogTitle>
                                </DialogHeader>
                                <div className="flex flex-col gap-8">
                                    <div className="flex flex-col gap-2">
                                        <p className="text-strong">Question:</p>
                                        <p>{log.question}</p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                    <p className="text-strong">Response:</p>
                                        <p>{log.response}</p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                    <p className="text-strong">Extracted:</p>
                                        <p>{log.extracted || "N/A"}</p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                    <p className="text-strong">IP:</p>
                                        <p>{log.ip || "N/A"}</p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                    <p className="text-strong">Location:</p>
                                        <p>{log.location || "Unknown"}</p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                    <p className="text-strong">Created At:</p>
                                        <p>{new Date(log.createdAt).toLocaleString()}</p>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
