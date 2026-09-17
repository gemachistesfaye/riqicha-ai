import React, { useEffect, useRef, useState, useCallback } from "react";
import { CVData, TemplateId } from "../../types/cv";
import { AccentColor } from "../../data/colors";
import {
  FontOption,
  FontSizeOption,
  SectionId,
} from "../../data/customization";
import { CVRenderer } from "../cv/CVRenderer";
import { X } from "lucide-react";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  cvData: CVData;
  selectedTemplate: TemplateId;
  accentColor?: AccentColor;
  activeFont?: FontOption;
  activeFontSize?: FontSizeOption;
  spacingId: "compact" | "balanced" | "spacious";
  sectionOrder: SectionId[];
  hiddenSections: Record<string, boolean>;
}

const A4_WIDTH_PX = 794;
const SIDE_PAD = 12; // px each side — lets blurred bg show through

export const PreviewModal: React.FC<PreviewModalProps> = ({
  isOpen,
  onClose,
  cvData,
  selectedTemplate,
  accentColor,
  activeFont,
  activeFontSize,
  spacingId,
  sectionOrder,
  hiddenSections,
}) => {
  const [scale, setScale] = useState(1);
  // Ref to the actual rendered CV inner element — used to measure real height
  const cvInnerRef = useRef<HTMLDivElement>(null);
  const [docHeight, setDocHeight] = useState(1200); // safe initial estimate

  const recalcScale = useCallback(() => {
    const availW = window.innerWidth - SIDE_PAD * 2;
    setScale(availW < A4_WIDTH_PX ? availW / A4_WIDTH_PX : 1);
  }, []);

  // ResizeObserver — fires whenever the CV element grows/shrinks (fonts, images, etc.)
  useEffect(() => {
    if (!isOpen || !cvInnerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const h = entry.contentRect.height;
        if (h > 0) setDocHeight(h);
      }
    });
    observer.observe(cvInnerRef.current);
    return () => observer.disconnect();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    recalcScale();
    window.addEventListener("resize", recalcScale);
    return () => window.removeEventListener("resize", recalcScale);
  }, [isOpen, recalcScale]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isMobileScaled = scale < 0.99;
  // Use actual measured height so nothing gets cut at the bottom
  const scaledDocH = Math.ceil(docHeight * scale);

  // Page break markers: one line per A4 page boundary
  const A4_PAGE_H = 1123; // px at 96dpi
  const numPages = Math.ceil(docHeight / A4_PAGE_H);
  const pageBreakPositions = Array.from({ length: numPages - 1 }, (_, i) =>
    Math.round((i + 1) * A4_PAGE_H * scale),
  );

  return (
    /* Blurred dark overlay */
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md print:hidden"
      onClick={onClose}
    >
      {/* Floating ✕ — fixed, always above CV, never overlapping */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 z-[60] flex items-center justify-center w-9 h-9 rounded-full bg-white/90 shadow-lg text-slate-700 hover:bg-white hover:text-slate-900 transition-colors"
        aria-label="Close preview"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Scrollable area — side padding so blurred bg shows through */}
      <div
        className="absolute inset-0 overflow-y-auto overflow-x-hidden pt-14 pb-8"
        style={{ paddingLeft: SIDE_PAD, paddingRight: SIDE_PAD }}
        onClick={(e) => e.stopPropagation()}
      >
        {isMobileScaled ? (
          /*
           * Scale the CV to fit mobile width.
           * Outer div height = actual measured height × scale
           * so scrolling ends exactly at the real bottom — nothing cut.
           */
          <div
            style={{
              height: scaledDocH,
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* Page break overlays */}
            {pageBreakPositions.map((top, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top,
                  left: 0,
                  right: 0,
                  zIndex: 10,
                }}
                className="flex items-center gap-2 pointer-events-none print:hidden"
              >
                <div className="flex-1 h-[2px] bg-slate-400/70" />
                <span className="text-[9px] font-semibold text-slate-500 bg-slate-200/90 px-1.5 py-0.5 rounded whitespace-nowrap">
                  Page {i + 2}
                </span>
                <div className="flex-1 h-[2px] bg-slate-400/70" />
              </div>
            ))}
            <div
              ref={cvInnerRef}
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                width: `${A4_WIDTH_PX}px`,
              }}
            >
              <CVRenderer
                data={cvData}
                templateId={selectedTemplate}
                accentColor={accentColor}
                font={activeFont}
                fontSize={activeFontSize}
                spacingId={spacingId}
                sectionOrder={sectionOrder}
                hiddenSections={hiddenSections}
              />
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <CVRenderer
              data={cvData}
              templateId={selectedTemplate}
              accentColor={accentColor}
              font={activeFont}
              fontSize={activeFontSize}
              spacingId={spacingId}
              sectionOrder={sectionOrder}
              hiddenSections={hiddenSections}
            />
          </div>
        )}
      </div>
    </div>
  );
};
