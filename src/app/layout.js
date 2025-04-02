import Footer from "@/components/Footer";
import Header from "@/components/Header";
import AuthProvider from "@/components/SessionProvider";
import SideBar from "@/components/SideBar";
import { auth } from "@/lib/auth";
import "@/styles/globals.css";
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
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.className} antialiased h-screen flex flex-col`}
      >
        {/* Dark mode support */}
        <ThemeProvider attribute="class" defaultTheme="system">
          <AuthProvider>
            <Header />
            {session ? (
              <main session={session} className="flex ">
                <SideBar />
                <div className="">{children}</div>
              </main>
            ) : (
              <main className="flex-1 flex flex-col">
                <div className="flex-1">{children}</div>
              </main>
            )}
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
