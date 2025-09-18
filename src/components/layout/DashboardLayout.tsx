import { Outlet } from "react-router";
import { AppSidebar } from "../app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { ModeToggle } from "./mode.toggle";
import LogoutButton from "../modules/Buttons/LogoutButton";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex sticky top-0 bg-background h-16 shrink-0 justify-between items-center gap-2 border-b px-4 z-50">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-x-2">
            <ModeToggle />
            <LogoutButton />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
