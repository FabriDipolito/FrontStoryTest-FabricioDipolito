import type { Campaign } from '../types';
import { format } from 'date-fns';

type Props = {
  campaigns: Campaign[];
  onDelete: (id: string) => void;
};

export default function CampaignTable({ campaigns, onDelete }: Props) {
  if (campaigns.length === 0) {
    return <p className="text-gray-500">No campaigns found.</p>;
  }

  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">Name</th>
          <th className="border p-2">Start Date</th>
          <th className="border p-2">End Date</th>
          <th className="border p-2">Clicks</th>
          <th className="border p-2">Cost</th>
          <th className="border p-2">Revenue</th>
          <th className="border p-2">Profit</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {campaigns.map((campaign) => {
          const profit = campaign.revenue - campaign.cost;
          const profitColor = profit >= 0 ? 'text-green-600' : 'text-red-600';

          return (
            <tr key={campaign.id}>
              <td className="border p-2">{campaign.name}</td>
              <td className="border p-2">
                {format(new Date(campaign.startDate), 'MM/dd/yyyy')}
              </td>
              <td className="border p-2">
                {format(new Date(campaign.endDate), 'MM/dd/yyyy')}
              </td>
              <td className="border p-2">{campaign.clicks}</td>
              <td className="border p-2">${campaign.cost.toFixed(2)}</td>
              <td className="border p-2">${campaign.revenue.toFixed(2)}</td>
              <td className={`border p-2 font-medium ${profitColor}`}>
                ${profit.toFixed(2)}
              </td>
              <td className="border p-2">
                <button
                  onClick={() => onDelete(campaign.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
