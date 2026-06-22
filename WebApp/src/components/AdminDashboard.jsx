import React, { useState, useEffect } from 'react';
import Logo from './Logo';

// Mock initial data
const INITIAL_RESIDENTS = [
  { id: 'R-101', name: 'Maria Santos', room: 'Room A-10', status: 'Normal', bp: '120/80', hr: '74 bpm', lastSeen: 'Just now' },
  { id: 'R-102', name: 'Jose Concepcion', room: 'Room B-03', status: 'Warning', bp: '142/92', hr: '89 bpm', lastSeen: '2 mins ago' },
  { id: 'R-103', name: 'Leonora Diaz', room: 'Room A-02', status: 'Critical', bp: '158/98', hr: '104 bpm', lastSeen: '1 min ago' },
  { id: 'R-104', name: 'Juan Del Cruz', room: 'Room C-05', status: 'Normal', bp: '118/75', hr: '68 bpm', lastSeen: '5 mins ago' },
  { id: 'R-105', name: 'Corazon Aquino', room: 'Room B-12', status: 'Normal', bp: '122/81', hr: '72 bpm', lastSeen: 'Just now' },
];

const INITIAL_SENSORS = [
  { id: 'S-701', type: 'Fall Radar', location: 'Living Room', status: 'Online', battery: '92%' },
  { id: 'S-702', type: 'Smart Band', location: 'Resident Wearable', status: 'Online', battery: '81%' },
  { id: 'S-703', type: 'Motion Sensor', location: 'Bathroom', status: 'Online', battery: '45%' },
  { id: 'S-704', type: 'Bed Sensor', location: 'Bedroom', status: 'Offline', battery: '0%' },
];

const MOCK_LOGS = [
  { id: 1, time: '18:41:02', type: 'info', message: 'Heart Rate monitor synced for Maria Santos' },
  { id: 2, time: '18:42:15', type: 'warning', message: 'High Blood Pressure threshold crossed: Jose Concepcion (142/92)' },
  { id: 3, time: '18:43:08', type: 'danger', message: 'Fall Alert Triggered in Bathroom (Radar R-12) for Leonora Diaz' },
  { id: 4, time: '18:43:10', type: 'info', message: 'Emergency alert SMS sent to Caregiver (Juan Diaz)' },
  { id: 5, time: '18:44:00', type: 'info', message: 'Heart Rate elevated (104 bpm): Leonora Diaz' },
];

