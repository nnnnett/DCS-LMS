<template>
  <div class="quiz-container">
    <h1>Quiz Management</h1>

    <!-- Create Quiz -->
    <section>
      <h2>Create Quiz</h2>
      <form @submit.prevent="createQuiz">
        <input
          v-model="newQuiz.name"
          type="text"
          placeholder="Quiz Name"
          required
        />
        <div v-for="(question, index) in newQuiz.questions" :key="index">
          <input
            v-model="question.question"
            type="text"
            placeholder="Question"
            required
          />
          <select v-model="question.type" required>
            <option value="" disabled>Select Type</option>
            <option value="mcq">Multiple Choice</option>
            <option value="fib">Fill in the Blank</option>
          </select>
          <div v-if="question.type === 'mcq'">
            <label v-for="(option, idx) in question.options" :key="idx">
              Option {{ idx + 1 }}:
              <input v-model="question.options[idx]" type="text" />
            </label>
            <button type="button" @click="addOption(index)">Add Option</button>
          </div>
          <input
            v-model="question.answer"
            type="text"
            placeholder="Answer"
            required
          />
          <button type="button" @click="removeQuestion(index)">
            Remove Question
          </button>
        </div>
        <button type="button" @click="addQuestion">Add Question</button>
        <button type="submit">Create Quiz</button>
      </form>
    </section>

    <!-- Fetch Quizzes -->
    <section>
      <h2>Quizzes</h2>
      <div>
        <input v-model="searchQuery" type="text" placeholder="Search Quizzes" />
        <button @click="fetchQuizzes">Search</button>
      </div>
      <ul>
        <li v-for="quiz in quizzes" :key="quiz._id">
          <h3>{{ quiz.name }}</h3>
          <p>Course ID: {{ quiz.courseId }}</p>
          <button @click="selectQuiz(quiz)">Answer Quiz</button>
        </li>
      </ul>
    </section>

    <!-- Answer Quiz -->
    <section v-if="selectedQuiz">
      <h2>Answer Quiz: {{ selectedQuiz.name }}</h2>
      <form @submit.prevent="answerQuiz">
        <div v-for="(question, index) in selectedQuiz.questions" :key="index">
          <p>{{ question.question }}</p>
          <div v-if="question.type === 'mcq'">
            <label v-for="(option, idx) in question.options" :key="idx">
              <input
                type="radio"
                :name="'question-' + index"
                :value="option"
                v-model="answers[index]"
              />
              {{ option }}
            </label>
          </div>
          <div v-else>
            <input v-model="answers[index]" type="text" />
          </div>
        </div>
        <button type="submit">Submit Answers</button>
      </form>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

// State variables
const newQuiz = ref({
  name: "",
  questions: [],
});
const quizzes = ref([]);
const selectedQuiz = ref(null);
const answers = ref([]);
const searchQuery = ref("");

// Methods
const addQuestion = () => {
  newQuiz.value.questions.push({
    question: "",
    type: "",
    options: [],
    answer: "",
  });
};

const removeQuestion = (index) => {
  newQuiz.value.questions.splice(index, 1);
};

const addOption = (questionIndex) => {
  newQuiz.value.questions[questionIndex].options.push("");
};

const createQuiz = async () => {
  const token = localStorage.getItem("authToken");
  try {
    const courseId = "COURSE_ID"; // Replace with actual course ID
    const response = await axios.post(
      `${process.env.api_host}/courses/quiz/${courseId}`,
      newQuiz.value,
      {
        headers: {
          authorization: token,
        },
      }
    );
    alert("Quiz created successfully!");
    newQuiz.value = { name: "", questions: [] }; // Reset form
  } catch (error) {
    console.error("Error creating quiz:", error);
    alert("Failed to create quiz.");
  }
};

const fetchQuizzes = async () => {
  const token = localStorage.getItem("authToken");
  try {
    const params = {
      query: searchQuery.value,
      courseId: "COURSE_ID", // Optional parameter
    };
    const response = await axios.get(
      `${process.env.api_host}/courses/getQuiz`,
      {
        params,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    quizzes.value = response.data;
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    alert("Failed to fetch quizzes.");
  }
};

const selectQuiz = (quiz) => {
  selectedQuiz.value = quiz;
  answers.value = Array(quiz.questions.length).fill("");
};

const answerQuiz = async () => {
  const token = localStorage.getItem("authToken");
  try {
    const quizId = selectedQuiz.value._id;
    const response = await axios.post(
      `${process.env.api_host}/courses/answerQuiz/${quizId}`,
      {
        answers: answers.value,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    alert(`Quiz submitted! Your grade: ${response.data.totalGrade}%`);
    selectedQuiz.value = null; // Reset selected quiz
  } catch (error) {
    console.error("Error answering quiz:", error);
    alert("Failed to submit answers.");
  }
};
</script>

<style>
.quiz-container {
  padding: 20px;
}

h1,
h2 {
  color: #333;
}

form {
  margin-bottom: 20px;
}

input,
select,
button {
  margin: 5px;
}
</style>
