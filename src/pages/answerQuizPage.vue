<template>
  <div class="quiz-answer">
    <q-card-section
      ><div class="text-h4">{{ quiz.name }}</div></q-card-section
    >
    <q-form v-if="quiz.questions.length" @submit.prevent="submitAnswers">
      <div
        v-for="(question, index) in quiz.questions"
        :key="index"
        class="question"
      >
        <q-card-section>
          <div>{{ index + 1 }}. {{ question.question }}</div>
        </q-card-section>
        <q-input
          type="text"
          v-model="userAnswers[index]"
          :placeholder="'Enter your answer for question ' + (index + 1)"
        />
      </div>
      <q-btn :loading="loading" type="submit" @click="quizResults = true"
        >Submit Quiz</q-btn
      >
    </q-form>

    <div v-else-if="!loading && !error">
      <p>No questions available.</p>
    </div>

    <div v-if="results">
      <q-dialog v-model="quizResults" persistent>
        <q-card>
          <q-card-section>
            <div class="text-h5">Results</div>
          </q-card-section>
          <q-card-section>
            <div>Score: {{ score }}/{{ quiz.questions.length }}</div>
          </q-card-section>
          <!-- <ul>
            <li v-for="(result, index) in results" :key="index">
              <strong>Q{{ index + 1 }}:</strong> {{ result.question }} <br />
              <em>Your answer:</em> {{ result.userAnswer }} <br />
              <em>Correct answer:</em> {{ result.correctAnswer }} <br />
              <span :style="{ color: result.correct ? 'green' : 'red' }">
                {{ result.correct ? "Correct" : "Wrong" }}
              </span>
            </li>
          </ul> -->
          <q-card-section>
            <q-btn label="Close" v-close-popup />
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>

    <div v-if="loading">Loading quiz...</div>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { Notify } from "quasar";

// Reactive data
const route = useRoute();
const quiz = ref({ name: "", questions: [] });
const userAnswers = ref([]);
const results = ref(null);
const score = ref(0);
const loading = ref(true);
const error = ref("");
const quizId = route.params.quizId;
const quizResults = ref(false);
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
  loading.value = true;
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.post(
      `${process.env.api_host}/courses/answerQuiz/${quizId}`,
      {
        answers: userAnswers.value,
      },
      {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      }
    );
    Notify.create({
      type: "positive",
      message: "Quiz Submitted Successfully",
    });
    results.value = response.data.results;
    score.value = response.data.score;
  } catch (err) {
    Notify.create({
      type: "warning",
      message: "Quiz already Submitted  ",
    });
  } finally {
    loading.value = false;
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
