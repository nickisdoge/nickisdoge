  document.addEventListener("DOMContentLoaded", function () {
        const tabs = document.querySelectorAll(".aqua");
        const tabContents = document.querySelectorAll(".tab-content");

        function showTab(tabId, updateUrl = true) {
            // Hide all tab contents
            tabContents.forEach(content => content.classList.remove("active"));

            // Show the selected tab
            document.getElementById(tabId).classList.add("active");

            // Update the URL without refreshing
            if (updateUrl) {
                history.pushState(null, "", `#${tabId}`);
            }
        }

        // Add event listeners to tabs
        tabs.forEach(tab => {
            tab.addEventListener("click", function (event) {
                event.preventDefault();
                const tabId = tab.getAttribute("data-tab");
                showTab(tabId);
            });
        });

        // Load correct tab from URL on page load
        const hash = window.location.hash.substring(1); // Get hash without #
        if (hash && document.getElementById(hash)) {
            showTab(hash, false); // Do not update URL on initial load
        } else {
            showTab("about", false); // Default to Tab 1
        }

        // Handle back/forward navigation
        window.addEventListener("popstate", function () {
            const hash = window.location.hash.substring(1);
            if (hash && document.getElementById(hash)) {
                showTab(hash, false);
            }
        });
    });