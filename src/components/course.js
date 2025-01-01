import axios from "axios";

export async function getCourses() {
  try {
    const response = await axios.get(`${process.env.api_host}/courses`);

    return response.data;
  } catch (err) {
    console.error(err);
  }
}
