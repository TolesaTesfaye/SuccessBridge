import React from "react";
import { FormSelect } from "@components/forms/FormSelect";
import { FormInput } from "@components/forms/FormInput";
import { Search, ChevronDown, X } from "lucide-react";

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
    options 
  }: { 
    label: string; 
    value: string; 
    filterKey: string; 
    options: { value: string; label: string }[] 
  }) => {
    const isOpen = openDropdown === filterKey;
    const selectedOption = options.find(opt => opt.value === value);
    
    return (
      <div className="relative">
        <button
          onClick={() => setOpenDropdown(isOpen ? null : filterKey)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-left transition-all hover:border-blue-400 dark:hover:border-blue-500 active:scale-[0.98]"
        >
          <div className="flex-1">
            <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-0.5">
              {label}
            </div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white truncate">
              {selectedOption ? selectedOption.label : `Select ${label}`}
            </div>
          </div>
          <ChevronDown 
            className={`w-5 h-5 text-slate-400 transition-transform flex-shrink-0 ml-2 ${isOpen ? 'rotate-180' : ''}`} 
          />
        </button>

        {/* Dropdown Options */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/20 z-40"
              onClick={() => setOpenDropdown(null)}
            />
            
            {/* Options List */}
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto">
              {/* Clear Option */}
              {value && (
                <button
                  onClick={() => handleChange(filterKey, '')}
                  className="w-full px-4 py-3 text-left text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Clear Selection
                </button>
              )}
              
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleChange(filterKey, option.value)}
                  className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors ${
                    value === option.value
                      ? 'bg-blue-50 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 font-bold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  {option.label}
                  {value === option.value && (
                    <span className="ml-2 text-blue-600 dark:text-blue-400">✓</span>
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
    <div className="bg-white dark:bg-slate-900 rounded-xl md:rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm mb-4 md:mb-6 overflow-hidden">
      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="p-3 space-y-3">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />
            <input
              type="text"
              name="search"
              placeholder="Search resources..."
              value={filters.search || ""}
              onChange={(e) => handleChange('search', e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Buttons - Vertical Stack */}
          <div className="space-y-2">
            {/* High School Filters */}
            {educationLevel === "high_school" && (
              <>
                <MobileFilterButton
                  label="Stream"
                  value={filters.stream || ''}
                  filterKey="stream"
                  options={streams}
                />
                <MobileFilterButton
                  label="Grade"
                  value={filters.grade || ''}
                  filterKey="grade"
                  options={grades}
                />
                <MobileFilterButton
                  label="Subject"
                  value={filters.subject || ''}
                  filterKey="subject"
                  options={subjects}
                />
                <MobileFilterButton
                  label="Resource Type"
                  value={filters.type || ''}
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
                  value={filters.studentType || ''}
                  filterKey="studentType"
                  options={studentTypes}
                />
                <MobileFilterButton
                  label="University"
                  value={filters.university || ''}
                  filterKey="university"
                  options={universities}
                />
                <MobileFilterButton
                  label="Department"
                  value={filters.department || ''}
                  filterKey="department"
                  options={departments}
                />
                <MobileFilterButton
                  label="Subject"
                  value={filters.subject || ''}
                  filterKey="subject"
                  options={subjects}
                />
                <MobileFilterButton
                  label="Resource Type"
                  value={filters.type || ''}
                  filterKey="type"
                  options={resourceTypes}
                />
              </>
            )}
          </div>

          {/* Clear All Button */}
          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors"
            >
              <X className="w-4 h-4" />
              Clear All Filters ({activeFilterCount})
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

