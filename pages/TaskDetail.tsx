import { TASKS_DATA, getTaskWorkState, setTaskWorkState, subscribeTaskStore } from "../components/TaskCard";
import { AlertCircle, ArrowLeft, Award, Bug, Building2, Calendar, CheckCircle2, ClipboardCheck, Clock, DollarSign, Eye, FileCheck2, FileText, Loader2, RotateCcw, ShieldCheck, Sparkles, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { Textarea } from "../components/ui/textarea";

function TaskDetailSection0() {
  const BUGS_REPORTED = [
    "The date picker lets users pick dates in the past.",
    "The guest count field accepts 0, or can be left empty.",
    'The phone number field accepts any text, such as "abc".',
    "Clicking Submit twice sends the booking twice.",
    "Errors only appear after the page reloads, with no message next to the field.",
  ];

  const EVALUATION_CATEGORIES = [
    {
      id: "reproduce",
      label: "Reproduce first",
      keywords: [
        "reproduce",
        "replicate",
        "recreate",
        "trigger",
        "confirm the bug",
        "see the bug",
      ],
    },
    {
      id: "validation",
      label: "Fix validation",
      keywords: [
        "min date",
        "today",
        "past date",
        "guest count",
        "1 or more",
        "at least 1",
        "phone",
        "regex",
        "pattern",
        "digits",
        "format",
      ],
    },
    {
      id: "duplicates",
      label: "Stop duplicate submits",
      keywords: [
        "disable",
        "disabled",
        "pending",
        "loading",
        "double click",
        "duplicate",
        "debounce",
        "ignore click",
      ],
    },
    {
      id: "inline_errors",
      label: "Inline errors",
      keywords: [
        "inline",
        "next to the field",
        "error message",
        "without reload",
        "no reload",
        "field error",
      ],
    },
    {
      id: "test_document",
      label: "Test and document",
      keywords: [
        "test",
        "retest",
        "re-run",
        "edge case",
        "verify",
        "summary",
        "document",
        "notes",
      ],
    },
  ];

  const PASSING_ANSWERS: [string, string, string, string, string] = [
    "First, I will reproduce and replicate each reported issue locally so I can trigger and confirm the bug behavior.",
    "Next, I will set the picker min date to today to block any past date, require guest count to be at least 1, and validate the phone format using a digits regex pattern.",
    "To stop duplicate bookings on double click, I will disable the Submit button while the request is pending or loading.",
    "I will prevent full-page reload and render an inline error message next to the field without reload whenever validation fails.",
    "Finally, I will retest every edge case to verify the fixes work and write a concise fix summary in the notes document.",
  ];

  const FAILING_ANSWERS: [string, string, string, string, string] = [
    "I will open the project files and look through the booking form code.",
    "I will update the inputs so users enter valid information into the form.",
    "I will fix the submit button behavior so it works properly when clicked.",
    "I will make sure the errors show up nicely on the screen for users.",
    "I will check everything one more time before sending in my final work.",
  ];

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [, setTick] = useState(0);

  useEffect(() => {
    return subscribeTaskStore(() => setTick((t) => t + 1));
  }, []);

  const currentTask = TASKS_DATA.find((t) => t.id === id) || TASKS_DATA[0];
  const workState = getTaskWorkState(currentTask.id);
  const skillCheck = workState.skillCheck;

  const evaluateResponses = (
    responses: [string, string, string, string, string]
  ) => {
    const combined = responses.join(" ").toLowerCase();
    return EVALUATION_CATEGORIES.map((cat) => {
      const matchCount = cat.keywords.filter((kw) =>
        combined.includes(kw.toLowerCase())
      ).length;
      return { ...cat, matchCount, matched: matchCount >= 2 };
    });
  };

  const getFeedbackForScore = (score: number) => {
    if (score === 5) return "Excellent. Specific, testable steps.";
    if (score === 4) return "Strong answer. Minor detail missing.";
    if (score === 3) return "Partly there. Review and try again.";
    return "Too general. Be specific.";
  };

  const canSubmitSkillCheck = skillCheck.stepResponses.every(
    (r) => r.trim().length >= 15
  );
  const resumeStatusText = workState.resumeIncluded
    ? "included"
    : "not included";

  const handleToggleIncludeResume = (checked: boolean) => {
    setTaskWorkState(currentTask.id, (prev) => ({
      ...prev,
      resumeIncluded: checked,
      skillCheck: {
        ...prev.skillCheck,
        resumeIncluded: checked,
      },
    }));
  };

  const handleSkillStepChange = (stepIdx: number, value: string) => {
    setTaskWorkState(currentTask.id, (prev) => {
      const nextResponses: [string, string, string, string, string] = [
        ...prev.skillCheck.stepResponses,
      ] as [string, string, string, string, string];
      nextResponses[stepIdx] = value;
      return {
        ...prev,
        skillCheck: {
          ...prev.skillCheck,
          stepResponses: nextResponses,
        },
      };
    });
  };

  const handleQuickFillPassing = () => {
    setTaskWorkState(currentTask.id, (prev) => ({
      ...prev,
      skillCheck: {
        ...prev.skillCheck,
        status: "idle",
        stepResponses: [...PASSING_ANSWERS] as [
          string,
          string,
          string,
          string,
          string,
        ],
      },
    }));
  };

  const handleQuickFillFailing = () => {
    setTaskWorkState(currentTask.id, (prev) => ({
      ...prev,
      skillCheck: {
        ...prev.skillCheck,
        status: "idle",
        stepResponses: [...FAILING_ANSWERS] as [
          string,
          string,
          string,
          string,
          string,
        ],
      },
    }));
  };

  const handleSubmitSkillCheck = () => {
    if (!canSubmitSkillCheck) return;
    const results = evaluateResponses(skillCheck.stepResponses);
    const computedScore = results.filter((r) => r.matched).length;
    const isPass = computedScore >= 4;

    setTaskWorkState(currentTask.id, (prev) => ({
      ...prev,
      skillCheckPassed: isPass,
      resumeIncluded: prev.resumeIncluded,
      skillCheck: {
        ...prev.skillCheck,
        status: "reviewing",
        score: computedScore,
        skillCheckPassed: isPass,
      },
    }));

    window.setTimeout(() => {
      setTaskWorkState(currentTask.id, (prev) => ({
        ...prev,
        skillCheckPassed: isPass,
        resumeIncluded: prev.resumeIncluded,
        skillCheck: {
          ...prev.skillCheck,
          status: "evaluated",
          score: computedScore,
          skillCheckPassed: isPass,
        },
      }));
    }, 1500);
  };

  const handleTryAgainSkillCheck = () => {
    setTaskWorkState(currentTask.id, (prev) => ({
      ...prev,
      skillCheckPassed: false,
      skillCheck: {
        ...prev.skillCheck,
        status: "idle",
        score: 0,
        skillCheckPassed: false,
        taskUnlocked: false,
        stepResponses: ["", "", "", "", ""],
      },
    }));
  };

  const handleStartTaskAfterSkillCheck = () => {
    setTaskWorkState(currentTask.id, (prev) => ({
      ...prev,
      skillCheckPassed: true,
      skillCheck: {
        ...prev.skillCheck,
        taskUnlocked: true,
      },
    }));
    window.setTimeout(() => {
      const el = document.getElementById("task-workspace-card");
      if (el && el.scrollIntoView) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
  };

  const isWorkspaceUnlocked =
    !currentTask.requiresSkillCheck || skillCheck.taskUnlocked;
  const hasNotes = workState.notes.trim().length > 0;
  const canSubmit = hasNotes;

  const handleNotesChange = (value: string) => {
    setTaskWorkState(currentTask.id, (prev) => ({
      ...prev,
      notes: value,
    }));
  };

  const handleFillDemoWork = () => {
    setTaskWorkState(currentTask.id, (prev) => ({
      ...prev,
      notes:
        prev.notes.trim().length > 0 ? prev.notes : currentTask.sampleNotes,
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
    <section
      className="max-w-4xl mx-auto w-full flex flex-col gap-6"
      aria-label="Task Detail and Work"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors w-fit"
        >
          <ArrowLeft className="h-4 w-4 text-primary" />
          <span>← Back to Task Board</span>
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
                <span>
                  Task {idx + 1}: {item.pay}
                </span>
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
                <Badge
                  variant="secondary"
                  className="rounded-full text-xs font-medium px-3 py-1"
                >
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
          <div className="rounded-xl bg-muted/60 border border-border p-5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
              <FileText className="h-4 w-4 shrink-0" />
              <span>Task description</span>
            </div>
            <p className="text-sm sm:text-base text-foreground leading-relaxed font-medium">
              {currentTask.description}
            </p>
          </div>

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
                <span>
                  Deadline:{" "}
                  <strong className="text-foreground">
                    {currentTask.deadline}
                  </strong>
                </span>
              </div>
            </div>

            <div className="rounded-xl bg-muted/60 border border-border p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                <ClipboardCheck className="h-4 w-4 shrink-0" />
                <span>3 Evaluation Criteria</span>
              </div>
              <ul className="space-y-2">
                {currentTask.evaluationCriteria.map((criterion, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2.5 text-sm text-foreground"
                  >
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

      {currentTask.requiresSkillCheck && (
        <Card
          aria-label="Apply for this task"
          className="rounded-2xl bg-card border-2 border-primary/25 shadow-sm overflow-hidden"
        >
          <CardHeader className="p-6 sm:p-8 pb-4 space-y-2 bg-secondary/40 border-b border-border">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <CardTitle className="text-xl sm:text-2xl font-heading font-bold text-foreground">
                Apply for this task
              </CardTitle>
              {skillCheck.taskUnlocked && (
                <span className="bg-accent text-accent-foreground border border-emerald-500/30 rounded-full px-3 py-1 text-xs font-semibold inline-flex items-center gap-1.5 self-start sm:self-auto">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Skill Check passed. Task unlocked.
                </span>
              )}
            </div>
          </CardHeader>

          <CardContent className="p-6 sm:p-8 space-y-6">
            {/* Top of the card: Resume row */}
            <div className="rounded-xl border border-border bg-muted/40 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-secondary text-primary flex items-center justify-center shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold text-foreground">
                      Maya_Resume.pdf
                    </span>
                    <span className="bg-accent text-accent-foreground border border-emerald-500/30 rounded-full px-2.5 py-0.5 text-xs font-semibold">
                      Uploaded
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Last updated Nov 2026
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Checkbox
                  id="include-resume-checkbox"
                  checked={workState.resumeIncluded}
                  onCheckedChange={(checked) =>
                    handleToggleIncludeResume(Boolean(checked))
                  }
                />
                <Label
                  htmlFor="include-resume-checkbox"
                  className="text-sm font-semibold text-foreground cursor-pointer"
                >
                  Include my resume
                </Label>
              </div>
            </div>

            <Separator />

            {/* Below it, the Skill Check */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <h3 className="text-lg sm:text-xl font-heading font-bold text-foreground">
                  Skill Check: Fix 5 Bugs in a Booking Form
                </h3>
                <p className="text-sm text-foreground font-medium">
                  NorthPeak Apps&apos; booking form has these 5 reported bugs:
                </p>
              </div>

              <ol className="space-y-2 rounded-xl bg-muted/60 border border-border p-4 sm:p-5">
                {BUGS_REPORTED.map((bug, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2.5 text-sm text-foreground"
                  >
                    <span className="font-bold text-primary shrink-0">
                      {index + 1}.
                    </span>
                    <span className="leading-snug">{bug}</span>
                  </li>
                ))}
              </ol>
            </div>

            {skillCheck.status === "idle" && (
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <p className="text-sm sm:text-base font-semibold text-foreground">
                    In 5 steps, describe how you would find and fix these bugs, and how you would confirm they are fixed. Write one or two sentences per step.
                  </p>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={handleQuickFillPassing}
                      className="rounded-xl text-xs font-semibold"
                    >
                      <Sparkles className="h-3.5 w-3.5 mr-1.5 text-primary" />
                      Fill Passing (5/5)
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleQuickFillFailing}
                      className="rounded-xl text-xs font-medium"
                    >
                      Fill Vague
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {[0, 1, 2, 3, 4].map((idx) => {
                    const val = skillCheck.stepResponses[idx] || "";
                    const charCount = val.trim().length;
                    const meetsMin = charCount >= 15;
                    const inputId = `skill-step-${idx + 1}`;
                    return (
                      <div
                        key={inputId}
                        className="rounded-xl border border-border bg-muted/30 p-4 space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <Label
                            htmlFor={inputId}
                            className="text-sm font-bold text-foreground"
                          >
                            Step {idx + 1}
                          </Label>
                          <span
                            className={`text-xs font-medium ${
                              meetsMin
                                ? "text-accent-foreground"
                                : "text-muted-foreground"
                            }`}
                          >
                            {charCount}/15+ chars {meetsMin ? "✓" : ""}
                          </span>
                        </div>
                        <Textarea
                          id={inputId}
                          rows={2}
                          value={val}
                          onChange={(e) =>
                            handleSkillStepChange(idx, e.target.value)
                          }
                          placeholder={`Step ${idx + 1}...`}
                          className="rounded-lg bg-card text-sm resize-y"
                        />
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2 flex justify-end">
                  <Button
                    type="button"
                    size="lg"
                    disabled={!canSubmitSkillCheck}
                    onClick={handleSubmitSkillCheck}
                    className="w-full sm:w-auto rounded-xl font-semibold shadow-sm"
                  >
                    {workState.resumeIncluded
                      ? "Apply with resume + Skill Check"
                      : "Apply with Skill Check only"}
                  </Button>
                </div>
              </div>
            )}

            {skillCheck.status === "reviewing" && (
              <div className="rounded-2xl border border-border bg-muted/40 p-8 text-center flex flex-col items-center justify-center gap-3">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
                <h4 className="text-lg font-heading font-bold text-foreground">
                  Employer is reviewing...
                </h4>
              </div>
            )}

            {skillCheck.status === "evaluated" && (
              <div
                className={`rounded-2xl border-2 p-6 space-y-4 ${
                  skillCheck.skillCheckPassed
                    ? "bg-accent/50 border-emerald-500/40"
                    : "bg-destructive/5 border-destructive/30"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`font-semibold rounded-full px-3 py-1 text-xs inline-flex items-center gap-1.5 ${
                          skillCheck.skillCheckPassed
                            ? "bg-emerald-600 text-white"
                            : "bg-destructive text-destructive-foreground"
                        }`}
                      >
                        {skillCheck.skillCheckPassed ? (
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        ) : (
                          <AlertCircle className="h-3.5 w-3.5" />
                        )}
                        Score: {skillCheck.score}/5
                      </span>

                      <span className="bg-card text-foreground border border-border font-semibold rounded-full px-3.5 py-1 text-xs inline-flex items-center gap-1.5">
                        <Eye className="h-3.5 w-3.5 text-primary shrink-0" />
                        Employer sees: Skill Check {skillCheck.score}/5 · Resume{" "}
                        {resumeStatusText}
                      </span>
                    </div>

                    <p className="text-sm sm:text-base font-semibold text-foreground">
                      {getFeedbackForScore(skillCheck.score)}
                    </p>

                    <h4 className="text-base sm:text-lg font-heading font-bold text-foreground">
                      {skillCheck.skillCheckPassed
                        ? "Skill Check passed. Task unlocked."
                        : "Not yet. Review the 5 bugs and try again."}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {skillCheck.skillCheckPassed ? (
                      <Button
                        type="button"
                        size="lg"
                        onClick={handleStartTaskAfterSkillCheck}
                        className="rounded-xl font-semibold shadow-sm"
                      >
                        Start Task
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        size="lg"
                        variant="default"
                        onClick={handleTryAgainSkillCheck}
                        className="rounded-xl font-semibold shadow-sm"
                      >
                        <RotateCcw className="h-4 w-4 mr-1.5" />
                        Try Again
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {isWorkspaceUnlocked && (
        <Card
          id="task-workspace-card"
          className="rounded-2xl bg-card border border-border shadow-sm overflow-hidden"
        >
          <CardHeader className="p-6 sm:p-8 pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <CardTitle className="text-xl sm:text-2xl font-heading font-bold text-foreground">
                  Your work
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Complete your work notes below and submit to{" "}
                  {currentTask.company}.
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
          </CardHeader>

          <CardContent className="p-6 sm:p-8 pt-2 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <Label
                htmlFor="your-work-notes"
                className="text-sm font-semibold text-foreground"
              >
                Your work
              </Label>
              <span className="text-xs text-muted-foreground">
                {hasNotes ? "Work notes ready" : "Required before submitting"}
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
          </CardContent>

          <CardFooter className="p-6 sm:p-8 pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs sm:text-sm text-muted-foreground">
              {!canSubmit ? (
                <span>
                  Fill in <strong className="text-foreground">Your work</strong>{" "}
                  notes to enable submission.
                </span>
              ) : (
                <span className="text-accent-foreground font-medium inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" />
                  Work notes entered — ready to submit!
                </span>
              )}
            </div>

            <Button
              size="lg"
              disabled={!canSubmit}
              onClick={handleSubmitToCompany}
              className="w-full sm:w-auto rounded-xl font-semibold shadow-sm"
            >
              {workState.submitted
                ? "Submitted to Company"
                : "Submit to Company"}
            </Button>
          </CardFooter>
        </Card>
      )}

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
