export default function Logo({ className = "", variant = "datasafe" }: { className?: string; variant?: "datasafe" | "company" }) {
  const company = variant === "company";
  return (
    <img
      className={`logo ${className}`}
      src={company ? "/oryx-system-logo.png" : "/oryx-datasafe-transparent.png"}
      width={company ? 1216 : 1188}
      height={company ? 357 : 329}
      alt={company ? "Oryx System · Engineering & Control" : "Oryx DataSafe"}
    />
  );
}
