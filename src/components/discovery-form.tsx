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
  SelectInput,
} from "@/components/form-fields";
import {
  type FormData,
  initialFormData,
  FORM_STEPS,
  TOTAL_QUESTIONS,
  GENDER_OPTIONS,
  MARITAL_STATUS,
  HOUSEHOLD_INCOME,
  YES_NO,
  HEALTH_STATUS,
  FREQUENCY_OPTIONS,
  COMMUNICATION_OPTIONS,
  HEALTH_INFO_SOURCES,
  DOCTOR_VISIT_FREQUENCY,
  SOCIAL_MEDIA_PLATFORMS,
  TRANSPORTATION_OPTIONS,
  PROFESSIONAL_ORG_OPTIONS,
  NEWS_SOURCES,
  CUISINE_OPTIONS,
  COOK_OR_TAKEOUT,
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
          Your responses have been submitted successfully. We&apos;ll be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
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
              Section 1 — Socio-demographic and Background
            </h1>
            <p className="text-sm text-black/50">{TOTAL_QUESTIONS} questions</p>
          </div>
        </div>
      </header>

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
              <FormField label="1. What is your age?" required>
                <TextInput
                  type="number"
                  value={data.age}
                  onChange={(v) => update("age", v)}
                  placeholder="Enter your age"
                  required
                />
              </FormField>

              <FormField label="2. What is your gender?" required>
                <RadioGroup
                  name="gender"
                  options={GENDER_OPTIONS}
                  value={data.gender}
                  onChange={(v) => update("gender", v)}
                />
              </FormField>

              <FormField label="3. What is your current occupation? (e.g., student, worker)" required>
                <TextInput
                  value={data.occupation}
                  onChange={(v) => update("occupation", v)}
                  placeholder="e.g. Student, Engineer, Teacher..."
                  required
                />
              </FormField>

              <FormField label="4. What is your highest level of education?" required>
                <TextInput
                  value={data.education}
                  onChange={(v) => update("education", v)}
                  placeholder="e.g. High school, Bachelor's, Master's..."
                  required
                />
              </FormField>

              <FormField label="5. What is your marital status?" required>
                <RadioGroup
                  name="maritalStatus"
                  options={MARITAL_STATUS}
                  value={data.maritalStatus}
                  onChange={(v) => update("maritalStatus", v)}
                />
              </FormField>

              <FormField label="6. What is your household's monthly income (in USD)?" required>
                <RadioGroup
                  name="householdIncome"
                  options={HOUSEHOLD_INCOME}
                  value={data.householdIncome}
                  onChange={(v) => update("householdIncome", v)}
                />
              </FormField>

              <FormField label="7. How many people live in your household?" required>
                <TextInput
                  type="number"
                  value={data.householdSize}
                  onChange={(v) => update("householdSize", v)}
                  placeholder="Number of people"
                  required
                />
              </FormField>

              <FormField label="8. What is your primary language spoken at home?" required>
                <TextInput
                  value={data.primaryLanguage}
                  onChange={(v) => update("primaryLanguage", v)}
                  placeholder="e.g. English, Arabic, Spanish..."
                  required
                />
              </FormField>
            </>
          )}

          {step === 2 && (
            <>
              <FormField label="9. Do you have any chronic health conditions?" required>
                <RadioGroup
                  name="chronicHealthConditions"
                  options={YES_NO}
                  value={data.chronicHealthConditions}
                  onChange={(v) => update("chronicHealthConditions", v)}
                />
              </FormField>

              <FormField label="10. What is your current health status?" required>
                <RadioGroup
                  name="currentHealthStatus"
                  options={HEALTH_STATUS}
                  value={data.currentHealthStatus}
                  onChange={(v) => update("currentHealthStatus", v)}
                />
              </FormField>

              <FormField label="11. How often do you exercise?" required>
                <RadioGroup
                  name="exerciseFrequency"
                  options={FREQUENCY_OPTIONS}
                  value={data.exerciseFrequency}
                  onChange={(v) => update("exerciseFrequency", v)}
                />
              </FormField>

              <FormField
                label="12. How many hours of sleep do you get on average per night?"
                required
              >
                <ScaleInput
                  min={1}
                  max={10}
                  value={data.sleepHours}
                  onChange={(v) => update("sleepHours", v)}
                  lowLabel="1 = Very little"
                  highLabel="10 = A lot"
                />
              </FormField>

              <FormField label="13. Do you smoke?" required>
                <RadioGroup
                  name="doYouSmoke"
                  options={YES_NO}
                  value={data.doYouSmoke}
                  onChange={(v) => update("doYouSmoke", v)}
                />
              </FormField>

              <FormField label="14. How often do you consume alcohol?" required>
                <RadioGroup
                  name="alcoholConsumption"
                  options={FREQUENCY_OPTIONS}
                  value={data.alcoholConsumption}
                  onChange={(v) => update("alcoholConsumption", v)}
                />
              </FormField>

              <FormField label="15. What is your preferred method of communication?" required>
                <RadioGroup
                  name="preferredCommunication"
                  options={COMMUNICATION_OPTIONS}
                  value={data.preferredCommunication}
                  onChange={(v) => update("preferredCommunication", v)}
                />
                {data.preferredCommunication === "Other" && (
                  <div className="mt-3">
                    <TextInput
                      value={data.preferredCommunicationOther}
                      onChange={(v) => update("preferredCommunicationOther", v)}
                      placeholder="Please specify"
                    />
                  </div>
                )}
              </FormField>

              <FormField
                label="16. How satisfied are you with your current health insurance coverage?"
                required
              >
                <ScaleInput
                  min={1}
                  max={5}
                  value={data.healthInsuranceSatisfaction}
                  onChange={(v) => update("healthInsuranceSatisfaction", v)}
                  lowLabel="1 = Very dissatisfied"
                  highLabel="5 = Very satisfied"
                />
              </FormField>

              <FormField label="17. What is your primary source of health information?" required>
                <SelectInput
                  value={data.healthInformationSource}
                  onChange={(v) => update("healthInformationSource", v)}
                  options={HEALTH_INFO_SOURCES}
                  required
                />
              </FormField>

              <FormField label="18. How often do you visit a doctor for a check-up?" required>
                <SelectInput
                  value={data.doctorCheckupFrequency}
                  onChange={(v) => update("doctorCheckupFrequency", v)}
                  options={DOCTOR_VISIT_FREQUENCY}
                  required
                />
              </FormField>
            </>
          )}

          {step === 3 && (
            <>
              <FormField
                label="19. Which of the following social media platforms do you use?"
                hint="Check all that apply"
              >
                <CheckboxGroup
                  options={SOCIAL_MEDIA_PLATFORMS}
                  values={data.socialMediaPlatforms}
                  onChange={(v) => update("socialMediaPlatforms", v)}
                />
                {data.socialMediaPlatforms.includes("Other") && (
                  <div className="mt-3">
                    <TextInput
                      value={data.socialMediaOther}
                      onChange={(v) => update("socialMediaOther", v)}
                      placeholder="Other platform(s)"
                    />
                  </div>
                )}
              </FormField>

              <FormField label="20. What is your favorite hobby or leisure activity?" required>
                <TextInput
                  value={data.favoriteHobby}
                  onChange={(v) => update("favoriteHobby", v)}
                  placeholder="Your favorite hobby"
                  required
                />
              </FormField>

              <FormField label="21. How many hours a week do you spend on your hobby?" required>
                <TextInput
                  type="number"
                  value={data.hobbyHoursPerWeek}
                  onChange={(v) => update("hobbyHoursPerWeek", v)}
                  placeholder="Hours per week"
                  required
                />
              </FormField>

              <FormField label="22. What is the most important factor when choosing a new product?" required>
                <TextInput
                  value={data.productChoiceFactor}
                  onChange={(v) => update("productChoiceFactor", v)}
                  placeholder="e.g. Price, quality, brand..."
                  required
                />
              </FormField>

              <FormField label="23. Do you own any pets?" required>
                <TextInput
                  value={data.ownPets}
                  onChange={(v) => update("ownPets", v)}
                  placeholder="e.g. Yes — 2 dogs, No..."
                  required
                />
              </FormField>

              <FormField label="24. What is your preferred mode of transportation?" required>
                <RadioGroup
                  name="preferredTransportation"
                  options={TRANSPORTATION_OPTIONS}
                  value={data.preferredTransportation}
                  onChange={(v) => update("preferredTransportation", v)}
                />
                {data.preferredTransportation === "Other" && (
                  <div className="mt-3">
                    <TextInput
                      value={data.transportationOther}
                      onChange={(v) => update("transportationOther", v)}
                      placeholder="Please specify"
                    />
                  </div>
                )}
              </FormField>

              <FormField label="25. How often do you travel for leisure?" required>
                <TextInput
                  value={data.leisureTravelFrequency}
                  onChange={(v) => update("leisureTravelFrequency", v)}
                  placeholder="e.g. Twice a year, Monthly..."
                  required
                />
              </FormField>

              <FormField label="26. Are you a member of any professional organizations?" required>
                <RadioGroup
                  name="professionalOrganizations"
                  options={PROFESSIONAL_ORG_OPTIONS}
                  value={data.professionalOrganizations}
                  onChange={(v) => update("professionalOrganizations", v)}
                />
              </FormField>

              <FormField
                label="27. Which of the following news sources do you trust?"
                hint="Check all that apply"
              >
                <CheckboxGroup
                  options={NEWS_SOURCES}
                  values={data.trustedNewsSources}
                  onChange={(v) => update("trustedNewsSources", v)}
                />
                {data.trustedNewsSources.includes("Other") && (
                  <div className="mt-3">
                    <TextInput
                      value={data.trustedNewsOther}
                      onChange={(v) => update("trustedNewsOther", v)}
                      placeholder="Other news source(s)"
                    />
                  </div>
                )}
              </FormField>
            </>
          )}

          {step === 4 && (
            <>
              <FormField label="28. What is your favorite type of cuisine?" required>
                <RadioGroup
                  name="favoriteCuisine"
                  options={CUISINE_OPTIONS}
                  value={data.favoriteCuisine}
                  onChange={(v) => update("favoriteCuisine", v)}
                />
                {data.favoriteCuisine === "Other" && (
                  <div className="mt-3">
                    <TextInput
                      value={data.cuisineOther}
                      onChange={(v) => update("cuisineOther", v)}
                      placeholder="Please specify"
                    />
                  </div>
                )}
              </FormField>

              <FormField label="29. How often do you eat out at restaurants?" required>
                <RadioGroup
                  name="eatOutFrequency"
                  options={FREQUENCY_OPTIONS}
                  value={data.eatOutFrequency}
                  onChange={(v) => update("eatOutFrequency", v)}
                />
              </FormField>

              <FormField label="30. Do you prefer to cook at home or order takeout?" required>
                <RadioGroup
                  name="cookOrTakeout"
                  options={COOK_OR_TAKEOUT}
                  value={data.cookOrTakeout}
                  onChange={(v) => update("cookOrTakeout", v)}
                />
              </FormField>

              <FormField label="31. How many hours a day do you spend on the internet?" required>
                <TextInput
                  type="number"
                  value={data.internetHoursPerDay}
                  onChange={(v) => update("internetHoursPerDay", v)}
                  placeholder="Hours per day"
                  required
                />
              </FormField>

              <FormField label="32. What is your primary device for accessing the internet?" required>
                <TextInput
                  value={data.primaryInternetDevice}
                  onChange={(v) => update("primaryInternetDevice", v)}
                  placeholder="e.g. Smartphone, Laptop, Tablet..."
                  required
                />
              </FormField>

              <FormField label="33. Do you use any smart home devices?" required>
                <RadioGroup
                  name="smartHomeDevices"
                  options={YES_NO}
                  value={data.smartHomeDevices}
                  onChange={(v) => update("smartHomeDevices", v)}
                />
              </FormField>

              <FormField label="34. How often do you shop online?" required>
                <RadioGroup
                  name="shopOnlineFrequency"
                  options={FREQUENCY_OPTIONS}
                  value={data.shopOnlineFrequency}
                  onChange={(v) => update("shopOnlineFrequency", v)}
                />
              </FormField>

              <FormField label="35. What is your primary reason for shopping online?" required>
                <TextArea
                  value={data.primaryOnlineShoppingReason}
                  onChange={(v) => update("primaryOnlineShoppingReason", v)}
                  placeholder="e.g. Convenience, better prices, wider selection..."
                  rows={4}
                  required
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
                  : "Submit"}
            </button>
          </div>
        </form>
      </main>

      <footer className="border-t border-black/5 py-6 text-center text-xs text-black/40">
        Section 1 — Socio-demographic and Background
      </footer>
    </div>
  );
}
