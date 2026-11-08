"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  ShieldAlert,
  Cpu,
  Eye,
  Network,
  Flag,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ChevronDown,
  Layers,
  Compass,
  Zap,
  Users,
} from "lucide-react";

export type TimelineCategory =
  | "all"
  | "architecture"
  | "hardware"
  | "intelligence"
  | "network"
  | "validation";

export interface DecisionPivot {
  rejectedClaim: string;
  defensiblePivot: string;
  rationale: string;
}

export interface EngineeringTimelineStep {
  id: string;
  phase: string;
  stageLabel: string;
  title: string;
  subtitle: string;
  category: Exclude<TimelineCategory, "all">;
  attackVector?: string;
  summary: string;
  keyQuote?: string;
  pivots: DecisionPivot[];
  metricsOrSpecs: {
    label: string;
    value: string;
  }[];
  status: "Completed" | "Prototype Baseline" | "Evaluated";
}

export const GARUDA_TIMELINE_STEPS: EngineeringTimelineStep[] = [
  {
    id: "phase-01",
    phase: "STAGE 01",
    stageLabel: "Problem Definition & Operational Pipeline",
    title: "Reframing Disaster Search: From Single Rescue Drone to Coordinated Network",
    subtitle: "Addressing Access, Manpower, Visibility, and Responder Safety Constraints",
    category: "architecture",
    attackVector: "Scope & Operational Reality Audit",
    summary:
      "Disasters rarely cause an absolute absence of responders; instead, disrupted ground access leads to degraded information and delayed identification of where help is needed. GARUDA was architected not as an autonomous rescue vehicle, but as a distributed aerial search network with human verification at its core.",
    keyQuote: "The drone is the node. The intelligence is in the network.",
    pivots: [
      {
        rejectedClaim: "Fully autonomous AI drone that diagnoses victims and executes rescues",
        defensiblePivot: "SEARCH → PINPOINT → REPORT → HUMAN VERIFY → RESCUE",
        rationale:
          "Life-or-death rescue authorization and medical triage cannot be delegated to probabilistic vision models. The system produces georeferenced candidate alerts for human responders.",
      },
      {
        rejectedClaim: "Isolated single-drone manual reconnaissance",
        defensiblePivot: "Multi-node shared search architecture with deterministic state handoff",
        rationale:
          "Single drones suffer from battery limits and localized failures; network intelligence ensures search continuity.",
      },
    ],
    metricsOrSpecs: [
      { label: "Core Pipeline", value: "Detect → Locate → Report → Verify → Rescue" },
      { label: "Decision Authority", value: "Human-in-the-Loop Responder" },
      { label: "Target Bottleneck", value: "Disrupted Access & Fragmented Info" },
    ],
    status: "Completed",
  },
  {
    id: "phase-02",
    phase: "STAGE 02",
    stageLabel: "Hardware & Flight Control Decoupling",
    title: "Separating Mission Intelligence from the Flight-Critical Loop",
    subtitle: "SpeedyBee ArduPilot Stack + Vicharak Axon over MAVLink & Airframe Pruning",
    category: "hardware",
    attackVector: "Engineering Proof & Credibility Attack",
    summary:
      "Early concepts explored heavy Cube/Pixhawk airframes, payload drop mechanisms, and unverified 30-minute flight claims. Internal loophole attacks exposed that heavy payloads cripple search endurance and companion compute lockups must never threaten flight stability.",
    keyQuote:
      "Whenever an assumption could not be defended, we changed the architecture or removed the claim.",
    pivots: [
      {
        rejectedClaim: "Monolithic compute or companion computer directly driving flight loops",
        defensiblePivot: "Vicharak Axon (Mission AI) → MAVLink → SpeedyBee Stack (ArduPilot)",
        rationale:
          "ArduPilot maintains independent attitude stabilization, motor control, geofencing, and hardware failsafes (RTL/Land). If the AI computer freezes, the airframe stays stable.",
      },
      {
        rejectedClaim: "Carbon-fiber hexacopter with mechanical payload delivery & 30-min flight claim",
        defensiblePivot: "650–700 mm RF-transparent quadcopter + 3S 5200 mAh LiPo (Payload Removed)",
        rationale:
          "Removed payload delivery completely to dedicate mass budget to sensing and compute. Rejected unsupported 30-minute endurance claims in favor of empirical prototype measurement.",
      },
    ],
    metricsOrSpecs: [
      { label: "Flight Controller", value: "SpeedyBee Stack (ArduPilot)" },
      { label: "Mission Computer", value: "Vicharak Axon via MAVLink" },
      { label: "Airframe & Power", value: "650–700mm RF-Transparent Quad / 3S 5200mAh" },
    ],
    status: "Prototype Baseline",
  },
  {
    id: "phase-03",
    phase: "STAGE 03",
    stageLabel: "Local-First Vision & Sensor Fusion Boundaries",
    title: "Custom YOLO11 Edge Inference, Global Shutter RGB & Physical Sensor Limits",
    subtitle: "Eliminating Rolling-Shutter Distortion & Rejecting 'X-Ray Thermal' Myths",
    category: "intelligence",
    attackVector: "Evidence & Safety Attack",
    summary:
      "High-frequency motor vibrations distort rolling-shutter cameras, and thermal imaging is frequently misrepresented in student projects as seeing through rubble. GARUDA transitioned to a global-shutter RGB sensor, custom-trained YOLO11 on Axon, and strict physics-based sensor fusion rules.",
    keyQuote:
      "Thermal is used as part of RGB + thermal sensor fusion, not as magical X-ray victim detection.",
    pivots: [
      {
        rejectedClaim: "Standard rolling-shutter RGB camera & generic pretrained object weights",
        defensiblePivot: "Global-Shutter RGB Camera + Custom-Trained Ultralytics YOLO11 (Conf ≥ 0.90)",
        rationale:
          "Global shutter eliminates motion distortion during aerial sweeps. YOLO11 is validated against a controlled ≥ 0.90 model confidence criterion (explicitly model confidence, not statistical probability).",
      },
      {
        rejectedClaim: "Through-wall / through-rubble thermal detection & standalone acoustic triggers",
        defensiblePivot: "Multi-Modal Evidence Aggregation (RGB + Thermal/IR + Acoustic + LiDAR)",
        rationale:
          "Thermal cannot penetrate concrete or dense rubble; it provides complementary heat evidence in low-light/night conditions. Acoustic acts strictly as an auxiliary distress cue, and LiDAR handles obstacle geometry.",
      },
      {
        rejectedClaim: "Continuous real-time victim tracking & 'safe/injured' AI diagnosis",
        defensiblePivot: "Georeferenced 'Potential Victim Detected' (Last Known Location + Timestamp)",
        rationale:
          "Records georeferenced Last Known Location (LKL), UTC timestamp, and Drone ID with spatiotemporal deduplication.",
      },
    ],
    metricsOrSpecs: [
      { label: "Edge AI Model", value: "Custom YOLO11 (Confidence ≥ 0.90)" },
      { label: "Primary Vision", value: "Global-Shutter RGB + Thermal/IR Fusion" },
      { label: "Spatial & Auxiliary", value: "LiDAR Obstacle Geometry + Acoustic Cue" },
    ],
    status: "Prototype Baseline",
  },
  {
    id: "phase-04",
    phase: "STAGE 04",
    stageLabel: "Persistent Search Memory & Dynamic Reallocation",
    title: "Deterministic Grid State Machine & Fault-Tolerant Sector Handoff",
    subtitle: "Turning Individual Drones into a Coordinated Search Architecture",
    category: "network",
    attackVector: "Originality & Swarm Reliability Attack",
    summary:
      "To differentiate GARUDA from a standalone camera drone without claiming magical 'emergent swarm autonomy,' the architecture implements deterministic search-grid state synchronization and automatic sector release when a node aborts.",
    keyQuote:
      "We designed for graceful degradation rather than pretending failures don't happen.",
    pivots: [
      {
        rejectedClaim: "Uncoordinated multi-drone flight paths or vague 'emergent swarm AI'",
        defensiblePivot: "Persistent Search Memory (UNSEARCHED → SEARCHING → COMPLETED / RELEASED)",
        rationale:
          "Every search sector maintains a synchronized deterministic state across participating nodes, preventing duplicate searching of already cleared areas.",
      },
      {
        rejectedClaim: "Claiming zero single points of failure across hardware and mission layers",
        defensiblePivot: "Dynamic Sector Reallocation (Drone A Exits → Grid Released → Drone B Inherits)",
        rationale:
          "If Drone A aborts due to low battery or hardware degradation, its unfinished sector transitions to RELEASED / UNASSIGNED for Drone B to inherit when connectivity permits.",
      },
    ],
    metricsOrSpecs: [
      { label: "Grid States", value: "UNSEARCHED | SEARCHING | COMPLETED | RELEASED" },
      { label: "Failure Mode", value: "Graceful Degradation & Sector Inheritance" },
      { label: "Flight Failsafes", value: "ArduPilot RTL / Land on Low Voltage or Link Loss" },
    ],
    status: "Prototype Baseline",
  },
  {
    id: "phase-05",
    phase: "STAGE 05",
    stageLabel: "Degraded-Mode Mesh & Navigation Fallbacks",
    title: "Metadata-First Communication over BATMAN-adv & Tiered Localization",
    subtitle: "Prioritizing Actionable Coordinates Over Raw Video in Constrained RF Links",
    category: "network",
    attackVector: "Adoption & Degraded-Environment Attack",
    summary:
      "In disaster zones, bandwidth fluctuates wildly and satellite navigation can degrade near terrain or canopy. GARUDA replaced absolute communication guarantees with a metadata-first priority queue and a four-tier navigation fallback sequence.",
    keyQuote: "Critical information survives before rich information.",
    pivots: [
      {
        rejectedClaim: "Continuous 1080p video streaming & guaranteed 1.5–2 km end-to-end mesh range",
        defensiblePivot: "Metadata-First Priority Queue + BATMAN-adv Layer-2 Mesh (1.5–2 km Per-Link Target)",
        rationale:
          "When bandwidth drops, continuous video is shed first so candidate locations, timestamps, and grid state survive. BATMAN-adv reroutes traffic only when an alternate physical RF path exists.",
      },
      {
        rejectedClaim: "Presenting WildNav as a universally solved extreme-environment navigator",
        defensiblePivot: "Tiered Fallback: GNSS + IMU → ORB-SLAM3 / WildNav → LiDAR Odometry → Safe Hold/Land",
        rationale:
          "Evaluates ORB-SLAM3 and WildNav as localization candidates alongside LiDAR odometry, governed by dynamic confidence checks that transition to Safe Hold/Land when needed.",
      },
    ],
    metricsOrSpecs: [
      { label: "Mesh Protocol", value: "BATMAN-adv Layer-2 (1.5–2 km per-link target)" },
      { label: "Bandwidth Policy", value: "Candidate Metadata Prioritized Over Video" },
      { label: "Nav Fallback", value: "GNSS+IMU → VIO/SLAM → LiDAR Odom → Safe Land" },
    ],
    status: "Prototype Baseline",
  },
  {
    id: "phase-06",
    phase: "STAGE 06",
    stageLabel: "Competitive Stress-Testing & Prototype Validation",
    title: "SIH 2026, CINTEL Ideathon 3.0 & The 6-Stage Deployment Roadmap",
    subtitle: "Treating Competition Critiques as Adversarial Architecture Reviews",
    category: "validation",
    attackVector: "Pitch, Adoption & Validation Audit",
    summary:
      "GARUDA did not qualify for SIH 2026 and did not podium at CINTEL Ideathon 3.0. Rather than disguising these outcomes, each round of critique was used to systematically purge weak claims across Evidence, Originality, Engineering Proof, Safety, Credibility, and Adoption.",
    keyQuote:
      "We didn't just build the system. We repeatedly attacked our own assumptions until the architecture became defensible.",
    pivots: [
      {
        rejectedClaim: "Framing prototype lab tests as deployment-ready field proof",
        defensiblePivot: "Explicit Controlled/Simulated Validation Matrix & 6-Stage Deployment Path",
        rationale:
          "Clearly distinguishes controlled validation (YOLO11 ≥ 0.90 LoS, simulated node dropout, bandwidth throttling, Axon latency) from real-world disaster deployment.",
      },
      {
        rejectedClaim: "Polishing competition pitches by hiding non-qualifying results",
        defensiblePivot: "Transparent Record: SIH 2026 (Did Not Qualify) → CINTEL Ideathon 3.0 (Did Not Podium)",
        rationale:
          "Honest engineering documentation treats competition pushback as the catalyst that forged a rigorous, defensible architecture.",
      },
    ],
    metricsOrSpecs: [
      { label: "Competition History", value: "SIH 2026 → CINTEL Ideathon 3.0" },
      { label: "Validation Scope", value: "Controlled & Simulated Prototype Testing" },
      { label: "Deployment Stage", value: "Stage 1–2 (Component & Single-Drone Prototype)" },
    ],
    status: "Evaluated",
  },
];

