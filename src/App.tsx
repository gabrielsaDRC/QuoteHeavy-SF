import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster, toast } from 'react-hot-toast';
import { TokenInput } from './components/TokenInput';
import { QueueViewer } from './components/QueueViewer';
import { fetchQueueData, fetchPayloadData } from './api';
import { QueueRecord, PayloadRecord } from './types';

const queryClient = new QueryClient();

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [queueData, setQueueData] = useState<QueueRecord[] | null>(null);
  const [payloadData, setPayloadData] = useState<PayloadRecord[] | null>(null);

  const handleSearch = async (quoteId: string) => {
    if (!token) return;

    try {
      setIsLoading(true);
      setPayloadData(null); // Clear payload data when searching
      const response = await fetchQueueData(quoteId, token);
      setQueueData(response.records);

      if (response.records.length === 0) {
        toast.error('No records found for this Quote ID');
      }
    } catch (error) {
      toast.error('Failed to fetch queue data');
      console.error('Queue fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayloadView = async (queueId: string) => {
    if (!token) return;

    try {
      setIsLoading(true);
      const response = await fetchPayloadData(queueId, token);
      setPayloadData(response.records);

      if (response.records.length === 0) {
        toast.error('No payload found for this queue record');
      }
    } catch (error) {
      toast.error('Failed to fetch payload data');
      console.error('Payload fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setQueueData(null);
    setPayloadData(null);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100">
        {!token ? (
          <TokenInput onSubmit={setToken} />
        ) : (
          <QueueViewer
            onSearch={handleSearch}
            onPayloadView={handlePayloadView}
            onClear={handleClear}
            queueData={queueData}
            payloadData={payloadData}
            isLoading={isLoading}
          />
        )}
        <Toaster position="top-right" />
      </div>
    </QueryClientProvider>
  );
}

export default App;