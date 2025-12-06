import React, { useState } from 'react';
import { 
  Terminal, 
  Play, 
  Cpu, 
  Zap, 
  Server, 
  Wallet, 
  Download, 
  ExternalLink, 
  Smartphone, 
  Code, 
  Shield, 
  Wifi, 
  MapPin, 
  Pickaxe, 
  Copy, 
  CheckCircle,
  AlertTriangle,
  Search,
  Menu,
  X,
  Palette,
  Database
} from 'lucide-react';

// --- Types & Enums ---

enum ExtendedTabView {
  APPS = 'APPS',
  XMRIG = 'XMRIG',
  WONG_FI = 'WONG_FI',
  VERUS = 'VERUS',
  RAINBOW = 'RAINBOW',
  ALGO = 'ALGO'
}

interface Pool {
  id: string;
  name: string;
  url: string;
  port: string;
  isCustom?: boolean;
}

interface DeploymentStep {
  id: number;
  description: string;
  command: string;
}

interface MiningApp {
  name: string;
  description: string;
  url: string;
  icon: React.ElementType;
  type: 'MINER' | 'TOOL';
  label: string;
}

// --- Data ---

const POOLS: Pool[] = [
  { id: 'moneroocean', name: 'MoneroOcean', url: 'gulf.moneroocean.stream', port: '10128' },
  { id: '2miners-xmr', name: '2Miners (XMR)', url: 'xmr.2miners.com', port: '2222' },
  { id: 'c3pool', name: 'C3Pool', url: 'mine.c3pool.com', port: '13333' },
  { id: 'herominers', name: 'HeroMiners', url: 'monero.herominers.com', port: '1111' },
  { id: 'supportxmr', name: 'SupportXMR', url: 'pool.supportxmr.com', port: '443' },
  { id: 'nanopool', name: 'Nanopool', url: 'xmr-eu1.nanopool.org', port: '14444' },
  { id: 'hashcity', name: 'HashCity', url: 'xmr.hashcity.org', port: '4444' },
  { id: 'zergpool', name: 'Zergpool', url: 'randomx.mine.zergpool.com', port: '3300' },
  { id: 'zpool-xmr', name: 'Zpool (RandomX)', url: 'randomx.mine.zpool.ca', port: '6256' },
  { id: 'zpool-verus', name: 'Zpool (Verus)', url: 'verushash.mine.zpool.ca', port: '6143' },
  { id: 'custom', name: 'Custom / Manual Input', url: 'pool.example.com', port: '3333', isCustom: true },
];

