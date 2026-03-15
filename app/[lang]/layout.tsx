import "../globals.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Poppins, Nunito } from "next/font/google";
import { getDictionary } from "../lib/get-dictionary";
export const metadata = {
  metadataBase: new URL("https://www.domaformalis.com")
}

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || "fr";

  const dict = await getDictionary(lang);

  return (
    <html lang={lang} className={`${poppins.variable} ${nunito.variable}`}>
      <body>
        <Header lang={lang} dict={dict.Navigation} />

        <main>{children}</main>

        <Footer lang={lang} dict={dict} />
      </body>
    </html>
  );
}