/* ==========================================================================
   PART 1A - APPLICATION CONFIGURATION
   Pearl Beauty Hub
   ========================================================================== */

/* --------------------------------------------------------------------------
   SUPABASE
-------------------------------------------------------------------------- */

const CONFIG = {
    SUPABASE: {
        URL: "https://eztzkivwjkcyxwcopxns.supabase.co",
        ANON_KEY: "YOUR_PUBLISHABLE_KEY"
    },

    BUSINESS: {
        NAME: "Pearl Beauty Hub",
        CATEGORY: "Beauty Parlour",

        ADDRESS:
            "3/7 57th Street, Korattur Railway Station Road, Venkatraman Nagar, Korattur, Chennai, Tamil Nadu 600080",

        PHONE: "",

        EMAIL: "",

        GOOGLE_RATING: 4.7,

        GOOGLE_REVIEWS: 3
    },

    BOOKING: {

        START_TIME: "09:30 AM",

        END_TIME: "07:00 PM",

        DEFAULT_TIME: "10:00 AM",

        MAX_ADVANCE_DAYS: 60,

        MIN_PHONE_LENGTH: 8,

        MAX_PHONE_LENGTH: 15
    },

    UI: {

        LOADER_DURATION: 700,

        COUNTER_DURATION: 2000,

        NAV_SCROLL_OFFSET: 20,

        BACK_TO_TOP_OFFSET: 400
    }
};


/* --------------------------------------------------------------------------
   SUPABASE CLIENT
-------------------------------------------------------------------------- */

const supabase = window.supabase.createClient(
    CONFIG.SUPABASE.URL,
    CONFIG.SUPABASE.ANON_KEY
);


/* --------------------------------------------------------------------------
   GLOBAL APP STATE
-------------------------------------------------------------------------- */

const APP_STATE = {

    activeSection: "hero",

    selectedCategory: "All",

    searchQuery: "",

    selectedService: "",

    bookingInProgress: false

};


/* --------------------------------------------------------------------------
   COMMON SELECTORS
-------------------------------------------------------------------------- */

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => document.querySelectorAll(selector);

/* ==========================================================================
   PART 2B - APPLICATION DATA
   ========================================================================== */


/* --------------------------------------------------------------------------
   SERVICE CATEGORIES
-------------------------------------------------------------------------- */

const SERVICE_CATEGORIES = [

    "All",

    "Hair",

    "Skin Care",

    "Makeup",

    "Nails & Body",

    "Spa"

];


/* --------------------------------------------------------------------------
   SERVICES DATABASE
-------------------------------------------------------------------------- */

const SERVICES = [

{
id: "haircut",
name: "Haircut",
category: "Hair",
icon: "scissors",
description:
"Precision haircut styled according to your face shape and preference."
},

{
id: "hairstyling",
name: "Hairstyling",
category: "Hair",
icon: "scissors",
description:
"Professional hairstyling for casual, party and bridal occasions."
},

{
id: "balayage",
name: "Balayage",
category: "Hair",
icon: "scissors",
description:
"Natural looking hand painted hair colouring."
},

{
id: "shampoo-conditioning",
name: "Shampoo & Conditioning",
category: "Hair",
icon: "scissors",
description:
"Deep cleansing shampoo followed by nourishing conditioner."
},

{
id: "facials",
name: "Facials",
category: "Skin Care",
icon: "sparkle",
description:
"Refreshing facial treatment suitable for all skin types."
},

{
id: "skin-care",
name: "Skin Care",
category: "Skin Care",
icon: "sparkle",
description:
"Complete skin care treatments for healthy glowing skin."
},

{
id: "acne-treatments",
name: "Acne Treatments",
category: "Skin Care",
icon: "shield-alert",
description:
"Professional acne reduction and skin healing treatments."
},

{
id: "make-up",
name: "Make-up",
category: "Makeup",
icon: "palette",
description:
"Professional makeup for every occasion."
},

{
id: "make-up-services",
name: "Make-up Services",
category: "Makeup",
icon: "palette",
description:
"Custom makeup packages for parties and events."
},

{
id: "bridal-services",
name: "Bridal Services",
category: "Makeup",
icon: "heart-handshake",
description:
"Complete bridal makeover package."
},

{
id: "wedding-event-prep",
name: "Wedding & Event Preparation",
category: "Makeup",
icon: "heart-handshake",
description:
"Beauty packages for weddings and family events."
},

{
id: "manicure",
name: "Manicure",
category: "Nails & Body",
icon: "footprints",
description:
"Luxury manicure with nail care."
},

{
id: "pedicure",
name: "Pedicure",
category: "Nails & Body",
icon: "footprints",
description:
"Relaxing pedicure with foot massage."
},

{
id: "body-waxing",
name: "Body Waxing",
category: "Nails & Body",
icon: "flame",
description:
"Full body waxing using premium wax."
},

{
id: "waxing",
name: "Waxing",
category: "Nails & Body",
icon: "flame",
description:
"Face and body waxing."
},

{
id: "spa-services",
name: "Spa Services",
category: "Spa",
icon: "bath",
description:
"Stress relieving spa treatments."
}

];


