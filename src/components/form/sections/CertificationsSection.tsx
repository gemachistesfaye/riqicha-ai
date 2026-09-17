import React from "react";
import { Certification } from "../../../types/cv";
import { FormInput } from "../FormInput";
import { FormSectionHeader } from "../FormSectionHeader";
import { Plus, Trash2, Award } from "lucide-react";

interface CertificationsSectionProps {
  certifications: Certification[];
  onChange: (certifications: Certification[]) => void;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  certifications,
  onChange,
}) => {
  const addCertification = () => {
    const newCert: Certification = {
      id: "cert-" + Date.now(),
      name: "",
      issuer: "",
      date: "",
      link: "",
    };
    onChange([...certifications, newCert]);
  };

  const removeCertification = (id: string) => {
    onChange(certifications.filter((c) => c.id !== id));
  };

  const updateItem = (
    id: string,
    field: keyof Certification,
    value: string,
  ) => {
    onChange(
      certifications.map((c) => (c.id === id ? { ...c, [field]: value } : c)),
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-subtle">
      <FormSectionHeader
        title="Certifications & Licenses"
        description="Add professional credentials, official certificates, or specialized training."
        optional
      />

      {certifications.length === 0 ? (
        <div className="text-center py-8 bg-slate-50 rounded-lg border border-dashed border-slate-300">
          <Award className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-xs font-semibold text-slate-700">
            No certifications added yet
          </p>
          <p className="text-[11px] text-slate-500 max-w-sm mx-auto mt-1 mb-4">
            Include certificates from AWS, Google, PMP, Scrum Alliance,
            Coursera, etc.
          </p>
          <button
            type="button"
            onClick={addCertification}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-lg border border-brand-200 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Certification
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {certifications.map((item, index) => (
            <div
              key={item.id}
              className="p-4 bg-slate-50/70 rounded-xl border border-slate-200 relative group transition-colors hover:border-slate-300"
            >
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px]">
                    {index + 1}
                  </span>
                  {item.name || `Certification #${index + 1}`}
                </span>
                <button
                  type="button"
                  onClick={() => removeCertification(item.id)}
                  className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Remove
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Certification Name"
                  placeholder="e.g. AWS Certified Solutions Architect"
                  value={item.name}
                  onChange={(e) => updateItem(item.id, "name", e.target.value)}
                />

                <FormInput
                  label="Issuing Organization"
                  placeholder="e.g. Amazon Web Services"
                  value={item.issuer}
                  onChange={(e) =>
                    updateItem(item.id, "issuer", e.target.value)
                  }
                />

                <FormInput
                  label="Issue Date"
                  type="month"
                  value={item.date}
                  onChange={(e) => updateItem(item.id, "date", e.target.value)}
                />

                <FormInput
                  label="Credential URL / Verification Link"
                  optional
                  placeholder="e.g. aws.amazon.com/verify/abc123xyz"
                  value={item.link}
                  onChange={(e) => updateItem(item.id, "link", e.target.value)}
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addCertification}
            className="w-full py-2.5 px-4 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Another Certification
          </button>
        </div>
      )}
    </div>
  );
};
