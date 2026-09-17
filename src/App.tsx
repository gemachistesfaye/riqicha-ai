import { useState } from "react";
import { useCVStore } from "./hooks/useCVStore";
import { Navbar } from "./components/layout/Navbar";
import { LandingPage } from "./components/landing/LandingPage";
import { TemplateSelection } from "./components/templates/TemplateSelection";
import { CVForm } from "./components/form/CVForm";
import { PreviewPlaceholder } from "./components/preview/PreviewPlaceholder";
import { PreviewModal } from "./components/preview/PreviewModal";
import { Toast, ToastMessage } from "./components/common/Toast";

export function App() {
  const {
    activeStep,
    setActiveStep,
    selectedTemplate,
    selectTemplateAndContinue,
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
    sectionOrder,
    moveSection,
    resetSectionOrder,
    hiddenSections,
    toggleSectionVisibility,
    cvData,
    updatePersonalInfo,
    updateSummary,
    updateCVData,
    loadSampleData,
    clearData,
    isSaved,
  } = useCVStore();

  // Mobile-only popup modal state
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Toast notification state
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const handleLoadSampleData = () => {
    loadSampleData();
    setToast({
      id: Date.now().toString(),
      type: "success",
      message: "Sample data loaded successfully!",
    });
  };

  const handleClearData = () => {
    clearData();
    setToast({
      id: Date.now().toString(),
      type: "warning",
      message: "Form draft cleared!",
    });
  };

  const sharedPreviewProps = {
    cvData,
    selectedTemplate,
    accentColorId,
    onSelectColor: setAccentColorId,
    accentColor: activeAccentColor,
    fontId,
    onSelectFont: setFontId,
    activeFont,
    fontSizeId,
    onSelectFontSize: setFontSizeId,
    activeFontSize,
    spacingId,
    onSelectSpacing: setSpacingId,
    sectionOrder,
    onMoveSection: moveSection,
    onResetOrder: resetSectionOrder,
    hiddenSections,
    onToggleSection: toggleSectionVisibility,
    onChangeTemplateClick: () => setActiveStep("templates"),
    onSelectTemplate: (tmplId: typeof selectedTemplate) =>
      selectTemplateAndContinue(tmplId),
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-brand-100 selection:text-brand-900">
      <Navbar
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        onLoadSampleData={handleLoadSampleData}
        onClearData={handleClearData}
      />

      <main className="flex-1 flex flex-col">
        {activeStep === "landing" && (
          <LandingPage
            onStart={() => setActiveStep("templates")}
            onViewTemplates={() => setActiveStep("templates")}
            onSelectTemplate={(tmplId) => selectTemplateAndContinue(tmplId)}
          />
        )}

        {activeStep === "templates" && (
          <TemplateSelection
            selectedTemplate={selectedTemplate}
            onSelectTemplate={(tmplId) => selectTemplateAndContinue(tmplId)}
            selectedColorId={accentColorId}
            onSelectColor={setAccentColorId}
            onBack={() => setActiveStep("landing")}
          />
        )}

        {activeStep === "form" && (
          <CVForm
            cvData={cvData}
            updatePersonalInfo={updatePersonalInfo}
            updateSummary={updateSummary}
            updateCVData={updateCVData}
            selectedTemplate={selectedTemplate}
            onChangeTemplateClick={() => setActiveStep("templates")}
            accentColorId={accentColorId}
            onSelectColor={setAccentColorId}
            accentColor={activeAccentColor}
            fontId={fontId}
            onSelectFont={setFontId}
            activeFont={activeFont}
            fontSizeId={fontSizeId}
            onSelectFontSize={setFontSizeId}
            activeFontSize={activeFontSize}
            spacingId={spacingId}
            onSelectSpacing={setSpacingId}
            sectionOrder={sectionOrder}
            onMoveSection={moveSection}
            onResetOrder={resetSectionOrder}
            hiddenSections={hiddenSections}
            onToggleSection={toggleSectionVisibility}
            onPreviewClick={() => setIsPreviewOpen(true)}
            onBackClick={() => setActiveStep("templates")}
            isSaved={isSaved}
          />
        )}

        {/* Desktop full preview page */}
        {activeStep === "preview" && (
          <PreviewPlaceholder
            {...sharedPreviewProps}
            onEditClick={() => setActiveStep("form")}
          />
        )}
      </main>

      {/* Mobile-only popup modal — renders over the form */}
      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        cvData={cvData}
        selectedTemplate={selectedTemplate}
        accentColor={activeAccentColor}
        activeFont={activeFont}
        activeFontSize={activeFontSize}
        spacingId={spacingId}
        sectionOrder={sectionOrder}
        hiddenSections={hiddenSections}
      />

      {/* Toast Notification */}
      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}

export default App;
