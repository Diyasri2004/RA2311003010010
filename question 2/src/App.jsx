import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Select,
  MenuItem,
  TextField,
  Card,
  CardContent,
  Button
} from "@mui/material";

const API = "http://20.207.122.201/evaluation-service/notifications";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJkczg4NzNAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwMzQ1MywiaWF0IjoxNzc3NzAyNTUzLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNDk0N2IyNjQtOTFiMi00ODJkLTgyMTktMmEwZjJjZTg1Y2UyIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiZGl5YSBzcml2YXN0YXZhIiwic3ViIjoiZjQ2OWExZTAtNDg1Yy00ZWQzLWEwNWQtNTNlMzFhN2U2MWU3In0sImVtYWlsIjoiZHM4ODczQHNybWlzdC5lZHUuaW4iLCJuYW1lIjoiZGl5YSBzcml2YXN0YXZhIiwicm9sbE5vIjoicmEyMzExMDAzMDEwMDEwIiwiYWNjZXNzQ29kZSI6IlFrYnB4SCIsImNsaWVudElEIjoiZjQ2OWExZTAtNDg1Yy00ZWQzLWEwNWQtNTNlMzFhN2U2MWU3IiwiY2xpZW50U2VjcmV0IjoibUN1UW15bWRUUFRLeWhDeSJ9.ijWrQSbaXgCdSjc3QVCHGVdNT-XvNThvNvIKVMH_4yw";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [type, setType] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    try {
      let url = `${API}?limit=${limit}&page=${page}`;
      if (type) url += `&notification_type=${type}`;

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      });

      const data = await res.json();

      if (data.notifications && data.notifications.length > 0) {
        setNotifications(data.notifications);
      }
    } catch {
      setNotifications([
        {
          ID: "demo",
          Type: "Event",
          Message: "Demo Notification",
          Timestamp: new Date().toISOString()
        }
      ]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [type, limit, page]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ color: "white" }}>
        Notifications
      </Typography>

      <Select
        value={type}
        onChange={(e) => {
          setPage(1);
          setType(e.target.value);
        }}
        sx={{
          mr: 2,
          color: "white",
          border: "1px solid white",
          "& .MuiSvgIcon-root": { color: "white" }
        }}
        MenuProps={{
          PaperProps: {
            sx: { backgroundColor: "#1e1e1e", color: "white" }
          }
        }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Event">Event</MenuItem>
        <MenuItem value="Result">Result</MenuItem>
        <MenuItem value="Placement">Placement</MenuItem>
      </Select>

      <TextField
        label="Limit"
        type="number"
        value={limit}
        onChange={(e) => {
          setPage(1);
          setLimit(Number(e.target.value));
        }}
        sx={{
          mr: 2,
          input: { color: "white" },
          label: { color: "white" }
        }}
      />

      <TextField
        label="Page"
        type="number"
        value={page}
        onChange={(e) => setPage(Number(e.target.value))}
        sx={{
          mr: 2,
          input: { color: "white" },
          label: { color: "white" }
        }}
      />

      <Button variant="contained" onClick={fetchData}>
        Refresh
      </Button>

      <div style={{ marginTop: 20 }}>
        <Button
          variant="outlined"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          sx={{ mr: 2, color: "white", borderColor: "white" }}
        >
          Previous
        </Button>

        <Button
          variant="outlined"
          onClick={() => setPage(page + 1)}
          sx={{ color: "white", borderColor: "white" }}
        >
          Next
        </Button>
      </div>

      {notifications.length === 0 && (
        <Typography sx={{ mt: 3, color: "white" }}>
          No data on this page
        </Typography>
      )}

      {notifications.map((n) => (
        <Card key={n.ID} sx={{ mt: 2, backgroundColor: "#1e1e1e" }}>
          <CardContent>
            <Typography variant="h6" sx={{ color: "white" }}>
              {n.Type}
            </Typography>
            <Typography sx={{ color: "white" }}>
              {n.Message}
            </Typography>
            <Typography variant="caption" sx={{ color: "gray" }}>
              {n.Timestamp}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default App;