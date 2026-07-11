export interface UploadedFile {
  name: string;
  type: string;
  size: number;
  dataUrl: string;
}

export interface FormData {
  clinicDoctorName: string;
  idealPatientDemographic: string;
  clinicServicesSpecialties: string;
  mainCompetitors: string;
  mainMarketingGoal: string;
  medicalProductDetails: string;
  socialMediaPlatforms: string[];
  videoContentImportance: string;
  monthlyMarketingBudget: string;
  newPatientsPerMonth: string;
  communicationStyle: string;
  activeOnline: string;
  hasBrandingGuidelines: string;
  brandingGuidelinesFiles: UploadedFile[];
  wantToChangeLogo: string;
  logoFiles: UploadedFile[];
  hasLogoVariations: string;
  logoVariationFiles: UploadedFile[];
  brandPersonality: string;
  contentApprover: string;
  medicalPracticeUSP: string;
  uniqueProduct: string;
  brandProductStand: string;
  likedBrandVisualStyles: string;
  aiImagePreference: string;
  dislikedPostStyles: string;
  hasProductPhotography: string;
  productPhotographyFiles: UploadedFile[];
  preferredVideoStyle: string;
  videoElementsToAvoid: string;
  logoFixedPositionInVideo: string;
  onCameraTeamMembers: string[];
  filmingParticipantsNames: string;
  comfortableOnCamera: string;
  filmingAvailableDays: string[];
  filmingLocations: string[];
  filmingLocationOther: string;
  filmingLocationAddresses: string;
  filmingNotPermittedAreas: string;
  filmingSafetyRequirements: string;
  filmingRestrictedDates: string;
  preferredFilmingHours: string;
  locationVisitBeforeFilming: string;
  locationVisitDateTime: string;
  locationVisitAccompaniment: string;
  locationsPreparedBeforeFilming: string;
  productsAvailableOnFilmingDay: string;
  additionalFilmingNotes: string;
}

export const initialFormData: FormData = {
  clinicDoctorName: "",
  idealPatientDemographic: "",
  clinicServicesSpecialties: "",
  mainCompetitors: "",
  mainMarketingGoal: "",
  medicalProductDetails: "",
  socialMediaPlatforms: [],
  videoContentImportance: "",
  monthlyMarketingBudget: "",
  newPatientsPerMonth: "",
  communicationStyle: "",
  activeOnline: "",
  hasBrandingGuidelines: "",
  brandingGuidelinesFiles: [],
  wantToChangeLogo: "",
  logoFiles: [],
  hasLogoVariations: "",
  logoVariationFiles: [],
  brandPersonality: "",
  contentApprover: "",
  medicalPracticeUSP: "",
  uniqueProduct: "",
  brandProductStand: "",
  likedBrandVisualStyles: "",
  aiImagePreference: "",
  dislikedPostStyles: "",
  hasProductPhotography: "",
  productPhotographyFiles: [],
  preferredVideoStyle: "",
  videoElementsToAvoid: "",
  logoFixedPositionInVideo: "",
  onCameraTeamMembers: [],
  filmingParticipantsNames: "",
  comfortableOnCamera: "",
  filmingAvailableDays: [],
  filmingLocations: [],
  filmingLocationOther: "",
  filmingLocationAddresses: "",
  filmingNotPermittedAreas: "",
  filmingSafetyRequirements: "",
  filmingRestrictedDates: "",
  preferredFilmingHours: "",
  locationVisitBeforeFilming: "",
  locationVisitDateTime: "",
  locationVisitAccompaniment: "",
  locationsPreparedBeforeFilming: "",
  productsAvailableOnFilmingDay: "",
  additionalFilmingNotes: "",
};

export const MARKETING_GOALS = [
  "More appointments",
  "Better image",
  "Launching a new service",
  "Awareness",
] as const;

export const SOCIAL_MEDIA_PLATFORMS = [
  "Instagram",
  "Facebook",
  "TikTok",
  "Snapchat",
  "LinkedIn",
  "X (Twitter)",
  "None of the above",
] as const;

export const MONTHLY_BUDGET_OPTIONS = [
  "Under $1,000",
  "$1,000 – $3,000",
  "$3,000 – $5,000",
  "$5,000 – $10,000",
  "Over $10,000",
  "Not sure yet",
] as const;

export const NEW_PATIENTS_OPTIONS = [
  "0 – 10",
  "11 – 25",
  "26 – 50",
  "51 – 100",
  "101 – 200",
  "200+",
] as const;

export const COMMUNICATION_STYLES = [
  "Formal / Professional",
  "Friendly / Casual",
  "Educational / Informative",
  "Inspirational / Motivational",
] as const;

export const CONTENT_APPROVERS = [
  "Doctor / Clinic Owner",
  "Marketing Manager",
  "Office Manager",
  "Administrative Staff",
  "Other",
] as const;

export const AI_IMAGE_PREFERENCES = [
  "I don't mind using AI images in designs",
  "I don't mind as long as it's not too obvious AI",
  "I don't want any AI images within the design",
] as const;

export const ON_CAMERA_ROLES = [
  "CEO / General Manager",
  "Scientific Office Manager",
  "Medical Representative",
  "Pharmacist",
  "Dermatologist / Physician",
  "Customer Service Representative",
  "Sales Representative",
] as const;

export const COMFORT_ON_CAMERA = ["Yes", "No", "Some are"] as const;

export const FILMING_DAYS = [
  "Friday",
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
] as const;

