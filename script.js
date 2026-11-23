const riverControls = document.querySelector('[data-river-controls]');
const riverButtons = Array.from(document.querySelectorAll('[data-river]'));
const riverPanels = document.querySelectorAll('[data-river-panel]');

function selectRiverElement(selectedButton) {
  for (const button of riverButtons) {
    button.setAttribute('aria-pressed', String(button === selectedButton));
  }

  for (const panel of riverPanels) {
    panel.hidden = panel.id !== selectedButton.getAttribute('aria-controls');
  }
}

const waterButton = riverButtons.find((button) => button.dataset.river === 'agua');

if (riverControls && waterButton) {
  selectRiverElement(waterButton);
  for (const button of riverButtons) {
    button.addEventListener('click', () => selectRiverElement(button));
  }
  riverControls.hidden = false;
}

const quiz = document.querySelector('#quiz-form');
const quizResult = document.querySelector('#quiz-result');

if (quiz && quizResult) {
  const questions = Array.from(quiz.querySelectorAll('[data-question]'));

  function clearFeedback(question) {
    question.querySelector('[data-feedback]').hidden = true;
    question.querySelector('[data-verdict]').textContent = '';
  }

  quiz.addEventListener('submit', (event) => {
    event.preventDefault();
    let correctAnswers = 0;

    for (const question of questions) {
      const answer = question.querySelector('input[type="radio"]:checked');
      const correct = answer?.hasAttribute('data-correct');
      if (correct) correctAnswers += 1;

      question.querySelector('[data-verdict]').textContent = correct
        ? 'Correto! '
        : 'A resposta esperada é outra. ';
      question.querySelector('[data-feedback]').hidden = false;
    }

    quizResult.textContent = `Você acertou ${correctAnswers} de ${questions.length} perguntas.`;
  });

  quiz.addEventListener('change', (event) => {
    const question = event.target.closest('[data-question]');
    if (question) clearFeedback(question);
    quizResult.textContent = '';
  });

  quiz.addEventListener('reset', () => {
    questions.forEach(clearFeedback);
    quizResult.textContent = '';
  });
}

const projectorButton = document.querySelector('#projector');

if (projectorButton) {
  projectorButton.addEventListener('click', () => {
    const active = document.documentElement.classList.toggle('projection');
    projectorButton.setAttribute('aria-pressed', String(active));
  });

  projectorButton.hidden = false;
}
// Fallback de compatibilidade para destacar a opção selecionada (substituto para :has(input:checked))
const quizInputs = document.querySelectorAll('fieldset input[type="radio"], fieldset input[type="checkbox"]');

function updateSelectedLabels(fieldset) {
  if (!fieldset) return;
  fieldset.querySelectorAll('label').forEach((label) => {
    const ctrl = label.querySelector('input');
    label.classList.toggle('selected', Boolean(ctrl && ctrl.checked));
  });
}

quizInputs.forEach((input) => {
  input.addEventListener('change', () => {
    updateSelectedLabels(input.closest('fieldset'));
  });
});

if (quiz) {
  quiz.addEventListener('reset', () => {
    // Aguarda a limpeza nativa do formulário para atualizar as classes
    setTimeout(() => {
      quiz.querySelectorAll('fieldset').forEach(updateSelectedLabels);
    }, 0);
  });
}
