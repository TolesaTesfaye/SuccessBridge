import React from "react";
import { Filter, Search, X, RefreshCw } from "lucide-react";
import { ResourceCard } from "@components/resources/ResourceCard";

type Grade = "grade_9" | "grade_10" | "grade_11" | "grade_12";
type Stream = "natural" | "social" | null;

interface HighSchoolResourceHubProps {
  activeGrade: Grade;
  selectedStream: Stream;
  handleStreamChange: (stream: Stream) => void;
  selectedSubject: string | null;
  setSelectedSubject: (subject: string | null) => void;
  subjects: string[];
  selectedResourceType: string | null;
  setSelectedResourceType: (type: string | null) => void;
  resourceTypes: string[];
  loading: boolean;
  resources: any[];
  onRefresh: () => void;
}

export const HighSchoolResourceHub: React.FC<HighSchoolResourceHubProps> = ({
  activeGrade,
  selectedStream,
  handleStreamChange,
  selectedSubject,
  setSelectedSubject,
  subjects,
  selectedResourceType,
  setSelectedResourceType,
  resourceTypes,
  loading,
  resources,
  onRefresh,
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showFilters, setShowFilters] = React.useState(false);

  const filteredResources = React.useMemo(() => {
    if (!searchQuery.trim()) return resources;

    const query = searchQuery.toLowerCase();
    return resources.filter(
      (resource: any) =>
        resource.title?.toLowerCase().includes(query) ||
        resource.description?.toLowerCase().includes(query) ||
        resource.tags?.some((tag: string) => tag.toLowerCase().includes(query)),
    );
  }, [resources, searchQuery]);

  const activeFiltersCount = [
    selectedStream,
    selectedSubject,
    selectedResourceType,
  ].filter(Boolean).length;

  return (
    <div className="w-full">
      {/* Mobile-Optimized Search and Filter Section */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        {/* Search Bar - Always Visible */}
        <div className="p-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources..."
              className="w-full pl-9 md:pl-10 pr-9 md:pr-10 py-2 md:py-3 border-0 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-all text-sm md:text-base"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1"
              >
                <X className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Toggle Button - Mobile */}
        <div className="px-2 pb-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-between px-3 py-2 md:px-4 md:py-3 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-600 dark:text-slate-400" />
              <span className="text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300">
                Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
              </span>
            </div>
            <svg
              className={`w-4 h-4 md:w-5 md:h-5 text-slate-600 dark:text-slate-400 transition-transform ${showFilters ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {/* Collapsible Filters */}
        {showFilters && (
          <div className="px-2 pb-2 space-y-3 border-t border-slate-200 dark:border-slate-700 pt-2">
            {/* Stream Selector (Only for 11 & 12) */}
            {(activeGrade === "grade_11" || activeGrade === "grade_12") && (
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  Stream
                </label>
                <select
                  value={selectedStream || ""}
                  onChange={(e) =>
                    handleStreamChange((e.target.value as Stream) || null)
                  }
                  className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-all"
                >
                  <option value="">All Streams</option>
                  <option value="natural">Natural Science</option>
                  <option value="social">Social Science</option>
                </select>
              </div>
            )}

            {/* Subject Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                Subject
              </label>
              <select
                value={selectedSubject || ""}
                onChange={(e) => setSelectedSubject(e.target.value || null)}
                className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-all"
              >
                <option value="">All Subjects</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            {/* Resource Type Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                Resource Type
              </label>
              <select
                value={selectedResourceType || ""}
                onChange={(e) =>
                  setSelectedResourceType(e.target.value || null)
                }
                className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-all"
              >
                <option value="">All Types</option>
                {resourceTypes.map((type: string) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters Button */}
            {(selectedStream || selectedSubject || selectedResourceType) && (
              <button
                onClick={() => {
                  handleStreamChange(null);
                  setSelectedSubject(null);
                  setSelectedResourceType(null);
                }}
                className="w-full px-4 py-2.5 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}

        {/* Active Filters Pills - Mobile Optimized */}
        {(selectedStream || selectedSubject || selectedResourceType) &&
          !showFilters && (
            <div className="px-2 pb-2 flex flex-wrap gap-2">
              {selectedStream && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                  {selectedStream}
                  <button
                    onClick={() => handleStreamChange(null)}
                    className="hover:text-blue-900 dark:hover:text-blue-100"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedSubject && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 rounded-full text-xs font-medium">
                  {selectedSubject}
                  <button
                    onClick={() => setSelectedSubject(null)}
                    className="hover:text-emerald-900 dark:hover:text-emerald-100"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedResourceType && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">
                  {selectedResourceType}
                  <button
                    onClick={() => setSelectedResourceType(null)}
                    className="hover:text-purple-900 dark:hover:text-purple-100"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}
      </div>

      {/* Results Count + Refresh */}
      <div className="flex items-center justify-between py-2 bg-slate-50 dark:bg-slate-900/50">
        <p className="text-xs md:text-sm font-medium text-slate-600 dark:text-slate-400 pl-2">
          {loading
            ? "Loading..."
            : `${filteredResources.length} ${filteredResources.length === 1 ? "resource" : "resources"}`}
        </p>
        <button
          type="button"
          onClick={onRefresh}
          disabled={loading}
          className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] md:text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mr-2"
        >
          <RefreshCw className="w-3 h-3 md:w-3.5 md:h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Resources Gallery */}
      {loading ? (
        <div className="text-center py-12 md:py-16 flex flex-col items-center bg-slate-50 dark:bg-slate-900/30">
          <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-blue-600/20 border-t-blue-600 dark:border-blue-400/20 dark:border-t-blue-400 rounded-full animate-spin mb-3"></div>
          <p className="text-slate-500 dark:text-slate-400 font-semibold text-xs md:text-sm">
            Loading...
          </p>
        </div>
      ) : filteredResources.length === 0 ? (
        <div className="text-center py-12 md:py-16 px-4 bg-slate-50 dark:bg-slate-900/30">
          <div className="text-4xl md:text-5xl mb-3 md:mb-4">🔍</div>
          <h4 className="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            No resources found
          </h4>
          <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm max-w-sm mx-auto">
            {searchQuery
              ? "Try different keywords or adjust your filters"
              : "Try adjusting your filters"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 min-[640px]:grid-cols-3 min-[768px]:grid-cols-4 min-[1024px]:grid-cols-5 min-[1280px]:grid-cols-6 gap-2 md:gap-3 py-2 md:py-3 bg-slate-50 dark:bg-slate-900/30">
          {filteredResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}
    </div>
  );
};
