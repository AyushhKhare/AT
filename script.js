let map;
        let marker;
        let watchID;

        function initMap() {
            map = L.map('map').setView([5.505, -0.09], 13); // Default location

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© OpenStreetMap'
            }).addTo(map);

            marker = L.marker([5.505, -0.09]).addTo(map);
        }

        function startTracking() {
            if (navigator.geolocation) {
                watchID = navigator.geolocation.watchPosition(showPosition, showError, {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                });
            } else {
                document.getElementById('location').innerHTML = "Geolocation is not supported by this browser.";
            }
        }

        function showPosition(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const accuracy = position.coords.accuracy;

            document.getElementById('location').innerHTML = `
                Latitude: ${latitude.toFixed(6)}<br>
                Longitude: ${longitude.toFixed(6)}<br>
                Accuracy: ${accuracy} meters
            `;

            const latlng = L.latLng(latitude, longitude);
            map.setView(latlng, 13);
            marker.setLatLng(latlng);
        }

        function showError(error) {
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    document.getElementById('location').innerHTML = "User denied the request for Geolocation.";
                    break;
                case error.POSITION_UNAVAILABLE:
                    document.getElementById('location').innerHTML = "Location information is unavailable.";
                    break;
                case error.TIMEOUT:
                    document.getElementById('location').innerHTML = "The request to get user location timed out.";
                    break;
                case error.UNKNOWN_ERROR:
                    document.getElementById('location').innerHTML = "An unknown error occurred.";
                    break;
            }
        }

        function stopTracking() {
            if (watchID) {
                navigator.geolocation.clearWatch(watchID);
                document.getElementById('location').innerHTML = "Tracking stopped.";
            }
        }

        // Initialize the map and start tracking
        window.onload = function() {
            initMap();
            startTracking();
        };