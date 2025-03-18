CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-------------- Employee Management --------------------------------
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

-------------------- Recruitment ----------------------------------
-- Job posting table
CREATE TABLE IF NOT EXISTS jobPostings (
    id SERIAL PRIMARY KEY,
    jobTitleId INTEGER REFERENCES jobTitles (id),
    employmentType VARCHAR(50) CHECK (employmentType IN ('Full-time', 'Part-time', 'Contract')),
    salaryRange VARCHAR(100),
    location VARCHAR(255),
    jobRequirements TEXT[],
    deadline DATE,
    status VARCHAR(50) DEFAULT 'Open' CHECK (status IN ('Open', 'Closed', 'Filled', 'Canceled', 'On Hold'))
);

-- JobPostingTrack Table
CREATE TABLE IF NOT EXISTS jobPostingTracks (
    id SERIAL PRIMARY KEY,
    jobPostingId INTEGER REFERENCES jobPostings(id) ON DELETE CASCADE,
    applicantsCount INTEGER DEFAULT 0,
    interviews INTEGER DEFAULT 0,
    hiringStatus VARCHAR(50) CHECK (hiringStatus IN ('Position Filled', 'Ongoing'))
);

-- Applicants Table
CREATE TABLE IF NOT EXISTS applicants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(10) NOT NULL,
    resumeURL TEXT,
    jobPostingId INTEGER REFERENCES jobPostings(id),
    coverLetter TEXT,
    applicationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    applicationSource VARCHAR(50) CHECK (applicationSource IN ('JobPortal', 'Website', 'Referral')),
    status VARCHAR(50) CHECK (status IN ('Pending', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Interviewed', 'Hired', 'Rejected'))
);

-- Interview Table
CREATE TABLE IF NOT EXISTS interviews (
    id SERIAL PRIMARY KEY,
    candidateId INTEGER REFERENCES applicants(id),
    interviewersIds INTEGER[],
    interviewDate DATE NOT NULL,
    location VARCHAR(255),
    status VARCHAR(50) CHECK (status IN ('Scheduled', 'Completed', 'Cancelled')),
    feedback TEXT
);

-- Candidate Table
CREATE TABLE IF NOT EXISTS candidates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(10) NOT NULL,
    educationHistory TEXT,
    skills TEXT[],
    certificates TEXT[],
    resume TEXT,
    interviewRecords TEXT,
    interviewId INTEGER REFERENCES interviews(id),
    status VARCHAR(50)
);

-------------------- Attendance & Leave Managaement ----------------------------------
-- Attendance Table
CREATE TABLE IF NOT EXISTS attendance (
    id SERIAL PRIMARY KEY,
    empId INTEGER NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    approvingManagerId INTEGER NOT NULL REFERENCES employees(id),
    clockInTime TIMESTAMP NOT NULL,
    clockOutTime TIMESTAMP,
    workHours DECIMAL(5,2),
    overtimeHours DECIMAL(5,2),
    location VARCHAR(255),
    clockInMethod VARCHAR(50) CHECK (clockInMethod IN ('Manual', 'Biometric', 'RFID', 'Mobile App'))
);

-- Leave Request Table
CREATE TABLE IF NOT EXISTS leaveRequests (
    id SERIAL PRIMARY KEY,
    empId INTEGER NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    leaveType VARCHAR(50) CHECK (leaveType IN ('Annual', 'Sick', 'Maternity')),
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    leaveReason TEXT,
    status VARCHAR(50) CHECK (status IN ('Approved', 'Rejected', 'Under Consideration'))
);

-- Leave Balance Table
CREATE TABLE IF NOT EXISTS leaveBalances (
    id SERIAL PRIMARY KEY,
    empId INTEGER NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    entitlement INTEGER NOT NULL,
    leaveTaken INTEGER NOT NULL DEFAULT 0,
    leaveBalance INTEGER GENERATED ALWAYS AS (entitlement - leaveTaken) STORED,
    accrualRate DECIMAL(5,2) NOT NULL
);

-------------------- Payroll Managaement ----------------------------------
-- Payroll Table
CREATE TABLE IF NOT EXISTS payroll (
    id SERIAL PRIMARY KEY,
    empId INTEGER NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    baseSalary DECIMAL(10,2) NOT NULL,
    deductions DECIMAL(10,2) NOT NULL DEFAULT 0,
    payPeriod VARCHAR(50) NOT NULL,
    bonus DECIMAL(10,2) DEFAULT 0,
    netPay DECIMAL(10,2) GENERATED ALWAYS AS (baseSalary - deductions + bonus) STORED
);

