const LOG_API = "http://20.207.122.201/evaluation-service/logs";

const Log = async (stack, level, pkg, message) => {
  try {
    const res = await fetch(LOG_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer     eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41N..."
      },
      body: JSON.stringify({
        stack: stack,
        level: level,
        package: pkg,
        message: message
      })
    });

    const data = await res.json();
    console.log("Log success:", data);
  } catch (error) {
    console.error("Log failed:", error);
  }
};

export default Log;