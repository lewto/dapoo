import React, { useState } from 'react';
import { Trophy } from 'lucide-react';

interface CustomerIdFormProps {
  onSubmit: (customerId: string) => Promise<void>;
  loading?: boolean;
  error?: string | null;
}

export default function CustomerIdForm({ onSubmit, loading, error }: CustomerIdFormProps) {
  const [customerId, setCustomerId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerId.match(/^\d+$/)) {
      return;
    }
    await onSubmit(customerId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-orbitron bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Enter your iRacing ID
        </h2>
        <p className="mt-2 text-sm text-gray-400">
          Find your Customer ID in your iRacing profile or URL
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <div className="relative group">
            <Trophy className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#FF1801]" />
            <input
              type="text"
              value={customerId}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setCustomerId(value);
              }}
              className="w-full bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:border-[#FF1801] focus:ring-1 focus:ring-[#FF1801] transition-all duration-200"
              placeholder="Enter your Customer ID (e.g., 468543)"
              required
              pattern="\d+"
              disabled={loading}
            />
          </div>
          <p className="text-xs text-gray-500">
            Your Customer ID can be found in your iRacing profile URL: members.iracing.com/membersite/member/CareerStats.do?custid=<span className="text-[#FF1801]">YOUR_ID</span>
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !customerId.match(/^\d+$/)}
          className="w-full bg-gradient-to-r from-[#FF1801] to-[#FF4D4D] text-white rounded-lg px-4 py-3 font-medium hover:from-[#FF4D4D] hover:to-[#FF1801] transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
            </div>
          ) : (
            'Generate Certificates'
          )}
        </button>
      </form>
    </div>
  );
}