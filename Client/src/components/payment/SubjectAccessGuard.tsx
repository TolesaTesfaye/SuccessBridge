import React, { useState, useEffect } from "react";
import { paymentService } from "@services/paymentService";
import { PaymentModal } from "./PaymentModal";
import { Button } from "@components/common/Button";
import { Lock, Loader, CheckCircle } from "lucide-react";
import { useAuthStore } from "@store/authStore";
import { getAvailableSubjects } from "@utils/highSchoolSubjectRegistry";

interface SubjectAccessGuardProps {
  subjectId: string;
  subjectName: string;
  educationLevel: "high_school" | "university";
  grade?: string;
  stream?: string;
  universityId?: string;
  departmentId?: string;
  children: React.ReactNode;
  freeSubjects?: string[]; // List of free subject names
}

export const SubjectAccessGuard: React.FC<SubjectAccessGuardProps> = ({
  subjectId,
  subjectName,
  educationLevel,
  grade,
  stream,
  universityId,
  departmentId,
  children,
  freeSubjects = [],
}) => {
  const { user } = useAuthStore();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [availableSubjects, setAvailableSubjects] = useState<string[]>([]);

  // Get available subjects for this education level
  useEffect(() => {
    if (educationLevel === "high_school" && grade) {
      // Convert grade to lowercase format: 'Grade 12' -> 'grade_12'
      const gradeKey = `grade_${grade.split(" ")[1]}`.toLowerCase() as
        | "grade_9"
        | "grade_10"
        | "grade_11"
        | "grade_12";
      const subjects = getAvailableSubjects(
        gradeKey,
        (stream as "natural" | "social" | null) || null,
      );
      setAvailableSubjects(subjects);
    }
  }, [educationLevel, grade, stream]);

  // Check if this subject is free
  const isFreeSubject = freeSubjects.some(
    (free) => free.toLowerCase() === subjectName.toLowerCase(),
  );

  useEffect(() => {
    checkAccess();
  }, [subjectId]);

  const checkAccess = async () => {
    // If it's a free subject, grant access immediately
    if (isFreeSubject) {
      setHasAccess(true);
      setLoading(false);
      return;
    }

    // Admin and super_admin have access to everything
    if (user?.role === "admin" || user?.role === "super_admin") {
      setHasAccess(true);
      setLoading(false);
      return;
    }

    try {
      // Check if user has made ANY approved payment
      // One payment unlocks ALL subjects
      const mySubjects = await paymentService.getMySubjectAccess();
      setHasAccess(mySubjects.length > 0); // If they have any access, they have access to all
    } catch (error) {
      console.error("Failed to check subject access:", error);
      setHasAccess(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="animate-spin text-primary-600" size={32} />
      </div>
    );
  }

  if (hasAccess) {
    return <>{children}</>;
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-full p-4">
            <Lock className="text-yellow-600 dark:text-yellow-400" size={48} />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Premium Content
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Make{" "}
          <span className="font-semibold text-primary-600">one payment</span> to
          unlock{" "}
          <span className="font-semibold text-primary-600">ALL subjects</span>{" "}
          including {subjectName}.
        </p>

        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
            One payment unlocks:
          </h3>
          <ul className="text-left space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <CheckCircle
                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                size={20}
              />
              <span>
                Access to ALL subjects (
                {availableSubjects.length > 0
                  ? availableSubjects.join(", ")
                  : "all available subjects"}
                )
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle
                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                size={20}
              />
              <span>Complete chapter-by-chapter learning materials</span>
            </li>
            <li className="flex items-start">
              <CheckCircle
                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                size={20}
              />
              <span>Interactive exercises and practice questions</span>
            </li>
            <li className="flex items-start">
              <CheckCircle
                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                size={20}
              />
              <span>Downloadable resources and study materials</span>
            </li>
            <li className="flex items-start">
              <CheckCircle
                className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                size={20}
              />
              <span>Lifetime access to all content</span>
            </li>
          </ul>
        </div>

        <Button
          onClick={() => setShowPaymentModal(true)}
          size="lg"
          className="w-full sm:w-auto"
        >
          Pay Once - Unlock Everything
        </Button>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          Payment will be verified by our admin team within 24 hours
        </p>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        subjectId={subjectId}
        subjectName={subjectName}
        educationLevel={educationLevel}
        grade={grade}
        stream={stream}
        universityId={universityId}
        departmentId={departmentId}
        onSuccess={checkAccess}
      />
    </div>
  );
};
