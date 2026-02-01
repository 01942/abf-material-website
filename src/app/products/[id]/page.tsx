import { getLocalData } from "@/lib/data";
import Link from "next/link";
import { ArrowLeft, Download, Share2 } from "lucide-react";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';

type Props = {
    params: Promise<{ id: string }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const data = await getLocalData();
    const product = data.products.find((p: any) => p.id === id);

    if (!product) {
        return { title: '产品未找到' };
    }

    return {
        title: `${product.name} | 高性能封装胶膜`,
        description: product.description,
    };
}

// Generate static params for all products
export async function generateStaticParams() {
    const data = await getLocalData();
    return data.products.map((product: any) => ({
        id: product.id,
    }));
}

export default async function ProductPage({ params }: Props) {
    const { id } = await params;
    const data = await getLocalData();
    const product = data.products.find((p: any) => p.id === id);

    if (!product) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background flex flex-col items-center p-8 pt-16">
            <div className="max-w-4xl w-full">
                <Link href="/#products" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
                    <ArrowLeft size={16} className="mr-2" />
                    返回产品列表
                </Link>

                <div className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-2xl shadow-primary/5">
                    <div className="flex flex-col md:flex-row gap-12 mb-12">
                        <div className="shrink-0 w-32 h-32 md:w-48 md:h-48 bg-white rounded-2xl flex items-center justify-center border border-border p-2 overflow-hidden shadow-inner">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={product.imageUrl || "/images/placeholder.jpg"}
                                alt={product.name}
                                className="w-full h-full object-contain hover:scale-105 transition-transform duration-500 grayscale sepia contrast-110 saturate-150"
                            />
                        </div>

                        <div className="flex-1 space-y-6">
                            <div className="flex justify-between items-start">
                                <h1 className="text-3xl md:text-5xl font-bold text-primary tracking-tight">{product.name}</h1>
                                <button className="p-2 hover:bg-secondary rounded-full transition-colors text-muted-foreground hover:text-primary">
                                    <Share2 size={20} />
                                </button>
                            </div>
                            <p className="text-xl text-muted-foreground leading-relaxed">{product.description}</p>

                            <div className="flex gap-4 pt-4">
                                <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                                    <Download size={18} />
                                    下载技术规格书 (TDS)
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-border pt-12">
                        <h2 className="text-2xl font-bold text-primary mb-8 flex items-center gap-3">
                            <span className="w-1 h-8 bg-accent rounded-full"></span>
                            技术规格书 (Technical Data Sheet)
                        </h2>
                        <div className="bg-background rounded-xl overflow-hidden border border-border">
                            <table className="w-full text-left text-sm md:text-base">
                                <thead className="bg-secondary/50 border-b border-border">
                                    <tr>
                                        <th className="p-4 pl-6 font-semibold text-muted-foreground w-1/2">项目 (Property)</th>
                                        <th className="p-4 font-semibold text-primary">典型值 (Value)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {Object.entries(product.specs || {}).map(([key, val]: any, idx) => (
                                        <tr key={key} className={idx % 2 === 0 ? "bg-background" : "bg-secondary/10 hover:bg-secondary/20 transition-colors"}>
                                            <td className="p-4 pl-6 font-medium text-foreground">{key}</td>
                                            <td className="p-4 font-bold font-mono text-primary">{val}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="mt-4 text-xs text-muted-foreground text-center">
                            * 以上数据为典型测试值，仅供参考，不作为产品验收标准。
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
