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
            playlistTitle: "Lista de Reproducción",
            items: {
                v1: "Briana",
                v2: "Fiestas de San Isidro 2022",
                v3: "Festival on the Green 1997",
            }
        },
        sections: {
            discography: "Discografía",
            liveHistory: "Conciertos del Recuerdo",
        },
        liveHistory: {
            title: "El Viaje Dorado | Conciertos en directo",
            columns: {
                date: "Fecha",
                location: "Población / País",
                venue: "Lugar",
                notes: "Festival / Ciclo / Notas",
            },
            footerNote: "Estos son sólo algunos de los conciertos rescatados del baúl",
            accordionTitle: "Listado Histórico de Conciertos",
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
        cookies: {
            title: "Cookies",
            description: "Utilizamos cookies propias y de terceros para mejorar tu experiencia de navegación y analizar nuestro tráfico.",
            accept: "Aceptar",
            decline: "Configurar",
            settingsTitle: "Preferencias de Cookies",
        },
        podcast: {
            title: "Inicios de La Musgaña",
            subtitle: "Contado por Rafa Martín, en el podcast \"Van Por el Aire\" de Diariofolk",
            helperText: "* Fragmento del podcast: 58:56 - 1:14:40. Acepte cookies si aparece el banner.",
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
            playlistTitle: "Playlist",
            items: {
                v1: "Briana",
                v2: "San Isidro Festival 2022",
                v3: "Festival on the Green 1997",
            }
        },
        sections: {
            discography: "Discography",
            liveHistory: "Concerts of the Past",
        },
        liveHistory: {
            title: "The Golden Journey | Live Concerts",
            columns: {
                date: "Date",
                location: "Town / Country",
                venue: "Venue",
                notes: "Festival / Cycle / Notes",
            },
            footerNote: "These are just some of the concerts rescued from the archives",
            accordionTitle: "Historical Concert List",
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
        cookies: {
            title: "Cookies",
            description: "We use our own and third-party cookies to improve your experience and analyze our traffic.",
            accept: "Accept",
            decline: "Settings",
            settingsTitle: "Cookie Preferences",
        },
        podcast: {
            title: "The Beginnings of La Musgaña",
            subtitle: "Told by Rafa Martín, in the podcast \"Van Por el Aire\" by Diariofolk (Only in Spanish)",
            helperText: "* Podcast excerpt: 58:56 - 1:14:40. Accept cookies if banner appears.",
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
