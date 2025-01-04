<template>
  <q-page>
    <!-- main container -->
    <div class="main-container q-px-xl">
      <q-card-section
        class="q-mt-lg flex q-px-none headerTxtBtn"
        style="width: 100%"
      >
        <div class="text-h5 text-weight-medium" style="color: #4b4b4b">
          User Management
        </div>
      </q-card-section>
      <!-- user details table -->
      <div>
        <q-table
          :rows="rows"
          :columns="columns"
          row-key="id"
          separator="cell"
          :filter="filter"
          :rows-per-page-options="[0, 15, 20, 25, 30]"
        >
          <template #body="props">
            <q-tr key="id" :props="props">
              <q-td>{{ props.row.lastName }}</q-td>
              <q-td> {{ props.row.firstName }} </q-td>
              <q-td> {{ props.row.userName }} </q-td>
              <q-td>{{ props.row.email }}</q-td>
              <q-td>{{ props.row.role }}</q-td>
              <q-td>{{ props.row.status }}</q-td>
              <q-td>{{ props.row.enrolledCourse }}</q-td>
              <q-td>
                <q-btn-dropdown dropdown-icon="more_vert" flat>
                  <q-list>
                    <q-item>
                      <q-btn flat class="text-primary" @click="editUser"
                        >Edit</q-btn
                      ></q-item
                    >
                    <q-item>
                      <q-btn flat class="text-red" @click="archiveUser"
                        >Archive</q-btn
                      ></q-item
                    >
                    <q-item>
                      <q-btn flat class="text-red" @click="resetPassword"
                        >Reset Pass</q-btn
                      ></q-item
                    >
                  </q-list>
                </q-btn-dropdown>
              </q-td>
            </q-tr>
          </template>
          <template v-slot:top-left>
            <q-input
              borderless
              dense
              debounce="300"
              v-model="filter"
              placeholder="Search"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
          <template v-slot:top-right>
            <div style="display: flex">
              <q-btn
                class="bg-primary text-white q-mr-sm"
                flat
                label="Add Instructor"
                no-caps
                @click="addInstructor = true"
              />

              <q-btn
                class="bg-primary text-white"
                flat
                icon-right="archive"
                label="Export to csv"
                no-caps
                @click="exportTable"
              />
            </div>
            <div>
              <q-dialog v-model="addInstructor" persistent>
                <q-card class="registration-container q-pa-xl">
                  <q-form @submit.prevent="registerInstructor">
                    <q-card-section>
                      <div style="color: #4b4b4b; font-weight: 500">
                        Add Instructor
                      </div>
                    </q-card-section>

                    <q-card-section class="q-pl-none q-pb-none text-h5">
                      <div style="color: #4b4b4b">
                        <span style="color: #46af4b">*</span> Basic info
                      </div>
                    </q-card-section>
                    <!-- First Name -->
                    <q-card-section class="q-pl-none q-pb-xs">
                      <div style="color: #6c7275">First Name</div>
                    </q-card-section>
                    <div class="registration-input q-px-sm">
                      <q-input type="text" borderless v-model="firstName" />
                    </div>
                    <!-- Middle Name -->
                    <q-card-section class="q-pl-none q-pb-xs">
                      <div style="color: #6c7275">Middle Name</div>
                    </q-card-section>
                    <div class="registration-input q-px-sm">
                      <q-input type="text" borderless v-model="middleName" />
                    </div>
                    <!-- Last Name -->
                    <q-card-section class="q-pl-none q-pb-xs">
                      <div style="color: #6c7275">Last Name</div>
                    </q-card-section>
                    <div class="registration-input q-px-sm">
                      <q-input type="text" borderless v-model="lastName" />
                    </div>
                    <!-- prfile image -->
                    <div class="registration-input q-mt-md">
                      <q-file
                        class="q-px-md"
                        v-model="imageProfile"
                        accept="image/*"
                        borderless
                        label="Upload Profile Image"
                      >
                        <template #append>
                          <q-icon name="upload"></q-icon>
                        </template>
                      </q-file>
                    </div>
                    <q-card-section class="q-pl-none q-pb-none text-h5">
                      <div style="color: #4b4b4b">
                        <span style="color: #46af4b">*</span> Login info
                      </div>
                    </q-card-section>
                    <q-card-section class="q-pl-none q-pb-xs">
                      <div style="color: #6c7275">Username</div>
                    </q-card-section>
                    <!-- username -->
                    <div class="registration-input q-px-sm">
                      <q-input type="text" borderless v-model="username" />
                    </div>
                    <!-- Email -->
                    <q-card-section class="q-pl-none q-pb-xs">
                      <div style="color: #6c7275">Email</div>
                    </q-card-section>
                    <div class="registration-input q-px-sm">
                      <q-input type="email" borderless v-model="email" />
                    </div>
                    <q-card-section class="q-pl-none q-pb-xs">
                      <div style="color: #6c7275">Password</div>
                    </q-card-section>
                    <!-- Password -->
                    <div class="registration-input q-px-sm">
                      <q-input
                        :type="isPwd ? 'password' : 'text'"
                        borderless
                        v-model="password"
                      >
                        <template v-slot:append>
                          <q-icon
                            :name="isPwd ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            @click="isPwd = !isPwd"
                          /> </template
                      ></q-input>
                    </div>
                    <q-card-section class="q-pl-none q-pb-xs">
                      <div style="color: #6c7275">Confirm Password</div>
                    </q-card-section>
                    <!-- Password -->
                    <div class="registration-input q-px-sm">
                      <q-input
                        :type="isCPwd ? 'password' : 'text'"
                        borderless
                        v-model="confirmPassword"
                      >
                        <template v-slot:append>
                          <q-icon
                            :name="isCPwd ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            @click="isCPwd = !isCPwd"
                          />
                        </template>
                      </q-input>
                    </div>

                    <div
                      style="width: 100%; border-radius: 14px"
                      class="q-mt-md flex"
                    >
                      <!-- submit button -->
                      <q-btn
                        type="submit"
                        flat
                        label="Sign Up"
                        :loading="loading"
                        style="
                          width: 45%;
                          background-color: #46af4b;
                          color: #ffffff;
                          text-transform: capitalize;
                          border-radius: 14px;
                          padding: 14px 0px;
                        "
                      />
                      <!-- cancel button -->
                      <q-space />
                      <q-btn
                        flat
                        label="Cancel"
                        :loading="loading"
                        @click="cancelRegister"
                        style="
                          width: 45%;
                          border: 1px solid #46af4b;
                          color: #46af4b;
                          text-transform: capitalize;
                          border-radius: 14px;
                          padding: 14px 0px;
                        "
                      />
                    </div>
                  </q-form>
                </q-card>
              </q-dialog>
            </div>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<style scoped lang="sass">
