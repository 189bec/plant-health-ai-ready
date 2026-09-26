import React from 'react';
import { Leaf, Zap, Cpu, Wifi, Server, MonitorSmartphone, Camera, Box, ScanLine, Radio, FileText, CheckCircle2 } from 'lucide-react';

const ArchitectureNode = ({ icon: Icon, label, sublabel, color }) => (
  <div className="flex flex-col items-center gap-2">
    <div className={`p-3 rounded-xl shadow-sm border ${color} bg-white z-10 relative`}>
      <Icon size={24} className="opacity-80" />
    </div>
    <div className="text-center">
      <p className="text-sm font-bold text-gray-800">{label}</p>
      {sublabel && <p className="text-xs text-gray-500">{sublabel}</p>}
    </div>
  </div>
);

const SystemArchitecture = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-terracotta-100 space-y-8">
      
      {/* Lit Survey & Core Value Proposition */}
      <div>
        <h2 className="text-xl font-bold text-terracotta-900 mb-4 flex items-center gap-2">
           <FileText className="text-terracotta-600"/> Literature Survey & Novelty
        </h2>
        <div className="bg-cream-50 p-4 rounded-xl text-sm text-gray-700 leading-relaxed border border-cream-200">
           <p className="mb-2"><strong>The Gap:</strong> Existing systems are either sensor+LoRa+cloud dashboards (strong on monitoring, weak on decision-making) or camera+edge-AI (strong on vision, isolated from field sensors). Almost none combine both while staying fully offline.</p>
           <p><strong>Our Novelty:</strong> We fuse <strong>"sensing"</strong> and <strong>"seeing"</strong>. ByteBenders merges bioelectric plant potential sensing via Graphite electrodes with YOLO-based Edge-AI vision into a single edge-autonomous, two-way, battery-deployable LoRa system. We turn one plant into its own before-and-after comparison, catching water stress <strong>2 to 4 days</strong> before it is visibly apparent.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Physics of LoRa */}
        <div>
          <h3 className="text-md font-bold text-terracotta-800 mb-3 flex items-center gap-2">
            <Radio size={18} className="text-terracotta-600"/> LoRa Chirp Physics
          </h3>
          <div className="bg-sage-50 p-4 rounded-xl text-xs text-sage-900 border border-sage-200 space-y-2">
            <p><strong>Chirp Equation:</strong> <code className="bg-white px-1 py-0.5 rounded">f(t) = f_0 + (B/T)t</code></p>
            <p>Frequency is the derivative of phase, creating a linearly increasing frequency with a quadratically growing phase in time (Linear FM chirp).</p>
            <p><strong>Processing Gain:</strong> Spreading energy over bandwidth <strong>B</strong> and time <strong>T</strong> yields a processing gain of <code>G_p = 10 log10(2^SF) dB</code>. With SF=12, we achieve ~36 dB gain, allowing signal recovery 4,000x weaker than the noise floor.</p>
            <p><strong>Dechirping:</strong> The receiver multiplies the incoming signal by a complex conjugate reference down-chirp, collapsing it into a sharp FFT spike to decode the symbol.</p>
          </div>
        </div>
        
        {/* Bioelectric Electrodes */}
        <div>
           <h3 className="text-md font-bold text-terracotta-800 mb-3 flex items-center gap-2">
            <Zap size={18} className="text-terracotta-600"/> Bioelectric Sensing
          </h3>
          <div className="bg-sage-50 p-4 rounded-xl text-xs text-sage-900 border border-sage-200 space-y-2">
            <p><strong>Electrode Material:</strong> We utilized <strong>Graphite/Carbon rods</strong>. They are highly conductive, safe for plant tissue, and perfectly suited for robust field deployments without the phytotoxic leaching risks of copper.</p>
            <p><strong>Signal Acquisition:</strong> Plants generate micro-to-milliVolt potentials. Baseline drift is normalized via instrumentation amps (e.g. INA333) and digital high-pass filtering.</p>
            <p><strong>Causation Proof:</strong> By charting baseline drift in the <strong>same plant</strong> over 5 days of withheld water, we rule out subject-variance. The single-plant before/after approach proves the hardware works reliably.</p>
          </div>
        </div>
      </div>

      {/* Architecture Diagram */}
      <div className="pt-6 border-t border-terracotta-100">
        <h2 className="text-md font-bold text-terracotta-900 mb-6 text-center">Data Fusion Architecture</h2>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 relative">
          <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-terracotta-200 -z-0"></div>

          <div className="flex flex-col items-center gap-6 md:gap-0 w-full md:flex-row justify-between relative max-w-4xl mx-auto">
            
            <ArchitectureNode icon={Leaf} label="Plant Leaf" sublabel="Graphite Electrodes" color="border-sage-300 text-sage-600" />
            <ArchitectureNode icon={Zap} label="ESP32/MCU" sublabel="ADC & Filtering" color="border-terracotta-300 text-terracotta-600" />
            <ArchitectureNode icon={Radio} label="LoRa Transmitter" sublabel="Linear FM Chirp" color="border-indigo-200 text-indigo-600" />
            <ArchitectureNode icon={Server} label="LoRa Gateway" sublabel="Dechirp & FFT" color="border-blue-200 text-blue-600" />
            <ArchitectureNode icon={Box} label="Fusion Engine" sublabel="Edge AI (YOLO)" color="border-red-200 text-red-600" />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemArchitecture;
