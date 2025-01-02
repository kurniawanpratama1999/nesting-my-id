import api_collection from "../api/api_collection";

const refreshToken = async () => {
  try {
    const NET = api_collection.auth.refresh;

    const fetching = await fetch(NET, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const response = await fetching.json();

    return response;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export default refreshToken;
