import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader } from "@components/common/Card";
import { Button } from "@components/common/Button";
import { resourceService } from "@services/resourceService";

interface ResourcesTabProps {
  onUpload: () => void;
}

export const ResourcesTab: React.FC<ResourcesTabProps> = ({ onUpload }) => {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await resourceService.getResources();
      const resourcesList = response.data?.data || [];
      setResources(Array.isArray(resourcesList) ? resourcesList : []);
    } catch (err) {
      setError("Failed to load resources");
      console.error(err);
      setResources([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteResource = async (id: string) => {
    if (confirm("Are you sure you want to delete this resource?")) {
      try {
        await resourceService.deleteResource(id);
        setResources(resources.filter((r) => r.id !== id));
      } catch (err) {
        alert("Failed to delete resource");
        console.error(err);
      }
    }
  };

  if (loading) {
    return (
      <Card>
        <CardBody>
          <div className="text-center py-8">
            <p className="text-gray-600">Loading resources...</p>
          </div>
        </CardBody>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardBody>
          <div className="text-center py-8">
            <p className="text-red-600">{error}</p>
            <Button
              variant="secondary"
              onClick={fetchResources}
              className="mt-4"
            >
              Retry
            </Button>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
              Learning Resources ({resources.length})
            </span>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button
              variant="primary"
              size="sm"
              onClick={onUpload}
              className="flex-1 md:flex-none"
            >
              Upload Resource
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={fetchResources}
              className="flex-1 md:flex-none"
            >
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        {resources.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No resources uploaded yet</p>
          </div>
        ) : (
          <>
            {/* Mobile Card View */}
            <div className="md:hidden space-y-3">
              {resources.map((resource) => (
                <div
                  key={resource.id}
                  className="bg-white dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-white/5 p-4 space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-lg flex-shrink-0">
                      📚
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-slate-900 dark:text-white truncate">
                        {resource.title}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        {resource.uploadedBy || "N/A"}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-50 dark:bg-slate-900/30 rounded-lg p-2">
                      <div className="text-slate-400 mb-1">Type</div>
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded text-[10px] font-semibold">
                        {resource.type}
                      </span>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900/30 rounded-lg p-2">
                      <div className="text-slate-400 mb-1">Level</div>
                      <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded text-[10px] font-semibold">
                        {resource.educationLevel}
                      </span>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900/30 rounded-lg p-2 col-span-2">
                      <div className="text-slate-400 mb-1">Uploaded</div>
                      <div className="font-bold text-slate-700 dark:text-slate-300">
                        {new Date(resource.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2 border-t border-slate-100 dark:border-white/5">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => window.open(resource.fileUrl, "_blank")}
                      className="flex-1"
                    >
                      View
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteResource(resource.id)}
                      className="flex-1"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold text-gray-900 text-sm">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-900 text-sm">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-900 text-sm">
                      Uploaded By
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-900 text-sm">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-900 text-sm">
                      Level
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-900 text-sm">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {resources.map((resource) => (
                    <tr
                      key={resource.id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 text-gray-600 text-sm font-medium">
                        {resource.title}
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold">
                          {resource.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm">
                        {resource.uploadedBy || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm">
                        {new Date(resource.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm">
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-semibold">
                          {resource.educationLevel}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() =>
                              window.open(resource.fileUrl, "_blank")
                            }
                          >
                            View
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDeleteResource(resource.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </CardBody>
    </Card>
  );
};
