import { useMemo, useState } from 'react';
import { format } from 'date-fns';
import type { Campaign } from '../types';

type Props = {
  campaigns: Campaign[];
  onDelete: (id: string) => void;
};

type SortKey = 'name' | 'startDate' | 'endDate' | 'profit';
type SortOrder = 'asc' | 'desc';

export default function CampaignTable({ campaigns, onDelete }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>('startDate');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const sortedCampaigns = useMemo(() => {
    const sorted = [...campaigns].sort((a, b) => {
      let aValue: string | number = '';
      let bValue: string | number = '';

      switch (sortKey) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'startDate':
          aValue = new Date(a.startDate).getTime();
          bValue = new Date(b.startDate).getTime();
          break;
        case 'endDate':
          aValue = new Date(a.endDate).getTime();
          bValue = new Date(b.endDate).getTime();
          break;
        case 'profit':
          aValue = a.revenue - a.cost;
          bValue = b.revenue - b.cost;
          break;
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [campaigns, sortKey, sortOrder]);

  const getSortIndicator = (key: SortKey) =>
    sortKey === key ? (sortOrder === 'asc' ? '▲' : '▼') : '';

  if (campaigns.length === 0) {
    return <p className="text-gray-400 italic">No campaigns found.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-700">
      <table className="w-full text-sm text-left text-gray-300">
        <thead className="bg-zinc-800 text-gray-400 uppercase text-xs">
          <tr>
            <th className="px-4 py-3 cursor-pointer" onClick={() => toggleSort('name')}>
              Name {getSortIndicator('name')}
            </th>
            <th className="px-4 py-3 cursor-pointer" onClick={() => toggleSort('startDate')}>
              Start Date {getSortIndicator('startDate')}
            </th>
            <th className="px-4 py-3 cursor-pointer" onClick={() => toggleSort('endDate')}>
              End Date {getSortIndicator('endDate')}
            </th>
            <th className="px-4 py-3">Clicks</th>
            <th className="px-4 py-3">Cost</th>
            <th className="px-4 py-3">Revenue</th>
            <th className="px-4 py-3 cursor-pointer" onClick={() => toggleSort('profit')}>
              Profit {getSortIndicator('profit')}
            </th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-700 bg-zinc-900">
          {sortedCampaigns.map((campaign) => {
            const profit = campaign.revenue - campaign.cost;
            const profitColor = profit >= 0 ? 'text-green-500' : 'text-red-500';

            return (
              <tr key={campaign.id} className="hover:bg-zinc-800 transition">
                <td className="px-4 py-2 font-medium text-white">{campaign.name}</td>
                <td className="px-4 py-2">
                  {format(new Date(campaign.startDate), 'MM/dd/yyyy')}
                </td>
                <td className="px-4 py-2">
                  {format(new Date(campaign.endDate), 'MM/dd/yyyy')}
                </td>
                <td className="px-4 py-2">{campaign.clicks}</td>
                <td className="px-4 py-2">${campaign.cost.toFixed(2)}</td>
                <td className="px-4 py-2">${campaign.revenue.toFixed(2)}</td>
                <td className={`px-4 py-2 font-semibold ${profitColor}`}>
                  ${profit.toFixed(2)}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => onDelete(campaign.id)}
                    className="bg-red-700 hover:bg-red-600 text-white text-xs px-3 py-1 rounded transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
