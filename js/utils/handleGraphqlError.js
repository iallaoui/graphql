import { logoutUser } from "../auth/logout.js";
import { showFailureToast } from "../notifications/failureToast.js";

export function handleGraphqlError(responseData) {
  if (!responseData) {
    showFailureToast("Error while fetching data. Please try again later.");
    return false;
  }

  const errors = Array.isArray(responseData.errors) ? responseData.errors : [];

  if (errors.length === 0) {
    return true;
  }

  const invalidJwtError = errors.find(
    (error) => error.extensions?.code === "invalid-jwt",
  );

  if (invalidJwtError) {
    showFailureToast("Your session expired. Please log in again.");
    logoutUser();
    return false;
  }

  const firstMessage = errors.find((error) => error.message)?.message;
  showFailureToast(firstMessage || "Something went wrong while loading data.");
  return false;
}
