

"use client";

import RequireAuth from "../../components/Auth/RequireAuth";
import { useSubmissionContext } from "../../context/SubmissionContext";
import { useState, useEffect } from "react";
import EditArtistModal from "../../components/EditArtistModal";
import ArtistViewModal from "../../components/ArtistCard/ArtistViewModal";
import type { Artist } from "../../components/ArtistCard/ArtistList";
import { useToast } from "../layout";
import DashboardTableSkeleton from "../../components/Table/DashboardTableSkeleton";
import { Button } from "../../components/ui/button";

function DashboardPage() {
  const { submissions, deleteSubmission, editSubmission } = useSubmissionContext();
  const [editArtist, setEditArtist] = useState<Artist | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [viewArtist, setViewArtist] = useState<Artist | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timeout);
  }, []);

  function handleView(artist: Artist) {
    setViewArtist(artist);
    setShowViewModal(true);
  }
  function handleViewClose() {
    setShowViewModal(false);
  }
  function handleEdit(artist: Artist) {
    setEditArtist(artist);
    setShowEditModal(true);
  }
  function handleEditSave(updated: Artist) {
    editSubmission(updated);
    setShowEditModal(false);
    showToast("Artist updated successfully!", "success");
  }
  function handleEditCancel() {
    setShowEditModal(false);
  }
  function handleDelete(id: number, name: string) {
    deleteSubmission(id);
    showToast(`Deleted artist: ${name}`, "info");
  }

  if (loading) return <DashboardTableSkeleton />;

  return (
    <main className="min-h-screen px-4 sm:px-6 py-8 sm:py-12
      bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50
      dark:from-gray-900 dark:via-indigo-900 dark:to-gray-900
      flex flex-col items-center"
    >
      <div className="max-w-5xl w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-primary drop-shadow-sm tracking-tight text-center md:text-left">
          Manager Dashboard
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-8 text-center md:text-left max-w-3xl mx-auto md:mx-0 text-lg leading-relaxed">
          View all artist submissions below. Data is stored in local state for this demo.
        </p>

        <div className="overflow-x-auto rounded-xl shadow border border-gray-200 dark:border-gray-700">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                  Name
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                  Category
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                  City
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                  Fee
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-700">
              {submissions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-gray-400 dark:text-gray-500">
                    No submissions yet.
                  </td>
                </tr>
              ) : (
                submissions.map((artist) => (
                  <tr key={artist.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150">
                    <td className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100">{artist.name}</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{artist.category.join(", ")}</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{artist.location}</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{artist.feeRange}</td>
                    <td className="px-4 py-3 flex flex-wrap gap-2 sm:gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleView(artist)}
                        aria-label={`View ${artist.name}`}
                      >
                        View
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="bg-yellow-500 hover:bg-yellow-600 text-white"
                        onClick={() => handleEdit(artist)}
                        aria-label={`Edit ${artist.name}`}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(artist.id, artist.name)}
                        aria-label={`Delete ${artist.name}`}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {showViewModal && viewArtist && (
            <ArtistViewModal artist={viewArtist} onClose={handleViewClose} />
          )}
        </div>
      </div>

      {showEditModal && editArtist && (
        <EditArtistModal
          artist={editArtist}
          onSave={handleEditSave}
          onCancel={handleEditCancel}
        />
      )}
    </main>
  );
}

export default function Dashboard() {
  return (
    <RequireAuth>
      <DashboardPage />
    </RequireAuth>
  );
}


