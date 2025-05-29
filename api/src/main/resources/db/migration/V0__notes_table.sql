CREATE TABLE notes (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    title TEXT NOT NULL,
    content JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_notes_user ON notes (user_id);