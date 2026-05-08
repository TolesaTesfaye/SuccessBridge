import React from "react";

export const Skeleton: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`animate-pulse rounded bg-slate-200 dark:bg-slate-800 ${className}`} />
);

export const DashboardHeroSkeleton: React.FC = () => (
  <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white p-8 dark:border-white/5 dark:bg-[#0f172a] sm:px-10 sm:py-12">
    <div className="relative z-10 grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
      <div className="space-y-6">
        <Skeleton className="h-8 w-40 rounded-full" />
        <div className="space-y-3">
          <Skeleton className="h-12 w-full max-w-xl" />
          <Skeleton className="h-6 w-full max-w-lg" />
        </div>
        <div className="flex gap-4">
          <Skeleton className="h-12 w-40 rounded-2xl" />
          <Skeleton className="h-12 w-40 rounded-2xl" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-3xl border border-slate-100 bg-slate-50/50 p-6 dark:border-white/5 dark:bg-white/5">
            <Skeleton className="h-10 w-10 rounded-2xl mb-4" />
            <Skeleton className="h-8 w-16 mb-2" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const DashboardListSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => (
  <Card className="border-none shadow-xl bg-white dark:bg-[#1a1b23] overflow-hidden">
    <CardHeader className="border-b border-slate-100 dark:border-white/5 p-6">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-xl" />
        <Skeleton className="h-6 w-48" />
      </div>
    </CardHeader>
    <CardBody className="p-0">
      <div className="divide-y divide-slate-100 dark:divide-white/5">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-6 p-6">
            <div className="flex-1_space-y-2">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-20 rounded-xl" />
          </div>
        ))}
      </div>
    </CardBody>
  </Card>
);

export const DashboardGridSkeleton: React.FC<{ items?: number }> = ({ items = 6 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
    {Array.from({ length: items }).map((_, i) => (
      <div key={i} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl dark:border-white/5 dark:bg-[#1a1b23]">
        <Skeleton className="h-24 w-full rounded-2xl mb-6" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-3/4" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-slate-50 dark:border-white/5">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(j => <Skeleton key={j} className="h-8 w-8 rounded-full border-2 border-white dark:border-[#1a1b23]" />)}
            </div>
            <Skeleton className="h-10 w-28 rounded-xl" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export const AnalyticsSkeleton: React.FC = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="p-6 rounded-3xl bg-white dark:bg-[#1a1b23] shadow-xl space-y-4">
          <div className="flex justify-between">
            <Skeleton className="h-10 w-10 rounded-2xl" />
            <Skeleton className="h-6 w-12 rounded-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-32" />
          </div>
          <Skeleton className="h-1.5 w-full rounded-full" />
        </div>
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-[#1a1b23] shadow-xl">
        <div className="flex justify-between mb-8">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-[240px] w-full rounded-2xl" />
      </div>
      <div className="p-6 rounded-3xl bg-white dark:bg-[#1a1b23] shadow-xl">
        <Skeleton className="h-6 w-48 mb-8" />
        <div className="space-y-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-12" />
              </div>
              <Skeleton className="h-3 w-full rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const DashboardFormSkeleton: React.FC = () => (
  <div className="space-y-8 animate-pulse">
    <div className="h-[200px] rounded-[40px] bg-slate-100 dark:bg-white/5" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="space-y-2">
            <div className="h-3 w-24 bg-slate-100 dark:bg-white/5 rounded-full" />
            <div className="h-14 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5" />
          </div>
        ))}
      </div>
      <div className="space-y-6">
        {[1, 2].map(i => (
          <div key={i} className="p-6 rounded-3xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 space-y-4">
            <div className="h-4 w-32 bg-slate-100 dark:bg-white/5 rounded-full" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-12 rounded-xl bg-slate-100 dark:bg-white/5" />
              <div className="h-12 rounded-xl bg-slate-100 dark:bg-white/5" />
            </div>
          </div>
        ))}
        <div className="h-40 rounded-[20px] border-2 border-dashed border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02]" />
      </div>
    </div>
    <div className="flex justify-end pt-6">
      <div className="h-14 w-64 rounded-2xl bg-slate-100 dark:bg-white/5" />
    </div>
  </div>
);

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`rounded-3xl ${className}`}>{children}</div>
);
const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={className}>{children}</div>
);
const CardBody: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={className}>{children}</div>
);