/* --------------------------------------------------------------------------
   BUSINESS STATS
-------------------------------------------------------------------------- */

const STATS = {

happyClients: 1000,

experience: "10+ Years",

rating: 4.7,

reviews: 3

};


/* --------------------------------------------------------------------------
   BOOKING TIME SLOTS
-------------------------------------------------------------------------- */

const TIME_SLOTS = [

"09:30 AM",

"10:00 AM",

"10:30 AM",

"11:00 AM",

"11:30 AM",

"12:00 PM",

"01:00 PM",

"02:00 PM",

"03:00 PM",

"04:00 PM",

"05:00 PM",

"06:00 PM",

"06:30 PM",

"07:00 PM"

];


/* --------------------------------------------------------------------------
   GALLERY PLACEHOLDERS
-------------------------------------------------------------------------- */

const GALLERY = [

];



/* --------------------------------------------------------------------------
   TESTIMONIALS
-------------------------------------------------------------------------- */

const TESTIMONIALS = [

];



/* --------------------------------------------------------------------------
   FAQs
-------------------------------------------------------------------------- */

const FAQS = [

];



/* ==========================================================================
   PART 3C - CORE UTILITIES
   ========================================================================== */


/* --------------------------------------------------------------------------
   DOM HELPERS
-------------------------------------------------------------------------- */

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => [...document.querySelectorAll(selector)];


/* --------------------------------------------------------------------------
   CLASS HELPERS
-------------------------------------------------------------------------- */

function show(element) {
    if (!element) return;
    element.classList.remove("hidden");
}

function hide(element) {
    if (!element) return;
    element.classList.add("hidden");
}

function enable(element) {
    if (!element) return;
    element.disabled = false;
}

function disable(element) {
    if (!element) return;
    element.disabled = true;
}


/* --------------------------------------------------------------------------
   TEXT HELPERS
-------------------------------------------------------------------------- */

function setText(selector, value) {

    const element = $(selector);

    if (!element) return;

    element.textContent = value;

}


/* --------------------------------------------------------------------------
   SCROLL HELPERS
-------------------------------------------------------------------------- */

function scrollToSection(id) {

    const section = document.getElementById(id);

    if (!section) return;

    section.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}


/* --------------------------------------------------------------------------
   DATE HELPERS
-------------------------------------------------------------------------- */

function today() {

    return new Date().toISOString().split("T")[0];

}

function formatDate(date) {

    return new Date(date).toLocaleDateString("en-IN", {

        day: "numeric",

        month: "long",

        year: "numeric"

    });

}


/* --------------------------------------------------------------------------
   VALIDATION HELPERS
-------------------------------------------------------------------------- */

function isEmpty(value) {

    return value.trim() === "";

}

function validPhone(phone) {

    return /^[0-9+\-\s]{8,15}$/.test(phone.trim());

}


/* --------------------------------------------------------------------------
   ALERTS
-------------------------------------------------------------------------- */

function success(message) {

    alert(message);

}

function error(message) {

    alert(message);

}


/* --------------------------------------------------------------------------
   LOADING STATE
-------------------------------------------------------------------------- */

function startLoading(button, spinner, label) {

    disable(button);

    hide(label);

    show(spinner);

}

function stopLoading(button, spinner, label) {

    enable(button);

    show(label);

    hide(spinner);

}


