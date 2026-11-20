// THE ANOMALY — interactive portfolio logic
(() => {
  "use strict";
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const root = document.documentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Loading screen
  window.addEventListener("load", () => setTimeout(() => $("#loader")?.classList.add("done"), 450));
  setTimeout(() => $("#loader")?.classList.add("done"), 2200);

 // Theme: four selectable visual palettes
const themeToggle = $("#themeToggle");
const themeSelector = $("#themeSelector");

function applyTheme(theme) {
  const validThemes = ["nebula", "midnight", "matrix", "arctic"];

  if (!validThemes.includes(theme)) {
    theme = "nebula";
  }

  root.dataset.theme = theme;
  localStorage.setItem("dex-theme", theme);

  if (themeSelector) {
    themeSelector.value = theme;
  }

  const isLight = theme === "arctic";

  $("#themeIcon").textContent = isLight ? "☾" : "☼";

  themeToggle.setAttribute(
    "aria-label",
    isLight ? "Switch to dark theme" : "Switch to Arctic theme"
  );

  document.querySelector('meta[name="theme-color"]').content =
    theme === "arctic" ? "#F5F8FC" :
    theme === "matrix" ? "#03130B" :
    theme === "midnight" ? "#080D1A" :
    "#10091F";
}

const savedTheme = localStorage.getItem("dex-theme");
const initialTheme =
  savedTheme === "dark" ? "midnight" :
  savedTheme === "light" ? "arctic" :
  savedTheme || root.dataset.theme || "nebula";

applyTheme(initialTheme);

themeSelector.addEventListener("change", () => {
  applyTheme(themeSelector.value);
});

themeToggle.addEventListener("click", () => {
  applyTheme(root.dataset.theme === "arctic" ? "nebula" : "arctic");
});

  // Language switcher: interface labels only; personal statements remain in original English.
  let language = localStorage.getItem("dex-language") || "EN";
  const translations = {
    EN: {home:"Home",about:"About",skills:"Skills",credentials:"Credentials",projects:"Projects",interests:"Interests",lab:"Lab",contact:"Contact",explore:"Explore my work",discover:"Discover the mind"},
    FIL: {home:"Simula",about:"Tungkol",skills:"Kasanayan",credentials:"Mga Parangal",projects:"Mga Proyekto",interests:"Interes",lab:"Laboratoryo",contact:"Makipag-ugnayan",explore:"Tingnan ang gawa",discover:"Kilalanin ang isip"}
  };
  function setLanguage(lang) {
    language = lang; localStorage.setItem("dex-language", lang);
    $("#languageToggle").textContent = lang;
    $$(".nav-link").forEach(a => { const key = a.getAttribute("href").slice(1); if (translations[lang][key]) a.textContent = translations[lang][key]; });
    const ctas = $$(".hero-actions .btn"); if (ctas[0]) ctas[0].innerHTML = `${translations[lang].explore} <span>↗</span>`;
    if (ctas[1]) ctas[1].innerHTML = `${translations[lang].discover} <span>↓</span>`;
  }
  setLanguage(language);
  $("#languageToggle").addEventListener("click", () => setLanguage(language === "EN" ? "FIL" : "EN"));

  // Responsive navigation
  const nav = $("#nav"), menuToggle = $("#menuToggle");
  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  $$(".nav-link").forEach(link => link.addEventListener("click", () => { nav.classList.remove("open"); menuToggle.setAttribute("aria-expanded","false"); }));
  const sections = $$("main section[id]");
  const navObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) $$(".nav-link").forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`));
  }), {rootMargin:"-35% 0px -55% 0px"});
  sections.forEach(section => navObserver.observe(section));

  // Scroll reveal and progress
  if (!reducedMotion && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("visible"); revealObserver.unobserve(entry.target); }
    }), {threshold:.12});
    $$(".reveal").forEach(el => revealObserver.observe(el));
  } else $$(".reveal").forEach(el => el.classList.add("visible"));
  const backTop = $("#backTop");
  function onScroll() {
    const max = document.documentElement.scrollHeight - innerHeight;
    $("#readingProgress").style.width = `${max > 0 ? scrollY / max * 100 : 0}%`;
    backTop.classList.toggle("show", scrollY > 500);
  }
  addEventListener("scroll", onScroll, {passive:true}); onScroll();
  backTop.addEventListener("click", () => scrollTo({top:0,behavior:reducedMotion?"auto":"smooth"}));

  // Animated role
  const roles = ["Aspiring IT Professional","Programmer","The Strategist","Programming Enthusiast"];
  let roleIndex = 0, charIndex = 0, deleting = false;
  function typeRole() {
    const current = roles[roleIndex];
    $("#typedRole").textContent = current.slice(0,charIndex);
    if (!deleting && charIndex < current.length) { charIndex++; setTimeout(typeRole,75); }
    else if (!deleting) { deleting = true; setTimeout(typeRole,1350); }
    else if (charIndex > 0) { charIndex--; setTimeout(typeRole,35); }
    else { deleting = false; roleIndex = (roleIndex+1)%roles.length; setTimeout(typeRole,250); }
  }
  if (!reducedMotion) typeRole(); else $("#typedRole").textContent = roles[0];

  // Live local clock
  function updateClock() {
    const now = new Date();
    $("#clock strong").textContent = now.toLocaleTimeString([], {hour:"2-digit",minute:"2-digit",second:"2-digit"});
    $("#clock small").textContent = now.toLocaleDateString([], {weekday:"short",month:"short",day:"numeric"}).toUpperCase();
  }
  updateClock(); setInterval(updateClock,1000);

  // Cursor effect: disabled on touch and reduced-motion devices.
  if (!reducedMotion && matchMedia("(pointer:fine)").matches) {
    const dot=$("#cursorDot"), ring=$("#cursorRing");
    let x=0,y=0,rx=0,ry=0;
    addEventListener("mousemove",e=>{x=e.clientX;y=e.clientY;dot.style.opacity=ring.style.opacity=1;dot.style.left=x+"px";dot.style.top=y+"px";});
    function follow(){rx+=(x-rx)*.16;ry+=(y-ry)*.16;ring.style.left=rx+"px";ring.style.top=ry+"px";requestAnimationFrame(follow);} follow();
    $$("a,button,.credential-card,.project-card").forEach(el=>{el.addEventListener("mouseenter",()=>{ring.style.width="48px";ring.style.height="48px";ring.style.background="var(--glow)"});el.addEventListener("mouseleave",()=>{ring.style.width="30px";ring.style.height="30px";ring.style.background="transparent"});});
  }

  // Modal details for credentials and project card
  const modal=$("#detailModal");
  function openModal(title, description, extra="", eyebrow="DETAIL") {
    $("#modalTitle").textContent=title; $("#modalDescription").textContent=description; $("#modalExtra").textContent=extra; $("#modalEyebrow").textContent=eyebrow;
    modal.classList.add("open"); modal.setAttribute("aria-hidden","false"); $("#modalClose").focus();
  }
  function closeModal(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true");}
  $("#modalClose").addEventListener("click",closeModal);
  modal.addEventListener("click",e=>{if(e.target===modal)closeModal();});
  $$(".credential-card").forEach(card=>{
    const open=()=>openModal(card.querySelector("h3").textContent,card.dataset.detail,"Replace this card's placeholder details with verified certificate information.","ACHIEVEMENT");
    card.addEventListener("click",open);card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();open();}});
  });
  $$(".project-card[role=button]").forEach(card=>{
    const open=()=>openModal(card.dataset.title,card.dataset.description,`Technologies: ${card.dataset.tech} | Objective: ${card.dataset.objective}`,"PROJECT DETAILS");
    card.addEventListener("click",open);card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();open();}});
  });

  // Project filters
  $$("#projectFilters .filter").forEach(btn=>btn.addEventListener("click",()=>{
    $$("#projectFilters .filter").forEach(b=>b.classList.toggle("active",b===btn));
    const filter=btn.dataset.filter;
    $$(".project-card").forEach(card=>{card.hidden=!(filter==="all"||card.dataset.category===filter);});
  }));

  // Safe portfolio terminal: known commands only.
  const terminalOutput=$("#terminalOutput"), terminalInput=$("#terminalCommand");
  const commands={
    help:"Available commands: help, about, skills, projects, education, contact, clear",
    about:"Dex Andrew Garcia — THE ANOMALY. A mind built to question and a vision driven to create.",
    skills:"Technical: Microsoft Office, Graphic Design, Video Editing, Photography, Prompt Engineering. General: Communication, Leadership, Teamwork, Time Management, Critical Thinking, Problem-Solving, Adaptability, Creativity.",
    projects:"Listed project: Roboflow Object Detection (AI / Computer Vision). More projects will be added when verified.",
    education:"1st Year BS Information Technology student at Mindoro State University — Calapan Campus.",
    contact:"Email: dexandrew1002@gmail.com | Location: Puerto Galera, Oriental Mindoro."
  };
  function printTerminal(text,cls=""){const p=document.createElement("p");if(cls)p.className=cls;p.textContent=text;terminalOutput.appendChild(p);terminalOutput.scrollTop=terminalOutput.scrollHeight;}
  $("#terminalForm").addEventListener("submit",e=>{
    e.preventDefault();const cmd=terminalInput.value.trim().toLowerCase();if(!cmd)return;
    printTerminal(`dex@anomaly:~$ ${cmd}`);
    if(cmd==="clear"){terminalOutput.textContent="";}else if(commands[cmd])printTerminal(commands[cmd]);else printTerminal(`Command not found: ${cmd}. Type help for available commands.`);
    terminalInput.value="";
  });
  $("#clearTerminal").addEventListener("click",()=>terminalOutput.textContent="");

  // Restricted expression playground. It supports simple JS expressions, not a full IDE.
  const initialCode=`const idea = "Think beyond.";
idea.toUpperCase()`;
  $("#runCode").addEventListener("click",()=>{
    const code=$("#codeInput").value;
    const output=$("#codeOutput");
    if(code.length>1000){output.textContent="Error: snippet is limited to 1,000 characters.";return;}
    if(/\b(fetch|XMLHttpRequest|import|require|window|document|localStorage|sessionStorage|globalThis|process|eval|Function|WebSocket|Worker)\b/.test(code)){output.textContent="Blocked: browser APIs, imports, and dynamic execution primitives are not allowed.";return;}
    try {
      const result = Function('"use strict"; const console = undefined; const alert = undefined; const prompt = undefined; const confirm = undefined; '+code)();
      output.textContent = result === undefined ? "Executed. (No return value.)" : String(result);
    } catch(err){output.textContent=`${err.name}: ${err.message}`;}
  });
  $("#resetCode").addEventListener("click",()=>{$("#codeInput").value=initialCode;$("#codeOutput").textContent="Ready when you are.";});

  // Guestbook: local browser storage, not a public shared database.
  const GUEST_KEY="dex-guestbook";
  function renderGuests(){
    const list=$("#guestList");list.textContent="";
    let entries=[];try{entries=JSON.parse(localStorage.getItem(GUEST_KEY)||"[]");}catch(_){}
    if(!entries.length){const empty=document.createElement("div");empty.className="empty-guest";empty.append("No messages yet.");const span=document.createElement("span");span.textContent="Be the first to leave a note.";empty.append(document.createElement("br"),span);list.append(empty);return;}
    entries.slice().reverse().forEach(item=>{
      const card=document.createElement("article");card.className="guest-entry";
      const name=document.createElement("b");name.textContent=item.name;
      const time=document.createElement("time");time.textContent=item.date;
      const message=document.createElement("p");message.textContent=item.message;
      card.append(name,time,message);list.append(card);
    });
  }
  renderGuests();
  $("#guestForm").addEventListener("submit",e=>{
    e.preventDefault();const name=$("#guestName").value.trim(),message=$("#guestMessage").value.trim();
    if(!name||!message)return;
    let entries=[];try{entries=JSON.parse(localStorage.getItem(GUEST_KEY)||"[]");}catch(_){}
    entries.push({name:name.slice(0,40),message:message.slice(0,240),date:new Date().toLocaleDateString()});
    localStorage.setItem(GUEST_KEY,JSON.stringify(entries.slice(-30)));e.target.reset();renderGuests();
  });

  // Contact form opens the visitor's email client; it is not a backend form.
  $("#contactForm").addEventListener("submit",e=>{
    e.preventDefault();
    const name=$("#contactName").value.trim(),email=$("#contactEmail").value.trim(),message=$("#contactMessage").value.trim();
    const subject=encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body=encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    $("#contactStatus").textContent="Opening your email application…";
    location.href=`mailto:dexandrew1002@gmail.com?subject=${subject}&body=${body}`;
  });

  // Background audio extracted from the supplied MP4. Requires explicit visitor action.
  const audio=$("#backgroundAudio"), musicToggle=$("#musicToggle"), musicMute=$("#musicMute");
  if(!audio.getAttribute("src")){musicToggle.disabled=true;$("#musicState").textContent="AUDIO FILE NOT AVAILABLE";}
  musicToggle.addEventListener("click",async()=>{
    if(audio.paused){try{await audio.play();musicToggle.textContent="Ⅱ";musicToggle.setAttribute("aria-label","Pause background music");$("#musicState").textContent="PLAYING · LOOP ENABLED";}catch(_){$("#musicState").textContent="PLAYBACK UNAVAILABLE";}}
    else{audio.pause();musicToggle.textContent="▶";musicToggle.setAttribute("aria-label","Play background music");$("#musicState").textContent="PAUSED · USER CONTROLLED";}
  });
  musicMute.addEventListener("click",()=>{audio.muted=!audio.muted;musicMute.textContent=audio.muted?"×":"◖";musicMute.setAttribute("aria-label",audio.muted?"Unmute audio":"Mute audio");});

  // Rule-based chatbot, accurately labelled; no AI API is connected.
  const chatPanel=$("#chatPanel");
  function toggleChat(open){chatPanel.classList.toggle("open",open);chatPanel.setAttribute("aria-hidden",String(!open));if(open)$("#chatInput").focus();}
  $("#chatFab").addEventListener("click",()=>toggleChat(!chatPanel.classList.contains("open")));
  $("#chatClose").addEventListener("click",()=>toggleChat(false));
  function botAnswer(q){
    const s=q.toLowerCase();
    if(/study|course|school|education|college|university/.test(s))return "Dex is a 1st Year Bachelor of Science in Information Technology student at Mindoro State University — Calapan Campus.";
    if(/skill|good at|capabilit/.test(s))return "Technical skills: Microsoft Office, graphic design, video editing, photography, and prompt engineering. General skills include communication, leadership, teamwork, time management, critical thinking, problem-solving, adaptability, and creativity.";
    if(/project|roboflow|object detection/.test(s))return "The listed project is a Roboflow object-detection project. Dataset, model metrics, classes, and deployment details have not yet been supplied.";
    if(/certificate|honor|achievement|award|editorial|spelling/.test(s))return "Dex graduated with High Honors in both Junior High School and Senior High School, placed 5th in Editorial Writing at DSPC, and placed 10th in the Science Spelling Bee at Pantas Agham. A CodeChum entry is also listed, with exact credential details pending.";
    if(/hobby|interest|music|book|game|film/.test(s))return "Dex's interests include reading, content creation, online games, photography, listening to music, public speaking, and watching films.";
    if(/contact|email|reach|facebook|instagram/.test(s))return "Email Dex at dexandrew1002@gmail.com. Facebook and Instagram links are available in the Contact section.";
    if(/name|who are you|about dex/.test(s))return "Dex Andrew Garcia — THE ANOMALY. Think Beyond. Build Differently.";
    return "I can answer questions about Dex's education, skills, listed achievements, Roboflow project, interests, and contact information. I only use details included in this portfolio.";
  }
  function sendChat(q,isUser=true){
    const messages=$("#chatMessages");const bubble=document.createElement("div");bubble.className="chat-bubble "+(isUser?"user":"bot");bubble.textContent=q;messages.append(bubble);messages.scrollTop=messages.scrollHeight;
  }
  $("#chatForm").addEventListener("submit",e=>{e.preventDefault();const q=$("#chatInput").value.trim();if(!q)return;sendChat(q);$("#chatInput").value="";setTimeout(()=>sendChat(botAnswer(q),false),220);});
  $$(".chat-suggestions button").forEach(b=>b.addEventListener("click",()=>{sendChat(b.dataset.question);setTimeout(()=>sendChat(botAnswer(b.dataset.question),false),180);}));

  // Cursor repulsion: the actual 3D objects move away from the pointer.
  const figureField = $("#home .floating-objects");
  if (figureField && !reducedMotion && matchMedia("(pointer:fine)").matches) {
    const figures = $$("#home .floating-objects > *").map(el => ({
      el, x:0, y:0, vx:0, vy:0
    }));
    let pointer = {x:-1000,y:-1000,active:false};
    addEventListener("pointermove", e => {
      const rect = $("#home").getBoundingClientRect();
      pointer = {x:e.clientX-rect.left,y:e.clientY-rect.top,active:true};
    }, {passive:true});
    $("#home").addEventListener("pointerleave", () => { pointer.active=false; });
    function moveFigures() {
      const fieldRect = figureField.getBoundingClientRect();
      for (const item of figures) {
        const r = item.el.getBoundingClientRect();
        const cx = r.left-fieldRect.left+r.width/2;
        const cy = r.top-fieldRect.top+r.height/2;
        let ax=0, ay=0;
        if (pointer.active) {
          const dx=cx-pointer.x, dy=cy-pointer.y;
          const distance=Math.hypot(dx,dy)||1;
          const radius=185;
          if(distance<radius) {
            const force=(1-distance/radius)*2.4;
            ax=(dx/distance)*force;
            ay=(dy/distance)*force;
          }
        }
        item.vx=(item.vx+ax)*.82;
        item.vy=(item.vy+ay)*.82;
        item.x+=item.vx;
        item.y+=item.vy;
        item.x*=.995;
        item.y*=.995;
        item.el.style.translate=item.x.toFixed(1)+"px "+item.y.toFixed(1)+"px";
      }
      requestAnimationFrame(moveFigures);
    }
    moveFigures();
  }

  // Keyboard shortcuts ignore typing contexts.
  addEventListener("keydown",e=>{
    if(e.key==="Escape"){closeModal();toggleChat(false);nav.classList.remove("open");return;}
    const tag=document.activeElement?.tagName;
    if(["INPUT","TEXTAREA","SELECT"].includes(tag)||document.activeElement?.isContentEditable||e.ctrlKey||e.altKey||e.metaKey)return;
    const routes={h:"#home",a:"#about",s:"#skills",p:"#projects",c:"#contact"};
    const key=e.key.toLowerCase();
    if(routes[key])location.hash=routes[key];
    if(key==="t"){toggleChat(false);terminalInput.focus();$("#lab").scrollIntoView({behavior:reducedMotion?"auto":"smooth"});}
  });
})();
// BACKGROUND AUDIO
const backgroundAudio = document.getElementById("backgroundAudio");

if (backgroundAudio) {
    backgroundAudio.volume = 0.3;

    document.addEventListener("click", () => {
        if (backgroundAudio.paused) {
            backgroundAudio.play().catch(error => {
                console.log("Audio playback blocked:", error);
            });
        }
    }, { once: true });
}