.main-container
  width: 100%
  height: auto
.registration-container
  height: auto
  width: 40vw
  justify-self: center
  border: 1px solid #D9D9D9
  border-radius: 14px
  box-shadow: none
.registration-input
  width: 100%
  border-radius: 14px
  border: 1px solid #6C7275
@media (max-width: 900px)
  .registration-container
    width: 90vw
</style>

<script setup>
import { ref } from "vue";
import { Notify, exportFile } from "quasar";
import axios from "axios";
import { uploadToCloud } from "src/components/cloudinaryUtility";

const filter = ref("");
const addInstructor = ref(false);
const isPwd = ref(true);
const isCPwd = ref(true);
const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const email = ref("");
const firstName = ref("");
const lastName = ref("");
const middleName = ref("");
const role = ref("instructor");
const isArchived = ref(false);
const loading = ref(false);
const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*\d).{8,}$/; // Regex for special char, number, and min 8 chars
const imageProfile = ref(null);

const rows = ref([
  {
    id: 1,
    firstName: "Kenneth",
    lastName: "Doblon",
    userName: "nnet",
    email: "kennethdoblon@gmail.com",
    role: "student",
    status: "active",
    enrolledCourse: "Course 5, Course 2",
  },
  {
    id: 2,
    firstName: "Jules",
    lastName: "Barantes",
    userName: "magister",
    email: "julesbarantes@gmail.com",
    role: "admin",
    status: "inactive",
    enrolledCourse: "Course 1, Course 3",
  },
  {
    id: 3,
    firstName: "Khris",
    lastName: "Wahing",
    userName: "kira",
    email: "khriswahing@gmail.com",
    role: "instructor",
    status: "active",
    enrolledCourse: "Course 1, Course 3",
  },
]);

const columns = ref([
  {
    sortable: true,
    name: "lastName",
    label: "Surname",
    align: "left",
    field: "lastName",
  },
  {
    name: "firstName",
    label: "First Name",
    align: "left",
    field: "firstName",
  },
  {
    name: "userName",
    label: "User Name",
    align: "left",
    field: "userName",
  },
  {
    name: "email",
    label: "Email",
    align: "left",
    field: "email",
  },
  {
    name: "role",
    label: "Role",
    align: "left",
    field: "role",
  },
  {
    name: "status",
    label: "Status",
    align: "left",
    field: "status",
  },
  {
    name: "enrolledCourse",
    label: "Enrolled Course",
    align: "left",
    field: "enrolledCourse",
  },
  {
    name: "actions",
    label: "Actions",
    align: "left",
    field: "actions",
  },
]);

async function resetPassword() {
  console.log("reset pass");
}
async function editUser() {
  console.log("Edit User");
}

async function archiveUser() {
  console.log("Archived user");
}

function wrapCsvValue(val, formatFn, row) {
  let formatted = formatFn !== void 0 ? formatFn(val, row) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`;
}

function exportTable() {
  // Naive encoding to CSV format
  const content = [columns.value.map((col) => wrapCsvValue(col.label))]
    .concat(
      rows.value.map((row) =>
        columns.value
          .map((col) =>
            wrapCsvValue(
              typeof col.field === "function"
                ? col.field(row)
                : row[col.field === void 0 ? col.name : col.field],
              col.format,
              row
            )
          )
          .join(",")
      )
    )
    .join("\r\n");

  const status = exportFile("users-data.csv", content, "text/csv");

  if (status !== true) {
    Notify.create({
      message: "Browser denied file download...",
      color: "negative",
      icon: "warning",
    });
  }
}

async function registerInstructor() {
  if (
    !username.value ||
    !password.value ||
    !confirmPassword.value ||
    !email.value ||
    !firstName.value ||
    !middleName.value ||
    !lastName.value
  ) {
    Notify.create({
      type: "warning",
      message: "Please fill in all required fields.",
    });
    return;
  } else if (password.value !== confirmPassword.value) {
    Notify.create({
      type: "warning",
      message: "Passwords do not match! Please try again..",
    });
    return;
  } else if (password.value.length < 8) {
    Notify.create({
      type: "warning",
      message: "Use 8 or more characters",
    });
    return;
  } else if (!passwordRegex.test(password.value)) {
    Notify.create({
      type: "warning",
      message:
        "Contain at least one special character (!@#$%^&*)\n" +
        "Contain at least one number",
    });
    return;
  }
  try {
    loading.value = true;
    const imageUrl = await uploadToCloud(imageProfile.value);
    const token = localStorage.getItem("authToken");
    const response = await axios.post(
      `${process.env.api_host}/users/create`,
      {
        username: username.value,
        password: password.value,
        email: email.value,
        firstName: firstName.value,
        middleName: middleName.value,
        lastName: lastName.value,
        role: role.value,
        isArchived: isArchived.value,
        file: imageUrl,
      },
      {
        headers: { "Content-Type": "application/json", authorization: token },
      }
    );
    username.value = "";
    password.value = "";
    confirmPassword.value = "";
    email.value = "";
    firstName.value = "";
    middleName.value = "";
    lastName.value = "";
    role.value = "";
    isArchived.value = "";
    imageProfile.value = "";
    Notify.create({
      type: "positive",
      message: "Account Created Succesfully",
    });
  } catch (err) {
    console.error(err);
    Notify.create({
      type: "negative",
      message:
        "An error occurred while creating the account. Please try again.",
    });
  } finally {
    loading.value = false;
    addInstructor.value = false;
  }
}

async function cancelRegister() {
  username.value = "";
  password.value = "";
  confirmPassword.value = "";
  email.value = "";
  firstName.value = "";
  middleName.value = "";
  lastName.value = "";
  role.value = "";
  isArchived.value = "";
  imageProfile.value = "";
  addInstructor.value = false;
}
</script>
