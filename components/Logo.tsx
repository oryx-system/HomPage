export default function Logo({ className = "", variant = "datasafe" }: { className?: string; variant?: "datasafe" | "company" }) {
  const company = variant === "company";
  return (
    <img
      className={`logo ${className}`}
      src={company ? "/oryx-system-logo.png" : "/logo.png"}
      width={company ? 1216 : 1024}
      height={company ? 357 : 284}
      alt={company ? "Oryx System · Engineering & Control" : "Oryx DataSafe"}
    />
  );
}
