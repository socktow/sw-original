import { Inter } from "next/font/google";
import ClientWrapper from "@/components/ClientWrapper";

const inter = Inter({ subsets: ["latin"] });

export default function LocaleLayout({ children, params }) {
  return (
    <html lang={params.locale}>
      <body className={inter.className}>
        <ClientWrapper locale={params.locale}>{children}</ClientWrapper>
      </body>
    </html>
  );
}
