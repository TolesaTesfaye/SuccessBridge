import React from 'react';
import { Filter } from 'lucide-react';
import { ResourceCard } from '@components/resources/ResourceCard';
import { DEPARTMENTS, UNIVERSITIES } from '@utils/constants';

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
  activeCategory
}) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Resource Hub Filters - Personalized */}
      <div className="flex flex-wrap gap-4 items-center bg-transparent mb-6">
        <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 mr-2">
          <Filter className="w-5 h-5" />
          <span className="text-sm font-bold uppercase tracking-wider">Hub Filters</span>
        </div>

        {/* University Filter */}
        <div className="flex-1 min-w-[200px]">
          <select
            value={selectedUniversity}
            onChange={(e) => setSelectedUniversity(e.target.value)}
            className="w-full pl-4 pr-10 py-2.5 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-all cursor-pointer appearance-none shadow-sm hover:border-slate-300 dark:hover:border-slate-700"
          >
            <option value="">All Universities</option>
            {(availableUniversities.length > 0 ? availableUniversities.map(u => u.name) : UNIVERSITIES).map(uni => (
              <option key={uni} value={uni}>{uni}</option>
            ))}
          </select>
        </div>

        {/* Stream Selector */}
        <div className="flex-1 min-w-[180px]">
          <select
            value={selectedStream}
            onChange={(e) => setSelectedStream(e.target.value as any)}
            className="w-full pl-4 pr-10 py-2.5 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-all cursor-pointer appearance-none shadow-sm hover:border-slate-300 dark:hover:border-slate-700"
          >
            <option value="">All Streams</option>
            <option value="natural">Natural Science</option>
            <option value="social">Social Science</option>
          </select>
        </div>

        {/* Department Selector (Only for Senior/GC) */}
        {!isIntroductory && (
          <div className="flex-1 min-w-[180px]">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-all cursor-pointer appearance-none shadow-sm hover:border-slate-300 dark:hover:border-slate-700"
            >
              <option value="">All Departments</option>
              {Object.keys(DEPARTMENTS).map(dept => (
                <option key={dept} value={dept}>{dept.replace(/_/g, ' ')}</option>
              ))}
            </select>
          </div>
        )}

        {/* Dynamic Resource Type Selector */}
        <div className="flex-1 min-w-[180px]">
          <select
            value={selectedResourceType}
            onChange={(e) => setSelectedResourceType(e.target.value)}
            className="w-full pl-4 pr-10 py-2.5 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-all cursor-pointer appearance-none shadow-sm hover:border-slate-300 dark:hover:border-slate-700"
          >
            <option value="">All Formats (Modules, Exams...)</option>
            {resourceTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Subject Filter */}
        <div className="flex-1 min-w-[200px]">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full pl-4 pr-10 py-2.5 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-all cursor-pointer appearance-none shadow-sm hover:border-slate-300 dark:hover:border-slate-700"
          >
            <option value="">{(activeCategory === 'remedial' && !selectedStream) ? 'Select Stream First' : 'All Subjects'}</option>
            {subjects.map(subj => (
              <option key={subj} value={subj}>{subj}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Curated Material Grid */}
      <div className="bg-white dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden p-8 lg:p-12">
        {loading ? (
          <div className="text-center py-20 flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-blue-600/20 border-t-blue-600 dark:border-blue-400/20 dark:border-t-blue-400 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500 dark:text-slate-400 font-bold tracking-tight animate-pulse">Accessing higher ed repositories...</p>
          </div>
        ) : resources.length === 0 ? (
          <div className="text-center py-24 bg-slate-50/50 dark:bg-slate-800/20 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700">
            <div className="text-6xl mb-6">🏝️</div>
            <h4 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">No resources found</h4>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto font-medium mb-4">
              Try adjusting your filters or expanding your search to all universities.
            </p>
            {activeCategory === 'freshman' && (
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 max-w-md mx-auto">
                <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                  Try adjusting your filters or contact support if you expect to see resources here.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {resources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
