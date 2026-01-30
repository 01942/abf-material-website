"use client";

import { useState, useEffect } from "react";
import { Check, X, FileText, ChevronDown, Filter, Lock, ExternalLink, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type ReportRaw = {
    id: string;
    title: string;
    submitter: string;
    fileUrl: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    submittedAt: string;
    comments?: string;
};

// Reuse simple auth from main admin page for consistency
const ADMIN_PWD = "admin123";

export default function AdminReportsPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [reports, setReports] = useState<ReportRaw[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<"ALL" | "PENDING" | "PROCESSED">("ALL");

    useEffect(() => {
        // Retrieve auth state from session storage if possible, or just ask again.
        // For simplicity reusing the local state pattern.
        if (isAuthenticated) {
            fetchReports();
        }
    }, [isAuthenticated]);

    const fetchReports = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/reports");
            if (res.ok) {
                const data = await res.json();
                // Sort by date desc
                data.sort((a: ReportRaw, b: ReportRaw) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
                setReports(data);
            }
        } catch (error) {
            console.error("Failed to fetch reports", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PWD) {
            setIsAuthenticated(true);
        } else {
            alert("Incorrect password");
        }
    };

    const handleStatusUpdate = async (id: string, newStatus: "APPROVED" | "REJECTED", currentReport: ReportRaw) => {
        const comment = prompt(newStatus === "REJECTED" ? "请输入驳回理由:" : "请输入备注 (可选):");
        if (newStatus === "REJECTED" && !comment) return; // Reject requires comment

        const updatedReport = {
            ...currentReport,
            status: newStatus,
            comments: comment || ""
        };

        // Optimistic update
        setReports(reports.map(r => r.id === id ? updatedReport : r));

        try {
            await fetch("/api/reports", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedReport)
            });
        } catch (error) {
            console.error("Failed to update status", error);
            alert("状态更新失败，请刷新重试");
            fetchReports(); // Revert
        }
    };

    const filteredReports = reports.filter(r => {
        if (filter === "ALL") return true;
        if (filter === "PENDING") return r.status === "PENDING";
        if (filter === "PROCESSED") return r.status !== "PENDING";
        return true;
    });

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
                    <div className="flex justify-center mb-6">
                        <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                            <Lock size={24} />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">报表审批登录</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="请输入管理员密码..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                            登录
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <header className="bg-white border-b sticky top-0 z-10 px-6 py-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2">
                    <h1 className="font-bold text-xl text-blue-900">报表审批中心</h1>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={() => fetchReports()} className="text-sm text-blue-600 hover:underline">刷新列表</button>
                    <button onClick={() => setIsAuthenticated(false)} className="text-sm text-gray-500 hover:text-red-500">退出</button>
                </div>
            </header>

            <main className="max-w-5xl mx-auto p-6">
                <div className="flex gap-4 mb-6">
                    <button
                        onClick={() => setFilter("ALL")}
                        className={cn("px-4 py-2 rounded-lg text-sm font-medium transition", filter === "ALL" ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-100")}
                    >
                        全部
                    </button>
                    <button
                        onClick={() => setFilter("PENDING")}
                        className={cn("px-4 py-2 rounded-lg text-sm font-medium transition", filter === "PENDING" ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-100")}
                    >
                        待审批
                    </button>
                    <button
                        onClick={() => setFilter("PROCESSED")}
                        className={cn("px-4 py-2 rounded-lg text-sm font-medium transition", filter === "PROCESSED" ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-100")}
                    >
                        已处理
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-gray-500">
                        <Loader2 className="animate-spin h-8 w-8 mx-auto mb-2" />
                        加载数据中...
                    </div>
                ) : filteredReports.length === 0 ? (
                    <div className="text-center py-20 text-gray-400 bg-white rounded-xl border border-dashed">
                        暂无相关报表
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredReports.map((report) => (
                            <div key={report.id} className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition">
                                <div className="flex justify-between items-start">
                                    <div className="flex gap-4">
                                        <div className={cn(
                                            "p-3 rounded-lg h-fit",
                                            report.status === "PENDING" ? "bg-yellow-50 text-yellow-600" :
                                                report.status === "APPROVED" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                                        )}>
                                            <FileText size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                                                {report.title}
                                                <span className={cn(
                                                    "text-xs px-2 py-0.5 rounded-full border",
                                                    report.status === "PENDING" ? "border-yellow-200 bg-yellow-50 text-yellow-700" :
                                                        report.status === "APPROVED" ? "border-green-200 bg-green-50 text-green-700" : "border-red-200 bg-red-50 text-red-700"
                                                )}>
                                                    {report.status === "PENDING" ? "待审批" : report.status === "APPROVED" ? "已通过" : "已驳回"}
                                                </span>
                                            </h3>
                                            <div className="text-sm text-gray-500 mt-1 flex flex-col gap-1">
                                                <span>提交人: {report.submitter}</span>
                                                <span>提交时间: {new Date(report.submittedAt).toLocaleString('zh-CN')}</span>
                                                {report.comments && (
                                                    <span className="text-gray-900 mt-2 bg-gray-50 p-2 rounded text-xs block">
                                                        审批备注: {report.comments}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="mt-3">
                                                <a
                                                    href={report.fileUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
                                                >
                                                    <ExternalLink size={14} /> 查看/下载附件
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    {report.status === "PENDING" && (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleStatusUpdate(report.id, "APPROVED", report)}
                                                className="flex items-center gap-1 bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-green-700 transition"
                                            >
                                                <Check size={16} /> 通过
                                            </button>
                                            <button
                                                onClick={() => handleStatusUpdate(report.id, "REJECTED", report)}
                                                className="flex items-center gap-1 bg-red-50 text-red-600 border border-red-200 px-3 py-1.5 rounded-lg text-sm hover:bg-red-100 transition"
                                            >
                                                <X size={16} /> 驳回
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
