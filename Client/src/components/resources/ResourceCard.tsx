import React, { useState } from "react";
import { type Resource } from "@types";
import { useToast } from "@components/common/Toast";
import {
  ExternalLink,
  Download,
  FileText,
  Video,
  BookOpen,
  PenTool,
  Layers,
  Briefcase,
  FlaskConical,
  ClipboardList,
  Target,
} from "lucide-react";
import { ResourceViewer } from "./ResourceViewer";

interface ResourceCardProps {
  resource: Resource;
  onEdit?: () => void;
  onDelete?: () => void;
  showAdminActions?: boolean;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  onEdit,
  onDelete,
  showAdminActions = false,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const toast = useToast();
  const createdTime = new Date(resource.createdAt).getTime();
  const isNew = Date.now() - createdTime < 7 * 24 * 60 * 60 * 1000; // last 7 days
  
  // Fetch preview URL for private bucket resources
  React.useEffect(() => {
    const fetchPreviewUrl = async () => {
      if (!resource.fileUrl || !resource.fileUrl.includes('backblazeb2.com')) {
        return; // Not a B2 file or no file
      }
      
      try {
        const baseUrl =
          import.meta.env.VITE_API_URL || 
          (window.location.hostname === 'localhost' 
            ? "http://localhost:5000/api"
            : "https://successbridge-tolesa-api.onrender.com/api");
        
        const response = await fetch(`${baseUrl}/resources/${resource.id}/preview`);
        const data = await response.json();
        
        if (data.success && data.url) {
          setPreviewUrl(data.url);
        }
      } catch (error) {
        console.error('Failed to fetch preview URL:', error);
        // Silently fail - will show icon thumbnail instead
      }
    };
    
    fetchPreviewUrl();
  }, [resource.id, resource.fileUrl]);
  
