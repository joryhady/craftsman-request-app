import { useEffect, useState } from "react";
import RequestCard from "../components/RequestCard";

function Requests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/requests"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error("Failed to load requests");
        }

        setRequests(data);
      } catch (error) {
        console.error(error);
        setError("Something went wrong while loading requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="page">
      <div className="container">
        <h1>Submitted Requests</h1>

        <p className="subtitle">
          View all your submitted service requests.
        </p>

        {loading && <p>Loading requests...</p>}

        {error && <p className="error">{error}</p>}

        {!loading && !error && requests.length === 0 && (
          <div className="empty-state">
            <h2>No requests yet</h2>
            <p>
              Create your first service request to see it here.
            </p>
          </div>
        )}

        {!loading && !error && requests.length > 0 && (
          <div className="requests-list">
            {requests.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Requests;