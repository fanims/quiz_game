let quiz = [
    {
        question : "What is the name of capital of Pakistan?",
        option1 : "Lahore",
        option2 : "Karachi",
        option3 : "Multan",
        option4 : "Islamabad",
        option5 : "Faisalabad",
        correctOption : "Islamabad"
    },
    {
        question : "Who is the founder of Pakistan?",
        option1 : "Dr.Abdul Qadeer khan",
        option2 : "Quaid-e-Azam Muhammad Ali Jinnah",
        option3 : "Dr.Israr Ahmad",
        option4 : "Abdul Sattar Edhi",
        option5 : "Ilama Iqbal",
        correctOption : "Quaid-e-Azam Muhammad Ali Jinnah"
    },
    {
        question : "What is the national language of Pakistan?",
        option1 : "English",
        option2 : "Arabic",
        option3 : "Russian",
        option4 : "punjabi",
        option5 : "Urdu",
        correctOption : "Urdu"
    },
    {
        question : "Which city is known as the City of Lights in Pakistan?",
        option1 : "Lahore",
        option2 : "Karachi",
        option3 : "Multan",
        option4 : "Islamabad",
        option5 : "Faisalabad",
        correctOption : "Karachi"
    },
    {
        question : "When did Pakistan gain independence?",
        option1 : "On 14th August 1947",
        option2 : "On 23th March 1947",
        option3 : "On 14th August 1847",
        option4 : "On 25th December 1947",
        option5 : "On 9th May 1947",
        correctOption : "On 14th August 1947"
    },
];

// let dataforeach = quiz.map(quiz => quiz)
// console.log("dataforeach", dataforeach);
// quiz.map(item => {
//     console.log(item);
//     document.getElementById("question").innerHTML = item.question;
//     document.getElementById("option").innerHTML = item.option1;
//     document.getElementById("option").innerHTML = item.option2;
//     document.getElementById("option").innerHTML = item.option3;
//     document.getElementById("option").innerHTML = item.option4;
//     document.getElementById("option").innerHTML = item.option5;
// })
// console.log("datamap", datamap[0].question);

let currentQuestionIndex = 0;

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const nextButton = document.getElementById("nextButton");

function renderQuestion() {
    const currentQuestion = quiz[0];
    questionElement.textContent = currentQuestion.question;
    optionsContainer.innerHTML = Object.keys(currentQuestion).filter(key => key.startsWith("option")).map(key => {
        const isCorrect = currentQuestion[key] === currentQuestion.correctOption;
        return`
            <li>
                <label class="radio-button">
                    <input type="radio" name="options" value="${currentQuestion[key]}" data-correct="${isCorrect}">
                    ${currentQuestion[key]}
                </label>
            </li>
        `;
    })
    .join("");
    document.getElementById("message").textContent = "";
    nextButton.disabled = true;
    document.querySelectorAll('input[name="options"]').forEach(option => {
        option.addEventListener("click", handleOptionClick);
    });
}
function handleOptionClick(event) {
    const selectedOption = event.target;
    const isCorrect = selectedOption.getAttribute("data-correct") === "true";

    document.querySelectorAll('input[name="options"]').forEach(option => {
        const parentLabel = option.parentElement;
        if (option.getAttribute("data-correct") === "true") {
            parentLabel.style.backgroundColor = "green";
            parentLabel.style.Color = "white";
        } else {
            parentLabel.style.backgroundColor = "red";
            parentLabel.style.color = "white";
        }
    });

    const message = document.getElementById("message");
    if(isCorrect) {
        message,textContent = "Correct!";
        message.style.color = "green";
    } else {
        message.textContent = "Wrong";
        message.style.color = "red";
    }
    nextButton.disabled = false;
}
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < quiz.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
    } else {
        questionElement.textContent = "Quiz Completed!";
        optionsContainer.innerHTML = "";
        document.getElementById("message").textContent = `You have completed the quiz!`;
        nextButton.style.display = "none";
    }
});

renderQuestion();