-- Payslips Table
CREATE TABLE IF NOT EXISTS payslips (
    id SERIAL PRIMARY KEY,
    empId INTEGER NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    dateIssued DATE NOT NULL,
    payrollId INTEGER NOT NULL REFERENCES payroll(id) ON DELETE CASCADE
);

-- Compensation Table
CREATE TABLE IF NOT EXISTS compensation (
    id SERIAL PRIMARY KEY,
    empId INTEGER NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    baseSalary DECIMAL(10,2) NOT NULL,
    effectiveDate DATE NOT NULL,
    compensationHistory TEXT[],
    benefits TEXT[],
    totalCompensation DECIMAL(10,2) GENERATED ALWAYS AS (baseSalary + COALESCE(NULLIF(ARRAY_LENGTH(benefits, 1), NULL) * 100, 0)) STORED
);

-- Bonuses & Commission Incentives Table
CREATE TABLE IF NOT EXISTS bonuses (
    id SERIAL PRIMARY KEY,
    empId INTEGER NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    bonusAmount DECIMAL(10,2) NOT NULL,
    commissionAmount DECIMAL(10,2) DEFAULT 0,
    incentiveType VARCHAR(50) CHECK (incentiveType IN ('Performance', 'Sales', 'Referral')),
    incentivePeriod VARCHAR(50) CHECK (incentivePeriod IN ('Monthly', 'Annually', 'Quarterly')),
    incentiveReason TEXT
);

-------------------- Performance & Goals Managaement ----------------------------------
-- Goals Table
CREATE TABLE IF NOT EXISTS goals (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    type VARCHAR(50) CHECK (type IN ('Individual', 'Team')),
    assignedTo INTEGER NOT NULL,
    assignedToType VARCHAR(10) CHECK (assignedToType IN ('Employee', 'Team')),
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    priority VARCHAR(50) CHECK (priority IN ('High', 'Medium', 'Low'))
);

-- Foreign key constraints with deferrable validation
ALTER TABLE goals
    ADD CONSTRAINT fk_assignedTo_employee FOREIGN KEY (assignedTo)
    REFERENCES employees(id) DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE goals
    ADD CONSTRAINT fk_assignedTo_team FOREIGN KEY (assignedTo)
    REFERENCES teams(id) DEFERRABLE INITIALLY DEFERRED;



-- GoalsTrack table
CREATE TABLE IF NOT EXISTS goalsTracks (
    id SERIAL PRIMARY KEY,
    goalId INTEGER NOT NULL REFERENCES goals(id),
    progressUpdates TEXT[],
    milestones TEXT[],
    challaenges TEXT[],
    comments TEXT[]
); 

-- Perfeormance Reviews table
CREATE TABLE IF NOT EXISTS performanceReviews (
    id SERIAL PRIMARY KEY,
    employeeId INTEGER NOT NULL REFERENCES employees(id),
    reviewDate DATE NOT NULL,
    score INTEGER CHECK (score >= 1 AND score <= 5),
    comments TEXT[],
    reviewPeriod VARCHAR(255) CHECK (reviewPeriod IN ('Quartrly', 'Anually')),
    reviewerId INTEGER REFERENCES employees(id),
    reviewStatus VARCHAR(255) CHECK (reviewStatus IN ('Scheduled', 'InProgress', 'Completed'))
);

-- Polices table
CREATE TABLE IF NOT EXISTS policies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    document TEXT NOT NULL,
    effectiveDate DATE NOT NULL,
    authorId INTEGER REFERENCES employees(id)
);

-- Regulatiobs table
CREATE TABLE IF NOT EXISTS regulations (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(60) CHECK (status IN ('Compliant', 'NonCompliant')),
    regulationDate DATE NOT NULL,
    responsiblePartyId INTEGER REFERENCES employees(id)
);

-- Audit table 
CREATE TABLE IF NOT EXISTS audit (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50) CHECK (type IN ('Internal', 'External')),
    date DATE NOT NULL,
    findings TEXT[],
    correctiveAction VARCHAR(255),
    status VARCHAR(50) CHECK (status IN ('Planned', 'In Progress', 'Completed', 'Pending Review', 'Closed', 'Canceled'))
);