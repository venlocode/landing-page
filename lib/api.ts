import fetch from "isomorphic-unfetch";

export const join = ({ email }) => {
  return fetch("/api/join", {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => res.json()).catch(error => ({ error: "An error occured while processing your request.", errorData: error }));
};
