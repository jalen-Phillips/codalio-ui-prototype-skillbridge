import TaskCard, { TASKS_DATA, getCompletedTasksForResume, getTaskWorkState, subscribeTaskStore } from "../components/TaskCard";
import { Award, CheckCircle2, DollarSign, ShieldCheck, Sparkles } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

function LandingSection0() {
  const navigate = useNavigate();
  const highlights = [
    "100% Paid Micro-Internships",
    "Verified Company Credentials",
    "Resume-Ready Work Experience",
  ];
  return (
    <section className="w-full" aria-label="Task Board Headline">
      <Card className="rounded-2xl bg-card border border-border shadow-sm overflow-hidden">
        <CardContent className="p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="secondary"
                className="rounded-full px-3 py-1 text-xs font-semibold inline-flex items-center gap-1.5"
              >
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Welcome back, Maya (22 • Recent Grad)
              </Badge>
              <span className="bg-accent text-accent-foreground border border-emerald-500/20 rounded-full px-3 py-1 text-xs font-medium inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" />
                Verified Paid Work Experience
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold tracking-tight text-foreground leading-tight">
              Get paid for real work. Put it on your resume.
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Pick a short, paid micro-internship from a verified company. Complete the work, get paid, and add verified paid work experience to your resume.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-foreground bg-muted/70 px-3 py-1.5 rounded-lg"
                >
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-auto shrink-0 flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-between gap-4 bg-secondary/60 border border-primary/15 rounded-2xl p-5">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-secondary-foreground/80">
                Open Paid Micro-Internships
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-heading font-extrabold text-foreground">
                  4 Tasks
                </span>
                <span className="text-sm font-semibold text-accent-foreground bg-accent px-2.5 py-0.5 rounded-md inline-flex items-center">
                  <DollarSign className="h-3.5 w-3.5" />
                  440 Total Pay
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Click any card to open the task workspace
              </p>
            </div>

            <Button
              variant="outline"
              onClick={() => navigate("/my-experience")}
              className="rounded-xl font-semibold bg-card hover:bg-muted"
            >
              <Award className="h-4 w-4 mr-2 text-primary" />
              View My Experience
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function LandingSection1() {
  const navigate = useNavigate();
  const [, setTick] = useState(0);

  useEffect(() => {
    return subscribeTaskStore(() => setTick((t) => t + 1));
  }, []);

  const completedTasks = getCompletedTasksForResume();

  const handleSelectTask = (id: string) => {
    navigate(`/tasks/${id}`);
  };
  return (
    <section aria-label="Paid Micro-Internship Cards" className="space-y-5 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
            Available Paid Micro-Internships
          </h2>
          <p className="text-sm text-muted-foreground">
            Select any task card to view deliverables, complete the work, and get paid.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-accent-foreground bg-accent border border-emerald-500/20 px-3.5 py-1.5 rounded-full self-start sm:self-auto">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>
            {completedTasks.length} of {TASKS_DATA.length} tasks completed
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TASKS_DATA.map((task) => {
          const st = getTaskWorkState(task.id);
          const hasProgress = st.notes.trim().length > 0;
          const status = st.submitted
            ? "completed"
            : hasProgress
            ? "in_progress"
            : "available";

          return (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              company={task.company}
              duration={task.duration}
              pay={task.pay}
              badgeText={task.badgeText}
              deliverable={task.deliverables}
              hasSkillCheckGateway={task.requiresSkillCheck}
              status={status}
              onSelectTask={handleSelectTask}
            />
          );
        })}
      </div>
    </section>
  );
}

export default function Landing() {
  return (
    <div className="w-full min-w-0 overflow-x-hidden">
      <div className="flex flex-col gap-6 lg:gap-8 w-full min-w-0">
        <LandingSection0 />
        <LandingSection1 />
      </div>
    </div>
  );
}
