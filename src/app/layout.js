import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ReactQueryProvider from "@/components/QueryClientProviderWrapper";
import AuthProvider from "@/components/SessionProvider";
import SideBar from "@/components/SideBar";
import { ToastProvider } from "@/components/ToastProvider";
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
  icons: {
    icon: "/favicon.ico",
  },
};

export const dynamic = "force-dynamic";

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
            <ReactQueryProvider>
              <Header />
              {/* There's an active user session */}
              {session ? (
                <main className="flex w-full">
                  <SideBar />
                  <div className="max-w-6xl w-full">{children}</div>
                </main>
              ) : (
                /* There's no active user session */
                <main className="flex-1 flex flex-col">
                  <div className="flex-1">{children}</div>
                </main>
              )}
              <Footer />
              <ToastProvider />
            </ReactQueryProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
