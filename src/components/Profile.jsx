// src/components/Profile.jsx
export default function Profile({ user, location }) {
  if (!user) return null;
  return (
    <div className="bg-white p-3 rounded shadow max-w-xs text-sm">
      <div><strong>Name:</strong> {user.user_metadata?.full_name || user.email}</div>
      <div><strong>UUID:</strong> {user.id}</div>
      <div>
        <strong>Location:</strong>{" "}
        {location
          ? `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`
          : "Unavailable"}
      </div>
    </div>
  );
}
