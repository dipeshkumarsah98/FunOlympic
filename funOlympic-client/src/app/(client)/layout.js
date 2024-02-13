import { Inter } from "next/font/google";
import "../globals.css";
import Footer from "@/components/footer";
import CenterNavbar from "@/components/centerNavbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FunOlympic",
  description: "An app for fun Olympic games",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className={inter.className + "h-full"}>
        <CenterNavbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
