import React, { useEffect, useRef, useState } from 'react';
import { TerminalLog } from '../types';

interface TerminalProps {
  logs: TerminalLog[];
}

export const Terminal: React.FC<TerminalProps> = ({ logs }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="w-full h-full flex flex-col bg-slate-950 rounded-xl overflow-hidden border border-slate-800 font-mono text-xs md:text-sm shadow-2xl">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="text-slate-400 text-xs">root@cpuminer-multi:~</div>
        <div className="w-8"></div>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto space-y-1 scrollbar-hide">
        {logs.map((log) => (
          <div key={log.id} className="break-all">
            <span className="text-slate-500 mr-2">[{log.timestamp}]</span>
            {log.type === 'command' && <span className="text-green-400 font-bold">$ </span>}
            <span className={`
              ${log.type === 'command' ? 'text-white font-bold' : ''}
              ${log.type === 'success' ? 'text-emerald-400' : ''}
              ${log.type === 'warning' ? 'text-yellow-400' : ''}
              ${log.type === 'error' ? 'text-red-400' : ''}
              ${log.type === 'info' ? 'text-slate-300' : ''}
            `}>
              {log.message}
            </span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};
