import React, { useState, useEffect } from "react";
import { FormInput } from "@components/forms/FormInput";
import { FormSelect } from "@components/forms/FormSelect";
import { FormTextarea } from "@components/forms/FormTextarea";
import { Button } from "@components/common/Button";
import { gradeService, Grade } from "@services/gradeService";
import { streamService, Stream } from "@services/streamService";
import { subjectService, Subject } from "@services/subjectService";
import { universityService } from "@services/universityService";
import { resourceTypeService } from "@services/resourceTypeService";

// Import preview assets
import finalExamPreview from "../../assets/previews/final-exam.jpg";
import handoutPreview from "../../assets/previews/handout.jpg";
import lastYearExamPreview from "../../assets/previews/last-year-exam.jpg";
import lectureSlidePreview from "../../assets/previews/lecture-slide.jpg";
import midExamPreview from "../../assets/previews/mid-exam.jpg";
import modulesPreview from "../../assets/previews/modules.jpg";
import notePreview from "../../assets/previews/note.jpg";
import referenceBookPreview from "../../assets/previews/reference-book.jpg";

const getPreviewImageForType = (typeInput: string, titleInput: string = "") => {
  const type = typeInput.toLowerCase().trim();
  const title = titleInput.toLowerCase().trim();

  // 1. Module -> modules.jpg
  if (
    type.includes("module") ||
    type === "professional_module" ||
    type === "project" ||
    title.includes("module") ||
    title.includes("loe")
  ) {
    return modulesPreview;
  }

  // 2. Video Tutorial -> lecture-slide.jpg
  if (
    type.includes("video") ||
    type.includes("tutorial") ||
    title.includes("video") ||
    title.includes("tutorial") ||
    title.includes("slide")
  ) {
    return lectureSlidePreview;
  }

  // 3. Reference Book -> reference-book.jpg
  if (
    type.includes("book") ||
    type.includes("reference") ||
    type.includes("textbook") ||
    title.includes("book") ||
    title.includes("reference")
  ) {
    return referenceBookPreview;
  }

  // 4. Interactive Quiz -> mid-exam.jpg
  if (
    type.includes("quiz") ||
    type.includes("interactive") ||
    type.includes("practice") ||
    title.includes("quiz")
  ) {
    return midExamPreview;
  }

  // 5. Worksheet -> handout.jpg
  if (
    type.includes("worksheet") ||
    type.includes("handout") ||
    type.includes("guide") ||
    type.includes("sheet") ||
    type.includes("assignment") ||
    title.includes("worksheet") ||
    title.includes("handout")
  ) {
    return handoutPreview;
  }

  // 6. Recommendation -> note.jpg
  if (
    type.includes("recommendation") ||
    type.includes("career") ||
    type.includes("guidance") ||
    type.includes("research") ||
    title.includes("recommendation")
  ) {
    return notePreview;
  }

  // 7. Last Year Exam -> last-year-exam.jpg
  if (type.includes("final") || title.includes("final")) {
    return finalExamPreview;
  }

  if (type.includes("mid") || title.includes("mid")) {
    return midExamPreview;
  }

  if (
    type.includes("exam") ||
    type.includes("past") ||
    type.includes("entrance") ||
    title.includes("exam") ||
    title.includes("last year")
  ) {
    return lastYearExamPreview;
  }

  return notePreview;
};

