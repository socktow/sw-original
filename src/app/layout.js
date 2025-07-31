import { Inter } from "next/font/google";
import ClientWrapper from "@/components/ClientWrapper";
import InitialUserLoader from "@/app/InitialUserLoader"; 
import { getUserFromToken } from "@/lib/auth/server/user.server";

const inter = Inter({ subsets: ["latin"] });

export default async function LocaleLayout({ children, params }) {
  const user = await getUserFromToken();

  return (
    <html lang={params.locale}>
      <body className={inter.className}>
        <ClientWrapper>
          <InitialUserLoader user={user} />
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
