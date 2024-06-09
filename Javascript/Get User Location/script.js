document.getElementById("get-location").addEventListener("click", () => {
  const locationDiv = document.getElementById("location-details");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showLocation, checkError);
  } else {
    locationDiv.innerHTML = "The browser does not support geolocation";
  }

  async function showLocation(position) {
    if (!navigator.onLine) {
      locationDiv.innerHTML = "Check your internet conection";
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
      );
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      console.log(data.address.city);
      console.log(data.address.country);
      locationDiv.innerHTML = `${data.address.city}, ${data.address.country}`;
    } catch (error) {
      locationDiv.innerHTML = "Check your internet conection";
    }
  }

  function checkError(error) {
    const errors = {
      [error.PERMISSION_DENIED]:
        "Please allow access to location",
      [error.POSITION_UNAVAILABLE]: "The request to get user location timed out",
      [error.TIMEOUT]:
        "The request to get user location timed out",
      [error.UNKNOWN_ERROR]: "An unknown error occurred",
    };

    locationDiv.innerHTML = errors[error.code] || "An unknown error occurred";
  }
});
