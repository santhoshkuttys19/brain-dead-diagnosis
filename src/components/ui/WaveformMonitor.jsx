import React, { useEffect, useRef } from 'react';

export default function WaveformMonitor({ type, color, rate, label, value, height = 60, isApnea = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let t = 0;
    
    // Waveform history buffer
    const bufferSize = 400; // pixels width
    const history = new Array(bufferSize).fill(0);

    const draw = () => {
      // Resize canvas to parent width
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = height;

      // Update time
      t += 0.015; // Speed of time
      
      // Calculate cycle
      // If apnea, respiratory rate goes to 0 (effectively stopping vent/etco2 waves)
      const effectiveRate = isApnea && (type === 'vent' || type === 'etco2') ? 0.1 : rate;
      const cycleDuration = effectiveRate > 0 ? 60 / effectiveRate : 1000;
      const p = (t % cycleDuration) / cycleDuration;
      
      let y = 0;

      if (type === 'ecg') {
        // Simulated ECG (QRS complex + P + T waves)
        if (p > 0.0 && p < 0.05) y = Math.sin((p / 0.05) * Math.PI) * 0.1; // P wave
        else if (p > 0.1 && p < 0.12) y = -0.15; // Q
        else if (p >= 0.12 && p < 0.15) y = 1.0; // R
        else if (p >= 0.15 && p < 0.18) y = -0.25; // S
        else if (p > 0.25 && p < 0.4) y = Math.sin(((p - 0.25) / 0.15) * Math.PI) * 0.2; // T wave
        else y = 0; // Isoelectric line
        
        // Add slight noise
        y += (Math.random() - 0.5) * 0.02;
      } 
      else if (type === 'spo2') {
        // Plethysmograph (SpO2)
        if (p < 0.2) y = p / 0.2; // Steep systolic rise
        else if (p >= 0.2 && p < 0.4) y = 1.0 - ((p - 0.2) / 0.2) * 0.4; // Systolic decline
        else if (p >= 0.4 && p < 0.5) y = 0.6 + Math.sin(((p - 0.4) / 0.1) * Math.PI) * 0.1; // Dicrotic notch
        else y = 0.6 - ((p - 0.5) / 0.5) * 0.6; // Diastolic runoff
      }
      else if (type === 'etco2') {
        if (isApnea) {
          y = 0; // Flatline during apnea
        } else {
          // Capnogram (Square wave)
          if (p < 0.3) y = 0.05; // Inspiration (baseline)
          else if (p >= 0.3 && p < 0.4) y = ((p - 0.3) / 0.1) * 0.8; // Expiratory upstroke
          else if (p >= 0.4 && p < 0.8) y = 0.8 + ((p - 0.4) / 0.4) * 0.1; // Alveolar plateau
          else if (p >= 0.8 && p < 0.9) y = 0.9 - ((p - 0.8) / 0.1) * 0.85; // Inspiration downslope
          else y = 0.05;
        }
      }
      else if (type === 'vent') {
        if (isApnea) {
          y = 0;
        } else {
          // Ventilator Pressure (Volume Control - triangular/trapezoid)
          if (p < 0.2) y = p / 0.2; // Inspiratory rise
          else if (p >= 0.2 && p < 0.3) y = 1.0; // Inspiratory pause
          else if (p >= 0.3 && p < 0.5) y = 1.0 - ((p - 0.3) / 0.2); // Expiratory fall
          else y = 0.1; // PEEP
        }
      }

      // Shift history and push new point
      history.push(y);
      history.shift();

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw waveform
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.lineJoin = 'round';

      const xStep = canvas.width / bufferSize;
      const centerY = canvas.height / 2;
      const amplitude = height * 0.4; // Scale wave to fit canvas

      for (let i = 0; i < bufferSize; i++) {
        // Reverse draw from right to left so latest is on right
        const x = i * xStep;
        
        // To create the "sweeping" monitor effect, we could erase a segment,
        // but for simplicity, we just scroll it leftwards.
        const val = history[i];
        
        let py = centerY;
        if (type === 'ecg') py = canvas.height - (val + 0.5) * amplitude * 1.5;
        else if (type === 'spo2') py = canvas.height - (val * amplitude * 2) - 10;
        else if (type === 'etco2') py = canvas.height - (val * amplitude * 2) - 10;
        else if (type === 'vent') py = canvas.height - (val * amplitude * 2) - 10;

        if (i === 0) ctx.moveTo(x, py);
        else ctx.lineTo(x, py);
      }

      ctx.stroke();

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [type, color, rate, height, isApnea]);

  return (
    <div className="flex w-full items-center border-b border-slate-700/50 py-1 overflow-hidden">
      <div className="flex-1 relative h-full flex items-center pr-4">
        {/* Label */}
        <div className="absolute top-1 left-2 text-xs font-bold tracking-wider z-10" style={{ color }}>
          {label}
        </div>
        <canvas ref={canvasRef} className="w-full h-full opacity-80" />
      </div>
      
      {/* Live Value Readout */}
      <div className="w-20 flex flex-col items-end justify-center pr-4 border-l border-slate-700/30">
        <span className="text-3xl font-mono font-bold leading-none" style={{ color }}>
          {value}
        </span>
      </div>
    </div>
  );
}
