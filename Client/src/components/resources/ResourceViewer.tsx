import React, { useEffect, useState } from "react";
import { X, Download, ExternalLink, Loader2 } from "lucide-react";
import { type Resource } from "@types";

interface ResourceViewerProps {
  resource: Resource;
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
}

export const ResourceViewer: React.FC<ResourceViewerProps> = ({
  resource,
  isOpen,
  onClose,
  onDownload,
}) => {
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !resource.fileUrl) {
      return;
    }

    const fetchSignedUrl = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const baseUrl =
          import.meta.env.VITE_API_URL ||
          (window.location.hostname === "localhost"
            ? "http://localhost:5000/api"
            : "https://successbridge-tolesa-api.onrender.com/api");

        const response = await fetch(
          `${baseUrl}/resources/${resource.id}/download`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch resource: ${response.status}`);
        }

        const data = await response.json();

        if (!data.success || !data.url) {
          throw new Error("Invalid response from server");
        }

        setSignedUrl(data.url);
      } catch (err) {
        console.error("Failed to fetch signed URL:", err);
        setError("Unable to load resource. Please try downloading instead.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSignedUrl();
  }, [isOpen, resource.id, resource.fileUrl]);

  if (!isOpen) return null;

  const fileExtension = resource.fileUrl?.toLowerCase().split(".").pop() || "";
  const isPDF = fileExtension === "pdf";
  const isImage = ["jpg", "jpeg", "png", "gif", "webp"].includes(fileExtension);
  const isVideo = ["mp4", "webm", "mov"].includes(fileExtension);

  const handleOpenInNewTab = () => {
    if (signedUrl) {
      window.open(signedUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      {/* Modal Container */}
      <div className="relative w-full h-full md:w-[90vw] md:h-[90vh] md:max-w-6xl md:rounded-xl bg-white dark:bg-slate-900 flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm md:text-lg font-bold text-slate-900 dark:text-white truncate">
              {resource.title}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 truncate">
              {resource.type.replace("_", " ").toUpperCase()}
            </p>
          </div>

          <div className="flex items-center gap-2 ml-4">
            {/* Download Button */}
            <button
              onClick={onDownload}
              className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
              title="Download"
            >
              <Download className="w-5 h-5" />
            </button>

            {/* Open in New Tab (Desktop only) */}
            <button
              onClick={handleOpenInNewTab}
              className="hidden md:block p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
              title="Open in new tab"
            >
              <ExternalLink className="w-5 h-5" />
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden bg-slate-100 dark:bg-slate-950">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <Loader2 className="w-12 h-12 text-blue-600 dark:text-blue-400 animate-spin" />
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Loading resource...
              </p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 px-4">
              <div className="text-red-500 dark:text-red-400 text-center">
                <p className="text-lg font-semibold mb-2">Unable to Load</p>
                <p className="text-sm">{error}</p>
              </div>
              <button
                onClick={onDownload}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
              >
                Download Instead
              </button>
            </div>
          ) : signedUrl ? (
            <>
              {/* PDF Viewer */}
              {isPDF && (
                <iframe
                  src={signedUrl}
                  title={resource.title}
                  className="w-full h-full"
                  style={{ border: "none" }}
                />
              )}

              {/* Image Viewer */}
              {isImage && (
                <div className="w-full h-full flex items-center justify-center p-4 overflow-auto">
                  <img
                    src={signedUrl}
                    alt={resource.title}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              )}

              {/* Video Viewer */}
              {isVideo && (
                <div className="w-full h-full flex items-center justify-center bg-black">
                  <video
                    src={signedUrl}
                    controls
                    className="max-w-full max-h-full"
                    controlsList="nodownload"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}

              {/* Unsupported File Type */}
              {!isPDF && !isImage && !isVideo && (
                <div className="flex flex-col items-center justify-center h-full gap-4 px-4">
                  <div className="text-slate-600 dark:text-slate-400 text-center">
                    <p className="text-lg font-semibold mb-2">
                      Preview Not Available
                    </p>
                    <p className="text-sm">
                      This file type cannot be previewed in the browser.
                    </p>
                  </div>
                  <button
                    onClick={onDownload}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    Download File
                  </button>
                </div>
              )}
            </>
          ) : null}
        </div>

        {/* Footer - Mobile only */}
        <div className="md:hidden px-4 py-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
          <button
            onClick={onDownload}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download File
          </button>
        </div>
      </div>
    </div>
  );
};
