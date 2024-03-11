import { Inter } from "next/font/google";
import "../globals.css";
import Footer from "@/components/footer";
import CenterNavbar from "@/components/centerNavbar";
import Providers from "@/lib/providers";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FunOlympic",
  description: "An app for fun Olympic games",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(options);
  return (
    <html lang="en" className="h-full">
      <body className={inter.className + "h-full"}>
        <Providers authSession={session}>
          <CenterNavbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
