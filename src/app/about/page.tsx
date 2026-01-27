import { getLocalData } from "@/lib/data";
import Link from "next/link";

export default async function AboutPage() {
    const data = await getLocalData();
    const about = data.general?.about || {};

    return (
        <main className="min-h-screen bg-background flex flex-col">
            {/* Navbar */}
            <nav className="w-full h-16 border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between px-8">
                <Link href="/" className="text-xl font-bold tracking-tight text-primary">MAT-TECH 材科</Link>
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
                    <p className="text-lg text-foreground leading-loose">
                        {about.content}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="p-6 border border-border rounded-xl bg-card">
                        <h3 className="text-xl font-bold mb-4 text-primary">企业使命</h3>
                        <p className="text-muted-foreground">{about.mission}</p>
                    </div>
                    <div className="p-6 border border-border rounded-xl bg-card">
                        <h3 className="text-xl font-bold mb-4 text-primary">企业愿景</h3>
                        <p className="text-muted-foreground">{about.vision}</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
