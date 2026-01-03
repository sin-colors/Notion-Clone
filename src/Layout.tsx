import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="h-full flex">
      <div className="w-32 bg-blue-400"></div>
      <main className="flex-1 h-full overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
