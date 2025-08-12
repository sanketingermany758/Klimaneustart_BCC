import React from "react";

export enum StepId {
  Welcome = "welcome",
  Core = "core",
  District = "district",
  Topics = "topics",
  Initiatives = "initiatives",
  Consent = "consent",
  Reflection = "reflection",
  Metrics = "metrics",
  Summary = "summary",
}

export interface Step {
  id: StepId;
  title: string;
}

export interface SubGroupOption {
  id: string;
  name: string;
}

export interface TopicSubGroup {
  id: string;
  name: string;
  options: SubGroupOption[];
}

export interface Topic {
  id: string;
  name: string;
  icon: React.ElementType;
  subGroups?: TopicSubGroup[];
  type?: "notes" | "input";
}

export interface TopicSubGroupDetails {
  selectedOptions: string[];
  customNote: string;
}

export interface ConversationData {
  uuid?: string;
  mainInterest: string;
  livableCity: string;
  notes: string;
  audioNoteUrl?: string;
  topicDetails: {
    [mainTopicId: string]:
      | {
          [subGroupId: string]: TopicSubGroupDetails;
        }
      | TopicSubGroupDetails; // Second case for simple note topics
  };
  districts: string[];
  selectedInitiatives: string[];
  interestAreas: string[];
  interestDistricts: string[];
  shareContact: boolean;
  contactInfo: string;
  isAnonymous: boolean;
  observerReflection: string;
  surprise: string;
  numPeople: number;
  duration: number; // in minutes
  location?: string;
}

export interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
}

export interface DeineReflection {
  observerReflection: string;
  surprise: string;
  numPeople: number;
  duration: number; // in minutes
  location?: string;
}

export interface Initiative {
  id: string;
  name: string;
  description: string;
  district: string[];
  themes: string[];
  link: string;
}

export interface AppProps {
  data: ConversationData;
  updateData: (data: Partial<ConversationData>) => void;
  onNext: () => void;
  onBack: () => void;
  onRestart: () => void;
  navigateToStep?: (stepId: StepId) => void;
  step2View?: "district" | "topics";
  setStep2View?: (view: "district" | "topics") => void;
}

export interface InterestArea {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
}

// Kept for compatibility, but the manual back handling logic is mostly managed within components now.
export interface StepComponentHandle {
  handleBack: () => boolean;
}
