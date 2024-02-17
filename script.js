document.addEventListener('DOMContentLoaded', function () {
  const startButton = document.querySelector('.start-button');
  const retryButton = document.querySelector('.retry-button');
  const questionBox = document.querySelector('.question-box');
  const optionsElement = document.querySelector('.options');
  const resultElement = document.querySelector('.result');
  const explanationElement = document.querySelector('.answer-explanation');
  const welcomeMessage = document.querySelector('.welcome-message');

  const buttonClickSound = document.getElementById('button-click-sound');
  const correctAnswerSound = document.getElementById('correct-answer-sound');
  const wrongAnswerSound = document.getElementById('wrong-answer-sound');
  const finishedSound = document.getElementById('finished-sound');

  let currentQuestionIndex = 0;
  let questionsAnswered = 0;
  let correctAnswers = 0;

  const questions = [
    {
      question: 'Apa ibu kota dari indonesia?',
      options: ['Jakarta', 'Surabaya', 'Medan'],
      answer: 'Jakarta',
      explanation: ' Ibu kota Indonesia adalah Jakarta, yang juga merupakan pusat pemerintahan, ekonomi, dan budaya negara.',
    },
    {
      question: 'Berapa jumlah provinsi yang ada di indonesia?',
      options: ['26', '33', '38'],
      answer: '38',
      explanation: 'Saat ini, Indonesia memiliki 38 provinsi, yang terbagi menjadi pulau-pulau dan wilayah di seluruh negara.',
    },
    {
      question: 'Apa nama pulau terbesar di Indonesia',
      options: ['Jawa', 'Sumatera', 'Kalimantan'],
      answer: 'Kalimantan',
      explanation: 'Pulau terbesar di Indonesia adalah Kalimantan. Luas wilayah kalimantan adalah 743,330 km²',
    },
    {
      question: 'Apa bunga nasional Indonesia?',
      options: ['Melati', 'Mawar', 'Anggrek'],
      answer: 'Melati',
      explanation:
        'Bunga nasional Indonesia adalah Melati. Bunga melati memiliki makna yang dalam dalam budaya Indonesia, melambangkan keindahan, kemurnian, dan semangat nasionalisme. Bunga ini juga menjadi lambang persatuan dan kesatuan di negara Indonesia.',
    },
    {
      question: 'Apa nama tari tradisional yang berasal dari Bali, Indonesia?',
      options: ['Tari Saman', 'Tari Piring', 'Tari Kecak'],
      answer: 'Tari Kecak',
      explanation:
        ' Tari Kecak adalah tarian tradisional dari Bali yang terkenal dengan gerakan dan suara "cak cak cak" yang dihasilkan oleh para penari laki-laki yang duduk bersila dalam formasi lingkaran. Tari ini menceritakan kisah Ramayana dan sering menjadi daya tarik wisatawan.',
    },
  ];

  function playButtonClickSound() {
    buttonClickSound.play();
  }

  function playCorrectAnswerSound() {
    correctAnswerSound.play();
  }

  function playWrongAnswerSound() {
    wrongAnswerSound.play();
  }

  function playFinishedSound() {
    finishedSound.play();
  }

  function hideWelcomeMessage() {
    welcomeMessage.style.display = 'none';
  }

  function showQuestion() {
    if (questionsAnswered >= questions.length) {
      endGame();
      return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    questionBox.style.display = 'block';
    questionBox.querySelector('.question').textContent = currentQuestion.question;

    optionsElement.innerHTML = '';
    currentQuestion.options.forEach((option) => {
      const button = document.createElement('button');
      button.textContent = option;
      button.classList.add('option');
      button.addEventListener('click', () => checkAnswer(option, currentQuestion.explanation));
      optionsElement.appendChild(button);
    });
  }

  function checkAnswer(selectedOption, explanation) {
    const currentQuestion = questions[currentQuestionIndex];
    questionsAnswered++;

    if (selectedOption === currentQuestion.answer) {
      correctAnswers++;
      resultElement.textContent = 'Jawaban benar!';
      explanationElement.textContent = explanation || '';
      playCorrectAnswerSound();
    } else {
      resultElement.textContent = 'Jawaban salah!';
      explanationElement.textContent = explanation || '';
      playWrongAnswerSound();
    }

    currentQuestionIndex++;
    setTimeout(() => {
      resultElement.textContent = '';
      explanationElement.textContent = '';
      showQuestion();
    }, 4000);
  }

  function endGame() {
    questionBox.style.display = 'none';
    resultElement.textContent = `Anda menjawab ${correctAnswers} dari ${questions.length} pertanyaan dengan benar.`;
    retryButton.style.display = 'block';
    playFinishedSound();
  }

  startButton.addEventListener('click', () => {
    startButton.style.display = 'none';
    retryButton.style.display = 'none';
    questionBox.style.display = 'block';
    resultElement.textContent = '';
    explanationElement.textContent = '';

    questionsAnswered = 0;
    correctAnswers = 0;
    currentQuestionIndex = 0;

    hideWelcomeMessage();
    playButtonClickSound();

    showQuestion();
  });

  retryButton.addEventListener('click', () => {
    startButton.style.display = 'none';
    retryButton.style.display = 'none';
    questionBox.style.display = 'block';
    resultElement.textContent = '';
    explanationElement.textContent = '';

    questionsAnswered = 0;
    correctAnswers = 0;
    currentQuestionIndex = 0;

    hideWelcomeMessage();
    playButtonClickSound();

    showQuestion();
  });
});
