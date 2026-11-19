THE ANOMALY — DEX ANDREW GARCIA
Personal portfolio website

FILES
- index.html: semantic website structure and portfolio content.
- style.css: responsive design, Arctic Blue and Midnight Cyber palettes, animations.
- script.js: theme, navigation, terminal, playground, guestbook, chatbot, filters, clock, and other interactions.
- index_html_code.txt: exact plain-text copy of index.html.
- assets/portfolio-background.mp3: audio extracted from the MP4 supplied with the project.
- assets/: place authentic certificate images, project screenshots, and any additional assets here.

RUN LOCALLY
1. Extract the ZIP file.
2. Open index.html in a modern browser (Chrome, Edge, Firefox, or Safari).
3. For best testing, use a simple local web server (for example, VS Code Live Server).
4. Internet is required for the Google Fonts stylesheet. Most website features work offline after fonts are cached; the extracted audio is local.

FEATURE STATUS / HONEST LIMITATIONS
Working in this static front-end:
- Responsive navigation, active section indicator, smooth scrolling, theme toggle with localStorage and system preference.
- Typing animation, scroll reveal, custom cursor on fine-pointer devices, reading progress, back-to-top, digital clock.
- Achievement detail modals, project filtering and project detail modal.
- Predefined terminal commands, restricted JavaScript expression playground, local guestbook.
- Rule-based portfolio guide (not an AI model), language toggle for navigation and hero CTA labels, keyboard shortcuts.
- Music player using the extracted audio file; it loops and requires the visitor to press Play.
- Contact form validates fields and opens the visitor's default email app using a mailto link.

Requires additional work / external configuration:
- Public shared visitor counter: needs analytics or backend service. No fake visitor count is displayed.
- Public guestbook: current guestbook uses localStorage in this browser only. A shared database and server-side validation are required.
- Actual AI chatbot: current assistant is rule-based. A real AI assistant needs a secure backend and API key; never put the key in browser JavaScript.
- Resume download: intentionally omitted as requested.
- Interactive map: omitted to avoid exposing a private residential address; a public municipality-level map can be added if desired.
- 3D: current hero uses CSS 3D geometry rather than a Three.js scene.
- Certificate images: no certificate artwork was invented. Replace the cards with actual scans/photos when available.
- Project screenshots/repository/live demo: not supplied; the Roboflow project is described only at the level of information provided.
- Sound effects: not included; background audio is provided as the optional music control.
- The playground is a small front-end expression demo, not a production-grade secure sandbox or full programming IDE.

PERSONAL DATA NOTES
- The supplied introduction, hero alias, study details, achievements, skills, interests, email, and social URLs are used.
- Skill bars are shown as 5/5 self-assessment because the brief requested maximum ratings; they are not verified test results.
- Age and school details reflect the supplied brief and should be updated if they change.
- No resume section or education journey timeline is included, following the request to remove them.

GITHUB PAGES PUBLISHING
1. Sign in to GitHub and create a new repository (for example, dex-garcia-portfolio).
2. Upload index.html, style.css, script.js, index_html_code.txt, README.txt, and the entire assets folder to the repository root.
3. Confirm index.html is at the repository root, not inside an extra nested folder.
4. Open repository Settings → Pages.
5. Under Build and deployment, choose Deploy from a branch.
6. Select the main branch and /(root), then Save.
7. Wait for GitHub Pages to publish. The actual URL will appear in Settings → Pages.
8. Open that URL and test theme switching, navigation, audio, modals, filters, and mobile layout.

GITHUB PAGES LIMITATIONS
GitHub Pages hosts static files only. It cannot run your own server-side code or securely store API keys. Features requiring a database, server-side validation, shared visitor counts, or an AI API need an external backend/service. Do not expose private keys in script.js.

SUBMISSION CHECKLIST
- Submit the ZIP package.
- If your teacher requests individual source files, submit index.html, style.css, script.js, index_html_code.txt, README.txt, and assets/.
- Add actual certificate images and project screenshots before presenting the portfolio as a final evidence-based record.
