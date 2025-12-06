export interface MiningStat {
  timestamp: string;
  hashrate: number;
  accepted: number;
  rejected: number;
  temp: number;
}

export interface TerminalLog {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'command';
}

export interface AIInsight {
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

export enum TabView {
  DASHBOARD = 'DASHBOARD',
  TERMINAL = 'TERMINAL',
  SETTINGS = 'SETTINGS'
}
