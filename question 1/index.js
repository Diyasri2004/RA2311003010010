const Log = require("../logging_middleware/logger.js");

const API = "http://20.207.122.201/evaluation-service/notifications";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJkczg4NzNAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwMDg2OCwiaWF0IjoxNzc3Njk5OTY4LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYWM3MzYwNDctZTc0OC00ZGY4LWIxMjYtNDc3ZWJiYjNkM2Y1IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiZGl5YSBzcml2YXN0YXZhIiwic3ViIjoiZjQ2OWExZTAtNDg1Yy00ZWQzLWEwNWQtNTNlMzFhN2U2MWU3In0sImVtYWlsIjoiZHM4ODczQHNybWlzdC5lZHUuaW4iLCJuYW1lIjoiZGl5YSBzcml2YXN0YXZhIiwicm9sbE5vIjoicmEyMzExMDAzMDEwMDEwIiwiYWNjZXNzQ29kZSI6IlFrYnB4SCIsImNsaWVudElEIjoiZjQ2OWExZTAtNDg1Yy00ZWQzLWEwNWQtNTNlMzFhN2U2MWU3IiwiY2xpZW50U2VjcmV0IjoibUN1UW15bWRUUFRLeWhDeSJ9.b2t3_M3BgOd18DpDNu6kweBJaz0S385s03aZHVtwlWg";


const priorityMap = {
  Result: 3,
  Placement: 2,
  Event: 1
};

async function getTopNotifications() {
  try {
    Log("frontend", "info", "api", "fetching notifications");

    const res = await fetch(API, {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });

    const data = await res.json();

    const sorted = data.notifications.sort((a, b) => {
      if (priorityMap[b.Type] !== priorityMap[a.Type]) {
        return priorityMap[b.Type] - priorityMap[a.Type];
      }
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    });

    const top10 = sorted.slice(0, 10);

    Log("frontend", "info", "state", "top10 ready");

    console.log(top10);

  } catch (e) {
    Log("frontend", "error", "api", "failed");
  }
}

getTopNotifications();