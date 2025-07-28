import Navbar from "./components/navbar/navbar";
import "./globals.css";

export default function UserLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      {/* Footer */}
    </>
  );
}