const ALGO_DB = [
  { name: 'allium', supported: true }, { name: 'axiom', supported: true }, { name: 'bastion', supported: true },
  { name: 'bitcore', supported: true }, { name: 'blake', supported: true }, { name: 'blake2b', supported: true },
  { name: 'blake2s', supported: true }, { name: 'bmw', supported: true }, { name: 'bmw512', supported: true },
  { name: 'cpupower', supported: true }, { name: 'cryptonight', supported: true }, { name: 'cryptonight-light', supported: true },
  { name: 'curve', supported: true }, { name: 'decred', supported: true }, { name: 'dedal', supported: true },
  { name: 'dmd-gr', supported: true }, { name: 'fresh', supported: true }, { name: 'geek', supported: true },
  { name: 'groestl', supported: true }, { name: 'jha', supported: true }, { name: 'lbry', supported: true },
  { name: 'lyra2RE', supported: true }, { name: 'lyra2REv2', supported: true }, { name: 'lyra2REv3', supported: true },
  { name: 'megabtx', supported: true }, { name: 'meme', supported: true }, { name: 'minotaur', supported: true },
  { name: 'minotaurx', supported: true }, { name: 'myr-gr', supported: true }, { name: 'neoscrypt', supported: true },
  { name: 'nist5', supported: true }, { name: 'pentablake', supported: true }, { name: 'pluck', supported: true },
  { name: 'power2b', supported: true }, { name: 'quark', supported: true }, { name: 'qubit', supported: true },
  { name: 's3', supported: true }, { name: 'scrypt', supported: true }, { name: 'scrypt:N', supported: true },
  { name: 'scryptjane:N', supported: true }, { name: 'scryptn2', supported: true }, { name: 'scryptn11', supported: true },
  { name: 'sha256d', supported: true }, { name: 'sia', supported: true }, { name: 'sib', supported: true },
  { name: 'skein', supported: true }, { name: 'skein2', supported: true }, { name: 'timetravel', supported: true },
  { name: 'tribus', supported: true }, { name: 'vanilla', supported: true }, { name: 'velvet', supported: true },
  { name: 'veltor', supported: true }, { name: 'x11', supported: true }, { name: 'x11evo', supported: true },
  { name: 'x12', supported: true }, { name: 'x13', supported: true }, { name: 'x14', supported: true },
  { name: 'x15', supported: true }, { name: 'x16r', supported: true }, { name: 'x16rv2', supported: true },
  { name: 'x16s', supported: true }, { name: 'x17', supported: true }, { name: 'x20r', supported: true },
  { name: 'xelisv2', supported: true }, { name: 'xevan', supported: true }, { name: 'yescrypt', supported: true },
  { name: 'yescryptR16', supported: true }, { name: 'yescryptR32', supported: true }, { name: 'yescryptR8', supported: true },
  { name: 'yespower', supported: true }, { name: 'yespowerIC', supported: true }, { name: 'yespowerIOTS', supported: true },
  { name: 'yespowerITC', supported: true }, { name: 'yespowerLITB', supported: true }, { name: 'yespowerMGPC', supported: true },
  { name: 'yespowerR16', supported: true }, { name: 'yespowerSUGAR', supported: true }, { name: 'yespowerTIDE', supported: true },
  { name: 'yespowerURX', supported: true }, { name: '0x10', supported: true }, { name: 'zr5', supported: true },
  { name: 'hefty1', supported: false }, { name: 'keccak', supported: false }, { name: 'keccakc', supported: false },
  { name: 'luffa', supported: false }, { name: 'rainforest', supported: false }, { name: 'shavite3', supported: false }
];

const MINING_APPS_LIST: MiningApp[] = [
  {
    name: 'UserLAnd',
    description: 'Run Ubuntu/Linux on Android without root. Required for most miners.',
    url: 'https://play.google.com/store/apps/details?id=tech.ula&hl=en_US',
    icon: Smartphone,
    type: 'TOOL',
    label: 'PLAY STORE'
  },
  {
    name: 'XMRig for Android',
    description: 'High performance Monero miner. Version 0.1.3.',
    url: 'https://github.com/XMRig-for-Android/xmrig-for-android/releases/tag/0.1.3',
    icon: Cpu,
    type: 'MINER',
    label: 'DIRECT APK'
  },
  {
    name: 'Tidecoin Miner',
    description: 'Dedicated miner for Tidecoin. Version 1.0.0.',
    url: 'https://github.com/tidecoin/tidecoin-android-miner/releases/tag/1.0.0',
    icon: Pickaxe,
    type: 'MINER',
    label: 'DIRECT APK'
  },
  {
    name: 'Verus Miner',
    description: 'Official Verus Miner. v5.0.0 ARM64.',
    url: 'https://github.com/pangz-lab/verus_miner-release/raw/main/v5.0.0/v5.0.0_3.8.3+7%5Bgen%5D/app.apk',
    icon: Cpu,
    type: 'MINER',
    label: 'DIRECT APK'
  },
  {
    name: 'Nodle',
    description: 'Earn crypto with your smartphone Bluetooth.',
    url: 'https://play.google.com/store/apps/details?id=io.nodle.cash&hl=en-US',
    icon: Wifi,
    type: 'MINER',
    label: 'PLAY STORE'
  },
  {
    name: 'XYO Coin',
    description: 'Geomining app for collecting digital assets.',
    url: 'https://play.google.com/store/apps/details?id=network.xyo.coin&hl=en-US',
    icon: MapPin,
    type: 'MINER',
    label: 'PLAY STORE'
  },
  {
    name: 'Sallar',
    description: 'Privacy and networking utility.',
    url: 'https://sallar.app',
    icon: Shield,
    type: 'TOOL',
    label: 'OFFICIAL SITE'
  },
  {
    name: 'Komodo Wallet',
    description: 'Secure multi-coin wallet and DEX.',
    url: 'https://komodoplatform.com/en/downloads/',
    icon: Wallet,
    type: 'TOOL',
    label: 'OFFICIAL SITE'
  }
];

