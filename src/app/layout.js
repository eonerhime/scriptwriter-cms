import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "next-themes";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "300", "400", "700", "900"],
});
export const metadata = {
  title: {
    template: "Ifeoma Emo-Onerhime CMS - %s",
    default: "Welcome - Ifeoma Emo-Onerhime",
  },
  description: "Content Management System for Ifeoma's website.",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.className} antialiased h-screen flex flex-col`}
      >
        {/* Dark mode support */}
        <ThemeProvider attribute="class" defaultTheme="system">
          <Header />
          <main className="flex-1 flex flex-col">
            <div className="flex-1">{children}</div>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
