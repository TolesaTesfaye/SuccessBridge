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

// Import preview images
import finalExamPreview from "../../assets/previews/final-exam.jpg";
import handoutPreview from "../../assets/previews/handout.jpg";
import lastYearExamPreview from "../../assets/previews/last-year-exam.jpg";
import lectureSlidePreview from "../../assets/previews/lecture-slide.jpg";
import midExamPreview from "../../assets/previews/mid-exam.jpg";
import modulesPreview from "../../assets/previews/modules.jpg";
import notePreview from "../../assets/previews/note.jpg";
import referenceBookPreview from "../../assets/previews/reference-book.jpg";

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
      reference_book: <BookOpen className="w-3.5 h-3.5 md:w-4 md:h-4" />,
      video: <Video className="w-3.5 h-3.5 md:w-4 md:h-4" />,
      video_tutorial: <Video className="w-3.5 h-3.5 md:w-4 md:h-4" />,
      educational_video: <Video className="w-3.5 h-3.5 md:w-4 md:h-4" />,
      past_exam: <ClipboardList className="w-3.5 h-3.5 md:w-4 md:h-4" />,
      entrance_exam: <ClipboardList className="w-3.5 h-3.5 md:w-4 md:h-4" />,
      module: <Layers className="w-3.5 h-3.5 md:w-4 md:h-4" />,
      professional_module: <Layers className="w-3.5 h-3.5 md:w-4 md:h-4" />,
      quiz: <PenTool className="w-3.5 h-3.5 md:w-4 md:h-4" />,
      interactive_quiz: <PenTool className="w-3.5 h-3.5 md:w-4 md:h-4" />,
      remedial_quiz: <PenTool className="w-3.5 h-3.5 md:w-4 md:h-4" />,
      worksheet: <FileText className="w-3.5 h-3.5 md:w-4 md:h-4" />,
      project: <Target className="w-3.5 h-3.5 md:w-4 md:h-4" />,
      research: <FlaskConical className="w-3.5 h-3.5 md:w-4 md:h-4" />,
      career: <Briefcase className="w-3.5 h-3.5 md:w-4 md:h-4" />,
      recommendation: <Briefcase className="w-3.5 h-3.5 md:w-4 md:h-4" />,
    };
    return icons[type] || <FileText className="w-3.5 h-3.5 md:w-4 md:h-4" />;
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      textbook:
        "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400",
      reference_book:
        "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400",
      video: "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400",
      video_tutorial: "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400",
      educational_video: "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400",
      past_exam:
        "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400",
      entrance_exam:
        "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400",
      module:
        "bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400",
      professional_module:
        "bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400",
      quiz: "bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400",
      interactive_quiz: "bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400",
      remedial_quiz: "bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400",
      worksheet:
        "bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
      project:
        "bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400",
      research:
        "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      career: "bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400",
      recommendation: "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    };
    return (
      colors[type] ||
      "bg-slate-50 dark:bg-slate-500/10 text-slate-600 dark:text-slate-400"
    );
  };

  const getTypeLabel = (type: string) => {
    const t = (type || "").toLowerCase().trim();
    if (t.includes("module")) return "LOE MODULE";
    if (t.includes("exam") || t.includes("past")) return "LAST YEAR EXAM";
    if (t.includes("video") || t.includes("tutorial") || t.includes("slide")) return "VIDEO TUTORIAL";
    if (t.includes("book") || t.includes("reference") || t.includes("textbook")) return "REFERENCE BOOK";
    if (t.includes("quiz") || t.includes("interactive")) return "INTERACTIVE QUIZ";
    if (t.includes("worksheet") || t.includes("handout") || t.includes("sheet")) return "WORKSHEET";
    if (t.includes("recommend")) return "RECOMMENDATION";
    return type.replace("_", " ").toUpperCase();
  };

  // Get preview image based on resource type & title
  const getPreviewImage = (res: Resource) => {
    const type = (res.type || "").toLowerCase().trim();
    const title = (res.title || "").toLowerCase().trim();

    // 1. Module -> modules.jpg
    if (
      type.includes("module") ||
      type.includes("project") ||
      title.includes("module") ||
      title.includes("loe")
    ) {
      return modulesPreview;
    }

    // 2. Video Tutorial / Lecture Slide -> lecture-slide.jpg
    if (
      type.includes("video") ||
      type.includes("tutorial") ||
      type.includes("slide") ||
      type.includes("presentation") ||
      title.includes("video") ||
      title.includes("tutorial") ||
      title.includes("slide") ||
      title.includes("ppt") ||
      title.includes("presentation")
    ) {
      return lectureSlidePreview;
    }

    // 3. Reference Book / Textbook -> reference-book.jpg
    if (
      type.includes("book") ||
      type.includes("reference") ||
      type.includes("textbook") ||
      title.includes("reference book") ||
      title.includes("reference-book") ||
      title.includes("textbook") ||
      title.includes("book")
    ) {
      return referenceBookPreview;
    }

    // 4. Interactive Quiz -> mid-exam.jpg
    if (
      type.includes("quiz") ||
      type.includes("interactive") ||
      title.includes("quiz") ||
      title.includes("interactive")
    ) {
      return midExamPreview;
    }

    // 5. Worksheet / Handout -> handout.jpg
    if (
      type.includes("worksheet") ||
      type.includes("handout") ||
      type.includes("sheet") ||
      type.includes("assignment") ||
      title.includes("worksheet") ||
      title.includes("handout") ||
      title.includes("formula sheet")
    ) {
      return handoutPreview;
    }

    // 6. Recommendation -> note.jpg
    if (
      type.includes("recommendation") ||
      type.includes("recommend") ||
      type.includes("career") ||
      type.includes("guidance") ||
      title.includes("recommendation") ||
      title.includes("recommend") ||
      title.includes("career")
    ) {
      return notePreview;
    }

    // 7. Last Year Exam / Past Exam / Mid Exam / Final Exam -> last-year-exam.jpg (or mid/final)
    if (
      type.includes("exam") ||
      type.includes("past") ||
      type.includes("entrance") ||
      type.includes("test") ||
      title.includes("exam") ||
      title.includes("test") ||
      title.includes("mid") ||
      title.includes("final") ||
      title.includes("last year")
    ) {
      if (title.includes("final") || type.includes("final")) {
        return finalExamPreview;
      }
      if (title.includes("mid") || type.includes("mid")) {
        return midExamPreview;
      }
      return lastYearExamPreview;
    }

    // Fallbacks based on title keywords
    if (
      title.includes("note") ||
      title.includes("lecture") ||
      title.includes("chapter") ||
      title.includes("ch ")
    ) {
      return notePreview;
    }

    return notePreview;
  };

  const renderThumbnail = () => {
    return (
      <div className="rounded-md overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 relative">
        <img
          src={getPreviewImage(resource)}
          alt={resource.title}
          className="w-full h-24 sm:h-28 md:h-32 lg:h-36 object-cover"
          loading="lazy"
        />
      </div>
    );
  };

  const handleOpen = async () => {
    if (!resource.fileUrl || isOpening) {
      if (!resource.fileUrl) alert("No file URL available for this resource");
      return;
    }

    setIsOpening(true);

    try {
      // Use the preview endpoint to get signed URL for viewing
      const baseUrl =
        import.meta.env.VITE_API_URL || 
        (window.location.hostname === 'localhost' 
          ? "http://localhost:5000/api"
          : "https://successbridge-tolesa-api.onrender.com/api");
      const previewUrl = `${baseUrl}/resources/${resource.id}/preview`;

      console.log("Opening resource for preview:", previewUrl);

      // Fetch the signed URL for preview
      const response = await fetch(previewUrl, {
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Preview failed: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.success || !data.url) {
        throw new Error('Invalid response from server');
      }

      // Mobile-friendly: Use anchor tag instead of window.open for better compatibility
      const link = document.createElement("a");
      link.href = data.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      
      // For mobile: Add to DOM temporarily to ensure click works
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      
      // Cleanup after a short delay
      setTimeout(() => {
        document.body.removeChild(link);
      }, 100);
      
      toast.success("Opening file in new tab...");
    } catch (error) {
      console.error("Failed to open resource:", error);
      toast.error("Unable to open the file. Please try downloading it instead.");
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
      
      // Mobile-friendly download approach
      const link = document.createElement("a");
      link.href = data.url;
      link.download = filename;
      
      // For mobile browsers: Some require the link to be in the DOM
      link.style.display = "none";
      document.body.appendChild(link);
      
      // Trigger download
      link.click();
      
      // Cleanup after a short delay to ensure download starts
      setTimeout(() => {
        document.body.removeChild(link);
      }, 100);

      console.log("Download initiated:", filename);
      toast.success("Download started. Check your browser downloads.");
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Unable to download the file. Please try the Open button instead.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="resource-card relative group bg-white dark:bg-slate-800/80 rounded-lg md:rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-0.5 transition-all duration-300">
      {isNew && (
        <div className="absolute top-0.5 right-0.5 md:top-1 md:right-1 z-10 px-1 py-0.5 md:px-2 md:py-0.5 bg-rose-600 text-white text-[7px] md:text-[9px] font-semibold uppercase tracking-wide rounded shadow-sm">
          New
        </div>
      )}
      {/* Card Header - Type Badge */}
      <div
        className={`px-2 py-1 md:px-1.5 md:py-0.5 flex items-center gap-1 border-b border-slate-100 dark:border-slate-700/50 ${getTypeColor(resource.type)} bg-opacity-50`}
      >
        {getResourceIcon(resource.type)}
        <span className="text-[7px] md:text-[8px] font-bold md:font-semibold uppercase tracking-wider">
          {getTypeLabel(resource.type)}
        </span>
      </div>

      {/* Card Body */}
      <div className="px-0 py-1.5 md:px-1.5 md:pt-1 md:pb-1 flex-1 flex flex-col gap-1">
        {renderThumbnail()}
        <h4 className="px-2 md:px-0 font-bold md:font-semibold text-slate-900 dark:text-white leading-tight text-[10px] md:text-[11px] line-clamp-2">
          {resource.title}
        </h4>
        {resource.description && (
          <div className="px-2 md:px-0 flex-1 flex flex-col gap-0.5">
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
            disabled={!resource.fileUrl || isOpening}
            className="flex-1 flex items-center justify-center gap-0.5 py-0.5 md:py-0.5 md:px-1.5 rounded-md bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-[8px] md:text-[8px] font-bold md:font-semibold transition-all duration-200 active:scale-95"
            title={
              resource.fileUrl ? "Open file in new tab" : "No file available"
            }
          >
            {isOpening ? (
              <>
                <div className="w-2.5 h-2.5 md:w-2 md:h-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span className="hidden md:inline">Opening...</span>
              </>
            ) : (
              <>
                <ExternalLink className="w-2.5 h-2.5 md:w-2 md:h-2" />
                Open
              </>
            )}
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
  );
};
