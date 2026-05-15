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

  // Define filters for mobile display (Top 3 filters)
  const getMobileFilters = () => {
    if (educationLevel === "high_school") {
      return [
        { label: "Stream", key: "stream", options: streams },
        { label: "Subject", key: "subject", options: subjects },
        { label: "Resource Type", key: "type", options: resourceTypes },
      ];
    } else {
      return [
        { label: "University", key: "university", options: universities },
        { label: "Department", key: "department", options: departments },
        { label: "Subject", key: "subject", options: subjects },
      ];
    }
  };

  const mobileFilters = getMobileFilters();

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
              onChange={(e) => handleChange('search', e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-slate-800/50 dark:bg-slate-800/80 border border-slate-700 dark:border-slate-700 rounded-lg text-base text-white dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Mobile Filter Dropdowns - 3 Column Grid */}
        <div className="px-4 py-4 border-t border-slate-800">
          <div className="grid grid-cols-3 gap-3">
            {mobileFilters.map((filter) => (
              <div key={filter.key} className="relative">
                {/* Label */}
                <label className="block text-xs font-medium text-slate-400 dark:text-slate-500 mb-2">
                  {filter.label}
                </label>

                {/* Dropdown Button */}
                <button
                  onClick={() => setOpenDropdown(openDropdown === filter.key ? null : filter.key)}
                  className="w-full flex items-center justify-between px-3 py-2.5 bg-slate-800/50 dark:bg-slate-800/80 border border-slate-700 dark:border-slate-600 rounded-lg text-left transition-all hover:bg-slate-800/70 dark:hover:bg-slate-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <span className="text-sm font-medium text-white dark:text-slate-200 truncate">
                    {filters[filter.key as keyof FilterOptions] 
                      ? mobileFilters.find(f => f.key === filter.key)?.options.find(opt => opt.value === filters[filter.key as keyof FilterOptions])?.label 
                      : `All ${filter.label}s`
                    }
                  </span>
                  <ChevronDown 
                    className={`w-4 h-4 text-slate-400 transition-transform flex-shrink-0 ml-1 ${openDropdown === filter.key ? 'rotate-180' : ''}`} 
                  />
                </button>

                {/* Dropdown Options */}
                {openDropdown === filter.key && (
                  <>
                    <div 
                      className="fixed inset-0 bg-black/40 z-40"
                      onClick={() => setOpenDropdown(null)}
                    />
                    <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 dark:bg-slate-800 border border-slate-700 dark:border-slate-600 rounded-lg shadow-2xl z-50 max-h-64 overflow-y-auto">
                      <button
                        onClick={() => handleChange(filter.key, '')}
                        className={`w-full px-3 py-2.5 text-left text-xs transition-colors border-b border-slate-700 dark:border-slate-700 ${
                          !filters[filter.key as keyof FilterOptions]
                            ? 'bg-blue-600/20 text-blue-400 font-semibold'
                            : 'text-slate-300 dark:text-slate-300 hover:bg-slate-700/50 dark:hover:bg-slate-700'
                        }`}
                      >
                        All {filter.label}s
                        {!filters[filter.key as keyof FilterOptions] && (
                          <span className="ml-2 text-blue-400">✓</span>
                        )}
                      </button>
                      {filter.options.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleChange(filter.key, option.value)}
                          className={`w-full px-3 py-2.5 text-left text-xs transition-colors ${
                            filters[filter.key as keyof FilterOptions] === option.value
                              ? 'bg-blue-600/20 text-blue-400 font-semibold'
                              : 'text-slate-300 dark:text-slate-300 hover:bg-slate-700/50 dark:hover:bg-slate-700'
                          }`}
                        >
                          {option.label}
                          {filters[filter.key as keyof FilterOptions] === option.value && (
                            <span className="ml-2 text-blue-400">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Clear All Button - Only show if filters are active */}
          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="w-full mt-3 flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-red-400 dark:text-red-400 bg-red-500/10 dark:bg-red-500/10 border border-red-500/20 dark:border-red-500/20 rounded-lg hover:bg-red-500/20 dark:hover:bg-red-500/20 transition-colors"
            >
              <X className="w-3 h-3" />
              Clear Filters
            </button>
          )}
        </div>
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
            onChange={(e) => handleChange('search', e.target.value)}
          />
        </div>

        {/* Dropdown Filters - Grid Layout */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <FormSelect
            label="Resource Type"
            name="type"
            value={filters.type || ""}
            onChange={(e) => handleChange('type', e.target.value)}
            options={resourceTypes}
          />

          {educationLevel === "university" && (
            <FormSelect
              label="Student Type"
              name="studentType"
              value={filters.studentType || ""}
              onChange={(e) => handleChange('studentType', e.target.value)}
              options={studentTypes}
            />
          )}

          <FormSelect
            label="Subject"
            name="subject"
            value={filters.subject || ""}
            onChange={(e) => handleChange('subject', e.target.value)}
            options={subjects}
          />

          {educationLevel === "high_school" && (
            <>
              <FormSelect
                label="Grade"
                name="grade"
                value={filters.grade || ""}
                onChange={(e) => handleChange('grade', e.target.value)}
                options={grades}
              />

              <FormSelect
                label="Stream"
                name="stream"
                value={filters.stream || ""}
                onChange={(e) => handleChange('stream', e.target.value)}
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
                onChange={(e) => handleChange('university', e.target.value)}
                options={universities}
              />

              <FormSelect
                label="Department"
                name="department"
                value={filters.department || ""}
                onChange={(e) => handleChange('department', e.target.value)}
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

