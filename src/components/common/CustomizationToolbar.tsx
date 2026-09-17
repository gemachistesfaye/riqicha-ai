import React, { useState } from "react";
import {
  FONT_OPTIONS,
  FONT_SIZE_OPTIONS,
  SPACING_OPTIONS,
  SectionId,
  SECTION_METAS,
} from "../../data/customization";
import { ColorPicker } from "./ColorPicker";
import {
  Type,
  ArrowUpDown,
  EyeOff,
  ChevronDown,
  ChevronUp,
  Check,
  SlidersHorizontal,
} from "lucide-react";

interface CustomizationToolbarProps {
  fontId: string;
  onSelectFont: (fontId: string) => void;
  fontSizeId?: "small" | "standard" | "large";
  onSelectFontSize?: (sizeId: "small" | "standard" | "large") => void;
  spacingId: "compact" | "balanced" | "spacious";
  onSelectSpacing: (spacingId: "compact" | "balanced" | "spacious") => void;
  accentColorId: string;
  onSelectColor: (colorId: string) => void;
  sectionOrder: SectionId[];
  onMoveSection: (index: number, direction: "up" | "down") => void;
  onResetOrder: () => void;
  hiddenSections: Record<string, boolean>;
  onToggleSection: (secId: SectionId) => void;
}

