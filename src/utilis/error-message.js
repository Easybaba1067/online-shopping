function getAuthErrorMessage(code) {
  switch (code) {
    case "auth/invalid-email":
      return "The email address is not valid.";
    case "auth/user-not-found":
      return "No account found with this email.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again.";
    case "auth/email-already-in-use":
      return "This email is already registered.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/network-request-failed":
      return "Network error. Please check your connection.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait and try again later.";
    case "auth/internal-error":
      return "An internal error occurred. Please try again.";
    case "auth/popup-closed-by-user":
      return "The sign-in popup was closed before completing.";
    case "auth/cancelled-popup-request":
      return "Only one popup request is allowed at a time.";
    case "auth/popup-blocked":
      return "The sign-in popup was blocked by the browser.";
    case "auth/operation-not-allowed":
      return "This sign-in method is not enabled. Please contact support.";
    case "auth/account-exists-with-different-credential":
      return "An account already exists with the same email but different sign-in method.";
    case "auth/invalid-credential":
      return "The provided credential is invalid or expired.";
    case "auth/requires-recent-login":
      return "Please log in again to complete this action.";
    case "auth/credential-already-in-use":
      return "This credential is already linked to another account.";
    case "auth/user-disabled":
      return "This account has been disabled. Contact support.";
    default:
      return "Something went wrong. Please try again.";
  }
}

export default getAuthErrorMessage;