const DEPLOYMENT_STAGES = [
  { step: "01", label: "Component Validation", active: true, current: false },
  { step: "02", label: "Single-Drone Prototype", active: true, current: true },
  { step: "03", label: "2/3-Node Network", active: false, current: false },
  { step: "04", label: "Controlled Disaster Sim", active: false, current: false },
  { step: "05", label: "Field Validation", active: false, current: false },
  { step: "06", label: "Operational Deployment", active: false, current: false },
];

const CATEGORY_META: Record<
  TimelineCategory,
  { label: string; icon: React.ComponentType<{ className?: string }> }
> = {
  all: { label: "All Stages (6)", icon: Layers },
  architecture: { label: "System Architecture", icon: Compass },
  hardware: { label: "Hardware & Flight", icon: Cpu },
  intelligence: { label: "Edge AI & Sensors", icon: Eye },
  network: { label: "Mesh & Search Memory", icon: Network },
  validation: { label: "Competition & Validation", icon: Flag },
};

export function EngineeringTimeline() {
  const [selectedCategory, setSelectedCategory] = useState<TimelineCategory>("all");
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    "phase-01": true,
    "phase-02": true,
    "phase-03": true,
    "phase-04": true,
    "phase-05": true,
    "phase-06": true,
  });
  const shouldReduceMotion = useReducedMotion();

  const filteredSteps =
    selectedCategory === "all"
      ? GARUDA_TIMELINE_STEPS
      : GARUDA_TIMELINE_STEPS.filter((step) => step.category === selectedCategory);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allOpen: Record<string, boolean> = {};
    GARUDA_TIMELINE_STEPS.forEach((s) => {
      allOpen[s.id] = true;
    });
    setExpandedIds(allOpen);
  };

  const collapseAll = () => {
    setExpandedIds({});
  };

  return (
    <section
      aria-label="GARUDA Iterative Engineering Timeline"
      className="my-14 not-prose text-foreground"
    >
      {/* Top Architectural Header Banner */}
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 mb-8 shadow-[0_8px_30px_rgba(25,26,24,0.18)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary/[0.05] rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-primary font-semibold">
              Iterative Architecture Log
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={expandAll}
              className="px-2.5 py-1 rounded text-[11px] font-mono text-muted-foreground hover:text-foreground bg-secondary/60 hover:bg-secondary border border-border transition-colors"
            >
              Expand All Pivots
            </button>
            <button
              type="button"
              onClick={collapseAll}
              className="px-2.5 py-1 rounded text-[11px] font-mono text-muted-foreground hover:text-foreground bg-secondary/60 hover:bg-secondary border border-border transition-colors"
            >
              Collapse All
            </button>
          </div>
        </div>

        <h3 className="text-2xl sm:text-3xl font-light tracking-[-0.02em] text-foreground mb-3">
          Engineering Evolution &amp; &ldquo;Loophole Attack&rdquo; Timeline
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed max-w-3xl mb-6">
          Instead of defending weak assumptions, GARUDA was subjected to six internal loophole attack vectors—
          <span className="text-foreground font-mono text-xs mx-1">
            Evidence → Originality → Engineering Proof → Safety → Credibility → Adoption
          </span>
          —replacing every indefensible claim with a bounded, verifiable architectural decision.
        </p>

        {/* Category Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-border">
          {(Object.keys(CATEGORY_META) as TimelineCategory[]).map((cat) => {
            const Icon = CATEGORY_META[cat].icon;
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono tracking-wide transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                    : "bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary border border-border"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{CATEGORY_META[cat].label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Vertical Timeline Track */}
      <div className="relative pl-6 sm:pl-10">
        {/* Continuous Vertical Spine */}
        <div
          aria-hidden="true"
          className="absolute left-[11px] sm:left-[19px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-primary via-primary/40 to-border"
        />

        <div className="space-y-8">
          <AnimatePresence mode="popLayout">
            {filteredSteps.map((step, index) => {
              const isExpanded = !!expandedIds[step.id];
              const CategoryIcon = CATEGORY_META[step.category].icon;

              return (
                <motion.div
                  key={step.id}
                  layout={!shouldReduceMotion}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{
                    duration: 0.35,
                    delay: shouldReduceMotion ? 0 : index * 0.05,
                  }}
                  className="relative group"
                >
                  {/* Timeline Node Marker */}
                  <div
                    aria-hidden="true"
                    className="absolute -left-[25px] sm:-left-[33px] top-6 w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-[0_0_12px_rgba(196,107,69,0.3)] group-hover:scale-110 transition-transform z-10"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>

                  {/* Timeline Stage Card */}
                  <div className="rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-300 shadow-[0_6px_28px_rgba(25,26,24,0.16)] overflow-hidden">
                    {/* Top Metadata Bar */}
                    <div className="px-5 sm:px-6 py-3.5 bg-secondary/45 border-b border-border flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="px-2.5 py-0.5 rounded bg-primary/15 border border-primary/35 text-primary font-mono text-[11px] font-semibold tracking-wider uppercase">
                          {step.phase}
                        </span>
                        <span className="text-xs font-mono text-foreground/85 flex items-center gap-1.5">
                          <CategoryIcon className="w-3.5 h-3.5 text-primary" />
                          {step.stageLabel}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {step.attackVector && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-primary/10 border border-primary/25 text-primary text-[10px] font-mono uppercase tracking-wider">
                            <ShieldAlert className="w-3 h-3 text-primary" />
                            {step.attackVector}
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded bg-secondary border border-border text-muted-foreground text-[10px] font-mono uppercase tracking-wider">
                          {step.status}
                        </span>
                      </div>
                    </div>

                    {/* Card Main Body */}
                    <div className="p-5 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                        <div>
                          <h4 className="text-lg sm:text-xl font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
                            {step.title}
                          </h4>
                          <p className="text-xs sm:text-sm font-mono text-muted-foreground mt-1">
                            {step.subtitle}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleExpand(step.id)}
                          aria-expanded={isExpanded}
                          className="self-start inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/65 hover:bg-secondary border border-border text-xs font-mono text-primary transition-colors shrink-0"
                        >
                          <span>
                            {isExpanded ? "Hide Pivots" : `View Pivots (${step.pivots.length})`}
                          </span>
                          <ChevronDown
                            className={`w-3.5 h-3.5 transition-transform duration-200 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>

                      <p className="text-sm sm:text-[15px] text-muted-foreground font-light leading-relaxed mb-4">
                        {step.summary}
                      </p>

                      {step.keyQuote && (
                        <div className="mb-5 px-4 py-2.5 border border-primary/30 bg-primary/[0.06] rounded-lg">
                          <p className="text-xs sm:text-sm font-mono italic text-foreground/90">
                            &ldquo;{step.keyQuote}&rdquo;
                          </p>
                        </div>
                      )}

                      {/* Key Specs Strip */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-2">
                        {step.metricsOrSpecs.map((spec) => (
                          <div
                            key={spec.label}
                            className="p-3 rounded-xl bg-secondary/50 border border-border flex flex-col justify-between"
                          >
                            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
                              {spec.label}
                            </span>
                            <span className="text-xs font-mono text-foreground font-medium">
                              {spec.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Expandable Architectural Pivots Drawer */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-5 mt-5 border-t border-border space-y-3.5">
                              <div className="text-[11px] font-mono uppercase tracking-widest text-primary flex items-center gap-2">
                                <Zap className="w-3.5 h-3.5" />
                                <span>Key Decision Points &amp; Architectural Changes</span>
                              </div>

                              {step.pivots.map((pivot, pIdx) => (
                                <div
                                  key={pIdx}
                                  className="rounded-xl border border-border bg-background/70 p-4 space-y-3"
                                >
                                  <div className="grid grid-cols-1 md:grid-cols-11 gap-3 items-center">
                                    {/* Rejected Assumption */}
                                    <div className="md:col-span-5 p-3 rounded-lg bg-secondary/60 border border-border">
                                      <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
                                        <XCircle className="w-3.5 h-3.5 shrink-0 text-primary" />
                                        <span>Rejected Assumption / Claim</span>
                                      </div>
                                      <p className="text-xs text-muted-foreground font-light leading-relaxed line-through decoration-primary/40">
                                        {pivot.rejectedClaim}
                                      </p>
                                    </div>

                                    {/* Arrow */}
                                    <div className="md:col-span-1 flex items-center justify-center">
                                      <div className="w-7 h-7 rounded-full bg-secondary border border-border flex items-center justify-center text-primary">
                                        <ArrowRight className="w-3.5 h-3.5 rotate-90 md:rotate-0" />
                                      </div>
                                    </div>

                                    {/* Defensible Pivot */}
                                    <div className="md:col-span-5 p-3 rounded-lg bg-primary/[0.08] border border-primary/35">
                                      <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-primary mb-1">
                                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-primary" />
                                        <span>Defensible Architecture</span>
                                      </div>
                                      <p className="text-xs text-foreground font-medium leading-relaxed">
                                        {pivot.defensiblePivot}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Engineering Rationale */}
                                  <div className="text-xs text-muted-foreground font-light leading-relaxed pt-2 border-t border-border/60">
                                    <strong className="text-foreground font-mono text-[11px] uppercase tracking-wider mr-1.5">
                                      Engineering Rationale:
                                    </strong>
                                    {pivot.rationale}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Graduated Deployment Path Progress Tracker */}
      <div className="mt-10 rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-[0_8px_30px_rgba(25,26,24,0.16)]">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-xs font-mono uppercase tracking-widest text-foreground font-semibold">
              Graduated Engineering &amp; Deployment Progression
            </span>
          </div>
          <span className="text-[11px] font-mono text-primary bg-primary/10 border border-primary/30 px-2.5 py-0.5 rounded">
            Current Status: Prototype-Stage Validation (Not Field-Deployment Ready)
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {DEPLOYMENT_STAGES.map((item) => (
            <div
              key={item.step}
              className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                item.current
                  ? "bg-primary/15 border-primary shadow-[0_0_20px_rgba(196,107,69,0.15)]"
                  : item.active
                  ? "bg-secondary/70 border-border"
                  : "bg-secondary/25 border-border/50 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-[10px] font-mono uppercase tracking-widest ${
                    item.current ? "text-primary font-bold" : "text-muted-foreground"
                  }`}
                >
                  STEP {item.step}
                </span>
                {item.current && (
                  <span className="w-2 h-2 rounded-full bg-primary" />
                )}
              </div>
              <span
                className={`text-xs font-medium leading-snug ${
                  item.current ? "text-foreground" : item.active ? "text-foreground/85" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
