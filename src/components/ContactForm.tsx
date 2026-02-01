"use client";

import { useState } from "react";

export default function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const targetEmail = "1406867377@qq.com";
        const subject = `来自官网的留言 - ${name}`;
        const body = `姓名: ${name}\n邮箱: ${email}\n\n留言内容:\n${message}`;

        // Construct mailto link
        window.location.href = `mailto:${targetEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    return (
        <form onSubmit={handleSubmit} className="bg-card border border-border p-6 rounded-xl space-y-4">
            <h3 className="font-bold mb-4">发送留言</h3>
            <input
                type="text"
                placeholder="您的姓名"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border rounded-md p-2 text-sm bg-background"
            />
            <input
                type="email"
                placeholder="电子邮箱"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border rounded-md p-2 text-sm bg-background"
            />
            <textarea
                rows={4}
                placeholder="留言内容"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full border rounded-md p-2 text-sm bg-background resize-none"
            ></textarea>
            <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-2 rounded-md font-medium hover:bg-primary/90 transition-colors"
            >
                发送
            </button>
        </form>
    );
}