  const getResourceIcon = (type: string) => {
    const icons: Record<string, React.ReactNode> = {
      textbook: <BookOpen className="w-3.5 h-3.5 md:w-4 md:h-4" />,
      video: <Video className="w-3.5 h-3.5 md:w-4 md:h-4" />,
      past_exam: <ClipboardList className="w-3.5 h-3.5 md:w-4 md:h-4" />,
      module: <Layers className="w-3.5 h-3.5 md:w-4 md:h-4" />,
      quiz: <PenTool className="w-3.5 h-3.5 md:w-4 md:h-4" />,
      worksheet: <FileText className="w-3.5 h-3.5 md:w-4 md:h-4" />,
      project: <Target className="w-3.5 h-3.5 md:w-4 md:h-4" />,
      research: <FlaskConical className="w-3.5 h-3.5 md:w-4 md:h-4" />,
      career: <Briefcase className="w-3.5 h-3.5 md:w-4 md:h-4" />,
    };
    return icons[type] || <FileText className="w-5 h-5" />;
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      textbook:
        "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400",
      video: "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400",
      past_exam:
        "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400",
      module:
        "bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400",
      quiz: "bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400",
      worksheet:
        "bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
      project:
        "bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400",
      research:
        "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      career: "bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400",
    };
    return (
      colors[type] ||
      "bg-slate-50 dark:bg-slate-500/10 text-slate-600 dark:text-slate-400"
    );
  };

  const getTypeLabel = (type: string) => {
    if (type === "module") return "LOE MODULE";
    return type.replace("_", " ");
  };

  const getFullUrl = (url: string) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;

    // Get the base URL from environment or default to localhost
    const baseUrl = import.meta.env.VITE_API_URL
      ? import.meta.env.VITE_API_URL.replace("/api", "")
      : "http://localhost:5000";

    // Ensure the URL starts with / for file resources
    const cleanUrl = url.startsWith("/") ? url : `/${url}`;
    return `${baseUrl}${cleanUrl}`;
  };

  const renderThumbnail = () => {
    if (!resource.fileUrl) {
      // Show default thumbnail based on type when no file URL
      return (
        <div className="mb-1 md:mb-1 -mx-2 md:mx-0 md:rounded-md overflow-hidden border-y md:border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center h-16 md:h-20 lg:h-32">
          <div className="text-slate-400 dark:text-slate-600">
            {getResourceIcon(resource.type)}
          </div>
        </div>
      );
    }

    const lowerUrl = resource.fileUrl.toLowerCase();

    // If we have a preview URL (signed URL for private bucket), show actual preview
    if (previewUrl) {
      // PDF preview
      if (lowerUrl.endsWith(".pdf")) {
        return (
          <div className="mb-1 md:mb-1 -mx-2 md:mx-0 md:rounded-md overflow-hidden border-y md:border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
            <iframe
              src={`${previewUrl}#page=1&view=fitH`}
              title={resource.title}
              className="w-full h-16 md:h-20 lg:h-32 bg-white pointer-events-none"
              scrolling="no"
              loading="lazy"
              onError={(e) => {
                // Fallback to icon if preview fails
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  parent.innerHTML = `
                    <div class="w-full h-16 md:h-20 lg:h-32 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 flex flex-col items-center justify-center gap-1">
                      <svg class="w-8 h-8 md:w-10 md:h-10 text-red-500 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"/>
                      </svg>
                      <span class="text-[8px] md:text-[9px] font-semibold text-red-600 dark:text-red-400 uppercase tracking-wide">PDF</span>
                    </div>
                  `;
                }
              }}
            />
          </div>
        );
      }

      // Image preview
      if (
        lowerUrl.endsWith(".jpg") ||
        lowerUrl.endsWith(".jpeg") ||
        lowerUrl.endsWith(".png") ||
        lowerUrl.endsWith(".gif") ||
        lowerUrl.endsWith(".webp")
      ) {
        return (
          <div className="mb-1 md:mb-1 -mx-2 md:mx-0 md:rounded-md overflow-hidden border-y md:border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900">
            <img
              src={previewUrl}
              alt={resource.title}
              className="w-full h-16 md:h-20 lg:h-32 object-cover"
              loading="lazy"
              onError={(e) => {
                // Fallback to icon if image fails
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  parent.innerHTML = `
                    <div class="w-full h-16 md:h-20 lg:h-32 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 flex flex-col items-center justify-center gap-1">
                      <svg class="w-8 h-8 md:w-10 md:h-10 text-blue-500 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
                      </svg>
                      <span class="text-[8px] md:text-[9px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">Image</span>
                    </div>
                  `;
                }
              }}
            />
          </div>
        );
      }

      // Video preview
      if (resource.type === "video" || lowerUrl.endsWith(".mp4") || lowerUrl.endsWith(".webm") || lowerUrl.endsWith(".mov")) {
        return (
          <div className="mb-1 md:mb-1 -mx-2 md:mx-0 md:rounded-md overflow-hidden border-y md:border border-slate-200 dark:border-slate-700 bg-black/80">
            <video
              src={previewUrl}
              className="w-full h-16 md:h-20 lg:h-32 object-cover pointer-events-none"
              controls={false}
              muted
              playsInline
              preload="metadata"
              onError={(e) => {
                // Fallback to icon if video fails
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  parent.innerHTML = `
                    <div class="w-full h-16 md:h-20 lg:h-32 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 flex flex-col items-center justify-center gap-1">
                      <svg class="w-8 h-8 md:w-10 md:h-10 text-purple-500 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
                      </svg>
                      <span class="text-[8px] md:text-[9px] font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wide">Video</span>
                    </div>
                  `;
                }
              }}
            />
          </div>
        );
      }
    }

    // Fallback: Icon-based thumbnails (when preview URL not available yet or for other file types)
    
    // PDF thumbnail
    if (lowerUrl.endsWith(".pdf")) {
      return (
        <div className="mb-1 md:mb-1 -mx-2 md:mx-0 md:rounded-md overflow-hidden border-y md:border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 flex flex-col items-center justify-center h-16 md:h-20 lg:h-32 gap-1">
          <svg className="w-8 h-8 md:w-10 md:h-10 text-red-500 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"/>
          </svg>
          <span className="text-[8px] md:text-[9px] font-semibold text-red-600 dark:text-red-400 uppercase tracking-wide">
            PDF
          </span>
        </div>
      );
    }

    // Image thumbnail
    if (
      lowerUrl.endsWith(".jpg") ||
      lowerUrl.endsWith(".jpeg") ||
      lowerUrl.endsWith(".png") ||
      lowerUrl.endsWith(".gif") ||
      lowerUrl.endsWith(".webp")
    ) {
      return (
        <div className="mb-1 md:mb-1 -mx-2 md:mx-0 md:rounded-md overflow-hidden border-y md:border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 flex flex-col items-center justify-center h-16 md:h-20 lg:h-32 gap-1">
          <svg className="w-8 h-8 md:w-10 md:h-10 text-blue-500 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
          </svg>
          <span className="text-[8px] md:text-[9px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
            Image
          </span>
        </div>
      );
    }

    // Video thumbnail
    if (resource.type === "video" || lowerUrl.endsWith(".mp4") || lowerUrl.endsWith(".webm") || lowerUrl.endsWith(".mov")) {
      return (
        <div className="mb-1 md:mb-1 -mx-2 md:mx-0 md:rounded-md overflow-hidden border-y md:border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 flex flex-col items-center justify-center h-16 md:h-20 lg:h-32 gap-1">
          <svg className="w-8 h-8 md:w-10 md:h-10 text-purple-500 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
          </svg>
          <span className="text-[8px] md:text-[9px] font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wide">
            Video
          </span>
        </div>
      );
    }

    // Word document thumbnail
    if (lowerUrl.endsWith(".doc") || lowerUrl.endsWith(".docx")) {
      return (
        <div className="mb-1 md:mb-1 -mx-2 md:mx-0 md:rounded-md overflow-hidden border-y md:border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 flex flex-col items-center justify-center h-16 md:h-20 lg:h-32 gap-1">
          <svg className="w-8 h-8 md:w-10 md:h-10 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"/>
          </svg>
          <span className="text-[8px] md:text-[9px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
            Word
          </span>
        </div>
      );
    }

    // Excel document thumbnail
    if (lowerUrl.endsWith(".xls") || lowerUrl.endsWith(".xlsx")) {
      return (
        <div className="mb-1 md:mb-1 -mx-2 md:mx-0 md:rounded-md overflow-hidden border-y md:border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 flex flex-col items-center justify-center h-16 md:h-20 lg:h-32 gap-1">
          <svg className="w-8 h-8 md:w-10 md:h-10 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"/>
          </svg>
          <span className="text-[8px] md:text-[9px] font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide">
            Excel
          </span>
        </div>
      );
    }

    // PowerPoint document thumbnail
    if (lowerUrl.endsWith(".ppt") || lowerUrl.endsWith(".pptx")) {
      return (
        <div className="mb-1 md:mb-1 -mx-2 md:mx-0 md:rounded-md overflow-hidden border-y md:border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 flex flex-col items-center justify-center h-16 md:h-20 lg:h-32 gap-1">
          <svg className="w-8 h-8 md:w-10 md:h-10 text-orange-600 dark:text-orange-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"/>
          </svg>
          <span className="text-[8px] md:text-[9px] font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wide">
            PowerPoint
          </span>
        </div>
      );
    }

    // Fallback thumbnail for other file types
    return (
      <div className="mb-1 md:mb-1 -mx-2 md:mx-0 md:rounded-md overflow-hidden border-y md:border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 flex flex-col items-center justify-center h-16 md:h-20 lg:h-32 gap-1">
        <div className="text-slate-500 dark:text-slate-400 scale-150">
          {getResourceIcon(resource.type)}
        </div>
        <span className="text-[8px] md:text-[9px] font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
          {lowerUrl.split('.').pop() || 'File'}
        </span>
      </div>
    );
  };

  const handleOpen = () => {
    if (!resource.fileUrl) {
      toast.error("No file URL available for this resource");
      return;
    }

    // Open the resource viewer modal
    setIsViewerOpen(true);
  };

  const handleDownload = async () => {
    if (!resource.fileUrl || isDownloading) {
      if (!resource.fileUrl) {
        toast.error("This resource has no file attached.");
      }
      return;
    }

    setIsDownloading(true);

    try {
      // Use the dedicated download endpoint
      const baseUrl =
        import.meta.env.VITE_API_URL || 
        (window.location.hostname === 'localhost' 
          ? "http://localhost:5000/api"
          : "https://successbridge-tolesa-api.onrender.com/api");
      const downloadUrl = `${baseUrl}/resources/${resource.id}/download`;

      console.log("Downloading from:", downloadUrl);

      // Fetch the signed URL from backend
      const response = await fetch(downloadUrl, {
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Download failed: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.success || !data.url) {
        throw new Error('Invalid response from server');
      }

      // Extract filename from resource
      let filename = resource.fileUrl.split("/").pop() || resource.title;
      if (!filename.includes(".")) {
        const extension = resource.type === "video" ? ".mp4" : ".pdf";
        filename += extension;
      }
      
      // Create a temporary anchor element with download attribute
      // This triggers the browser's native "Save As" dialog
      const link = document.createElement("a");
      link.href = data.url; // Use the signed URL directly
      link.download = filename; // This attribute triggers download dialog
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      
      // Cleanup after a short delay
      setTimeout(() => {
        document.body.removeChild(link);
      }, 100);

      console.log("Download initiated:", filename);
      toast.success("Download started. Check your browser's download location.");
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Unable to download the file. Please try the Open button instead.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <div className="resource-card relative group bg-white dark:bg-slate-800/80 rounded-lg md:rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-0.5 transition-all duration-300">
        {isNew && (
          <div className="absolute top-1 right-1 z-10 px-2 py-0.5 bg-rose-600 text-white text-[9px] md:text-[8px] font-semibold uppercase tracking-wide rounded shadow-sm">
            New
          </div>
        )}
      {/* Card Header - Type Badge */}
      <div
        className={`px-2 py-1 md:px-1.5 md:py-0.5 flex items-center gap-1 border-b border-slate-100 dark:border-slate-700/50 ${getTypeColor(resource.type)} bg-opacity-50`}
      >
        {getResourceIcon(resource.type)}
        <span className="text-[8px] md:text-[8px] font-bold md:font-semibold uppercase tracking-wider">
          {getTypeLabel(resource.type)}
        </span>
      </div>

      {/* Card Body */}
      <div className="px-2 py-1.5 md:px-1.5 md:pt-1 md:pb-1 flex-1 flex flex-col gap-1">
        {renderThumbnail()}
        <h4 className="font-bold md:font-semibold text-slate-900 dark:text-white leading-tight text-[10px] md:text-[11px] line-clamp-2">
          {resource.title}
        </h4>
        {resource.description && (
          <div className="flex-1 flex flex-col gap-0.5">
            <p
              className={`text-[9px] md:text-[10px] text-slate-600 dark:text-slate-400 leading-snug ${
                isDescriptionExpanded ? "" : "line-clamp-1"
              }`}
            >
              {resource.description}
            </p>
            <button
              type="button"
              onClick={() => setIsDescriptionExpanded((prev) => !prev)}
              className="self-start text-[8px] md:text-[9px] font-bold md:font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              {isDescriptionExpanded ? "Less" : "More"}
            </button>
          </div>
        )}
      </div>

      {/* Card Footer - Actions */}
      <div className="px-2 pb-1.5 md:px-1.5 md:pb-1.5 flex flex-col gap-1">
        <div className="flex gap-1">
          <button
            onClick={handleOpen}
            disabled={!resource.fileUrl}
            className="flex-1 flex items-center justify-center gap-0.5 py-0.5 md:py-0.5 md:px-1.5 rounded-md bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-[8px] md:text-[8px] font-bold md:font-semibold transition-all duration-200 active:scale-95"
            title={
              resource.fileUrl ? "View file" : "No file available"
            }
          >
            <ExternalLink className="w-2.5 h-2.5 md:w-2 md:h-2" />
            Open
          </button>
          <button
            onClick={handleDownload}
            disabled={!resource.fileUrl || isDownloading}
            className="flex-1 flex items-center justify-center gap-0.5 py-0.5 md:py-0.5 md:px-1.5 rounded-md bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-[8px] md:text-[8px] font-bold md:font-semibold transition-all duration-200 active:scale-95"
            title={resource.fileUrl ? "Download file" : "No file available"}
          >
            {isDownloading ? (
              <>
                <div className="w-2.5 h-2.5 md:w-2 md:h-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span className="hidden md:inline">Downloading...</span>
              </>
            ) : (
              <>
                <Download className="w-2.5 h-2.5 md:w-2 md:h-2" />
                Download
              </>
            )}
          </button>
        </div>

        {/* Admin-only actions */}
        {showAdminActions && (onEdit || onDelete) && (
          <div className="flex gap-2 pt-1 border-t border-slate-100 dark:border-slate-700 mt-1">
            {onEdit && (
              <button
                onClick={onEdit}
                className="flex-1 py-2 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={onDelete}
                className="flex-1 py-2 rounded-lg text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
      </div>

      {/* Resource Viewer Modal */}
      <ResourceViewer
        resource={resource}
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        onDownload={handleDownload}
      />
    </>
  );
};
