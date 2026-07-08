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
  existingBranding: string;
  contentApprover: string;
  medicalPracticeUSP: string;
  uniqueProduct: string;
  brandProductStand: string;
  onCameraTeamMember: string;
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
  existingBranding: "",
  contentApprover: "",
  medicalPracticeUSP: "",
  uniqueProduct: "",
  brandProductStand: "",
  onCameraTeamMember: "",
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
  },
  {
    id: 2,
    title: "Products & Marketing",
    description: "Products, platforms, budget, and patient volume.",
  },
  {
    id: 3,
    title: "Branding & Positioning",
    description: "Communication style, branding, and what makes you unique.",
  },
  {
    id: 4,
    title: "On-Camera & Schedule",
    description: "Team availability and filming days.",
  },
  {
    id: 5,
    title: "Filming Locations",
    description: "Where filming can take place and any restrictions.",
  },
  {
    id: 6,
    title: "Filming Preparation",
    description: "Hours, site visits, and final production details.",
  },
] as const;

export const TOTAL_QUESTIONS = 33;
