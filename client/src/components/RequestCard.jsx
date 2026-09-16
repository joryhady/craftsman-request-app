function RequestCard({ request }) {
  const formattedDate = new Date(request.createdAt).toLocaleString();

  return (
    <div className="request-card">
      <div className="request-header">
        <h3>{request.description}</h3>

        <span className={`priority ${request.priority}`}>
          {request.priority}
        </span>
      </div>

      <div className="request-details">
        <div>
          <span className="detail-label">Category</span>
          <span className="detail-value">{request.category}</span>
        </div>

        <div>
          <span className="detail-label">Submitted</span>
          <span className="detail-value">{formattedDate}</span>
        </div>
      </div>
    </div>
  );
}

export default RequestCard;