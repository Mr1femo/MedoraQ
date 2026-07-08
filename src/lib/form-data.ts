export interface FormData {
  email: string;
  fullName: string;
  company: string;
  jobTitle: string;
  workEmail: string;
  phone: string;
  linkedin: string;
  website: string;
  employees: string;
  annualRevenue: string;
  industry: string;
  businessGoals: string;
  challenges: string;
  marketingStrategy: string;
  marketingChannels: string[];
  marketingSatisfaction: string;
  monthlyBudget: string;
  hearAboutUs: string;
  servicesInterested: string[];
  preferredCommunication: string;
  preferredCallTime: string;
  projectDeadline: string;
  additionalInfo: string;
  businessStage: string;
  targetAudience: string;
  competitors: string;
  usp: string;
  trackPerformance: string;
  dedicatedMarketingTeam: string;
  marketingPainPoint: string;
  desiredOutcome: string;
  workingWithAgencies: string;
  projectBudget: string;
  startTimeline: string;
  isDecisionMaker: string;
  decisionMakerName: string;
  otherComments: string;
}

export const initialFormData: FormData = {
  email: "",
  fullName: "",
  company: "",
  jobTitle: "",
  workEmail: "",
  phone: "",
  linkedin: "",
  website: "",
  employees: "",
  annualRevenue: "",
  industry: "",
  businessGoals: "",
  challenges: "",
  marketingStrategy: "",
  marketingChannels: [],
  marketingSatisfaction: "",
  monthlyBudget: "",
  hearAboutUs: "",
  servicesInterested: [],
  preferredCommunication: "",
  preferredCallTime: "",
  projectDeadline: "",
  additionalInfo: "",
  businessStage: "",
  targetAudience: "",
  competitors: "",
  usp: "",
  trackPerformance: "",
  dedicatedMarketingTeam: "",
  marketingPainPoint: "",
  desiredOutcome: "",
  workingWithAgencies: "",
  projectBudget: "",
  startTimeline: "",
  isDecisionMaker: "",
  decisionMakerName: "",
  otherComments: "",
};

export const MARKETING_CHANNELS = [
  "Facebook",
  "Instagram",
  "LinkedIn",
  "Twitter",
  "Google Ads",
  "SEO",
  "Content Marketing",
  "Email Marketing",
  "Other",
] as const;

export const SERVICES = [
  "Social Media Management",
  "Content Creation",
  "Paid Advertising",
  "SEO",
  "Website Design",
  "Branding",
  "Other",
] as const;

export const BUSINESS_STAGES = [
  "Idea stage",
  "MVP / Early stage",
  "Growth stage",
  "Established",
] as const;

export const COMMUNICATION_METHODS = ["Email", "Phone", "WhatsApp"] as const;

export const YES_NO = ["Yes", "No"] as const;

export const FORM_STEPS = [
  {
    id: 1,
    title: "Contact & Company",
    description: "Tell us about yourself and your organization.",
  },
  {
    id: 2,
    title: "Business Strategy",
    description: "Share your goals and current challenges.",
  },
  {
    id: 3,
    title: "Marketing",
    description: "Help us understand your marketing landscape.",
  },
  {
    id: 4,
    title: "Services & Logistics",
    description: "What you're looking for and how to reach you.",
  },
  {
    id: 5,
    title: "Deep Dive",
    description: "Final details to prepare for your discovery call.",
  },
] as const;
