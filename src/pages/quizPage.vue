<template>
  <div class="main-container flex flex-center">
    <!-- Create Quiz -->
    <div class="quiz-container q-my-md q-pa-md">
      <q-card-section>
        <q-btn
          icon="arrow_back_ios"
          flat
          :to="`/main/coursePage/` + courseId"
        />
      </q-card-section>
      <q-card-section>
        <div>Create Quiz</div>
      </q-card-section>
      <form @submit.prevent="createQuiz">
        <q-input
          v-model="newQuiz.name"
          type="text"
          placeholder="Quiz Name"
          required
        />
        <div v-for="(question, index) in newQuiz.questions" :key="index">
          <div>
            <q-card-section class="q-pl-none q-pb-none">
              <div>Add Question</div>
            </q-card-section>
            <q-input
              v-model="question.question"
              type="text"
              placeholder="Question"
              required
            />
          </div>
          <div class="q-mt-sm">
            <select
              class="q-py-md"
              v-model="question.type"
              required
              style="border: 1px solid #d9d9d9; width: 100%"
            >
              <option value="" disabled>Select Type</option>
              <option value="mcq">Multiple Choice</option>
              <option value="fib">Identification</option>
            </select>
          </div>
          <div v-if="question.type === 'mcq'" class="q-mt-none">
            <q-card-section
              class="q-pl-none"
              v-for="(option, idx) in question.options"
              :key="idx"
            >
              Option {{ idx + 1 }}:

              <q-input
                outlined
                style="width: 100%"
                v-model="question.options[idx]"
                type="text"
              />
            </q-card-section>

            <div align="right" class="q-mt-sm">
              <q-btn no-caps type="button" @click="addOption(index)"
                >Add Option</q-btn
              >
            </div>
          </div>
          <div>
            <q-card-section class="q-pl-none q-pb-none">
              <div>Correct Answer</div>
            </q-card-section>
            <q-input v-model="question.answer" type="text" outlined required />
          </div>
          <div class="q-my-sm">
            <q-btn
              class="bg-red text-white"
              no-caps
              type="button"
              @click="removeQuestion(index)"
            >
              Remove Question
            </q-btn>
          </div>
        </div>
        <div>
          <q-btn type="button" no-caps @click="addQuestion">Add Question</q-btn>
        </div>
        <div align="right">
          <q-btn
            :loading="loading"
            type="submit"
            class="bg-primary text-white"
            no-caps
            >Create Quiz</q-btn
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { Notify } from "quasar";

// State variables
const newQuiz = ref({
  name: "",
  questions: [],
});

const loading = ref(false);
const router = useRouter();
const route = useRoute();
const quizzes = ref([]);
const selectedQuiz = ref(null);
const answers = ref([]);
const searchQuery = ref("");
const courseId = route.params.courseId;

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
  loading.value = true;
  const token = localStorage.getItem("authToken");
  try {
    const response = await axios.post(
      `${process.env.api_host}/courses/quiz/${courseId}`,
      newQuiz.value,
      {
        headers: {
          authorization: token,
        },
      }
    );
    Notify.create({
      type: "positive",
      message: "Quiz created successfully!",
    });
    newQuiz.value = { name: "", questions: [] }; // Reset form
    router.replace(`/main/coursePage/` + courseId);
  } catch (error) {
    console.error("Error creating quiz:", error);
    Notify.create({
      type: "negative",
      message: "Failed to create quiz.",
    });
  } finally {
    loading.value = false;
  }
};

// const fetchQuizzes = async () => {
//   const token = localStorage.getItem("authToken");
//   try {
//     const params = {
//       query: searchQuery.value,
//       courseId: "COURSE_ID", // Optional parameter
//     };
//     const response = await axios.get(
//       `${process.env.api_host}/courses/getQuiz`,
//       {
//         params,
//       },
//       {
//         headers: {
//           authorization: token,
//         },
//       }
//     );
//     quizzes.value = response.data;
//   } catch (error) {
//     console.error("Error fetching quizzes:", error);
//     alert("Failed to fetch quizzes.");
//   }
// };

// const selectQuiz = (quiz) => {
//   selectedQuiz.value = quiz;
//   answers.value = Array(quiz.questions.length).fill("");
// };

// const answerQuiz = async () => {
//   const token = localStorage.getItem("authToken");
//   try {
//     const quizId = selectedQuiz.value._id;
//     const response = await axios.post(
//       `${process.env.api_host}/courses/answerQuiz/${quizId}`,
//       {
//         answers: answers.value,
//       },
//       {
//         headers: {
//           authorization: token,
//         },
//       }
//     );
//     alert(`Quiz submitted! Your grade: ${response.data.totalGrade}%`);
//     selectedQuiz.value = null; // Reset selected quiz
//   } catch (error) {
//     console.error("Error answering quiz:", error);
//     alert("Failed to submit answers.");
//   }
// };
</script>

<style lang="sass" scoped>
.main-container
  width: 99vw
  height: auto
  margin: auto
.quiz-container
  border: 1px solid #d9d9d9
  border-radius: 14px
  width: 50vw
</style>