export interface UploadFormData {
  title: string;
  description: string;
  educationLevel: "high_school" | "university";
  grade?: string;
  stream?: string;
  universityId?: string;
  category?: string;
  type: string;
  subject: string;
  file: File | null;
  previewImage?: File | null;
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
    category: initialData?.category || "",
    type: initialData?.type || "",
    subject: initialData?.subject || "",
    file: initialData?.file || null,
    previewImage: initialData?.previewImage || null,
    tags: initialData?.tags || "",
  });
  const [error, setError] = useState<string | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

  const [grades, setGrades] = useState<Grade[]>([]);
  const [streams, setStreams] = useState<Stream[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [subjectsLoading, setSubjectsLoading] = useState(false);
  const [universities, setUniversities] = useState<UniversityData[]>([]);
  const [resourceTypes, setResourceTypes] = useState<ResourceTypeData[]>([]);
  const [resourceTypesLoading, setResourceTypesLoading] = useState(false);

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
    const filters: Record<string, string> = {};
    if (formData.educationLevel === "high_school") {
      if (formData.grade) filters.gradeId = formData.grade;
      if (formData.stream) filters.streamId = formData.stream;
    } else {
      if (formData.grade) {
        filters.gradeId = formData.grade;
        if (formData.stream) filters.streamId = formData.stream;
      }
    }

    if (Object.keys(filters).length === 0) {
      setSubjects([]);
      setSubjectsLoading(false);
      return;
    }

    let cancelled = false;
    setSubjectsLoading(true);

    subjectService
      .getSubjectsByFilter(filters)
      .then((data) => {
        if (!cancelled) setSubjects(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!cancelled) setSubjects([]);
      })
      .finally(() => {
        if (!cancelled) setSubjectsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [formData.educationLevel, formData.grade, formData.stream]);

  // Fetch resource types when grade/category changes
  useEffect(() => {
    setResourceTypes([]);

    if (!formData.grade) {
      setResourceTypesLoading(false);
      return;
    }

    const controller = new AbortController();
    setResourceTypesLoading(true);

    resourceTypeService
      .getByGrade(formData.grade, controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) {
          setResourceTypes(Array.isArray(data) ? data : []);
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) setResourceTypes([]);
      })
      .finally(() => {
        if (!controller.signal.aborted) setResourceTypesLoading(false);
      });

    return () => controller.abort();
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
        subject: "",
        type: "",
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
          subject: "",
          type: "",
        }));
      } else {
        setFormData((prev) => ({ ...prev, grade: value, stream: "", subject: "", type: "" }));
      }
    } else if (name === "stream") {
      setFormData((prev) => ({ ...prev, [name]: value, subject: "" }));
    } else if (name === "universityId") {
      setFormData((prev) => ({ ...prev, universityId: value, subject: "" }));
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

  const handlePreviewImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const previewImage = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, previewImage }));
    setError(null);
  };

  // Create a local object URL so the admin can see the selected cover image
  useEffect(() => {
    if (!formData.previewImage) {
      setPreviewImageUrl(null);
      return;
    }
    const url = URL.createObjectURL(formData.previewImage);
    setPreviewImageUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [formData.previewImage]);

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
    }

    const resolvedType = resourceTypes.find((r) => r.id === formData.type)?.name;
    if (!resolvedType) {
      setError("Please select a valid resource type");
      return;
    }
    onSubmit({ ...formData, type: resolvedType });
  };

  const getResourceTypes = () =>
    resourceTypes.map((rt) => ({
      value: rt.id,
      label: rt.name,
    }));

  const selectedTypeName = resourceTypes.find((r) => r.id === formData.type)?.name || "";

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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
          {error}
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
                disabled={!formData.grade || resourceTypesLoading || resourceTypes.length === 0}
                options={
                  !formData.grade
                    ? [{ value: "", label: "Select a grade / category first" }]
                    : resourceTypesLoading
                      ? [{ value: "", label: "Loading resource types..." }]
                      : resourceTypes.length === 0
                        ? [{ value: "", label: "No types configured" }]
                        : getResourceTypes()
                }
                helperText={
                  !formData.grade
                    ? "Choose a grade or student category to load its resource types."
                    : resourceTypesLoading
                      ? "Loading resource types..."
                      : resourceTypes.length === 0
                        ? "No resource types configured for this category. Add them in Education Hierarchy."
                        : undefined
                }
              />

              <FormSelect
                label="Subject / Module *"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                disabled={!formData.grade || subjectsLoading || subjects.length === 0}
                options={
                  !formData.grade
                    ? [{ value: "", label: "Select a grade / category first" }]
                    : subjectsLoading
                      ? [{ value: "", label: "Loading subjects..." }]
                      : subjects.length === 0
                        ? [{ value: "", label: "No subjects configured" }]
                        : subjects.map((s) => ({ value: s.id, label: s.name }))
                }
                helperText={
                  !formData.grade
                    ? "Choose a grade or student category to load its subjects."
                    : subjectsLoading
                      ? "Loading subjects..."
                      : subjects.length === 0
                        ? "No subjects configured for this selection. Add them in Education Hierarchy."
                        : formData.category === "freshman"
                          ? "Freshman subjects"
                          : formData.category === "remedial"
                            ? "Stream-based subjects"
                            : undefined
                }
              />
            </div>

            {(formData.type || previewImageUrl) && (
              <div className="mt-4 p-3 bg-white dark:bg-slate-800 rounded-xl border border-blue-200 dark:border-blue-900/50 shadow-sm space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    🖼️ Card Preview Image
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                      previewImageUrl
                        ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/40 border-emerald-200 dark:border-emerald-800"
                        : "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/40 border-blue-200 dark:border-blue-800"
                    }`}
                  >
                    {previewImageUrl
                      ? "CUSTOM IMAGE"
                      : selectedTypeName
                        ? `DEFAULT · ${selectedTypeName.toUpperCase()}`
                        : "DEFAULT"}
                  </span>
                </div>
                <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 relative bg-slate-100 dark:bg-slate-900 group">
                  <img
                    src={
                      previewImageUrl ||
                      getPreviewImageForType(selectedTypeName, formData.title)
                    }
                    alt="Resource preview"
                    className="w-full h-32 sm:h-36 md:h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent flex flex-col justify-end p-3">
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-blue-400">
                      {previewImageUrl ? "Your uploaded image" : "Default image"}
                    </span>
                    <h4 className="text-white font-bold text-xs md:text-sm line-clamp-1">
                      {formData.title || "Resource Title Preview"}
                    </h4>
                  </div>
                </div>

                <div className="pt-1">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Preview Image{" "}
                    <span className="font-normal text-slate-400">(optional)</span>
                  </label>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2">
                    Upload a custom cover image, or leave empty to use the default
                    image for this resource type.
                  </p>
                  <div className="relative flex flex-wrap items-center gap-2">
                    <label
                      htmlFor="preview-image-upload"
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-200 cursor-pointer hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {formData.previewImage ? "Change image" : "Choose image"}
                    </label>
                    <input
                      id="preview-image-upload"
                      name="preview-image-upload"
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
                      className="sr-only"
                      onChange={handlePreviewImageChange}
                    />
                    {formData.previewImage && (
                      <>
                        <span className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[180px]">
                          {formData.previewImage.name}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              previewImage: null,
                            }))
                          }
                          className="text-xs font-semibold text-red-600 dark:text-red-400 hover:underline"
                        >
                          Remove
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
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
                <div className="relative flex text-sm text-slate-600 dark:text-slate-400">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-transparent rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                  >
                    <span>
                      {formData.file ? "Change file" : "Upload a file"}
                    </span>
                  </label>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.avi,.mov,.jpg,.jpeg,.png,.gif,.webp"
                  />
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
