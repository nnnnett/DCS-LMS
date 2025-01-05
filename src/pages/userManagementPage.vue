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
          :rows-per-page-options="[0, 15, 20, 25, 30]"
        >
          <template #body="props">
            <q-tr :props="props">
              <q-td>{{ props.row.lastName }}</q-td>
              <q-td>{{ props.row.firstName }}</q-td>
              <q-td>{{ props.row.username }}</q-td>
              <q-td>{{ props.row.email }}</q-td>
              <q-td>{{ props.row.role }}</q-td>
              <q-td>{{ props.row.status }}</q-td>

              <q-td>
                <q-btn-dropdown dropdown-icon="more_vert" flat>
                  <q-list>
                    <q-item>
                      <q-btn flat class="text-primary" @click="editUser"
                        >Edit</q-btn
                      >
                    </q-item>
                    <q-item>
                      <q-btn
                        flat
                        class="text-red"
                        @click="archiveUser(props.row.id)"
                        >{{ props.row.button }}</q-btn
                      >
                    </q-item>
                    <q-item>
                      <q-btn
                        flat
                        class="text-red"
                        @click="resetPassword(props.row.id)"
                      >
                        Reset Pass
                      </q-btn>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </q-td>
            </q-tr>
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
import { ref, onMounted } from "vue";
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
const allUser = ref("");

const rows = ref([]); // Initialize rows with an empty array
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
    field: "username", // Matches the field name from backend data
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
    field: "status", // Add this field to your backend data if necessary
  },

  {
    name: "actions",
    label: "Actions",
    align: "left",
    field: "actions",
  },
]);

async function getUser() {
  try {
    const response = await axios.get(`${process.env.api_host}/users`);
    rows.value = response.data.map((user) => ({
      id: user._id,
      lastName: user.lastName,
      firstName: user.firstName,
      username: user.username,
      email: user.email,
      role: user.role,
      status: user.isArchived ? "archived" : "active", // Example: Determine status from backend data
      button: user.isArchived ? "unarchive" : "archive",
    }));
  } catch (err) {
    console.error(err);
  }
}

async function resetPassword(userId) {
  console.log("reset pass");
  try {
    const token = localStorage.getItem("authToken");
    const getUser = await axios.get(
      `${process.env.api_host}/users?query=${userId}`
    );
    const newPassword =
      getUser.data[0].lastName + "" + getUser.data[0].username;
    console.log("new", newPassword);
    const response = await axios.post(
      `${process.env.api_host}/users/update/${userId}`,
      {
        password: newPassword,
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
      message: "password reset successfully",
    });
  } catch (err) {
    console.error(err);
    Notify.create({
      type: "negative",
      message: "Something went wrong",
    });
  }
}
async function editUser() {
  console.log("Edit User");
}

async function archiveUser(userId) {
  console.log("Archived user");
  try {
    const token = localStorage.getItem("authToken");
    const getUsers = await axios.get(
      `${process.env.api_host}/users?query=${userId}`
    );
    const isArchived = !getUsers.data[0].isArchived;

    console.log("new", isArchived);
    const response = await axios.post(
      `${process.env.api_host}/users/update/${userId}`,
      {
        isArchived: isArchived,
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
      message: "archived user successfully",
    });
    getUser();
  } catch (err) {
    console.error(err);
    Notify.create({
      type: "negative",
      message: "Something went wrong",
    });
  }
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

onMounted(() => {
  getUser();
});
</script>
