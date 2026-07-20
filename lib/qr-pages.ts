/**
 * Content for the per-type landing pages (/wifi-qr-code, /vcard-qr-code, ...).
 *
 * Each entry is a full, self-contained page: metadata, hero copy, steps and
 * type-specific FAQs. This is the site's main SEO surface, every page targets
 * one search intent ("wifi qr code generator", "vcard qr code", ...) with the
 * tool preselected to that type. Copy must stay honest: QReate generates
 * static codes locally in the browser, free, no signup, no expiry, no
 * tracking, and never claim more than that.
 */

export interface QrTypePage {
    /** URL segment, e.g. "wifi-qr-code". */
    slug: string;
    /** The code type the tool is preselected to. */
    type: CodeType;
    /** Short human name used in cross-links ("Wi-Fi", "vCard", ...). */
    name: string;
    /** <title>, keyword first, brand last. */
    title: string;
    /** Meta description, ~150-160 chars. */
    description: string;
    /** Visible h1. */
    h1: string;
    /** Hero paragraph under the h1. */
    intro: string;
    /** "How to" steps, type-specific. */
    steps: [string, string, string];
    /** Type-specific FAQs (also emitted as FAQPage JSON-LD). */
    faqs: { question: string; answer: string }[];
}

export const QR_TYPE_PAGES: QrTypePage[] = [
    {
        slug: "wifi-qr-code",
        type: "wifi",
        name: "Wi-Fi",
        title: "Wi-Fi QR Code Generator: Free, No Signup | QReate",
        description:
            "Create a free Wi-Fi QR code guests can scan to join your network instantly, no typing passwords. Supports WPA/WPA2, WEP, open and hidden networks.",
        h1: "Wi-Fi QR Code Generator",
        intro: "Let guests join your Wi-Fi with one scan instead of spelling out the password. Enter your network name and password, and QReate builds a code that phones recognize natively, point the camera, tap, connected. Works with WPA/WPA2, WEP, open and hidden networks.",
        steps: [
            "Enter your network name (SSID), pick the encryption type and type the password.",
            "Style the code, colors, module shapes, or your logo in the middle.",
            "Download as SVG or PNG and print it where guests can see it.",
        ],
        faqs: [
            {
                question: "How does a Wi-Fi QR code work?",
                answer: "The code embeds your network name, encryption type and password in the standard WIFI: format. Cameras on iOS 11+ and Android 10+ recognize it natively and offer to join the network, no app needed.",
            },
            {
                question: "Is it safe to put my Wi-Fi password in a QR code?",
                answer: "The password is stored in the code itself, readable by anyone who scans it, treat the printed code like the written password. QReate generates everything locally in your browser, so your credentials are never uploaded anywhere.",
            },
            {
                question: "Does it work for hidden networks?",
                answer: "Yes, enable the “Hidden Network” toggle and scanning devices will connect even though the SSID isn't broadcast.",
            },
            {
                question: "What happens if I change my Wi-Fi password?",
                answer: "The code is static, so it keeps encoding the old password. Just generate a new code, it takes a few seconds and stays free.",
            },
        ],
    },
    {
        slug: "vcard-qr-code",
        type: "contact",
        name: "vCard",
        title: "vCard QR Code Generator: Digital Business Card | QReate",
        description:
            "Turn your contact details into a scannable vCard QR code. One scan adds your name, phone, email and company to any phone's contacts. Free, no signup.",
        h1: "vCard QR Code Generator",
        intro: "Put your contact details on a business card, badge or slide as a single scannable code. QReate encodes a standard vCard, name, organization, title, phone, email and website, that iPhones and Android phones open straight into “Add contact”.",
        steps: [
            "Fill in the contact fields you want to share, empty fields are simply left out.",
            "Match the code to your brand with custom colors, shapes and a logo.",
            "Export a crisp SVG for print or a PNG for email signatures and slides.",
        ],
        faqs: [
            {
                question: "What information can a vCard QR code hold?",
                answer: "First and last name, organization, job title, phone number, email address and website. QReate encodes them as a standard vCard 3.0, which both iOS and Android read natively.",
            },
            {
                question: "Why does my vCard code look so dense?",
                answer: "vCards carry more text than a short link, so the code uses a bigger grid. Keep fields concise, and if you print small, test a scan from the actual distance, or raise the error correction level for extra robustness.",
            },
            {
                question: "Can I update my details after printing the code?",
                answer: "No, the details live inside the code itself, which is also why they load instantly and never depend on a third-party server. If something changes, generate a fresh code for the next print run.",
            },
        ],
    },
    {
        slug: "url-qr-code",
        type: "url",
        name: "URL",
        title: "URL QR Code Generator: Link to Any Website | QReate",
        description:
            "Make a free QR code for any link. Custom colors, shapes and logo, exported as SVG or PNG. No signup, no watermark, and the code never expires.",
        h1: "URL QR Code Generator",
        intro: "Send people from print to any web page with one scan. Paste a link, QReate adds https:// for you, then style the code and download it in print-ready quality. The URL is encoded directly in the code, so there's no redirect service in the middle and nothing to expire.",
        steps: [
            "Paste or type the address, the https:// prefix is added automatically.",
            "Pick colors, module shapes and finder styles, or drop in a logo.",
            "Download as SVG for print or PNG/JPEG up to 4096 px for screens.",
        ],
        faqs: [
            {
                question: "Should I shorten my URL first?",
                answer: "It helps: shorter URLs produce simpler codes that scan more reliably at small sizes. But any length up to roughly 2,900 characters works, the grid just gets denser.",
            },
            {
                question: "Will my QR code ever stop working?",
                answer: "The code itself never expires, the URL is encoded directly, with no redirect service that can shut down. It works for as long as your website is online.",
            },
            {
                question: "Can I change the link after printing?",
                answer: "No. Static codes trade editability for reliability and privacy: no tracking, no middleman, no fees. If the destination changes, generate a new code.",
            },
        ],
    },
    {
        slug: "text-qr-code",
        type: "text",
        name: "Text",
        title: "Text QR Code Generator: Encode Any Message | QReate",
        description:
            "Encode any text into a QR code that displays instantly when scanned, no internet needed. Free, unlimited, customizable, and it never expires.",
        h1: "Text QR Code Generator",
        intro: "Put a plain message inside a QR code: instructions, a serial number, a note, a poem. The text is stored in the code itself, so it shows up the moment someone scans, even with no internet connection.",
        steps: [
            "Type or paste your text into the content field.",
            "Adjust error correction if the code will be printed small or might get scuffed.",
            "Style it, then download as SVG, PNG or JPEG.",
        ],
        faqs: [
            {
                question: "How much text fits in a QR code?",
                answer: "Up to about 2,900 characters at the lowest error correction level. In practice, keep it under a few hundred characters, shorter text means a coarser grid that scans faster and prints smaller.",
            },
            {
                question: "Does scanning a text QR code need internet?",
                answer: "No. The text is embedded in the code itself, so it displays instantly on any phone, fully offline.",
            },
        ],
    },
    {
        slug: "email-qr-code",
        type: "email",
        name: "Email",
        title: "Email QR Code Generator: Prefilled Messages | QReate",
        description:
            "Create a QR code that opens a prefilled email, recipient, subject and message ready to send. Free, no signup, works with every mail app.",
        h1: "Email QR Code Generator",
        intro: "One scan opens the sender's mail app with the recipient, subject and message already filled in. Perfect for feedback requests, support contacts and RSVP flows, the reader only has to press send.",
        steps: [
            "Enter the recipient address, and optionally a subject and message body.",
            "Customize the look to match your material.",
            "Download and place it on posters, receipts or packaging.",
        ],
        faqs: [
            {
                question: "How does an email QR code work?",
                answer: "It encodes a standard mailto: link with your recipient, subject and body. Scanning opens the phone's default mail app with everything prefilled, the sender just taps send.",
            },
            {
                question: "Can I prefill the subject and message?",
                answer: "Yes, both are optional fields. Anything you leave empty is simply omitted from the code.",
            },
        ],
    },
    {
        slug: "sms-qr-code",
        type: "sms",
        name: "SMS",
        title: "SMS QR Code Generator: Prefilled Text Message | QReate",
        description:
            "Generate a QR code that opens a text message with the number and message prefilled. Great for opt-ins and contests. Free and unlimited.",
        h1: "SMS QR Code Generator",
        intro: "Scanning opens the phone's messaging app with your number and message already typed. Ideal for text-to-join campaigns, contests and quick contact, the user just hits send.",
        steps: [
            "Enter the destination phone number and an optional prefilled message.",
            "Style the code so it stands out on your material.",
            "Download and test a scan before you print at scale.",
        ],
        faqs: [
            {
                question: "Does the message send automatically when scanned?",
                answer: "No, scanning only opens the messaging app with the number and text prefilled. The user always confirms by pressing send themselves.",
            },
            {
                question: "What phone number format should I use?",
                answer: "Use the international format with a plus and country code (e.g. +1 555 000 0000) so the code works for visitors from anywhere.",
            },
        ],
    },
    {
        slug: "phone-qr-code",
        type: "phone",
        name: "Phone",
        title: "Phone QR Code Generator: Tap-to-Call Codes | QReate",
        description:
            "Create a QR code that dials your phone number with one scan. Perfect for storefronts, vans and business cards. Free, no signup, never expires.",
        h1: "Phone QR Code Generator",
        intro: "Skip the number-typing: one scan brings up your phone number ready to call. Put it on a storefront, a service van or a flyer, and turn a glance into a phone call.",
        steps: [
            "Enter your phone number, international format is safest.",
            "Add your colors or logo so the code fits your brand.",
            "Download it print-ready as SVG, or PNG up to 4096 px.",
        ],
        faqs: [
            {
                question: "Does scanning start the call immediately?",
                answer: "No, the phone shows the number and asks the user to confirm the call, so nobody dials by accident.",
            },
            {
                question: "Which number format should I encode?",
                answer: "International format with country code (e.g. +39 333 1234567). It works for local and foreign callers alike.",
            },
        ],
    },
    {
        slug: "location-qr-code",
        type: "geolocation",
        name: "Location",
        title: "Location QR Code Generator: GPS Map Codes | QReate",
        description:
            "Make a QR code that opens your exact GPS location in the scanner's maps app. Ideal for venues, events and parking. Free and unlimited.",
        h1: "Location QR Code Generator",
        intro: "Guide people to an exact spot, not just an address. The code encodes GPS coordinates that open directly in the scanner's maps app, ready for directions. Great for event venues, trailheads, parking entrances and meeting points.",
        steps: [
            "Enter the latitude and longitude of your spot (copy them from any maps app).",
            "Style the code to match your signage.",
            "Download, print and place it where people need directions.",
        ],
        faqs: [
            {
                question: "How do I find the coordinates for my location?",
                answer: "In Google Maps or Apple Maps, press and hold the spot, the latitude and longitude appear in the info panel. Copy them into QReate's fields.",
            },
            {
                question: "Which maps app opens when scanned?",
                answer: "The code uses the standard geo: format, so the phone opens its default maps app, Apple Maps on iOS, Google Maps on most Android phones.",
            },
        ],
    },
    {
        slug: "event-qr-code",
        type: "calendar",
        name: "Event",
        title: "Event QR Code Generator: Add-to-Calendar Codes | QReate",
        description:
            "Create a QR code that adds your event to the scanner's calendar, title, place, start and end prefilled. Free, no signup, no expiry.",
        h1: "Event QR Code Generator",
        intro: "Turn posters and invitations into calendar entries. The code carries your event's title, location, start and end time in the standard iCalendar format, one scan and it's saved, no typos, no forgotten dates.",
        steps: [
            "Enter the event title, location, start and end times, and an optional description.",
            "Style the code for your poster or invitation.",
            "Download and add it to your printed and digital materials.",
        ],
        faqs: [
            {
                question: "Which calendar apps support event QR codes?",
                answer: "The code uses the standard iCalendar (VEVENT) format. Most phones open it in their default calendar; support varies slightly by device, so test a scan on both iOS and Android before printing.",
            },
            {
                question: "Can I update the event after creating the code?",
                answer: "The event details are stored inside the code, so a printed code keeps its original data. If the schedule changes, regenerate the code, it's free and instant.",
            },
        ],
    },
];

export const QR_TYPE_PAGE_BY_SLUG = new Map(QR_TYPE_PAGES.map((page) => [page.slug, page]));
