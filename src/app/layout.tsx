import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RecoilWrapper from "./Components/RecoilWrapper/RecoilWrapper";
import { AuthProvider } from "./Components/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TnNdshN Admin Pannel",
  description: "created by 1919 dev team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <RecoilWrapper>
            {children}
          </RecoilWrapper>
        </AuthProvider>


      </body>
    </html>
  );
}
