import React, { useState } from 'react';
import { format } from 'date-fns';
import { Search, RefreshCw, FileJson, XCircle } from 'lucide-react';
import { QueueRecord, PayloadRecord } from '../types';

interface QueueViewerProps {
  onSearch: (quoteId: string) => void;
  onPayloadView: (queueId: string) => void;
  onClear: () => void;
  queueData: QueueRecord[] | null;
  payloadData: PayloadRecord[] | null;
  isLoading: boolean;
}

export function QueueViewer({
  onSearch,
  onPayloadView,
  onClear,
  queueData,
  payloadData,
  isLoading,
}: QueueViewerProps) {
  const [quoteId, setQuoteId] = useState('');
  const [selectedPayloadIndex, setSelectedPayloadIndex] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(quoteId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={quoteId}
            onChange={(e) => setQuoteId(e.target.value)}
            placeholder="Enter Quote ID"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading ? (
              <RefreshCw className="h-5 w-5 animate-spin" />
            ) : (
              <Search className="h-5 w-5" />
            )}
            Search
          </button>
          {queueData && (
            <button
              type="button"
              onClick={onClear}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center gap-2"
            >
              <XCircle className="h-5 w-5" />
              Clear
            </button>
          )}
        </div>
      </form>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Queue Records</h2>
          {queueData && queueData.length > 0 ? (
            <div className="space-y-4">
              {queueData.map((record) => (
                <div
                  key={record.Id}
                  className="border border-gray-200 rounded-md p-4 hover:bg-gray-50"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{record.Name}</h3>
                    <button
                      onClick={() => onPayloadView(record.Id)}
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <FileJson className="h-4 w-4" />
                      View Payload
                    </button>
                  </div>
                  <div className="text-sm text-gray-500">
                    <p>Created: {format(new Date(record.CreatedDate), 'PPpp')}</p>
                    <p>Status: {record.Status__c}</p>
                    <p>Event: {record.EventName__c}</p>
                  </div>
                  <div className="mt-2 text-sm">
                    <pre className="whitespace-pre-wrap bg-gray-50 p-2 rounded">
                      {record.Response__c}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No queue records found</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Payload Data</h2>
          {payloadData && payloadData.length > 0 ? (
            <div>
              <div className="mb-4 flex items-center gap-4">
                <select
                  value={selectedPayloadIndex}
                  onChange={(e) => setSelectedPayloadIndex(Number(e.target.value))}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {payloadData.map((record, index) => {
                    const payload = JSON.parse(record.Payload__c);
                    return (
                      <option key={record.Id} value={index}>
                        Line {payload.lineNumber}
                      </option>
                    );
                  })}
                </select>
                <p className="text-sm text-gray-500">
                  Created: {format(new Date(payloadData[selectedPayloadIndex].CreatedDate), 'PPpp')}
                </p>
              </div>
              <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded-md overflow-auto max-h-[600px] text-sm">
                {JSON.stringify(JSON.parse(payloadData[selectedPayloadIndex].Payload__c), null, 2)}
              </pre>
            </div>
          ) : (
            <p className="text-gray-500">Select a queue record to view its payload</p>
          )}
        </div>
      </div>
    </div>
  );
}