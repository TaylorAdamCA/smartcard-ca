import { useState } from 'react';
import { CreditCard, RotateCcw } from 'lucide-react';
import { LandingHero } from './components/LandingHero';
import { StepIndicator } from './components/StepIndicator';
import { StatementUploader } from './components/StatementUploader';
import { CategoryTuner } from './features/parsing/CategoryTuner';
import { SpendingSummary } from './components/SpendingSummary';
import { CardSelector } from './components/CardSelector';
import { ResultsView } from './components/ResultsView';
import { parseCSV, buildSpendProfile, getAmbiguousTransactions } from './features/parsing/csvParser';
import { getRecommendations } from './features/recommender/engine';
import { CARD_DATABASE } from './data/cardDatabase';
import './App.css';

// App states
const STEP = {
  LANDING: 0,
  UPLOAD: 1,
  VERIFY: 2,
  SELECT_CARD: 3,
  RESULTS: 4,
};

function App() {
  const [step, setStep] = useState(STEP.LANDING);
  const [files, setFiles] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [ambiguousTransactions, setAmbiguousTransactions] = useState([]);
  const [spendProfile, setSpendProfile] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showYear1, setShowYear1] = useState(true);

  const handleGetStarted = () => {
    setStep(STEP.UPLOAD);
  };

  const handleFilesSelected = async (newFiles) => {
    setFiles(newFiles);
  };

  const handleAnalyze = async () => {
    if (files.length === 0) return;

    setIsLoading(true);

    try {
      let allTransactions = [];
      for (const file of files) {
        if (file.name.endsWith('.csv') || file.type === 'text/csv') {
          const txns = await parseCSV(file);
          allTransactions = [...allTransactions, ...txns];
        }
      }

      setTransactions(allTransactions);

      const ambiguous = getAmbiguousTransactions(allTransactions);
      setAmbiguousTransactions(ambiguous);

      if (ambiguous.length > 0) {
        setStep(STEP.VERIFY);
      } else {
        const profile = buildSpendProfile(allTransactions);
        setSpendProfile(profile);
        setStep(STEP.SELECT_CARD);
      }
    } catch (error) {
      console.error('Error parsing files:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTunerConfirm = (corrections) => {
    const correctedTransactions = transactions.map(tx => {
      const key = tx.description.toUpperCase().trim();
      if (corrections[key]) {
        return { ...tx, category: corrections[key] };
      }
      return tx;
    });

    setTransactions(correctedTransactions);
    const profile = buildSpendProfile(correctedTransactions);
    setSpendProfile(profile);
    setStep(STEP.SELECT_CARD);
  };

  const handleSelectCard = (cardId) => {
    setCurrentCard(cardId);
  };

  const handleShowResults = () => {
    const recs = getRecommendations(spendProfile, {
      includeWelcomeBonus: showYear1,
      years: showYear1 ? 1 : 5,
      currentCardId: currentCard
    });
    setRecommendations(recs);
    setStep(STEP.RESULTS);
  };

  const handleStartOver = () => {
    setStep(STEP.LANDING);
    setFiles([]);
    setTransactions([]);
    setAmbiguousTransactions([]);
    setSpendProfile(null);
    setRecommendations([]);
    setCurrentCard(null);
  };

  const toggleValueMode = () => {
    setShowYear1(!showYear1);
    if (spendProfile) {
      const recs = getRecommendations(spendProfile, {
        includeWelcomeBonus: !showYear1,
        years: !showYear1 ? 1 : 5,
        currentCardId: currentCard
      });
      setRecommendations(recs);
    }
  };

  // Landing page - full screen
  if (step === STEP.LANDING) {
    return <LandingHero onGetStarted={handleGetStarted} />;
  }

  // Wizard flow
  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="container header-content">
          <div className="logo-section" onClick={handleStartOver}>
            <div className="logo-icon">
              <CreditCard size={16} />
            </div>
            <span className="logo-text">SmartCard CA</span>
          </div>

          <button className="start-over-btn" onClick={handleStartOver}>
            Start Over
          </button>
        </div>
      </header>

      {/* Step Indicator */}
      <StepIndicator currentStep={step} />

      {/* Main Content */}
      <main className="main-content container">

        {/* STEP 1: UPLOAD */}
        {step === STEP.UPLOAD && (
          <div className="step-content animate-fade-in">
            <h2>Upload Your Bank Statements</h2>
            <p className="step-description">
              Drop your CSV statement files below. We recommend uploading 3-12 months for accurate results.
            </p>

            <StatementUploader onFilesSelected={handleFilesSelected} />

            {files.length > 0 && (
              <button
                className="btn-primary"
                onClick={handleAnalyze}
                disabled={isLoading}
              >
                {isLoading ? 'Analyzing...' : 'Continue'}
              </button>
            )}
          </div>
        )}

        {/* STEP 2: VERIFY */}
        {step === STEP.VERIFY && (
          <div className="step-content animate-fade-in">
            <CategoryTuner
              ambiguousTransactions={ambiguousTransactions}
              onConfirm={handleTunerConfirm}
              onCancel={handleStartOver}
            />
          </div>
        )}

        {/* STEP 3: SELECT CARD */}
        {step === STEP.SELECT_CARD && spendProfile && (
          <div className="step-content animate-fade-in">
            <h2>Select Your Current Card</h2>
            <p className="step-description">
              Tell us which card you currently use so we can show you how much more you could earn.
            </p>

            <SpendingSummary spendProfile={spendProfile} />

            <CardSelector
              cards={CARD_DATABASE}
              selectedCard={currentCard}
              onSelect={handleSelectCard}
            />

            <button className="btn-primary" onClick={handleShowResults}>
              Show My Results ✨
            </button>
          </div>
        )}

        {/* STEP 4: RESULTS */}
        {step === STEP.RESULTS && spendProfile && (
          <ResultsView
            spendProfile={spendProfile}
            recommendations={recommendations}
            currentCard={currentCard}
            showYear1={showYear1}
            onToggleValueMode={toggleValueMode}
            onStartOver={handleStartOver}
          />
        )}

      </main>
    </div>
  );
}

export default App;
