import React from "react";
import { FormSelect } from "@components/forms/FormSelect";
import { FormInput } from "@components/forms/FormInput";
import { Search, ChevronDown, X, Filter, ChevronUp } from "lucide-react";

interface ResourceFilterProps {
  onFilter: (filters: FilterOptions) => void;
  educationLevel?: "high_school" | "university";
}

export interface FilterOptions {
  search?: string;
  type?: string;
  subject?: string;
  grade?: string;
  stream?: string;
  university?: string;
  department?: string;
  studentType?: string;
}

export const ResourceFilter: React.FC<ResourceFilterProps> = ({
  onFilter,
  educationLevel = "high_school",
}) => {
  const [filters, setFilters] = React.useState<FilterOptions>({});
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
  const [isFiltersExpanded, setIsFiltersExpanded] = React.useState(false);

  const handleChange = (name: string, value: string) => {
    const updated = { ...filters, [name]: value || undefined };
    setFilters(updated);
    onFilter(updated);
    setOpenDropdown(null); // Close dropdown after selection
  };

  const clearFilters = () => {
    setFilters({});
    onFilter({});
  };

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  const resourceTypes = [
    { value: "textbook", label: "Textbook" },
    { value: "video", label: "Video" },
    { value: "past_exam", label: "Past Exam" },
    { value: "module", label: "Module" },
    { value: "quiz", label: "Quiz" },
    { value: "worksheet", label: "Worksheet" },
    { value: "project", label: "Project" },
    { value: "research", label: "Research Paper" },
    { value: "career", label: "Career Guide" },
  ];

  const subjects = [
    { value: "mathematics", label: "Mathematics" },
    { value: "physics", label: "Physics" },
    { value: "chemistry", label: "Chemistry" },
    { value: "biology", label: "Biology" },
    { value: "english", label: "English" },
    { value: "history", label: "History" },
  ];

  const grades = [
    { value: "grade_9", label: "Grade 9" },
    { value: "grade_10", label: "Grade 10" },
    { value: "grade_11", label: "Grade 11" },
    { value: "grade_12", label: "Grade 12" },
  ];

  const streams = [
    { value: "natural", label: "Natural Science" },
    { value: "social", label: "Social Science" },
  ];

  const studentTypes = [
    { value: "regular", label: "Regular" },
    { value: "extension", label: "Extension" },
    { value: "distance", label: "Distance" },
    { value: "summer", label: "Summer" },
  ];

  const universities = [
    { value: "aau", label: "Addis Ababa University" },
    { value: "astu", label: "Adama Science & Technology University" },
  ];

  const departments = [
    { value: "cs", label: "Computer Science" },
    { value: "eng", label: "Engineering" },
  ];

  // Mobile Filter Button Component
  const MobileFilterButton = ({
    label,
    value,
    filterKey,
    options,
  }: {
    label: string;
    value: string;
    filterKey: string;
    options: { value: string; label: string }[];
  }) => {
    const isOpen = openDropdown === filterKey;
    const selectedOption = options.find((opt) => opt.value === value);

    return (
      <div className="relative mb-4">
        {/* Label */}
        <div className="text-sm font-medium text-slate-400 dark:text-slate-500 mb-2">
          {label}
        </div>

        {/* Dropdown Button */}
        <button
          onClick={() => setOpenDropdown(isOpen ? null : filterKey)}
          className="w-full flex items-center justify-between px-4 py-3.5 bg-slate-800/50 dark:bg-slate-800/80 border border-slate-700 dark:border-slate-600 rounded-lg text-left transition-all hover:bg-slate-800/70 dark:hover:bg-slate-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <span className="text-base text-white dark:text-slate-200 font-medium">
            {selectedOption ? selectedOption.label : `All ${label}s`}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-slate-400 transition-transform flex-shrink-0 ml-2 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Dropdown Options */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setOpenDropdown(null)}
            />

            {/* Options List */}
            <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 dark:bg-slate-800 border border-slate-700 dark:border-slate-600 rounded-lg shadow-2xl z-50 max-h-64 overflow-y-auto">
              {/* All/Clear Option */}
              <button
                onClick={() => handleChange(filterKey, "")}
                className={`w-full px-4 py-3 text-left text-sm transition-colors border-b border-slate-700 dark:border-slate-700 ${
                  !value
                    ? "bg-blue-600/20 text-blue-400 font-semibold"
                    : "text-slate-300 dark:text-slate-300 hover:bg-slate-700/50 dark:hover:bg-slate-700"
                }`}
              >
                All {label}s
                {!value && <span className="ml-2 text-blue-400">✓</span>}
              </button>

              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleChange(filterKey, option.value)}
                  className={`w-full px-4 py-3 text-left text-sm transition-colors ${
                    value === option.value
                      ? "bg-blue-600/20 text-blue-400 font-semibold"
                      : "text-slate-300 dark:text-slate-300 hover:bg-slate-700/50 dark:hover:bg-slate-700"
                  }`}
                >
                  {option.label}
                  {value === option.value && (
                    <span className="ml-2 text-blue-400">✓</span>
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-slate-900 md:rounded-2xl border-b md:border border-slate-200 dark:border-slate-800 md:shadow-sm mb-0 md:mb-6 overflow-hidden">
      {/* Mobile Layout */}
      <div className="md:hidden bg-slate-900 dark:bg-slate-950">
        {/* Search Bar */}
        <div className="p-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 z-10" />
            <input
              type="text"
              name="search"
              placeholder="Search resources..."
              value={filters.search || ""}
              onChange={(e) => handleChange("search", e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-slate-800/50 dark:bg-slate-800/80 border border-slate-700 dark:border-slate-700 rounded-lg text-base text-white dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Filters Accordion Header */}
        <button
          onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
          className="w-full flex items-center justify-between px-4 py-3 bg-slate-900/50 dark:bg-slate-900/80 border-y border-slate-800 dark:border-slate-800 hover:bg-slate-800/30 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-slate-400" />
            <span className="text-base font-semibold text-white dark:text-white">
              Filters
            </span>
            {activeFilterCount > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-blue-600 text-white text-xs font-bold rounded-full">
                {activeFilterCount}
              </span>
            )}
          </div>
          {isFiltersExpanded ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>

        {/* Collapsible Filter Content */}
        {isFiltersExpanded && (
          <div className="px-4 py-4 bg-slate-900 dark:bg-slate-950 border-b border-slate-800">
            {/* High School Filters */}
            {educationLevel === "high_school" && (
              <>
                <MobileFilterButton
                  label="Stream"
                  value={filters.stream || ""}
                  filterKey="stream"
                  options={streams}
                />
                <MobileFilterButton
                  label="Subject"
                  value={filters.subject || ""}
                  filterKey="subject"
                  options={subjects}
                />
                <MobileFilterButton
                  label="Resource Type"
                  value={filters.type || ""}
                  filterKey="type"
                  options={resourceTypes}
                />
              </>
            )}

            {/* University Filters */}
            {educationLevel === "university" && (
              <>
                <MobileFilterButton
                  label="Student Type"
                  value={filters.studentType || ""}
                  filterKey="studentType"
                  options={studentTypes}
                />
                <MobileFilterButton
                  label="University"
                  value={filters.university || ""}
                  filterKey="university"
                  options={universities}
                />
                <MobileFilterButton
                  label="Department"
                  value={filters.department || ""}
                  filterKey="department"
                  options={departments}
                />
                <MobileFilterButton
                  label="Subject"
                  value={filters.subject || ""}
                  filterKey="subject"
                  options={subjects}
                />
                <MobileFilterButton
                  label="Resource Type"
                  value={filters.type || ""}
                  filterKey="type"
                  options={resourceTypes}
                />
              </>
            )}

            {/* Clear All Button */}
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-red-400 dark:text-red-400 bg-red-500/10 dark:bg-red-500/10 border border-red-500/20 dark:border-red-500/20 rounded-lg hover:bg-red-500/20 dark:hover:bg-red-500/20 transition-colors mt-2"
              >
                <X className="w-4 h-4" />
                Clear All Filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Desktop Layout - Original Grid */}
      <div className="hidden md:block p-5 space-y-5">
        {/* Search Field */}
        <div className="w-full">
          <FormInput
            label="Search"
            type="text"
            name="search"
            placeholder="Search resources..."
            value={filters.search || ""}
            onChange={(e) => handleChange("search", e.target.value)}
          />
        </div>

        {/* Dropdown Filters - Grid Layout */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <FormSelect
            label="Resource Type"
            name="type"
            value={filters.type || ""}
            onChange={(e) => handleChange("type", e.target.value)}
            options={resourceTypes}
          />

          {educationLevel === "university" && (
            <FormSelect
              label="Student Type"
              name="studentType"
              value={filters.studentType || ""}
              onChange={(e) => handleChange("studentType", e.target.value)}
              options={studentTypes}
            />
          )}

          <FormSelect
            label="Subject"
            name="subject"
            value={filters.subject || ""}
            onChange={(e) => handleChange("subject", e.target.value)}
            options={subjects}
          />

          {educationLevel === "high_school" && (
            <>
              <FormSelect
                label="Grade"
                name="grade"
                value={filters.grade || ""}
                onChange={(e) => handleChange("grade", e.target.value)}
                options={grades}
              />

              <FormSelect
                label="Stream"
                name="stream"
                value={filters.stream || ""}
                onChange={(e) => handleChange("stream", e.target.value)}
                options={streams}
              />
            </>
          )}

          {educationLevel === "university" && (
            <>
              <FormSelect
                label="University"
                name="university"
                value={filters.university || ""}
                onChange={(e) => handleChange("university", e.target.value)}
                options={universities}
              />

              <FormSelect
                label="Department"
                name="department"
                value={filters.department || ""}
                onChange={(e) => handleChange("department", e.target.value)}
                options={departments}
              />
            </>
          )}
        </div>

        {/* Clear Filters Button */}
        {activeFilterCount > 0 && (
          <div className="flex justify-end">
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
              Clear All Filters ({activeFilterCount})
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
