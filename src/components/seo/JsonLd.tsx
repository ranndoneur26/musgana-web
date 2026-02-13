export function JsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "MusicGroup",
                "@id": "https://musgana-web-9onp.vercel.app/#musicgroup",
                "name": "La Musgaña",
                "alternateName": ["La Musgaña band", "La Musgaña ensemble"],
                "url": "https://musgana-web-9onp.vercel.app",
                "logo": "https://musgana-web-9onp.vercel.app/images/logo.png",
                "image": "https://musgana-web-9onp.vercel.app/images/logo.png",
                "sameAs": [
                    "https://www.youtube.com/results?search_query=la+musgaña",
                    "https://open.spotify.com/artist/4ByMhIEOOBbpotJwMnpMjL"
                ],
                "foundingDate": "1986",
                "genre": [
                    "Folk",
                    "Folk Ibérico",
                    "Folk Castellano",
                    "Folk Castellano y Leonés",
                    "Música Tradicional",
                    "Música Tradicional de Castilla y León",
                    "World Music",
                    "Spanish Folk",
                    "Iberian Folk",
                    "Castilian Traditional Music"
                ],
                "description": "La Musgaña es un grupo de música folk española y folk ibérico contemporáneo con más de 35 años de trayectoria dedicado a la música tradicional de Castilla y León. Interpretan con gaita sanabresa, zanfona, flauta de tres agujeros y tamboril, bouzouki y acordeón.",
                "knowsAbout": [
                    "Gaita Sanabresa",
                    "Zanfona",
                    "Hurdy-gurdy",
                    "Flauta de Tres Agujeros y Tamboril",
                    "Three-holed Flute and Tabor",
                    "Spanish Bagpipes",
                    "Bouzouki",
                    "Accordion"
                ],
                "location": {
                    "@type": "Place",
                    "name": "Castilla y León, España",
                    "address": {
                        "@type": "PostalAddress",
                        "addressRegion": "Castilla y León",
                        "addressCountry": "ES"
                    }
                },
                "areaServed": [
                    "Castilla y León",
                    "España",
                    "Península Ibérica",
                    "Europe"
                ],
                "album": [
                    {
                        "@type": "MusicAlbum",
                        "name": "La Musgaña",
                        "datePublished": "1990",
                        "genre": ["Folk Ibérico", "Música Tradicional"]
                    },
                    {
                        "@type": "MusicAlbum",
                        "name": "Temas Profanos",
                        "datePublished": "1993",
                        "genre": ["Folk Castellano", "Música Tradicional de Castilla y León"]
                    },
                    {
                        "@type": "MusicAlbum",
                        "name": "El Paso del Tiempo",
                        "datePublished": "1996",
                        "genre": ["Folk Ibérico", "World Music"]
                    },
                    {
                        "@type": "MusicAlbum",
                        "name": "Lubicán",
                        "datePublished": "1999",
                        "genre": ["Folk Ibérico", "World Music"]
                    },
                    {
                        "@type": "MusicAlbum",
                        "name": "En Concierto",
                        "datePublished": "2001",
                        "genre": ["Folk Ibérico", "Live"]
                    },
                    {
                        "@type": "MusicAlbum",
                        "name": "Raitán",
                        "datePublished": "2015",
                        "genre": ["Folk Castellano y Leonés", "World Music"]
                    }
                ],
                "potentialAction": {
                    "@type": "ReserveAction",
                    "name": "Contratar La Musgaña / Book La Musgaña",
                    "target": {
                        "@type": "EntryPoint",
                        "urlTemplate": "https://musgana-web-9onp.vercel.app/es#contact"
                    },
                    "description": "Contratar La Musgaña para festivales y eventos. Book La Musgaña for festivals and events."
                }
            },
            {
                "@type": "WebSite",
                "@id": "https://musgana-web-9onp.vercel.app/#website",
                "name": "La Musgaña - Grupo de Música Folk Española",
                "alternateName": "La Musgaña - Spanish Folk Band",
                "url": "https://musgana-web-9onp.vercel.app",
                "inLanguage": ["es", "en"],
                "description": "Web oficial de La Musgaña, grupo de música folk española y folk castellano y leonés. Discografía, conciertos, vídeos y contratación.",
                "publisher": {
                    "@id": "https://musgana-web-9onp.vercel.app/#musicgroup"
                }
            }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
