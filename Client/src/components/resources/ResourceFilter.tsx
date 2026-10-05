import React, { useState, useEffect } from "react";
import { FormSelect } from "@components/forms/FormSelect";
import { FormInput } from "@components/forms/FormInput";
import { Search, ChevronDown, X, Filter, ChevronUp } from "lucide-react";
import { gradeService, Grade } from "@services/gradeService";
import { streamService, Stream } from "@services/streamService";
import { subjectService, Subject } from "@services/subjectService";
import { universityService } from "@services/universityService";
import { departmentService, Department } from "@services/departmentService";
import { resourceTypeService } from "@services/resourceTypeService";

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
  category?: string;
  educationLevel?: "high_school" | "university";
}

export const ResourceFilter: React.FC<ResourceFilterProps> = ({
  onFilter,
  educationLevel = "high_school",
}) => {
  const [filters, setFilters] = React.useState<FilterOptions>({});
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
  const [isFiltersExpanded, setIsFiltersExpanded] = React.useState(false);

  const [grades, setGrades] = useState<Grade[]>([]);
  const [streams, setStreams] = useState<Stream[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [resourceTypes, setResourceTypes] = useState<{ id: string; name: string }[]>([]);
  const [universities, setUniversities] = useState<{ id: string; name: string }[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  // Derive selected grade object from filter value (grades have IDs not matching the filter string)
  const selectedGradeName = filters.grade || filters.category || "";

  // Fetch grades when educationLevel changes
  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await gradeService.getGrades(educationLevel);
        setGrades(Array.isArray(data) ? data : []);
      } catch {
        setGrades([]);
      }
    };
    fetch();
    setStreams([]);
    setSubjects([]);
    setResourceTypes([]);
  }, [educationLevel]);

  // Fetch universities on mount
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await universityService.getUniversities();
        setUniversities(res?.data || []);
      } catch {
        setUniversities([]);
      }
    };
    fetch();
  }, []);

  // Fetch streams and resource types when grade filter changes
  useEffect(() => {
    if (!selectedGradeName) {
      setStreams([]);
      setResourceTypes([]);
      return;
    }
    const matched = grades.find((g) => g.name.toLowerCase() === selectedGradeName.toLowerCase());
    if (!matched) {
      setStreams([]);
      setResourceTypes([]);
      return;
    }
    const gId = matched.id;

    const fetchStreams = async () => {
      try {
        const data = await streamService.getStreams(gId);
        setStreams(Array.isArray(data) ? data : []);
      } catch {
        setStreams([]);
      }
    };
    const fetchTypes = async () => {
      try {
        const data = await resourceTypeService.getByGrade(gId);
        setResourceTypes(Array.isArray(data) ? data : []);
      } catch {
        setResourceTypes([]);
      }
    };
    fetchStreams();
    fetchTypes();
  }, [selectedGradeName, grades]);

  // Fetch departments when university filter changes
  const selectedUniversity = filters.university || "";
  useEffect(() => {
    if (!selectedUniversity) {
      setDepartments([]);
      return;
    }
    const matched = universities.find((u) => u.name.toLowerCase() === selectedUniversity.toLowerCase());
    if (!matched) {
      setDepartments([]);
      return;
    }
    const fetch = async () => {
      try {
        const data = await departmentService.getByUniversity(matched.id);
        setDepartments(Array.isArray(data) ? data : []);
      } catch {
        setDepartments([]);
      }
    };
    fetch();
  }, [selectedUniversity, universities]);

  // Fetch subjects based on grade + stream + department combination
  const selectedStream = filters.stream || "";
  const selectedDepartment = filters.department || "";
  useEffect(() => {
    if (!selectedGradeName && !selectedStream && !selectedDepartment) {
      setSubjects([]);
      return;
    }

    const params: { gradeId?: string; streamId?: string; departmentId?: string } = {};
    const matchedGrade = grades.find((g) => g.name.toLowerCase() === selectedGradeName.toLowerCase());
    if (matchedGrade) params.gradeId = matchedGrade.id;
    const matchedStream = streams.find((s) => {
      const baseCode = s.code.split('_').pop() || s.code;
      return baseCode === selectedStream || s.name.toLowerCase() === selectedStream.toLowerCase();
    });
    if (matchedStream) params.streamId = matchedStream.id;
    const matchedDept = departments.find((d) => d.name.toLowerCase() === selectedDepartment.toLowerCase());
    if (matchedDept) params.departmentId = matchedDept.id;

    const fetch = async () => {
      try {
        const data = await subjectService.getSubjectsByFilter(params);
        setSubjects(Array.isArray(data) ? data : []);
      } catch {
        setSubjects([]);
      }
    };
    fetch();
  }, [selectedGradeName, selectedStream, selectedDepartment, grades, streams, departments]);

  const handleChange = (name: string, value: string) => {
    const updated = { ...filters, [name]: value || undefined };
    setFilters(updated);
    onFilter(updated);
    setOpenDropdown(null);
  };

  const clearFilters = () => {
    setFilters({});
    onFilter({});
  };

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  const gradeNameToKey = (name: string): string => {
    const map: Record<string, string> = {
      'grade 9': 'grade_9',
      'grade 10': 'grade_10',
      'grade 11': 'grade_11',
      'grade 12': 'grade_12',
    };
    return map[name.toLowerCase()] || name.toLowerCase();
  };
  const gradeOptions = grades.map((g) => ({ value: gradeNameToKey(g.name), label: g.name }));
  const streamOptions = streams.map((s) => ({ value: s.code.split('_').pop() || s.code, label: s.name }));
  const subjectOptions = subjects.map((s) => ({ value: s.name.toLowerCase(), label: s.name }));
  const typeOptions = resourceTypes.map((rt) => ({ value: rt.name.toLowerCase(), label: rt.name }));
  const uniOptions = universities.map((u) => ({ value: u.name, label: u.name }));
  const deptOptions = departments.map((d) => ({ value: d.name, label: d.name }));

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
        <div className="text-sm font-medium text-slate-400 dark:text-slate-500 mb-2">
          {label}
        </div>
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
        {isOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setOpenDropdown(null)}
            />
            <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 dark:bg-slate-800 border border-slate-700 dark:border-slate-600 rounded-lg shadow-2xl z-50 max-h-64 overflow-y-auto">
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
        {isFiltersExpanded && (
          <div className="px-4 py-4 bg-slate-900 dark:bg-slate-950 border-b border-slate-800">
            {educationLevel === "high_school" ? (
              <>
                <MobileFilterButton label="Grade" value={filters.grade || ""} filterKey="grade" options={gradeOptions} />
                {streams.length > 0 && (
                  <MobileFilterButton label="Stream" value={filters.stream || ""} filterKey="stream" options={streamOptions} />
                )}
                {subjects.length > 0 && (
                  <MobileFilterButton label="Subject" value={filters.subject || ""} filterKey="subject" options={subjectOptions} />
                )}
                {resourceTypes.length > 0 && (
                  <MobileFilterButton label="R.type" value={filters.type || ""} filterKey="type" options={typeOptions} />
                )}
              </>
            ) : (
              <>
                <MobileFilterButton label="Category" value={filters.category || ""} filterKey="category" options={gradeOptions} />
                <MobileFilterButton label="University" value={filters.university || ""} filterKey="university" options={uniOptions} />
                {departments.length > 0 && (
                  <MobileFilterButton label="Department" value={filters.department || ""} filterKey="department" options={deptOptions} />
                )}
                {streams.length > 0 && (
                  <MobileFilterButton label="Stream" value={filters.stream || ""} filterKey="stream" options={streamOptions} />
                )}
                {subjects.length > 0 && (
                  <MobileFilterButton label="Subject" value={filters.subject || ""} filterKey="subject" options={subjectOptions} />
                )}
                {resourceTypes.length > 0 && (
                  <MobileFilterButton label="R.type" value={filters.type || ""} filterKey="type" options={typeOptions} />
                )}
              </>
            )}
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

      {/* Desktop Layout */}
      <div className="hidden md:block p-5 space-y-5">
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
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {educationLevel === "high_school" ? (
            <>
              <FormSelect label="Grade" name="grade" value={filters.grade || ""} onChange={(e) => handleChange("grade", e.target.value)} options={gradeOptions} />
              {streams.length > 0 && (
                <FormSelect label="Stream" name="stream" value={filters.stream || ""} onChange={(e) => handleChange("stream", e.target.value)} options={streamOptions} />
              )}
              {subjects.length > 0 && (
                <FormSelect label="Subject" name="subject" value={filters.subject || ""} onChange={(e) => handleChange("subject", e.target.value)} options={subjectOptions} />
              )}
              {resourceTypes.length > 0 && (
                <FormSelect label="Resource Type" name="type" value={filters.type || ""} onChange={(e) => handleChange("type", e.target.value)} options={typeOptions} />
              )}
            </>
          ) : (
            <>
              <FormSelect label="Category" name="category" value={filters.category || ""} onChange={(e) => handleChange("category", e.target.value)} options={gradeOptions} />
              <FormSelect label="University" name="university" value={filters.university || ""} onChange={(e) => handleChange("university", e.target.value)} options={uniOptions} />
              {departments.length > 0 && (
                <FormSelect label="Department" name="department" value={filters.department || ""} onChange={(e) => handleChange("department", e.target.value)} options={deptOptions} />
              )}
              {streams.length > 0 && (
                <FormSelect label="Stream" name="stream" value={filters.stream || ""} onChange={(e) => handleChange("stream", e.target.value)} options={streamOptions} />
              )}
              {subjects.length > 0 && (
                <FormSelect label="Subject" name="subject" value={filters.subject || ""} onChange={(e) => handleChange("subject", e.target.value)} options={subjectOptions} />
              )}
              {resourceTypes.length > 0 && (
                <FormSelect label="Resource Type" name="type" value={filters.type || ""} onChange={(e) => handleChange("type", e.target.value)} options={typeOptions} />
              )}
            </>
          )}
        </div>
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
