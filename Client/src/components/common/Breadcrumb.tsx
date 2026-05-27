import React from "react";
import { cn } from "@/lib/utils";

export function Breadcrumb({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn(className)}>
      {children}
    </nav>
  );
}

export function BreadcrumbList({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <ol
      className={cn(
        "flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground",
        className,
      )}
    >
      {children}
    </ol>
  );
}

export function BreadcrumbItem({ children }: { children: React.ReactNode }) {
  return <li className="inline-flex items-center gap-1.5">{children}</li>;
}

export function BreadcrumbLink({
  href,
  children,
}: {
  href?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href ?? "#"}
      className="transition-colors hover:text-foreground"
      onClick={(e) => href === "#" && e.preventDefault()}
    >
      {children}
    </a>
  );
}

export function BreadcrumbPage({ children }: { children: React.ReactNode }) {
  return <span className="font-medium text-foreground">{children}</span>;
}

export function BreadcrumbSeparator() {
  return <span className="text-muted-foreground/60">/</span>;
}
