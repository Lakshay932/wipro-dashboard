# Wipro Employee Engagement Dashboard

This project is an **employee engagement dashboard** developed as part of my internship. It is a user-friendly tool for managing employee login, tracking engagement, lodging complaints, and displaying team structures in a web-based environment.

---

## 🚀 Features (Current Version)

- **Login System**: Simulated authentication using a simple credential list (see `script_login.js`).
- **Role-based Dashboard**: Different views for managers and their subordinates.
- **Complaint Logging**: Employees/managers can submit complaints with reasons and comments.
- **RAG (Red-Amber-Green) Status**: Visual feedback on engagement or issues.
- **Responsive Design**: Optimized for desktop use with modern layout.
- **Frontend Tech Only**: Built using pure HTML, CSS, and JavaScript.
- **Data Handling**: All data is saved temporarily in the browser’s local storage (`localStorage`).

---

## 🖥️ How To Run Locally

1. **Clone or download** this repository.
2. Open `index.html` in your web browser.
3. Use the login page to access dashboard features.
4. Data is stored locally and will be cleared on browser reset.

---

## ℹ️ Important Notes

- **All user and complaint data is browser-local only.**
- There is **no real backend or database**; the current model is for demonstration and learning purposes.
- Logging in/out, submitting complaints, etc. **will not persist across different browsers or devices**.

---

## 🌟 Planned Improvements / Future Work

Over the coming months, I plan to evolve this project to a full-stack, multi-user, cloud-enabled app:

- **Backend Integration**:  
  A Node.js/Express or Python/Flask/Django backend to handle authentication and data persistence.
- **Database Storage**:  
  Store employee, complaint, and engagement data in MongoDB, PostgreSQL, or Firebase; ensure true persistence.
- **Secure Authentication**:  
  Implement proper user registration/logins, hashed passwords, and access controls.
- **Cloud Hosting**:  
  Deploy entire stack to Heroku, Vercel, Render, or another modern PaaS.
- **API-Driven Frontend**:  
  Replace all `localStorage` logic with API calls to backend.
- **Multi-user Support**:  
  True real-time/multi-user dashboard with per-user and per-manager views.
- **Admin & Manager Tools**:  
  Enhanced statistics, advanced filters, downloadable reports, etc.
- **UI/UX Enhancements**:  
  More polished mobile view, accessibility improvements, new features.
- **Testing**:  
  Unit, integration, and E2E tests for reliability.

---

## 📅 Roadmap

1. **Version 1.0 (current):** Frontend-only demo with local storage (MVP).
2. **Version 2.0:** Move authentication and data to cloud backend + database.
3. **Version 3.0:** Launch multi-user deployment and new analytics/dashboard features.

---

## 📣 Contact

If you have feedback, suggestions, or want to collaborate, please open an issue or contact me via [GitHub](https://github.com/Lakshay932).

---

## 🙏 Acknowledgements

- Inspired by my learning and work at Wipro.
- Thanks to mentors and teammates for their guidance.

---

