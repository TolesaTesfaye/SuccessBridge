import React from "react";
import { Card, CardBody, CardHeader } from "@components/common/Card";
import {
  ResourceUploadForm,
  UploadFormData,
} from "@components/resources/ResourceUploadForm";
import { Upload, Zap } from "lucide-react";

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
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
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
