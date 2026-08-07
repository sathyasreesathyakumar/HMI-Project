type StatusBadgeProps = {
  status: string;
};

function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-green-600 px-2 py-2">
      <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"></div>

      <span className="text-s font-semibold uppercase text-white">
        {status}
      </span>
    </div>
  );
}

export default StatusBadge;