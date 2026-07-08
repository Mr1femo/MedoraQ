"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FormField,
  TextInput,
  TextArea,
  RadioGroup,
  CheckboxGroup,
  ScaleInput,
} from "@/components/form-fields";
import {
  type FormData,
  initialFormData,
  FORM_STEPS,
  MARKETING_CHANNELS,
  SERVICES,
  BUSINESS_STAGES,
  COMMUNICATION_METHODS,
  YES_NO,
} from "@/lib/form-data";
import { submitForm } from "@/lib/submit-form";

export default function DiscoveryForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const progress = (step / FORM_STEPS.length) * 100;
  const currentStep = FORM_STEPS[step - 1];

  const handleSubmit = async () => {
    setStatus("submitting");
    setErrorMessage("");
    try {
      await submitForm(data);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  if (status === "success") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-brand/15">
          <svg className="h-10 w-10 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-black">Thank you!</h2>
        <p className="mt-4 text-black/60">
          Your discovery assessment has been submitted. We&apos;ll review your responses and be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-3xl items-center gap-4 px-4 py-6 sm:px-6">
          <Image
            src="/logo.jpg"
            alt="Company logo"
            width={56}
            height={56}
            className="h-14 w-14 rounded-full object-cover ring-2 ring-brand/20"
            priority
          />
          <div>
            <h1 className="text-xl font-bold tracking-tight text-black sm:text-2xl">
              Macro Discovery Assessment
            </h1>
            <p className="text-sm text-black/50">Self-Form Assessment</p>
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-5 sm:px-6">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="font-medium text-black">
              Step {step} of {FORM_STEPS.length}
            </span>
            <span className="text-black/50">{currentStep.title}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-black/5">
            <div
              className="h-full rounded-full bg-brand transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-4 hidden gap-2 sm:flex">
            {FORM_STEPS.map((s) => (
              <div
                key={s.id}
                className={`h-1.5 flex-1 rounded-full transition-all ${
                  s.id <= step ? "bg-brand" : "bg-black/5"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-black">{currentStep.title}</h2>
          <p className="mt-1 text-black/50">{currentStep.description}</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (step < FORM_STEPS.length) {
              setStep(step + 1);
            } else {
              handleSubmit();
            }
          }}
          className="space-y-6"
        >
          {step === 1 && (
            <>
              <FormField label="Email" required>
                <TextInput
                  type="email"
                  value={data.email}
                  onChange={(v) => update("email", v)}
                  placeholder="your@email.com"
                  required
                />
              </FormField>
              <FormField label="Full Name" required>
                <TextInput
                  value={data.fullName}
                  onChange={(v) => update("fullName", v)}
                  placeholder="John Doe"
                  required
                />
              </FormField>
              <FormField label="What company do you work for?" required>
                <TextInput
                  value={data.company}
                  onChange={(v) => update("company", v)}
                  placeholder="Company name"
                  required
                />
              </FormField>
              <FormField label="What is your job title / role?" required>
                <TextInput
                  value={data.jobTitle}
                  onChange={(v) => update("jobTitle", v)}
                  placeholder="e.g. Marketing Director"
                  required
                />
              </FormField>
              <FormField label="What is your work email address?" required>
                <TextInput
                  type="email"
                  value={data.workEmail}
                  onChange={(v) => update("workEmail", v)}
                  placeholder="work@company.com"
                  required
                />
              </FormField>
              <FormField label="What is your phone number?" required>
                <TextInput
                  type="tel"
                  value={data.phone}
                  onChange={(v) => update("phone", v)}
                  placeholder="+1 (555) 000-0000"
                  required
                />
              </FormField>
              <FormField label="What is your LinkedIn profile URL?">
                <TextInput
                  type="url"
                  value={data.linkedin}
                  onChange={(v) => update("linkedin", v)}
                  placeholder="https://linkedin.com/in/..."
                />
              </FormField>
              <FormField label="What is your company's website URL?">
                <TextInput
                  type="url"
                  value={data.website}
                  onChange={(v) => update("website", v)}
                  placeholder="https://..."
                />
              </FormField>
              <div className="grid gap-6 sm:grid-cols-2">
                <FormField label="How many employees does your company have?">
                  <TextInput
                    value={data.employees}
                    onChange={(v) => update("employees", v)}
                    placeholder="e.g. 50"
                  />
                </FormField>
                <FormField label="What is your company's annual revenue?">
                  <TextInput
                    value={data.annualRevenue}
                    onChange={(v) => update("annualRevenue", v)}
                    placeholder="e.g. $1M - $5M"
                  />
                </FormField>
              </div>
              <FormField label="What industry is your company in?" required>
                <TextInput
                  value={data.industry}
                  onChange={(v) => update("industry", v)}
                  placeholder="e.g. Technology, Healthcare..."
                  required
                />
              </FormField>
            </>
          )}

          {step === 2 && (
            <>
              <FormField label="What are your primary business goals for the next 12 months?" required>
                <TextArea
                  value={data.businessGoals}
                  onChange={(v) => update("businessGoals", v)}
                  placeholder="Describe your key objectives..."
                  rows={5}
                  required
                />
              </FormField>
              <FormField label="What are the main challenges you are currently facing in your business?" required>
                <TextArea
                  value={data.challenges}
                  onChange={(v) => update("challenges", v)}
                  placeholder="Share your biggest obstacles..."
                  rows={5}
                  required
                />
              </FormField>
              <FormField label="How would you describe your current marketing strategy?" required>
                <TextArea
                  value={data.marketingStrategy}
                  onChange={(v) => update("marketingStrategy", v)}
                  placeholder="Tell us about your approach..."
                  rows={5}
                  required
                />
              </FormField>
            </>
          )}

          {step === 3 && (
            <>
              <FormField label="What marketing channels are you currently using?" hint="Select all that apply">
                <CheckboxGroup
                  options={MARKETING_CHANNELS}
                  values={data.marketingChannels}
                  onChange={(v) => update("marketingChannels", v)}
                />
              </FormField>
              <FormField label="How satisfied are you with your current marketing results?" required>
                <ScaleInput
                  min={1}
                  max={10}
                  value={data.marketingSatisfaction}
                  onChange={(v) => update("marketingSatisfaction", v)}
                  lowLabel="Not satisfied"
                  highLabel="Very satisfied"
                />
              </FormField>
              <FormField label="What is your monthly marketing budget?" required>
                <TextInput
                  value={data.monthlyBudget}
                  onChange={(v) => update("monthlyBudget", v)}
                  placeholder="e.g. $5,000"
                  required
                />
              </FormField>
              <FormField label="How did you hear about us?">
                <TextInput
                  value={data.hearAboutUs}
                  onChange={(v) => update("hearAboutUs", v)}
                  placeholder="Referral, social media, search..."
                />
              </FormField>
            </>
          )}

          {step === 4 && (
            <>
              <FormField label="What services are you interested in?" hint="Select all that apply">
                <CheckboxGroup
                  options={SERVICES}
                  values={data.servicesInterested}
                  onChange={(v) => update("servicesInterested", v)}
                />
              </FormField>
              <FormField label="What is your preferred method of communication?" required>
                <RadioGroup
                  name="communication"
                  options={COMMUNICATION_METHODS}
                  value={data.preferredCommunication}
                  onChange={(v) => update("preferredCommunication", v)}
                />
              </FormField>
              <FormField label="What is your preferred time for a discovery call?" required>
                <TextInput
                  value={data.preferredCallTime}
                  onChange={(v) => update("preferredCallTime", v)}
                  placeholder="e.g. Weekdays 10am–2pm EST"
                  required
                />
              </FormField>
              <FormField label="Do you have a specific deadline for your project?">
                <TextInput
                  value={data.projectDeadline}
                  onChange={(v) => update("projectDeadline", v)}
                  placeholder="e.g. End of Q3 2026"
                />
              </FormField>
              <FormField label="Is there anything else you would like us to know?">
                <TextArea
                  value={data.additionalInfo}
                  onChange={(v) => update("additionalInfo", v)}
                  placeholder="Any additional context..."
                  rows={4}
                />
              </FormField>
            </>
          )}

          {step === 5 && (
            <>
              <FormField label="Which best describes your current business stage?" required>
                <RadioGroup
                  name="businessStage"
                  options={BUSINESS_STAGES}
                  value={data.businessStage}
                  onChange={(v) => update("businessStage", v)}
                />
              </FormField>
              <FormField label="What is your primary target audience?" required>
                <TextInput
                  value={data.targetAudience}
                  onChange={(v) => update("targetAudience", v)}
                  placeholder="Describe your ideal customer"
                  required
                />
              </FormField>
              <FormField label="Who are your main competitors?">
                <TextInput
                  value={data.competitors}
                  onChange={(v) => update("competitors", v)}
                  placeholder="List key competitors"
                />
              </FormField>
              <FormField label="What is your unique selling proposition (USP)?" required>
                <TextArea
                  value={data.usp}
                  onChange={(v) => update("usp", v)}
                  placeholder="What sets you apart?"
                  rows={4}
                  required
                />
              </FormField>
              <FormField label="How do you currently track your marketing performance?">
                <TextArea
                  value={data.trackPerformance}
                  onChange={(v) => update("trackPerformance", v)}
                  placeholder="Tools, metrics, processes..."
                  rows={3}
                />
              </FormField>
              <FormField label="Do you have a dedicated marketing team?" required>
                <RadioGroup
                  name="marketingTeam"
                  options={YES_NO}
                  value={data.dedicatedMarketingTeam}
                  onChange={(v) => update("dedicatedMarketingTeam", v)}
                />
              </FormField>
              <FormField label="What is your biggest marketing pain point?" required>
                <TextArea
                  value={data.marketingPainPoint}
                  onChange={(v) => update("marketingPainPoint", v)}
                  placeholder="Your top frustration..."
                  rows={3}
                  required
                />
              </FormField>
              <FormField label="What is your desired outcome from working with us?" required>
                <TextArea
                  value={data.desiredOutcome}
                  onChange={(v) => update("desiredOutcome", v)}
                  placeholder="What success looks like..."
                  rows={3}
                  required
                />
              </FormField>
              <FormField label="Are you currently working with any other marketing agencies?" required>
                <RadioGroup
                  name="agencies"
                  options={YES_NO}
                  value={data.workingWithAgencies}
                  onChange={(v) => update("workingWithAgencies", v)}
                />
              </FormField>
              <FormField label="What is your budget for this specific project?" required>
                <TextInput
                  value={data.projectBudget}
                  onChange={(v) => update("projectBudget", v)}
                  placeholder="e.g. $10,000"
                  required
                />
              </FormField>
              <FormField label="How soon would you like to get started?" required>
                <TextInput
                  value={data.startTimeline}
                  onChange={(v) => update("startTimeline", v)}
                  placeholder="e.g. Within 2 weeks"
                  required
                />
              </FormField>
              <FormField label="Are you the decision-maker for this project?" required>
                <RadioGroup
                  name="decisionMaker"
                  options={YES_NO}
                  value={data.isDecisionMaker}
                  onChange={(v) => update("isDecisionMaker", v)}
                />
              </FormField>
              {data.isDecisionMaker === "No" && (
                <FormField label="If no, who is the decision-maker?">
                  <TextInput
                    value={data.decisionMakerName}
                    onChange={(v) => update("decisionMakerName", v)}
                    placeholder="Name and role"
                  />
                </FormField>
              )}
              <FormField label="Any other comments or questions?">
                <TextArea
                  value={data.otherComments}
                  onChange={(v) => update("otherComments", v)}
                  placeholder="Anything else you'd like to share..."
                  rows={4}
                />
              </FormField>
            </>
          )}

          {status === "error" && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </div>
          )}

          <div className="flex items-center justify-between gap-4 pt-4">
            <button
              type="button"
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1 || status === "submitting"}
              className="rounded-xl border border-black/10 px-6 py-3 text-sm font-medium text-black transition-all hover:border-black/20 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="rounded-xl bg-brand px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:bg-brand/90 hover:shadow-brand/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting"
                ? "Submitting..."
                : step < FORM_STEPS.length
                  ? "Continue"
                  : "Submit Assessment"}
            </button>
          </div>
        </form>
      </main>

      <footer className="border-t border-black/5 py-6 text-center text-xs text-black/40">
        Macro Discovery Self-Form Assessment
      </footer>
    </div>
  );
}
