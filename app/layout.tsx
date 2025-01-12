import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Modal from "./components/modal/Modal";
import LoginModal from "./components/modal/LoginModal";
import SignUpModal from "./components/modal/SignUpModal";
import AddPropertyModal from "./components/modal/AddPropertyModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EnBnb",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        <div className="pt-48 px-6">
          {children}
        </div>
        <LoginModal/>
        <SignUpModal/>
        <AddPropertyModal/>
        <Footer/>
      </body>
    </html>
  );
}
