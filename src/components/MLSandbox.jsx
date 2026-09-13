import React, { useState } from 'react';
import { sampleNewsPresets } from '../data/portfolioData';
import { Sparkles, Bot, Newspaper, Activity, Calculator, CheckCircle2, AlertTriangle, Play, RefreshCw, BarChart2 } from 'lucide-react';
import { Client } from '@gradio/client';
import { pipeline } from '@huggingface/transformers';
// ─────────────────────────────────────────────────────────────
// REAL TRAINED MODEL — Medical Insurance Cost Linear Regression
// Feature order: ['age', 'sex', 'bmi', 'children', 'smoker', 'region']
// ─────────────────────────────────────────────────────────────
const INSURANCE_MODEL = {
  intercept: -12779.250821992382,
  coefficients: {
    age: 257.056264,
    sex: 18.7914567,
    bmi: 335.781491,
    children: 425.091456,
    smoker: 23647.8181,
    region: 271.284266
  }
};
// ── In-browser fallback model (free, no quota) ──
let nlpPipelinePromise = null;
const getNlpPipeline = () => {
  if (!nlpPipelinePromise) {
    nlpPipelinePromise = pipeline('zero-shot-classification', 'Xenova/mobilebert-uncased-mnli');
  }
  return nlpPipelinePromise;
};

const ZERO_SHOT_LABELS = ['true news', 'fake news'];

