import React, { useState, useEffect } from "react";
import { FormInput } from "@components/forms/FormInput";
import { FormSelect } from "@components/forms/FormSelect";
import { FormTextarea } from "@components/forms/FormTextarea";
import { Button } from "@components/common/Button";
import { gradeService, Grade } from "@services/gradeService";
import { streamService, Stream } from "@services/streamService";
import { subjectService, Subject } from "@services/subjectService";
import { universityService } from "@services/universityService";
import { departmentService, Department } from "@services/departmentService";
import { resourceTypeService } from "@services/resourceTypeService";

export interface UploadFormData {
  title: string;
  description: string;
  educationLevel: "high_school" | "university";
  grade?: string;
  stream?: string;
  universityId?: string;
  departmentId?: string;
  category?: string;
  type: string;
  subject: string;
  file: File | null;
  tags: string;
}

interface ResourceUploadFormProps {
  onSubmit: (data: UploadFormData) => void;
  loading?: boolean;
  initialData?: Partial<UploadFormData>;
}

type ResourceTypeData = { id: string; name: string; gradeId: string };

type UniversityData = { id: string; name: string; location?: string };

export const ResourceUploadForm: React.FC<ResourceUploadFormProps> = ({
  onSubmit,
  loading = false,
  initialData,
}) => {
  const [formData, setFormData] = useState<UploadFormData>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    educationLevel: initialData?.educationLevel || "university",
    grade: initialData?.grade || "",
    stream: initialData?.stream || "",
    universityId: initialData?.universityId || "",
    departmentId: initialData?.departmentId || "",
    category: initialData?.category || "",
    type: initialData?.type || "",
    subject: initialData?.subject || "",
    file: initialData?.file || null,
    tags: initialData?.tags || "",
  });
  const [error, setError] = useState<string | null>(null);

  const [grades, setGrades] = useState<Grade[]>([]);
  const [streams, setStreams] = useState<Stream[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [universities, setUniversities] = useState<UniversityData[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [resourceTypes, setResourceTypes] = useState<ResourceTypeData[]>([]);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const res = await universityService.getUniversities();
        setUniversities(res?.data || []);
      } catch {
        setUniversities([]);
      }
    };
    fetchUniversities();
  }, []);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const data = await gradeService.getGrades(formData.educationLevel);
        setGrades(Array.isArray(data) ? data : []);
      } catch {
        setGrades([]);
      }
    };
    fetchGrades();
    setFormData((prev) => ({
      ...prev,
      grade: "",
      stream: "",
      category: "",
      departmentId: "",
      subject: "",
    }));
  }, [formData.educationLevel]);

  useEffect(() => {
    if (formData.grade) {
      const fetchStreams = async () => {
        try {
          const data = await streamService.getStreams(formData.grade);
          setStreams(Array.isArray(data) ? data : []);
        } catch {
          setStreams([]);
        }
      };
      fetchStreams();
      if (formData.educationLevel === "high_school") {
        setFormData((prev) => ({ ...prev, stream: "", subject: "" }));
      }
    } else {
      setStreams([]);
    }
  }, [formData.educationLevel, formData.grade]);

  useEffect(() => {
    if (formData.educationLevel === "university" && formData.universityId) {
      const fetchDepartments = async () => {
        try {
          const data = await departmentService.getByUniversity(formData.universityId!);
          setDepartments(Array.isArray(data) ? data : []);
        } catch {
          setDepartments([]);
        }
      };
      fetchDepartments();
      setFormData((prev) => ({ ...prev, departmentId: "", subject: "" }));
    } else {
      setDepartments([]);
    }
  }, [formData.educationLevel, formData.universityId]);

  useEffect(() => {
    const filters: Record<string, string> = {};
    if (formData.educationLevel === "high_school") {
      if (formData.grade) filters.gradeId = formData.grade;
      if (formData.stream) filters.streamId = formData.stream;
    } else {
      if (formData.departmentId) {
        filters.departmentId = formData.departmentId;
      } else if (formData.grade) {
        filters.gradeId = formData.grade;
        if (formData.stream) filters.streamId = formData.stream;
      }
    }

    const fetchSubjects = async () => {
      try {
        const data = await subjectService.getSubjectsByFilter(filters);
        setSubjects(Array.isArray(data) ? data : []);
      } catch {
        setSubjects([]);
      }
    };

    if (Object.keys(filters).length > 0) {
      fetchSubjects();
    } else {
      setSubjects([]);
    }
  }, [formData.educationLevel, formData.grade, formData.stream, formData.departmentId]);

  // Fetch resource types when grade changes
  useEffect(() => {
    setResourceTypes([]);
    if (formData.grade) {
      const controller = new AbortController();
      resourceTypeService.getByGrade(formData.grade, controller.signal).then((data) => {
        if (!controller.signal.aborted) setResourceTypes(Array.isArray(data) ? data : []);
      }).catch(() => {
        if (!controller.signal.aborted) setResourceTypes([]);
      });
      return () => controller.abort();
    }
  }, [formData.grade]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "educationLevel") {
      setFormData((prev) => ({
        ...prev,
        educationLevel: value as "high_school" | "university",
        grade: "",
        stream: "",
        category: "",
        universityId: "",
        departmentId: "",
        subject: "",
      }));
    } else if (name === "grade") {
      if (formData.educationLevel === "university") {
        const selectedGrade = grades.find((g) => g.id === value);
        const category = selectedGrade ? selectedGrade.name.toLowerCase() : "";
        setFormData((prev) => ({
          ...prev,
          grade: value,
          category,
          stream: "",
          departmentId: "",
          subject: "",
        }));
      } else {
        setFormData((prev) => ({ ...prev, grade: value, stream: "", subject: "" }));
      }
    } else if (name === "stream" || name === "departmentId") {
      setFormData((prev) => ({ ...prev, [name]: value, subject: "" }));
    } else if (name === "universityId") {
      setFormData((prev) => ({ ...prev, universityId: value, departmentId: "", subject: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setError(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, file }));
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.type || !formData.subject || (!formData.file && !loading)) {
      setError("Please fill in all required fields");
      return;
    }

    if (formData.educationLevel === "high_school") {
      if (!formData.grade) {
        setError("Please select a grade for high school students");
        return;
      }
      const selectedGrade = grades.find((g) => g.id === formData.grade);
      if (selectedGrade && selectedGrade.level >= 11 && streams.length > 0 && !formData.stream) {
        setError("Please select a stream for grades 11-12");
        return;
      }
    } else {
      if (!formData.universityId) {
        setError("Please select a university");
        return;
      }
      if (!formData.category) {
        setError("Please select a student category");
        return;
      }
      if ((formData.category === "senior" || formData.category === "gc") && !formData.departmentId) {
        setError("Please select a department for senior/GC students");
        return;
      }
    }

    const resolvedType = resourceTypes.find((r) => r.id === formData.type)?.name || formData.type;
    onSubmit({ ...formData, type: resolvedType });
  };

  const getResourceTypes = () => {
    return resourceTypes.map((rt) => ({
      value: rt.id,
      label: rt.name,
    }));
  };

  const getTargetStudentInfo = () => {
    if (formData.educationLevel === "high_school") {
      const selectedGrade = grades.find((g) => g.id === formData.grade);
      if (!selectedGrade) return "";
      let info = `High School - ${selectedGrade.name}`;
      if (formData.stream) {
        const streamData = streams.find((s) => s.id === formData.stream);
        if (streamData) info += ` (${streamData.name})`;
      }
      return info;
    }

    const selectedUni = universities.find((u) => u.id === formData.universityId);
    let info = `University - ${selectedUni?.name || formData.universityId}`;
    if (formData.category) {
      const selectedGrade = grades.find((g) => g.id === formData.grade);
      info += ` - ${selectedGrade?.name || formData.category}`;
    }
    if (formData.departmentId) {
      const selectedDept = departments.find((d) => d.id === formData.departmentId);
      info += ` - ${selectedDept?.name || formData.departmentId}`;
    }
    return info;
  };

  const selectedGrade = grades.find((g) => g.id === formData.grade);
  const isHighSchoolStreamRequired = (() => {
    if (formData.educationLevel !== "high_school") return false;
    if (!selectedGrade) return false;
    if (streams.length === 0) return false;
    if (selectedGrade.level <= 10) return false;
    return true;
  })();

  const showDepartmentDropdown = formData.category === "senior" || formData.category === "gc";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      {formData.educationLevel && (formData.grade || formData.universityId) && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">
            📚 This resource will be available to:
          </h3>
          <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
            {getTargetStudentInfo()}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <FormInput
            label="Resource Title *"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter resource title"
            required
          />

          <FormTextarea
            label="Description *"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter resource description"
            rows={4}
            required
          />

          <FormInput
            label="Tags"
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Enter tags separated by commas"
            helperText="e.g., important, exam-prep, chapter-5"
          />
        </div>

        <div className="space-y-6">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
              🎯 Target Student Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormSelect
                label="Education Level *"
                name="educationLevel"
                value={formData.educationLevel}
                onChange={handleChange}
                options={[
                  { value: "high_school", label: "High School" },
                  { value: "university", label: "University" },
                ]}
              />

              {formData.educationLevel === "high_school" ? (
                <FormSelect
                  label="Grade *"
                  name="grade"
                  value={formData.grade || ""}
                  onChange={handleChange}
                  options={[
                    { value: "", label: "Select Grade" },
                    ...grades.map((g) => ({ value: g.id, label: g.name })),
                  ]}
                />
              ) : (
                <FormSelect
                  label="University *"
                  name="universityId"
                  value={formData.universityId || ""}
                  onChange={handleChange}
                  options={[
                    { value: "", label: "Select University" },
                    ...universities.map((u) => ({ value: u.id, label: u.name })),
                  ]}
                />
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {formData.educationLevel === "high_school" ? (
                isHighSchoolStreamRequired && (
                  <FormSelect
                    label="Stream *"
                    name="stream"
                    value={formData.stream || ""}
                    onChange={handleChange}
                    options={[
                      { value: "", label: "Select Stream" },
                      ...streams.map((s) => ({ value: s.id, label: s.name })),
                    ]}
                  />
                )
              ) : (
                <>
                  <FormSelect
                    label="Student Category *"
                    name="grade"
                    value={formData.grade || ""}
                    onChange={handleChange}
                    options={[
                      { value: "", label: "Select Category" },
                      ...grades.map((g) => ({ value: g.id, label: g.name })),
                    ]}
                  />
                  {formData.grade && formData.category && (
                    <>
                      {showDepartmentDropdown && (
                        <FormSelect
                          label="Department *"
                          name="departmentId"
                          value={formData.departmentId || ""}
                          onChange={handleChange}
                          options={[
                            { value: "", label: "Select Department" },
                            ...departments.map((d) => ({ value: d.id, label: d.name })),
                          ]}
                        />
                      )}
                      <FormSelect
                        label="Stream"
                        name="stream"
                        value={formData.stream || ""}
                        onChange={handleChange}
                        options={[
                          { value: "", label: "All Streams" },
                          ...streams.map((s) => ({ value: s.id, label: s.name })),
                        ]}
                      />
                    </>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
              📄 Resource Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormSelect
                label="Resource Type *"
                name="type"
                value={formData.type}
                onChange={handleChange}
                options={[
                  { value: "", label: resourceTypes.length === 0 && formData.grade ? "No types available" : "Select Type" },
                  ...getResourceTypes(),
                ]}
              />

              <FormSelect
                label="Subject / Module *"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                options={[
                  { value: "", label: subjects.length === 0 && (formData.grade || formData.departmentId) ? "No subjects available" : "Select Subject" },
                  ...subjects.map((s) => ({ value: s.id, label: s.name })),
                ]}
                helperText={
                  formData.category === "freshman"
                    ? "Freshman subjects"
                    : formData.category === "remedial"
                      ? "Stream-based subjects"
                      : ""
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Upload File *
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 dark:border-slate-700 border-dashed rounded-[16px] hover:border-blue-500 transition-colors">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-slate-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-slate-600 dark:text-slate-400">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-transparent rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                  >
                    <span>
                      {formData.file ? "Change file" : "Upload a file"}
                    </span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.avi,.mov,.jpg,.jpeg,.png,.gif,.webp"
                    />
                  </label>
                  {!formData.file && <p className="pl-1">or drag and drop</p>}
                </div>
                <p className="text-xs text-slate-500">
                  PDF, DOC, PPT, Video, Image (JPG, PNG, GIF, WebP) up to 50MB
                </p>
              </div>
            </div>
            {formData.file && (
              <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <span className="text-lg">📄</span>
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300 truncate">
                  {formData.file.name}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t dark:border-slate-800">
        <Button
          variant="primary"
          type="submit"
          disabled={loading}
          size="lg"
          className="px-12"
        >
          {loading ? "Processing..." : "Upload Resource to SuccessBridge"}
        </Button>
      </div>
    </form>
  );
};
