<template>
  <q-page>
    <!-- Main Container -->
    <div class="main-container">
      <!-- Back btn and material name -->
      <q-card-section class="flex flex-center headerNavMaterialss">
        <div class="backBtn">
          <q-btn
            label="<"
            size="20px"
            flat
            to="/main/coursePage"
            style="
              background-color: #f2f7ff;
              border-radius: 50%;
              height: 50px;
              width: 50px;
            "
          />
          <div class="q-ml-lg text-h6">Sample Course</div>
        </div>
      </q-card-section>
      <div class="materials-Submit-Container flex flex-center">
        <!-- Materials  -->
        <q-card-section class="courseMaterials">
          <q-card class="marterialsContent q-px-lg">
            <q-card-section
              class="flex"
              style="align-items: center; color: #4b4b4b"
            >
              <div class="q-mr-lg">
                <q-img
                  src="https://res.cloudinary.com/dqaw6ndtn/image/upload/v1734702947/assets/egs1cglp5qdtkg5ra7dj.png"
                  style="width: 50px; height: 50px; border-radius: 50%"
                />
              </div>
              <div>
                <div>Rosalina D. Lacuesta</div>
                <div class="text-caption">December 12, 2024</div>
              </div>
            </q-card-section>
            <!-- Activity Image -->
            <q-card-section>
              <div style="height: auto">
                <q-img
                  src="https://res.cloudinary.com/dqaw6ndtn/image/upload/v1734702966/assets/mtmjbgnoj8viqadlanma.jpg"
                  style="
                    height: auto;
                    background-size: cover;
                    background-position: center;
                    position: relative;
                    border-radius: 14px;
                    overflow: hidden;
                    display: flex;
                  "
                />
              </div>
            </q-card-section>
            <!-- material content -->
            <q-card-section
              class="q-px-xl materialsContentTxt"
              style="color: #4b4b4b"
            >
              <div class="text-h6 q-mb-sm">Capstone Forms</div>
              <div style="text-align: justify">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi
                accusamus ex nulla hic esse, numquam itaque obcaecati id. Harum
                excepturi porro numquam quasi ut, corporis sit rem fuga maiores
                beatae.
              </div>
            </q-card-section>
            <!-- download file -->
            <q-card-section class="q-px-xl materialsFile">
              <div style="width: 100%">
                <q-btn
                  target="_blank"
                  style="text-decoration: none; color: var(--q-primary)"
                >
                  //file name lore accusamus ex nulla hic esse, numquam itaque
                  obcaecati id. Harum excepturi porro numquam quasi ut, corporis
                  sit rem fuga maiores beatae.
                </q-btn>
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <div>
                <q-img
                  src="https://res.cloudinary.com/dqaw6ndtn/image/upload/v1734702947/assets/egs1cglp5qdtkg5ra7dj.png"
                  style="width: 30px; height: 30px; border-radius: 50%"
                />
                <!-- might need q-form -->
                <div>
                  <q-input type="textarea" label="Comment here..." />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-card-section>

        <!-- Submit Work -->
        <q-card-section class="submitWork">
          <q-card class="submitWorkContent">
            <q-card-section>
              <div class="workStatusTxt">
                <div class="text-h5 text-weight-medium">Your Work</div>
                <!-- pending status -->
                <!-- <div
                  class="text-weight-medium"
                  style="color: #ffcf32; font-size: 1rem"
                >
                  Pending
                </div> -->
                <!-- done status -->
                <!-- <div
                  class="text-weight-medium"
                  style="color: #46af4b; font-size: 1rem"
                >
                  Done
                </div> -->
                <!-- missing status -->
                <div
                  class="text-weight-medium"
                  style="color: #ff7070; font-size: 1rem"
                >
                  Missing
                </div>
              </div>
              <!-- List of submitted Work -->
              <div>
                <div class="submittedWork-container q-mt-sm">
                  <div>wewe</div>
                </div>
              </div>
              <!-- file input and submit button -->
              <div>
                <!-- file input for submit work -->
                <div
                  class="q-mt-sm"
                  style="border: 1px solid #46af4b; border-radius: 14px"
                >
                  <q-file
                    class="q-px-xl"
                    borderless
                    v-model="submitWork"
                    label="Attach Activity"
                    clearable
                    icon="home"
                  >
                    <template v-slot:append>
                      <q-icon name="attach_file" />
                    </template>
                  </q-file>
                </div>
                <!-- no unsubmit btn if no attach file * vice versa -->
                <!-- Submit button -->
                <div
                  class="q-mt-sm"
                  style="
                    background-color: #46af4b;
                    color: #ffffff;
                    border-radius: 14px;
                  "
                >
                  <q-btn
                    flat
                    label="Submit"
                    style="width: 100%; text-transform: capitalize"
                  />
                </div>
                <!-- Unsubmit Button -->
                <div
                  class="q-mt-sm"
                  style="
                    background-color: #d9d9d9;
                    color: #ffffff;
                    border-radius: 14px;
                  "
                >
                  <q-btn
                    flat
                    label="Unsubmit"
                    style="width: 100%; text-transform: capitalize"
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-card-section>
      </div>
    </div>
  </q-page>
</template>
<style lang="sass" scoped>
.main-container
  height: auto
.headerNavMaterialss
  width: 100%
  color: #4B4B4B
.backBtn
  width: 70vw
  display: flex
  align-items: center
.materials-Submit-Container
  display: flex
.courseMaterials
  height: auto
.marterialsContent
  border: 1px solid #D9D9D9
  border-radius: 14px
  box-shadow: none
  width: 50vw
  height: auto
.submitWork
  height: auto
  align-self: flex-start
.submitWorkContent
  border: 1px solid #D9D9D9
  border-radius: 14px
  box-shadow: none
  width: 20vw
  height: auto
.submittedWork-container
  border: 1px solid #D9D9D9
  border-radius: 14px
  display: flex
  justify-content: center
  align-items: center
  height: 50px
.workStatusTxt
  display: flex
  justify-content: space-between
  align-items: center
  color: #4B4B4B
@media (max-width:1004px)
  .marterialsContent
    width: 90vw
  .materials-Submit-Container
    display: flex
    flex-direction: column
  .submitWork
    justify-content: center
    display: flex
    width: 100vw
  .submitWorkContent
    width: 90vw
@media (max-width:547px)
  .materialsContentTxt
    padding: 0px
  .materialsFile
    padding: 14px 0px
    max-height: 50px
    overflow: hidden
    text-overflow: ellipsis
    width: 100%
    white-space: nowrap
</style>

<script setup>
import { ref } from "vue";

const submitWork = ref("");
</script>
