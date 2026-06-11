/**
 * Benstore — Product Data
 * All game products as structured data objects.
 */

const PRODUCTS = [
    {
        id: 1,
        title: "Sekiro: Shadows Die Twice",
        slug: "sekiro",
        image: "assets/images/games/sekiro.jpg",
        price: 475000,
        originalPrice: 599000,
        rating: 4.5,
        genre: "Action/RPG",
        badge: "Deluxe Edition",
        badgeType: "dlc",
        platform: ["PC", "PS5", "Xbox"],
        description: "Carve your own clever path to vengeance in an all-new adventure from developer FromSoftware. Explore late 1500s Sengoku Japan, a brutal period of constant life-and-death conflict, as you come face to face with larger-than-life foes in a dark and twisted world.",
        features: ["Single Player", "Action Combat", "Stealth", "Boss Fights", "Grappling Hook"],
        publisher: "Activision",
        developer: "FromSoftware",
        inStock: true,
        releaseDate: "2019-03-22"
    },
    {
        id: 2,
        title: "Elden Ring",
        slug: "elden-ring",
        image: "assets/images/games/elden-ring.jpg",
        price: 655000,
        originalPrice: 799000,
        rating: 5.0,
        genre: "Souls-like",
        badge: "Free DLC",
        badgeType: "discount",
        platform: ["PC", "PS5", "Xbox"],
        description: "Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between. A vast world where open fields with a variety of situations are seamlessly connected to huge dungeons.",
        features: ["Open World", "Multiplayer", "Boss Fights", "Character Customization", "Horseback Combat"],
        publisher: "Bandai Namco",
        developer: "FromSoftware",
        inStock: true,
        releaseDate: "2022-02-25"
    },
    {
        id: 3,
        title: "Dark Souls III",
        slug: "dark-souls-3",
        image: "assets/images/games/DarkSouls3.jpg",
        price: 425000,
        originalPrice: 549000,
        rating: 4.0,
        genre: "Souls-like",
        badge: "Deluxe Edition",
        badgeType: "dlc",
        platform: ["PC", "PS4", "Xbox"],
        description: "As fires fade and the world falls into ruin, journey into a universe filled with more colossal enemies and environments. Prepare yourself once more and Embrace The Darkness. Dark Souls III is the final chapter in the series.",
        features: ["Single Player", "Multiplayer", "Boss Fights", "Magic System", "PvP"],
        publisher: "Bandai Namco",
        developer: "FromSoftware",
        inStock: true,
        releaseDate: "2016-04-12"
    },
    {
        id: 4,
        title: "Black Myth: Wukong",
        slug: "black-myth-wukong",
        image: "assets/images/games/Black-Myth-Wukong-title-logo.jpg",
        price: 549000,
        originalPrice: 699000,
        rating: 4.5,
        genre: "Action/RPG",
        badge: "Deluxe Edition",
        badgeType: "dlc",
        platform: ["PC", "PS5"],
        description: "Black Myth: Wukong is an action RPG rooted in Chinese mythology. The story is based on Journey to the West, one of the Four Great Classical Novels of Chinese literature. You shall set out as the Destined One to venture into the challenges and marvels ahead.",
        features: ["Single Player", "Action Combat", "Boss Fights", "Transformation", "Mythology"],
        publisher: "Game Science",
        developer: "Game Science",
        inStock: true,
        releaseDate: "2024-08-20"
    },
    {
        id: 5,
        title: "Lies of P",
        slug: "lies-of-p",
        image: "assets/images/games/lies-of-p.jpg",
        price: 395000,
        originalPrice: 499000,
        rating: 4.0,
        genre: "Action/RPG",
        badge: null,
        badgeType: null,
        platform: ["PC", "PS5", "Xbox"],
        description: "Inspired by the classic Pinocchio tale, Lies of P is a souls-like action RPG set in a dark Belle Époque world. You must fight through the streets of a ruined city, crafting weapons and mastering new abilities.",
        features: ["Single Player", "Weapon Crafting", "Boss Fights", "Dark Fantasy", "Dodge Combat"],
        publisher: "Neowiz",
        developer: "Round8 Studio",
        inStock: true,
        releaseDate: "2023-09-19"
    },
    {
        id: 6,
        title: "Bloodborne",
        slug: "bloodborne",
        image: "assets/images/games/Bloodborne-1030x579.jpg",
        price: 409000,
        originalPrice: 499000,
        rating: 5.0,
        genre: "Souls-like",
        badge: null,
        badgeType: null,
        platform: ["PS4", "PS5"],
        description: "Bloodborne is an action RPG in which you hunt for answers in the ancient city of Yharnam, a city known for its medical advances. Now cursed with a strange endemic illness, the city is plagued with beasts and otherworldly creatures.",
        features: ["Single Player", "Multiplayer", "Gothic Horror", "Trick Weapons", "Chalice Dungeons"],
        publisher: "Sony Interactive",
        developer: "FromSoftware",
        inStock: true,
        releaseDate: "2015-03-24"
    },
    {
        id: 7,
        title: "Elden Ring: Nightreign",
        slug: "elden-ring-nightreign",
        image: "assets/images/showcase/Elden-Ring-Nightreign-1024x576.jpg",
        price: 599000,
        originalPrice: 749000,
        rating: 4.8,
        genre: "Souls-like",
        badge: "Pre-Order",
        badgeType: "discount",
        platform: ["PC", "PS5", "Xbox"],
        description: "Step into the shadow of a dying world in Elden Ring: Night Reign — where the light has long surrendered, and only the relentless endure. In this unforgiving realm, every step forward is a gamble, every enemy a test.",
        features: ["Co-op", "Roguelite", "Open World", "Boss Fights", "Night Cycle"],
        publisher: "Bandai Namco",
        developer: "FromSoftware",
        inStock: true,
        releaseDate: "2025-06-15"
    },
    {
        id: 8,
        title: "Crimson Desert",
        slug: "crimson-desert",
        image: "assets/images/showcase/crimson.jpg",
        price: 579000,
        originalPrice: 699000,
        rating: 4.3,
        genre: "Action/RPG",
        badge: "Pre-Order",
        badgeType: "discount",
        platform: ["PC", "PS5", "Xbox"],
        description: "Step into the relentless world of Crimson Desert — a land torn apart by endless war, where power is claimed through blood, and loyalty is as fragile as the blades that bind it.",
        features: ["Open World", "Action Combat", "Story Driven", "Multiplayer", "Exploration"],
        publisher: "Pearl Abyss",
        developer: "Pearl Abyss",
        inStock: true,
        releaseDate: "2025-12-01"
    }
];

