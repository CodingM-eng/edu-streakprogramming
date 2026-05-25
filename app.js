// app.js - Main exam dashboard logic with caching, navigation, and result locking
const STORAGE_AUTH_KEY = 'exam_app_user';
const DEFAULT_GRADE = 7;
const DEFAULT_DIFFICULTY = 'normal';

let currentUser = null;
let userHistory = [];
let userProgress = {};
let examCache = null;
let questions = typeof questionsDatabase !== 'undefined' ? questionsDatabase : [];

const sidebarActiveUserName = document.getElementById('sidebar-active-user-name');
const sidebarUserAvatarColor = document.getElementById('sidebar-user-avatar-color');
const btnLogout = document.getElementById('btn-logout');
const headerClassSelector = document.getElementById('header-class-selector');
const diffNormal = document.getElementById('diff-normal');
const diffHard = document.getElementById('diff-hard');
const navButtons = document.querySelectorAll('.nav-btn');
const tabViews = document.querySelectorAll('.tab-view');
const dynamicGreeting = document.getElementById('dynamic-greeting');
const statsTotalExams = document.getElementById('stats-total-exams');
const statsAvgScore = document.getElementById('stats-avg-score');
const statsAvgLevel = document.getElementById('stats-avg-level');
const statsMathProgress = document.getElementById('stats-math-progress');
const statsDailyTasks = document.getElementById('stats-daily-tasks');
const boardScoreMuhammed = document.getElementById('board-score-muhammed');
const boardAvgMuhammed = document.getElementById('board-avg-muhammed');
const boardScoreMashallah = document.getElementById('board-score-mashallah');
const boardAvgMashallah = document.getElementById('board-avg-mashallah');
const boardPctMashallah = document.getElementById('board-pct-mashallah');
const boardFillMashallah = document.getElementById('board-fill-mashallah');
const examSetupView = document.getElementById('exam-setup-view');
const examActiveView = document.getElementById('exam-active-view');
const examResultsView = document.getElementById('exam-results-view');
const btnStartExam = document.getElementById('btn-start-exam');
const btnCheckAnswers = document.getElementById('btn-check-answers');
const btnResetExam = document.getElementById('btn-reset-exam');
const btnRestartSetup = document.getElementById('btn-restart-setup');
const btnPrevQuestion = document.getElementById('btn-prev-question');
const btnNextQuestion = document.getElementById('btn-next-question');
const activeQuestionsList = document.getElementById('active-questions-list');
const examQuestionsCounter = document.getElementById('exam-questions-counter');
const examStatusBadge = document.getElementById('exam-status-badge');
const resultsCircle = document.getElementById('results-circle');
const resultsPercentDisplay = document.getElementById('results-percent-display');
const resultsGradeLabel = document.getElementById('results-grade-label');
const resultsRawScore = document.getElementById('results-raw-score');
const resultsSubjectAnalysisList = document.getElementById('results-subject-analysis-list');
const gradedMistakesReviewList = document.getElementById('graded-mistakes-review-list');
const gradedReviewReviewList = document.getElementById('graded-review-review-list');
const backupDataTextarea = document.getElementById('backup-data-textarea');
const btnExportBackup = document.getElementById('btn-export-backup');
const btnRestoreBackup = document.getElementById('btn-restore-backup');
const btnClearHistory = document.getElementById('btn-clear-history');
const timerSelect = document.getElementById('timer-select');
const examTimerDisplay = document.getElementById('exam-timer-display');
const examProgressFill = document.getElementById('exam-progress-fill');

function initApp() {
  currentUser = CacheManager.loadAuthUser();
  if (!currentUser) {
    redirectToLogin();
    return;
  }

  bindUi();
  loadUserState();
  renderTopBar();
  renderTab('exam-tab');
  updateScoreboard();
  updateStats();
  refreshExamView();
}

function redirectToLogin() {
  window.location.href = 'login.html';
}

