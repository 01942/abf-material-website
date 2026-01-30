import { getLocalData } from "@/lib/data";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
    const data = await getLocalData();
    const about = data.general?.about || {};

    return (
        <main className="min-h-screen bg-background flex flex-col">
            {/* Navbar */}
            <nav className="w-full h-16 border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between px-8">
                <Link href="/" className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center mr-2"><span className="text-primary font-serif font-bold text-lg">Y</span></div>
                    <span className="text-xl font-bold tracking-tight text-primary">深圳一捧春晖科技有限公司</span>
                </Link>
                <div className="flex gap-6 text-sm font-medium text-muted-foreground">
                    <Link href="/#products" className="hover:text-primary transition-colors">产品中心</Link>
                    <Link href="/technology" className="hover:text-primary transition-colors">核心技术</Link>
                    <Link href="/about" className="text-primary font-bold">关于我们</Link>
                    <Link href="/contact" className="hover:text-primary transition-colors">联系我们</Link>
                </div>
            </nav>

            <div className="max-w-4xl mx-auto w-full p-8 pt-16">
                <h1 className="text-4xl font-bold text-primary mb-8">{about.title || "关于我们"}</h1>

                <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-8 rounded-2xl mb-12">
                    <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
                        {about.content}
                    </div>
                </div>

                {/* Subsections (R&D, Factory) */}
                {about.subsections && about.subsections.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4">
                        {about.subsections.map((section: any, idx: number) => (
                            <div key={idx} className="bg-card border border-border rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                                <h3 className="text-xl font-bold text-primary mb-4">{section.title}</h3>
                                <p className="text-base text-muted-foreground leading-relaxed">
                                    {section.content}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                <div className="grid md:grid-cols-2 gap-8 mt-12 pt-12 border-t border-border">
                    <div className="p-6 border border-border rounded-xl bg-card">
                        <h3 className="text-xl font-bold mb-4 text-primary">企业使命</h3>
                        <p className="text-muted-foreground">{about.mission || "以材料创新驱动芯片技术的无限可能"}</p>
                    </div>
                    <div className="p-6 border border-border rounded-xl bg-card">
                        <h3 className="text-xl font-bold mb-4 text-primary">企业愿景</h3>
                        <p className="text-muted-foreground">{about.vision || "成为全球信赖的半导体关键材料合作伙伴"}</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
