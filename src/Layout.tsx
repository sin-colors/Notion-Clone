import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUserStore } from "./lib/jotai/current-user.state";

function Layout() {
  const { currentUser } = useCurrentUserStore();
  if (!currentUser) return <Navigate replace to="/signin" />;
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
