import refreshToken from "./refresh-token";

export const fetcher = async (method = "GET", token = null, body = null, net) => {
  const options = {};
  options.method = method;
  options.headers = { "Content-Type": "application/json" };
  options.credentials = "include";

  if (token) options.headers.Authorization = token;

  if (body) options.body = JSON.stringify(body);

  try {
    const fetching = await fetch(net, options);
    const res = await fetching.json();
    return res;
  } catch (error) {
    return { success: false, message: "Server Error!" };
  }
};

const hit_api = async (
  net = "http://localhost:5000/api/v1/user/profile",
  method = "GET",
  body = null
) => {
  try {
    const token = await refreshToken();
    if (token.success) {
      const hit_api = await fetcher(method, token.results, body, net);
      return hit_api;
    } else {
      return token;
    }
  } catch (error) {
    return { success: false, message: "Server Error!" };
  }
};

export default hit_api;
