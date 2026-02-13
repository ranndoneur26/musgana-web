// Re-export generateMetadata for per-page SEO
export { generateMetadata } from "./metadata";

export default function ConcertsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