export const FILMING_LOCATIONS = [
  "Head Office",
  "Scientific Office",
  "Warehouse",
  "Storage Facility",
  "Laboratory",
  "Packaging",
  "Production Line",
  "Partner Pharmacies",
  "Partner Clinics",
  "Other",
] as const;

export const FILMING_HOURS = [
  "8:00 AM – 11:00 AM",
  "11:00 AM – 2:00 PM",
  "2:00 PM – 5:00 PM",
  "5:00 PM – 8:00 PM",
  "Flexible",
] as const;

export const YES_NO = ["Yes", "No"] as const;

export const FORM_STEPS = [
  {
    id: 1,
    title: "Clinic & Business",
    description: "Tell us about your clinic and marketing goals.",
    questions: [1, 2, 3, 4, 5],
  },
  {
    id: 2,
    title: "Products & Marketing",
    description: "Products, platforms, budget, and patient volume.",
    questions: [6, 7, 8, 9, 10],
  },
  {
    id: 3,
    title: "Branding & Positioning",
    description: "Guidelines, logo, brand personality, and positioning.",
    questions: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
  },
  {
    id: 4,
    title: "Visual Style & Content",
    description: "Visual references, AI preference, photography, and video style.",
    questions: [22, 23, 24, 25, 26, 27, 28],
  },
  {
    id: 5,
    title: "On-Camera & Schedule",
    description: "Team availability and filming days.",
    questions: [29, 30, 31, 32],
  },
  {
    id: 6,
    title: "Filming Locations",
    description: "Where filming can take place and any restrictions.",
    questions: [33, 34, 35, 36, 37],
  },
  {
    id: 7,
    title: "Filming Preparation",
    description: "Hours, site visits, and final production details.",
    questions: [38, 39, 40, 41, 42, 43, 44],
  },
] as const;

export const TOTAL_QUESTIONS = 44;

export const REQUIRED_FIELDS: (keyof FormData)[] = [
  "clinicDoctorName",
  "hasBrandingGuidelines",
  "wantToChangeLogo",
  "hasLogoVariations",
  "brandPersonality",
  "brandProductStand",
  "aiImagePreference",
  "hasProductPhotography",
  "filmingParticipantsNames",
  "comfortableOnCamera",
  "filmingLocationAddresses",
  "filmingRestrictedDates",
  "preferredFilmingHours",
  "productsAvailableOnFilmingDay",
  "additionalFilmingNotes",
];

export function validateStep(step: number, data: FormData): string | null {
  if (step === 1 && !data.clinicDoctorName.trim()) {
    return "Please enter your Clinic / Doctor Name.";
  }
  if (step === 3) {
    if (!data.hasBrandingGuidelines) {
      return "Please answer whether you have branding guidelines (question 13).";
    }
    if (data.hasBrandingGuidelines === "Yes" && data.brandingGuidelinesFiles.length === 0) {
      return "Please upload your branding guidelines (question 13).";
    }
    if (!data.wantToChangeLogo) {
      return "Please answer whether you want to change the logo (question 14).";
    }
    if (data.logoFiles.length === 0) {
      return "Please upload your logo (question 15).";
    }
    if (!data.hasLogoVariations) {
      return "Please answer whether you have logo variations (question 16).";
    }
    if (data.hasLogoVariations === "Yes" && data.logoVariationFiles.length === 0) {
      return "Please upload your logo variations (question 16).";
    }
    if (!data.brandPersonality.trim()) {
      return "Please describe your brand personality (question 17).";
    }
    if (!data.brandProductStand) {
      return "Please rate where your brand and product stand (question 21).";
    }
  }
  if (step === 4) {
    if (!data.aiImagePreference) {
      return "Please select how you feel about AI images (question 23).";
    }
    if (!data.hasProductPhotography) {
      return "Please answer whether you have professional product photography (question 25).";
    }
    if (data.hasProductPhotography === "Yes" && data.productPhotographyFiles.length === 0) {
      return "Please upload your product photography (question 25).";
    }
  }
  if (step === 5) {
    if (data.onCameraTeamMembers.length === 0) {
      return "Please select at least one team member available on camera (question 29).";
    }
    if (!data.filmingParticipantsNames.trim()) {
      return "Please provide names and job titles (question 30).";
    }
    if (!data.comfortableOnCamera) {
      return "Please answer whether participants are comfortable on camera (question 31).";
    }
    if (data.filmingAvailableDays.length === 0) {
      return "Please select at least one available filming day (question 32).";
    }
  }
  if (step === 6) {
    if (data.filmingLocations.length === 0) {
      return "Please select at least one filming location (question 33).";
    }
    if (!data.filmingLocationAddresses.trim()) {
      return "Please provide filming location addresses (question 34).";
    }
    if (!data.filmingRestrictedDates.trim()) {
      return "Please enter restricted filming dates/times (question 37).";
    }
  }
  if (step === 7) {
    if (!data.preferredFilmingHours) {
      return "Please select preferred filming hours (question 38).";
    }
    if (data.locationVisitBeforeFilming === "Yes") {
      if (!data.locationVisitDateTime.trim()) {
        return "Please provide preferred date/time for location visit (question 40).";
      }
      if (!data.locationVisitAccompaniment.trim()) {
        return "Please specify who will accompany the team (question 41).";
      }
    }
    if (!data.productsAvailableOnFilmingDay) {
      return "Please confirm product availability on filming day (question 43).";
    }
    if (!data.additionalFilmingNotes.trim()) {
      return "Please add any additional notes for the production team (question 44).";
    }
  }
  return null;
}
