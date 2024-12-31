import axios from "axios";

export async function userInfo(params) {
  try {
    const response = await axios.get(`${process.env.api_host}/users`, {
      headers: {
        authorization: token,
      },
    });
  } catch (err) {
    console.error(err);
  }
}
