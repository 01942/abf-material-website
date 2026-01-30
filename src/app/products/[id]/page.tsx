import { getLocalData } from "@/lib/data";
import Link from "next/link";
import { ArrowLeft, Download, Share2 } from "lucide-react";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';

type Props = {
    params: { id: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const data = await getLocalData();
    const product = data.products.find((p: any) => p.id === params.id);

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
    const data = await getLocalData();
    const product = data.products.find((p: any) => p.id === params.id);

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
                        <div className="shrink-0 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-secondary to-accent/20 rounded-2xl flex items-center justify-center border border-accent/10">
                            <div className="w-16 h-16 bg-primary/80 rounded-sm shadow-lg shadow-primary/30" />
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
                        <h2 className="text-2xl font-bold text-primary mb-8">技术参数规格</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                            {Object.entries(product.specs || {}).map(([key, val]: any) => (
                                <div key={key} className="flex justify-between items-center py-3 border-b border-border/50 group hover:bg-secondary/20 px-2 rounded-md transition-colors">
                                    <span className="text-muted-foreground font-medium">{key}</span>
                                    <span className="font-mono text-foreground font-semibold">{val}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
