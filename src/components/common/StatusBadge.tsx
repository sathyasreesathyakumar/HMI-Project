type StatusBadgeProps = {
  status: string;
};

function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-green-600 px-4 py-2">
      <div className="h-2 w-2 rounded-full bg-white animate-pulse"></div>

      <span className="text-sm font-semibold uppercase text-white">
        {status}
      </span>
    </div>
  );
}

export default StatusBadge;