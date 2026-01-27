"use client";

import { useState, useEffect } from "react";
import { Plus, Trash, Save, Lock, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

// Define Types
type Product = {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    specs: Record<string, string>;
};

type Article = {
    id: string;
    title: string;
    content: string;
    date: string;
};

type GeneralContent = {
    technology: {
        title: string;
        content: string;
    };
    about: {
        title: string;
        content: string;
        mission: string;
        vision: string;
    };
    contact: {
        title: string;
        address: string;
        email: string;
        phone: string;
    };
}

type AppContent = {
    products: Product[];
    articles: Article[];
    general?: GeneralContent;
};

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [content, setContent] = useState<AppContent | null>(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<"products" | "articles" | "general">("products");
    const [statusMsg, setStatusMsg] = useState("");

    useEffect(() => {
        if (isAuthenticated) {
            fetchContent();
        }
    }, [isAuthenticated]);

    const fetchContent = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/content");
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            setContent(data);
        } catch (err) {
            console.error(err);
            setStatusMsg("Error loading data.");
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "admin123") {
            setIsAuthenticated(true);
        } else {
            alert("Incorrect password");
        }
    };

    const handleSave = async () => {
        if (!content) return;
        setLoading(true);
        try {
            const res = await fetch("/api/content", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(content),
            });
            if (!res.ok) throw new Error("Failed to save");
            setStatusMsg("Changes saved successfully!");
            setTimeout(() => setStatusMsg(""), 3000);
        } catch (err) {
            console.error(err);
            setStatusMsg("Error saving changes.");
        } finally {
            setLoading(false);
        }
    };

    const updateProduct = (index: number, field: keyof Product, value: any) => {
        if (!content) return;
        const newProducts = [...content.products];
        newProducts[index] = { ...newProducts[index], [field]: value };
        setContent({ ...content, products: newProducts });
    };

    const addProduct = () => {
        if (!content) return;
        const newProduct: Product = {
            id: Date.now().toString(),
            name: "New Material",
            description: "Description here...",
            imageUrl: "/images/placeholder.jpg",
            specs: { "Thickness": "0µm" }
        };
        setContent({ ...content, products: [...content.products, newProduct] });
    };

    const removeProduct = (index: number) => {
        if (!content) return;
        if (!confirm("Delete this product?")) return;
        const newProducts = content.products.filter((_, i) => i !== index);
        setContent({ ...content, products: newProducts });
    };

    // Render Login Screen
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
                    <div className="flex justify-center mb-6">
                        <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                            <Lock size={24} />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">后台管理登录</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">管理员密码</label>
                            <input
                                type="password"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="请输入密码..."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition">
                            登录
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    const updateGeneral = (section: string, field: string, value: string) => {
        if (!content || !content.general) return;
        const newGeneral = { ...content.general, [section]: { ...content.general[section as keyof typeof content.general], [field]: value } };
        setContent({ ...content, general: newGeneral });
    };

    // Render Admin Dashboard
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <header className="bg-white border-b sticky top-0 z-10 px-6 py-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2">
                    <div className="font-bold text-xl text-blue-900">材科后台管理</div>
                    <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full font-medium">BETA</span>
                </div>
                <div className="flex items-center gap-4">
                    {statusMsg && <span className="text-sm font-medium text-green-600 transition-opacity">{statusMsg}</span>}
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        <Save size={18} /> 保存更改
                    </button>
                    <button onClick={() => setIsAuthenticated(false)} className="p-2 text-gray-500 hover:text-red-500 transition">
                        <LogOut size={20} />
                    </button>
                </div>
            </header>

            <main className="max-w-5xl mx-auto p-6">
                {/* Tabs */}
                <div className="flex gap-1 mb-8 bg-gray-200 p-1 rounded-lg w-fit">
                    <button
                        onClick={() => setActiveTab("products")}
                        className={cn(
                            "px-6 py-2 rounded-md text-sm font-medium transition-all",
                            activeTab === "products" ? "bg-white text-blue-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                        )}
                    >
                        产品管理
                    </button>
                    <button
                        onClick={() => setActiveTab("general")}
                        className={cn(
                            "px-6 py-2 rounded-md text-sm font-medium transition-all",
                            activeTab === "general" ? "bg-white text-blue-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                        )}
                    >
                        页面内容管理
                    </button>
                    <button
                        onClick={() => setActiveTab("articles")}
                        className={cn(
                            "px-6 py-2 rounded-md text-sm font-medium transition-all",
                            activeTab === "articles" ? "bg-white text-blue-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                        )}
                    >
                        新闻与技术文章
                    </button>
                </div>

                {loading && !content ? (
                    <div className="text-center py-20 text-gray-500">正在加载数据...</div>
                ) : (
                    <div className="space-y-6">
                        {activeTab === "products" && content && (
                            <div className="space-y-6">
                                {content.products.map((product, idx) => (
                                    <div key={product.id} className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex-1 space-y-4">
                                                <input
                                                    type="text"
                                                    value={product.name}
                                                    onChange={(e) => updateProduct(idx, "name", e.target.value)}
                                                    className="text-lg font-bold w-full border-b border-transparent hover:border-gray-300 focus:border-blue-500 outline-none transition bg-transparent"
                                                    placeholder="产品名称"
                                                />
                                                <textarea
                                                    value={product.description}
                                                    onChange={(e) => updateProduct(idx, "description", e.target.value)}
                                                    className="w-full text-gray-600 text-sm resize-none border rounded-md p-2 focus:ring-1 focus:ring-blue-500 outline-none"
                                                    rows={2}
                                                    placeholder="产品描述"
                                                />
                                            </div>
                                            <button onClick={() => removeProduct(idx)} className="text-red-400 hover:text-red-600 p-2">
                                                <Trash size={18} />
                                            </button>
                                        </div>

                                        {/* Specs Editor */}
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">规格参数</h4>
                                            <div className="grid grid-cols-2 gap-4">
                                                {Object.entries(product.specs).map(([key, val]) => (
                                                    <div key={key} className="flex flex-col">
                                                        <label className="text-xs text-gray-400 mb-1">{key}</label>
                                                        <input
                                                            type="text"
                                                            value={val}
                                                            onChange={(e) => {
                                                                const newSpecs = { ...product.specs, [key]: e.target.value };
                                                                updateProduct(idx, "specs", newSpecs);
                                                            }}
                                                            className="text-sm border rounded px-2 py-1"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <button
                                    onClick={addProduct}
                                    className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-400 font-medium hover:border-blue-400 hover:text-blue-500 flex items-center justify-center gap-2 transition"
                                >
                                    <Plus size={20} /> 添加新材料
                                </button>
                            </div>
                        )}

                        {activeTab === "general" && content && content.general && (
                            <div className="grid grid-cols-1 gap-8">
                                {/* Technology Section */}
                                <div className="bg-white border rounded-xl p-6 shadow-sm">
                                    <h2 className="text-lg font-bold mb-4 border-b pb-2">核心技术 (Technology)</h2>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">页面标题</label>
                                            <input
                                                type="text"
                                                className="w-full border rounded p-2"
                                                value={content.general.technology?.title}
                                                onChange={(e) => updateGeneral('technology', 'title', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">主要介绍内容</label>
                                            <textarea
                                                className="w-full border rounded p-2 h-32"
                                                value={content.general.technology?.content}
                                                onChange={(e) => updateGeneral('technology', 'content', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* About Section */}
                                <div className="bg-white border rounded-xl p-6 shadow-sm">
                                    <h2 className="text-lg font-bold mb-4 border-b pb-2">关于我们 (About Us)</h2>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">页面标题</label>
                                            <input
                                                type="text"
                                                className="w-full border rounded p-2"
                                                value={content.general.about?.title}
                                                onChange={(e) => updateGeneral('about', 'title', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">公司简介</label>
                                            <textarea
                                                className="w-full border rounded p-2 h-32"
                                                value={content.general.about?.content}
                                                onChange={(e) => updateGeneral('about', 'content', e.target.value)}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">使命</label>
                                                <input
                                                    type="text"
                                                    className="w-full border rounded p-2"
                                                    value={content.general.about?.mission}
                                                    onChange={(e) => updateGeneral('about', 'mission', e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">愿景</label>
                                                <input
                                                    type="text"
                                                    className="w-full border rounded p-2"
                                                    value={content.general.about?.vision}
                                                    onChange={(e) => updateGeneral('about', 'vision', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Section */}
                                <div className="bg-white border rounded-xl p-6 shadow-sm">
                                    <h2 className="text-lg font-bold mb-4 border-b pb-2">联系我们 (Contact)</h2>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">地址</label>
                                                <input
                                                    type="text"
                                                    className="w-full border rounded p-2"
                                                    value={content.general.contact?.address}
                                                    onChange={(e) => updateGeneral('contact', 'address', e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
                                                <input
                                                    type="text"
                                                    className="w-full border rounded p-2"
                                                    value={content.general.contact?.email}
                                                    onChange={(e) => updateGeneral('contact', 'email', e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">电话</label>
                                                <input
                                                    type="text"
                                                    className="w-full border rounded p-2"
                                                    value={content.general.contact?.phone}
                                                    onChange={(e) => updateGeneral('contact', 'phone', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "articles" && (
                            <div className="text-center py-20 text-gray-400 border-2 border-dashed rounded-xl">
                                文章管理功能开发中...
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
