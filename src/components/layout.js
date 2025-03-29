import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { Montserrat } from "next/font/google";

import FloatingButton from "@/components/FloatingButton";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata = {
  title: {
    template: "Ifeoma Emo-Onerhime - %s",
    default: "Welcome - Ifeoma Emo-Onerhime",
  },
  description:
    "As scriptwriter, I make visual your movie, sitcom, TV series, and documentary ideas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} antialiased min-w-full min-h-screen flex flex-col relative box-border`}
      >
        <ThemeProvider attribute="class" defaultTheme="system">
          <Header />
          <div className="flex-1 flex flex-col w-full h-full">
            <main className="flex-grow flex flex-col justify-between w-full max-w-7xl px-6 md:px-12">
              {children}
            </main>
          </div>

          <Footer />

          <FloatingButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
