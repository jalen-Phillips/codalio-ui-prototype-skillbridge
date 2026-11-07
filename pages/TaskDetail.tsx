import { TASKS_DATA, getTaskWorkState, setTaskWorkState, subscribeTaskStore } from "../components/TaskCard";
import { ArrowLeft, Award, Building2, Calendar, CheckCircle2, ClipboardCheck, Clock, DollarSign, FileCheck2, ListChecks, ShieldCheck, Sparkles, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import { Progress } from "../components/ui/progress";
import { Separator } from "../components/ui/separator";
import { Textarea } from "../components/ui/textarea";

function TaskDetailSection0() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [, setTick] = useState(0);

  useEffect(() => {
    return subscribeTaskStore(() => setTick((t) => t + 1));
  }, []);

  const currentTask = TASKS_DATA.find((t) => t.id === id) || TASKS_DATA[0];
  const workState = getTaskWorkState(currentTask.id);

  const completedStepsCount = workState.checkedSteps.filter(Boolean).length;
  const progressPercent = Math.round((completedStepsCount / 4) * 100);
  const allStepsChecked = completedStepsCount === 4;
  const hasNotes = workState.notes.trim().length > 0;
  const canSubmit = allStepsChecked && hasNotes;

  const handleToggleStep = (stepIndex: number) => {
    setTaskWorkState(currentTask.id, (prev) => {
      const nextSteps: [boolean, boolean, boolean, boolean] = [...prev.checkedSteps] as [
        boolean,
        boolean,
        boolean,
        boolean
      ];
      nextSteps[stepIndex] = !nextSteps[stepIndex];
      return {
        ...prev,
        checkedSteps: nextSteps,
      };
    });
  };

  const handleNotesChange = (value: string) => {
    setTaskWorkState(currentTask.id, (prev) => ({
      ...prev,
      notes: value,
    }));
  };

  const handleFillDemoWork = () => {
    setTaskWorkState(currentTask.id, (prev) => ({
      ...prev,
      checkedSteps: [true, true, true, true],
      notes: prev.notes.trim().length > 0 ? prev.notes : currentTask.sampleNotes,
    }));
  };

  const handleSubmitToCompany = () => {
    if (!canSubmit) return;
    setTaskWorkState(currentTask.id, (prev) => ({
      ...prev,
      submitted: true,
      addedToResume: true,
    }));
  };

  const handleAddToResume = () => {
    setTaskWorkState(currentTask.id, (prev) => ({
      ...prev,
      submitted: true,
      addedToResume: true,
    }));
    navigate("/my-experience");
  };
  return (
    <section className="max-w-4xl mx-auto w-full flex flex-col gap-6" aria-label="Task Detail and Work">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors w-fit"
        >
          <ArrowLeft className="h-4 w-4 text-primary" />
          <span>Back to Task Board</span>
        </Link>

        <div className="flex flex-wrap items-center gap-1.5">
          {TASKS_DATA.map((item, idx) => {
            const isCurrent = item.id === currentTask.id;
            const itemState = getTaskWorkState(item.id);
            return (
              <Button
                key={item.id}
                variant={isCurrent ? "default" : "outline"}
                size="sm"
                onClick={() => navigate(`/tasks/${item.id}`)}
                className="rounded-lg text-xs h-8 px-2.5 font-medium"
              >
                <span>Task {idx + 1}: {item.pay}</span>
                {itemState.submitted && (
                  <CheckCircle2 className="h-3.5 w-3.5 ml-1 text-emerald-400 shrink-0" />
                )}
              </Button>
            );
          })}
        </div>
      </div>

      <Card className="rounded-2xl bg-card border border-border shadow-sm overflow-hidden">
        <CardHeader className="p-6 sm:p-8 pb-6 space-y-5">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-5">
            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="bg-accent text-accent-foreground border border-emerald-500/20 font-medium rounded-full px-3 py-1 text-xs inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                  {currentTask.badgeText}
                </span>
                <Badge variant="secondary" className="rounded-full text-xs font-medium px-3 py-1">
                  Micro-Internship (Contract, Paid)
                </Badge>
              </div>

              <CardTitle className="text-2xl sm:text-3xl font-heading font-bold text-foreground leading-tight">
                {currentTask.title}
              </CardTitle>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-1">
                <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
                  <Building2 className="h-4 w-4 text-primary shrink-0" />
                  {currentTask.company}
                </span>
                <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                  <Calendar className="h-4 w-4 text-primary shrink-0" />
                  {currentTask.deadline}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-primary shrink-0" />
                  Est. {currentTask.duration}
                </span>
              </div>
            </div>

            <div className="rounded-2xl bg-accent border-2 border-emerald-500/30 p-5 flex flex-col items-start md:items-end justify-center shrink-0 min-w-[190px]">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent-foreground/90">
                Guaranteed Pay
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl sm:text-4xl font-heading font-extrabold text-accent-foreground leading-none">
                  {currentTask.pay}
                </span>
                <span className="text-xs font-semibold text-accent-foreground">
                  USD
                </span>
              </div>
              <span className="text-xs font-medium text-accent-foreground/90 mt-1.5 inline-flex items-center gap-1">
                <DollarSign className="h-3.5 w-3.5" />
                Paid upon task approval
              </span>
            </div>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl bg-muted/60 border border-border p-5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                <FileCheck2 className="h-4 w-4 shrink-0" />
                <span>Deliverables</span>
              </div>
              <p className="text-sm sm:text-base text-foreground leading-relaxed font-medium">
                {currentTask.deliverables}
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5 text-primary" />
                <span>Deadline: <strong className="text-foreground">{currentTask.deadline}</strong></span>
              </div>
            </div>

            <div className="rounded-xl bg-muted/60 border border-border p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                <ClipboardCheck className="h-4 w-4 shrink-0" />
                <span>3 Evaluation Criteria</span>
              </div>
              <ul className="space-y-2">
                {currentTask.evaluationCriteria.map((criterion, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-sm text-foreground">
                    <span className="h-5 w-5 rounded-full bg-secondary text-secondary-foreground text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="leading-snug">{criterion}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl bg-card border border-border shadow-sm overflow-hidden">
        <CardHeader className="p-6 sm:p-8 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <CardTitle className="text-xl sm:text-2xl font-heading font-bold text-foreground flex items-center gap-2">
                <ListChecks className="h-5 w-5 text-primary" />
                <span>4-Step Task Checklist &amp; Workspace</span>
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Check off all 4 steps and complete your work notes below to unlock submission to {currentTask.company}.
              </CardDescription>
            </div>

            {!workState.submitted && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleFillDemoWork}
                className="rounded-xl text-xs font-semibold self-start sm:self-auto"
              >
                <Sparkles className="h-3.5 w-3.5 mr-1.5 text-primary" />
                Fill Sample Work
              </Button>
            )}
          </div>

          <div className="pt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-foreground">
                Checklist Progress ({completedStepsCount} of 4 steps)
              </span>
              <span className="font-heading font-bold text-primary">
                {progressPercent}%
              </span>
            </div>
            <Progress value={progressPercent} className="h-3 rounded-full" />
          </div>
        </CardHeader>

        <CardContent className="p-6 sm:p-8 pt-4 space-y-6">
          <div className="space-y-3">
            {currentTask.checklistSteps.map((stepText, idx) => {
              const isChecked = workState.checkedSteps[idx];
              const checkboxId = `step-${currentTask.id}-${idx}`;
              return (
                <div
                  key={checkboxId}
                  onClick={() => handleToggleStep(idx)}
                  className={`flex items-start gap-3.5 p-4 rounded-xl border transition-colors cursor-pointer ${
                    isChecked
                      ? "bg-accent/50 border-emerald-500/30"
                      : "bg-muted/40 border-border hover:bg-muted/80"
                  }`}
                >
                  <Checkbox
                    id={checkboxId}
                    checked={isChecked}
                    onCheckedChange={() => handleToggleStep(idx)}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-0.5"
                  />
                  <div className="flex-1 space-y-0.5">
                    <Label
                      htmlFor={checkboxId}
                      onClick={(e) => e.stopPropagation()}
                      className={`text-sm sm:text-base font-medium leading-snug cursor-pointer block ${
                        isChecked ? "text-foreground" : "text-foreground"
                      }`}
                    >
                      <span className="font-bold text-primary mr-1.5">
                        Step {idx + 1}:
                      </span>
                      {stepText}
                    </Label>
                  </div>
                  {isChecked && (
                    <span className="text-xs font-semibold text-accent-foreground bg-accent px-2.5 py-0.5 rounded-full shrink-0">
                      Done
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="space-y-2.5 pt-2">
            <div className="flex items-center justify-between gap-2">
              <Label
                htmlFor="your-work-notes"
                className="text-base font-heading font-bold text-foreground"
              >
                Your work
              </Label>
              <span className="text-xs text-muted-foreground">
                {workState.notes.trim().length > 0
                  ? "Work notes ready"
                  : "Required before submitting"}
              </span>
            </div>
            <Textarea
              id="your-work-notes"
              value={workState.notes}
              onChange={(e) => handleNotesChange(e.target.value)}
              placeholder={`Summarize your completed deliverables and paste your work notes for ${currentTask.company}...`}
              rows={4}
              className="rounded-xl resize-y text-sm sm:text-base"
            />
          </div>
        </CardContent>

        <CardFooter className="p-6 sm:p-8 pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs sm:text-sm text-muted-foreground">
            {!canSubmit ? (
              <span>
                Complete all 4 checklist steps ({completedStepsCount}/4) and fill in{" "}
                <strong className="text-foreground">Your work</strong> notes to enable submission.
              </span>
            ) : (
              <span className="text-accent-foreground font-medium inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" />
                All 4 steps checked and work notes entered — ready to submit!
              </span>
            )}
          </div>

          <Button
            size="lg"
            disabled={!canSubmit}
            onClick={handleSubmitToCompany}
            className="w-full sm:w-auto rounded-xl font-semibold shadow-sm"
          >
            {workState.submitted ? "Submitted to Company" : "Submit to Company"}
          </Button>
        </CardFooter>
      </Card>

      {workState.submitted && (
        <Card
          aria-label="Company Verification and Approval"
          className="rounded-2xl bg-accent/60 border-2 border-emerald-500/40 shadow-md overflow-hidden"
        >
          <CardHeader className="p-6 sm:p-8 pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-emerald-600 text-white font-semibold rounded-full px-3 py-1 text-xs inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Task approved
                  </span>
                  <span className="bg-accent text-accent-foreground border border-emerald-600/30 font-semibold rounded-full px-3 py-1 text-xs inline-flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Reviewed by {currentTask.company}, verified
                  </span>
                </div>

                <CardTitle className="text-xl sm:text-2xl font-heading font-bold text-foreground pt-1">
                  Reviewed by {currentTask.company}, verified
                </CardTitle>
              </div>

              <div className="bg-accent text-accent-foreground border-2 border-emerald-600/30 rounded-xl px-4 py-2.5 inline-flex items-center gap-2 self-start sm:self-auto shadow-sm">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                <span className="text-base sm:text-lg font-heading font-extrabold">
                  Payment sent: {currentTask.pay}
                </span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 sm:p-8 pt-2 space-y-4">
            <div className="rounded-xl bg-card border border-border p-5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 text-muted-foreground/40" />
                  </div>
                  <span className="text-sm font-heading font-bold text-foreground">
                    {currentTask.rating} rating
                  </span>
                </div>
                <span className="text-xs font-semibold text-accent-foreground bg-accent px-2.5 py-1 rounded-md">
                  Task approved
                </span>
              </div>

              <blockquote className="text-sm sm:text-base font-medium text-foreground italic border-l-4 border-primary pl-3.5 py-0.5">
                &ldquo;{currentTask.feedback}&rdquo;
              </blockquote>
            </div>
          </CardContent>

          <CardFooter className="p-6 sm:p-8 pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-xs sm:text-sm font-medium text-foreground">
              This verified paid micro-internship is now ready to display on your resume.
            </p>

            <Button
              size="lg"
              onClick={handleAddToResume}
              className="w-full sm:w-auto rounded-xl font-semibold shadow-sm"
            >
              <Award className="h-4 w-4 mr-2" />
              Add to My Resume
            </Button>
          </CardFooter>
        </Card>
      )}
    </section>
  );
}

export default function TaskDetail() {
  return (
    <div className="w-full min-w-0 overflow-x-hidden">
      <div className="flex flex-col gap-6 lg:gap-8 w-full min-w-0">
        <TaskDetailSection0 />
      </div>
    </div>
  );
}
