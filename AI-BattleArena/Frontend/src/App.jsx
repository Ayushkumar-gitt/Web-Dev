import React, { useState } from 'react';
import './App.css';
import axios from "axios"


export default function App() {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [battles, setBattles] = useState([]);

  // Simple helper to parse **bold** text to JSX elements (beginner friendly)
  const formatMarkdown = (text) => {
    if (!text) return '';
    const parts = text.split(/\*\*([^*]+)\*\*/g);
    return parts.map((part, index) => {
      // Every odd item in the split array was inside **
      if (index % 2 === 1) {
        return <strong key={index} style={{ color: '#38bdf8', fontWeight: '600' }}>{part}</strong>;
      }
      return part;
    });
  };

  const handleSend = async () => {
    const query = inputText.trim();
    if (!query) return;

    setInputText('');
    setLoading(true);
    setError(null);

    const battleId = Date.now();

    // Add a placeholder battle immediately so the user sees a loading state
    setBattles((prev) => [...prev, { id: battleId, userQuestion: query }]);

    try {
      const response = await axios.post('http://localhost:3000/usegraph', { input: query });
      const responseValue = response.data;

      console.log('Backend response:', responseValue);

      // Update the placeholder battle with the actual data from backend
      setBattles((prev) =>
        prev.map((battle) =>
          battle.id === battleId
            ? {
                ...battle,
                solution_1: responseValue.data.solution_1,
                solution_2: responseValue.data.solution_2,
                judge_recomendation: responseValue.data.judge_recomendation,
              }
            : battle
        )
      );
    } catch (err) {
      console.error(err);
      setError(`Backend Connection Failed: ${err.message}. Make sure backend is running on port 3000.`);
      setBattles((prev) => prev.filter((b) => b.id !== battleId));
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="brand-info">
          <div className="brand-title-row">
            <span className="brand-dot" />
            <h1 className="brand-title">AI Arena</h1>
          </div>
          <p className="brand-subtitle">Compare responses side-by-side with an automated judge verdict</p>
        </div>
      </header>

      {error && (
        <div className="error-banner">
          <span>{error}</span>
          <button className="close-btn" onClick={() => setError(null)}>✕</button>
        </div>
      )}

      <main className="chat-window">
        {battles.length === 0 && !loading && (
          <div className="empty-arena">
            <span className="empty-icon">⚔️</span>
            <h2 className="empty-title">Arena is Empty</h2>
            <p className="empty-desc">
              Submit a prompt below to see models battle it out.
            </p>
          </div>
        )}

        {battles.map((battle) => (
          <div key={battle.id} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="user-msg-container">
              <div className="user-bubble">{battle.userQuestion}</div>
            </div>

            {!battle.solution_1 && !battle.solution_2 ? (
              <div className="loading-indicator">
                <span className="dot-pulse">●</span>
                <span>Generating solutions & evaluating...</span>
              </div>
            ) : (
              <div className="battle-results-container">
                <div className="battle-title">
                  <span>RESULT COMPARISON</span>
                </div>

                <div className="battle-solutions-row">
                  <div className="solution-card sol-1">
                    <div className="solution-header">
                      <span className="solution-name">Solution 1</span>
                      {battle.judge_recomendation && (
                        <span className="score-badge blue">
                          Score: {battle.judge_recomendation.solution_1_score}/10
                        </span>
                      )}
                    </div>
                    <div className="solution-body">
                      {formatMarkdown(battle.solution_1)}
                    </div>
                  </div>

                  <div className="solution-card sol-2">
                    <div className="solution-header">
                      <span className="solution-name">Solution 2</span>
                      {battle.judge_recomendation && (
                        <span className="score-badge indigo">
                          Score: {battle.judge_recomendation.solution_2_score}/10
                        </span>
                      )}
                    </div>
                    <div className="solution-body">
                      {formatMarkdown(battle.solution_2)}
                    </div>
                  </div>
                </div>

                {battle.judge_recomendation && (
                  <div className="judge-verdict">
                    <div>
                      <div className="judge-title">JUDGE VERDICT</div>
                      <div className="judge-details">
                        Winner: <span className="judge-winner-highlight">{battle.judge_recomendation.winner.toUpperCase()}</span>
                      </div>
                    </div>
                    <div className="judge-scores-comparison">
                      Sol 1: {battle.judge_recomendation.solution_1_score} vs Sol 2: {battle.judge_recomendation.solution_2_score}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}


        {loading && battles.length === 0 && (
          <div className="loading-indicator" style={{ margin: 'auto' }}>
            <span className="dot-pulse">●</span>
            <span>Connecting to models...</span>
          </div>
        )}
      </main>

      <footer className="input-area">
        <textarea
          className="chat-textarea"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question..."
          disabled={loading}
        />
        <button
          className="submit-btn"
          onClick={handleSend}
          disabled={loading || !inputText.trim()}
        >
          Submit
        </button>
      </footer>
    </div>
  );
}
