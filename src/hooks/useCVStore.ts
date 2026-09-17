import { useState, useEffect } from 'react';
import { AppStep, CVData, TemplateId } from '../types/cv';
import { INITIAL_EMPTY_CV_DATA, SAMPLE_CV_DATA } from '../data/sampleData';
import { ACCENT_COLORS, AccentColor } from '../data/colors';
import {
  FONT_OPTIONS,
  FontOption,
  FONT_SIZE_OPTIONS,
  FontSizeOption,
  SpacingOption,
  SPACING_OPTIONS,
  SectionId,
  DEFAULT_SECTION_ORDER,
} from '../data/customization';

const LOCAL_STORAGE_KEY = 'riqicha_cv_draft_v1';
const STEP_STORAGE_KEY = 'riqicha_active_step_v1';
const TEMPLATE_STORAGE_KEY = 'riqicha_selected_template_v1';
const COLOR_STORAGE_KEY = 'riqicha_accent_color_v1';
const FONT_STORAGE_KEY = 'riqicha_font_id_v1';
const FONT_SIZE_STORAGE_KEY = 'riqicha_font_size_id_v1';
const SPACING_STORAGE_KEY = 'riqicha_spacing_id_v1';
const SECTION_ORDER_KEY = 'riqicha_section_order_v1';
const HIDDEN_SECTIONS_KEY = 'riqicha_hidden_sections_v1';

