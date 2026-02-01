import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AudioPlayer } from "@/components/ui/AudioPlayer";

// Allow dynamic rendering for i18n routes
export const dynamicParams = true;
export const dynamic = "force-dynamic";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 pt-16">
                {children}
            </main>
            <Footer />
            <AudioPlayer />
        </div>
    );
}
