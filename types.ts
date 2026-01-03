
// Import React to provide access to the React namespace and its types like ReactNode
import React from 'react';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface ComplianceStandard {
  id: string;
  title: string;
  details: string[];
}
