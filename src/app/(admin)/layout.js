import './globals.admin.css';

export default function AdminLayout({ children }) {
  return (
    <div className="admin-wrapper">
      {/* Sidebar / Header admin */}
      <main>{children}</main>
    </div>
  );
}