function bindUi() {
  navButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.tab;
      renderTab(target);
    });
  });

  btnLogout.addEventListener('click', () => {
    CacheManager.clearAuth();
    redirectToLogin();
  });

  headerClassSelector.addEventListener('change', (event) => {
    const selected = parseInt(event.target.value, 10);
    examCache.grade = selected;
    userProgress.lastGrade = selected;
    saveProgress();
    renderTopBar();
    updateStats();
  });

  diffNormal.addEventListener('click', () => setDifficulty('normal'));
  diffHard.addEventListener('click', () => setDifficulty('hard'));
  btnStartExam.addEventListener('click', startNewExam);
  btnResetExam.addEventListener('click', resetExam);
  btnCheckAnswers.addEventListener('click', gradeExam);
  btnRestartSetup.addEventListener('click', resetExam);
  btnPrevQuestion.addEventListener('click', showPreviousQuestion);
  btnNextQuestion.addEventListener('click', showNextQuestion);
  btnExportBackup.addEventListener('click', exportBackup);
  btnRestoreBackup.addEventListener('click', restoreBackup);
  btnClearHistory.addEventListener('click', clearHistory);
}

function loadUserState() {
  userHistory = CacheManager.loadHistory(currentUser);
  userProgress = CacheManager.loadProgress(currentUser) || {};
  const savedGrade = userProgress.lastGrade || DEFAULT_GRADE;

  if (!headerClassSelector.value || Number(headerClassSelector.value) !== savedGrade) {
    headerClassSelector.value = savedGrade;
  }

  examCache = CacheManager.loadCache(currentUser);
  if (!examCache) {
    examCache = createEmptyExamCache();
  }

  if (examCache.status === 'completed') {
    const validScore = CacheManager.verifyScoreToken(
      examCache.finalScore,
      examCache.scoreTimestamp,
      currentUser,
      examCache.scoreToken
    );

    if (!validScore) {
      alert('İmtahan nəticəsində saxtakarlıq aşkarlandı. Cari məlumatlar sıfırlanır.');
      examCache = createEmptyExamCache();
    }
  }

  if (!examCache.grade) {
    examCache.grade = savedGrade;
  }

  if (!examCache.difficulty) {
    examCache.difficulty = DEFAULT_DIFFICULTY;
  }

  // Ensure answers and doubtful are objects keyed by questionId
  examCache.answers = examCache.answers || {};
  examCache.doubtful = examCache.doubtful || {};

  // Resume timer if exam was active
  if (examCache.status === 'active' && examCache.remainingTimeSeconds && examCache.remainingTimeSeconds > 0) {
    startTimer();
  }

  setDifficulty(examCache.difficulty, false);
  saveExamCache();
  saveProgress();
}

function createEmptyExamCache() {
  return {
    examId: null,
    status: 'idle',
    startedAt: null,
    questionIds: [],
    currentQuestionIndex: 0,
    answers: {}, // keyed by questionId
    doubtful: {}, // keyed by questionId
    difficulty: DEFAULT_DIFFICULTY,
    grade: parseInt(headerClassSelector.value, 10) || DEFAULT_GRADE,
    finalScore: null,
    scoreTimestamp: null,
    scoreToken: null,
    durationSeconds: 0
  };
}

function saveExamCache() {
  CacheManager.saveCache(currentUser, examCache);
}

function saveHistory() {
  CacheManager.saveHistory(currentUser, userHistory);
}

function saveProgress() {
  const progress = {
    ...userProgress,
    lastGrade: examCache.grade,
    lastDifficulty: examCache.difficulty,
    lastActivity: Date.now()
  };
  userProgress = progress;
  CacheManager.saveProgress(currentUser, userProgress);
}

function renderTopBar() {
  sidebarActiveUserName.textContent = currentUser;
  sidebarUserAvatarColor.style.color = currentUser === 'Muhammed' ? 'var(--neon-teal)' : 'var(--neon-amber)';
  dynamicGreeting.textContent = `Xoş gəlmisiniz, ${currentUser}!`;
}

function renderTab(tabId) {
  navButtons.forEach((button) => {
    const target = button.dataset.tab;
    button.classList.toggle('active', target === tabId);
  });

  tabViews.forEach((view) => {
    view.classList.toggle('active', view.id === tabId);
  });
}

