import React, { useState, useEffect } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import { Briefcase, Award, Sun, Moon, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isDark, setIsDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("skillbridge-theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      window.localStorage.setItem("skillbridge-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      window.localStorage.setItem("skillbridge-theme", "light");
    }
  };

  const navItems = [
    { to: "/", label: "Task Board", icon: Briefcase },
    { to: "/my-experience", label: "My Experience", icon: Award },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/85">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
          <Link
            to="/"
            className="flex items-center gap-2.5 text-foreground hover:opacity-90 transition-opacity"
          >
            <div className="h-9 w-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-heading font-bold text-base shadow-sm">
              SB
            </div>
            <span className="font-heading font-bold text-xl tracking-tight text-foreground">
              SkillBridge
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <nav
              aria-label="Primary Navigation"
              className="hidden md:flex items-center gap-1"
            >
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      `flex items-center gap-2 whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? "bg-secondary text-secondary-foreground font-semibold"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`
                    }
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="text-muted-foreground hover:text-foreground rounded-lg"
            >
              {isDark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            <div className="md:hidden">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Open navigation menu"
                    className="rounded-lg"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-72">
                  <SheetHeader className="text-left pb-4 border-b border-border">
                    <SheetTitle className="flex items-center gap-2 font-heading font-bold text-lg">
                      <div className="h-7 w-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                        SB
                      </div>
                      SkillBridge
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col gap-1.5 mt-6">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <NavLink
                          key={item.to}
                          to={item.to}
                          end={item.to === "/"}
                          onClick={() => setMobileOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center gap-2.5 whitespace-nowrap rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors ${
                              isActive
                                ? "bg-secondary text-secondary-foreground font-semibold"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                            }`
                          }
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </NavLink>
                      );
                    })}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full min-w-0 px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {children ?? <Outlet />}
      </main>
    </div>
  );
}
