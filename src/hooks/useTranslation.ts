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
            store: "Tienda",
            contact: "Contacto",
        },
        home: {
            heroTitle: "La Musgaña",
            heroSubtitle: "Folk Ibérico Contemporáneo",
            heroTitleSEO: "La Musgaña: 40 Años de Historia del Folk Ibérico Contemporáneo",
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
        store: {
            title: "Camiseta 40 Aniversario",
            tshirtTitle: "Camiseta La Musgaña 40 Aniversario",
            supportText: "Hazte con una verdadera pieza de colección. Esta camiseta conmemorativa ha sido lanzada en exclusiva para nuestra comunidad online y no se venderá en ningún otro lugar. Cada compra tiene un propósito muy claro: todos los ingresos sirven únicamente para costear el mantenimiento y desarrollo de LaMusgaña.net. Gracias a tu apoyo, podemos seguir manteniendo al dia la web y todas las novedades relacionadas con La Musgaña.",
            tshirtDesc: "Camiseta de algodón 100% orgánico de alta calidad de color verde botella con la ilustración conmemorativa del 40 aniversario de La Musgaña.",
            tshirtDescMale: "Nuestra camiseta premium en color verde botella está diseñada para ofrecer la máxima comodidad y resistencia en cada uso. El modelo de corte recto cuenta con costuras laterales y está confeccionado en 100% algodón peinado pre-encogido (165 g/m²), garantizando una excelente durabilidad.",
            tshirtDescFemale: "Nuestra camiseta personalizable premium de mujer, presenta un favorecedor diseño entallado y está fabricada en suave algodón ring-spun pre-encogido, con un gramaje superior de 190 g/m² para un acabado impecable, garantizando una excelente durabilidad. Color verde botella.",
            sizeGuide: "Guía de tallas",
            sizes: "Tallas disponibles",
            buy: "Comprar ahora",
            price: "29,00 €",
            shippingInfoBold: "* Gastos de envío incluidos.",
            shippingInfo: " Sólo envíos a la península excepto Ceuta, Melilla y Canarias. Para envíos a otros destinos ",
            shippingContact: "contactar",
            gender: "Género",
            male: "Hombre",
            female: "Mujer",
            quantity: "Cantidad",
            trust: {
                delivery: "Entrega estimada: 7-9 días laborables",
                ondemand: "Estas camisetas se realizan bajo demanda, sin stock previo",
                payments: "Pagos seguros (Stripe)",
                legal: "Aviso Legal de Compra"
            },
            legalModal: {
                title: "Información General",
                content: "Este documento establece las condiciones legales y de contratación para la adquisición de las camisetas del 40 aniversario. Al tramitar un pedido a través de nuestra página web, el usuario confirma que ha leído, entendido y aceptado de manera expresa los presentes términos. Toda transacción comercial realizada en este sitio se rige por la normativa española vigente en materia de defensa de los consumidores.",
                subtitle2: "Método de Pago Seguro",
                content2: "El abono de los pedidos se procesa de forma externa y 100% segura a través de la pasarela de pagos Stripe. Mediante este sistema, los datos de tu tarjeta de crédito o débito viajan de forma cifrada y en ningún momento son almacenados ni visualizados por los servidores de La Musgaña. Este método garantiza la máxima protección y privacidad en tu transacción de acuerdo con los estándares internacionales de seguridad financiera.",
                subtitle3: "Envíos y Plazos de Entrega",
                content3: "Para evitar la sobreproducción y garantizar la calidad del resultado, gestionamos la preparación de los envíos de manera secuencial una vez confirmado el pedido. El plazo estimado para que recibas tu camiseta en el domicilio es de 7 a 9 días laborables desde el momento del pago. Es responsabilidad del comprador asegurarse de proporcionar una dirección de envío correcta y completa para evitar incidencias con la empresa de transporte.",
                subtitle4: "Política de Devoluciones y Cambios",
                content4: "Dado que nuestras camisetas se imprimen y producen de forma individualizada bajo demanda, conforme a las especificaciones exactas de talla y modelo elegidas por cada usuario, no se admiten cambios ni devoluciones. Esta condición se ampara de forma legal en la excepción al derecho de desistimiento para bienes confeccionados a medida o claramente personalizados, tal y como establece la legislación europea y española. Únicamente se aceptará el reemplazo del producto en un plazo de 14 días si este presenta un defecto de fábrica, tara o error de impresión demostrable"
            },
            shippingForm: {
                title: "Detalles de Envío",
                firstName: "Nombre",
                lastName: "Apellidos",
                email: "Correo Electrónico",
                phone: "Teléfono",
                address: "Dirección Completa",
                city: "Localidad / Ciudad",
                zip: "Código Postal",
                province: "Provincia",
                country: "País",
                required: "Este campo es obligatorio",
                invalidEmail: "Asegúrate de introducir un email válido",
                fillAll: "Por favor, completa todos los campos obligatorios del envío antes de continuar.",
                countryWarning: "Para pedidos a Ceuta, Melilla, Islas y otro país, por favor contacta con ranndoneur26@gmail.com"
            }
        },
        footer: {
            rights: "Todos los derechos reservados",
            design: "Diseño",
        }

    },
    en: {
        nav: {
            home: "Home",
            history: "History",
            discography: "Discography",
            videos: "Videos",
            concerts: "Upcoming Concerts",
            store: "Store",
            contact: "Contact",
        },
        home: {
            heroTitle: "La Musgaña",
            heroSubtitle: "Contemporary Iberian Folk",
            heroTitleSEO: "La Musgaña: 40 Years of History of Contemporary Iberian Folk",
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
        store: {
            title: "40th Anniversary T-Shirt",
            tshirtTitle: "La Musgaña 40th Anniversary T-Shirt",
            supportText: "Own a true collector's item. This commemorative t-shirt has been launched exclusively for our online community and will not be sold anywhere else. Every purchase has a clear purpose: all proceeds are used solely to cover the maintenance and development of LaMusgaña.net. Thanks to your support, we can keep the website up to date with all the latest news related to La Musgaña.",
            tshirtDesc: "High quality 100% organic cotton t-shirt in bottle green color with the commemorative 40th anniversary illustration of La Musgaña.",
            tshirtDescMale: "Our premium bottle green t-shirt is designed to offer maximum comfort and strength with every use. The straight-cut model features side seams and is made of 100% combed pre-shrunk cotton (165 g/m²), guaranteeing excellent durability.",
            tshirtDescFemale: "Our premium customizable women's t-shirt features a flattering fitted design and is made from soft pre-shrunk ring-spun cotton, with a superior weight of 190 g/m² for a flawless finish, guaranteeing excellent durability. Bottle green color.",
            sizeGuide: "Size guide",
            sizes: "Available sizes",
            buy: "Buy Now",
            price: "€29.00",
            shippingInfoBold: "* Shipping included.",
            shippingInfo: " Shipments only to mainland Spain except Ceuta, Melilla, and Canary Islands. For shipments to other destinations, please ",
            shippingContact: "contact us",
            gender: "Gender",
            male: "Male",
            female: "Female",
            quantity: "Quantity",
            trust: {
                delivery: "Estimated delivery: 7-9 business days",
                ondemand: "These t-shirts are made on demand, with no prior stock",
                payments: "Secure payments (Stripe)",
                legal: "Legal Notice of Purchase"
            },
            legalModal: {
                title: "General Information",
                content: "This document establishes the legal and contractual conditions for the purchase of the 40th anniversary t-shirts. By processing an order through our website, the user confirms that they have read, understood, and expressly accepted these terms. All commercial transactions carried out on this site are governed by current Spanish regulations regarding consumer protection.",
                subtitle2: "Secure Payment Method",
                content2: "The payment of orders is processed externally and 100% securely through the Stripe payment gateway. Through this system, your credit or debit card details travel encrypted and are at no time stored or viewed by La Musgaña's servers. This method guarantees maximum protection and privacy in your transaction in accordance with international financial security standards.",
                subtitle3: "Shipping and Delivery Times",
                content3: "To avoid overproduction and ensure the quality of the result, we manage the preparation of shipments sequentially once the order is confirmed. The estimated time for you to receive your t-shirt at home is 7 to 9 business days from the moment of payment. It is the buyer's responsibility to ensure that a correct and complete shipping address is provided to avoid incidents with the transport company.",
                subtitle4: "Returns and Exchanges Policy",
                content4: "Since our t-shirts are printed and produced individually on demand, according to the exact size and model specifications chosen by each user, exchanges or returns are not allowed. This condition is legally supported by the exception to the right of withdrawal for custom-made or clearly personalized goods, as established by European and Spanish legislation. Product replacement will only be accepted within 14 days if it presents a demonstrable factory defect, flaw, or printing error."
            },
            shippingForm: {
                title: "Shipping Details",
                firstName: "First Name",
                lastName: "Last Name",
                email: "Email Address",
                phone: "Phone Number",
                address: "Full Address",
                city: "City",
                zip: "ZIP / Postal Code",
                province: "State / Province",
                country: "Country",
                required: "This field is required",
                invalidEmail: "Please enter a valid email address",
                fillAll: "Please complete all mandatory shipping fields before continuing.",
                countryWarning: "For orders to Ceuta, Melilla, Islands and other countries, please contact ranndoneur26@gmail.com"
            }
        },
        footer: {
            rights: "All rights reserved",
            design: "Design",
        }

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
