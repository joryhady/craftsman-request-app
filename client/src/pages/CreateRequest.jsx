import { useState } from "react";

function CreateRequest() {
  const [description, setDescription] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const analyzeProblem = async () => {
    if (!description.trim()) {
      setError("Please describe your problem.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");
    setSuggestions([]);

    try {
      const response = await fetch(
        "http://localhost:5000/api/requests/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze problem");
      }

      setSuggestions(data.requests || []);
    } catch (error) {
      console.error(error);
      setError("Something went wrong while analyzing the problem.");
    } finally {
      setLoading(false);
    }
  };

  const updateSuggestion = (index, field, value) => {
    const updated = [...suggestions];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setSuggestions(updated);
  };

  const confirmRequests = async () => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      for (const request of suggestions) {
        const response = await fetch(
          "http://localhost:5000/api/requests",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              description: request.description,
              category: request.category,
              priority: request.priority,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to save request");
        }
      }

      setSuccess("Requests submitted successfully!");
      setSuggestions([]);
      setDescription("");
    } catch (error) {
      console.error(error);
      setError("Something went wrong while saving the requests.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <h1>What do you need help with?</h1>

        <p className="subtitle">
          Describe your problem and we'll identify the right craftsman.
        </p>

        <div className="form-card">
          <label htmlFor="description">
            Describe your problem
          </label>

          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Example: My kitchen sink is leaking..."
            rows="5"
          />

          <button
            type="button"
            onClick={analyzeProblem}
            disabled={loading || saving}
          >
            {loading ? "Analyzing..." : "Analyze Problem"}
          </button>

          {error && <p className="error">{error}</p>}

          {success && <p className="success">{success}</p>}
        </div>

        {suggestions.length > 0 && (
          <div className="results">
            <h2>AI Suggestions</h2>

            {suggestions.map((request, index) => (
              <div className="suggestion-card" key={index}>
                <h3>Problem {index + 1}</h3>

                <p>{request.description}</p>

                <div className="field-group">
                  <label>Category</label>

                  <select
                    value={request.category}
                    onChange={(event) =>
                      updateSuggestion(
                        index,
                        "category",
                        event.target.value
                      )
                    }
                  >
                    <option value="plumbing">Plumbing</option>
                    <option value="electrical">Electrical</option>
                    <option value="carpentry">Carpentry</option>
                    <option value="AC">AC</option>
                    <option value="insulation">Insulation</option>
                    <option value="flooring">Flooring</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="field-group">
                  <label>Priority</label>

                  <select
                    value={request.priority}
                    onChange={(event) =>
                      updateSuggestion(
                        index,
                        "priority",
                        event.target.value
                      )
                    }
                  >
                    <option value="normal">Normal</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>
            ))}

            <button
              type="button"
              className="confirm-button"
              onClick={confirmRequests}
              disabled={saving}
            >
              {saving ? "Saving..." : "Confirm Requests"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateRequest;