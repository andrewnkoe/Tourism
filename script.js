

document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    initSearch();
    initContactForms();
    initGallery();
    initUrlParams();
});

function initTheme() {
    const themeToggle = document.getElementById("themeToggle");
    const savedTheme = localStorage.getItem("tourismTheme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        if (themeToggle) {
            themeToggle.innerHTML = "Light Mode";
        }
    } else {
        if (themeToggle) {
            themeToggle.innerHTML = "Dark Mode";
        }
    }

    if (!themeToggle) return;

    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("tourismTheme", "dark");
            themeToggle.innerHTML = "Light Mode";
        } else {
            localStorage.setItem("tourismTheme", "light");
            themeToggle.innerHTML = "Dark Mode";
        }
    });
}

function initSearch() {
    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");
    const searchMessage = document.getElementById("searchMessage");

    if (!searchForm || !searchInput || !searchMessage) return;

    const tourismDirectory = [
        {
            name: "Maletsunyane Falls",
            category: "Destination",
            url: "destinations.html#maletsunyane",
            keywords: "waterfall water semonkong abseil river hiking mountains sight nature"
        },
        {
            name: "Thaba Bosiu",
            category: "Historic Site",
            url: "destinations.html#thaba-bosiu",
            keywords: "historic mountain plateau moshoeshoe heritage culture fortress nation kingdom"
        },
        {
            name: "Sehlabathebe National Park",
            category: "National Park",
            url: "destinations.html#sehlabathebe",
            keywords: "unesco world heritage park wildlife rock formations nature scenery biodiversity wilderness"
        },
        {
            name: "AfriSki Mountain Resort",
            category: "Resort",
            url: "destinations.html#afriski",
            keywords: "ski skiing snow snowboard winter sports maluti mountains resort adventure"
        },
        {
            name: "Katse Dam",
            category: "Destination",
            url: "destinations.html#katse-dam",
            keywords: "dam reservoir lake highlands engineering boat water architecture scenic"
        },
        {
            name: "Sani Pass",
            category: "Mountain Pass",
            url: "destinations.html#sani-pass",
            keywords: "mountain pass 4x4 road highest pub kwazulu drakensberg scenic drive adventure"
        },
        {
            name: "Travel Information & History",
            category: "Travel Guide",
            url: "about.html",
            keywords: "travel information planning journey tips guide entry currency geography weather basotho"
        },
        {
            name: "Find Accommodation",
            category: "Lodging",
            url: "contact.html?destination=Accommodation",
            keywords: "accommodation hotel hotels lodge lodges resorts stay rooms avani chalets guest house"
        },
        {
            name: "Trip Activities & Hiking",
            category: "Adventure",
            url: "destinations.html",
            keywords: "activities hiking pony trekking horse riding adventure trails outdoors walking trekking"
        },
        {
            name: "Photo Gallery",
            category: "Gallery",
            url: "gallery.html",
            keywords: "photos images gallery pictures scenery landscapes visual photography"
        },
        {
            name: "Plan a Trip / Contact Us",
            category: "Enquiry",
            url: "contact.html",
            keywords: "contact booking enquiry message email plan trip tour guide reservation"
        }
    ];

    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const query = searchInput.value.trim().toLowerCase();

        if (query === "") {
            searchMessage.innerHTML = '<span class="text-warning fw-semibold">Please enter a destination, activity, or service to search.</span>';
            return;
        }

        const matches = tourismDirectory.filter(function (item) {
            return (
                item.name.toLowerCase().includes(query) ||
                item.category.toLowerCase().includes(query) ||
                item.keywords.toLowerCase().includes(query)
            );
        });

        if (matches.length > 0) {
            let pillsHtml = matches.map(function (item) {
                return '<a href="' + item.url + '" class="search-result-pill">' +
                       item.name + ' <small>(' + item.category + ')</small> &rarr;</a>';
            }).join(" ");

            searchMessage.innerHTML =
                '<div class="mt-2 text-success fw-bold">Found ' + matches.length + ' match' + (matches.length > 1 ? 'es' : '') + ':</div>' +
                '<div class="search-results-box">' + pillsHtml + '</div>';
        } else {
            searchMessage.innerHTML =
                '<div class="alert alert-warning mt-2 mb-0" role="alert">' +
                'No matching destinations found for "<strong>' + escapeHTML(query) + '</strong>". ' +
                'Try searching for <em>waterfall, hiking, skiing, lodging, park</em>, or browse our ' +
                '<a href="destinations.html" class="alert-link">Destinations page</a>.' +
                '</div>';
        }
    });

    searchInput.addEventListener("input", function () {
        if (searchInput.value.trim() === "") {
            searchMessage.innerHTML = "";
        }
    });
}

