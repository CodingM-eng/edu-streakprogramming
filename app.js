// app.js - ADNSU 1st Group Prep Dashboard Upgraded Multi-User Core JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // ==================== STATE MANAGEMENT ====================
  const questions = typeof questionsDatabase !== 'undefined' ? questionsDatabase : [];

  let currentUser = null; // "Muhammed" or "Mashallah"
  let userData = {
    grade: 5,
    history: [],
    math_roadmap_progress: {},
    study_plan_progress: {},
    savedAnswers: {},
    markedDoubtful: {},
    activeExamQuestions: [],
    currentDifficulty: "normal"
  };

  let activeExamQuestions = [];
  let userAnswers = {};
  let markedDoubtful = {};
  let currentDifficulty = "normal";
  let isLoadingProfile = false; // Flag to suppress alerts during profile load

  // ==================== DOM ELEMENTS ====================
  // Login DOM Elements
  const loginScreen = document.getElementById("login-screen");
  const profileMuhammed = document.getElementById("profile-muhammed");
  const profileMashallah = document.getElementById("profile-mashallah");
  
  // Sidebar User widget
  const sidebarActiveUserName = document.getElementById("sidebar-active-user-name");
  const sidebarUserAvatarColor = document.getElementById("sidebar-user-avatar-color");
  const btnLogout = document.getElementById("btn-logout");

  // Grade Selector DOM
  const headerClassSelector = document.getElementById("header-class-selector");

  // Global Scoreboard Displays
  const boardScoreMuhammed = document.getElementById("board-score-muhammed");
  const boardAvgMuhammed = document.getElementById("board-avg-muhammed");
  const boardScoreMashallah = document.getElementById("board-score-mashallah");
  const boardAvgMashallah = document.getElementById("board-avg-mashallah");
  const boardPctMashallah = document.getElementById("board-pct-mashallah");
  const boardFillMashallah = document.getElementById("board-fill-mashallah");

  // Tab View controls
  const navButtons = document.querySelectorAll(".nav-btn");
  const tabViews = document.querySelectorAll(".tab-view");
  const dynamicGreeting = document.getElementById("dynamic-greeting");
  
  // Stats DOM Elements
  const statsTotalExams = document.getElementById("stats-total-exams");
  const statsAvgScore = document.getElementById("stats-avg-score");
  const statsAvgLevel = document.getElementById("stats-avg-level");
  const statsMathProgress = document.getElementById("stats-math-progress");
  const statsDailyTasks = document.getElementById("stats-daily-tasks");
  
  // Exam Setup DOM
  const examSetupView = document.getElementById("exam-setup-view");
  const examActiveView = document.getElementById("exam-active-view");
  const examResultsView = document.getElementById("exam-results-view");
  const btnStartExam = document.getElementById("btn-start-exam");
  const btnCheckAnswers = document.getElementById("btn-check-answers");
  const btnResetExam = document.getElementById("btn-reset-exam");
  const btnRestartSetup = document.getElementById("btn-restart-setup");
  const activeQuestionsList = document.getElementById("active-questions-list");
  const examQuestionsCounter = document.getElementById("exam-questions-counter");
  const examStatusBadge = document.getElementById("exam-status-badge");
  const diffNormal = document.getElementById("diff-normal");
  const diffHard = document.getElementById("diff-hard");

  // Exam Results DOM
  const resultsCircle = document.getElementById("results-circle");
  const resultsPercentDisplay = document.getElementById("results-percent-display");
  const resultsGradeLabel = document.getElementById("results-grade-label");
  const resultsRawScore = document.getElementById("results-raw-score");
  const resultsSubjectAnalysisList = document.getElementById("results-subject-analysis-list");
  const gradedMistakesReviewList = document.getElementById("graded-mistakes-review-list");
  const gradedReviewReviewList = document.getElementById("graded-review-review-list");
  const reviewQuestionsBox = document.getElementById("review-questions-box");

  // Help Modal DOM
  const helpModal = document.getElementById("help-modal");
  const helpModalConceptText = document.getElementById("help-modal-concept-text");
  const btnCloseModal = document.getElementById("btn-close-modal");
  const btnModalGotIt = document.getElementById("btn-modal-got-it");
  
  // Roadmap & Plan DOM
  const roadmapTimelineContainer = document.getElementById("roadmap-timeline-container");
  const roadmapGlobalProgress = document.getElementById("roadmap-global-progress");
  const planGlobalProgress = document.getElementById("plan-global-progress");
  const planTabs = document.querySelectorAll(".plan-tab-btn");
  const planListSections = document.querySelectorAll(".plan-list-section");

  // Calculator DOM
  const calcL1Lang = document.getElementById("calc-l1-lang");
  const calcL1Math = document.getElementById("calc-l1-math");
  const calcL1Eng = document.getElementById("calc-l1-eng");
  const calcL2Math = document.getElementById("calc-l2-math");
  const calcL2Phys = document.getElementById("calc-l2-phys");
  const calcL2Info = document.getElementById("calc-l2-info");
  
  const calcL1LangVal = document.getElementById("calc-l1-lang-val");
  const calcL1MathVal = document.getElementById("calc-l1-math-val");
  const calcL1EngVal = document.getElementById("calc-l1-eng-val");
  const calcL2MathVal = document.getElementById("calc-l2-math-val");
  const calcL2PhysVal = document.getElementById("calc-l2-phys-val");
  const calcL2InfoVal = document.getElementById("calc-l2-info-val");
  
  const calcTotalScore = document.getElementById("calc-total-score");
  const calcFacultyTier = document.getElementById("calc-faculty-tier");
  const calcFacultyAnalysis = document.getElementById("calc-faculty-analysis");

  // ==================== STUDY DATA ====================
  const roadmapData = [
    {
      grade: "7-ci Sinif",
      desc: "Riyaziyyat fənni üçün ən təməl riyazi bazanın qurulduğu sinif.",
      topics: [
        "Adi və onluq kəsrlər (sadələşdirmələr)",
        "Nisbət, tənasüb, faiz",
        "Birdəyişənli xətti tənliklər və onların qurulması",
        "Natural üstlü qüvvət, birhədlilər və çoxhədlilər",
        "Üçbucağın elementləri və konqruentliyi"
      ]
    },
    {
      grade: "8-ci Sinif",
      desc: "Cəbri anlayışların dərinləşdiyi və həndəsənin əsas qanunlarının öyrənildiyi mərhələ.",
      topics: [
        "Həqiqi ədədlər və kvadrat köklər",
        "Kvadrat tənliklər və Viyet teoremi",
        "Çoxbucaqlılar və onların sahələri (düzbucaqlı, paraleleqram, trapesiya)",
        "Üçbucaqların oxşarlığı və mütənasib parçalar",
        "Pifaqor teoremi və tətbiqləri"
      ]
    },
    {
      grade: "9-cu Sinif (Buraxılış)",
      desc: "Məktəb buraxılış imtahanının əsasını təşkil edən, baza və orta səviyyəli mövzular.",
      topics: [
        "Xətti və kvadrat bərabərsizliklər, bərabərsizliklər sistemi",
        "Müstəvidə koordinatlar metodu və fiqurların tənlikləri",
        "Vektorlar və onlar üzərində əməllər",
        "Çevrə və dairə, bucaqlar və metrik münasibətlər",
        "Tənliklər sistemi və məsələ həlli"
      ]
    },
    {
      grade: "10-11-ci Sinif (Blok Hazırlıq)",
      desc: "1-ci qrup blok imtahanının ən kritik və ən çox bal qazandıran çətin mövzuları.",
      topics: [
        "Triqonometrik funksiyalar, tənliklər və bərabərsizliklər",
        "Üstlü və loqarifmik funksiyalar, tənliklər sistemi",
        "Limit, funksiyanın törəməsi və onun tətbiqləri",
        "İnteqral (ibtidai funksiya) və sahə hesablanması",
        "Stereometriya: fəzada düz xətlər, prizma, silindr, konus, kürə",
        "Kombinatorika elementləri, Nyuton binomu, ehtimal nəzəriyyəsi"
      ]
    }
  ];

  const planData = {
    "plan-7-8": [
      "Riyaziyyatdan xətti tənliklər və sadə həndəsə mövzularını dərindən öyrənmək",
      "İngilis dilindən gündəlik 15 yeni söz öyrənmək və lüğət ehtiyatını artırmaq",
      "Fizikadan Nyuton qanunları və mexaniki hərəkət mövzularının əsasını anlamaq",
      "Məntiqi tapmacalar və sadə ədəd ardıcıllıqlarını sürətli həll etmək"
    ],
    "plan-9": [
      "Buraxılış fənləri (Riyaziyyat, Azərbaycan dili, İngilis dili) üzrə həftədə minimum 2 sınaq işləmək",
      "Azərbaycan dilindən sintaktik təhlil və morfoloji qaydaları tam təkrar etmək",
      "İngilis dilindən zaman formaları və modal feilləri testlərlə mükəmməlləşdirmək",
      "Riyaziyyatdan çevrə, dairə və bərabərsizliklər mövzularından heç bir boşluq qoymamaq"
    ],
    "plan-10-11": [
      "Riyaziyyatdan Triqonometriya və Loqarifma mövzularından hər biri üzrə 200+ test həll etmək",
      "Fizikadan Elektrodinamika və Optika düsturlarını əzbərləyib mürəkkəb məsələlərdə tətbiq etmək",
      "İnformatikadan Python dilində dövrlər, şərtlər və massivləri sərbəst kodlaşdırmaq",
      "Vaxt limitini tənzimləmək üçün 3 saatlıq real blok sınaq imtahanı simulyasiyası keçirmək"
    ]
  };

  // ==================== SYSTEM LAUNCHER ====================
  function init() {
    setupLoginSystem();
    setDynamicGreeting();
    setupTabSwitching();
    setupPlanTabs();
    setupDifficultyToggle();
    setupExamEngine();
    setupHelpModal();
    setupCalculator();
    
    // Check if there is an active session in local memory (saves active session across page refreshes!)
    const activeSessionUser = localStorage.getItem("active_user_session");
    if (activeSessionUser) {
      selectUserProfile(activeSessionUser);
    } else {
      showLoginScreen();
    }
  }

  // ==================== MULTI-USER LOGIN PORTAL ====================
  function setupLoginSystem() {
    profileMuhammed.addEventListener("click", () => selectUserProfile("Muhammed"));
    profileMashallah.addEventListener("click", () => selectUserProfile("Mashallah"));
    
    btnLogout.addEventListener("click", () => logoutUser());
    
    headerClassSelector.addEventListener("change", (e) => {
      if (currentUser) {
        userData.grade = parseInt(e.target.value);
        saveUserState();
        syncGlobalStats();
        
        // Only show alert if user manually changed (not during profile load)
        if (!isLoadingProfile) {
          if (userData.grade < 7) {
            alert(`Sinif ${userData.grade}-yə dəyişdirildi. Aşağı siniflərdə Fizika və İnformatika tədris olunmadığı üçün sınaqlarda bu fənlər qıfıllanacaq və sualları digər fənlərdən seçiləcəkdir.`);
          } else {
            alert(`Sinif ${userData.grade}-yə dəyişdirildi. Fizika və İnformatika fənləri aktivdir. 1-ci qrup DİM paylanması qüvvədədir.`);
          }
        }
      }
    });
  }

  function showLoginScreen() {
    loginScreen.style.display = "flex";
    syncScoreboard();
  }

  function selectUserProfile(username) {
    isLoadingProfile = true; // Suppress alerts during load
    
    currentUser = username;
    localStorage.setItem("active_user_session", username);
    
    // Read user isolated data slot
    const savedData = localStorage.getItem(`data_${username}`);
    if (savedData) {
      try {
        userData = JSON.parse(savedData);
      } catch (e) {
        console.error("User database corrupted, resetting profile", e);
        initializeDefaultProfile(username);
      }
    } else {
      initializeDefaultProfile(username);
    }

    // Hide Login Overlay Screen
    loginScreen.style.display = "none";

    // Setup Sidebar User Widget
    sidebarActiveUserName.textContent = username;
    if (username === "Muhammed") {
      sidebarUserAvatarColor.style.color = "var(--neon-blue)";
      sidebarUserAvatarColor.className = "fa-solid fa-circle-user";
    } else {
      sidebarUserAvatarColor.style.color = "var(--neon-amber)";
      sidebarUserAvatarColor.className = "fa-solid fa-graduation-cap";
    }

    // Set Header Grade Selector dropdown to saved user grade
    headerClassSelector.value = userData.grade;

    // Update greeting with user name
    setDynamicGreeting();

    // Reset runtime active quiz states
    activeExamQuestions = userData.activeExamQuestions || [];
    userAnswers = userData.savedAnswers || {};
    markedDoubtful = userData.markedDoubtful || {};
    currentDifficulty = userData.currentDifficulty || "normal";

    // Restore difficulty toggle display states
    if (currentDifficulty === "hard") {
      diffHard.classList.add("active");
      diffNormal.classList.remove("active");
    } else {
      diffNormal.classList.add("active");
      diffHard.classList.remove("active");
    }

    // Render components based on active user's checkbox states
    renderRoadmap();
    renderStudyPlan();
    
    // Sync statistics counters
    syncGlobalStats();
    syncScoreboard();

    // Check if they were in an active ongoing exam
    if (activeExamQuestions && activeExamQuestions.length > 0) {
      examSetupView.style.display = "none";
      examActiveView.style.display = "block";
      examResultsView.style.display = "none";
      examStatusBadge.style.display = "inline-flex";
      renderQuestions();
      updateQuestionCounter();
    } else {
      examSetupView.style.display = "block";
      examActiveView.style.display = "none";
      examResultsView.style.display = "none";
      examStatusBadge.style.display = "none";
    }

    isLoadingProfile = false; // Re-enable alerts for manual changes
  }

  function initializeDefaultProfile(username) {
    const defaultGrade = username === "Muhammed" ? 5 : 7;
    userData = {
      grade: defaultGrade,
      history: [],
      math_roadmap_progress: {},
      study_plan_progress: {},
      savedAnswers: {},
      markedDoubtful: {},
      activeExamQuestions: [],
      currentDifficulty: "normal"
    };
    saveUserState();
  }

  function saveUserState() {
    if (currentUser) {
      localStorage.setItem(`data_${currentUser}`, JSON.stringify(userData));
    }
  }

  function logoutUser() {
    if (currentUser) {
      // Save state first
      userData.activeExamQuestions = activeExamQuestions;
      userData.savedAnswers = userAnswers;
      userData.markedDoubtful = markedDoubtful;
      userData.currentDifficulty = currentDifficulty;
      saveUserState();
    }
    
    currentUser = null;
    localStorage.removeItem("active_user_session");
    
    activeExamQuestions = [];
    userAnswers = {};
    markedDoubtful = {};
    
    showLoginScreen();
  }

  // ==================== DIFFICULTY TOGGLE ====================
  function setupDifficultyToggle() {
    diffNormal.addEventListener("click", () => {
      currentDifficulty = "normal";
      diffNormal.classList.add("active");
      diffHard.classList.remove("active");
      
      userData.currentDifficulty = "normal";
      saveUserState();
    });
    
    diffHard.addEventListener("click", () => {
      currentDifficulty = "hard";
      diffHard.classList.add("active");
      diffNormal.classList.remove("active");
      
      userData.currentDifficulty = "hard";
      saveUserState();
    });
  }

  // ==================== DYNAMIC TEST GENERATOR (start) ====================
  function setupExamEngine() {
    btnStartExam.addEventListener("click", startExam);
    btnResetExam.addEventListener("click", startExam);
    btnCheckAnswers.addEventListener("click", checkAnswers);
    btnRestartSetup.addEventListener("click", () => {
      examResultsView.style.display = "none";
      examSetupView.style.display = "block";
      examStatusBadge.style.display = "none";
      
      // Clear ongoing cache
      activeExamQuestions = [];
      userAnswers = {};
      markedDoubtful = {};
      
      userData.activeExamQuestions = [];
      userData.savedAnswers = {};
      userData.markedDoubtful = {};
      saveUserState();
    });
  }

  function startExam() {
    userAnswers = {};
    markedDoubtful = {};
    activeExamQuestions = [];

    // Detect active Grade
    const activeGrade = userData.grade;

    // Define adaptive subject quotas based on class difficulty range
    let quotas = {};
    
    if (activeGrade < 7) {
      // lower grades (1-6) have no Physics / Informatics
      quotas = {
        "Riyaziyyat": 10,
        "Azərbaycan dili": 4,
        "İngilis dili": 4,
        "Məntiq": 2
      };
    } else {
      // standard DİM 1st group percentages
      quotas = {
        "Riyaziyyat": 7,
        "Fizika": 4,
        "Azərbaycan dili": 3,
        "İngilis dili": 3,
        "İnformatika": 2,
        "Məntiq": 1
      };
    }

    let pool = [...questions];

    for (const [subject, count] of Object.entries(quotas)) {
      // Filter for this subject
      let subjectPool = pool.filter(q => q.subject === subject);

      // Adaptive Filter: Filter by compatible grade index
      let gradeFilteredPool = subjectPool.filter(q => q.grades.includes(activeGrade));

      // Fallback: If not enough questions tagged for this specific grade, fall back to draw from full subject pool (ensures crash-free experience!)
      if (gradeFilteredPool.length >= count) {
        subjectPool = gradeFilteredPool;
      }

      // Difficulty Filter: If hard mode is enabled
      if (currentDifficulty === "hard") {
        let hardQuestions = subjectPool.filter(q => q.difficulty === "hard");
        if (hardQuestions.length < count) {
          let extra = subjectPool.filter(q => q.difficulty !== "hard");
          subjectPool = [...hardQuestions, ...extra];
        } else {
          subjectPool = hardQuestions;
        }
      }

      const selected = getRandomSubarray(subjectPool, count);
      activeExamQuestions = activeExamQuestions.concat(selected);
    }

    // Shuffle active exam questions
    shuffleArray(activeExamQuestions);

    // Save exam cache state
    userData.activeExamQuestions = activeExamQuestions;
    userData.savedAnswers = {};
    userData.markedDoubtful = {};
    userData.currentDifficulty = currentDifficulty;
    saveUserState();

    // Toggle exam screens
    examSetupView.style.display = "none";
    examActiveView.style.display = "block";
    examResultsView.style.display = "none";
    examStatusBadge.style.display = "inline-flex";

    renderQuestions();
    updateQuestionCounter();
  }

  function renderQuestions() {
    activeQuestionsList.innerHTML = "";
    
    activeExamQuestions.forEach((q, index) => {
      const card = document.createElement("div");
      card.className = "question-item-card";
      card.id = `q-card-${index}`;

      const meta = document.createElement("div");
      meta.className = "question-meta";
      meta.innerHTML = `
        <span class="meta-badge badge-subject">${q.subject}</span>
        <span class="meta-badge badge-difficulty ${q.difficulty}">${q.difficulty === 'hard' ? 'Çətin' : 'Orta'}</span>
      `;

      const text = document.createElement("div");
      text.className = "question-text";
      text.innerHTML = `<strong>${index + 1}.</strong> ${replaceMathFormulas(q.question)}`;

      const optionsGrid = document.createElement("div");
      optionsGrid.className = "options-grid";

      const letterIndicators = ["A", "B", "C", "D"];
      q.options.forEach((opt, optIndex) => {
        const optionBtn = document.createElement("button");
        optionBtn.className = "option-btn";
        
        if (userAnswers[index] === opt) {
          optionBtn.classList.add("selected");
        }

        optionBtn.innerHTML = `
          <div class="option-indicator">${letterIndicators[optIndex]}</div>
          <span>${replaceMathFormulas(opt)}</span>
        `;
        
        optionBtn.addEventListener("click", () => {
          selectOption(index, opt, optionBtn);
        });

        optionsGrid.appendChild(optionBtn);
      });

      // Actions Container (Başa Sal, Əmin Deyiləm)
      const actionRow = document.createElement("div");
      actionRow.className = "question-actions";

      // 1. Concept Help Button
      const helpBtn = document.createElement("button");
      helpBtn.className = "btn-action-help";
      helpBtn.innerHTML = `<i class="fa-solid fa-lightbulb"></i> Başa Sal`;
      helpBtn.addEventListener("click", () => {
        openHelpModal(q.concept);
      });

      // 2. Doubt Flag Button
      const markBtn = document.createElement("button");
      markBtn.className = "btn-action-mark";
      
      if (markedDoubtful[index]) {
        markBtn.classList.add("marked");
      }

      markBtn.innerHTML = `<i class="fa-solid fa-bookmark"></i> Əmin deyiləm`;
      markBtn.addEventListener("click", () => {
        toggleDoubtFlag(index, markBtn);
      });

      actionRow.appendChild(helpBtn);
      actionRow.appendChild(markBtn);

      card.appendChild(meta);
      card.appendChild(text);
      card.appendChild(optionsGrid);
      card.appendChild(actionRow);
      activeQuestionsList.appendChild(card);
    });
  }

  function selectOption(questionIndex, optionValue, buttonElement) {
    userAnswers[questionIndex] = optionValue;
    
    const card = document.getElementById(`q-card-${questionIndex}`);
    const btns = card.querySelectorAll(".option-btn");
    btns.forEach(btn => btn.classList.remove("selected"));
    
    buttonElement.classList.add("selected");
    
    // Save to user profile cache
    userData.savedAnswers = userAnswers;
    saveUserState();

    updateQuestionCounter();
  }

  function toggleDoubtFlag(questionIndex, buttonElement) {
    markedDoubtful[questionIndex] = !markedDoubtful[questionIndex];
    
    if (markedDoubtful[questionIndex]) {
      buttonElement.classList.add("marked");
    } else {
      buttonElement.classList.remove("marked");
    }

    // Save to user profile cache
    userData.markedDoubtful = markedDoubtful;
    saveUserState();
  }

  function updateQuestionCounter() {
    const answeredCount = Object.keys(userAnswers).length;
    const totalCount = activeExamQuestions.length;
    examQuestionsCounter.textContent = `${totalCount} sualdan ${answeredCount} cavablandırılıb`;
  }

  // ==================== CONCEPT HELP MODAL ====================
  function setupHelpModal() {
    btnCloseModal.addEventListener("click", closeHelpModal);
    btnModalGotIt.addEventListener("click", closeHelpModal);
    helpModal.addEventListener("click", (e) => {
      if (e.target === helpModal) closeHelpModal();
    });
  }

  function openHelpModal(conceptText) {
    helpModalConceptText.innerHTML = replaceMathFormulas(conceptText);
    helpModal.style.display = "flex";
  }

  function closeHelpModal() {
    helpModal.style.display = "none";
  }

  // ==================== CHECK ANSWERS & GRADING ====================
  function checkAnswers() {
    const answeredCount = Object.keys(userAnswers).length;
    
    if (answeredCount < activeExamQuestions.length) {
      if (!confirm("Bəzi sualları boş buraxmısınız. Hər bir boş buraxılan sual səhv hesab olunacaq. Davam etmək istəyirsiniz?")) {
        return;
      }
    }

    let correctCount = 0;
    const totalQuestions = activeExamQuestions.length;
    const subjectScores = {};

    const incorrectReviewData = [];
    const doubtfulReviewData = [];

    activeExamQuestions.forEach((q, index) => {
      const userAns = userAnswers[index];
      const isCorrect = userAns === q.answer;

      if (!subjectScores[q.subject]) {
        subjectScores[q.subject] = { correct: 0, total: 0 };
      }

      subjectScores[q.subject].total++;
      if (isCorrect) {
        correctCount++;
        subjectScores[q.subject].correct++;
      } else {
        incorrectReviewData.push({
          num: index + 1,
          subject: q.subject,
          difficulty: q.difficulty,
          question: q.question,
          options: q.options,
          correctAnswer: q.answer,
          userAnswer: userAns || "Boş buraxılıb",
          explanation: q.explanation
        });
      }

      if (markedDoubtful[index]) {
        doubtfulReviewData.push({
          num: index + 1,
          subject: q.subject,
          difficulty: q.difficulty,
          question: q.question,
          options: q.options,
          correctAnswer: q.answer,
          userAnswer: userAns || "Cavablandırılmayıb",
          explanation: q.explanation,
          concept: q.concept
        });
      }
    });

    const scorePercentage = Math.round((correctCount / totalQuestions) * 100);

    // Save into history of active user profile
    userData.history.push({
      score: scorePercentage,
      date: new Date().toLocaleDateString("az-AZ"),
      difficulty: currentDifficulty,
      correct: correctCount,
      total: totalQuestions,
      grade: userData.grade
    });

    // Reset ongoing quiz states
    activeExamQuestions = [];
    userAnswers = {};
    markedDoubtful = {};

    userData.activeExamQuestions = [];
    userData.savedAnswers = {};
    userData.markedDoubtful = {};
    saveUserState();

    // Render results panels
    renderGradeResults(scorePercentage, correctCount, totalQuestions, subjectScores, incorrectReviewData, doubtfulReviewData);

    // Update global stat cards & comparatives
    syncGlobalStats();
    syncScoreboard();

    // Toggle views
    examActiveView.style.display = "none";
    examResultsView.style.display = "block";
    examStatusBadge.style.display = "none";
  }

  function renderGradeResults(percent, correct, total, subjectScores, incorrectData, doubtfulData) {
    let gradeLabel = "Zəif";
    let gradeClass = "zəif";
    
    if (percent >= 85) {
      gradeLabel = "Yüksək";
      gradeClass = "yüksək";
    } else if (percent >= 70) {
      gradeLabel = "Yaxşı";
      gradeClass = "yaxşı";
    } else if (percent >= 50) {
      gradeLabel = "Orta";
      gradeClass = "orta";
    }

    resultsGradeLabel.textContent = `Səviyyə: ${gradeLabel}`;
    resultsGradeLabel.className = `score-grade-label ${gradeClass}`;
    
    resultsRawScore.textContent = `${total} sualdan ${correct} düzgün cavab`;
    resultsPercentDisplay.innerHTML = `${percent}% <span>NƏTİCƏ</span>`;

    const deg = (percent / 100) * 360;
    let accentColor = "var(--neon-rose)";
    if (gradeClass === "yüksək") accentColor = "var(--neon-teal)";
    else if (gradeClass === "yaxşı") accentColor = "var(--neon-blue)";
    else if (gradeClass === "orta") accentColor = "var(--neon-amber)";

    resultsCircle.style.background = `conic-gradient(${accentColor} ${deg}deg, rgba(255, 255, 255, 0.05) ${deg}deg)`;

    // Subject breakdown progress bars
    resultsSubjectAnalysisList.innerHTML = "";
    
    for (const [subj, data] of Object.entries(subjectScores)) {
      if (data.total === 0) continue;
      const pct = Math.round((data.correct / data.total) * 100);
      
      const item = document.createElement("div");
      item.className = "analysis-item";
      
      let barFillColor = "var(--neon-rose)";
      if (pct >= 85) barFillColor = "var(--neon-teal)";
      else if (pct >= 70) barFillColor = "var(--neon-blue)";
      else if (pct >= 50) barFillColor = "var(--neon-amber)";

      item.innerHTML = `
        <div class="analysis-item-header">
          <span>${subj} (${data.correct}/${data.total})</span>
          <span>${pct}%</span>
        </div>
        <div class="analysis-bar-container">
          <div class="analysis-bar-fill" style="width: ${pct}%; background: ${barFillColor};"></div>
        </div>
      `;
      resultsSubjectAnalysisList.appendChild(item);
    }

    // Step-by-step Mistakes review
    gradedMistakesReviewList.innerHTML = "";
    
    if (incorrectData.length === 0) {
      gradedMistakesReviewList.innerHTML = `
        <div style="text-align: center; padding: 40px; color: var(--neon-teal); font-weight: 600;">
          <i class="fa-solid fa-face-smile" style="font-size: 2.5rem; margin-bottom: 15px; display: block;"></i>
          Təbriklər! Heç bir səhviniz yoxdur, mükəmməl nəticə!
        </div>
      `;
    } else {
      incorrectData.forEach(item => {
        const reviewCard = document.createElement("div");
        reviewCard.className = "question-item-card";
        reviewCard.style.borderColor = "var(--neon-rose-glow)";

        const meta = document.createElement("div");
        meta.className = "question-meta";
        meta.innerHTML = `
          <span class="meta-badge badge-subject">${item.subject}</span>
          <span class="meta-badge badge-difficulty ${item.difficulty}">${item.difficulty === 'hard' ? 'Çətin' : 'Orta'}</span>
          <span class="meta-badge" style="background: rgba(255,42,122,0.15); color: var(--neon-rose);">Sual ${item.num}</span>
        `;

        const text = document.createElement("div");
        text.className = "question-text";
        text.innerHTML = replaceMathFormulas(item.question);

        const responseDetails = document.createElement("div");
        responseDetails.style.display = "flex";
        responseDetails.style.gap = "20px";
        responseDetails.style.marginBottom = "15px";
        responseDetails.style.fontSize = "0.9rem";
        responseDetails.innerHTML = `
          <div style="color: var(--neon-rose);"><strong>Sizin cavab:</strong> ${replaceMathFormulas(item.userAnswer)}</div>
          <div style="color: var(--neon-teal);"><strong>Düzgün cavab:</strong> ${replaceMathFormulas(item.correctAnswer)}</div>
        `;

        const solution = document.createElement("div");
        solution.className = "explanation-box";
        solution.innerHTML = `
          <div class="explanation-title">
            <i class="fa-solid fa-chalkboard-user"></i>
            <span>Addım-Addım Həlli və İzahı:</span>
          </div>
          <div style="white-space: pre-line;">${replaceMathFormulas(item.explanation)}</div>
        `;

        reviewCard.appendChild(meta);
        reviewCard.appendChild(text);
        reviewCard.appendChild(responseDetails);
        reviewCard.appendChild(solution);
        gradedMistakesReviewList.appendChild(reviewCard);
      });
    }

    // Şübhəli Suallar (Doubt Review panel)
    gradedReviewReviewList.innerHTML = "";
    
    if (doubtfulData.length === 0) {
      reviewQuestionsBox.style.display = "none";
    } else {
      reviewQuestionsBox.style.display = "block";
      
      doubtfulData.forEach(item => {
        const reviewCard = document.createElement("div");
        reviewCard.className = "question-item-card";
        reviewCard.style.borderColor = "var(--neon-amber-glow)";

        const meta = document.createElement("div");
        meta.className = "question-meta";
        meta.innerHTML = `
          <span class="meta-badge badge-subject">${item.subject}</span>
          <span class="meta-badge badge-difficulty ${item.difficulty}">${item.difficulty === 'hard' ? 'Çətin' : 'Orta'}</span>
          <span class="meta-badge" style="background: rgba(255,195,0,0.15); color: var(--neon-amber);">Sual ${item.num} (Şübhəli)</span>
        `;

        const text = document.createElement("div");
        text.className = "question-text";
        text.innerHTML = replaceMathFormulas(item.question);

        const responseDetails = document.createElement("div");
        responseDetails.style.display = "flex";
        responseDetails.style.gap = "20px";
        responseDetails.style.marginBottom = "15px";
        responseDetails.style.fontSize = "0.9rem";
        responseDetails.innerHTML = `
          <div style="color: var(--color-text-secondary);"><strong>Seçdiyiniz cavab:</strong> ${replaceMathFormulas(item.userAnswer)}</div>
          <div style="color: var(--neon-teal);"><strong>Düzgün cavab:</strong> ${replaceMathFormulas(item.correctAnswer)}</div>
        `;

        const solution = document.createElement("div");
        solution.className = "explanation-box";
        solution.style.borderColor = "var(--neon-teal-glow)";
        solution.style.background = "rgba(0, 245, 212, 0.03)";
        solution.innerHTML = `
          <div class="explanation-title" style="color: var(--neon-teal);">
            <i class="fa-solid fa-lightbulb"></i>
            <span>Mövzu Konsepti:</span>
          </div>
          <div>${replaceMathFormulas(item.concept)}</div>
          <div class="explanation-title" style="color: var(--neon-amber); margin-top: 15px;">
            <i class="fa-solid fa-chalkboard-user"></i>
            <span>Tam Həlli:</span>
          </div>
          <div style="white-space: pre-line;">${replaceMathFormulas(item.explanation)}</div>
        `;

        reviewCard.appendChild(meta);
        reviewCard.appendChild(text);
        reviewCard.appendChild(responseDetails);
        reviewCard.appendChild(solution);
        gradedReviewReviewList.appendChild(reviewCard);
      });
    }
  }

  // ==================== ROADMAP TIMELINE RENDERER ====================
  function renderRoadmap() {
    roadmapTimelineContainer.innerHTML = "";
    
    // Pull active user's math roadmap checkboxes
    const savedRoadmapProgress = userData.math_roadmap_progress || {};

    roadmapData.forEach((node, nodeIndex) => {
      const timelineNode = document.createElement("div");
      timelineNode.className = "timeline-node";
      
      const dot = document.createElement("div");
      dot.className = "timeline-dot";
      
      const card = document.createElement("div");
      card.className = "timeline-card";
      
      const cardProgress = 0; // Calculated dynamically on load

      card.innerHTML = `
        <div class="timeline-header">
          <h3>${node.grade}</h3>
          <span class="timeline-grade-badge" id="roadmap-badge-${nodeIndex}">${cardProgress}% Tamamlandı</span>
        </div>
        <p class="timeline-desc">${node.desc}</p>
        <div class="timeline-topics-collapse" id="collapse-roadmap-${nodeIndex}">
          <!-- Topic list checkboxes -->
        </div>
      `;

      card.addEventListener("click", (e) => {
        if (e.target.closest(".styled-checkbox-container")) return;
        card.classList.toggle("expanded");
      });

      const collapseDiv = card.querySelector(`.timeline-topics-collapse`);
      
      node.topics.forEach((topic, topicIndex) => {
        const topicId = `roadmap_node_${nodeIndex}_topic_${topicIndex}`;
        const isChecked = savedRoadmapProgress[topicId] ? "checked" : "";
        
        const topicItem = document.createElement("div");
        topicItem.className = "roadmap-topic-item";
        
        topicItem.innerHTML = `
          <label class="styled-checkbox-container">
            <input type="checkbox" id="${topicId}" ${isChecked}>
            <div class="styled-checkbox-box">
              <i class="fa-solid fa-check"></i>
            </div>
            <span class="styled-checkbox-text">${topic}</span>
          </label>
        `;

        const checkboxInput = topicItem.querySelector("input");
        checkboxInput.addEventListener("change", (e) => {
          savedRoadmapProgress[topicId] = e.target.checked;
          userData.math_roadmap_progress = savedRoadmapProgress;
          saveUserState();
          
          const newProgress = getCardTopicsProgress(nodeIndex);
          document.getElementById(`roadmap-badge-${nodeIndex}`).textContent = `${newProgress}% Tamamlandı`;
          
          if (newProgress === 100) {
            timelineNode.classList.add("active");
          } else {
            timelineNode.classList.remove("active");
          }

          updateRoadmapGlobalProgress();
          syncGlobalStats();
        });

        collapseDiv.appendChild(topicItem);
      });

      timelineNode.appendChild(dot);
      timelineNode.appendChild(card);
      roadmapTimelineContainer.appendChild(timelineNode);
    });

    updateRoadmapGlobalProgress();
  }

  function getCardTopicsProgress(nodeIndex) {
    const timelineCard = document.getElementById(`collapse-roadmap-${nodeIndex}`);
    if (!timelineCard) return 0;
    
    const checkboxes = timelineCard.querySelectorAll("input[type='checkbox']");
    const total = checkboxes.length;
    if (total === 0) return 0;
    
    const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
    return Math.round((checked / total) * 100);
  }

  function updateRoadmapGlobalProgress() {
    const checkboxes = roadmapTimelineContainer.querySelectorAll("input[type='checkbox']");
    const total = checkboxes.length;
    if (total === 0) return;
    
    const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
    const percent = Math.round((checked / total) * 100);
    
    roadmapGlobalProgress.textContent = `Tərəqqi: ${percent}%`;
    statsMathProgress.textContent = `${percent}%`;
    
    // Refresh card badges on load
    roadmapData.forEach((node, nodeIndex) => {
      const cbs = roadmapTimelineContainer.querySelectorAll(`input[id^='roadmap_node_${nodeIndex}_']`);
      const t = cbs.length;
      const c = Array.from(cbs).filter(cb => cb.checked).length;
      const p = t > 0 ? Math.round((c / t) * 100) : 0;
      
      const badge = document.getElementById(`roadmap-badge-${nodeIndex}`);
      if (badge) badge.textContent = `${p}% Tamamlandı`;
      
      // Node lighting dot states
      const timelineNodeElement = badge?.closest(".timeline-node");
      if (timelineNodeElement) {
        if (p === 100) timelineNodeElement.classList.add("active");
        else timelineNodeElement.classList.remove("active");
      }
    });
  }

  // ==================== STUDY PLAN CHECKLIST RENDERER ====================
  function renderStudyPlan() {
    const savedPlanProgress = userData.study_plan_progress || {};
    
    for (const [planId, list] of Object.entries(planData)) {
      const container = document.getElementById(planId);
      if (!container) continue;
      
      container.innerHTML = "";
      
      list.forEach((task, index) => {
        const taskId = `${planId}_task_${index}`;
        const isChecked = savedPlanProgress[taskId] ? "checked" : "";
        
        const card = document.createElement("div");
        card.className = "plan-card-item";
        card.innerHTML = `
          <label class="styled-checkbox-container">
            <input type="checkbox" id="${taskId}" ${isChecked}>
            <div class="styled-checkbox-box">
              <i class="fa-solid fa-check"></i>
            </div>
            <span class="styled-checkbox-text" style="font-size: 0.95rem; font-weight: 500;">${task}</span>
          </label>
          <span style="font-size: 0.75rem; color: var(--color-text-muted); font-weight: 600; text-transform: uppercase;">Aktiv</span>
        `;

        const checkboxInput = card.querySelector("input");
        checkboxInput.addEventListener("change", (e) => {
          savedPlanProgress[taskId] = e.target.checked;
          userData.study_plan_progress = savedPlanProgress;
          saveUserState();
          
          updateStudyPlanGlobalProgress();
          syncGlobalStats();
        });

        container.appendChild(card);
      });
    }

    updateStudyPlanGlobalProgress();
  }

  function updateStudyPlanGlobalProgress() {
    const mainContainer = document.getElementById("plan-tab");
    const checkboxes = mainContainer.querySelectorAll("input[type='checkbox']");
    const total = checkboxes.length;
    if (total === 0) return;
    
    const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
    const percent = Math.round((checked / total) * 100);
    
    planGlobalProgress.textContent = `Tamamlanma: ${percent}%`;
    statsDailyTasks.textContent = `${percent}%`;
  }

  // ==================== TARGET CALCULATOR ENGINE ====================
  function setupCalculator() {
    const sliders = [calcL1Lang, calcL1Math, calcL1Eng, calcL2Math, calcL2Phys, calcL2Info];
    
    sliders.forEach(slider => {
      slider.addEventListener("input", () => {
        updateCalculatorDisplays();
      });
    });

    updateCalculatorDisplays();
  }

  function updateCalculatorDisplays() {
    const v1 = parseInt(calcL1Lang.value);
    const v2 = parseInt(calcL1Math.value);
    const v3 = parseInt(calcL1Eng.value);
    const v4 = parseInt(calcL2Math.value);
    const v5 = parseInt(calcL2Phys.value);
    const v6 = parseInt(calcL2Info.value);

    // Render displays
    calcL1LangVal.textContent = `${v1} Bal`;
    calcL1MathVal.textContent = `${v2} Bal`;
    calcL1EngVal.textContent = `${v3} Bal`;
    calcL2MathVal.textContent = `${v4} Bal`;
    calcL2PhysVal.textContent = `${v5} Bal`;
    calcL2InfoVal.textContent = `${v6} Bal`;

    const total = v1 + v2 + v3 + v4 + v5 + v6;
    calcTotalScore.textContent = total;

    // Faculty analytics
    let faculty = "ADNSU - İxtisasa yetərli deyil";
    let analysis = "Topladığınız bal hələ ki, ADNSU ixtisasları üçün zəifdir. Riyaziyyat və Fizikaya gündəlik 3 saat sistemli zaman ayırmalısınız.";
    
    if (total >= 650) {
      faculty = "İnformasiya Texnologiyaları (Ödənişsiz)";
      analysis = `Təbriklər! Mükəmməl baldır (<strong>${total} Bal</strong>). Bu göstərici ilə ADNSU-nun ən prestijli <strong>İT (Ödənişsiz)</strong> və ya ADA Universitetinin bir çox ixtisaslarında dövlət tələbəsi ola bilərsiz.`;
    } else if (total >= 600) {
      faculty = "Kompüter Mühəndisliyi (Ödənişsiz)";
      analysis = `Əla nəticədir! (<strong>${total} Bal</strong>). ADNSU-nun <strong>Kompüter Mühəndisliyi</strong> və ya <strong>İnformasiya Təhlükəsizliyi</strong> ixtisaslarında dövlət tələbəsi sifətində oxumaq şansınız çox yüksəkdir.`;
    } else if (total >= 500) {
      faculty = "Sistem Mühəndisliyi / Avtomatlaşdırma";
      analysis = `Güclü nəticə! (<strong>${total} Bal</strong>). Bu balla ADNSU-da <strong>Cihazqayırma</strong>, <strong>Sistem Mühəndisliyi</strong> və ya <strong>Proseslərin Avtomatlaşdırılması</strong> ixtisaslarında qəbul ola bilərsiz.`;
    } else if (total >= 400) {
      faculty = "Neft-Qaz Mühəndisliyi / Mexanika";
      analysis = `Qənaətbəxş bal. (<strong>${total} Bal</strong>). ADNSU-nun ənənəvi ən güclü sahəsi olan <strong>Neft-Qaz Mühəndisliyi</strong>, <strong>Mexanika Mühəndisliyi</strong> və ya <strong>Kimya Texnologiyası</strong> ixtisaslarında qəbul edilmə ehtimalınız vardır.`;
    } else if (total >= 200) {
      faculty = "Geologiya Mühəndisliyi / Ekologiya";
      analysis = `Keçid balını aşmısınız (<strong>${total} Bal</strong>). ADNSU-da <strong>Geofizika</strong>, <strong>Ekologiya</strong> və ya ödənişli əsaslarla digər mühəndislik sahələrində yer ala bilərsiz.`;
    }

    calcFacultyTier.textContent = faculty;
    calcFacultyAnalysis.innerHTML = analysis;
  }

  // ==================== STATS SYNCING ENGINE ====================
  function syncGlobalStats() {
    if (!currentUser) return;

    statsTotalExams.textContent = userData.history.length;
    
    if (userData.history.length > 0) {
      const sum = userData.history.reduce((a, b) => a + b.score, 0);
      const avg = Math.round(sum / userData.history.length);
      statsAvgScore.textContent = `${avg}%`;
      
      let level = "Zəif";
      if (avg >= 85) level = "Yüksək";
      else if (avg >= 70) level = "Yaxşı";
      else if (avg >= 50) level = "Orta";
      
      statsAvgLevel.innerHTML = `<span>Səviyyə: ${level}</span>`;
    } else {
      statsAvgScore.textContent = "0%";
      statsAvgLevel.innerHTML = "<span>Səviyyə: Yoxdur</span>";
    }

    // Refresh widgets
    const roadmapCbs = roadmapTimelineContainer ? roadmapTimelineContainer.querySelectorAll("input[type='checkbox']") : [];
    if (roadmapCbs.length > 0) {
      const t = roadmapCbs.length;
      const c = Array.from(roadmapCbs).filter(cb => cb.checked).length;
      statsMathProgress.textContent = `${Math.round((c / t) * 100)}%`;
    }

    const planTab = document.getElementById("plan-tab");
    const planCbs = planTab ? planTab.querySelectorAll("input[type='checkbox']") : [];
    if (planCbs.length > 0) {
      const t = planCbs.length;
      const c = Array.from(planCbs).filter(cb => cb.checked).length;
      statsDailyTasks.textContent = `${Math.round((c / t) * 100)}%`;
    }
  }

  // ==================== UPGRADE: GLOBAL COMPARATIVE SCOREBOARD ====================
  function syncScoreboard() {
    // 1. Muhammed stats
    const rawMuhammed = localStorage.getItem("data_Muhammed");
    if (rawMuhammed) {
      const data = JSON.parse(rawMuhammed);
      if (data.history && data.history.length > 0) {
        const last = data.history[data.history.length - 1].score;
        const sum = data.history.reduce((a, b) => a + b.score, 0);
        const avg = Math.round(sum / data.history.length);
        
        boardScoreMuhammed.textContent = `${last}%`;
        boardAvgMuhammed.textContent = `${avg}%`;
      } else {
        boardScoreMuhammed.textContent = "Yoxdur";
        boardAvgMuhammed.textContent = "Yoxdur";
      }
    }

    // 2. Mashallah stats
    const rawMashallah = localStorage.getItem("data_Mashallah");
    if (rawMashallah) {
      const data = JSON.parse(rawMashallah);
      if (data.history && data.history.length > 0) {
        const last = data.history[data.history.length - 1].score;
        const sum = data.history.reduce((a, b) => a + b.score, 0);
        const avg = Math.round(sum / data.history.length);
        
        boardScoreMashallah.textContent = `${last}%`;
        boardAvgMashallah.textContent = `${avg}%`;

        // Calculate ADNSU Target Progress (Percentage of Average Score towards 100% exam goal)
        boardPctMashallah.textContent = `${avg}%`;
        boardFillMashallah.style.width = `${avg}%`;
      } else {
        boardScoreMashallah.textContent = "Yoxdur";
        boardAvgMashallah.textContent = "Yoxdur";
        boardPctMashallah.textContent = "0%";
        boardFillMashallah.style.width = "0%";
      }
    }
  }

  // ==================== UTILITY FUNCTIONS ====================
  function getRandomSubarray(arr, size) {
    let shuffled = arr.slice(0);
    shuffleArray(shuffled);
    return shuffled.slice(0, size);
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Formula renderer mapping
  function replaceMathFormulas(text) {
    if (typeof text !== 'string') return text;
    
    return text
      .replace(/\\sqrt\{([^}]+)\}/g, '<span style="font-family: Cambria, Georgia, serif; font-style: italic;">&radic;<span style="border-top: 1px solid currentColor; padding-top: 1px; margin-left: -2px;">$1</span></span>')
      .replace(/\\lg\(([^)]+)\)/g, 'lg($1)')
      .replace(/\\sin\^2\s*x/g, 'sin²x')
      .replace(/\\cos\^2\s*x/g, 'cos²x')
      .replace(/\\sin\s*2x/g, 'sin 2x')
      .replace(/\\sin\s*x/g, 'sin x')
      .replace(/\\cos\s*x/g, 'cos x')
      .replace(/\\sin/g, 'sin')
      .replace(/\\cos/g, 'cos')
      .replace(/\\pi/g, '&pi;')
      .replace(/\\cdot/g, '&middot;')
      .replace(/\\vec\{a\}/g, '<span style="text-decoration: overline;">a</span>')
      .replace(/\\vec\{b\}/g, '<span style="text-decoration: overline;">b</span>')
      .replace(/\\mu/g, '&mu;')
      .replace(/\\rho/g, '&rho;')
      .replace(/\\Delta/g, '&Delta;')
      .replace(/\\ge/g, '&ge;')
      .replace(/\\le/g, '&le;')
      .replace(/\\neq/g, '&ne;')
      .replace(/\\pm/g, '&plusmn;')
      .replace(/\\int_\{0\}\^\{\\pi\}/g, '<span style="font-size: 1.2rem; line-height: 0;">&int;</span><sub>0</sub><sup>&pi;</sup>')
      .replace(/\\int/g, '<span style="font-size: 1.2rem; line-height: 0;">&int;</span>')
      .replace(/\^2/g, '²')
      .replace(/\^3/g, '³')
      .replace(/_2/g, '<sub>2</sub>')
      .replace(/\_x/g, '<sub>x</sub>')
      .replace(/\_t/g, '<sub>t</sub>')
      .replace(/\_f/g, '<sub>f</sub>')
      .replace(/\_k/g, '<sub>k</sub>')
      .replace(/\_0/g, '<sub>0</sub>')
      .replace(/\_b/g, '<sub>b</sub>')
      .replace(/^-19/g, '<sup>-19</sup>')
      .replace(/10\^\{-19\}/g, '10<sup>-19</sup>');
  }

  // ==================== DYNAMIC GREETING ====================
  function setDynamicGreeting() {
    const hour = new Date().getHours();
    let timeGreeting = "Xoş Gəldin";
    
    if (hour >= 5 && hour < 12) {
      timeGreeting = "Sabahın Xeyir";
    } else if (hour >= 12 && hour < 17) {
      timeGreeting = "Günortanız Xeyir";
    } else if (hour >= 17 && hour < 22) {
      timeGreeting = "Axşamınız Xeyir";
    } else {
      timeGreeting = "Gecəniz Xeyir";
    }
    
    const name = currentUser || "Abituriyent";
    dynamicGreeting.textContent = `${timeGreeting}, ${name}!`;
  }

  // ==================== TAB SWITCHING ====================
  function setupTabSwitching() {
    navButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const targetTab = btn.getAttribute("data-tab");
        
        // Deactivate all nav buttons
        navButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        
        // Hide all tab views
        tabViews.forEach(tab => tab.classList.remove("active"));
        
        // Show target tab
        const targetElement = document.getElementById(targetTab);
        if (targetElement) {
          targetElement.classList.add("active");
        }
      });
    });
  }

  // ==================== PLAN TAB SWITCHING ====================
  function setupPlanTabs() {
    planTabs.forEach(btn => {
      btn.addEventListener("click", () => {
        const targetPlan = btn.getAttribute("data-plan");
        
        // Deactivate all plan tab buttons
        planTabs.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        
        // Hide all plan list sections
        planListSections.forEach(sec => sec.classList.remove("active"));
        
        // Show target plan section
        const targetSection = document.getElementById(targetPlan);
        if (targetSection) {
          targetSection.classList.add("active");
        }
      });
    });
  }

  // ==================== ENGINE LAUNCH ====================
  init();
});
