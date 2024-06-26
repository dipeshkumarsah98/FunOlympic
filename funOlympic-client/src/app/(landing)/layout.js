import "../globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Providers from "@/lib/providers";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

export const metadata = {
  title: "FunOlympic",
  description: "An app for fun Olympic games",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(options);
  return (
    <html lang="en" className="h-full">
      <body className={"h-full"}>
        <Providers authSession={session}>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
