export interface FormData {
  age: string;
  gender: string;
  occupation: string;
  education: string;
  maritalStatus: string;
  householdIncome: string;
  householdSize: string;
  primaryLanguage: string;
  chronicHealthConditions: string;
  currentHealthStatus: string;
  exerciseFrequency: string;
  sleepHours: string;
  doYouSmoke: string;
  alcoholConsumption: string;
  preferredCommunication: string;
  preferredCommunicationOther: string;
  healthInsuranceSatisfaction: string;
  healthInformationSource: string;
  doctorCheckupFrequency: string;
  socialMediaPlatforms: string[];
  socialMediaOther: string;
  favoriteHobby: string;
  hobbyHoursPerWeek: string;
  productChoiceFactor: string;
  ownPets: string;
  preferredTransportation: string;
  transportationOther: string;
  leisureTravelFrequency: string;
  professionalOrganizations: string;
  trustedNewsSources: string[];
  trustedNewsOther: string;
  favoriteCuisine: string;
  cuisineOther: string;
  eatOutFrequency: string;
  cookOrTakeout: string;
  internetHoursPerDay: string;
  primaryInternetDevice: string;
  smartHomeDevices: string;
  shopOnlineFrequency: string;
  primaryOnlineShoppingReason: string;
}

export const initialFormData: FormData = {
  age: "",
  gender: "",
  occupation: "",
  education: "",
  maritalStatus: "",
  householdIncome: "",
  householdSize: "",
  primaryLanguage: "",
  chronicHealthConditions: "",
  currentHealthStatus: "",
  exerciseFrequency: "",
  sleepHours: "",
  doYouSmoke: "",
  alcoholConsumption: "",
  preferredCommunication: "",
  preferredCommunicationOther: "",
  healthInsuranceSatisfaction: "",
  healthInformationSource: "",
  doctorCheckupFrequency: "",
  socialMediaPlatforms: [],
  socialMediaOther: "",
  favoriteHobby: "",
  hobbyHoursPerWeek: "",
  productChoiceFactor: "",
  ownPets: "",
  preferredTransportation: "",
  transportationOther: "",
  leisureTravelFrequency: "",
  professionalOrganizations: "",
  trustedNewsSources: [],
  trustedNewsOther: "",
  favoriteCuisine: "",
  cuisineOther: "",
  eatOutFrequency: "",
  cookOrTakeout: "",
  internetHoursPerDay: "",
  primaryInternetDevice: "",
  smartHomeDevices: "",
  shopOnlineFrequency: "",
  primaryOnlineShoppingReason: "",
};

export const GENDER_OPTIONS = ["Male", "Female", "Other", "Prefer not to say"] as const;
export const MARITAL_STATUS = ["Single", "Married", "Divorced", "Widowed"] as const;
export const HOUSEHOLD_INCOME = ["<$1000", "$1000-$2000", "$2000-$3000", ">$3000"] as const;
export const YES_NO = ["Yes", "No"] as const;
export const HEALTH_STATUS = ["Excellent", "Good", "Fair", "Poor"] as const;
export const FREQUENCY_OPTIONS = ["Daily", "Weekly", "Monthly", "Rarely", "Never"] as const;
export const COMMUNICATION_OPTIONS = ["Email", "Phone", "Text", "Other"] as const;
export const HEALTH_INFO_SOURCES = [
  "Doctor / Healthcare provider",
  "Internet / Websites",
  "Friends / Family",
  "Social Media",
  "Books / Magazines",
  "Other",
] as const;
export const DOCTOR_VISIT_FREQUENCY = [
  "Monthly",
  "Every 3–6 months",
  "Yearly",
  "Rarely",
  "Never",
] as const;
export const SOCIAL_MEDIA_PLATFORMS = [
  "Facebook",
  "Instagram",
  "Twitter",
  "LinkedIn",
  "TikTok",
  "Snapchat",
  "Reddit",
  "Pinterest",
  "Other",
] as const;
export const TRANSPORTATION_OPTIONS = ["Car", "Public Transit", "Bike", "Walk", "Other"] as const;
export const PROFESSIONAL_ORG_OPTIONS = ["Yes", "No", "Maybe"] as const;
export const NEWS_SOURCES = [
  "TV News",
  "Newspaper",
  "Online News",
  "Social Media",
  "Podcasts",
  "Radio",
  "Other",
] as const;
export const CUISINE_OPTIONS = ["Italian", "Chinese", "Mexican", "Indian", "Japanese", "Other"] as const;
export const COOK_OR_TAKEOUT = ["Cook at home", "Order takeout"] as const;

export const FORM_STEPS = [
  {
    id: 1,
    title: "Personal & Demographics",
    description: "Basic information about you and your household.",
  },
  {
    id: 2,
    title: "Health & Lifestyle",
    description: "Your health habits and healthcare preferences.",
  },
  {
    id: 3,
    title: "Social & Interests",
    description: "Hobbies, media, and daily preferences.",
  },
  {
    id: 4,
    title: "Food & Digital Habits",
    description: "Eating habits and technology usage.",
  },
] as const;

export const TOTAL_QUESTIONS = 35;
