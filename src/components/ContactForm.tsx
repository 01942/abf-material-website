"use client";

import { useState } from "react";

export default function ContactForm() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            // Using FormSubmit.co via AJAX
            const res = await fetch("https://formsubmit.co/ajax/chunbo.gao@szypch.cn", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    phone,
                    email,
                    message,
                    _subject: `来自官网的咨询: ${name} (${phone})`,
                    _template: "table" // Optional: makes email look nicer
                })
            });

            if (res.ok) {
                setStatus("success");
                setName("");
                setPhone("");
                setEmail("");
                setMessage("");
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
            console.error(error);
        }
    };

    if (status === "success") {
        return (
            <div className="bg-card border border-border p-8 rounded-xl text-center space-y-4 animate-in fade-in zoom-in duration-300">
                <div className="mx-auto w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-primary">发送成功！</h3>
                <p className="text-muted-foreground">我们会尽快通过您留下的邮箱与您取得联系。</p>
                <button
                    onClick={() => setStatus("idle")}
                    className="text-sm text-primary underline underline-offset-4 hover:text-primary/80"
                >
                    发送另一条留言
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-card border border-border p-6 rounded-xl space-y-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold">发送留言</h3>
            </div>

            <input
                type="text"
                name="name"
                placeholder="您的姓名"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={status === "submitting"}
                className="w-full border rounded-md p-2 text-sm bg-background disabled:opacity-50 focus:ring-1 focus:ring-primary focus:outline-none transition-all"
            />
            <input
                type="tel"
                name="phone"
                placeholder="联系电话"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                disabled={status === "submitting"}
                className="w-full border rounded-md p-2 text-sm bg-background disabled:opacity-50 focus:ring-1 focus:ring-primary focus:outline-none transition-all"
            />
            <input
                type="email"
                name="email"
                placeholder="电子邮箱 (方便我们回复您)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === "submitting"}
                className="w-full border rounded-md p-2 text-sm bg-background disabled:opacity-50 focus:ring-1 focus:ring-primary focus:outline-none transition-all"
            />
            <textarea
                name="message"
                rows={4}
                placeholder="想要咨询的产品或技术问题..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                disabled={status === "submitting"}
                className="w-full border rounded-md p-2 text-sm bg-background resize-none disabled:opacity-50 focus:ring-1 focus:ring-primary focus:outline-none transition-all"
            ></textarea>

            {status === "error" && (
                <div className="text-sm text-red-500 bg-red-50 p-2 rounded flex items-center gap-2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                    <span>发送失败，请检查网络或直接电话联系。</span>
                </div>
            )}

            <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full bg-primary text-primary-foreground py-2 rounded-md font-medium hover:bg-primary/90 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
            >
                {status === "submitting" ? (
                    <>
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        正在发送...
                    </>
                ) : (
                    <>发送直达邮箱</>
                )}
            </button>
        </form>
    );
}
