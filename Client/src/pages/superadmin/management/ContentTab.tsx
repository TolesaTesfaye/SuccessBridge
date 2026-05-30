import React, { useState, useEffect, useCallback } from "react";
import { adminService, Resource, Quiz, Subject } from "@services/adminService";
import { Eye, Edit, Trash2, Loader2 } from "lucide-react";
import { StyledCard, StyledBadge, StyledBtn } from "./StyledComponents";

export const ContentTab: React.FC<{ toast: any }> = ({ toast }) => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [activeSubTab, setActiveSubTab] = useState<
    "resources" | "quizzes" | "subjects"
  >("resources");
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [resData, quizData, subjData] = await Promise.all([
        adminService.getResources({ limit: 50 }),
        adminService.getQuizzes({ limit: 50 }),
        adminService.getSubjects(),
      ]);
      setResources(resData.resources);
      setQuizzes(quizData.quizzes);
      setSubjects(subjData);
    } catch {
      toast.error("Failed to load content");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading)
    return (
      <div className="py-12 text-center">
        <Loader2 size={32} className="animate-spin mx-auto text-blue-500" />
      </div>
    );

  return (
    <div className="space-y-6">
      {/* Sub-tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-slate-700">
        {[
          { id: "resources", label: "Resources", count: resources.length },
          { id: "quizzes", label: "Quizzes", count: quizzes.length },
          { id: "subjects", label: "Subjects", count: subjects.length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`px-4 py-2 font-semibold text-sm transition-colors border-b-2 ${activeSubTab === tab.id ? "text-blue-600 dark:text-blue-400 border-blue-600" : "text-gray-500 border-transparent hover:text-gray-700"}`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {activeSubTab === "resources" && (
        <StyledCard>
          <div className="space-y-4">
            {resources.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No resources found
              </p>
            ) : (
              resources.map((r) => (
                <div
                  key={r.id}
                  className="flex items-start justify-between p-4 bg-gray-50 dark:bg-slate-700/30 rounded-xl"
                >
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {r.title}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {r.description || "No description"}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <StyledBadge className="bg-blue-100 text-blue-700">
                        {r.type}
                      </StyledBadge>
                      <StyledBadge className="bg-purple-100 text-purple-700">
                        {r.educationLevel}
                      </StyledBadge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <StyledBtn size="sm" variant="ghost">
                      <Eye size={14} />
                    </StyledBtn>
                    <StyledBtn size="sm" variant="ghost">
                      <Trash2 size={14} className="text-red-500" />
                    </StyledBtn>
                  </div>
                </div>
              ))
            )}
          </div>
        </StyledCard>
      )}

      {activeSubTab === "quizzes" && (
        <StyledCard>
          <div className="space-y-4">
            {quizzes.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No quizzes found</p>
            ) : (
              quizzes.map((q) => (
                <div
                  key={q.id}
                  className="flex items-start justify-between p-4 bg-gray-50 dark:bg-slate-700/30 rounded-xl"
                >
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {q.title}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {q.description || "No description"}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <StyledBadge
                        className={
                          q.isPublished
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }
                      >
                        {q.isPublished ? "Published" : "Draft"}
                      </StyledBadge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <StyledBtn size="sm" variant="ghost">
                      <Edit size={14} />
                    </StyledBtn>
                    <StyledBtn size="sm" variant="ghost">
                      <Eye size={14} />
                    </StyledBtn>
                  </div>
                </div>
              ))
            )}
          </div>
        </StyledCard>
      )}

      {activeSubTab === "subjects" && (
        <StyledCard>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjects.map((s) => (
              <div
                key={s.id}
                className="p-4 bg-gray-50 dark:bg-slate-700/30 rounded-xl"
              >
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {s.name}
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  {s.description || "No description"}
                </p>
              </div>
            ))}
          </div>
        </StyledCard>
      )}
    </div>
  );
};
