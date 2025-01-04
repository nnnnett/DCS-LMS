import axios from "axios";

export async function getCoursesMaterials(courseId) {
  const token = localStorage.getItem("authToken");
  try {
    const response = await axios.get(
      `${process.env.api_host}/courses/getMaterial?courseId=${courseId}&isArchived=false`,
      {
        headers: {
          authorization: token,
        },
      }
    );
    console.log(response.data);
    return response.data.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  } catch (err) {
    console.error(err);
  }
}