function setDifficulty(value, save = true) {
  examCache.difficulty = value;
  diffNormal.classList.toggle('active', value === 'normal');
  diffHard.classList.toggle('active', value === 'hard');
  if (save) {
    saveExamCache();
    saveProgress();
  }
}

function updateScoreboard() {
  const muhammedHistory = CacheManager.loadHistory('Muhammed');
  const mashallahHistory = CacheManager.loadHistory('Mashallah');
  const first = (arr) => (arr.length ? arr[0].score + ' / ' + arr[0].total : 'Yoxdur');
  const avg = (arr) => (arr.length ? Math.round(arr.reduce((sum, item) => sum + item.score, 0) / arr.length) : 0);
  const progressPercent = (arr) => (arr.length ? Math.round((avg(arr) / (arr[0]?.total || 20)) * 100) : 0);

  boardScoreMuhammed.textContent = first(muhammedHistory);
  boardAvgMuhammed.textContent = avg(muhammedHistory) || '0';
  boardScoreMashallah.textContent = first(mashallahHistory);
  boardAvgMashallah.textContent = avg(mashallahHistory) || '0';
  boardPctMashallah.textContent = `${progressPercent(mashallahHistory)}%`;
  boardFillMashallah.style.width = `${progressPercent(mashallahHistory)}%`;
}

function updateStats() {
  const total = userHistory.length;
  const average = total ? Math.round(userHistory.reduce((sum, item) => sum + item.score, 0) / total) : 0;
  statsTotalExams.textContent = `${total} sınaq`;
  statsAvgScore.textContent = `${average} Bal`;
  statsAvgLevel.textContent = examCache.difficulty === 'hard' ? 'Çətin' : 'Normal';
  statsMathProgress.textContent = `${userProgress.lastGrade || DEFAULT_GRADE}-ci sinif üzrə davam edir`;
  statsDailyTasks.textContent = `Sən təxminən ${userHistory.length * 2 + 4} tapşırıq tamamlamısan`; 
}

function refreshExamView() {
  const active = examCache.status === 'active';
  const completed = examCache.status === 'completed';
  examSetupView.style.display = !active && !completed ? 'block' : 'none';
  examActiveView.style.display = active ? 'block' : 'none';
  examResultsView.style.display = completed ? 'block' : 'none';

  examStatusBadge.textContent = active ? 'İmtahan davam edir' : completed ? 'İmtahan tamamlandı' : 'Hazır';
  examStatusBadge.style.display = 'inline-flex';

  if (active) {
    renderCurrentQuestion();
  }

  if (completed) {
    renderResults();
  }

  updateExamControls();
}

function updateExamControls() {
  const active = examCache.status === 'active';
  const completed = examCache.status === 'completed';

  btnCheckAnswers.style.display = active ? 'inline-flex' : 'none';
  btnResetExam.style.display = active ? 'inline-flex' : 'none';
  btnRestartSetup.style.display = completed ? 'inline-flex' : 'none';
  btnPrevQuestion.disabled = !examCache.questionIds.length || examCache.currentQuestionIndex === 0;
  btnNextQuestion.disabled = !examCache.questionIds.length || examCache.currentQuestionIndex >= examCache.questionIds.length - 1;

  const counterText = examCache.questionIds.length ? `${examCache.currentQuestionIndex + 1} / ${examCache.questionIds.length}` : '0 / 0';
  document.getElementById('question-position-indicator').textContent = counterText;
  examQuestionsCounter.textContent = active ? `Sual ${counterText}` : examCache.questionIds.length ? `${examCache.questionIds.length} sual` : '20 sual';
  // update progress bar (answered / total)
  try {
    const total = examCache.questionIds.length || 20;
    const answered = Object.keys(examCache.answers || {}).filter((id) => examCache.questionIds.includes(id)).length;
    const pct = total ? Math.round((answered / total) * 100) : 0;
    if (examProgressFill) examProgressFill.style.width = `${pct}%`;
    // update timer display
    if (examTimerDisplay) {
      if (examCache.status === 'active' && typeof examCache.remainingTimeSeconds === 'number' && examCache.remainingTimeSeconds > 0) {
        examTimerDisplay.textContent = formatTime(examCache.remainingTimeSeconds);
      } else if (examCache.status === 'completed') {
        examTimerDisplay.textContent = 'Tamamlandı';
      } else {
        examTimerDisplay.textContent = '—:—';
      }
    }
  } catch (err) {
    // ignore
  }
}

