const repo = args[0];
const prNum = args[1];
const token = secrets.token; 

if (!token) {
  throw Error("Missing secret: github token");
}

const getPrDetailsUrl = `${repo
  .replace("https://github.com/", "https://api.github.com/repos/")}/pulls/${prNum}`

const headers = {
  Authorization: `token ${token}`,
  Accept: "application/vnd.github.mockingbird-preview",
};

// Get the timeline to find the closing PR
let apiResponse = await Functions.makeHttpRequest({ url: getPrDetailsUrl, headers });


if (apiResponse.error) {
  console.error(apiResponse.error);
  throw Error("Request failed");
}

const { data } = apiResponse;

console.log("API response data:", JSON.stringify(data, null, 2));

const { merged, user, created_at } = data;

if (!merged) {
  throw new Error(`Pull request #${prNumber} is not merged or could be closed`);
}

return Functions.encodeString(JSON.stringify({
  created_at,
  user: user.login,
}));
