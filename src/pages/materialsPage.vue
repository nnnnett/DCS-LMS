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
      <!-- Materials  -->
      <q-card-section class="flex flex-center courseMaterials">
        <q-card class="marterialsContent q-px-lg">
          <q-card-section class="contentHeader">
            <div class="imgInstructor">
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
            </div>
            <div class="dueDateTxtBtn">
              <div>
                <div>DUE JAN. 06 2025</div>
                <div>100 points</div>
              </div>
              <div v-if="isInstructor">
                <q-btn-dropdown flat dropdown-icon="more_vert">
                  <q-list>
                    <q-item
                      clickable
                      v-close-popup
                      @click="editMaterials = true"
                    >
                      <q-item-section>
                        <q-item-label>Edit</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </div>
            </div>
          </q-card-section>
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
      <!-- Assignment Edit -->
      <div>
        <q-dialog v-model="editMaterials" persistent>
          <q-card style="width: 700px; max-width: 80vw">
            <q-card-section>
              <div class="text-h6">Edit Material</div>
            </q-card-section>
            <!-- q form -->
            <q-form>
              <div
                style="width: 100%; color: #4b4b4b"
                class="q-px-xl flex flex-center"
              >
                <div style="width: 90%">
                  <q-card-section class="q-px-none"> Title </q-card-section>
                  <q-input
                    v-model="editTitle"
                    type="text"
                    borderless
                    class="q-px-md"
                    style="border: 1px solid #4b4b4b; border-radius: 14px"
                  >
                  </q-input>
                </div>
                <div style="width: 90%">
                  <q-card-section class="q-px-none">
                    Material Description
                  </q-card-section>
                  <q-input
                    v-model="editDescription"
                    type="textarea"
                    borderless
                    class="q-px-md"
                    style="border: 1px solid #4b4b4b; border-radius: 14px"
                  >
                  </q-input>
                </div>
                <div style="width: 90%">
                  <q-card-section class="q-px-none"> </q-card-section>
                  <q-file
                    v-model="newFile"
                    style="width: auto"
                    label="Upload File"
                    clearable
                    multiple
                  >
                    <template v-slot:prepend>
                      <q-icon name="attach_file" />
                    </template>
                  </q-file>
                </div>

                <div
                  style="width: 80%; display: flex; justify-content: flex-end"
                >
                  <q-card-actions align="right" class="bg-white text-teal">
                    <q-btn flat label="Save" type="submit" />
                  </q-card-actions>
                  <q-card-actions align="right" class="bg-white text-teal">
                    <q-btn flat label="Cancel" v-close-popup />
                  </q-card-actions>
                </div>
              </div>
            </q-form>
          </q-card>
        </q-dialog>
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
.courseMaterials
  height: auto
.marterialsContent
  border: 1px solid #D9D9D9
  border-radius: 14px
  box-shadow: none
  width: 70vw
  height: auto
.contentHeader
  align-items: center
  display: flex
  color: #4b4b4b
  width: 100%
.imgInstructor
  display: flex
  align-items: center
  width: 50%
.dueDateTxtBtn
  display: flex
  justify-content: flex-end
  width: 50%
@media (max-width:739px)
  .materialsContentTxt
    padding: 0px
  .materialsFile
    padding: 14px 0px
    max-height: 50px
    overflow: hidden
    text-overflow: ellipsis
    width: 100%
    white-space: nowrap
  .contentHeader
    display: flex
    flex-direction: column
  .imgInstructor
    width: 100%
  .dueDateTxtBtn
    width: 100%
    margin-top: 10px
    display: flex
    justify-content: flex-start
    margin-top: 15px
</style>

<script setup>
import { ref, onMounted } from "vue";
// role validation
const roleChecker = ref("instructor");
const isStudent = ref("");
const isInstructor = ref("");

const editMaterials = ref(false);
const editTitle = ref("");
const editDescription = ref("");
const newFile = ref("");

async function roleValidation() {
  if (roleChecker.value === "student") {
    return (isStudent.value = true);
  } else if (roleChecker.value === "instructor") {
    return (isInstructor.value = true);
  } else {
    return;
  }
}
onMounted(() => {
  roleValidation();
});
</script>