// Timer helpers
let _examTimerInterval = null;
function startTimer() {
  if (_examTimerInterval) clearInterval(_examTimerInterval);
  _examTimerInterval = setInterval(() => {
    if (!examCache || examCache.status !== 'active') {
      clearInterval(_examTimerInterval);
      _examTimerInterval = null;
      return;
    }
    if (typeof examCache.remainingTimeSeconds !== 'number') examCache.remainingTimeSeconds = 0;
    examCache.remainingTimeSeconds -= 1;
    if (examCache.remainingTimeSeconds < 0) examCache.remainingTimeSeconds = 0;
    saveExamCache();
    updateExamControls();
    if (examCache.remainingTimeSeconds <= 0) {
      clearInterval(_examTimerInterval);
      _examTimerInterval = null;
      // auto submit
      gradeExam();
    }
  }, 1000);
}

function stopTimer() {
  if (_examTimerInterval) {
    clearInterval(_examTimerInterval);
    _examTimerInterval = null;
  }
}

function formatTime(seconds) {
  if (!seconds && seconds !== 0) return '—:—';
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function startNewExam() {
  if (examCache.status === 'active' && !confirm('Mövcud imtahanı dayandırıb yeni imtahana başlamaq istəyirsiniz?')) {
    return;
  }
  createNewExam();
}

function resetExam() {
  if (!confirm('İmtahanı sıfırlamaq və yeni suallar yaratmaq istədiyinizə əminsiniz?')) {
    return;
  }
  createNewExam();
}

function createNewExam() {
  const grade = parseInt(headerClassSelector.value, 10) || DEFAULT_GRADE;
  const difficulty = examCache.difficulty || DEFAULT_DIFFICULTY;
  // Read selected subjects from UI
  const selectedSubjects = Array.from(document.querySelectorAll('input[name="filter-subject"]:checked')).map((i) => i.value);
  const selectedTimer = parseInt(timerSelect?.value || '0', 10) || 0;

  const pool = questions.filter((question) => {
    if (!question || !Array.isArray(question.options) || question.options.length === 0) return false;
    const allowsGrade = Array.isArray(question.grades) ? question.grades.includes(grade) : true;
    const allowsDifficulty = difficulty === 'hard' ? true : question.difficulty !== 'hard';
    const allowsSubject = !selectedSubjects.length || selectedSubjects.includes(question.subject);
    return allowsGrade && allowsDifficulty && allowsSubject;
  });

  const questionIds = getRandomQuestionIds(pool, 20);

  examCache = {
    examId: Date.now(),
    status: 'active',
    startedAt: Date.now(),
    questionIds,
    currentQuestionIndex: 0,
    answers: {},
    doubtful: {},
    difficulty,
    grade,
    remainingTimeSeconds: selectedTimer || 0,
    finalScore: null,
    scoreTimestamp: null,
    scoreToken: null,
    durationSeconds: 0
  };

  saveExamCache();
  saveProgress();
  updateScoreboard();
  updateStats();
  if (examCache.remainingTimeSeconds && examCache.remainingTimeSeconds > 0) startTimer();
  refreshExamView();
}

function getRandomQuestionIds(pool, count) {
  const picked = [];
  const usedIds = new Set();

  // shuffle helper
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  const poolCopy = pool.slice();
  shuffle(poolCopy);
  for (let i = 0; i < poolCopy.length && picked.length < count; i += 1) {
    const q = poolCopy[i];
    if (q && q.id && !usedIds.has(q.id)) {
      usedIds.add(q.id);
      picked.push(q.id);
    }
  }

  // fallback: fill from global questions list excluding already picked
  if (picked.length < count) {
    const fallback = questions.filter((q) => q && q.id && !usedIds.has(q.id) && Array.isArray(q.options) && q.options.length > 0);
    shuffle(fallback);
    for (let i = 0; i < fallback.length && picked.length < count; i += 1) {
      usedIds.add(fallback[i].id);
      picked.push(fallback[i].id);
    }
  }

  // If still insufficient (shouldn't happen with >=40 questions), allow repeat of earlier picks as last resort
  let k = 0;
  while (picked.length < count && k < picked.length) {
    picked.push(picked[k % picked.length]);
    k += 1;
  }

  return picked.slice(0, count);
}

function renderCurrentQuestion() {
  if (!examCache.questionIds.length) {
    activeQuestionsList.innerHTML = '<div class="glass-card" style="padding: 25px; text-align:center; color: var(--color-text-secondary);">Yeni imtahan başlatmaq üçün "Yeni Sınaq Başlat" düyməsinə basın.</div>';
    return;
  }

  const index = examCache.currentQuestionIndex;
  const questionId = examCache.questionIds[index];
  const question = questions.find((item) => item.id === questionId);
  if (!question) {
    activeQuestionsList.innerHTML = '<div class="glass-card" style="padding: 25px; text-align:center; color: var(--color-text-secondary);">Sual yüklənə bilmir.</div>';
    return;
  }

  const selectedAnswer = examCache.answers[questionId] || '';
  const isLocked = examCache.status === 'completed';
  const letters = ['A', 'B', 'C', 'D'];

  const answersMarkup = question.options.map((option, answerIndex) => {
    const letter = letters[answerIndex] || String.fromCharCode(65 + answerIndex);
    const checked = selectedAnswer === letter ? 'checked' : '';
    const disabled = isLocked ? 'disabled' : '';
    return `
      <label class="answer-option ${checked ? 'selected' : ''}">
        <input type="radio" name="exam-answer" value="${letter}" ${checked} ${disabled} />
        <span class="answer-letter">${letter}</span>
        <span class="answer-text">${option}</span>
      </label>`;
  }).join('');

  activeQuestionsList.innerHTML = `
    <div class="question-card">
      <div class="question-card-header">
        <div>
          <span class="question-meta">Sual ${index + 1} / ${examCache.questionIds.length}</span>
          <h3>${question.subject}</h3>
        </div>
        <div>
          <span class="question-grade">Səviyyə: ${question.difficulty === 'hard' ? 'Çətin' : 'Normal'}</span>
        </div>
      </div>
      <p class="question-text">${question.question}</p>
      <div class="answer-options">${answersMarkup}</div>
      <div class="question-footer" style="margin-top: 18px; display:flex; align-items:center; gap: 10px; flex-wrap: wrap; justify-content: space-between;">
        <button class="btn-secondary-glow" id="mark-doubtful" type="button">${examCache.doubtful[questionId] ? 'Şübhəni Sil' : 'Əmin deyiləm'}</button>
        ${isLocked ? '<span style="color: var(--neon-amber); font-weight:700;">Bu imtahan artıq qiymətləndirilmişdir.</span>' : ''}
      </div>
    </div>`;

  activeQuestionsList.querySelectorAll('input[name="exam-answer"]').forEach((input) => {
    input.addEventListener('change', (event) => {
      examCache.answers[questionId] = event.target.value;
      saveExamCache();
      updateExamControls();
    });
  });
  // visually mark selected option
  activeQuestionsList.querySelectorAll('.answer-option').forEach((label) => {
    label.addEventListener('click', (ev) => {
      // clicking label triggers input change, but ensure class toggles
      activeQuestionsList.querySelectorAll('.answer-option').forEach((l) => l.classList.remove('selected'));
      label.classList.add('selected');
    });
  });

  const markButton = document.getElementById('mark-doubtful');
  if (markButton) {
    // style as doubt button
    markButton.classList.add('btn-doubt');
    markButton.addEventListener('click', () => {
      examCache.doubtful[questionId] = !examCache.doubtful[questionId];
      saveExamCache();
      renderCurrentQuestion();
    });
  }

  updateExamControls();
}

function renderResults() {
  const total = examCache.questionIds.length;
  const score = examCache.finalScore || 0;
  const percent = total ? Math.round((score / total) * 100) : 0;
  resultsPercentDisplay.textContent = `${percent}%`;
  resultsRawScore.textContent = `${score} / ${total} düzgün cavab`;
  resultsGradeLabel.textContent = score >= 18 ? 'Əla' : score >= 14 ? 'Yaxşı' : score >= 10 ? 'Orta' : 'Təkmilləşmə';
  resultsCircle.style.background = 'radial-gradient(circle at 50% 50%, rgba(0,213,255,0.22), transparent 52%), linear-gradient(135deg, rgba(0, 245, 212, 0.12), rgba(0, 210, 255, 0.2))';

  const stats = {};
  const mistakes = [];
  const doubtList = [];

  examCache.questionIds.forEach((questionId, index) => {
    const question = questions.find((item) => item.id === questionId);
    const answer = examCache.answers[questionId] || null;
    const correct = question?.answer?.toString();
    if (!question) return;

    if (!stats[question.subject]) {
      stats[question.subject] = { total: 0, correct: 0 };
    }
    stats[question.subject].total += 1;
    if (answer === correct) {
      stats[question.subject].correct += 1;
    } else {
      mistakes.push({ question, answer, correct, number: index + 1 });
    }

    if (examCache.doubtful[questionId]) {
      doubtList.push({ question, answer, correct, number: index + 1 });
    }
  });

  resultsSubjectAnalysisList.innerHTML = Object.entries(stats).map(([subject, data]) => {
    return `<div class="analysis-row" style="display:flex; justify-content:space-between; gap: 10px; margin-bottom: 10px; padding: 10px 14px; background: rgba(255,255,255,0.04); border-radius: 12px;"><span>${subject}</span><strong>${data.correct} / ${data.total}</strong></div>`;
  }).join('');

  gradedMistakesReviewList.innerHTML = mistakes.length ? mistakes.map((item) => {
    return `<div class="review-card" style="border: 1px solid rgba(255,255,255,0.08); padding: 16px; margin-bottom: 12px; border-radius: 14px; background: rgba(255,255,255,0.03);">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:10px; margin-bottom: 10px;">
          <strong>Suаl ${item.number}</strong>
          <span style="color: var(--neon-rose); font-weight: 700;">Düzgün: ${item.correct}</span>
        </div>
        <p style="color: var(--color-text-secondary); margin-bottom: 10px;">${item.question.question}</p>
        <div style="display:flex; gap: 10px; flex-wrap: wrap;">
          <span style="color: var(--neon-teal);">Sənin cavabın: ${item.answer || 'Cavablanmayıb'}</span>
          <span style="color: var(--neon-amber);">Doğru cavab: ${item.correct}</span>
        </div>
      </div>`;
  }).join('') : '<p style="color: var(--color-text-secondary);">Səhv və ya boş sual tapılmadı.</p>';

  gradedReviewReviewList.innerHTML = doubtList.length ? doubtList.map((item) => {
    return `<div class="review-card" style="border: 1px solid rgba(0, 213, 255, 0.12); padding: 16px; margin-bottom: 12px; border-radius: 14px; background: rgba(0, 213, 255, 0.05);">
        <strong>Suаl ${item.number}</strong>
        <p style="color: var(--color-text-secondary); margin-top: 10px;">${item.question.question}</p>
        <small style="color: var(--neon-teal);">Şübhəli cavab: ${item.answer || 'Cavablanmayıb'}</small>
      </div>`;
  }).join('') : '<p style="color: var(--color-text-secondary);">Heç bir sual şübhə altında qeyd edilməyib.</p>';
}

function gradeExam() {
  if (!examCache.questionIds.length) {
    alert('İmtahan başlatmaq üçün əvvəlcə yeni sınaq yaradın.');
    return;
  }

  // Confirm finishing
  if (!confirm('İmtahanı bitirmək istəyirsiniz?')) {
    return;
  }

  const total = examCache.questionIds.length;
  let score = 0;

  examCache.questionIds.forEach((questionId) => {
    const question = questions.find((item) => item.id === questionId);
    const selected = examCache.answers[questionId] || null;
    if (question && selected === question.answer.toString()) {
      score += 1;
    }
  });

  examCache.status = 'completed';
  examCache.finalScore = score;
  examCache.scoreTimestamp = Date.now();
  examCache.scoreToken = CacheManager.computeScoreToken(score, examCache.scoreTimestamp, currentUser);
  examCache.durationSeconds = examCache.startedAt ? Math.round((Date.now() - examCache.startedAt) / 1000) : 0;

  // stop timer when grading
  stopTimer();

  saveExamCache();
  userHistory.unshift({
    examId: examCache.examId,
    score,
    total,
    grade: examCache.grade,
    difficulty: examCache.difficulty,
    timestamp: examCache.scoreTimestamp,
    durationSeconds: examCache.durationSeconds
  });

  if (userHistory.length > 50) {
    userHistory.length = 50;
  }

  saveHistory();
  saveProgress();
  updateScoreboard();
  updateStats();

  // After grading, ask about doubtful questions
  const doubtfulIds = Object.keys(examCache.doubtful || {}).filter((id) => examCache.doubtful[id]);
  if (doubtfulIds.length > 0) {
    const viewDoubt = confirm('Əmin deyiləm olan suallara baxmaq istəyirsiniz?');
    // render results first
    refreshExamView();
    if (viewDoubt) {
      // Scroll/focus to doubtful review section in results
      setTimeout(() => {
        const el = document.getElementById('graded-review-review-list');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 200);
      return;
    }
  }

  refreshExamView();
}

function showPreviousQuestion() {
  if (examCache.currentQuestionIndex > 0) {
    examCache.currentQuestionIndex -= 1;
    saveExamCache();
    renderCurrentQuestion();
  }
}

function showNextQuestion() {
  if (examCache.currentQuestionIndex < examCache.questionIds.length - 1) {
    examCache.currentQuestionIndex += 1;
    saveExamCache();
    renderCurrentQuestion();
  }
}

function exportBackup() {
  const backup = CacheManager.exportBackup(currentUser, examCache, userHistory, userProgress);
  backupDataTextarea.value = JSON.stringify(backup, null, 2);
  alert('Yedəkləmə JSON formatında hazırlandı. Mətni aşağıdakı sahədən kopyalaya bilərsiniz.');
}

function restoreBackup() {
  try {
    const value = backupDataTextarea.value.trim();
    if (!value) {
      alert('Əvvəlcə yedəkləmə JSON-unuzu daxil edin.');
      return;
    }

    const backup = JSON.parse(value);
    if (backup.user !== currentUser) {
      alert('Bu yedəkləmə cari istifadəçi üçün deyil.');
      return;
    }

    examCache = backup.exam_cache || createEmptyExamCache();
    userHistory = Array.isArray(backup.exam_history) ? backup.exam_history : [];
    userProgress = backup.user_progress || userProgress;

    CacheManager.saveCache(currentUser, examCache);
    saveHistory();
    CacheManager.saveProgress(currentUser, userProgress);
    updateScoreboard();
    updateStats();
    refreshExamView();
    alert('Yedəkləmə uğurla bərpa edildi.');
  } catch (error) {
    alert('JSON formatında səhv aşkarlandı. Yenidən yoxlayın.');
  }
}

function clearHistory() {
  if (!confirm('Bütün imtahan tarixçəsini və statistikaları silmək istədiyinizə əminsiniz?')) {
    return;
  }
  userHistory = [];
  saveHistory();
  updateScoreboard();
  updateStats();
  backupDataTextarea.value = '';
  alert('Təcrübə tarixçəsi təmizləndi.');
}

window.addEventListener('DOMContentLoaded', initApp);
window.addEventListener('beforeunload', () => {
  try {
    saveExamCache();
    saveHistory();
    stopTimer();
  } catch (e) {}
});
