"use client";

import { useState } from "react";
import { Upload, FileText, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function SubmitReportPage() {
    const [title, setTitle] = useState("");
    const [submitter, setSubmitter] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [msg, setMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !title || !submitter) {
            setMsg("请填写所有必填项并上传文件");
            return;
        }

        setLoading(true);
        setStatus("idle");
        setMsg("");

        try {
            // 1. Upload File
            const formData = new FormData();
            formData.append("file", file);

            const uploadRes = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!uploadRes.ok) throw new Error("文件上传失败");
            const { url } = await uploadRes.json();

            // 2. Submit Report Data
            const reportData = {
                id: crypto.randomUUID(),
                title,
                submitter,
                fileUrl: url,
                status: "PENDING",
                submittedAt: new Date().toISOString(),
                comments: ""
            };

            const reportRes = await fetch("/api/reports", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reportData),
            });

            if (!reportRes.ok) throw new Error("提交报表失败");

            setStatus("success");
            setMsg("报表提交成功！等待审批。");
            // Reset form
            setTitle("");
            setFile(null);
        } catch (error) {
            console.error(error);
            setStatus("error");
            setMsg("提交失败，请稍后重试。");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
                <div className="text-center mb-8">
                    <div className="mx-auto h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">提交报表资料</h2>
                    <p className="mt-2 text-sm text-gray-500">
                        上传您的报表文件以供审核
                    </p>
                </div>

                {status === "success" ? (
                    <div className="text-center py-8">
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">提交成功!</h3>
                        <p className="text-gray-500 mt-2">{msg}</p>
                        <button
                            onClick={() => setStatus("idle")}
                            className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                        >
                            提交这一份
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                报表标题 <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="例如：2024 Q1 销售报表"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                提交人姓名 <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={submitter}
                                onChange={(e) => setSubmitter(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="请输入您的姓名"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                附件上传 <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 transition bg-gray-50">
                                <div className="space-y-1 text-center">
                                    {file ? (
                                        <div className="text-sm text-gray-900 font-medium break-all">
                                            {file.name}
                                            <button
                                                type="button"
                                                onClick={() => setFile(null)}
                                                className="text-red-500 text-xs ml-2 hover:underline"
                                            >
                                                删除
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                            <div className="flex text-sm text-gray-600 justify-center">
                                                <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                                                    <span>点击上传文件</span>
                                                    <input
                                                        type="file"
                                                        className="sr-only"
                                                        onChange={(e) => e.target.files && setFile(e.target.files[0])}
                                                    />
                                                </label>
                                            </div>
                                            <p className="text-xs text-gray-500">支持 PDF, Excel, Word, 图片</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {status === "error" && (
                            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                                <AlertCircle size={16} /> {msg}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                                    提交中...
                                </>
                            ) : (
                                "提交报表"
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
