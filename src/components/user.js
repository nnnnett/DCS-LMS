import axios from "axios";

export async function viewViewerUser() {
  const token = localStorage.getItem("authToken");
  try {
    const response = await axios.get(
      `${process.env.api_host}/users/myProfile`,
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
