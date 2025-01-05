<template>
  <div class="quiz-form main-container flex flex-center">
    <div class="quiz-container q-mt-md q-pa-md">
      <q-card-section class="q-pl-none">
        <div>
          <q-btn
            :to="`../coursePage/` + courseId"
            icon="keyboard_backspace"
          ></q-btn>
        </div>
      </q-card-section>
      <form @submit.prevent="createQuiz">
        <div class="question">
          <q-card-section>
            <div class="text-h5">Create a Quiz</div>
          </q-card-section>
          <div>
            <q-card-section class="q-pl-none q-pb-none">
              <div>Quiz Name:</div>
            </q-card-section>
            <q-input type="text" id="name" v-model="quiz.name" required />
          </div>
          <div>
            <q-card-section class="q-pl-none q-pb-none"
              ><div>Number of Questions</div></q-card-section
            >
            <q-input
              type="number"
              id="numQuestions"
              v-model.number="numQuestions"
              min="1"
              @change="updateQuestions"
              required
            />
          </div>
          <div>
            <q-card-section class="q-pl-none q-pb-none"
              ><div>Due date</div>
            </q-card-section>
            <q-input type="date" v-model="quiz.dueDate"> </q-input>
          </div>
          <div
            v-for="(question, index) in quiz.questions"
            :key="index"
            class="question-group"
          >
            <q-card-section class="q-pl-none q-pb-none"
              ><div class="text-h5">
                Question {{ index + 1 }}
              </div></q-card-section
            >
            <q-card-section class="q-pb-none q-pl-none"
              >Questions:
            </q-card-section>
            <q-input
              type="text"
              v-model="question.question"
              :placeholder="'Enter question ' + (index + 1)"
              required
            />
            <q-card-section class="q-pb-none q-pl-none">
              Answers:
            </q-card-section>
            <q-input
              type="text"
              v-model="question.answer"
              :placeholder="'Enter answer for question ' + (index + 1)"
              required
            />
          </div>
          <div align="right">
            <q-btn
              :loading="loading"
              flat
              type="submit"
              class="bg-primary text-white"
              no-caps
              label="Create Quiz"
            ></q-btn>
          </div>
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

const loading = ref(false);
const router = useRouter();
const route = useRoute();
const courseId = route.params.courseId;
// Reactive data
const quiz = ref({
  name: "",
  questions: [],
  dueDate: "",
});

const numQuestions = ref(1);

// Methods
const updateQuestions = () => {
  const currentLength = quiz.value.questions.length;
  if (numQuestions.value > currentLength) {
    for (let i = currentLength; i < numQuestions.value; i++) {
      quiz.value.questions.push({ question: "", answer: "" });
    }
  } else {
    quiz.value.questions.splice(numQuestions.value);
  }
};

async function createQuiz() {
  loading.value = true;
  try {
    if (!quiz.value) {
      Notify.create({
        type: "warning",
        message: "Please Fill all required fields",
      });
    }
    const token = localStorage.getItem("authToken");
    const response = await axios.post(
      `${process.env.api_host}/courses/quiz/${courseId}`,
      quiz.value,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      }
    );
    Notify.create({
      type: "positive",
      message: "Quiz created Succesfully",
    });
    router.replace(`../coursePage/` + courseId);
  } catch (error) {
    console.error(error);
    Notify.create({
      type: "negative",
      message: "Something went wrong",
    });
  } finally {
    loading.value = false;
  }
}

const resetForm = () => {
  quiz.value = { coursesId: "", name: "", questions: [] };
  numQuestions.value = 1;
};
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
.question-group
  margin-bottom: 20px
.quiz-container
  border: 1px solid #d9d9d9
  border-radius: 14px
  width: 50vw
</style>
