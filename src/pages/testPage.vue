<template>
  <q-page padding>
    <div class="form-container">
      <q-btn
        label="Add Question"
        color="primary"
        icon="add"
        @click="addQuestion"
        class="q-mb-md"
      />

      <!-- Questions List -->
      <div
        v-for="(question, qIndex) in questions"
        :key="qIndex"
        class="q-mb-lg"
      >
        <div class="q-mb-md">
          <q-input
            v-model="question.text"
            label="Question"
            outlined
            class="q-mb-sm"
            style="width: 100%"
          />
        </div>

        <div class="q-mb-md">
          <q-select
            v-model="question.type"
            :options="questionTypes"
            label="Select Question Type"
            outlined
            style="width: 100%"
          />
        </div>

        <!-- Multiple Choice Options -->
        <div v-if="question.type === 'Multiple Choice'">
          <div
            v-for="(option, oIndex) in question.options"
            :key="oIndex"
            class="q-mb-sm"
          >
            <q-input
              v-model="question.options[oIndex]"
              label="Option"
              outlined
              class="q-mr-sm"
              style="width: 85%; display: inline-block"
            />
            <q-radio
              v-model="question.correctAnswer"
              :val="oIndex"
              style="margin-left: 8px"
              label="Correct"
            />
            <q-btn
              flat
              dense
              icon="delete"
              color="negative"
              @click="removeOption(qIndex, oIndex)"
            />
          </div>
          <q-btn
            label="Add Option"
            flat
            icon="add"
            color="primary"
            @click="addOption(qIndex)"
            class="q-my-md"
          />
        </div>

        <!-- Fill in the Blank -->
        <div v-if="question.type === 'Fill in the Blank'">
          <q-input
            v-model="question.correctAnswer"
            label="Correct Answer"
            outlined
            class="q-mb-md"
            style="width: 100%"
          />
        </div>

        <q-btn
          flat
          dense
          color="negative"
          label="Remove Question"
          icon="delete"
          @click="removeQuestion(qIndex)"
          class="q-mt-md"
        />
      </div>

      <!-- Save All Questions -->
      <q-btn
        label="Save Questions"
        color="primary"
        icon="save"
        @click="saveQuestions"
        class="q-mt-lg"
      />
    </div>
  </q-page>
  <q-page padding>
    <div class="q-pa-md">
      <h3>Quiz Questions</h3>

      <!-- Questions List -->
      <div
        v-for="(question, qIndex) in questions"
        :key="qIndex"
        class="q-mb-lg"
      >
        <div class="q-mb-md">
          <h5>Question {{ qIndex + 1 }}</h5>
          <p>{{ question.text }}</p>
        </div>

        <!-- Multiple Choice -->
        <div v-if="question.type === 'Multiple Choice'" class="q-mb-md">
          <q-option-group
            v-model="studentAnswers[qIndex]"
            :options="
              question.options.map((option, oIndex) => ({
                label: option,
                value: oIndex,
              }))
            "
            type="radio"
            color="primary"
          />
        </div>

        <!-- Fill in the Blank -->
        <div v-if="question.type === 'Fill in the Blank'" class="q-mb-md">
          <q-input
            v-model="studentAnswers[qIndex]"
            label="Your Answer"
            outlined
            style="width: 100%"
          />
        </div>
      </div>

      <!-- Submit Button -->
      <q-btn
        label="Submit Answers"
        color="primary"
        icon="check"
        @click="submitAnswers"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Notify } from "quasar";
import axios from "axios";
// Question Types
const questionTypes = ref(["Multiple Choice", "Fill in the Blank"]);

// Questions Array
const questions = ref([]);

// Add a New Question
function addQuestion() {
  questions.value.push({
    text: "",
    type: "Multiple Choice", // Default type
    options: [""], // Empty options for Multiple Choice
    correctAnswer: null, // Holds correct answer index (Multiple Choice) or text (Fill in the Blank)
  });
}

// Remove a Question
function removeQuestion(index) {
  questions.value.splice(index, 1);
}

// Add an Option to a Multiple Choice Question
function addOption(qIndex) {
  questions.value[qIndex].options.push("");
}

// Remove an Option from a Multiple Choice Question
function removeOption(qIndex, oIndex) {
  questions.value[qIndex].options.splice(oIndex, 1);

  // Reset correct answer index if it becomes invalid
  if (questions.value[qIndex].correctAnswer === oIndex) {
    questions.value[qIndex].correctAnswer = null;
  }
}

// Save Questions
function saveQuestions() {
  console.log("Saved Questions:", questions.value);

  Notify.create({
    type: "positive",
    message: "Questions saved successfully!",
  });
}

// Store student answers
const studentAnswers = ref([]);

// Fetch questions on mount
async function fetchQuestions() {
  try {
    // Replace with your API endpoint to fetch instructor questions
    const response = await axios.get(
      `${process.env.api_host}/instructor/questions`
    );
    questions.value = response.data;

    // Initialize studentAnswers with null for each question
    studentAnswers.value = new Array(questions.value.length).fill(null);
  } catch (error) {
    console.error("Failed to fetch questions:", error);
    Notify.create({
      type: "negative",
      message: "Failed to load questions. Please try again.",
    });
  }
}

// Submit student answers
function submitAnswers() {
  console.log("Student Answers:", studentAnswers.value);

  // Submit answers to the backend or process them locally
  Notify.create({
    type: "positive",
    message: "Answers submitted successfully!",
  });
}

onMounted(fetchQuestions);
</script>
