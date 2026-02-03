export function JsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "MusicGroup",
        "name": "La Musgaña",
        "url": "https://musgana-web.vercel.app", // Replace with final production domain
        "logo": "https://musgana-web.vercel.app/images/logo.png", // Ensure logo exists or update path
        "sameAs": [
            "https://www.youtube.com/results?search_query=la+musgaña",
            "https://open.spotify.com/artist/..." // Add if known
        ],
        "foundingDate": "1987",
        "genre": ["Folk", "Folk Ibérico", "Música Tradicional"],
        "description": "Grupo de folk ibérico contemporáneo con 40 años de trayectoria dedicado a la música tradicional de Castilla y León.",
        "location": {
            "@type": "Place",
            "name": "Castilla y León, España"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
