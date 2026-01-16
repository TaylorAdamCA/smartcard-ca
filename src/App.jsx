import { useState } from 'react';
import { ShieldCheck, Upload, BarChart3, CreditCard } from 'lucide-react';
import { StatementUploader } from './components/StatementUploader';
import { CategoryTuner } from './features/parsing/CategoryTuner';
import { parseCSV, buildSpendProfile, getAmbiguousTransactions } from './features/parsing/csvParser';
import { getRecommendations } from './features/recommender/engine';
import './App.css';

// App states
const STEP = {
  UPLOAD: 'upload',
  TUNING: 'tuning',
  RESULTS: 'results',
};

function App() {
  const [step, setStep] = useState(STEP.UPLOAD);
  const [files, setFiles] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [ambiguousTransactions, setAmbiguousTransactions] = useState([]);
  const [spendProfile, setSpendProfile] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showYear1, setShowYear1] = useState(true);

  const handleFilesSelected = async (newFiles) => {
    setFiles(newFiles);
  };

  const handleAnalyze = async () => {
    if (files.length === 0) return;

    setIsLoading(true);

    try {
      // Parse all files
      let allTransactions = [];
      for (const file of files) {
        if (file.name.endsWith('.csv') || file.type === 'text/csv') {
          const txns = await parseCSV(file);
          allTransactions = [...allTransactions, ...txns];
        }
        // TODO: Add PDF parsing
      }

      setTransactions(allTransactions);

      // Check for ambiguous transactions
      const ambiguous = getAmbiguousTransactions(allTransactions);
      setAmbiguousTransactions(ambiguous);

      if (ambiguous.length > 0) {
        setStep(STEP.TUNING);
      } else {
        // Skip tuning, go straight to results
        finalizeAnalysis(allTransactions);
      }
    } catch (error) {
      console.error('Error parsing files:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTunerConfirm = (corrections) => {
    // Apply corrections to transactions
    const correctedTransactions = transactions.map(tx => {
      const key = tx.description.toUpperCase().trim();
      if (corrections[key]) {
        return { ...tx, category: corrections[key] };
      }
      return tx;
    });

    setTransactions(correctedTransactions);
    finalizeAnalysis(correctedTransactions);
  };

  const handleTunerCancel = () => {
    setStep(STEP.UPLOAD);
    setTransactions([]);
    setAmbiguousTransactions([]);
  };

  const finalizeAnalysis = (txns) => {
    // Build spend profile
    const profile = buildSpendProfile(txns);
    setSpendProfile(profile);

    // Get recommendations
    const recs = getRecommendations(profile, {
      includeWelcomeBonus: showYear1,
      years: showYear1 ? 1 : 5
    });
    setRecommendations(recs);

    setStep(STEP.RESULTS);
  };

  const handleStartOver = () => {
    setStep(STEP.UPLOAD);
    setFiles([]);
    setTransactions([]);
    setAmbiguousTransactions([]);
    setSpendProfile(null);
    setRecommendations([]);
  };

  const toggleValueMode = () => {
    setShowYear1(!showYear1);
    // Recalculate with new settings
    if (spendProfile) {
      const recs = getRecommendations(spendProfile, {
        includeWelcomeBonus: !showYear1,
        years: !showYear1 ? 1 : 5
      });
      setRecommendations(recs);
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="container header-content">
          <div className="logo-section" onClick={handleStartOver} style={{ cursor: 'pointer' }}>
            <div className="logo-icon">
              <span>S</span>
            </div>
            <span className="logo-text">SmartCard CA</span>
          </div>

          <div className="status-section">
            <div className="badge badge-success">
              <ShieldCheck size={14} style={{ marginRight: '0.5rem' }} />
              <span>Offline Mode</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content container">

        {/* STEP: UPLOAD */}
        {step === STEP.UPLOAD && (
          <div className="hero">
            <h1 className="hero-title">
              Stop guessing. <br />
              Start optimizing.
            </h1>
            <p className="hero-subtitle">
              Upload your past statements to see exactly which Canadian credit card
              would have earned you the most money.
            </p>

            <div style={{ marginTop: '2rem' }}>
              <StatementUploader onFilesSelected={handleFilesSelected} />
            </div>

            {files.length > 0 && (
              <button
                className="btn-primary"
                onClick={handleAnalyze}
                disabled={isLoading}
                style={{ marginTop: '1.5rem' }}
              >
                {isLoading ? 'Analyzing...' : 'Analyze My Spend'}
              </button>
            )}

            <p className="trust-badge">
              100% Client-Side • No Data Leaves Your Device
            </p>
          </div>
        )}

        {/* STEP: TUNING (Category Verification) */}
        {step === STEP.TUNING && (
          <CategoryTuner
            ambiguousTransactions={ambiguousTransactions}
            onConfirm={handleTunerConfirm}
            onCancel={handleTunerCancel}
          />
        )}

        {/* STEP: RESULTS */}
        {step === STEP.RESULTS && spendProfile && (
          <div className="results-view">
            <div className="results-header">
              <h2>Your Best Cards</h2>
              <div className="toggle-container">
                <button
                  className={`toggle-btn ${showYear1 ? 'active' : ''}`}
                  onClick={() => !showYear1 && toggleValueMode()}
                >
                  Year 1 Value
                </button>
                <button
                  className={`toggle-btn ${!showYear1 ? 'active' : ''}`}
                  onClick={() => showYear1 && toggleValueMode()}
                >
                  Long-Term (5yr)
                </button>
              </div>
            </div>

            {/* Spend Summary */}
            <div className="spend-summary card">
              <h3><BarChart3 size={20} /> Your Spend Profile</h3>
              <p className="total-spend">
                Total Analyzed: <strong>${spendProfile.grandTotal.toLocaleString('en-CA', { minimumFractionDigits: 2 })}</strong>
              </p>
              <div className="category-bars">
                {Object.entries(spendProfile.categories)
                  .filter(([_, data]) => data.total > 0)
                  .sort((a, b) => b[1].total - a[1].total)
                  .map(([category, data]) => (
                    <div key={category} className="category-bar-row">
                      <span className="cat-name">{category}</span>
                      <div className="bar-container">
                        <div
                          className="bar-fill"
                          style={{ width: `${data.percentage}%` }}
                        />
                      </div>
                      <span className="cat-amount">${data.total.toLocaleString('en-CA', { minimumFractionDigits: 0 })}</span>
                    </div>
                  ))
                }
              </div>
            </div>

            {/* Recommendations */}
            <div className="recommendations-grid">
              {recommendations.map((rec, index) => (
                <div key={rec.cardId} className={`recommendation-card ${index === 0 ? 'top-pick' : ''}`}>
                  {index === 0 && <div className="top-pick-badge">🏆 Top Pick</div>}
                  <div className="card-header">
                    <CreditCard size={24} />
                    <div>
                      <h4>{rec.cardName}</h4>
                      <span className="issuer">{rec.issuer} • {rec.network}</span>
                    </div>
                  </div>
                  <div className="card-value">
                    <span className="value-label">{showYear1 ? 'Year 1' : '5-Year'} Value</span>
                    <span className="value-amount">
                      ${rec.netValue.toLocaleString('en-CA', { minimumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="card-breakdown">
                    <div className="breakdown-row">
                      <span>Annual Rewards</span>
                      <span className="positive">+${rec.annualRewards.toLocaleString('en-CA', { minimumFractionDigits: 0 })}</span>
                    </div>
                    {rec.welcomeBonusValue > 0 && showYear1 && (
                      <div className="breakdown-row">
                        <span>Welcome Bonus</span>
                        <span className="positive">+${rec.welcomeBonusValue.toLocaleString('en-CA', { minimumFractionDigits: 0 })}</span>
                      </div>
                    )}
                    <div className="breakdown-row">
                      <span>Annual Fee</span>
                      <span className="negative">-${rec.annualFee}</span>
                    </div>
                  </div>
                  <p className="card-notes">{rec.notes}</p>
                </div>
              ))}
            </div>

            <button className="btn-secondary-lg" onClick={handleStartOver}>
              Start Over
            </button>
          </div>
        )}

      </main>
    </div>
  );
}

export default App;

