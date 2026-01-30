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

                <div className="grid md:grid-cols-1 gap-8 mb-16">
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

                {/* Technical Comparison Table */}
                <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                    <div className="p-8 border-b border-border bg-secondary/30">
                        <h2 className="text-2xl font-bold text-foreground mb-2">产品系列性能对比</h2>
                        <p className="text-muted-foreground">TC 系列积层胶膜关键技术参数</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="bg-muted/50">
                                    <th className="p-4 pl-8 font-semibold text-foreground">项目 (Properties)</th>
                                    <th className="p-4 font-bold text-blue-600">TC1700 (High Performance)</th>
                                    <th className="p-4 font-bold text-teal-600">TC10 (High Thermal)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                <tr className="hover:bg-muted/20">
                                    <td className="p-4 pl-8 font-medium text-foreground">熔融粘度 (Melt Viscosity)</td>
                                    <td className="p-4 text-muted-foreground">125℃ @ 200 Pa·s</td>
                                    <td className="p-4 text-muted-foreground">115℃ @ 230 Pa·s</td>
                                </tr>
                                <tr className="hover:bg-muted/20">
                                    <td className="p-4 pl-8 font-medium text-foreground">玻璃化转变温度 (Tg @ DMA)</td>
                                    <td className="p-4 text-muted-foreground">200°C</td>
                                    <td className="p-4 text-muted-foreground">175°C</td>
                                </tr>
                                <tr className="hover:bg-muted/20">
                                    <td className="p-4 pl-8 font-medium text-foreground">热膨胀系数 (CTE 30-150℃)</td>
                                    <td className="p-4 text-muted-foreground">13 ppm/K</td>
                                    <td className="p-4 text-muted-foreground">14 ppm/K</td>
                                </tr>
                                <tr className="hover:bg-muted/20">
                                    <td className="p-4 pl-8 font-medium text-foreground">热膨胀系数 (CTE 150-240℃)</td>
                                    <td className="p-4 text-muted-foreground">47 ppm/K</td>
                                    <td className="p-4 text-muted-foreground">40 ppm/K</td>
                                </tr>
                                <tr className="hover:bg-muted/20">
                                    <td className="p-4 pl-8 font-medium text-foreground">杨氏模量 (Young&apos;s Modulus)</td>
                                    <td className="p-4 text-muted-foreground">10 GPa</td>
                                    <td className="p-4 text-muted-foreground">8 GPa</td>
                                </tr>
                                <tr className="hover:bg-muted/20">
                                    <td className="p-4 pl-8 font-medium text-foreground">断裂强度 (Breaking Strength)</td>
                                    <td className="p-4 text-muted-foreground">120 MPa</td>
                                    <td className="p-4 text-muted-foreground">80 MPa</td>
                                </tr>
                                <tr className="hover:bg-muted/20">
                                    <td className="p-4 pl-8 font-medium text-foreground">介电常数 (Dk @ 5GHz)</td>
                                    <td className="p-4 text-muted-foreground">3.3</td>
                                    <td className="p-4 text-muted-foreground">3.5</td>
                                </tr>
                                <tr className="hover:bg-muted/20">
                                    <td className="p-4 pl-8 font-medium text-foreground">介电损耗 (Df @ 5GHz)</td>
                                    <td className="p-4 font-bold text-primary">0.007</td>
                                    <td className="p-4 font-bold text-primary">0.006</td>
                                </tr>
                                <tr className="bg-yellow-50 dark:bg-yellow-900/10 hover:bg-yellow-100/50 dark:hover:bg-yellow-900/20">
                                    <td className="p-4 pl-8 font-bold text-foreground">导热系数 (Thermal Conductivity)</td>
                                    <td className="p-4 text-muted-foreground">0.8 W/m·K</td>
                                    <td className="p-4 font-bold text-orange-600">8 W/m·K (High!)</td>
                                </tr>
                                <tr className="hover:bg-muted/20">
                                    <td className="p-4 pl-8 font-medium text-foreground">工艺兼容性 (Process)</td>
                                    <td className="p-4 text-muted-foreground">Sputter (溅射)</td>
                                    <td className="p-4 text-muted-foreground">Sputter (溅射)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}