export default function AdminDashboard({ onLogout }) {
  const [residents, setResidents] = useState(INITIAL_RESIDENTS);
  const [sensors, setSensors] = useState(INITIAL_SENSORS);
  const [logs, setLogs] = useState(MOCK_LOGS);
  const [filter, setFilter] = useState('All');

  // Simulate real-time data updates (IoT heart rate changes and log additions)
  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Randomly tweak heart rates of residents to make dashboard feel alive
      setResidents(prev =>
        prev.map(res => {
          if (res.status === 'Normal') {
            const hrVal = Math.floor(Math.random() * (85 - 65 + 1)) + 65;
            return { ...res, hr: `${hrVal} bpm`, lastSeen: 'Just now' };
          }
          return res;
        })
      );

      // 2. Randomly add new logs
      const randomTrigger = Math.random();
      if (randomTrigger > 0.6) {
        const timeNow = new Date().toTimeString().split(' ')[0];
        const logTypes = ['info', 'warning'];
        const randomType = logTypes[Math.floor(Math.random() * logTypes.length)];
        
        let message = '';
        if (randomType === 'info') {
          const names = ['Maria Santos', 'Juan Del Cruz', 'Corazon Aquino'];
          const name = names[Math.floor(Math.random() * names.length)];
          message = `Periodic health sync: ${name} parameters stable.`;
        } else {
          const names = ['Jose Concepcion', 'Leonora Diaz'];
          const name = names[Math.floor(Math.random() * names.length)];
          message = `Activity warning: unusual sedentary duration detected for ${name}.`;
        }

        setLogs(prev => [
          { id: Date.now(), time: timeNow, type: randomType, message },
          ...prev.slice(0, 7) // keep last 8 logs
        ]);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleResolveAlert = (id) => {
    setResidents(prev =>
      prev.map(res => (res.id === id ? { ...res, status: 'Normal' } : res))
    );
    
    const timeNow = new Date().toTimeString().split(' ')[0];
    setLogs(prev => [
      { id: Date.now(), time: timeNow, type: 'info', message: `Alert resolved for Resident ${id} by Administrator.` },
      ...prev
    ]);
  };

  const filteredResidents = residents.filter(res => {
    if (filter === 'All') return true;
    return res.status.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-body">
      {/* Upper Navigation Bar */}
      <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo wordmark={true} variant="light" />
          <span className="bg-leaf/20 border border-leaf/40 text-leaf text-xs font-mono font-bold px-2 py-0.5 rounded-full">
            IoT Admin Dashboard
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-sm font-semibold text-white">Administrator</span>
            <span className="text-xs text-gray-500 font-mono">ID: spartan-admin-01</span>
          </div>
          
          <button
            onClick={onLogout}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 border border-slate-800 hover:border-red-900/60 bg-slate-900 hover:bg-red-950/30 text-slate-400 hover:text-red-300 rounded-lg text-sm font-semibold transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            <span>Log Out</span>
          </button>
        </div>
      </header>

      {/* Main Layout Grid */}
      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Residents list, Alerts, Stats */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Stats overview cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-850 p-4.5 rounded-2xl flex flex-col justify-between">
              <span className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Total Residents</span>
              <span className="text-3xl font-display font-bold text-white mt-2">{residents.length}</span>
            </div>
            
            <div className="bg-slate-900 border border-slate-850 p-4.5 rounded-2xl flex flex-col justify-between">
              <span className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Active Alerts</span>
              <span className={`text-3xl font-display font-bold mt-2 ${residents.some(r => r.status === 'Critical') ? 'text-red-500 animate-pulse' : residents.some(r => r.status === 'Warning') ? 'text-amber-500' : 'text-leaf'}`}>
                {residents.filter(r => r.status !== 'Normal').length}
              </span>
            </div>

            <div className="bg-slate-900 border border-slate-850 p-4.5 rounded-2xl flex flex-col justify-between">
              <span className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Sensors Connected</span>
              <span className="text-3xl font-display font-bold text-sky mt-2">
                {sensors.filter(s => s.status === 'Online').length}/{sensors.length}
              </span>
            </div>

            <div className="bg-slate-900 border border-slate-850 p-4.5 rounded-2xl flex flex-col justify-between">
              <span className="text-gray-400 text-xs uppercase tracking-wider font-semibold">System Status</span>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="w-2.5 h-2.5 bg-leaf rounded-full animate-ping" />
                <span className="text-sm font-semibold text-leaf font-mono">ONLINE</span>
              </div>
            </div>
          </div>

          {/* Active Monitoring Table */}
          <div className="bg-slate-900 border border-slate-850 rounded-2xl overflow-hidden shadow-xl">
            <div className="px-6 py-5 border-b border-slate-850 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="font-display text-lg font-bold text-white">Elderly Residents Registry</h3>
                <p className="text-xs text-gray-400 mt-1">Real-time status updates from wearable sensors & bed monitoring nodes</p>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex items-center bg-slate-950 p-1 border border-slate-800 rounded-xl text-xs">
                {['All', 'Normal', 'Warning', 'Critical'].map(statusType => (
                  <button
                    key={statusType}
                    onClick={() => setFilter(statusType)}
                    className={`px-3 py-1.5 rounded-lg transition-colors font-semibold ${filter === statusType ? 'bg-leaf text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    {statusType}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-950 text-gray-400 text-xs font-mono uppercase tracking-wider border-b border-slate-850">
                    <th className="px-6 py-3.5">Resident</th>
                    <th className="px-6 py-3.5">Room</th>
                    <th className="px-6 py-3.5">Vitals</th>
                    <th className="px-6 py-3.5">Status</th>
                    <th className="px-6 py-3.5">Last Check</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850">
                  {filteredResidents.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-10 text-gray-500">
                        No residents match the selected status filter.
                      </td>
                    </tr>
                  ) : (
                    filteredResidents.map(res => (
                      <tr key={res.id} className="hover:bg-slate-950/40 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-white">{res.name}</span>
                            <span className="text-xs text-gray-500 font-mono">{res.id}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-300 font-mono text-xs">{res.room}</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col text-xs font-mono gap-0.5">
                            <span className="text-gray-400">BP: <strong className="text-white">{res.bp}</strong></span>
                            <span className="text-gray-400">HR: <strong className="text-white">{res.hr}</strong></span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                            res.status === 'Critical' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                            res.status === 'Warning' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                            'bg-leaf/20 text-leaf-dark border border-leaf/30'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${res.status === 'Critical' ? 'bg-red-400 animate-ping' : res.status === 'Warning' ? 'bg-amber-400 animate-pulse' : 'bg-leaf'}`} />
                            {res.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs text-gray-400 font-mono">{res.lastSeen}</td>
                        <td className="px-6 py-4 text-right">
                          {res.status !== 'Normal' ? (
                            <button
                              onClick={() => handleResolveAlert(res.id)}
                              className="px-2.5 py-1 bg-leaf hover:bg-leaf-dark text-white rounded text-xs font-semibold shadow-md shadow-leaf/10 active:scale-95 transition-all"
                            >
                              Resolve Alert
                            </button>
                          ) : (
                            <span className="text-xs text-gray-600 font-semibold italic">System stable</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right 1 Column: Connected Sensors & Real-time Live Log Feed */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Sensors Card List */}
          <div className="bg-slate-900 border border-slate-850 rounded-2xl p-6 shadow-xl">
            <div className="mb-4">
              <h3 className="font-display text-lg font-bold text-white">IoT Sensing Nodes</h3>
              <p className="text-xs text-gray-400 mt-0.5">Active sensor hubs reporting in current facilities</p>
            </div>
            
            <div className="space-y-3.5">
              {sensors.map(sensor => (
                <div key={sensor.id} className="bg-slate-950/60 border border-slate-850/80 p-3 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Icon wrapper based on online status */}
                    <div className={`p-2 rounded-lg ${sensor.status === 'Online' ? 'bg-leaf/10 text-leaf' : 'bg-slate-800 text-slate-500'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-400 font-mono">{sensor.id}</div>
                      <div className="text-sm font-bold text-white">{sensor.type} &bull; <span className="font-normal text-xs text-gray-500">{sensor.location}</span></div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded-full ${sensor.status === 'Online' ? 'bg-leaf/10 text-leaf' : 'bg-red-950/40 text-red-400'}`}>
                      {sensor.status}
                    </span>
                    <div className="text-[10px] text-gray-500 font-mono mt-1">Battery: {sensor.battery}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real-time system logs console */}
          <div className="bg-slate-900 border border-slate-850 rounded-2xl p-6 shadow-xl flex flex-col h-[400px]">
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-white">Live Event Logs</h3>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">Streaming real-time device signals & telemetry alerts</p>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-3 font-mono text-xs pr-1 border border-slate-950 bg-slate-950 p-3 rounded-xl scrollbar-thin scrollbar-thumb-slate-800">
              {logs.map(log => (
                <div key={log.id} className="leading-relaxed break-words">
                  <span className="text-sky font-semibold">[{log.time}]</span>{' '}
                  <span className={`${
                    log.type === 'danger' ? 'text-red-400 font-bold' :
                    log.type === 'warning' ? 'text-amber-400 font-bold' :
                    'text-leaf-dark'
                  }`}>
                    {log.type.toUpperCase()}
                  </span>:{' '}
                  <span className="text-gray-300">{log.message}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
