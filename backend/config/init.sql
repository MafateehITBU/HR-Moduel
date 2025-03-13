CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add more tables as needed 
-- Employee table
CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(10) NOT NULL,
    dob DATE NOT NULL,
    hireDate DATE NOT NULL,
    bankDetails VARCHAR(255) DEFAULT NULL,
    depID INTEGER NOT NULL,
    jobTitleID INTEGER NOT NULL,
    teamID INTEGER NOT NULL,
    FOREIGN KEY (depID) REFERENCES departments (id),
    FOREIGN KEY (jobTitleID) REFERENCES jobTitles (id),
    FOREIGN KEY (teamID) REFERENCES teams (id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Department structure
CREATE TABLE IF NOT EXISTS departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    employeeCount INTEGER DEFAULT 0,
    departmentHeadID INTEGER,
    FOREIGN KEY (departmentHeadID) REFERENCES employees (id)
);

-- Job Titles table
CREATE TABLE IF NOT EXISTS jobTitles (
    id SERIAL PRIMARY KEY,
    jobTitle VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    depID INTEGER,
    FOREIGN KEY (depID) REFERENCES departments (id)
);

-- Teams table
CREATE TABLE IF NOT EXISTS teams (
    id SERIAL PRIMARY KEY,
    teamName VARCHAR(255) NOT NULL,
    teamLead INTEGER,
    depID INTEGER NOT NULL,
    FOREIGN KEY (teamLead) REFERENCES employees (id),
    FOREIGN KEY (depID) REFERENCES departments (id)
);