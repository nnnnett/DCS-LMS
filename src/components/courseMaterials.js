import axios from "axios";

export async function getCoursesMaterials() {
  const token = localStorage.getItem("authToken");
  try {
    const response = await axios.get(
      `${process.env.api_host}/courses/getMaterial`,
      {
        headers: {
          authorization: token,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
}
