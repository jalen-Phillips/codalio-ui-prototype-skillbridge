import React from "react";
import { CheckCircle2, Clock, Building2, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";

export interface TaskDataItem {
  id: string;
  title: string;
  company: string;
  badgeText: string;
  duration: string;
  pay: string;
  payNumeric: number;
  deadline: string;
  deliverables: string;
  evaluationCriteria: [string, string, string];
  checklistSteps: [string, string, string, string];
  sampleNotes: string;
  rating: string;
  feedback: string;
  completedDate: string;
  resumeBullets: [string, string];
}

export const TASKS_DATA: TaskDataItem[] = [
  {
    id: "task-1",
    title: "Fix 5 Bugs in a Booking Form",
    company: "NorthPeak Apps",
    badgeText: "Verified company",
    duration: "4h",
    pay: "$120",
    payNumeric: 120,
    deadline: "Due in 48 hours",
    deliverables:
      "Resolved Git pull request fixing 5 UI validation and state bugs in the customer booking form component, plus a brief bug resolution summary.",
    evaluationCriteria: [
      "All 5 identified booking form validation bugs are reproducibly resolved",
      "Form error states display clear inline messages without page reload",
      "Clean, readable code changes following existing component patterns",
    ],
    checklistSteps: [
      "Reproduce all 5 reported booking form bugs in the local preview",
      "Fix date-picker boundary bug and empty guest count validation",
      "Resolve duplicate submit button click & phone format validation issues",
      "Run form test cases and document fix summary in the notes box",
    ],
    sampleNotes:
      "Fixed all 5 validation bugs in BookingForm.tsx: bounded date picker minDate to today, enforced guest count >= 1, added phone regex check, disabled submit button while pending, and verified all 5 test cases pass.",
    rating: "4/5",
    feedback:
      "Clean validation fixes and thorough test notes—ready for production merge.",
    completedDate: "May 2025",
    resumeBullets: [
      "Resolved 5 production UI and validation defects in the customer booking workflow using React and TypeScript, eliminating form submission errors.",
      "Implemented inline field validation and duplicate-submit protection across 4 booking steps, verified by NorthPeak Apps engineering.",
    ],
  },
  {
    id: "task-2",
    title: "Clean and Chart a Sales Spreadsheet",
    company: "Maple Retail Co.",
    badgeText: "Verified company",
    duration: "3h",
    pay: "$90",
    payNumeric: 90,
    deadline: "Due in 36 hours",
    deliverables:
      "Cleaned Q3 regional sales spreadsheet (de-duplicated & standardized SKU rows) and a 1-page summary chart comparing monthly revenue by store category.",
    evaluationCriteria: [
      "Zero duplicate transactions or unformatted date/currency cells remain",
      "Pivot summary accurately totals Q3 revenue across all 4 product categories",
      "Executive bar chart clearly highlights top-performing store regions",
    ],
    checklistSteps: [
      "Audit raw Q3 CSV export and remove 18 duplicate transaction rows",
      "Standardize SKU codes, currency formatting, and regional store labels",
      "Build category revenue pivot table and verify grand totals",
      "Create executive summary chart and write key takeaways in the notes box",
    ],
    sampleNotes:
      "Removed 18 duplicate transaction IDs across 1,240 rows, normalized all SKU prefixes and USD formatting, verified Q3 total ($412,850) in the category pivot table, and created the regional comparison chart.",
    rating: "4/5",
    feedback:
      "Spotless data hygiene and very clear regional revenue breakdown chart.",
    completedDate: "May 2025",
    resumeBullets: [
      "Cleaned and standardized 1,200+ rows of Q3 retail transaction data for Maple Retail Co., eliminating duplicate records and formatting discrepancies.",
      "Built executive pivot summaries and regional revenue visualizations to guide seasonal inventory planning.",
    ],
  },
  {
    id: "task-3",
    title: "Write 5 Social Posts for a Launch",
    company: "Brightleaf Foods",
    badgeText: "Verified company",
    duration: "3h",
    pay: "$80",
    payNumeric: 80,
    deadline: "Due in 24 hours",
    deliverables:
      "5 launch-ready social media posts (LinkedIn & Instagram) announcing the new plant-based snack line, complete with scroll-stopping hooks, body copy, and CTAs.",
    evaluationCriteria: [
      "All 5 posts include a clear hook, benefit-driven body copy, and CTA",
      "Tone matches Brightleaf Foods' upbeat, transparent brand voice",
      "Each post highlights a distinct product benefit (protein, sustainability, taste)",
    ],
    checklistSteps: [
      "Review Brightleaf launch brief and target audience persona",
      "Draft 3 Instagram carousel/reel captions with hooks and hashtags",
      "Draft 2 LinkedIn launch storytelling posts focused on retail availability",
      "Proofread all 5 posts for character count and paste final copy in the notes box",
    ],
    sampleNotes:
      "Drafted 3 Instagram launch captions (focusing on 12g plant protein, zero artificial ingredients, and crunch test) and 2 LinkedIn founder-voice retail launch posts with store locator CTAs.",
    rating: "4/5",
    feedback:
      "Punchy hooks and spot-on brand voice—we're scheduling three of these for launch week.",
    completedDate: "May 2025",
    resumeBullets: [
      "Authored 5 multi-channel product launch social media posts for Brightleaf Foods, aligning copy hooks and CTAs with brand voice guidelines.",
      "Crafted targeted LinkedIn and Instagram launch messaging highlighting nutritional and sustainability differentiators.",
    ],
  },
  {
    id: "task-4",
    title: "Redesign a Landing Page Hero",
    company: "Lumen Studio",
    badgeText: "Verified company",
    duration: "5h",
    pay: "$150",
    payNumeric: 150,
    deadline: "Due in 72 hours",
    deliverables:
      "High-converting desktop and mobile hero section redesign with updated headline hierarchy, primary/secondary CTA buttons, and trust-badge layout.",
    evaluationCriteria: [
      "Clear visual hierarchy between headline, value proposition, and primary CTA",
      "Responsive layout adapts cleanly between desktop (1280px) and mobile (375px)",
      "Accessible contrast ratios (WCAG AA) across all button and text elements",
    ],
    checklistSteps: [
      "Audit existing hero section friction points and visual hierarchy issues",
      "Redesign desktop hero layout with stronger headline contrast and dual CTAs",
      "Adapt hero layout and spacing for mobile viewport (375px)",
      "Verify contrast ratios and document design rationale in the notes box",
    ],
    sampleNotes:
      "Redesigned desktop (1280px) and mobile (375px) hero frames: increased headline weight and contrast (11.4:1 AAA), paired primary CTA with social proof strip, and tightened mobile above-the-fold spacing.",
    rating: "4/5",
    feedback:
      "Strong typographic hierarchy and mobile layout—the CTA prominence is a huge upgrade.",
    completedDate: "May 2025",
    resumeBullets: [
      "Redesigned responsive desktop and mobile landing page hero section for Lumen Studio, improving visual hierarchy and CTA prominence.",
      "Applied WCAG AA accessible color contrast and modular spacing tokens across breakpoints.",
    ],
  },
];

export interface TaskWorkState {
  checkedSteps: [boolean, boolean, boolean, boolean];
  notes: string;
  submitted: boolean;
  addedToResume: boolean;
}

const memoryStore: Record<string, TaskWorkState> = {
  "task-1": { checkedSteps: [false, false, false, false], notes: "", submitted: false, addedToResume: false },
  "task-2": { checkedSteps: [false, false, false, false], notes: "", submitted: false, addedToResume: false },
  "task-3": { checkedSteps: [false, false, false, false], notes: "", submitted: false, addedToResume: false },
  "task-4": { checkedSteps: [false, false, false, false], notes: "", submitted: false, addedToResume: false },
};

const listeners = new Set<() => void>();

export function getTaskWorkState(taskId: string): TaskWorkState {
  if (!memoryStore[taskId]) {
    memoryStore[taskId] = {
      checkedSteps: [false, false, false, false],
      notes: "",
      submitted: false,
      addedToResume: false,
    };
  }
  return memoryStore[taskId];
}

export function setTaskWorkState(taskId: string, updater: (prev: TaskWorkState) => TaskWorkState) {
  const current = getTaskWorkState(taskId);
  memoryStore[taskId] = updater(current);
  listeners.forEach((fn) => fn());
}

export function subscribeTaskStore(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getCompletedTasksForResume(): TaskDataItem[] {
  return TASKS_DATA.filter((task) => {
    const st = getTaskWorkState(task.id);
    return st.submitted || st.addedToResume;
  });
}

export default function TaskCard({
  id,
  title,
  company,
  duration,
  pay,
  badgeText = "Verified company",
  deliverable,
  status = "available",
  onSelectTask,
}: {
  id: string;
  title: string;
  company: string;
  duration: string;
  pay: string;
  badgeText?: string;
  deliverable?: string;
  status?: "available" | "in_progress" | "completed";
  onSelectTask?: (id: string) => void;
}) {
  return (
    <Card
      onClick={() => onSelectTask && onSelectTask(id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && onSelectTask) {
          e.preventDefault();
          onSelectTask(id);
        }
      }}
      className="rounded-2xl bg-card border border-border shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer group"
    >
      <CardHeader className="p-6 pb-4 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-accent text-accent-foreground border border-emerald-500/20 font-medium rounded-full px-3 py-1 text-xs inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                {badgeText}
              </span>
              {status === "completed" && (
                <span className="bg-emerald-600 text-white font-semibold rounded-full px-2.5 py-0.5 text-xs inline-flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 shrink-0" />
                  Completed & Paid
                </span>
              )}
              {status === "in_progress" && (
                <span className="bg-secondary text-secondary-foreground font-semibold rounded-full px-2.5 py-0.5 text-xs inline-flex items-center gap-1">
                  In Progress
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground pt-0.5">
              <Building2 className="h-4 w-4 text-primary shrink-0" />
              <span>{company}</span>
            </div>
          </div>

          <div className="text-right shrink-0">
            <div className="inline-flex flex-col items-end bg-accent text-accent-foreground border border-emerald-500/25 px-3.5 py-1.5 rounded-xl">
              <span className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight leading-none">
                {pay}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wider opacity-90 mt-1">
                Fixed Pay
              </span>
            </div>
          </div>
        </div>

        <CardTitle className="text-xl sm:text-2xl font-heading font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="px-6 py-2 flex-1 flex flex-col justify-between gap-4">
        {deliverable && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {deliverable}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/70">
          <div className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground bg-muted px-3 py-1.5 rounded-lg">
            <Clock className="h-4 w-4 text-primary" />
            <span>
              Est. time: <strong>{duration}</strong>
            </span>
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            Verified paid work experience
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-4">
        <Button
          variant={status === "completed" ? "outline" : "default"}
          className="w-full rounded-xl font-semibold shadow-sm"
          onClick={(e) => {
            e.stopPropagation();
            if (onSelectTask) onSelectTask(id);
          }}
        >
          {status === "completed"
            ? "View Completed Task & Review"
            : status === "in_progress"
            ? "Continue Task"
            : "Open Task & Start Work"}
          <ArrowRight className="h-4 w-4 ml-1.5" />
        </Button>
      </CardFooter>
    </Card>
  );
}

export { TaskCard };
