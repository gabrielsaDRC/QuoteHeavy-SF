export interface QueueRecord {
  Id: string;
  Name: string;
  CreatedDate: string;
  EventName__c: string;
  Status__c: string;
  Response__c: string;
  keyField__c: string;
}

export interface PayloadRecord {
  Id: string;
  Name: string;
  CreatedDate: string;
  Payload__c: string;
  Queue__c: string;
}

export interface QueueResponse {
  totalSize: number;
  done: boolean;
  records: QueueRecord[];
}

export interface PayloadResponse {
  totalSize: number;
  done: boolean;
  records: PayloadRecord[];
}