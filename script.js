const apiKey = "ВАШ_API_KEY"; // Замініть на ваш API ключ
const apiUrl = "https://api.openai.com/v1/completions"; // URL для API

// Перемикання теми з плавною анімацією
document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");

    // Зміна кольору фону відповідей
    const responseContainer = document.getElementById("responseContainer");
    if (document.body.classList.contains("dark-mode")) {
        responseContainer.style.setProperty("--response-bg-color", "#1e1e1e");
    } else {
        responseContainer.style.setProperty("--response-bg-color", "#f2f2f2");
    }
});

// Надсилання запиту до ШІ
document.getElementById("submitBtn").addEventListener("click", async () => {
    const userInput = document.getElementById("userInput").value;
    const responseContainer = document.getElementById("responseContainer");
    const loadingSpinner = document.getElementById("loadingSpinner");
    const language = document.getElementById("languageSelect").value;
    const tone = document.getElementById("toneSelect").value;

    if (!userInput.trim()) {
        return; // Не надсилати порожній запит
    }

    // Показати значок завантаження
    loadingSpinner.style.display = "block";

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: `${tone}: ${userInput}`,
                max_tokens: 150,
                temperature: 0.7,
                language: language
            })
        });

        const data = await response.json();

        // Додати відповідь ШІ
        const aiMessage = document.createElement("p");
        aiMessage.textContent = `ШІ: ${data.choices[0].text.trim()}`;
        responseContainer.prepend(aiMessage);

        // Очистити поле введення
        document.getElementById("userInput").value = "";
    } catch (error) {
        console.error("Сталася помилка:", error);
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "Сталася помилка, спробуйте знову.";
        responseContainer.prepend(errorMessage);
    } finally {
        // Сховати значок завантаження
        loadingSpinner.style.display = "none";
    }
});