import { getLocalData } from "@/lib/data";
import Link from "next/link";
import { Cpu, Zap, Thermometer } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "核心技术 - 低损耗/高可靠性ABF胶膜",
    description: "深入了解一捧春晖科技的积层胶膜技术，包括优化的树脂体系、纳米填料分散技术及卓越的热机械性能。",
};

export default async function TechnologyPage() {
    const data = await getLocalData();
    const tech = data.general?.technology || {};

    return (
        <main className="min-h-screen bg-background flex flex-col">
            {/* Navbar */}
            <nav className="w-full h-16 border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between px-8">
                <Link href="/" className="text-xl font-bold tracking-tight text-primary">深圳一捧春晖科技有限公司</Link>
                <div className="flex gap-6 text-sm font-medium text-muted-foreground">
                    <Link href="/#products" className="hover:text-primary transition-colors">产品中心</Link>
                    <Link href="/technology" className="text-primary font-bold">核心技术</Link>
                    <Link href="/about" className="hover:text-primary transition-colors">关于我们</Link>
                    <Link href="/contact" className="hover:text-primary transition-colors">联系我们</Link>
                </div>
            </nav>

            <div className="max-w-5xl mx-auto w-full p-8 pt-16">
                <h1 className="text-4xl font-bold text-primary mb-8">{tech.title || "核心技术"}</h1>
                <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-3xl">
                    {tech.content}
                </p>

                <div className="grid md:grid-cols-1 gap-8">
                    {tech.sections?.map((section: any, idx: number) => (
                        <div key={idx} className="flex gap-6 p-6 rounded-xl border border-border bg-card hover:border-accent/30 transition-colors">
                            <div className="shrink-0 w-12 h-12 bg-secondary rounded-lg flex items-center justify-center text-primary">
                                {idx === 0 ? <Cpu size={24} /> : idx === 1 ? <Thermometer size={24} /> : <Zap size={24} />}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2 text-foreground">{section.heading}</h3>
                                <p className="text-muted-foreground leading-relaxed">{section.body}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
