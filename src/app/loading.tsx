
export default function Loading() {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="font-logo text-5xl text-primary drop-shadow-sm animate-pulse">
            MandiExpress
        </div>
        <p className="text-muted-foreground">Loading your fresh groceries...</p>
      </div>
    </div>
  );
}
