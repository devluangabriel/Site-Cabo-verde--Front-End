document.addEventListener("DOMContentLoaded", () => {
  const questions = [
    { question: "Qual é a capital de Cabo Verde?", options: ["Praia", "Mindelo", "Sal Rei", "Assomada"], answer: "Praia" },
    { question: "Qual é a língua oficial de Cabo Verde?", options: ["Francês", "Inglês", "Português", "Espanhol"], answer: "Português" },
    { question: "Cabo Verde é composto por quantas ilhas?", options: ["5", "7", "10", "12"], answer: "10" },
    { question: "Qual o principal setor da economia cabo-verdiana?", options: ["Agricultura", "Turismo", "Indústria", "Mineração"], answer: "Turismo" },
    { question: "Cabo Verde foi colonizado por qual país?", options: ["França", "Espanha", "Portugal", "Itália"], answer: "Portugal" },
    { question: "Qual destas ilhas é a mais populosa?", options: ["Santo Antão", "Fogo", "Sal", "Santiago"], answer: "Santiago" },
    { question: "A moeda de Cabo Verde é o:", options: ["Dólar cabo-verdiano", "Real", "Escudo cabo-verdiano", "Euro"], answer: "Escudo cabo-verdiano" },
    { question: "Quando Cabo Verde conquistou sua independência?", options: ["1975", "1980", "1960", "1990"], answer: "1975" },
    { question: "Qual é o estilo musical tradicional de Cabo Verde?", options: ["Samba", "Morna", "Fado", "Tango"], answer: "Morna" },
    { question: "Qual o nome da famosa cantora cabo-verdiana?", options: ["Ivete Sangalo", "Cesária Évora", "Anitta", "Sara Tavares"], answer: "Cesária Évora" }
  ];

  let currentQuestionIndex = 0;
  let userAnswers = [];

  const startButton = document.getElementById("open-quiz");
  const quizPopup = document.getElementById("quiz-popup");
  const questionEl = document.getElementById("quiz-question");
  const optionsEl = document.getElementById("quiz-options");
  const nextBtn = document.getElementById("next-question");
  const resultEl = document.getElementById("quiz-result");
  const emailSection = document.getElementById("quiz-buttons");
  const sendBtn = document.getElementById("send-quiz-email");
  const closeBtn = document.getElementById("close-quiz");
  const userEmail = document.getElementById("user-email");

  if (startButton) {
    startButton.addEventListener("click", () => {
      quizPopup.classList.remove("hidden");
      startQuiz();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      quizPopup.classList.add("hidden");
      resetQuiz();
    });
  }

  function startQuiz() {
    currentQuestionIndex = 0;
    userAnswers = [];
    resultEl.classList.add("hidden");
    emailSection.classList.add("hidden");
    nextBtn.classList.add("hidden");
    questionEl.classList.remove("hidden");
    optionsEl.classList.remove("hidden");
    showQuestion();
  }

  function showQuestion() {
    const current = questions[currentQuestionIndex];
    questionEl.textContent = current.question;
    optionsEl.innerHTML = "";

    current.options.forEach(option => {
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.classList.add("quiz-option-btn");
      btn.disabled = false;
      btn.style.backgroundColor = "";
      btn.style.color = "";
      btn.addEventListener("click", () => selectAnswer(option, btn));
      optionsEl.appendChild(btn);
    });
  }

  function selectAnswer(selected, clickedBtn) {
    if (nextBtn.classList.contains("visible")) return;

    const correct = questions[currentQuestionIndex].answer;
    userAnswers.push({
      question: questions[currentQuestionIndex].question,
      selected,
      correct
    });

    nextBtn.classList.remove("hidden");
    nextBtn.classList.add("visible");

    const buttons = optionsEl.querySelectorAll("button");
    buttons.forEach(btn => {
      btn.disabled = true;
      if (btn.textContent === correct) {
        btn.style.backgroundColor = "#4CAF50";
        btn.style.color = "#fff";
      } else if (btn.textContent === selected) {
        btn.style.backgroundColor = "#f44336";
        btn.style.color = "#fff";
      }
    });
  }

  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    nextBtn.classList.remove("visible");

    if (currentQuestionIndex < questions.length) {
      showQuestion();
      nextBtn.classList.add("hidden");
    } else {
      showResults();
    }
  });

  function showResults() {
    const correctCount = userAnswers.filter(ans => ans.selected === ans.correct).length;
    questionEl.classList.add("hidden");
    optionsEl.classList.add("hidden");
    nextBtn.classList.add("hidden");

    resultEl.innerHTML = `🎉 Você acertou <strong>${correctCount}</strong> de <strong>${questions.length}</strong> perguntas!`;
    resultEl.classList.remove("hidden");
    emailSection.classList.remove("hidden");
  }

  sendBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const email = userEmail.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }

    const resultHtml = userAnswers.map((res, i) =>
      `${i + 1}. ${res.question}\n✅ Sua resposta: ${res.selected}\n✔️ Correta: ${res.correct}\n`
    ).join("\n");

    if (typeof emailjs === "undefined") {
      alert("EmailJS não carregado. Verifique a conexão ou a inclusão do script.");
      return;
    }

    try {
      await emailjs.send("service_exjn05h", "template_34ihinb", {
        user_email: email,
        quiz_result: resultHtml
      });
      alert("Respostas enviadas com sucesso!");
      quizPopup.classList.add("hidden");
      resetQuiz();
    } catch (error) {
      console.error("Erro ao enviar:", error);
      alert("Erro ao enviar e-mail. Tente novamente.");
    }
  });

  function resetQuiz() {
    currentQuestionIndex = 0;
    userAnswers = [];
    questionEl.textContent = "";
    optionsEl.innerHTML = "";
    resultEl.innerHTML = "";
    userEmail.value = "";
    questionEl.classList.remove("hidden");
    optionsEl.classList.remove("hidden");
    nextBtn.classList.add("hidden");
    resultEl.classList.add("hidden");
    emailSection.classList.add("hidden");
  }
});
