import axios from "axios";
import { Notify } from "quasar";

export async function addCommentMaterials(materialId, message) {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.post(
      `${process.env.api_host}/courses/comment/${materialId}`,
      {
        message: message,
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
      message: "Comment Succusfully",
    });
  } catch (err) {
    console.error(err);
  }
}