const buildResultFromScores = (text, realScore, fakeScore) => {
  const isReal = realScore >= fakeScore;
  return {
    text,
    expectedLabel: isReal ? 'Authentic / Reliable News' : 'Potential Fake / Clickbait',
    fakeScore,
    realScore,
    sentiment: isReal ? 'Objective / High Credibility' : 'Sensationalist / Low Credibility'
  };
};
// Category encodings used in your training notebook
const SEX_MAP = { male: 0, female: 1 };
const SMOKER_MAP = { no: 0, yes: 1 };
const REGION_MAP = { Southwest: 0, Southeast: 1, Northwest: 2, Northeast: 3 };
export default function MLSandbox() {
  const [activeTab, setActiveTab] = useState('nlp'); // 'nlp' or 'regression'

  // Model 1: NLP News Classifier State
  const [newsText, setNewsText] = useState(sampleNewsPresets[0].text);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [nlpResult, setNlpResult] = useState(null);

  // Model 2: Medical Insurance Regression State
  const [age, setAge] = useState(24);
  const [bmi, setBmi] = useState(23.5);
  const [isSmoker, setIsSmoker] = useState(false);
  const [dependents, setDependents] = useState(0);
  const [region, setRegion] = useState('Southwest');
  const [sex, setSex] = useState('male');

// Real regression prediction using your actual trained coefficients
  const getInsuranceBreakdown = () => {
    const c = INSURANCE_MODEL.coefficients;
    const parts = {
      intercept: INSURANCE_MODEL.intercept,
      agePart: c.age * age,
      sexPart: c.sex * SEX_MAP[sex],
      bmiPart: c.bmi * bmi,
      dependentsPart: c.children * dependents,
      smokerPart: c.smoker * SMOKER_MAP[isSmoker ? 'yes' : 'no'],
      regionPart: c.region * REGION_MAP[region]
    };
    const total =
      parts.intercept +
      parts.agePart +
      parts.sexPart +
      parts.bmiPart +
      parts.dependentsPart +
      parts.smokerPart +
      parts.regionPart;
    return { ...parts, total: Math.max(Math.round(total), 0) };
  };

  const breakdown = getInsuranceBreakdown();
  const estimatedCost = breakdown.total;

// Hybrid inference: Hugging Face Space first (accurate), in-browser model as fallback
  const runNlpClassifier = async (textToAnalyze) => {
    if (!textToAnalyze.trim()) return;
    setIsAnalyzing(true);
    try {
      // Attempt 1: live Hugging Face Space (RoBERTa, FEVER-trained)
      const client = await Client.connect('abhishek-ks-dev/fake-news-detector');
      const result = await client.predict('/fake_news_detector', { text: textToAnalyze });
      const raw = result.data[0];
      const labelMatch = raw.match(/Prediction:\s*(.+)/);
      const confMatch = raw.match(/Confidence:\s*([\d.]+)\s*%/);
      const label = labelMatch ? labelMatch[1].trim() : 'UNKNOWN';
      const confidence = confMatch ? parseFloat(confMatch[1]) : 50;

      let realScore, fakeScore, verdict, sentiment;
      if (label.includes('REAL')) {
        realScore = confidence;
        fakeScore = +(100 - confidence).toFixed(1);
        verdict = 'Authentic / Factually Supported';
        sentiment = 'Objective / High Credibility';
      } else if (label.includes('FAKE')) {
        fakeScore = confidence;
        realScore = +(100 - confidence).toFixed(1);
        verdict = 'Potential Fake / Refuted Claim';
        sentiment = 'Sensationalist / Low Credibility';
      } else {
        realScore = 50;
        fakeScore = 50;
        verdict = label;
        sentiment = 'Inconclusive / Needs Verification';
      }
      setNlpResult({ text: textToAnalyze, expectedLabel: verdict, fakeScore, realScore, sentiment });
    } catch (err) {
      if (err.message && err.message.includes('ZeroGPU')) {
        // Attempt 2: daily quota exhausted → lightweight model runs in the browser
        try {
          const classifier = await getNlpPipeline();
          const out = await classifier(textToAnalyze, ZERO_SHOT_LABELS);
          let realScore = 50, fakeScore = 50;
          out.labels.forEach((lbl, i) => {
            if (lbl === 'fake news') fakeScore = +(out.scores[i] * 100).toFixed(1);
            if (lbl === 'true news') realScore = +(out.scores[i] * 100).toFixed(1);
          });
          setNlpResult(buildResultFromScores(textToAnalyze, realScore, fakeScore));
        } catch (fallbackErr) {
          console.error('Fallback model failed:', fallbackErr);
          setNlpResult({
            text: textToAnalyze,
            expectedLabel: 'Model failed to load — check your connection and try again.',
            fakeScore: 0,
            realScore: 0,
            sentiment: 'Error'
          });
        }
      } else {
        console.error('Model call failed:', err);
        setNlpResult({
          text: textToAnalyze,
          expectedLabel: 'Model unavailable — the Space may be waking up. Wait ~30s and try again.',
          fakeScore: 0,
          realScore: 0,
          sentiment: 'Connection Error'
        });
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <section id="ml-sandbox" style={{ padding: '90px 0', position: 'relative', zIndex: 1 }}>
      <div className="container"style={{ maxWidth: '960px', margin: '0 auto' }}>
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={15} />
            <span>Interactive AI Sandbox</span>
          </div>
          <h2 className="section-title">
            Test <span className="gradient-text">Live Machine Learning</span> Models
          </h2>
          <p className="section-subtitle">
            Interact with live machine learning models built during my projects. Test a BERT-based NLP classifier for fake news detection, or explore a regression model predicting medical insurance costs based on health metrics.
          </p>
        </div>

        {/* Model Switcher Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '36px'
          }}
        >
          <button
            onClick={() => setActiveTab('nlp')}
            style={{
              background: activeTab === 'nlp' ? 'var(--accent-gradient)' : 'var(--bg-card)',
              color: activeTab === 'nlp' ? '#050b14' : 'var(--text-primary)',
              border: '1px solid ' + (activeTab === 'nlp' ? 'transparent' : 'var(--border-color)'),
              fontWeight: 700,
              fontSize: '0.95rem',
              padding: '12px 24px',
              borderRadius: '30px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.2s ease',
              boxShadow: activeTab === 'nlp' ? '0 4px 18px var(--accent-glow)' : 'none'
            }}
          >
            <Newspaper size={18} />
            <span>1. Fake News NLP Classifier</span>
          </button>

          <button
            onClick={() => setActiveTab('regression')}
            style={{
              background: activeTab === 'regression' ? 'var(--accent-gradient)' : 'var(--bg-card)',
              color: activeTab === 'regression' ? '#050b14' : 'var(--text-primary)',
              border: '1px solid ' + (activeTab === 'regression' ? 'transparent' : 'var(--border-color)'),
              fontWeight: 700,
              fontSize: '0.95rem',
              padding: '12px 24px',
              borderRadius: '30px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.2s ease',
              boxShadow: activeTab === 'regression' ? '0 4px 18px var(--accent-glow)' : 'none'
            }}
          >
            <Calculator size={18} />
            <span>2. Insurance Cost Predictor</span>
          </button>
        </div>

        {/* Model 1: NLP Classifier Container */}
        {activeTab === 'nlp' && (
          <div className="glass-card" style={{ padding: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Bot style={{ color: 'var(--accent-primary)' }} />
                  <span>BERT NLP News Classification Sandbox</span>
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: '4px' }}>
                 Hybrid inference — powered by my Hugging Face Space (RoBERTa), with an in-browser AI fallback when the daily GPU quota runs out.
                </p>
              </div>

              <span
                style={{
                  background: 'var(--accent-light)',
                  color: 'var(--accent-primary)',
                  border: '1px solid var(--accent-glow)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                ⚡ Hybrid AI: HF Space + In-Browser Model
              </span>
            </div>

            {/* Presets Row */}
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                Load Sample Presets:
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {sampleNewsPresets.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setNewsText(preset.text);
                      runNlpClassifier(preset.text);
                    }}
                    style={{
                      background: 'var(--bg-elevated)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      padding: '6px 14px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => (e.target.style.borderColor = 'var(--accent-primary)')}
                    onMouseLeave={(e) => (e.target.style.borderColor = 'var(--border-color)')}
                  >
                    Sample #{idx + 1} ({preset.expectedLabel.split('/')[0].trim()})
                  </button>
                ))}
              </div>
            </div>

            {/* Input Textarea */}
            <div style={{ marginBottom: '24px' }}>
              <textarea
                value={newsText}
                onChange={(e) => setNewsText(e.target.value)}
                placeholder="Type or paste any news article title or text snippet here..."
                rows={4}
                style={{
                  width: '100%',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '16px',
                  color: 'var(--text-primary)',
                  fontSize: '0.98rem',
                  fontFamily: 'var(--font-sans)',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Run Button */}
            <button
              onClick={() => runNlpClassifier(newsText)}
              disabled={isAnalyzing}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginBottom: '30px' }}
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw size={18} className="spin" style={{ animation: 'spin 1s linear infinite' }} />
                  <span>Analyzing... (first call may take ~30 - 60s while the Space wakes up)</span>
                </>
              ) : (
                <>
                  <Play size={18} />
                  <span>Run NLP Classification Inference</span>
                </>
              )}
            </button>

            {/* Inference Result Output Box */}
            {nlpResult && (
              <div
                style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid ' + (nlpResult.realScore >= 50 ? '#10b981' : '#ef4444'),
                  borderRadius: '16px',
                  padding: '24px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {nlpResult.realScore >= 50 ? (
                      <CheckCircle2 size={24} style={{ color: '#10b981' }} />
                    ) : (
                      <AlertTriangle size={24} style={{ color: '#ef4444' }} />
                    )}
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                        Inference Verdict
                      </div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: nlpResult.realScore >= 50 ? '#10b981' : '#ef4444' }}>
                        {nlpResult.expectedLabel}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Confidence Metric</span>
                    <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                      {nlpResult.realScore >= 50 ? nlpResult.realScore : nlpResult.fakeScore}% Confidence
                    </div>
                  </div>
                </div>

                {/* Progress Bar Visualizer */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                    <span style={{ color: '#10b981' }}>Authentic: {nlpResult.realScore}%</span>
                    <span style={{ color: '#ef4444' }}>Fake / Clickbait: {nlpResult.fakeScore}%</span>
                  </div>
                  <div style={{ height: '10px', background: '#ef4444', borderRadius: '10px', overflow: 'hidden', display: 'flex' }}>
                    <div style={{ width: `${nlpResult.realScore}%`, background: '#10b981', transition: 'width 0.5s ease' }} />
                  </div>
                </div>

                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <strong>Model Sentiment & Credibility Assessment:</strong> {nlpResult.sentiment}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Model 2: Regression Insurance Predictor Container */}
        {activeTab === 'regression' && (
          <div className="glass-card" style={{ padding: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Activity style={{ color: 'var(--accent-primary)' }} />
                  <span>Medical Insurance Expense Regression Model</span>
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: '4px' }}>
                  Supervised linear & polynomial regression predicting personal medical charges based on health metrics.
                </p>
              </div>

              <span
                style={{
                  background: 'var(--accent-light)',
                  color: 'var(--accent-primary)',
                  border: '1px solid var(--accent-glow)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                Model R² Score: 0.78
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
              {/* Sliders Input Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Age Slider */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.92rem', fontWeight: 700 }}>
                    <span>Age:</span>
                    <span style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>{age} years</span>
                  </div>
                  <input
                    type="range"
                    min="18"
                    max="65"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
                  />
                </div>
                {/* Sex Select */}
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.92rem', fontWeight: 700 }}>Sex:</label>
                  <select
                    value={sex}
                    onChange={(e) => setSex(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'var(--bg-elevated)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      padding: '10px',
                      color: 'var(--text-primary)',
                      fontWeight: 600
                    }}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                {/* BMI Slider */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.92rem', fontWeight: 700 }}>
                    <span>BMI (Body Mass Index):</span>
                    <span style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>{bmi.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="45"
                    step="0.5"
                    value={bmi}
                    onChange={(e) => setBmi(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
                  />
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal Weight' : bmi < 30 ? 'Overweight' : 'Obese (High Impact)'}
                  </div>
                </div>

                {/* Smoker Toggle */}
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontWeight: 700, fontSize: '0.95rem' }}>
                    <input
                      type="checkbox"
                      checked={isSmoker}
                      onChange={(e) => setIsSmoker(e.target.checked)}
                      style={{ width: '20px', height: '20px', accentColor: 'var(--accent-primary)' }}
                    />
                    <span>Tobacco Smoker (High Risk Factor)</span>
                  </label>
                </div>

                {/* Dependents */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.92rem', fontWeight: 700 }}>
                    <span>Number of Dependents:</span>
                    <span style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>{dependents}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    value={dependents}
                    onChange={(e) => setDependents(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
                  />
                </div>

                {/* Region Select */}
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.92rem', fontWeight: 700 }}>US Region:</label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'var(--bg-elevated)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      padding: '10px',
                      color: 'var(--text-primary)',
                      fontWeight: 600
                    }}
                  >
                    <option value="Southwest">Southwest</option>
                    <option value="Southeast">Southeast</option>
                    <option value="Northwest">Northwest</option>
                    <option value="Northeast">Northeast</option>
                  </select>
                </div>
              </div>

              {/* Output Result Column */}
              <div
                style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '16px',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Predicted Annual Medical Charge
                  </div>
                  <div
                    style={{
                      fontSize: '2.5rem',
                      fontWeight: 800,
                      color: 'var(--accent-primary)',
                      fontFamily: 'var(--font-mono)',
                      margin: '10px 0'
                    }}
                  >
                    ${estimatedCost.toLocaleString()} / yr
                  </div>

                  <div style={{ marginTop: '20px' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <BarChart2 size={16} style={{ color: 'var(--accent-primary)' }} />
                      <span>Key Cost Contributors</span>
                    </div>

                    <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.88rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Base Intercept:</span>
                        <strong style={{ color: 'var(--text-primary)' }}>${Math.round(breakdown.intercept).toLocaleString()}</strong>
                      </li>
                      <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Age ({age} yrs × $257.06):</span>
                        <strong style={{ color: 'var(--text-primary)' }}>+${Math.round(breakdown.agePart).toLocaleString()}</strong>
                      </li>
                      <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Sex ({sex === 'male' ? 'male = 0' : 'female = 1'}):</span>
                        <strong style={{ color: 'var(--text-primary)' }}>
                          {breakdown.sexPart > 0 ? `+$${Math.round(breakdown.sexPart).toLocaleString()}` : '$0'}
                        </strong>
                      </li>
                      <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>BMI Factor ({bmi} × $335.78):</span>
                        <strong style={{ color: 'var(--text-primary)' }}>+${Math.round(breakdown.bmiPart).toLocaleString()}</strong>
                      </li>
                      <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Dependents ({dependents} × $425.09):</span>
                        <strong style={{ color: 'var(--text-primary)' }}>+${Math.round(breakdown.dependentsPart).toLocaleString()}</strong>
                      </li>
                      <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Smoker Surcharge:</span>
                        <strong style={{ color: isSmoker ? '#ef4444' : 'var(--text-muted)' }}>
                          {isSmoker ? `+$${Math.round(breakdown.smokerPart).toLocaleString()}` : '$0 (Non-Smoker)'}
                        </strong>
                      </li>
                      <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Region ({region} = {REGION_MAP[region]}):</span>
                        <strong style={{ color: 'var(--text-primary)' }}>+${Math.round(breakdown.regionPart).toLocaleString()}</strong>
                      </li>
                    </ul>
                  </div>
                </div>

                <div
                  style={{
                    background: 'var(--accent-light)',
                    borderRadius: '10px',
                    padding: '12px',
                    border: '1px solid var(--accent-glow)',
                    fontSize: '0.82rem',
                    color: 'var(--text-secondary)',
                    marginTop: '20px'
                  }}
                >
                  💡 <strong>ML Insights:</strong> Predictions come from the actual trained linear regression model (R² = 0.78). Smoking status is the dominant factor, adding ~$23,648/yr — more than age, BMI, and dependents combined.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
