import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Award,
  Briefcase,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  Copy,
  DollarSign,
  FileText,
  Quote,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  TASKS_DATA,
  TaskDataItem,
  getCompletedTasksForResume,
  setTaskWorkState,
  subscribeTaskStore,
} from "../components/TaskCard";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";

function MyExperienceSection0() {
  const navigate = useNavigate();
  const [, setTick] = useState(0);

  useEffect(() => {
    return subscribeTaskStore(() => setTick((t) => t + 1));
  }, []);

  const completedTasks = getCompletedTasksForResume();
  const totalEarned = completedTasks.reduce((sum, t) => sum + t.payNumeric, 0);

  return (
    <section className="w-full" aria-label="My Experience Header and Verification Statement">
      <Card className="rounded-2xl bg-card border border-border shadow-sm overflow-hidden">
        <CardContent className="p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="secondary"
                className="rounded-full px-3 py-1 text-xs font-semibold inline-flex items-center gap-1.5"
              >
                <Award className="h-3.5 w-3.5 text-primary" />
                My Experience • Resume Credentials
              </Badge>
              <span className="bg-accent text-accent-foreground border border-emerald-500/20 rounded-full px-3 py-1 text-xs font-medium inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" />
                Verified company
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold tracking-tight text-foreground">
              My Experience
            </h1>

            <p className="text-sm sm:text-base font-medium text-foreground bg-accent/60 border border-emerald-500/25 rounded-xl px-4 py-2.5 inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-accent-foreground shrink-0" />
              <span>
                Paid work verified by the company, not volunteering or co-op.
              </span>
            </p>

            <div className="pt-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/")}
                className="rounded-xl font-medium"
              >
                <ArrowLeft className="h-4 w-4 mr-1.5" />
                Back to Task Board
              </Button>
            </div>
          </div>

          <div className="w-full lg:w-auto flex items-center gap-4 bg-muted/60 border border-border rounded-2xl p-4 sm:p-5 shrink-0">
            <div className="space-y-1 pr-3 border-r border-border">
              <div className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Briefcase className="h-3.5 w-3.5 text-primary" />
                <span>Completed Tasks</span>
              </div>
              <p className="text-2xl font-heading font-extrabold text-foreground">
                {completedTasks.length}
              </p>
              <p className="text-xs text-muted-foreground">Verified entries</p>
            </div>

            <div className="space-y-1 pl-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <DollarSign className="h-3.5 w-3.5 text-emerald-600" />
                <span>Total Paid</span>
              </div>
              <p className="text-2xl font-heading font-extrabold text-accent-foreground bg-accent px-2.5 py-0.5 rounded-lg inline-block">
                ${totalEarned}
              </p>
              <p className="text-xs text-muted-foreground">Paid work experience</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function MyExperienceSection1() {
  const navigate = useNavigate();
  const [, setTick] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    return subscribeTaskStore(() => setTick((t) => t + 1));
  }, []);

  const completedTasks = getCompletedTasksForResume();

  const formatResumeEntryText = (task: TaskDataItem) => {
    return [
      `${task.title}, Micro-Internship (Contract, Paid)`,
      `${task.company} (Verified company) | ${task.completedDate}`,
      `Paid work experience: ${task.pay} paid by ${task.company}`,
      `• ${task.resumeBullets[0]}`,
      `• ${task.resumeBullets[1]}`,
      `Company Feedback: "${task.feedback}" — ${task.company}`,
      `Paid work verified by the company, not volunteering or co-op.`,
    ].join("\n");
  };

  const handleCopyEntry = (task: TaskDataItem) => {
    const text = formatResumeEntryText(task);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedId(task.id);
    window.setTimeout(() => {
      setCopiedId((prev) => (prev === task.id ? null : prev));
    }, 2000);
  };

  const handleDemoCompleteFirstTask = () => {
    const first = TASKS_DATA[0];
    setTaskWorkState(first.id, () => ({
      checkedSteps: [true, true, true, true],
      notes: first.sampleNotes,
      submitted: true,
      addedToResume: true,
    }));
  };

  if (completedTasks.length === 0) {
    return (
      <section aria-label="Empty Experience State" className="w-full">
        <Card className="rounded-2xl bg-card border-2 border-dashed border-border p-8 sm:p-12 text-center shadow-sm">
          <div className="max-w-md mx-auto flex flex-col items-center justify-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-secondary text-primary flex items-center justify-center">
              <FileText className="h-7 w-7" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
                Complete your first paid task to add real work experience.
              </h2>
              <p className="text-sm text-muted-foreground">
                Paid work verified by the company, not volunteering or co-op.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Button
                size="lg"
                onClick={() => navigate("/")}
                className="rounded-xl font-semibold shadow-sm"
              >
                <Briefcase className="h-4 w-4 mr-2" />
                Go to Task Board
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleDemoCompleteFirstTask}
                className="rounded-xl font-medium"
              >
                <Sparkles className="h-4 w-4 mr-2 text-primary" />
                Preview Sample Completed Entry
              </Button>
            </div>
          </div>
        </Card>
      </section>
    );
  }

  return (
    <section
      aria-label="Resume-Style Verified Paid Work Entries"
      className="space-y-6 w-full"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
            Resume-Style Work Experience Entries ({completedTasks.length})
          </h2>
          <p className="text-sm text-muted-foreground">
            Paid work verified by the company, not volunteering or co-op.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/")}
          className="rounded-xl font-semibold self-start sm:self-auto"
        >
          Complete Another Task
        </Button>
      </div>

      <div className="flex flex-col gap-6">
        {completedTasks.map((task) => {
          const isCopied = copiedId === task.id;
          return (
            <Card
              key={task.id}
              className="rounded-2xl bg-card border border-border shadow-sm overflow-hidden"
            >
              <CardHeader className="p-6 sm:p-8 pb-4 space-y-4">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-2.5">
                    <CardTitle className="text-xl sm:text-2xl font-heading font-bold text-foreground leading-snug">
                      {task.title}, Micro-Internship (Contract, Paid)
                    </CardTitle>

                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
                        <Building2 className="h-4 w-4 text-primary shrink-0" />
                        {task.company}
                      </span>

                      <span className="bg-accent text-accent-foreground border border-emerald-500/20 font-medium rounded-full px-3 py-0.5 text-xs inline-flex items-center gap-1.5">
                        <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                        {task.badgeText}
                      </span>

                      <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                        <Calendar className="h-4 w-4 text-primary shrink-0" />
                        {task.completedDate}
                      </span>
                    </div>
                  </div>

                  <Button
                    variant={isCopied ? "secondary" : "default"}
                    onClick={() => handleCopyEntry(task)}
                    className="rounded-xl font-semibold shrink-0 self-start"
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-4 w-4 mr-1.5 text-emerald-600" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-1.5" />
                        Copy Resume Entry
                      </>
                    )}
                  </Button>
                </div>

                <div>
                  <span className="bg-accent text-accent-foreground border border-emerald-500/30 font-semibold rounded-xl px-3.5 py-2 text-xs sm:text-sm inline-flex items-center gap-2">
                    <DollarSign className="h-4 w-4 shrink-0" />
                    Paid work experience: {task.pay} paid by {task.company}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="px-6 sm:px-8 py-4 space-y-5">
                <div className="rounded-xl bg-muted/60 border border-border p-5 space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Resume Experience Bullets
                  </p>
                  <ul className="space-y-2.5 list-disc list-inside text-sm sm:text-base text-foreground leading-relaxed">
                    {task.resumeBullets.map((bullet, idx) => (
                      <li key={idx} className="font-medium">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl bg-accent/40 border border-emerald-500/20 p-4 flex items-start gap-3">
                  <Quote className="h-5 w-5 text-accent-foreground shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground italic">
                      &ldquo;{task.feedback}&rdquo;
                    </p>
                    <p className="text-xs font-semibold text-accent-foreground">
                      — {task.company} (Verified Review • {task.rating} rating)
                    </p>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="px-6 sm:px-8 py-4 bg-muted/30 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm">
                <span className="font-semibold text-accent-foreground inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  Paid work verified by the company, not volunteering or co-op.
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(`/tasks/${task.id}`)}
                  className="text-xs font-medium self-start sm:self-auto"
                >
                  View Submitted Task
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

export default function MyExperience() {
  return (
    <div className="w-full min-w-0 overflow-x-hidden">
      <div className="flex flex-col gap-6 lg:gap-8 w-full min-w-0">
        <MyExperienceSection0 />
        <MyExperienceSection1 />
      </div>
    </div>
  );
}
