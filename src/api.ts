import axios from 'axios';
import { QueueResponse, PayloadResponse } from './types';

// Create a proxy URL based on the environment
const BASE_URL = import.meta.env.PROD 
  ? 'https://unidas.my.salesforce.com'
  : '/api';

export async function fetchQueueData(quoteId: string, token: string) {
  const response = await axios.get<QueueResponse>(
    `${BASE_URL}/services/data/v57.0/query/?q=SELECT+FIELDS(ALL)+FROM+Queue__c+WHERE+keyField__c='${quoteId}'+limit+100`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}

export async function fetchPayloadData(queueId: string, token: string) {
  const response = await axios.get<PayloadResponse>(
    `${BASE_URL}/services/data/v57.0/query/?q=SELECT+FIELDS(ALL)+FROM+Payload_Handler__c+WHERE+Queue__c='${queueId}'+limit+100`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}