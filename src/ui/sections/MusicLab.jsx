import { useEffect, useRef, useState } from "react";
import { Mic, Upload, Power, ChevronDown } from "lucide-react";

export default function MusicLab() {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [ac, setAc] = useState(null);
  const analyserRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [sustain, setSustain] = useState(false);
  const [voice, setVoice] = useState("piano");
  const [pianoOn, setPianoOn] = useState(false); 

  // Init AudioContext and canvas
  useEffect(() => {
    const c = canvasRef.current;
    setCtx(c.getContext("2d", { alpha: true }));
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioCtx();
    setAc(audioCtx);

    const resize = () => {
      c.width = c.clientWidth;
      c.height = 320;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const unlockAudio = () => {
    if (ac && ac.state === "suspended") ac.resume();
  };

  const stopAll = () => {
    if (stream) stream.getTracks().forEach((t) => t.stop());
    setStream(null);
  };


  // Audio animation 
  const draw = () => {
    const canvas = canvasRef.current;
    const a = analyserRef.current;
    if (!a || !ctx) return;

    const data = new Uint8Array(a.frequencyBinCount);
    a.getByteFrequencyData(data);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const bars = Math.floor(canvas.width / 6);
    const step = Math.floor(data.length / bars);

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#ff595e");
    gradient.addColorStop(0.17, "#ffca3a");
    gradient.addColorStop(0.33, "#8ac926");
    gradient.addColorStop(0.5, "#1982c4");
    gradient.addColorStop(0.67, "#6a4c93");
    gradient.addColorStop(0.83, "#b88cff");
    gradient.addColorStop(1, "#ff6ec7");
    ctx.fillStyle = gradient;

    for (let i = 0; i < bars; i++) {
      const v = data[i * step] / 255;
      const h = v * (canvas.height * 0.9);
      const x = (i / bars) * canvas.width;
      const w = (canvas.width / bars) * 0.9;
      ctx.fillRect(x, canvas.height - h, w, h);
    }
    requestAnimationFrame(draw);
  };

  const connectSource = (src) => {
    const analyser = ac.createAnalyser();
    analyser.fftSize = 2048;
    src.connect(analyser);
    analyser.connect(ac.destination);
    analyserRef.current = analyser;
    draw();
  };

  // Upload audio file 
  const onFile = async (e) => {
    stopAll();
    unlockAudio();
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const audio = new Audio(url);
    audio.crossOrigin = "anonymous";
    const node = ac.createMediaElementSource(audio);
    connectSource(node);
    await audio.play();
  };


  // Use microphone input
  const onMic = async () => {
    stopAll();
    unlockAudio();
    try {
      const s = await navigator.mediaDevices.getUserMedia({ audio: true });
      setStream(s);
      connectSource(ac.createMediaStreamSource(s));
    } catch {
      alert("Mic permission denied");
    }
  };

  // List note frequency
  const noteFreq = (n) => {
    const A4 = 440;
    const map = {
      C: -9, "C#": -8, D: -7, "D#": -6, E: -5,
      F: -4, "F#": -3, G: -2, "G#": -1, A: 0, "A#": 1, B: 2,
    };
    const m = n.match(/^([A-G]#?)(\d)$/);
    const semi = (map[m[1]] || 0) + ((+m[2] - 4) * 12);
    return A4 * Math.pow(2, semi / 12);
  };

  // Play note
  const play = (note) => {
    if (!pianoOn) return;
    unlockAudio();
    const o = ac.createOscillator();
    const g = ac.createGain();

    const waveMap = {
      piano: "triangle",
      synth: "sawtooth",
      lofi: "square",
      wind: "sine",
    };
    o.type = waveMap[voice] || "triangle";
    o.frequency.value = noteFreq(note);
    o.connect(g);
    g.connect(ac.destination);

    const now = ac.currentTime;
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(0.6, now + 0.03);
    const duration = sustain ? 4 : 1.2;
    g.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    o.start();
    o.stop(now + duration + 0.05);
  };

  // --- Keyboard controls ---
  useEffect(() => {
    const down = (e) => {
      if (!pianoOn) return;
      const k = e.key?.toUpperCase();
      if (k === " ") {
        e.preventDefault();
        setSustain((s) => !s);
        return;
      }
      const map = "AWSEDFTGYHUJKOLP".split("");
      const notes = [
        "C4","C#4","D4","D#4","E4","F4","F#4","G4","G#4","A4",
        "A#4","B4","C5","C#5","D5"
      ];
      const idx = map.indexOf(k);
      if (idx >= 0) play(notes[idx]);
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, [pianoOn, ac, sustain, voice]);

  // Piano layout (2 octaves)
  const whiteNotes = [
    "C4","D4","E4","F4","G4","A4","B4",
    "C5","D5","E5","F5","G5","A5","B5","C6",
  ];
  const blackNotes = [
    { note: "C#4", left: 38 },
    { note: "D#4", left: 96 },
    { note: "F#4", left: 210 },
    { note: "G#4", left: 268 },
    { note: "A#4", left: 325 },
    { note: "C#5", left: 48 + 392 },
    { note: "D#5", left: 107 + 392 },
    { note: "F#5", left: 221 + 392 },
    { note: "G#5", left: 278 + 392 },
    { note: "A#5", left: 336 + 392 },
  ];

  return (
    <section id="music" className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-6">
      <h2 className="text-2xl md:text-3xl font-black mb-2 tracking-tight">
          Music Lab
        </h2>
        <p className="text-white/60 text-[0.95rem] mb-6">
          Try this out! You can upload an audio file or use your mic and see the magic.
          If you want to play around with the piano, turn it on and give it a whirl!
          Press Space to swich the pedal on/off.
        </p>
      </div>

      <div
        className={`card p-4 rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 ${
          pianoOn ? "ring-2 ring-emerald-400/70 shadow-[0_0_25px_#00ffcc]" : ""
        }`}
      >
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <label className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 hover:bg-white/10 cursor-pointer">
            <Upload className="h-4 w-4" />
            <span>Upload audio</span>
            <input type="file" accept="audio/*" onChange={onFile} className="hidden" />
          </label>

          <button
            onClick={onMic}
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 hover:bg-white/10"
          >
            <Mic className="h-4 w-4" /> Use mic
          </button>

          {/* Voice Selector */}
          <div className="relative ml-auto">
            <select
              value={voice}
              onChange={(e) => setVoice(e.target.value)}
              className="appearance-none rounded-xl border border-white/15 bg-white/5 px-4 py-2 pr-8 text-sm hover:bg-white/10 cursor-pointer focus:outline-none"
            >
              <option value="piano">Grand Piano</option>
              <option value="lofi">Lo-Fi</option>
              <option value="synth">Synth</option>
              <option value="wind">Wind</option>
            </select>
            <ChevronDown className="absolute right-2 top-2.5 h-4 w-4 text-white/60 pointer-events-none" />
          </div>

          {/* Piano Power Button */}
          <button
            onClick={() => setPianoOn((v) => !v)}
            className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 transition-all ${
              pianoOn
                ? "border-emerald-400 bg-emerald-400/20 text-emerald-300 hover:bg-emerald-400/30"
                : "border-white/15 bg-white/5 hover:bg-white/10 text-white/70"
            }`}
          >
            <Power className="h-4 w-4" />
            {pianoOn ? "Piano ON" : "Piano OFF"}
          </button>

          {/* Pedal indicator */}
          <span className={`text-sm ${sustain ? "text-emerald-400" : "text-white/50"}`}>
            Pedal: {sustain ? "ON" : "OFF"}
          </span>
        </div>

        {/* Visualizer */}
        <canvas
          ref={canvasRef}
          className="mt-4 h-[320px] w-full rounded-xl border border-white/10 bg-white/5"
        />

        {/* Piano */}
        <div className="relative mx-auto mt-6 w-[860px] select-none">
          <div className="flex justify-between">
            {whiteNotes.map((note) => (
              <div
                key={note}
                onMouseDown={() => play(note)}
                className="relative w-[56px] h-[180px] bg-gradient-to-b from-white to-gray-300 border border-gray-700 rounded-b-[6px] shadow-[inset_0_-2px_3px_rgba(0,0,0,0.3)] active:translate-y-[1.5px] cursor-pointer transition-transform"
              >
                <div className="absolute top-0 left-0 right-0 h-[4px] bg-white rounded-t-[4px]" />
              </div>
            ))}
          </div>

          {blackNotes.map(({ note, left }) => (
            <div
              key={note}
              onMouseDown={() => play(note)}
              style={{ left }}
              className="absolute top-0 w-[36px] h-[115px] bg-gradient-to-b from-black to-gray-800 border border-gray-900 rounded-b-[4px] shadow-[inset_0_-1px_3px_rgba(0,0,0,0.8)] active:translate-y-[1.5px] cursor-pointer transition-transform z-10"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
