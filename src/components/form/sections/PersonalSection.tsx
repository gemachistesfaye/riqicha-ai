import React from "react";
import { PersonalInfo } from "../../../types/cv";
import { FormInput } from "../FormInput";
import { FormSectionHeader } from "../FormSectionHeader";

interface PersonalSectionProps {
  data: PersonalInfo;
  onChange: (field: keyof PersonalInfo, value: string) => void;
}

export const PersonalSection: React.FC<PersonalSectionProps> = ({
  data,
  onChange,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-subtle">
      <FormSectionHeader
        title="Personal Information"
        description="Enter your contact details so employers can easily reach out to you."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="Full Name"
          placeholder="e.g. Eleanor Vance"
          value={data.fullName}
          onChange={(e) => onChange("fullName", e.target.value)}
        />

        <FormInput
          label="Professional Title"
          placeholder="e.g. Senior Software Engineer / Marketing Specialist"
          value={data.jobTitle}
          onChange={(e) => onChange("jobTitle", e.target.value)}
        />

        <FormInput
          label="Email Address"
          type="email"
          placeholder="e.g. eleanor.vance@example.com"
          value={data.email}
          onChange={(e) => onChange("email", e.target.value)}
        />

        <FormInput
          label="Phone Number"
          type="tel"
          placeholder="e.g. +1 (555) 019-2834"
          value={data.phone}
          onChange={(e) => onChange("phone", e.target.value)}
        />

        <FormInput
          label="Location (City, Country)"
          placeholder="e.g. London, UK or Remote"
          value={data.location}
          onChange={(e) => onChange("location", e.target.value)}
        />

        <FormInput
          label="LinkedIn URL"
          optional
          placeholder="e.g. linkedin.com/in/eleanorvance"
          value={data.linkedin}
          onChange={(e) => onChange("linkedin", e.target.value)}
        />

        <FormInput
          label="Portfolio / Website"
          optional
          placeholder="e.g. eleanorvance.com"
          value={data.portfolio}
          onChange={(e) => onChange("portfolio", e.target.value)}
        />

        <FormInput
          label="GitHub Profile"
          optional
          placeholder="e.g. github.com/eleanorvance"
          value={data.github}
          onChange={(e) => onChange("github", e.target.value)}
        />
      </div>
    </div>
  );
};
