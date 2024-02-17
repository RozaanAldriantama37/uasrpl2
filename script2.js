document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.querySelector('.start-button');
    const retryButton = document.querySelector('.retry-button');
    const homeButton = document.querySelector('.home-button'); // Menambahkan variabel untuk tombol "Home"
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
        question: 'Huruf Apakah Ini?',
        imageUrl: 'gambar/c.jpg',
        options: ['C', 'A', 'J'],
        answer: 'C',
        explanation: 'Huruf Tersebut adalah huruf C.',
      },
      {
        question: 'Huruf Apakah Ini?',
        imageUrl: 'gambar/u.jpg',
        options: ['L', 'Y', 'U'],
        answer: 'U',
        explanation: 'Huruf Tersebut adalah huruf U.',
      }
      // tambahkan pertanyaan lainnya di sini
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
  
    function createImageElement(imageUrl) {
      const imageElement = document.createElement('img');
      imageElement.src = imageUrl;
      imageElement.classList.add('animal-image');
      return imageElement;
    }
  
    function showQuestion() {
      if (questionsAnswered >= questions.length) {
        endGame();
        return;
      }
  
      const currentQuestion = questions[currentQuestionIndex];
      questionBox.style.display = 'block';
      questionBox.querySelector('.question').textContent = currentQuestion.question;
  
      // Membersihkan gambar sebelum menambahkan yang baru
      questionBox.querySelectorAll('.animal-image').forEach(image => {
        image.remove();
      });
  
      // Menambahkan gambar ke dalam questionBox
      const imageElement = createImageElement(currentQuestion.imageUrl);
      questionBox.appendChild(imageElement);
  
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
      homeButton.style.display = 'block'; // Menampilkan tombol "Home"
      
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

    // Event listener untuk tombol "Home"
    homeButton.addEventListener('click', function() {
      window.location.href = 'index1.html'; // Ganti 'home.html' dengan URL halaman beranda yang sebenarnya
    });
});
