// Re-export generateMetadata for per-page SEO
export { generateMetadata } from "./metadata";

export default function DiscographyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
