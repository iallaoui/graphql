
# GraphQL Dashboard

This project is a GraphQL-based web dashboard built with vanilla JavaScript, HTML, and CSS.  
It allows users to authenticate, fetch data via GraphQL queries, and display profile information, XP, ranks, and more in a styled UI.

---

## 📂 Project Structure

```
GRAPHQL/
├── css
│ ├── home.css # Styles for home/dashboard
│ ├── index.css # Global styles
│ └── login.css # Login page styles
│
├── images
│ ├── icon.avif # App icon
│ ├── logo.png # Logo
│ └── noun-to-do-list-5340944.svg
│
├── index.html # Main entry point
│
├── js
│ ├── auth
│ │ ├── loginForm.js # Handles login form logic
│ │ └── logOut.js # Handles user logout
│ │
│ ├── gql
│ │ └── querys.js # GraphQL queries
│ │
│ ├── home
│ │ ├── AuditsSect.js # Audits section rendering
│ │ ├── BodyHome.js # Main home body logic
│ │ ├── displayHome.js # Displays dashboard data
│ │ ├── head.js # Header logic
│ │ └── ProgressSect.js # Progress/XP section
│ │
│ ├── notif
│ │ ├── failureToast.js # Error notifications
│ │ └── succedToast.js # Success notifications
│ │
│ └── main.js # App entry & initialization
│
├── utils
│ ├── SetUrl.js # API endpoint configuration
│ ├── verifyError.js # Error handling utility
│ └── XpConcerter.js # XP formatting utility
│
├── Readme.md # Project documentation
└── subject.md # Project subject/specification
``` 
````

---

## Features

- 🔑 Authentication using tokens (GraphQL Bearer authorization)
- 📊 Profile dashboard with user details (XP, rank, transactions, skills, audits, etc.)
- 🖼️ Dynamic UI rendering with DOM manipulation
- 📡 Reusable GraphQL fetch API helper for queries
- 🎨 Responsive design using `responsive.css`
- 🔔 Toast notifications for feedback (success/error)

---

##  Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YounsseAmazzal/graphql
````

### 2. Run the project

* Install the **Live Server** extension in your code editor (e.g., VS Code)
* Open the project folder
* Right-click `index.html` → **"Go Live"**
* or do this commend :
``
npx serve 
``

---
