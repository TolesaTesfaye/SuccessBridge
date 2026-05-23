import React from "react";
import { Filter, Search, X, RefreshCw } from "lucide-react";
import { ResourceCard } from "@components/resources/ResourceCard";
import { DEPARTMENTS, UNIVERSITIES } from "@utils/constants";

interface UniversityResourceHubProps {
  selectedUniversity: string;
  setSelectedUniversity: (value: string) => void;
  availableUniversities: any[];
  selectedStream: string;
  setSelectedStream: (value: "" | "natural" | "social") => void;
  isIntroductory: boolean;
  selectedDepartment: string;
  setSelectedDepartment: (value: string) => void;
  selectedResourceType: string;
  setSelectedResourceType: (value: string) => void;
  resourceTypes: string[];
  selectedSubject: string;
  setSelectedSubject: (value: string) => void;
  subjects: string[];
  loading: boolean;
  resources: any[];
  activeCategory: string;
  onRefresh: () => void;
}

export const UniversityResourceHub: React.FC<UniversityResourceHubProps> = ({
  selectedUniversity,
  setSelectedUniversity,
  availableUniversities,
  selectedStream,
  setSelectedStream,
  isIntroductory,
  selectedDepartment,
  setSelectedDepartment,
  selectedResourceType,
  setSelectedResourceType,
  resourceTypes,
  selectedSubject,
  setSelectedSubject,
  subjects,
  loading,
  resources,
  activeCategory,
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
    selectedUniversity,
    selectedStream,
    selectedDepartment,
    selectedResourceType,
    selectedSubject,
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

        {/* Filter Grid */}
        <div className="px-4 py-4 border-t border-slate-200 dark:border-slate-800">
          {/* For introductory levels (freshman/remedial): Show all 4 filters in one row */}
          {isIntroductory ? (
            <div className="grid grid-cols-4 gap-3">
              {/* University Filter */}
              <div>
                <label className="block text-xs font-medium text-slate-400 dark:text-slate-500 mb-2">
                  University
                </label>
                <select
                  value={selectedUniversity}
                  onChange={(e) => setSelectedUniversity(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-800/50 dark:bg-slate-800/80 border border-slate-700 dark:border-slate-600 rounded-lg text-white dark:text-slate-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                >
                  <option value="">All Universities</option>
                  {(availableUniversities.length > 0
                    ? availableUniversities.map((u) => u.name)
                    : UNIVERSITIES
                  ).map((uni) => (
                    <option key={uni} value={uni}>
                      {uni}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject Filter */}
              <div>
                <label className="block text-xs font-medium text-slate-400 dark:text-slate-500 mb-2">
                  Subject
                </label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-800/50 dark:bg-slate-800/80 border border-slate-700 dark:border-slate-600 rounded-lg text-white dark:text-slate-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                >
                  <option value="">All Subjects</option>
                  {subjects.map((subj) => (
                    <option key={subj} value={subj}>
                      {subj}
                    </option>
                  ))}
                </select>
              </div>

              {/* Stream Selector */}
              <div>
                <label className="block text-xs font-medium text-slate-400 dark:text-slate-500 mb-2">
                  Stream
                </label>
                <select
                  value={selectedStream}
                  onChange={(e) => setSelectedStream(e.target.value as any)}
                  className="w-full px-3 py-2.5 bg-slate-800/50 dark:bg-slate-800/80 border border-slate-700 dark:border-slate-600 rounded-lg text-white dark:text-slate-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                >
                  <option value="">All Streams</option>
                  <option value="natural">Natural Science</option>
                  <option value="social">Social Science</option>
                </select>
              </div>

              {/* Resource Type Selector */}
              <div>
                <label className="block text-xs font-medium text-slate-400 dark:text-slate-500 mb-2">
                  Resource Type
                </label>
                <select
                  value={selectedResourceType}
                  onChange={(e) => setSelectedResourceType(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-800/50 dark:bg-slate-800/80 border border-slate-700 dark:border-slate-600 rounded-lg text-white dark:text-slate-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                >
                  <option value="">All Types</option>
                  {resourceTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ) : (
            /* For non-introductory levels (senior/gc): Show 3-column grid */
            <div className="grid grid-cols-3 gap-3">
              {/* University Filter */}
              <div>
                <label className="block text-xs font-medium text-slate-400 dark:text-slate-500 mb-2">
                  University
                </label>
                <select
                  value={selectedUniversity}
                  onChange={(e) => setSelectedUniversity(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-800/50 dark:bg-slate-800/80 border border-slate-700 dark:border-slate-600 rounded-lg text-white dark:text-slate-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                >
                  <option value="">All Universities</option>
                  {(availableUniversities.length > 0
                    ? availableUniversities.map((u) => u.name)
                    : UNIVERSITIES
                  ).map((uni) => (
                    <option key={uni} value={uni}>
                      {uni}
                    </option>
                  ))}
                </select>
              </div>

              {/* Department Filter */}
              <div>
                <label className="block text-xs font-medium text-slate-400 dark:text-slate-500 mb-2">
                  Department
                </label>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-800/50 dark:bg-slate-800/80 border border-slate-700 dark:border-slate-600 rounded-lg text-white dark:text-slate-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                >
                  <option value="">All Departments</option>
                  {Object.keys(DEPARTMENTS).map((dept) => (
                    <option key={dept} value={dept}>
                      {dept.replace(/_/g, " ")}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject Filter */}
              <div>
                <label className="block text-xs font-medium text-slate-400 dark:text-slate-500 mb-2">
                  Subject
                </label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-800/50 dark:bg-slate-800/80 border border-slate-700 dark:border-slate-600 rounded-lg text-white dark:text-slate-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                >
                  <option value="">All Subjects</option>
                  {subjects.map((subj) => (
                    <option key={subj} value={subj}>
                      {subj}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Clear Filters Button */}
          {(selectedUniversity ||
            selectedStream ||
            selectedDepartment ||
            selectedResourceType ||
            selectedSubject) && (
            <button
              onClick={() => {
                setSelectedUniversity("");
                setSelectedStream("");
                setSelectedDepartment("");
                setSelectedResourceType("");
                setSelectedSubject("");
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
      <div className="flex items-center justify-between py-2 bg-slate-50 dark:bg-slate-900/50 px-2 md:px-4">
        <p className="text-xs md:text-sm font-medium text-slate-600 dark:text-slate-400">
          {loading
            ? "Loading..."
            : `${filteredResources.length} ${filteredResources.length === 1 ? "resource" : "resources"}`}
        </p>
        <button
          type="button"
          onClick={onRefresh}
          disabled={loading}
          className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] md:text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <RefreshCw className="w-3 h-3 md:w-3.5 md:h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Curated Material Grid */}
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
        <div className="grid grid-cols-3 min-[640px]:grid-cols-3 min-[768px]:grid-cols-4 min-[1024px]:grid-cols-5 min-[1280px]:grid-cols-6 gap-2 md:gap-3 py-2 md:py-3 px-2 md:px-4 bg-slate-50 dark:bg-slate-900/30">
          {filteredResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}
    </div>
  );
};
