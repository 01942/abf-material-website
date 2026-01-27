import type { Metadata } from "next";
import { Inter } from "next/font/google"; // High-tech, clean font
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | 深圳一捧春晖科技有限公司 - 先进ABF类胶膜材料",
    default: "深圳一捧春晖科技有限公司 | 高性能ABF类积层胶膜 (Ajinomoto Build-up Film) 解决方案",
  },
  description: "深圳一捧春晖科技有限公司专注于研发和生产高性能ABF类积层胶膜，服务于先进半导体封装(2.5D/3D, Chiplet)。提供低介电损耗、高热稳定性的IC封装材料解决方案。",
  keywords: ["ABF", "积层胶膜", "半导体封装", "先进封装", "Ajinomoto Build-up Film", "HDI", "IC载板", "介电材料", "一捧春晖科技"],
  authors: [{ name: "深圳一捧春晖科技有限公司" }],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "深圳一捧春晖科技有限公司",
    title: "深圳一捧春晖科技有限公司 | 面向未来的先进封装材料",
    description: "专为高密度互连设计的新一代积层胶膜，提供卓越的热稳定性和优异的电绝缘性能。",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "ZeXV2egNoHp0O2ckgVqwAjYbgEctps7VjIZKQ6DUEhU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 
        bg-background/text-foreground sets the base scientific theme
        antialiased ensures text is crisp
      */}
      <body className={cn(inter.className, "min-h-screen bg-background text-foreground antialiased")}>
        {children}
      </body>
    </html>
  );
}