/**
 * Showcase items data
 */
const SHOWCASE_ITEMS = [
    {
        id: 7,
        title: "Elden Ring: Night Reign",
        titleHighlight: "Elden Ring:",
        titleRest: "Night Reign",
        image: "assets/images/showcase/Elden-Ring-Nightreign-1024x576.jpg",
        description: [
            "Step into the shadow of a dying world in Elden Ring: Night Reign — where the light has long surrendered, and only the relentless endure. In this unforgiving realm, every step forward is a gamble, every enemy a test, and every victory earned through blood and resolve.",
            "Explore a hauntingly beautiful landscape swallowed by darkness, uncover forgotten secrets, and face creatures born from the abyss."
        ],
        cta: "Pre-Order Edition"
    },
    {
        id: 8,
        title: "Crimson Desert",
        titleHighlight: "Crimson",
        titleRest: "Desert",
        image: "assets/images/showcase/crimson.jpg",
        description: [
            "Step into the relentless world of Crimson Desert — a land torn apart by endless war, where power is claimed through blood, and loyalty is as fragile as the blades that bind it. Amid fallen kingdoms and rising chaos, you are not merely a survivor, but a warrior forged by hardship.",
            "Journey across a vast and unforgiving realm filled with brutal battles, shifting alliances, and stories buried beneath the dust of conflict."
        ],
        cta: "Pre-Order Edition"
    }
];

/**
 * Testimonial data
 */
const TESTIMONIALS = [
    {
        text: "\"Best store for getting hardcore games. The delivery is instant and the support is amazing!\"",
        avatar: "assets/images/testimonials/6-elden-ring-tarnished-lac-lac.jpg",
        name: "Tarnished One",
        title: "Elden Lord"
    },
    {
        text: "\"Say i can't law and!\"",
        avatar: "assets/images/testimonials/q9ogv.jpg",
        name: "Solo Guy",
        title: "Just Play"
    },
    {
        text: "\"I got my Sekiro Deluxe Edition here cheaper than anywhere else. Highly recommended.\"",
        avatar: "assets/images/testimonials/d05b54c356bbdd9475e39167a10f9504.jpg",
        name: "Wolf",
        title: "Shinobi"
    },
    {
        text: "\"Absolutely worth it. The visuals are stunning and the gameplay feels incredibly smooth. I didn't expect to get this level of quality at this price point. Easily one of the best purchases I've made this year.\"",
        avatar: "assets/images/testimonials/_103330503_musk3.jpg",
        name: "Elon Musk",
        title: "CEO of Tesla"
    },
    {
        text: "\"Addictive and beautifully crafted. From the atmosphere to the mechanics, everything feels well thought out. I lost track of time playing this. If you're into high-quality games, this is a must-have.\"",
        avatar: "assets/images/testimonials/stephin-paul-fight-club.jpg",
        name: "Brad Pitt",
        title: "Actor"
    },
    {
        text: "\"I told you elden ring is the best game ever made.\"",
        avatar: "assets/images/testimonials/n.jpg",
        name: "Maliketh",
        title: "Beast Clergyman"
    }
];

/**
 * Gallery items data  
 */
const GALLERY_ITEMS = [
    { video: "assets/videos/IMG_9059.MOV", poster: "assets/images/games/elden-ring.jpg", label: "Combat Moments" },
    { video: "assets/videos/IMG_9060.MOV", poster: "assets/images/games/sekiro.jpg", label: "Epic Boss Fights" },
    { video: "assets/videos/IMG_9057.MP4", poster: "assets/images/games/Bloodborne-1030x579.jpg", label: "Dark Atmosphere" },
    { video: "assets/videos/IMG_9058.MP4", poster: "assets/images/games/DarkSouls3.jpg", label: "Ashen Ones" }
];

/**
 * Helper: Format price to Indonesian Rupiah
 */
function formatPrice(price) {
    return 'Rp ' + price.toLocaleString('id-ID');
}

/**
 * Helper: Generate star rating HTML
 */
function generateStars(rating) {
    let html = '';
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
        html += '<i class="fas fa-star"></i>';
    }
    if (hasHalf) {
        html += '<i class="fas fa-star-half-alt"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
        html += '<i class="far fa-star"></i>';
    }
    return html;
}

/**
 * Helper: Get product by ID
 */
function getProductById(id) {
    return PRODUCTS.find(p => p.id === parseInt(id));
}

/**
 * Helper: Get product by slug
 */
function getProductBySlug(slug) {
    return PRODUCTS.find(p => p.slug === slug);
}

/**
 * Helper: Get unique genres
 */
function getGenres() {
    return [...new Set(PRODUCTS.map(p => p.genre))];
}

/**
 * Helper: Resolve asset path based on current page depth
 */
function resolveAssetPath(path) {
    // Check if we're in a subdirectory (pages/)
    const isSubPage = window.location.pathname.includes('/pages/');
    return isSubPage ? '../' + path : path;
}