function initContactForms() {
    const contactForm = document.getElementById("contactForm");
    const contactFeedback = document.getElementById("contactFeedback");

    const travelForm = document.getElementById("travelForm");
    const travelFeedback = document.getElementById("travelFeedback");
    const travelDateInput = document.getElementById("travelDate");


    if (travelDateInput) {
        const today = new Date();
        const localToday = new Date(
            today.getTime() - today.getTimezoneOffset() * 60000
        ).toISOString().split("T")[0];

        travelDateInput.min = localToday;
    }

    if (contactForm && contactFeedback) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            const name = document.getElementById("fullName").value.trim();
            const subject = document.getElementById("subject").value;
            const message = document.getElementById("message").value.trim();

            if (name.length < 2 || message.length < 10) {
                contactFeedback.innerHTML =
                    '<div class="alert alert-danger" role="alert">Please provide your full name (at least 2 characters) and a message of at least 10 characters.</div>';
                return;
            }

            contactFeedback.innerHTML =
                '<div class="alert alert-success" role="alert">' +
                '<strong>Thank you, ' + escapeHTML(name) + '!</strong> ' +
                'Your message regarding <em>' + escapeHTML(subject) + '</em> has been received successfully. ' +
                'Our tourism advisory team will get back to you soon.' +
                '</div>';

            contactForm.reset();
        });
    }


    if (travelForm && travelFeedback && travelDateInput) {
        travelForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!travelForm.checkValidity()) {
                travelForm.reportValidity();
                return;
            }

            const travellerName = document.getElementById("travellerName").value.trim();
            const destination = document.getElementById("destination").value;
            const travelDate = travelDateInput.value;
            const travellers = Number(document.getElementById("travellers").value);
            const activity = document.getElementById("activity").value;

            const today = new Date();
            const localToday = new Date(
                today.getTime() - today.getTimezoneOffset() * 60000
            ).toISOString().split("T")[0];

            if (travellerName.length < 2) {
                travelFeedback.innerHTML = '<div class="alert alert-danger">Please enter your full name.</div>';
                return;
            }

            if (!travelDate || travelDate < localToday) {
                travelFeedback.innerHTML = '<div class="alert alert-danger">Please select a valid future travel date (today or onwards).</div>';
                return;
            }

            if (travellers < 1 || travellers > 50) {
                travelFeedback.innerHTML = '<div class="alert alert-danger">Traveller party size must be between 1 and 50.</div>';
                return;
            }

            travelFeedback.innerHTML =
                '<div class="alert alert-success" role="alert">' +
                '<strong>Enquiry Confirmed!</strong><br>' +
                'Thank you, ' + escapeHTML(travellerName) + '. Your travel enquiry for <strong>' +
                escapeHTML(destination) + '</strong> on <strong>' + escapeHTML(travelDate) + '</strong> (' +
                travellers + ' traveller' + (travellers > 1 ? 's' : '') + ', activity: ' +
                escapeHTML(activity) + ') has been validated and registered.' +
                '</div>';

            travelForm.reset();
            travelDateInput.min = localToday;
        });
    }
}

function initGallery() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const galleryCards = document.querySelectorAll(".gallery-card");
    const galleryItems = document.querySelectorAll(".gallery-item");
    const imageModalElement = document.getElementById("imageModal");

    if (filterButtons.length > 0 && galleryCards.length > 0) {
        filterButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                const selectedCategory = button.dataset.filter;

                filterButtons.forEach(function (btn) {
                    btn.classList.remove("active");
                });
                button.classList.add("active");

                galleryCards.forEach(function (card) {
                    const categories = (card.dataset.category || "").split(" ");

                    if (selectedCategory === "all" || categories.includes(selectedCategory)) {
                        card.style.display = "";
                    } else {
                        card.style.display = "none";
                    }
                });
            });
        });
    }

    if (imageModalElement && typeof bootstrap !== "undefined" && galleryItems.length > 0) {
        const imageModal = new bootstrap.Modal(imageModalElement);
        const modalImage = document.getElementById("modalImage");
        const modalTitle = document.getElementById("imageModalTitle");

        galleryItems.forEach(function (item) {
            item.addEventListener("click", function () {
                const imageURL = item.dataset.image;
                const imageTitle = item.dataset.title || "Lesotho Gallery";

                if (modalImage) {
                    modalImage.src = imageURL;
                    modalImage.alt = imageTitle;
                }
                if (modalTitle) {
                    modalTitle.textContent = imageTitle;
                }

                imageModal.show();
            });
        });
    }
}

function initUrlParams() {
    const destinationSelect = document.getElementById("destination");
    if (!destinationSelect) return;

    const urlParams = new URLSearchParams(window.location.search);
    const destinationParam = urlParams.get("destination");

    if (destinationParam) {
        for (let i = 0; i < destinationSelect.options.length; i++) {
            if (destinationSelect.options[i].value.toLowerCase() === destinationParam.toLowerCase()) {
                destinationSelect.selectedIndex = i;
                break;
            }
        }

        const travelSection = document.getElementById("travelForm");
        if (travelSection) {
            setTimeout(function () {
                travelSection.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 300);
        }
    }
}

function escapeHTML(value) {
    if (value === null || value === undefined) return "";
    return String(value).replace(/[&<>"']/g, function (char) {
        const replacements = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };
        return replacements[char];
    });
}