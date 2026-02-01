import { getLocalData } from "@/lib/data";
import Link from "next/link";
import { MapPin, Mail, Phone, User } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export default async function ContactPage() {
    const data = await getLocalData();
    const contact = data.general?.contact || {};

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
                    <Link href="/about" className="hover:text-primary transition-colors">关于我们</Link>
                    <Link href="/contact" className="text-primary font-bold">联系我们</Link>
                </div>
            </nav>

            <div className="max-w-4xl mx-auto w-full p-8 pt-16">
                <h1 className="text-4xl font-bold text-primary mb-12">{contact.title || "联系我们"}</h1>

                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        {contact.person && (
                            <div className="flex items-start gap-4">
                                <div className="bg-secondary p-3 rounded-lg text-primary">
                                    <User size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold mb-1">联系人</h3>
                                    <p className="text-muted-foreground">{contact.person}</p>
                                </div>
                            </div>
                        )}

                        <div className="flex items-start gap-4">
                            <div className="bg-secondary p-3 rounded-lg text-primary">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold mb-1">公司地址</h3>
                                <p className="text-muted-foreground">{contact.address}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-secondary p-3 rounded-lg text-primary">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold mb-1">电子邮箱</h3>
                                <p className="text-muted-foreground">{contact.email}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-secondary p-3 rounded-lg text-primary">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold mb-1">联系电话</h3>
                                <p className="text-muted-foreground">{contact.phone}</p>
                            </div>
                        </div>
                    </div>


                    {/* Functional Contact Form */}
                    <ContactForm />
                </div>
            </div>
        </main>
    );
}
