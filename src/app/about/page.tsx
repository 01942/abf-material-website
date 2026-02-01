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
                    <img src="/images/logo.png" alt="AEM Logo" className="h-10 w-auto mr-2" />
                    <span className="text-xl font-bold tracking-tight text-primary">深圳一捧春晖科技有限公司</span>
                </Link>
                <div className="flex gap-6 text-sm font-medium text-muted-foreground">
                    <Link href="/#products" className="hover:text-primary transition-colors">产品中心</Link>
                    <Link href="/technology" className="hover:text-primary transition-colors">核心技术</Link>
                    <Link href="/about" className="text-primary font-bold">关于我们</Link>
                    <Link href="/contact" className="hover:text-primary transition-colors">联系我们</Link>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto w-full p-8 pt-16">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold text-primary mb-8 text-center">{about.title || "关于我们"}</h1>

                    <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-8 rounded-2xl mb-12">
                        <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
                            {about.content}
                        </div>
                    </div>
                </div>

                {/* Subsections (R&D, Factory) */}
                {/* R&D and Manufacturing Sections - Detailed Gallery Layout */}
                <div className="space-y-24 mt-16 border-t border-border pt-16">

                    {/* R&D Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-primary">研发实力 (R&D)</h2>
                            <div className="border-l-4 border-primary pl-4">
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    始终坚持"材料基因组"研发理念，以科学驱动创新。
                                </p>
                                <p className="text-sm text-muted-foreground mt-4">
                                    {about.subsections?.[0]?.content}
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative h-48 md:h-64 bg-card rounded-2xl overflow-hidden shadow-lg border border-border">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/images/doc/rd_lab_bright.jpg" alt="R&D Material Analysis" className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="relative h-48 md:h-64 bg-card rounded-2xl overflow-hidden shadow-lg border border-border mt-8">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/images/doc/rd_lab_v3.jpg" alt="R&D Experimental Setup" className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                            </div>
                        </div>
                    </div>

                    {/* Manufacturing Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="order-2 md:order-1 grid grid-cols-2 gap-4">
                            <div className="relative h-48 md:h-64 bg-card rounded-2xl overflow-hidden shadow-lg border border-border mt-8">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/images/doc/mfg_factory_1.jpg" alt="Compounding and Mixing Workshop" className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="relative h-48 md:h-64 bg-card rounded-2xl overflow-hidden shadow-lg border border-border">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/images/doc/mfg_coating.jpg" alt="Precision Coating Line" className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                            </div>
                        </div>
                        <div className="order-1 md:order-2 space-y-6">
                            <h2 className="text-3xl font-bold text-accent">制造能力 (Manufacturing)</h2>
                            <div className="border-l-4 border-accent pl-4">
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    拥有万级洁净车间与全自动精密涂布产线。
                                </p>
                                <p className="text-sm text-muted-foreground mt-4">
                                    {about.subsections?.[1]?.content}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

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
