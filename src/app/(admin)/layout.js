import "./globals.admin.css";
import Sidebar from "@/app/(admin)/components/sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 bg-gray-100">
        <header className="bg-white shadow p-4">
          <b>Admin Header</b>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
