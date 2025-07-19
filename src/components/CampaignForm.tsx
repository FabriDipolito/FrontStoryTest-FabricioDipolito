import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Campaign } from '../types';

type Props = {
  onAdd: (campaign: Campaign) => void;
  onClose: () => void;
};

export default function CampaignForm({ onAdd, onClose }: Props) {
  const [form, setForm] = useState({
    name: '',
    startDate: '',
    endDate: '',
    clicks: '',
    cost: '',
    revenue: '',
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null); // limpiar error si corrige
  };

  const validateFields = () => {
    for (const [key, value] of Object.entries(form)) {
      if (!value.trim()) return key;
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const missingField = validateFields();

    if (missingField) {
      setError(`Please fill in the "${missingField}" field.`);
      return;
    }

    const newCampaign: Campaign = {
      id: uuidv4(),
      name: form.name,
      startDate: form.startDate,
      endDate: form.endDate,
      clicks: parseInt(form.clicks),
      cost: parseFloat(form.cost),
      revenue: parseFloat(form.revenue),
    };

    onAdd(newCampaign);
    setForm({
      name: '',
      startDate: '',
      endDate: '',
      clicks: '',
      cost: '',
      revenue: '',
    });
    setError(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-zinc-900 text-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add Campaign</h2>
          <button
            onClick={onClose}
            className="text-white text-2xl hover:text-red-400 transition"
          >
            &times;
          </button>
        </div>

        {error && (
          <div className="mb-4 flex items-center gap-2 bg-zinc-800 border border-yellow-500 text-yellow-300 text-sm rounded p-3">
            <span className="text-xl">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Campaign Name" value={form.name} onChange={handleChange}
            className="w-full px-4 py-2 bg-zinc-800 rounded text-white placeholder-gray-400" />
          <div className="flex gap-2">
            <input type="date" name="startDate" value={form.startDate} onChange={handleChange}
              className="w-full px-4 py-2 bg-zinc-800 rounded text-white" />
            <input type="date" name="endDate" value={form.endDate} onChange={handleChange}
              className="w-full px-4 py-2 bg-zinc-800 rounded text-white" />
          </div>
          <input type="number" name="clicks" placeholder="Clicks" value={form.clicks} onChange={handleChange}
            className="w-full px-4 py-2 bg-zinc-800 rounded text-white placeholder-gray-400" />
          <input type="number" name="cost" placeholder="Cost" value={form.cost} onChange={handleChange}
            className="w-full px-4 py-2 bg-zinc-800 rounded text-white placeholder-gray-400" />
          <input type="number" name="revenue" placeholder="Revenue" value={form.revenue} onChange={handleChange}
            className="w-full px-4 py-2 bg-zinc-800 rounded text-white placeholder-gray-400" />
          <div className="text-right">
            <button type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition">
              Add Campaign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