export function useCVStore() {
  const [activeStep, setActiveStep] = useState<AppStep>(() => {
    try {
      const savedStep = localStorage.getItem(STEP_STORAGE_KEY) as AppStep;
      if (savedStep && ['landing', 'templates', 'form', 'preview'].includes(savedStep)) {
        return savedStep;
      }
    } catch {
      // Fallback
    }
    return 'landing';
  });

  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>(() => {
    try {
      const savedTemplate = localStorage.getItem(TEMPLATE_STORAGE_KEY) as TemplateId;
      if (savedTemplate && ['classic', 'modern', 'professional', 'graduate', 'minimal'].includes(savedTemplate)) {
        return savedTemplate;
      }
    } catch {
      // Fallback
    }
    return 'classic';
  });

  const [accentColorId, setAccentColorId] = useState<string>(() => {
    try {
      const savedColor = localStorage.getItem(COLOR_STORAGE_KEY);
      if (savedColor && ACCENT_COLORS.some((c) => c.id === savedColor)) {
        return savedColor;
      }
    } catch {
      // Fallback
    }
    return 'ocean';
  });

  const [fontId, setFontId] = useState<string>(() => {
    try {
      const savedFont = localStorage.getItem(FONT_STORAGE_KEY);
      if (savedFont && FONT_OPTIONS.some((f) => f.id === savedFont)) {
        return savedFont;
      }
    } catch {
      // Fallback
    }
    return 'inter';
  });

  const [fontSizeId, setFontSizeId] = useState<'small' | 'standard' | 'large'>(() => {
    try {
      const savedSize = localStorage.getItem(FONT_SIZE_STORAGE_KEY) as any;
      if (savedSize && ['small', 'standard', 'large'].includes(savedSize)) {
        return savedSize;
      }
    } catch {
      // Fallback
    }
    return 'standard';
  });

  const [spacingId, setSpacingId] = useState<'compact' | 'balanced' | 'spacious'>(() => {
    try {
      const savedSpacing = localStorage.getItem(SPACING_STORAGE_KEY) as any;
      if (savedSpacing && ['compact', 'balanced', 'spacious'].includes(savedSpacing)) {
        return savedSpacing;
      }
    } catch {
      // Fallback
    }
    return 'balanced';
  });

  const [sectionOrder, setSectionOrder] = useState<SectionId[]>(() => {
    try {
      const savedOrder = localStorage.getItem(SECTION_ORDER_KEY);
      if (savedOrder) {
        const parsed = JSON.parse(savedOrder);
        if (Array.isArray(parsed) && parsed.length === DEFAULT_SECTION_ORDER.length) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return DEFAULT_SECTION_ORDER;
  });

  const [hiddenSections, setHiddenSections] = useState<Record<string, boolean>>(() => {
    try {
      const savedHidden = localStorage.getItem(HIDDEN_SECTIONS_KEY);
      if (savedHidden) {
        return JSON.parse(savedHidden);
      }
    } catch {
      // Fallback
    }
    return {};
  });

  const [cvData, setCvData] = useState<CVData>(() => {
    try {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedData) {
        return JSON.parse(savedData);
      }
    } catch {
      // Fallback
    }
    return INITIAL_EMPTY_CV_DATA;
  });

  const [isSaved, setIsSaved] = useState(true);

  const activeAccentColor: AccentColor =
    ACCENT_COLORS.find((c) => c.id === accentColorId) || ACCENT_COLORS[1];

  const activeFont: FontOption =
    FONT_OPTIONS.find((f) => f.id === fontId) || FONT_OPTIONS[0];

  const activeFontSize: FontSizeOption =
    FONT_SIZE_OPTIONS[fontSizeId] || FONT_SIZE_OPTIONS.standard;

  const activeSpacing: SpacingOption =
    SPACING_OPTIONS[spacingId] || SPACING_OPTIONS.balanced;

  // Auto save CV Data
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cvData));
      setIsSaved(true);
    } catch (e) {
      console.error('Failed to save draft to localStorage', e);
    }
  }, [cvData]);

  // Auto save preferences
  useEffect(() => {
    try {
      localStorage.setItem(STEP_STORAGE_KEY, activeStep);
      localStorage.setItem(TEMPLATE_STORAGE_KEY, selectedTemplate);
      localStorage.setItem(COLOR_STORAGE_KEY, accentColorId);
      localStorage.setItem(FONT_STORAGE_KEY, fontId);
      localStorage.setItem(FONT_SIZE_STORAGE_KEY, fontSizeId);
      localStorage.setItem(SPACING_STORAGE_KEY, spacingId);
      localStorage.setItem(SECTION_ORDER_KEY, JSON.stringify(sectionOrder));
      localStorage.setItem(HIDDEN_SECTIONS_KEY, JSON.stringify(hiddenSections));
    } catch (e) {
      console.error('Failed to save preferences to localStorage', e);
    }
  }, [activeStep, selectedTemplate, accentColorId, fontId, fontSizeId, spacingId, sectionOrder, hiddenSections]);

  const toggleSectionVisibility = (secId: SectionId) => {
    setHiddenSections((prev) => ({
      ...prev,
      [secId]: !prev[secId],
    }));
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sectionOrder.length) return;

    const newOrder = [...sectionOrder];
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIndex];
    newOrder[targetIndex] = temp;
    setSectionOrder(newOrder);
  };

  const resetSectionOrder = () => {
    setSectionOrder(DEFAULT_SECTION_ORDER);
  };

  const updatePersonalInfo = (field: keyof CVData['personalInfo'], value: string) => {
    setCvData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  const updateSummary = (summary: string) => {
    setCvData((prev) => ({ ...prev, summary }));
  };

  const updateCVData = <K extends keyof CVData>(key: K, value: CVData[K]) => {
    setCvData((prev) => ({ ...prev, [key]: value }));
  };

  const loadSampleData = () => {
    setCvData(SAMPLE_CV_DATA);
  };

  const clearData = () => {
    setCvData(INITIAL_EMPTY_CV_DATA);
  };

  const selectTemplateAndContinue = (templateId: TemplateId) => {
    setSelectedTemplate(templateId);
    setActiveStep('form');
  };

  return {
    activeStep,
    setActiveStep,
    selectedTemplate,
    setSelectedTemplate,
    accentColorId,
    setAccentColorId,
    activeAccentColor,
    fontId,
    setFontId,
    activeFont,
    fontSizeId,
    setFontSizeId,
    activeFontSize,
    spacingId,
    setSpacingId,
    activeSpacing,
    sectionOrder,
    setSectionOrder,
    moveSection,
    resetSectionOrder,
    hiddenSections,
    toggleSectionVisibility,
    selectTemplateAndContinue,
    cvData,
    setCvData,
    updatePersonalInfo,
    updateSummary,
    updateCVData,
    loadSampleData,
    clearData,
    isSaved,
  };
}
