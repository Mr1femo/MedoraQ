"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FormField,
  TextInput,
  TextArea,
  RadioGroup,
  CheckboxGroup,
  MultiSelectPills,
  ScaleInput,
  SelectInput,
  FileUpload,
} from "@/components/form-fields";
import {
  type FormData,
  initialFormData,
  FORM_STEPS,
  TOTAL_QUESTIONS,
  validateStep,
  MARKETING_GOALS,
  SOCIAL_MEDIA_PLATFORMS,
  MONTHLY_BUDGET_OPTIONS,
  NEW_PATIENTS_OPTIONS,
  COMMUNICATION_STYLES,
  CONTENT_APPROVERS,
  AI_IMAGE_PREFERENCES,
  ON_CAMERA_ROLES,
  COMFORT_ON_CAMERA,
  FILMING_DAYS,
  FILMING_LOCATIONS,
  FILMING_HOURS,
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
          Your Medora Discovery Call form has been submitted. Our team will review your responses and be in touch soon.
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
            alt="Medora logo"
            width={56}
            height={56}
            className="h-14 w-14 rounded-full object-cover ring-2 ring-brand/20"
            priority
          />
          <div>
            <h1 className="text-xl font-bold tracking-tight text-black sm:text-2xl">
              Medora — Discovery Call Form
            </h1>
            <p className="text-sm text-black/50">
              {TOTAL_QUESTIONS} questions · <span className="text-brand">*</span> indicates required
            </p>
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
          <div className="mt-4 hidden gap-1 sm:flex">
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
            const validationError = validateStep(step, data);
            if (validationError) {
              setErrorMessage(validationError);
              return;
            }
            setErrorMessage("");
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
              <FormField label="1. Clinic / Doctor Name" required>
                <TextInput
                  value={data.clinicDoctorName}
                  onChange={(v) => update("clinicDoctorName", v)}
                  placeholder="Your clinic or doctor name"
                  required
                />
              </FormField>

              <FormField label="2. Who is your ideal patient demographic (targeted patients)?">
                <TextInput
                  value={data.idealPatientDemographic}
                  onChange={(v) => update("idealPatientDemographic", v)}
                  placeholder="Describe your target patients"
                />
              </FormField>

              <FormField label="3. What medical services or specialties does your clinic offer?">
                <TextInput
                  value={data.clinicServicesSpecialties}
                  onChange={(v) => update("clinicServicesSpecialties", v)}
                  placeholder="e.g. Dermatology, skincare, cosmetic treatments..."
                />
              </FormField>

              <FormField label="4. Who are your main competitors?">
                <TextInput
                  value={data.mainCompetitors}
                  onChange={(v) => update("mainCompetitors", v)}
                  placeholder="List your main competitors"
                />
              </FormField>

              <FormField label="5. What is your main goal from marketing?">
                <RadioGroup
                  name="mainMarketingGoal"
                  options={MARKETING_GOALS}
                  value={data.mainMarketingGoal}
                  onChange={(v) => update("mainMarketingGoal", v)}
                />
              </FormField>
            </>
          )}

          {step === 2 && (
            <>
              <FormField label="6. Add the medical details of the product/products you wish to promote.">
                <TextArea
                  value={data.medicalProductDetails}
                  onChange={(v) => update("medicalProductDetails", v)}
                  placeholder="Product names, ingredients, indications..."
                  rows={4}
                />
              </FormField>

              <FormField
                label="7. Which social media platforms are you currently prioritizing for patient engagement?"
                hint="Select all that apply"
              >
                <CheckboxGroup
                  options={SOCIAL_MEDIA_PLATFORMS}
                  values={data.socialMediaPlatforms}
                  onChange={(v) => update("socialMediaPlatforms", v)}
                />
              </FormField>

              <FormField label="8. On a scale of 1–5, how important is video content in your current marketing strategy?">
                <ScaleInput
                  min={1}
                  max={5}
                  value={data.videoContentImportance}
                  onChange={(v) => update("videoContentImportance", v)}
                  lowLabel="1 = Not important"
                  highLabel="5 = Crucial"
                />
              </FormField>

              <FormField label="9. What is your estimated monthly budget range allocated for digital marketing efforts?">
                <SelectInput
                  value={data.monthlyMarketingBudget}
                  onChange={(v) => update("monthlyMarketingBudget", v)}
                  options={MONTHLY_BUDGET_OPTIONS}
                />
              </FormField>

              <FormField label="10. On average, how many new patients do you currently receive per month?">
                <SelectInput
                  value={data.newPatientsPerMonth}
                  onChange={(v) => update("newPatientsPerMonth", v)}
                  options={NEW_PATIENTS_OPTIONS}
                />
              </FormField>
            </>
          )}

          {step === 3 && (
            <>
              <FormField label="11. What communication style do you prefer?">
                <RadioGroup
                  name="communicationStyle"
                  options={COMMUNICATION_STYLES}
                  value={data.communicationStyle}
                  onChange={(v) => update("communicationStyle", v)}
                />
              </FormField>

              <FormField label="12. Where are you currently active online?">
                <TextInput
                  value={data.activeOnline}
                  onChange={(v) => update("activeOnline", v)}
                  placeholder="Websites, social accounts, directories..."
                />
              </FormField>

              <FormField
                label="13. Do you have branding guidelines? (specific colours, fonts, style for the brand)"
                required
              >
                <RadioGroup
                  name="hasBrandingGuidelines"
                  options={YES_NO}
                  value={data.hasBrandingGuidelines}
                  onChange={(v) => update("hasBrandingGuidelines", v)}
                />
              </FormField>

              {data.hasBrandingGuidelines === "Yes" && (
                <FormField
                  label="Upload your branding guidelines"
                  required
                  hint="PDF, images, or design files"
                >
                  <FileUpload
                    files={data.brandingGuidelinesFiles}
                    onChange={(v) => update("brandingGuidelinesFiles", v)}
                    accept=".png,.jpg,.jpeg,.pdf,.ai,.psd,.svg,.webp,.doc,.docx"
                  />
                </FormField>
              )}

              <FormField label="14. Do you want to change the logo?" required>
                <RadioGroup
                  name="wantToChangeLogo"
                  options={YES_NO}
                  value={data.wantToChangeLogo}
                  onChange={(v) => update("wantToChangeLogo", v)}
                />
              </FormField>

              <FormField
                label="15. Upload your logo"
                required
                hint="PNG / JPG image, Illustrator (.ai), or Photoshop (.psd)"
              >
                <FileUpload
                  files={data.logoFiles}
                  onChange={(v) => update("logoFiles", v)}
                  accept=".png,.jpg,.jpeg,.ai,.psd,.svg,.pdf,.webp"
                />
              </FormField>

              <FormField
                label="16. Do you have logo variations? (same logo with different colours and composition)"
                required
              >
                <RadioGroup
                  name="hasLogoVariations"
                  options={YES_NO}
                  value={data.hasLogoVariations}
                  onChange={(v) => update("hasLogoVariations", v)}
                />
              </FormField>

              {data.hasLogoVariations === "Yes" && (
                <FormField label="Upload your logo variations" required>
                  <FileUpload
                    files={data.logoVariationFiles}
                    onChange={(v) => update("logoVariationFiles", v)}
                    accept=".png,.jpg,.jpeg,.ai,.psd,.svg,.pdf,.webp"
                  />
                </FormField>
              )}

              <FormField
                label="17. How would you describe your brand personality? (Minimal, luxurious, scientific, natural, playful, premium, etc.)"
                required
              >
                <TextArea
                  value={data.brandPersonality}
                  onChange={(v) => update("brandPersonality", v)}
                  placeholder="Describe your brand personality..."
                  rows={4}
                  required
                />
              </FormField>

              <FormField label="18. Who will approve the content from your side?">
                <RadioGroup
                  name="contentApprover"
                  options={CONTENT_APPROVERS}
                  value={data.contentApprover}
                  onChange={(v) => update("contentApprover", v)}
                />
              </FormField>

              <FormField label="19. What makes your medical practice unique (USP)?">
                <TextArea
                  value={data.medicalPracticeUSP}
                  onChange={(v) => update("medicalPracticeUSP", v)}
                  placeholder="Your unique selling proposition..."
                  rows={3}
                />
              </FormField>

              <FormField label="20. Do you have a unique product that no other competitors have? If yes, what is it?">
                <TextArea
                  value={data.uniqueProduct}
                  onChange={(v) => update("uniqueProduct", v)}
                  placeholder="Describe your unique product or write N/A"
                  rows={3}
                />
              </FormField>

              <FormField label="21. Where do you think your brand and product stand?" required>
                <ScaleInput
                  min={1}
                  max={10}
                  value={data.brandProductStand}
                  onChange={(v) => update("brandProductStand", v)}
                  lowLabel="1 = Lifestyle / Skincare"
                  highLabel="10 = Medical / Health"
                />
              </FormField>
            </>
          )}

          {step === 4 && (
            <>
              <FormField label="22. Are there brands whose visual style you like?">
                <TextInput
                  value={data.likedBrandVisualStyles}
                  onChange={(v) => update("likedBrandVisualStyles", v)}
                  placeholder="List brands or describe the style you like"
                />
              </FormField>

              <FormField label="23. How do you feel about AI?" required>
                <RadioGroup
                  name="aiImagePreference"
                  options={AI_IMAGE_PREFERENCES}
                  value={data.aiImagePreference}
                  onChange={(v) => update("aiImagePreference", v)}
                />
              </FormField>

              <FormField label="24. What style of posts do you not like?">
                <TextInput
                  value={data.dislikedPostStyles}
                  onChange={(v) => update("dislikedPostStyles", v)}
                  placeholder="Describe styles or approaches to avoid"
                />
              </FormField>

              <FormField label="25. Do you have professional product photography?" required>
                <RadioGroup
                  name="hasProductPhotography"
                  options={YES_NO}
                  value={data.hasProductPhotography}
                  onChange={(v) => update("hasProductPhotography", v)}
                />
              </FormField>

              {data.hasProductPhotography === "Yes" && (
                <FormField label="Upload your product photography" required>
                  <FileUpload
                    files={data.productPhotographyFiles}
                    onChange={(v) => update("productPhotographyFiles", v)}
                    accept=".png,.jpg,.jpeg,.webp,.pdf,.zip"
                    hint="Images or ZIP · max 8 MB each"
                  />
                </FormField>
              )}

              <FormField label="26. What is the preferred video style—for example, more educational and wholesome, or more trendy?">
                <TextInput
                  value={data.preferredVideoStyle}
                  onChange={(v) => update("preferredVideoStyle", v)}
                  placeholder="e.g. Educational, wholesome, trendy..."
                />
              </FormField>

              <FormField label="27. Are there any specific elements or approaches you prefer to avoid in video production?">
                <TextInput
                  value={data.videoElementsToAvoid}
                  onChange={(v) => update("videoElementsToAvoid", v)}
                  placeholder="Elements or approaches to avoid"
                />
              </FormField>

              <FormField label="28. Do you prefer having the company logo displayed in a fixed position (such as a corner) throughout the video?">
                <RadioGroup
                  name="logoFixedPositionInVideo"
                  options={YES_NO}
                  value={data.logoFixedPositionInVideo}
                  onChange={(v) => update("logoFixedPositionInVideo", v)}
                />
              </FormField>
            </>
          )}

          {step === 5 && (
            <>
              <FormField
                label="29. Which team members are available to appear on camera?"
                required
                hint="Select all that apply"
              >
                <MultiSelectPills
                  options={ON_CAMERA_ROLES}
                  values={data.onCameraTeamMembers}
                  onChange={(v) => update("onCameraTeamMembers", v)}
                />
              </FormField>

              <FormField label="30. Please provide the names and job titles of the people available for filming." required>
                <TextArea
                  value={data.filmingParticipantsNames}
                  onChange={(v) => update("filmingParticipantsNames", v)}
                  placeholder="Name — Job title (one per line)"
                  rows={4}
                  required
                />
              </FormField>

              <FormField label="31. Are all participants comfortable speaking on camera?" required>
                <RadioGroup
                  name="comfortableOnCamera"
                  options={COMFORT_ON_CAMERA}
                  value={data.comfortableOnCamera}
                  onChange={(v) => update("comfortableOnCamera", v)}
                />
              </FormField>

              <FormField label="32. Which days are available for filming?" required hint="Select all that apply">
                <MultiSelectPills
                  options={FILMING_DAYS}
                  values={data.filmingAvailableDays}
                  onChange={(v) => update("filmingAvailableDays", v)}
                />
              </FormField>
            </>
          )}

          {step === 6 && (
            <>
              <FormField label="33. Which locations are available for filming?" required hint="Select all that apply">
                <CheckboxGroup
                  options={FILMING_LOCATIONS}
                  values={data.filmingLocations}
                  onChange={(v) => update("filmingLocations", v)}
                />
                {data.filmingLocations.includes("Other") && (
                  <div className="mt-3">
                    <TextInput
                      value={data.filmingLocationOther}
                      onChange={(v) => update("filmingLocationOther", v)}
                      placeholder="Other location(s)"
                    />
                  </div>
                )}
              </FormField>

              <FormField label="34. Please provide the address of each filming location." required>
                <TextArea
                  value={data.filmingLocationAddresses}
                  onChange={(v) => update("filmingLocationAddresses", v)}
                  placeholder="Location name — Full address (one per line)"
                  rows={4}
                  required
                />
              </FormField>

              <FormField label="35. Are there any areas where filming is NOT permitted?">
                <TextArea
                  value={data.filmingNotPermittedAreas}
                  onChange={(v) => update("filmingNotPermittedAreas", v)}
                  placeholder="List restricted areas or write N/A"
                  rows={3}
                />
              </FormField>

              <FormField label="36. Are there any safety or access requirements for filming?">
                <TextArea
                  value={data.filmingSafetyRequirements}
                  onChange={(v) => update("filmingSafetyRequirements", v)}
                  placeholder="Safety protocols, access cards, PPE..."
                  rows={3}
                />
              </FormField>

              <FormField label="37. Are there any dates or times when filming is not allowed?" required>
                <TextInput
                  value={data.filmingRestrictedDates}
                  onChange={(v) => update("filmingRestrictedDates", v)}
                  placeholder="e.g. Fridays after 2pm, holidays..."
                  required
                />
              </FormField>
            </>
          )}

          {step === 7 && (
            <>
              <FormField label="38. Preferred filming hours" required>
                <RadioGroup
                  name="preferredFilmingHours"
                  options={FILMING_HOURS}
                  value={data.preferredFilmingHours}
                  onChange={(v) => update("preferredFilmingHours", v)}
                />
              </FormField>

              <FormField label="39. Can our production team visit the locations before the filming day?">
                <RadioGroup
                  name="locationVisitBeforeFilming"
                  options={YES_NO}
                  value={data.locationVisitBeforeFilming}
                  onChange={(v) => update("locationVisitBeforeFilming", v)}
                />
              </FormField>

              {data.locationVisitBeforeFilming === "Yes" && (
                <>
                  <FormField label="40. If yes, what is the preferred date and time for the location visit?" required>
                    <TextInput
                      value={data.locationVisitDateTime}
                      onChange={(v) => update("locationVisitDateTime", v)}
                      placeholder="Preferred date and time"
                      required
                    />
                  </FormField>

                  <FormField label="41. Who will accompany our team during the location visit?" required>
                    <TextInput
                      value={data.locationVisitAccompaniment}
                      onChange={(v) => update("locationVisitAccompaniment", v)}
                      placeholder="Name and role"
                      required
                    />
                  </FormField>
                </>
              )}

              <FormField label="42. Will the locations be prepared before filming?">
                <RadioGroup
                  name="locationsPreparedBeforeFilming"
                  options={YES_NO}
                  value={data.locationsPreparedBeforeFilming}
                  onChange={(v) => update("locationsPreparedBeforeFilming", v)}
                />
              </FormField>

              <FormField label="43. Will all required products be available on the filming day?" required>
                <RadioGroup
                  name="productsAvailableOnFilmingDay"
                  options={YES_NO}
                  value={data.productsAvailableOnFilmingDay}
                  onChange={(v) => update("productsAvailableOnFilmingDay", v)}
                />
              </FormField>

              <FormField label="44. Is there anything else our production team should know before filming?" required>
                <TextArea
                  value={data.additionalFilmingNotes}
                  onChange={(v) => update("additionalFilmingNotes", v)}
                  placeholder="Any additional notes or requirements..."
                  rows={5}
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

          {errorMessage && status !== "error" && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              {errorMessage}
            </div>
          )}

          <div className="flex items-center justify-between gap-4 pt-4">
            <button
              type="button"
              onClick={() => {
                setErrorMessage("");
                setStep(Math.max(1, step - 1));
              }}
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
        Medora — Discovery Call Form · All {TOTAL_QUESTIONS} questions included
      </footer>
    </div>
  );
}
