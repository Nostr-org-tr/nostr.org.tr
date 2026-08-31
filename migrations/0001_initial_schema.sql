-- D1 Database Schema for Nostr Türkiye (nostr.org.tr)
-- Table for user recommendations submitted through community follow lists

CREATE TABLE IF NOT EXISTS user_recommendations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  npub TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'pending'
);

CREATE INDEX IF NOT EXISTS idx_recommendations_category ON user_recommendations(category);
CREATE INDEX IF NOT EXISTS idx_recommendations_status ON user_recommendations(status);
