import React, { useState } from 'react';
import { ArrowLeft, Zap, Lock, Code, Cpu, Layers, Fingerprint, Download, Copy, RefreshCw } from 'lucide-react';
import { ObfuscationOptions } from '../types';

interface ObfuscatorProps {
  onBack: () => void;
}

const Obfuscator: React.FC<ObfuscatorProps> = ({ onBack }) => {
  const [inputScript, setInputScript] = useState("-- Place your script here\nprint('Hello World')");
  const [outputScript, setOutputScript] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const [options, setOptions] = useState<ObfuscationOptions>({
    vmEncryption: true,
    stringEncryption: true,
    controlFlowFlattening: true,
    memes: false
  });

  const toggleOption = (key: keyof ObfuscationOptions) => {
    setOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleObfuscate = async () => {
    setIsLoading(true);
    setOutputScript(""); // Clear previous output

    try {
      const response = await fetch('/api/obfuscate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          script: inputScript,
          config: options
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Obfuscation failed');
      }

      // Simulate a slight "hacking" delay for effect if the API is too fast
      setTimeout(() => {
        setOutputScript(data.result);
        setIsLoading(false);
      }, 800);

    } catch (error) {
      console.error(error);
      setOutputScript("-- Error: Failed to obfuscate script.\n-- Please try again.");
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (outputScript) {
      navigator.clipboard.writeText(outputScript);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-300 font-sans p-6 animate-in fade-in slide-in-from-bottom-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-white"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-amber-500 font-mono">IronBrew</span>
              <span className="text-zinc-600">/</span>
              <span>Obfuscator</span>
            </h1>
            <p className="text-xs text-zinc-500 font-mono mt-1">LUA VIRTUALIZATION ENGINE v2.0</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-amber-500/80 bg-amber-950/20 px-4 py-2 rounded-full border border-amber-900/30 text-xs font-bold tracking-wider">
          <Zap size={14} className="fill-current" />
          FAST MODE ACTIVE
        </div>
      </div>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Input & Settings */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Input Editor */}
          <div className="bg-[#121215] border border-zinc-800 rounded-xl p-4 flex flex-col gap-2 shadow-xl h-[400px]">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-500 uppercase tracking-wider pb-2 border-b border-zinc-800/50">
              <span className="flex items-center gap-2"><Code size={14} /> Source Code</span>
              <span>LUA</span>
            </div>
            <textarea
              value={inputScript}
              onChange={(e) => setInputScript(e.target.value)}
              className="flex-grow bg-transparent resize-none focus:outline-none font-mono text-sm text-zinc-300 placeholder-zinc-700 custom-scrollbar"
              spellCheck={false}
              placeholder="Paste your script here..."
            />
          </div>

          {/* Settings Panel */}
          <div className="bg-[#121215] border border-zinc-800 rounded-xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
            
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
              <Layers size={16} className="text-amber-500" />
              Obfuscation Settings
            </h3>
            
            <div className="grid grid-cols-1 gap-3">
              <label className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900/50 border border-zinc-800 cursor-pointer hover:border-amber-900/50 transition-all group">
                <input 
                  type="checkbox" 
                  checked={options.vmEncryption}
                  onChange={() => toggleOption('vmEncryption')}
                  className="w-4 h-4 rounded border-zinc-700 text-amber-600 focus:ring-amber-500/20 bg-zinc-800"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">Virtual Machine</span>
                  <span className="text-[10px] text-zinc-600">Wrap code in IronBrew VM</span>
                </div>
                <Cpu size={16} className="ml-auto text-zinc-700 group-hover:text-amber-500 transition-colors" />
              </label>

              <label className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900/50 border border-zinc-800 cursor-pointer hover:border-amber-900/50 transition-all group">
                <input 
                  type="checkbox" 
                  checked={options.controlFlowFlattening}
                  onChange={() => toggleOption('controlFlowFlattening')}
                  className="w-4 h-4 rounded border-zinc-700 text-amber-600 focus:ring-amber-500/20 bg-zinc-800"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">Control Flow Flattening</span>
                  <span className="text-[10px] text-zinc-600">Mangle execution order</span>
                </div>
                <Layers size={16} className="ml-auto text-zinc-700 group-hover:text-amber-500 transition-colors" />
              </label>

              <label className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900/50 border border-zinc-800 cursor-pointer hover:border-amber-900/50 transition-all group">
                <input 
                  type="checkbox" 
                  checked={options.stringEncryption}
                  onChange={() => toggleOption('stringEncryption')}
                  className="w-4 h-4 rounded border-zinc-700 text-amber-600 focus:ring-amber-500/20 bg-zinc-800"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">String Encryption</span>
                  <span className="text-[10px] text-zinc-600">Encrypt all strings</span>
                </div>
                <Fingerprint size={16} className="ml-auto text-zinc-700 group-hover:text-amber-500 transition-colors" />
              </label>
            </div>

            <button 
              onClick={handleObfuscate}
              disabled={isLoading}
              className="w-full mt-6 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-black font-bold py-3 rounded-lg transition-all shadow-lg shadow-amber-900/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <RefreshCw size={18} className="animate-spin" />
              ) : (
                <Lock size={18} />
              )}
              {isLoading ? "PROCESSING..." : "OBFUSCATE SCRIPT"}
            </button>
          </div>
        </div>

        {/* Right Column: Output */}
        <div className="lg:col-span-7">
          <div className="bg-[#121215] border border-zinc-800 rounded-xl flex flex-col h-full min-h-[600px] shadow-2xl relative overflow-hidden">
             {/* Toolbar */}
             <div className="bg-[#18181b] border-b border-zinc-800 p-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  OUTPUT.LUA
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={copyToClipboard}
                    disabled={!outputScript}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors disabled:opacity-30"
                  >
                    <Copy size={14} />
                    Copy
                  </button>
                  <button 
                    disabled={!outputScript}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-amber-600/10 text-amber-500 hover:bg-amber-600/20 rounded-md transition-colors disabled:opacity-30"
                  >
                    <Download size={14} />
                    Download
                  </button>
                </div>
             </div>
             
             {/* Output Area */}
             <div className="relative flex-grow bg-[#0c0c0e]">
                {isLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/50 backdrop-blur-sm">
                     <div className="font-mono text-amber-500 text-lg animate-pulse">
                        &gt; COMPILING BYTECODE_
                     </div>
                     <div className="mt-2 w-48 h-1 bg-zinc-800 rounded overflow-hidden">
                        <div className="h-full bg-amber-500 animate-[progress_1s_ease-in-out_infinite]"></div>
                     </div>
                  </div>
                )}
                
                <textarea
                  value={outputScript}
                  readOnly
                  className="w-full h-full bg-transparent p-4 font-mono text-xs text-amber-100/80 focus:outline-none resize-none leading-relaxed"
                  placeholder="-- Obfuscated output will appear here..."
                />
             </div>
          </div>
        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #3f3f46;
          border-radius: 3px;
        }
        @keyframes progress {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default Obfuscator;