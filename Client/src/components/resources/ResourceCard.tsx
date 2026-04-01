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
  const [isOpening, setIsOpening] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const toast = useToast();
  const createdTime = new Date(resource.createdAt).getTime();
  const isNew = Date.now() - createdTime < 7 * 24 * 60 * 60 * 1000; // last 7 days
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
    if (!resource.fileUrl) return null;

    const fullUrl = getFullUrl(resource.fileUrl);
    const lowerUrl = resource.fileUrl.toLowerCase();

    // Show first-page preview for PDFs
    if (lowerUrl.endsWith(".pdf")) {
      return (
        <div className="mb-1 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
          <iframe
            src={`${fullUrl}#page=1&view=fitH`}
            title={resource.title}
            className="w-full h-20 md:h-28 lg:h-32 bg-white pointer-events-none"
            scrolling="no"
            loading="lazy"
          />
        </div>
      );
    }

    // Image preview for common image formats
    if (
      lowerUrl.endsWith(".jpg") ||
      lowerUrl.endsWith(".jpeg") ||
      lowerUrl.endsWith(".png") ||
      lowerUrl.endsWith(".gif") ||
      lowerUrl.endsWith(".webp")
    ) {
      return (
        <div className="mb-1 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900">
          <img
            src={fullUrl}
            alt={resource.title}
            className="w-full h-20 md:h-28 lg:h-32 object-cover"
            loading="lazy"
          />
        </div>
      );
    }

    // Simple thumbnail-style preview for videos
    if (resource.type === "video") {
      return (
        <div className="mb-1 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-black/80">
          <video
            src={fullUrl}
            className="w-full h-20 md:h-28 lg:h-32 object-cover pointer-events-none"
            controls={false}
            muted
            playsInline
            preload="metadata"
          />
        </div>
      );
    }

    return null;
  };

  const handleOpen = async () => {
    if (!resource.fileUrl || isOpening) {
      if (!resource.fileUrl) alert("No file URL available for this resource");
      return;
    }

    setIsOpening(true);

    try {
      // Try the direct file URL first
      const url = getFullUrl(resource.fileUrl);
      console.log("Opening resource:", url);

      // Open in new tab (single attempt)
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("Failed to open resource:", error);
      alert("Unable to open the file. Please try downloading it instead.");
    } finally {
      setIsOpening(false);
    }
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
      // First try the dedicated download endpoint if available
      const baseUrl =
        import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const downloadUrl = `${baseUrl}/resources/${resource.id}/download`;

      console.log("Attempting download from:", downloadUrl);

      // Try to fetch the download endpoint first
      const response = await fetch(downloadUrl, {
        method: "GET",
        headers: {
          Accept: "application/octet-stream",
        },
      });

      if (response.ok) {
        // If the endpoint works, use it
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        // Extract filename from response headers or use fallback
        const contentDisposition = response.headers.get("content-disposition");
        let filename = resource.title;

        if (contentDisposition) {
          const filenameMatch = contentDisposition.match(
            /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/,
          );
          if (filenameMatch && filenameMatch[1]) {
            filename = filenameMatch[1].replace(/['"]/g, "");
          }
        } else {
          // Fallback: extract from fileUrl or use title
          const urlFilename = resource.fileUrl.split("/").pop();
          if (urlFilename && urlFilename.includes(".")) {
            filename = urlFilename;
          } else {
            // Add appropriate extension based on type
            const extension = resource.type === "video" ? ".mp4" : ".pdf";
            filename = `${resource.title}${extension}`;
          }
        }

        // Create download link
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up
        window.URL.revokeObjectURL(url);
        console.log("Download completed:", filename);
        toast.success("Download started. Check your browser downloads.");
      } else {
        throw new Error(`Download endpoint failed: ${response.status}`);
      }
    } catch (error) {
      console.warn("Download endpoint failed, trying direct file URL:", error);

      // Fallback to direct file URL download
      try {
        const directUrl = getFullUrl(resource.fileUrl);
        console.log("Fallback download from:", directUrl);

        // Try to fetch the file directly
        const response = await fetch(directUrl);

        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);

          // Extract filename
          let filename = resource.fileUrl.split("/").pop() || resource.title;
          if (!filename.includes(".")) {
            const extension = resource.type === "video" ? ".mp4" : ".pdf";
            filename += extension;
          }

          // Create download link
          const link = document.createElement("a");
          link.href = url;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          // Clean up
          window.URL.revokeObjectURL(url);
          console.log("Fallback download completed:", filename);
          toast.success("Download started. Check your browser downloads.");
        } else {
          throw new Error(`Direct file access failed: ${response.status}`);
        }
      } catch (fallbackError) {
        console.error("All download methods failed:", fallbackError);

        // Last resort: try to open the file in a new tab
        try {
          const url = getFullUrl(resource.fileUrl);
          window.open(url, "_blank");
          toast.info(
            "Download failed, but the file was opened in a new tab. You can save it from there.",
          );
        } catch (openError) {
          console.error("Even opening failed:", openError);
          toast.error(
            "Unable to download or open the file. Please try again or contact support.",
          );
        }
      }
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="resource-card relative group bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-0.5 transition-all duration-300">
      {isNew && (
        <div className="absolute top-0.5 right-0.5 z-10 px-1.5 py-0.5 bg-rose-600 text-white text-[8px] font-semibold uppercase tracking-wide animate-pulse shadow-sm">
          New
        </div>
      )}
      {/* Card Header - Type Badge */}
      <div
        className={`px-2.5 py-1 flex items-center gap-1 border-b border-slate-100 dark:border-slate-700/50 ${getTypeColor(resource.type)} bg-opacity-50`}
      >
        {getResourceIcon(resource.type)}
        <span className="text-[7px] md:text-[8px] font-semibold uppercase tracking-wider">
          {getTypeLabel(resource.type)}
        </span>
      </div>

      {/* Card Body */}
      <div className="px-3 pt-1 pb-1.5 flex-1 flex flex-col gap-1 md:gap-1.5">
        {renderThumbnail()}
        <h4 className="font-semibold text-slate-900 dark:text-white leading-snug text-[11px] md:text-sm line-clamp-2">
          {resource.title}
        </h4>
        {resource.description && (
          <div className="flex-1 flex flex-col gap-0.5">
            <p
              className={`text-[10px] md:text-[12px] text-slate-500 dark:text-slate-400 ${
                isDescriptionExpanded ? "" : "line-clamp-1"
              }`}
            >
              {resource.description}
            </p>
            <button
              type="button"
              onClick={() => setIsDescriptionExpanded((prev) => !prev)}
              className="self-start text-[9px] md:text-[10px] font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              {isDescriptionExpanded ? "See less" : "See more"}
            </button>
          </div>
        )}
      </div>

      {/* Card Footer - Actions */}
      <div className="px-3 pb-2.5 flex flex-col gap-1.5">
        <div className="flex gap-1">
          <button
            onClick={handleOpen}
            disabled={!resource.fileUrl || isOpening}
            className="flex-1 flex items-center justify-center gap-0.5 md:gap-0.5 py-0.5 px-1.5 md:py-1.5 md:px-2 rounded-md md:rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-[8px] md:text-[9px] font-semibold transition-all duration-200 active:scale-95"
            title={
              resource.fileUrl ? "Open file in new tab" : "No file available"
            }
          >
            {isOpening ? (
              <>
                <div className="w-2 h-2 md:w-2.5 md:h-2.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Opening...
              </>
            ) : (
              <>
                <ExternalLink className="w-2 h-2 md:w-2.5 md:h-2.5" />
                Open
              </>
            )}
          </button>
          <button
            onClick={handleDownload}
            disabled={!resource.fileUrl || isDownloading}
            className="flex-1 flex items-center justify-center gap-0.5 md:gap-0.5 py-0.5 px-1.5 md:py-1.5 md:px-2 rounded-md md:rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-[8px] md:text-[9px] font-semibold transition-all duration-200 active:scale-95"
            title={resource.fileUrl ? "Download file" : "No file available"}
          >
            {isDownloading ? (
              <>
                <div className="w-2 h-2 md:w-2.5 md:h-2.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <Download className="w-2 h-2 md:w-2.5 md:h-2.5" />
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
  );
};