const XMRIG_STEPS: DeploymentStep[] = [
  { id: 1, description: 'Update packages & install Git (UserLAnd)', command: 'sudo apt update && sudo apt install git -y' },
  { id: 2, description: 'Install Dependencies', command: 'sudo apt install -y build-essential cmake libuv1-dev libssl-dev libhwloc-dev' },
  { id: 3, description: 'Clone XMRig', command: 'cd ~ && git clone https://github.com/xmrig/xmrig' },
  { id: 4, description: 'Create Build Directory', command: 'cd xmrig && mkdir build && cd build' },
  { id: 5, description: 'Configure Build', command: 'cmake .. -DWITH_HWLOC=OFF' },
  { id: 6, description: 'Compile (This takes time)', command: 'make -j$(nproc)' },
  { id: 7, description: 'Start Miner', command: './xmrig' },
];

const WONG_FI_STEPS: DeploymentStep[] = [
  { id: 1, description: 'Update package list', command: 'sudo apt update' },
  { id: 2, description: 'Upgrade system packages', command: 'sudo apt upgrade -y' },
  { id: 3, description: 'Install Dependencies', command: 'sudo apt install -y build-essential automake autoconf libcurl4-openssl-dev libjansson-dev libssl-dev libgmp-dev make git' },
  { id: 4, description: 'Clone Termux-Miner', command: 'git clone https://github.com/wong-fi-hung/termux-miner' },
  { id: 5, description: 'Enter Directory', command: 'cd termux-miner' },
  { id: 6, description: 'Run Build Script', command: './build.sh' },
  { id: 7, description: 'Configure & Make', command: './configure CFLAGS="-O3" LIBS="-lssl -lcrypto -lcurl" && make -j$(nproc)' },
  { id: 8, description: 'Test Run (ex : Minotaurx Algo)', command: './cpuminer -a xelisv2-pepew -o stratum+tcp://xelisv2-pepew.na.mine.zergpool.com:5778 -u dgb1q2v35jgkcu6c46pq3kqkvqyf3l75lqyffurfn8z -p c=DGB,mc=PEPEW -t 8' },
];

const VERUS_STEPS: DeploymentStep[] = [
  { id: 1, description: 'Update & Install Tools', command: 'sudo apt update && sudo apt install curl nano -y' },
  { id: 2, description: 'Install Verus Miner (RetroMike)', command: 'curl -o- -k https://raw.githubusercontent.com/TheRetroMike/VerusCliMining/main/install.sh | bash' },
  { id: 3, description: 'Edit Config (CTRL-X, Y, ENTER to save)', command: 'nano ~/ccminer/config.json' },
  { id: 4, description: 'Start Miner', command: '~/ccminer/start.sh' },
];

const RAINBOW_STEPS: DeploymentStep[] = [
  { id: 1, description: 'Update System', command: 'sudo apt update -y' },
  { id: 2, description: 'Install Git', command: 'sudo apt install git -y' },
  { id: 3, description: 'Clone Repository', command: 'git clone https://github.com/RainbowMiner/RainbowMiner' },
  { id: 4, description: 'Enter Directory', command: 'cd RainbowMiner' },
  { id: 5, description: 'Set Permissions', command: 'sudo chmod +x *.sh' },
  { id: 6, description: 'Run Installer', command: './install.sh' },
  { id: 7, description: 'Install Powershell Scripts', command: 'sudo pwsh ./Scripts/Install.ps1' },
  { id: 8, description: 'Start Rainbow Miner', command: './start.sh' },
];

