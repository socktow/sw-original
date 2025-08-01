import Footer from "./components/footer/footer";
import Navbar from "./components/navbar/navbar";
import "./globals.css";

export default function UserLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
