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
        <div>
          <!-- Fetch Quizzes -->
          <q-card-section class="q-py-none">
            <div v-for="quiz in quizzes" :key="quiz._id">
              <div class="text-h5 q-mb-md">{{ quiz.name }}</div>

              <q-btn :loading="loading" no-caps @click="selectQuiz(quiz)"
                >Answer Quiz</q-btn
              >
            </div>
          </q-card-section>

          <!-- Answer Quiz -->
          <q-card-section v-if="selectedQuiz">
            <q-card-section class="q-pl-none">
              <div class="text-h6">Answer the following;</div>
            </q-card-section>
            <form @submit.prevent="answerQuiz">
              <div
                v-for="(question, index) in selectedQuiz.questions"
                :key="index"
              >
                <q-card-section class="q-pl-none">
                  <div class="text-subtitle1">{{ question.question }}</div>
                </q-card-section>
                <div v-if="question.type === 'mcq'">
                  <div class="text-weight-bold">Choose correct anwser</div>
                  <q-card-section
                    v-for="(option, idx) in question.options"
                    :key="idx"
                  >
                    <q-radio
                      :name="'question-' + index"
                      :val="option"
                      v-model="answers[index]"
                      q-btn
                      :label="option"
                    />
                  </q-card-section>
                </div>
                <div v-else>
                  <q-input
                    v-model="answers[index]"
                    type="text"
                    outlined
                    hint="Input your answer"
                  />
                </div>
              </div>
              <div align="right" class="q-mt-sm">
                <q-btn
                  :loading="loading"
                  type="submit"
                  class="bg-primary text-white"
                  no-caps
                  >Submit Answers</q-btn
                >
              </div>
            </form>
          </q-card-section>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { Notify } from "quasar";

// Reactive data
const router = useRouter();
const route = useRoute();
const quiz = ref({ name: "", questions: [] });

const loading = ref(false);
const quizzes = ref([]);
const selectedQuiz = ref(null);
const answers = ref([]);
const searchQuery = ref("");

const quizId = route.params.quizId;
const courseId = route.params.courseId;

// Fetch quizzes function
const fetchQuizzes = async () => {
  const token = localStorage.getItem("authToken");
  try {
    const response = await axios.get(
      `${process.env.api_host}/courses/getQuiz?query=${quizId}&${courseId}`,
      {
        headers: {
          authorization: token,
        },
      }
    );
    quizzes.value = response.data; // Assuming response contains the quizzes
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    alert("Failed to fetch quizzes.");
  }
};
// Automatically fetch quizzes on component mount
onMounted(() => {
  fetchQuizzes();
});

const selectQuiz = (quiz) => {
  loading.value = true;
  try {
    selectedQuiz.value = quiz;
    answers.value = Array(quiz.questions.length).fill("");
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const answerQuiz = async () => {
  loading.value = true;
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
    Notify.create({
      type: "positive",
      message: `Quiz submitted! Your grade: ${response.data.totalGrade}%`,
    });
    selectedQuiz.value = null; // Reset selected quiz
    router.replace(`/main/coursePage/` + courseId);
  } catch (error) {
    console.error("Error answering quiz:", error);
    Notify.create({
      type: "warning",
      message: "Quiz Already Taken",
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="sass" scoped>
.main-container
  width: 100vw
  height: auto
  margin: auto
.quiz-container
  border: 1px solid #d9d9d9
  border-radius: 14px
  width: 50vw
</style>