/* --------------------------------------------------------------------------
   LOGGER
-------------------------------------------------------------------------- */

function log(...message) {

    console.log(

        "[Pearl Beauty Hub]",

        ...message

    );

}

/* ==========================================================================
   PART 4D - UI MANAGER
   ========================================================================== */

const UI = {

    loader: $("#initial-loader"),

    navbar: $("#main-navbar"),

    mobileMenu: $("#mobile-menu"),

    mobileToggle: $("#mobile-menu-toggle"),

    progressBar: $("#scroll-progress-bar"),

    backToTop: $("#back-to-top"),

    footerYear: $("#footer-year")

};



/* --------------------------------------------------------------------------
   INITIALIZE UI
-------------------------------------------------------------------------- */

function initializeUI() {

    initializeLoader();

    initializeNavbar();

    initializeMobileMenu();

    initializeScrollProgress();

    initializeBackToTop();

    initializeFooter();

}



/* --------------------------------------------------------------------------
   LOADER
-------------------------------------------------------------------------- */

function initializeLoader() {

    if (!UI.loader) return;

    window.addEventListener("load", () => {

        setTimeout(() => {

            UI.loader.classList.add("opacity-0");

            setTimeout(() => {

                UI.loader.remove();

            },300);

        },CONFIG.UI.LOADER_DURATION);

    });

}



/* --------------------------------------------------------------------------
   FOOTER
-------------------------------------------------------------------------- */

function initializeFooter(){

    if(UI.footerYear){

        UI.footerYear.textContent = new Date().getFullYear();

    }

}



/* --------------------------------------------------------------------------
   NAVBAR
-------------------------------------------------------------------------- */

function initializeNavbar(){

    if(!UI.navbar) return;

    const updateNavbar = ()=>{

        const scrolled = window.scrollY > CONFIG.UI.NAV_SCROLL_OFFSET;

        UI.navbar.classList.toggle("shadow-md",scrolled);

        UI.navbar.classList.toggle("backdrop-blur-md",scrolled);

    }

    window.addEventListener("scroll",updateNavbar);

    updateNavbar();

}



/* --------------------------------------------------------------------------
   MOBILE MENU
-------------------------------------------------------------------------- */

function initializeMobileMenu(){

    if(!UI.mobileToggle || !UI.mobileMenu) return;

    UI.mobileToggle.addEventListener("click",()=>{

        UI.mobileMenu.classList.toggle("hidden");

        if(window.lucide){

            window.lucide.createIcons();

        }

    });

}



/* --------------------------------------------------------------------------
   SCROLL PROGRESS
-------------------------------------------------------------------------- */

function initializeScrollProgress(){

    if(!UI.progressBar) return;

    window.addEventListener("scroll",()=>{

        const total =

        document.documentElement.scrollHeight -

        document.documentElement.clientHeight;

        const percent =

        (window.scrollY/total)*100;

        UI.progressBar.style.width =

        percent+"%";

    });

}



/* --------------------------------------------------------------------------
   BACK TO TOP
-------------------------------------------------------------------------- */

function initializeBackToTop(){

    if(!UI.backToTop) return;

    window.addEventListener("scroll",()=>{

        if(window.scrollY >

            CONFIG.UI.BACK_TO_TOP_OFFSET){

            show(UI.backToTop);

        }

        else{

            hide(UI.backToTop);

        }

    });

    UI.backToTop.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}



/* --------------------------------------------------------------------------
   SECTION NAVIGATION
-------------------------------------------------------------------------- */

function activateSection(id){

    APP_STATE.activeSection=id;

    $$("[data-nav-link]").forEach(link=>{

        link.classList.toggle(

            "active",

            link.dataset.navLink===id

        );

    });

}



/* --------------------------------------------------------------------------
   GLOBAL NAVIGATION
-------------------------------------------------------------------------- */

document.addEventListener("click",(event)=>{

    const button=

    event.target.closest("[data-nav-link]");

    if(!button) return;

    scrollToSection(

        button.dataset.navLink

    );

    activateSection(

        button.dataset.navLink

    );

});

/* ==========================================================================
   PART 5E - BOOKING ENGINE
   ========================================================================== */

