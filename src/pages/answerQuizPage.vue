<template>
  <div class="quiz-answer">
    <h1>{{ quiz.name }}</h1>
    <form v-if="quiz.questions.length" @submit.prevent="submitAnswers">
      <div
        v-for="(question, index) in quiz.questions"
        :key="index"
        class="question"
      >
        <p>{{ index + 1 }}. {{ question.question }}</p>
        <input
          type="text"
          v-model="userAnswers[index]"
          :placeholder="'Enter your answer for question ' + (index + 1)"
        />
      </div>
      <button type="submit">Submit Quiz</button>
    </form>

    <div v-else-if="!loading && !error">
      <p>No questions available.</p>
    </div>

    <div v-if="results">
      <h2>Results</h2>
      <p>Score: {{ score }}/{{ quiz.questions.length }}</p>
      <ul>
        <li v-for="(result, index) in results" :key="index">
          <strong>Q{{ index + 1 }}:</strong> {{ result.question }} <br />
          <em>Your answer:</em> {{ result.userAnswer }} <br />
          <em>Correct answer:</em> {{ result.correctAnswer }} <br />
          <span :style="{ color: result.correct ? 'green' : 'red' }">
            {{ result.correct ? "Correct" : "Wrong" }}
          </span>
        </li>
      </ul>
    </div>

    <div v-if="loading">Loading quiz...</div>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

// Reactive data
const route = useRoute();
const quiz = ref({ name: "", questions: [] });
const userAnswers = ref([]);
const results = ref(null);
const score = ref(0);
const loading = ref(true);
const error = ref("");
const quizId = route.params.quizId;
// Fetch the quiz on mount
const fetchQuiz = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.api_host}/courses/getQuizQuestions/${quizId}`
    );
    quiz.value = response.data;
    userAnswers.value = Array(quiz.value.questions.length).fill("");
    loading.value = false;
  } catch (err) {
    error.value = "Failed to load the quiz.";
    loading.value = false;
  }
};

// // Submit answers
async function submitAnswers() {
  try {
    const response = await axios.post(`${process.env.api_host}/submit`, {
      answers: userAnswers.value,
    });
    results.value = response.data.results;
    score.value = response.data.score;
  } catch (err) {
    error.value = "Failed to submit the quiz.";
  }
}

// Fetch quiz with a sample ID (Replace with dynamic ID)
onMounted(() => fetchQuiz("YOUR_QUIZ_ID_HERE"));
</script>

<style>
.quiz-answer {
  max-width: 600px;
  margin: auto;
}
.question {
  margin-bottom: 20px;
}
</style>
