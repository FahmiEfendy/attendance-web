export const ROLE_ENUM = [
  { key: "hr", label: "Human Resource" },
  { key: "employee", label: "Employee" },
];

export const ROLE_ENUM_LABEL: Record<string, string> = ROLE_ENUM.reduce(
  (acc, { key, label }) => {
    acc[key] = label;
    return acc;
  },
  {} as Record<string, string>
);

export const DEPARTMENT_ENUM = [
  { key: "hr", label: "Human Resources" },
  { key: "finance", label: "Finance" },
  { key: "it", label: "Information Technology" },
  { key: "marketing", label: "Marketing" },
  { key: "sales", label: "Sales" },
  { key: "operations", label: "Operations" },
  { key: "legal", label: "Legal" },
  { key: "customer_service", label: "Customer Service" },
  { key: "rnd", label: "Research and Development" },
  { key: "administration", label: "Administration" },
];

export const DEPARTMENT_ENUM_LABEL: Record<string, string> =
  DEPARTMENT_ENUM.reduce((acc, { key, label }) => {
    acc[key] = label;
    return acc;
  }, {} as Record<string, string>);

export const POSITION_ENUM = [
  { key: "director", label: "Director" },
  { key: "manager", label: "Manager" },
  { key: "supervisor", label: "Supervisor" },
  { key: "team_lead", label: "Team Lead" },
  { key: "senior_staff", label: "Senior Staff" },
  { key: "staff", label: "Staff" },
  { key: "assistant", label: "Assistant" },
  { key: "coordinator", label: "Coordinator" },
  { key: "intern", label: "Intern" },
  { key: "consultant", label: "Consultant" },
];

export const POSITION_ENUM_LABEL: Record<string, string> = POSITION_ENUM.reduce(
  (acc, { key, label }) => {
    acc[key] = label;
    return acc;
  },
  {} as Record<string, string>
);
