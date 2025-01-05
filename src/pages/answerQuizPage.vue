<template>
  <q-page>
    <div class="quiz-answer main-container flex flex-center">
      <div class="quiz-container q-mt-md q-pa-md">
        <q-card-section>
          <q-btn
            icon="arrow_back_ios"
            flat
            :to="`/main/coursePage/` + courseId"
          />
        </q-card-section>
        <q-card-section class="q-pl-none"
          ><div class="text-h4">{{ quiz.name }}</div></q-card-section
        >
        <q-form v-if="quiz.questions.length" @submit.prevent="submitAnswers">
          <div
            v-for="(question, index) in quiz.questions"
            :key="index"
            class="question"
          >
            <q-card-section class="q-px-none">
              <div>{{ index + 1 }}. {{ question.question }}</div>
            </q-card-section>
            <div style="width: 100%" class="">
              <q-input
                type="text"
                outlined
                v-model="userAnswers[index]"
                :placeholder="'Enter your answer for question ' + (index + 1)"
              />
            </div>
          </div>
          <div align="right">
            <q-btn
              :loading="loading"
              flat
              type="submit"
              class="bg-primary text-white"
              no-caps
              @click="quizResults = true"
              >Submit Quiz</q-btn
            >
          </div>
        </q-form>
        <div v-else-if="!loading && !error">
          <p>No questions available.</p>
        </div>
        <div v-if="results">
          <q-dialog v-model="quizResults" persistent>
            <q-card style="width: 20vw" class="flex flex-center column">
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
                <q-btn label="Close" :to="`/main/coursePage/` + courseId" />
              </q-card-section>
            </q-card>
          </q-dialog>
        </div>
        <div v-if="loading">Loading quiz...</div>
        <div v-if="error">{{ error }}</div>
      </div>
    </div>
  </q-page>
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
const courseId = route.params.courseId;
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

<style lang="sass" scoped>
.main-container
  width: 100vw
  height: auto
  margin: auto
.question
  font-size: 1.2em
  height: auto
  margin-bottom: 20px
  width: 80%
  justify-self: center
.quiz-container
  border: 1px solid #d9d9d9
  border-radius: 14px
  width: 50vw
</style>
