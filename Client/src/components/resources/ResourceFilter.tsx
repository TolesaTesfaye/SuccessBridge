import React from 'react';
import { ChevronDown } from 'lucide-react';

interface ResourceFilterProps {
  educationLevel: 'highSchool' | 'university';
  selectedGrade?: string;
  selectedCategory?: string;
  onFilterChange: (filters: { grade?: string; category?: string }) => void;
}

const GRADE_OPTIONS = [
  { value: 'grade_9', label: 'Grade 9' },
  { value: 'grade_10', label: 'Grade 10' },
  { value: 'grade_11', label: 'Grade 11' },
  { value: 'grade_12', label: 'Grade 12' },
];

const UNIVERSITY_CATEGORIES = [
  { value: 'remedial', label: '🔧 Remedial' },
  { value: 'freshman', label: '🎓 Freshman' },
];

export const ResourceFilter: React.FC<ResourceFilterProps> = ({
  educationLevel,
  selectedGrade,
  selectedCategory,
  onFilterChange,
}) => {
  const handleGradeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onFilterChange({ grade: value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onFilterChange({ category: value });
  };

  return (
    <div className="flex items-center gap-3">
      {/* Grade Dropdown - High School Only */}
      {educationLevel === 'highSchool' && (
        <div className="relative">
          <select
            value={selectedGrade || ''}
            onChange={handleGradeChange}
            className="appearance-none bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-gray-700 dark:text-slate-300 hover:border-gray-400 dark:hover:border-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            <option value="">All Grades</option>
            {GRADE_OPTIONS.map((grade) => (
              <option key={grade.value} value={grade.value}>
                {grade.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600 dark:text-slate-400 pointer-events-none" />
        </div>
      )}

      {/* Category Dropdown - University Only */}
      {educationLevel === 'university' && (
        <div className="relative">
          <select
            value={selectedCategory || ''}
            onChange={handleCategoryChange}
            className="appearance-none bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-gray-700 dark:text-slate-300 hover:border-gray-400 dark:hover:border-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
          >
            <option value="">All Categories</option>
            {UNIVERSITY_CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600 dark:text-slate-400 pointer-events-none" />
        </div>
      )}
    </div>
  );
};

export default ResourceFilter;
