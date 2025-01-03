import axios from "axios";

export async function getActiveCourses() {
  try {
    const response = await axios.get(
      `${process.env.api_host}/courses?isArchived=false`
    );

    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function getArchivedCourses() {
  try {
    const response = await axios.get(
      `${process.env.api_host}/courses?isArchived=true`
    );

    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function getAllCourses() {
  try {
    const response = await axios.get(`${process.env.api_host}/courses`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}