export const CustomizationToolbar: React.FC<CustomizationToolbarProps> = ({
  fontId,
  onSelectFont,
  fontSizeId = "standard",
  onSelectFontSize,
  spacingId,
  onSelectSpacing,
  accentColorId,
  onSelectColor,
  sectionOrder,
  onMoveSection,
  onResetOrder,
  hiddenSections,
  onToggleSection,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"style" | "order" | "visibility">(
    "style",
  );

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-subtle mb-6 print:hidden">
      {/* Top Row: Accent Color Circles & "More Edit" Dropdown Button on 1 single row */}
      <div className="p-2.5 sm:p-3 flex items-center justify-between gap-2">
        {/* Accent Color Palette (Compact for mobile single-row alignment) */}
        <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200 shrink-0">
          <span className="text-[11px] font-semibold text-slate-600 hidden md:inline">
            Color:
          </span>
          <ColorPicker
            selectedColorId={accentColorId}
            onSelectColor={onSelectColor}
            size="sm"
          />
        </div>

        {/* "More Edit" / "Less Edit" Dropdown Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-xs font-bold flex items-center gap-1.5 sm:gap-2 transition-all shrink-0 whitespace-nowrap ${
            isOpen
              ? "bg-brand-700 text-white shadow-xs"
              : "bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200"
          }`}
        >
          <SlidersHorizontal
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isOpen ? "text-white" : "text-brand-600"}`}
          />
          <span>{isOpen ? "Less Edit" : "More Edit"}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform ${
              isOpen ? "rotate-180 text-white" : "text-slate-500"
            }`}
          />
        </button>
      </div>

      {/* Expanded "More Edit" Dropdown Panel */}
      {isOpen && (
        <div className="p-4 bg-slate-50/70 border-t border-slate-200/80 rounded-b-xl space-y-4">
          {/* Sub-tabs inside "More Edit" (2 on row 1, 1 on row 2 for mobile) */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
            <button
              onClick={() => setActiveTab("style")}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                activeTab === "style"
                  ? "bg-brand-700 text-white shadow-xs"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <Type className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Font & Spacing</span>
            </button>

            <button
              onClick={() => setActiveTab("order")}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                activeTab === "order"
                  ? "bg-brand-700 text-white shadow-xs"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <ArrowUpDown className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Reorder</span>
            </button>

            <button
              onClick={() => setActiveTab("visibility")}
              className={`col-span-2 sm:col-span-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                activeTab === "visibility"
                  ? "bg-brand-700 text-white shadow-xs"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <EyeOff className="w-3.5 h-3.5 shrink-0" />
              <span>Show / Hide Sections</span>
            </button>
          </div>

          {/* TAB 1: Font, Size & Spacing Density */}
          {activeTab === "style" && (
            <div className="space-y-4 pt-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Font Family Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-2">
                    Typography Font Family
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {FONT_OPTIONS.map((font) => {
                      const isSelected = fontId === font.id;
                      return (
                        <button
                          key={font.id}
                          onClick={() => onSelectFont(font.id)}
                          className={`p-2 rounded-lg border text-left text-xs transition-all flex flex-col justify-between ${
                            isSelected
                              ? "border-brand-600 bg-white ring-2 ring-brand-500/20 shadow-xs"
                              : "border-slate-200 bg-white hover:border-slate-300"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span
                              className="font-semibold text-slate-900"
                              style={{ fontFamily: font.fontFamily }}
                            >
                              {font.name}
                            </span>
                            {isSelected && (
                              <Check className="w-3.5 h-3.5 text-brand-700" />
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400 mt-1">
                            {font.category}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Font Size & Vertical Spacing */}
                <div className="space-y-4">
                  {onSelectFontSize && (
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-2">
                        Font Size / Text Scale
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(["small", "standard", "large"] as const).map(
                          (sizeKey) => {
                            const isSelected = fontSizeId === sizeKey;
                            const item = FONT_SIZE_OPTIONS[sizeKey];
                            return (
                              <button
                                key={sizeKey}
                                onClick={() => onSelectFontSize(sizeKey)}
                                className={`p-2 rounded-lg border text-center text-xs transition-all ${
                                  isSelected
                                    ? "border-brand-600 bg-white ring-2 ring-brand-500/20 font-bold text-brand-700 shadow-xs"
                                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 font-medium"
                                }`}
                              >
                                {item.name}
                              </button>
                            );
                          },
                        )}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-2">
                      Vertical Spacing Density
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["compact", "balanced", "spacious"] as const).map(
                        (spaceKey) => {
                          const isSelected = spacingId === spaceKey;
                          const item = SPACING_OPTIONS[spaceKey];
                          return (
                            <button
                              key={spaceKey}
                              onClick={() => onSelectSpacing(spaceKey)}
                              className={`p-2 rounded-lg border text-center text-xs transition-all ${
                                isSelected
                                  ? "border-brand-600 bg-white ring-2 ring-brand-500/20 font-bold text-brand-700 shadow-xs"
                                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 font-medium"
                              }`}
                            >
                              {item.name}
                            </button>
                          );
                        },
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Section Reordering */}
          {activeTab === "order" && (
            <div className="pt-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <p className="text-xs text-slate-600 leading-snug">
                  Reorder sections using Up/Down arrows. Live preview updates
                  immediately.
                </p>
                <button
                  onClick={onResetOrder}
                  className="text-xs text-brand-700 hover:underline font-semibold shrink-0 self-start sm:self-auto"
                >
                  Reset Default Order
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                {sectionOrder.map((secId, idx) => {
                  const meta = SECTION_METAS[secId];
                  return (
                    <div
                      key={secId}
                      className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 shadow-xs text-xs font-medium text-slate-800"
                    >
                      <span>
                        {idx + 1}. {meta.label}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          disabled={idx === 0}
                          onClick={() => onMoveSection(idx, "up")}
                          className="p-1 text-slate-400 hover:text-slate-800 disabled:opacity-30 rounded hover:bg-slate-100"
                          title="Move Up"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          disabled={idx === sectionOrder.length - 1}
                          onClick={() => onMoveSection(idx, "down")}
                          className="p-1 text-slate-400 hover:text-slate-800 disabled:opacity-30 rounded hover:bg-slate-100"
                          title="Move Down"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: Show / Hide Sections */}
          {activeTab === "visibility" && (
            <div className="pt-1">
              <p className="text-xs text-slate-600 mb-3">
                Toggle visibility for optional sections. Hidden sections will
                not render in the CV. Empty sections remain automatically
                hidden.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {sectionOrder.map((secId) => {
                  const meta = SECTION_METAS[secId];
                  const isHidden = !!hiddenSections[secId];

                  return (
                    <button
                      key={secId}
                      onClick={() => onToggleSection(secId)}
                      className={`p-2.5 rounded-lg border text-left text-xs font-semibold flex items-center justify-between transition-all ${
                        isHidden
                          ? "bg-slate-100 text-slate-400 border-slate-200 line-through"
                          : "bg-white text-slate-900 border-slate-300 hover:border-slate-400 shadow-xs"
                      }`}
                    >
                      <span>{meta.label}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded font-normal ${
                          isHidden
                            ? "bg-slate-200 text-slate-500"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        }`}
                      >
                        {isHidden ? "Hidden" : "Visible"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
