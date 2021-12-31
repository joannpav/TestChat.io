import { Version2Client } from 'jira.js';

// const client = new Version2Client({
//   host: 'https://testchat.atlassian.net',
//   authentication: {
//     basic: {
//       email: 'support@testchat.io',
//       apiToken: 'CInMNSDGWnGRbmXIZBou5D64',
//     },
//   },
// });

var myHeaders = new Headers();
myHeaders.append("Authorization", "Basic c3VwcG9ydEB0ZXN0Y2hhdC5pbzpDSW5NTlNER1duR1JibVhJWkJvdTVENjQ=");
myHeaders.append("Cookie", "atlassian.xsrf.token=db5b72a4-0d10-4139-b7a9-973a61dc0b42_8f57c275fb8c46ee12c531f4b29fa1aeac6cdf6c_lin");

var raw = "";

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://testchat.atlassian.net/rest/api/3/search?jql=project%20%3D%20TES%26type%20%3DEpic", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));