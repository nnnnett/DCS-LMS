<template>
  <div class="quiz-form">
    <q-card-section>
      <div>
        <q-btn
          :to="`../coursePage/` + courseId"
          icon="keyboard_backspace"
        ></q-btn>
      </div>
    </q-card-section>
    <h1>Create a Quiz</h1>

    <form @submit.prevent="createQuiz">
      <div>
        <label for="name">Quiz Name:</label>
        <q-input type="text" id="name" v-model="quiz.name" required />
      </div>

      <div>
        <q-card-section> Number of Questions</q-card-section>
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
        <q-card-section> Due date </q-card-section>
        <q-input type="date" v-model="quiz.dueDate"> </q-input>
      </div>
      <div
        v-for="(question, index) in quiz.questions"
        :key="index"
        class="question-group"
      >
        <h3>Question {{ index + 1 }}</h3>
        <q-card-section>Questions: </q-card-section>
        <q-input
          type="text"
          v-model="question.question"
          :placeholder="'Enter question ' + (index + 1)"
          required
        />
        <q-card-section> Answers: </q-card-section>
        <q-input
          type="text"
          v-model="question.answer"
          :placeholder="'Enter answer for question ' + (index + 1)"
          required
        />
      </div>
      <q-btn type="submit" label="Create Quiz"></q-btn>
    </form>
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

<style>
.quiz-form {
  max-width: 600px;
  margin: auto;
}
.question-group {
  margin-bottom: 20px;
}
</style>
