CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category_id UUID REFERENCES categories(id),
    amount INT NOT NULL,
    date DATE NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

INSERT INTO categories (name) VALUES ('Household'), ('Food'), ('Entertainment');

INSERT INTO transactions (name, category_id, amount, date, description)
VALUES 
    ('Gas bill', (SELECT id FROM categories WHERE name = 'Household'), 12300, '2025-02-11', 'test description'),
    ('Water bill', (SELECT id FROM categories WHERE name = 'Household'), 2750, '2025-02-11', 'test description');