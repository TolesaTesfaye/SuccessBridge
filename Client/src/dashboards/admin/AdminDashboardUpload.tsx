import React, { useState } from "react";
import { Card, CardBody, CardHeader } from "@components/common/Card";
import {
  ResourceUploadForm,
  UploadFormData,
} from "@components/resources/ResourceUploadForm";
import { Sparkles, Upload, FileUp, ShieldCheck, Zap } from "lucide-react";
import { DashboardFormSkeleton } from "@components/dashboards/DashboardSkeleton";

interface AdminDashboardUploadProps {
  onUploadSubmit: (data: UploadFormData) => Promise<void>;
  uploading: boolean;
  uploadFormKey: number;
}

export const AdminDashboardUpload: React.FC<AdminDashboardUploadProps> = ({
  onUploadSubmit,
  uploading,
  uploadFormKey,
}) => {
  const [initialLoading, setInitialLoading] = useState(false); // Simulate metadata loading if needed

  if (initialLoading) {
    return <DashboardFormSkeleton />;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Hero Section */}
      <div className="relative overflow-hidden border border-slate-200 bg-[#0f172a] px-8 py-10 text-white shadow-2xl dark:border-white/5 -mx-4 md:-mx-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.2),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.1),transparent_35%)]" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div className="space-y-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 backdrop-blur-md">
              <Sparkles className="h-4 w-4" />
              Resource Deployment
            </div>
            <h2 className="text-4xl font-black tracking-tight leading-tight sm:text-5xl">
              Knowledge Distribution Engine.
            </h2>
            <p className="text-lg font-medium text-slate-300/80 leading-relaxed">
              Scale your educational impact. Upload modules, reference
              materials, and assessments to the global SuccessBridge repository
              with precise student targeting.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 shrink-0 lg:w-96">
            <div className="p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 mb-4 inline-flex">
                <FileUp className="w-5 h-5" />
              </div>
              <div className="text-sm font-black uppercase tracking-widest text-slate-400 mb-1">
                Upload Pipeline
              </div>
              <div className="text-xs font-bold text-emerald-500 flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Operational
              </div>
            </div>
            <div className="p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="p-3 rounded-2xl bg-blue-500/20 text-blue-400 mb-4 inline-flex">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-sm font-black uppercase tracking-widest text-slate-400 mb-1">
                Integrity Check
              </div>
              <div className="text-xs font-bold text-blue-400">
                Automated Scan
              </div>
            </div>
          </div>
        </div>
      </div>

      <Card className="border-none shadow-2xl bg-white dark:bg-[#1a1b23] overflow-hidden">
        <CardHeader className="border-b border-slate-100 dark:border-white/5 p-8 flex flex-row items-center justify-between bg-slate-50/50 dark:bg-white/[0.02]">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-500 shadow-inner">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                Configuration Console
              </h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">
                Define metadata & deployment parameters
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20">
              <Zap className="w-4 h-4 text-amber-500" />
              <span className="text-[10px] font-black text-amber-700 dark:text-amber-300 uppercase tracking-widest">
                Optimized Payload
              </span>
            </div>
          </div>
        </CardHeader>
        <CardBody className="p-8">
          <ResourceUploadForm
            key={uploadFormKey}
            onSubmit={onUploadSubmit}
            loading={uploading}
          />
        </CardBody>
      </Card>
    </div>
  );
};
