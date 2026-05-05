import { APP_CONFIG } from "../config/appConfig.js";

export async function loginWithCredentials(login, password) {
  const response = await fetch(APP_CONFIG.api.authUrl, {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`${login}:${password}`)}`,
      "Content-Type": "application/json",
    },
  });

  return {
    ok: response.ok,
    data: await response.json(),
  };
}

export async function requestGraphql(query) {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(APP_CONFIG.api.graphqlUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    return await response.json();
  } catch {
    return null;
  }
}
