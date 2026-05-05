# GraphQL Dashboard

Vanilla JavaScript dashboard for the Zone01 GraphQL API. The app handles login, fetches user data through GraphQL, and renders profile, XP, transactions, audits, and skills in a static frontend.

## Structure

```text
.
├── css/
│   ├── home.css
│   ├── index.css
│   └── login.css
├── images/
├── index.html
├── js/
│   ├── api/
│   │   ├── client.js
│   │   └── queries.js
│   ├── auth/
│   │   ├── loginForm.js
│   │   └── logout.js
│   ├── config/
│   │   └── appConfig.js
│   ├── home/
│   │   ├── dashboard.js
│   │   ├── dashboardContent.js
│   │   ├── header.js
│   │   └── sections/
│   │       ├── auditsSection.js
│   │       └── progressSection.js
│   ├── notifications/
│   │   ├── failureToast.js
│   │   ├── successToast.js
│   │   └── toast.js
│   ├── utils/
│   │   ├── dom.js
│   │   ├── formatXp.js
│   │   └── handleGraphqlError.js
│   └── main.js
└── subject.md
```

## Notes

- `js/config/appConfig.js` centralizes endpoints, asset paths, and the Zone01 event id.
- `js/api/client.js` owns authentication and GraphQL requests.
- Dashboard rendering is split into header, overview content, audits, and skills sections.
- Toast rendering is shared through one base helper instead of duplicated success/error logic.

## Run

Serve the project with any static file server. For example:

```bash
npx serve
```

Then open the local URL from the server output.
