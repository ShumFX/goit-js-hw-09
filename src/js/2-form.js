const STORAGE_KEY = "feedback-form-state";

const form = document.querySelector(".feedback-form");

// Об'єкт для збереження даних форми
let formData = {
  email: "",
  message: "",
};

// Функція для збереження даних у localStorage
function saveFormData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

// Функція для завантаження даних з localStorage у форму і в formData
function loadFormData() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);

      // Заповнюємо форму та formData, якщо дані існують
      if (parsedData.email) {
        form.elements.email.value = parsedData.email;
        formData.email = parsedData.email;
      }
      if (parsedData.message) {
        form.elements.message.value = parsedData.message;
        formData.message = parsedData.message;
      }
    } catch (error) {
      console.error("Помилка при завантаженні даних з localStorage:", error);
    }
  }
}

// Обробник події input для делегування
function onInputChange(event) {
  const target = event.target;
  if (target.name === "email" || target.name === "message") {
    // Обрізаємо пробіли на початку і в кінці
    formData[target.name] = target.value.trim();
    saveFormData();
  }
}

// Обробник сабміту форми
function onFormSubmit(event) {
  event.preventDefault();

  // Перевірка на заповненість полів
  if (!formData.email || !formData.message) {
    alert("Fill please all fields");
    return;
  }

  // Виводимо об'єкт з даними у консоль
  console.log("Form data submitted:", formData);

  // Очищаємо localStorage
  localStorage.removeItem(STORAGE_KEY);

  // Очищаємо об'єкт і поля форми
  formData = { email: "", message: "" };
  form.reset();
}

form.addEventListener("input", onInputChange);
form.addEventListener("submit", onFormSubmit);

// При завантаженні сторінки завантажуємо дані з localStorage
loadFormData();
