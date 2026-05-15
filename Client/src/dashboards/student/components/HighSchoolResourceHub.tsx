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
      {/* Search Bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 z-10" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources..."
              className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-all text-base rounded-lg border-0"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* 3-Column Filter Grid */}
        <div className="px-4 py-4 border-t border-slate-200 dark:border-slate-800">
          <div className="grid grid-cols-3 gap-3">
            {/* Stream Filter */}
            {(activeGrade === "grade_11" || activeGrade === "grade_12") && (
              <div>
                <label className="block text-xs font-medium text-slate-400 dark:text-slate-500 mb-2">
                  Stream
                </label>
                <select
                  value={selectedStream || ""}
                  onChange={(e) =>
                    handleStreamChange((e.target.value as Stream) || null)
                  }
                  className="w-full px-3 py-2.5 bg-slate-800/50 dark:bg-slate-800/80 border border-slate-700 dark:border-slate-600 rounded-lg text-white dark:text-slate-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                >
                  <option value="">All Streams</option>
                  <option value="natural">Natural Science</option>
                  <option value="social">Social Science</option>
                </select>
              </div>
            )}

            {/* Subject Filter */}
            <div>
              <label className="block text-xs font-medium text-slate-400 dark:text-slate-500 mb-2">
                Subject
              </label>
              <select
                value={selectedSubject || ""}
                onChange={(e) => setSelectedSubject(e.target.value || null)}
                className="w-full px-3 py-2.5 bg-slate-800/50 dark:bg-slate-800/80 border border-slate-700 dark:border-slate-600 rounded-lg text-white dark:text-slate-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              >
                <option value="">All Subjects</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            {/* Resource Type Filter */}
            <div>
              <label className="block text-xs font-medium text-slate-400 dark:text-slate-500 mb-2">
                Resource Type
              </label>
              <select
                value={selectedResourceType || ""}
                onChange={(e) =>
                  setSelectedResourceType(e.target.value || null)
                }
                className="w-full px-3 py-2.5 bg-slate-800/50 dark:bg-slate-800/80 border border-slate-700 dark:border-slate-600 rounded-lg text-white dark:text-slate-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              >
                <option value="">All Types</option>
                {resourceTypes.map((type: string) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Clear Filters Button */}
          {(selectedStream || selectedSubject || selectedResourceType) && (
            <button
              onClick={() => {
                handleStreamChange(null);
                setSelectedSubject(null);
                setSelectedResourceType(null);
              }}
              className="w-full mt-3 px-3 py-2 text-xs font-semibold text-red-400 dark:text-red-400 bg-red-500/10 dark:bg-red-500/10 border border-red-500/20 dark:border-red-500/20 rounded-lg hover:bg-red-500/20 dark:hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2"
            >
              <X className="w-3 h-3" />
              Clear Filters
            </button>
          )}
        </div>
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
