export function MediaPlaceholder({
  label = "Photos coming soon",
}: {
  label?: string;
}) {
  return (
    <div className="media-placeholder">
      <span aria-hidden="true">○</span>
      <p>{label}</p>
    </div>
  );
}