// --- Main Component ---

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ExtendedTabView>(ExtendedTabView.APPS);
  const [selectedPool] = useState<Pool>(POOLS[0]);
  const [wallet] = useState<string>('');
  const [searchAlgo, setSearchAlgo] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const openUserLand = () => {
    window.location.href = 'intent://#Intent;package=tech.ula;scheme=package;end;';
  };

  const getDynamicCommand = (baseCommand: string, type: 'xmrig' | 'wong' | 'verus' | 'rainbow') => {
    if (type === 'wong') return baseCommand; // Static override per user request
    if (type === 'verus') return baseCommand; // Static override for manual steps
    if (type === 'rainbow') return baseCommand; // Static override per user request

    const poolUrl = selectedPool.isCustom ? selectedPool.url : `stratum+tcp://${selectedPool.url}:${selectedPool.port}`;
    const userWallet = wallet || "YOUR_WALLET_ADDRESS";
    const isZpool = selectedPool.id.includes('zpool');
    const passArg = isZpool ? "c=BTC" : "x";

    if (type === 'xmrig') {
      return `cd ~/xmrig/build && ./xmrig -o ${selectedPool.url}:${selectedPool.port} -u ${userWallet} -p ${passArg} -k --coin monero`;
    }

    return baseCommand;
  };

  const renderDeployTab = (steps: DeploymentStep[], type: 'xmrig' | 'wong' | 'verus' | 'rainbow') => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-orange-900/10 border border-orange-500/20 p-4 rounded-xl backdrop-blur-sm">
        <h3 className="text-orange-400 font-bold mb-2 flex items-center gap-2">
          <Terminal size={18} />
          {type === 'wong' ? 'On a spare phone or just exploring Crypto, this guide will walk you through everything you need to get started.' : 'Deployment Commands'}
        </h3>
        <p className="text-sm text-neutral-400">
          Copy and paste these commands into your <strong>UserLAnd Ubuntu</strong> terminal one by one.
        </p>
      </div>

      <div className="space-y-4">
        {steps.map((step) => {
          const isStartStep = step.id === steps.length && (type === 'xmrig');
          const displayCommand = isStartStep ? getDynamicCommand(step.command, type) : step.command;
          
          return (
            <div key={step.id} className="group relative bg-black/60 border border-orange-500/20 rounded-xl overflow-hidden hover:border-orange-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(249,115,22,0.15)]">
              <div className="px-4 py-2 bg-white/5 border-b border-white/5 flex justify-between items-center">
                <span className="text-xs font-bold text-orange-500 uppercase tracking-wider">Step {step.id}</span>
                <span className="text-xs text-neutral-400">{step.description}</span>
              </div>
              <div className="p-4 flex items-center justify-between gap-4">
                <code className="flex-1 font-mono text-sm text-white break-all">
                  {displayCommand}
                </code>
                <button
                  onClick={() => handleCopy(displayCommand, `${type}-${step.id}`)}
                  className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all shadow-[0_0_10px_rgba(249,115,22,0.2)] ${
                    copiedId === `${type}-${step.id}`
                      ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                      : 'bg-orange-500 text-black hover:bg-orange-400 border border-orange-500'
                  }`}
                >
                  {copiedId === `${type}-${step.id}` ? <CheckCircle size={16} /> : <Copy size={16} />}
                  <span>{copiedId === `${type}-${step.id}` ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen text-neutral-200 font-sans selection:bg-orange-500/30 pb-20 md:pb-0">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-orange-500/20 px-4 py-3 flex justify-between items-center">
        <h1 className="text-lg font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
          ANDROID KRYPTO 101
        </h1>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-orange-500">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/95 pt-20 px-6 space-y-4">
          {Object.values(ExtendedTabView).map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setIsMobileMenuOpen(false); }}
              className={`w-full text-left py-3 border-b border-white/10 ${activeTab === tab ? 'text-orange-500' : 'text-neutral-400'}`}
            >
              {tab.replace('_', ' ')}
            </button>
          ))}
        </div>
      )}

      <div className="flex h-screen pt-16 md:pt-0">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex w-64 flex-col bg-black/40 border-r border-orange-500/20 backdrop-blur-sm fixed h-full z-10">
          <div className="p-6 border-b border-orange-500/20">
            <h1 className="text-2xl font-black italic tracking-tighter bg-gradient-to-r from-orange-500 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]">
              ANDROID<br/>KRYPTO 101
            </h1>
            <div className="mt-2 text-xs text-orange-500/60 font-mono">v3.0.1 // CYBER_EDITION</div>
          </div>
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {[
              { id: ExtendedTabView.APPS, label: 'MINING APPS', icon: Download },
              { id: ExtendedTabView.XMRIG, label: 'XMRIG (UBUNTU)', icon: Cpu },
              { id: ExtendedTabView.WONG_FI, label: 'WONG FI', icon: Zap },
              { id: ExtendedTabView.VERUS, label: 'VERUS CLI', icon: Terminal },
              { id: ExtendedTabView.RAINBOW, label: 'RAINBOW MINER', icon: Palette },
              { id: ExtendedTabView.ALGO, label: 'ALGORITHMS', icon: Database },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === item.id 
                    ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40 shadow-[0_0_15px_rgba(249,115,22,0.2)]' 
                    : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/5'
                }`}
              >
                <item.icon size={18} />
                <span className="font-bold tracking-wide">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto custom-scrollbar">
          
          {/* UserLAnd Setup Guide Banner */}
          <div className="mb-8 rounded-2xl bg-gradient-to-r from-blue-900/40 to-blue-800/20 border border-blue-500/30 p-6 relative overflow-hidden group">
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold text-blue-400 mb-2 flex items-center gap-2">
                  <Smartphone className="animate-pulse" />
                  Setup Guide: UserLAnd
                </h2>
                <div className="text-sm text-blue-200/80 space-y-1">
                  <p>1. <span className="text-white font-bold">Download App</span> from Play Store (link below).</p>
                  <p>2. Select <span className="text-white font-bold">Ubuntu</span> from the distribution list.</p>
                  <p>3. Enter a generic username/password when prompted.</p>
                  <p>4. Once the terminal connects <strong>(green text)</strong>, you are ready to use the commands below.</p>
                </div>
              </div>
              <button 
                onClick={openUserLand}
                className="shrink-0 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] flex items-center gap-2"
              >
                <ExternalLink size={18} />
                GET USERLAND
              </button>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          </div>

          {/* Tab Content */}
          <div className="pb-20">
            {activeTab === ExtendedTabView.APPS && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {MINING_APPS_LIST.map((app, idx) => (
                  <div key={idx} className="group relative bg-neutral-900/60 border border-white/10 p-6 rounded-2xl backdrop-blur-sm hover:border-orange-500/50 transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-3 rounded-xl ${app.type === 'MINER' ? 'bg-orange-500/20 text-orange-500' : 'bg-blue-500/20 text-blue-500'}`}>
                        <app.icon size={24} />
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded border ${app.type === 'MINER' ? 'border-orange-500/30 text-orange-400' : 'border-blue-500/30 text-blue-400'}`}>
                        {app.label}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-orange-400 transition-colors">{app.name}</h3>
                    <p className="text-sm text-neutral-400 mb-6 min-h-[40px]">{app.description}</p>
                    <a 
                      href={app.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block w-full text-center py-3 rounded-xl bg-white/5 hover:bg-orange-500 hover:text-black font-bold transition-all"
                    >
                      DOWNLOAD
                    </a>
                  </div>
                ))}
              </div>
            )}

            {activeTab === ExtendedTabView.XMRIG && renderDeployTab(XMRIG_STEPS, 'xmrig')}
            {activeTab === ExtendedTabView.WONG_FI && renderDeployTab(WONG_FI_STEPS, 'wong')}
            {activeTab === ExtendedTabView.VERUS && renderDeployTab(VERUS_STEPS, 'verus')}
            {activeTab === ExtendedTabView.RAINBOW && renderDeployTab(RAINBOW_STEPS, 'rainbow')}

            {activeTab === ExtendedTabView.ALGO && (
              <div className="space-y-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input 
                    type="text" 
                    placeholder="Search algorithm..."
                    value={searchAlgo}
                    onChange={(e) => setSearchAlgo(e.target.value)}
                    className="w-full bg-neutral-900/60 border border-orange-500/20 rounded-xl pl-12 pr-4 py-4 text-white focus:border-orange-500 focus:shadow-[0_0_15px_rgba(249,115,22,0.2)] outline-none backdrop-blur-sm"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {ALGO_DB.filter(a => a.name.toLowerCase().includes(searchAlgo.toLowerCase())).map((algo, idx) => (
                    <div key={idx} className={`p-4 rounded-xl border flex items-center justify-between ${algo.supported ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                      <span className="font-mono text-sm font-bold text-neutral-300">{algo.name}</span>
                      {algo.supported ? (
                        <span className="text-[10px] font-bold text-green-500 flex items-center gap-1"><CheckCircle size={10} /> SUPPORTED</span>
                      ) : (
                        <span className="text-[10px] font-bold text-red-500 flex items-center gap-1"><AlertTriangle size={10} /> UNTESTED</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;