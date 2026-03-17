import { Outlet } from 'react-router-dom';
import {
  SidebarProvider,
  SidebarTrigger,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';
import { NavLink } from '@/components/NavLink';
import { useLocation, Link } from 'react-router-dom';
import { LayoutDashboard, Kanban, Users, Package, ArrowLeft } from 'lucide-react';

const adminLinks = [
  { title: 'Dashboard', url: '/admin', icon: LayoutDashboard },
  { title: 'Encomendas', url: '/admin/encomendas', icon: Kanban },
  { title: 'Clubes', url: '/admin/clubes', icon: Users },
  { title: 'Produtos', url: '/admin/produtos', icon: Package },
];

function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarContent className="bg-sidebar">
        {/* Logo */}
        <div className={`flex items-center ${collapsed ? 'justify-center p-3' : 'gap-2 p-4'}`}>
          <img src="/favicon.png" alt="UIN Sports" className="w-8 h-8 rounded-full flex-shrink-0" />
          {!collapsed && <span className="font-display text-sidebar-foreground text-sm tracking-wider">BACKOFFICE</span>}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/40">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminLinks.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === '/admin'}
                      className="text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Back to site */}
        <div className="mt-auto p-4">
          <Link to="/" className="flex items-center gap-2 text-xs text-sidebar-foreground/40 hover:text-sidebar-foreground transition-colors">
            <ArrowLeft className="w-3 h-3" />
            {!collapsed && <span>Voltar ao Site</span>}
          </Link>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-12 flex items-center border-b px-4 bg-card">
            <SidebarTrigger className="mr-4" />
            <span className="text-sm font-semibold text-muted-foreground">UIN Sports · Backoffice</span>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
