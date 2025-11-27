/* ---------------------------------------------------------
   GESTION DES MODALS
--------------------------------------------------------- */
function openModal(id) {
    document.getElementById(id).style.display = "block";
}

function closeModal(id) {
    document.getElementById(id).style.display = "none";
}

/* Fermeture si on clique en dehors de la modal */
window.onclick = function(event) {
    document.querySelectorAll(".modal").forEach(modal => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
};

/* ---------------------------------------------------------
   PAGE INTERNE DU QUIZ
--------------------------------------------------------- */
function openQuizPage() {
    document.getElementById("section-articles").style.display = "none";
    document.getElementById("section-citations").style.display = "none";
    document.getElementById("section-images").style.display = "none";
    document.getElementById("section-lien").style.display = "none";
    document.getElementById("section-discussion").style.display = "none";
    document.getElementById("section-apropos").style.display = "none";
    document.getElementById("quiz-page").style.display = "block";

    startQuiz();
}

function returnToHome() {
    document.getElementById("quiz-page").style.display = "none";

    document.getElementById("section-articles").style.display = "block";
    document.getElementById("section-citations").style.display = "block";
    document.getElementById("section-images").style.display = "block";
    document.getElementById("section-lien").style.display = "block";
    document.getElementById("section-discussion").style.display = "block";
    document.getElementById("section-apropos").style.display = "block";
}

/* ---------------------------------------------------------
   QUIZ – 20 QUESTIONS
--------------------------------------------------------- */
const questions = [
    {q:"Qui a fondé la pédagogie Montessori ?", a:["Maria Montessori","Ovide Decroly","Rudolf Steiner"], r:0},
    {q:"Quel est le rôle principal de l’enseignant en pédagogie Freinet ?", a:["Diriger strictement","Être guide et facilitateur","Évaluer continuellement"], r:1},
    {q:"Quel est l’objectif principal de l’école ?", a:["Transmettre un savoir","Punir","Occuper les enfants"], r:0},
    {q:"Quelle est une compétence essentielle du professeur ?", a:["Patience","Impulsivité","Indifférence"], r:0},
    {q:"Les pédagogies alternatives visent :", a:["L’autonomie","La compétition","L’élitisme"], r:0},
    {q:"La différenciation permet :", a:["Adapter l’enseignement","Donner le même travail à tous","Évaluer moins"], r:0},
    {q:"La didactique concerne :", a:["La transmission des savoirs","Le sport","La comptabilité"], r:0},
    {q:"La pédagogie Steiner met en avant :", a:["L’imaginaire et l’artistique","La technologie","La compétition"], r:0},
    {q:"L’élève apprend mieux quand :", a:["Il est actif","Il copie seulement","Il écoute sans agir"], r:0},
    {q:"L’évaluation formative sert à :", a:["Ajuster l’enseignement","Sanctionner","Compléter un tableau"], r:0},
    {q:"Freinet utilise :", a:["Texte libre","Dictée permanente","Silence obligatoire"], r:0},
    {q:"Montessori valorise :", a:["L’autonomie","Les rangs fixes","La compétition"], r:0},
    {q:"La transposition didactique :", a:["Rend le savoir accessible","Rend le savoir plus compliqué","Supprime le savoir"], r:0},
    {q:"L’école doit :", a:["Réduire les inégalités","Les accentuer","Les ignorer"], r:0},
    {q:"L’enseignant observe pour :", a:["Comprendre les besoins","Punir","Classer"], r:0},
    {q:"Le climat de classe idéal est :", a:["Bienveillant et structurant","Stressant","Punitif"], r:0},
    {q:"Un bon apprentissage est :", a:["Actif","Imposé","Passif"], r:0},
    {q:"Être professeur signifie :", a:["Accompagner","Mépriser","Ignorer"], r:0},
    {q:"La coopération favorise :", a:["La réussite","L’isolement","Le conflit"], r:0},
    {q:"L’école est :", a:["Un droit fondamental","Un privilège","Optionnelle"], r:0}
];

let currentQuestion = 0;

function startQuiz() {
    currentQuestion = 0;
    showQuestion();
}

function showQuestion() {
    const q = questions[currentQuestion];
    const container = document.getElementById("quiz-container");

    container.innerHTML = `
        <div class="quiz-question-card">
            <h3>${q.q}</h3>
            ${q.a.map((ans, i) => `
                <button class="quiz-answer" onclick="checkAnswer(${i})">${ans}</button>
            `).join("")}
        </div>
    `;
}

function checkAnswer(i) {
    const q = questions[currentQuestion];
    const buttons = document.querySelectorAll(".quiz-answer");

    buttons.forEach(btn => btn.disabled = true);

    if (i === q.r) {
        buttons[i].style.backgroundColor = "green";
    } else {
        buttons[i].style.backgroundColor = "red";
        buttons[q.r].style.backgroundColor = "green";
    }

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            document.getElementById("quiz-container").innerHTML = `
                <h3>Bravo ! Vous avez terminé le quiz.</h3>
            `;
        }
    }, 1500);
}

/* ---------------------------------------------------------
   LIKE SYSTEM – 1 like par élément / personne
--------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".like-button").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.getAttribute("data-id");

            if (!localStorage.getItem("like_" + id)) {
                localStorage.setItem("like_" + id, true);
                btn.style.backgroundColor = "green";
                btn.textContent = "❤️ Aimé";
            } else {
                localStorage.removeItem("like_" + id);
                btn.style.backgroundColor = "#ff5fa2";
                btn.textContent = "❤️ Like";
            }
        });
    });
});

/* ---------------------------------------------------------
   DISCUSSION – stockage local
--------------------------------------------------------- */
document.getElementById("discussion-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const pseudo = document.getElementById("pseudo").value.trim();
    const message = document.getElementById("message").value.trim();

    if (pseudo === "" || message === "") return;

    const newMessage = { pseudo, message };
    let allMessages = JSON.parse(localStorage.getItem("messages")) || [];
    allMessages.push(newMessage);
    localStorage.setItem("messages", JSON.stringify(allMessages));

    displayMessages();
    this.reset();
});

function displayMessages() {
    const container = document.getElementById("messages");
    const allMessages = JSON.parse(localStorage.getItem("messages")) || [];

    container.innerHTML = allMessages.map(msg => `
        <div class="message">
            <strong>${msg.pseudo}</strong><br>
            ${msg.message}
        </div>
    `).join("");
}

displayMessages();
