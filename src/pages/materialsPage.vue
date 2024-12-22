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

<script setup></script>
