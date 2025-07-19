// src/App.tsx
import { useEffect, useState } from 'react';
import type { Campaign } from './types';
import CampaignForm from './components/CampaignForm';
import CampaignTable from './components/CampaignTable';

const LOCAL_STORAGE_KEY = 'campaigns';

function App() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [showModal, setShowModal] = useState(false);

  // Load campaigns from localStorage once on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) setCampaigns(JSON.parse(stored));
    } catch (err) {
      console.error('Failed to load campaigns:', err);
    }
  }, []);

  // Persist changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(campaigns));
    } catch (err) {
      console.error('Failed to save campaigns:', err);
    }
  }, [campaigns]);

  const addCampaign = (campaign: Campaign) => {
    setCampaigns((prev) => [...prev, campaign]);
    setShowModal(false);
  };

  const deleteCampaign = (id: string) => {
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-zinc-800 rounded-lg shadow-xl p-8 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Campaign Manager</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm font-medium transition"
          >
            + Add Campaign
          </button>
        </div>

        {/* Scrollable Table Section */}
        <div className="overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
          <CampaignTable campaigns={campaigns} onDelete={deleteCampaign} />
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-zinc-900 text-white rounded-lg p-6 w-full max-w-lg shadow-xl relative fade-in">
            <CampaignForm onAdd={addCampaign} onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
