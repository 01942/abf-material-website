import { getLocalData } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar } from "lucide-react";

export async function generateStaticParams() {
    const data = await getLocalData();
    return data.articles.map((a: any) => ({
        id: a.id,
    }));
}

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const data = await getLocalData();
    const article = data.articles.find((a: any) => a.id === id);

    if (!article) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background flex flex-col">
            {/* Navbar */}
            <nav className="w-full h-16 border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between px-8">
                <Link href="/" className="text-xl font-bold tracking-tight text-primary">MAT-TECH 材科</Link>
                <div className="flex gap-6 text-sm font-medium text-muted-foreground">
                    <Link href="/#products" className="hover:text-primary transition-colors">产品中心</Link>
                    <Link href="/" className="hover:text-primary transition-colors">核心技术</Link>
                    <Link href="/" className="hover:text-primary transition-colors">关于我们</Link>
                    <Link href="/" className="hover:text-primary transition-colors">联系我们</Link>
                </div>
            </nav>

            <div className="flex-1 max-w-3xl mx-auto w-full p-8 pt-16">
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary mb-8 inline-block">&larr; 返回首页</Link>

                <article className="prose prose-blue max-w-none">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <Calendar size={16} />
                        <span>{article.date}</span>
                        <span className="bg-accent/10 text-accent px-2 py-0.5 rounded-full text-xs font-semibold">企业新闻</span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8 leading-tight">{article.title}</h1>

                    <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
                        <p className="text-lg text-foreground leading-loose whitespace-pre-wrap">
                            {article.content}
                        </p>
                    </div>
                </article>
            </div>
        </main>
    );
}
