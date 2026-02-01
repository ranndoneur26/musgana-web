import { useParams } from "next/navigation";

// Simple translation dictionary
const dictionary = {
    es: {
        nav: {
            home: "Inicio",
            history: "Historia",
            discography: "Discografía",
            videos: "Vídeos",
            concerts: "Próximos Conciertos",
            contact: "Contacto",
        },
        home: {
            heroTitle: "La Musgaña",
            heroSubtitle: "Folk Ibérico Contemporáneo",
            historyTitle: "Nuestra Historia",
        },
        discography: {
            year: "Año",
            collab: "Colaboradores",
            buy: "Comprar",
            listenSpotify: "Escuchar en Spotify",
            listenOnline: "Escuchar Online",
            buyAlbum: "Comprar Álbum",
            viewDiscogs: "Ver en Discogs",
            songs: "Canciones",
            members: "Integrantes",
            close: "Cerrar",
        },
        videos: {
            watch: "Ver Vídeo",
            searchVideos: "Buscar más videos",
            openYouTube: "Abrir en YouTube",
        },
        sections: {
            discography: "Discografía",
        },
        concerts: {
            calendar: "Calendario de Conciertos",
            loading: "Cargando Calendario...",
        },
        contact: {
            title: "Contacto",
            name: "Nombre",
            email: "Email",
            message: "Mensaje",
            send: "Enviar",
            phone: "Teléfono",
            city: "Población",
            company: "Empresa / Entidad",
            validation: "Validación (Anti-spam)",
            namePlaceholder: "Nombre completo",
            cityPlaceholder: "Ciudad",
            companyPlaceholder: "Nombre de la empresa",
            captchaPlaceholder: "¿Cuánto es 3 + 4?",
        },
    },
    en: {
        nav: {
            home: "Home",
            history: "History",
            discography: "Discography",
            videos: "Videos",
            concerts: "Upcoming Concerts",
            contact: "Contact",
        },
        home: {
            heroTitle: "La Musgaña",
            heroSubtitle: "Contemporary Iberian Folk",
            historyTitle: "Our History",
        },
        discography: {
            year: "Year",
            collab: "Collaborators",
            buy: "Buy Album",
            listenSpotify: "Listen on Spotify",
            listenOnline: "Listen Online",
            buyAlbum: "Buy Album",
            viewDiscogs: "View on Discogs",
            songs: "Songs",
            members: "Members",
            close: "Close",
        },
        videos: {
            watch: "Watch Video",
            searchVideos: "Search for more videos",
            openYouTube: "Open in YouTube",
        },
        sections: {
            discography: "Discography",
        },
        concerts: {
            calendar: "Concerts Calendar",
            loading: "Loading Calendar...",
        },
        contact: {
            title: "Contact",
            name: "Name",
            email: "Email",
            message: "Message",
            send: "Send",
            phone: "Phone",
            city: "City",
            company: "Company / Organization",
            validation: "Validation (Anti-spam)",
            namePlaceholder: "Full name",
            cityPlaceholder: "City",
            companyPlaceholder: "Company name",
            captchaPlaceholder: "What is 3 + 4?",
        },
    },
};

// Helper to get language from params
const getLangFromParams = (params: any): "es" | "en" => {
    let langCode = params?.lang;
    if (Array.isArray(langCode)) langCode = langCode[0];
    return langCode === "en" ? "en" : "es";
};

export const useTranslation = () => {
    const params = useParams();

    // Use the same logic for both server and client to avoid hydration mismatch
    const lang = getLangFromParams(params);

    return {
        t: dictionary[lang],
        lang,
    };
};