const BookingEngine = {

    form: $("#booking-form"),

    fields: {

        name: $("#field-name"),

        phone: $("#field-phone"),

        service: $("#field-service"),

        date: $("#field-date"),

        time: $("#field-time"),

        message: $("#field-message")

    },

    button: $("#booking-submit"),

    spinner: $("#booking-submit-spinner"),

    label: $("#booking-submit-label")

};



/* --------------------------------------------------------------------------
   INITIALIZE BOOKING ENGINE
-------------------------------------------------------------------------- */

function initializeBookingEngine(){

    if(!BookingEngine.form) return;

    initializeBookingDates();

    initializeBookingValidation();

    initializeBookingSubmit();

}



/* --------------------------------------------------------------------------
   DATE SETTINGS
-------------------------------------------------------------------------- */

function initializeBookingDates(){

    BookingEngine.fields.date.min = today();

}



/* --------------------------------------------------------------------------
   VALIDATION
-------------------------------------------------------------------------- */

function validateBooking(){

    const booking = BookingEngine.fields;

    if(isEmpty(booking.name.value))
        return error("Please enter your name"),false;

    if(!validPhone(booking.phone.value))
        return error("Enter a valid phone number"),false;

    if(isEmpty(booking.service.value))
        return error("Select a service"),false;

    if(isEmpty(booking.date.value))
        return error("Select a date"),false;

    if(isEmpty(booking.time.value))
        return error("Select a time"),false;

    return true;

}



/* --------------------------------------------------------------------------
   CREATE BOOKING OBJECT
-------------------------------------------------------------------------- */

function bookingPayload(){

    return{

        name:
        BookingEngine.fields.name.value.trim(),

        phone:
        BookingEngine.fields.phone.value.trim(),

        service:
        BookingEngine.fields.service.value,

        date:
        BookingEngine.fields.date.value,

        time:
        BookingEngine.fields.time.value,

        message:
        BookingEngine.fields.message.value.trim()

    };

}



/* --------------------------------------------------------------------------
   DUPLICATE BOOKING CHECK
-------------------------------------------------------------------------- */

async function bookingExists(data){

    const {data:existing,error}=await supabase

    .from("appointments")

    .select("id")

    .eq("phone",data.phone)

    .eq("date",data.date)

    .eq("time",data.time)

    .limit(1);

    if(error) throw error;

    return existing.length>0;

}



/* --------------------------------------------------------------------------
   SAVE BOOKING
-------------------------------------------------------------------------- */

async function saveBooking(data){

    const {data:booking,error}=await supabase

    .from("appointments")

    .insert(data)

    .select()

    .single();

    if(error) throw error;

    return booking;

}



/* --------------------------------------------------------------------------
   CONFIRMATION MODAL
-------------------------------------------------------------------------- */

function showBookingConfirmation(booking,payload){

    $("#confirm-id").textContent =
    booking.id;

    $("#confirm-name").textContent =
    payload.name;

    $("#confirm-phone").textContent =
    payload.phone;

    $("#confirm-service").textContent =
    payload.service;

    $("#confirm-datetime").textContent =
    `${payload.date} at ${payload.time}`;

    show($("#booking-confirmation"));

}



/* --------------------------------------------------------------------------
   RESET FORM
-------------------------------------------------------------------------- */

function resetBooking(){

    BookingEngine.form.reset();

    BookingEngine.fields.time.value =
    CONFIG.BOOKING.DEFAULT_TIME;

}



/* --------------------------------------------------------------------------
   SUBMIT
-------------------------------------------------------------------------- */

function initializeBookingSubmit(){

    BookingEngine.form.addEventListener(

    "submit",

    async(event)=>{

        event.preventDefault();

        if(!validateBooking()) return;

        const payload =
        bookingPayload();

        startLoading(

            BookingEngine.button,

            BookingEngine.spinner,

            BookingEngine.label

        );

        try{

            if(await bookingExists(payload))

                throw new Error(

                "You already have a booking for this time."

                );

            const booking=

            await saveBooking(payload);

            showBookingConfirmation(

                booking,

                payload

            );

            success(

                "Appointment booked successfully!"

            );

            resetBooking();

        }

        catch(err){

            error(

                err.message

            );

        }

        finally{

            stopLoading(

                BookingEngine.button,

                BookingEngine.spinner,

                BookingEngine.label

            );

        }

    });

}
