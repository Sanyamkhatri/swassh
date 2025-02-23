
// import { configDotenv } from "dotenv";

function validateCheckBoxes() {
  let isValid = true;

  const checkboxGroups = [
    { name: 'time', errorMessageId: 'timeError' },
    { name: 'package', errorMessageId: 'packageError' },
    { name: 'carType', errorMessageId: 'carTypeError' },
    { name: 'agree', errorMessageId: 'agreeError' },
    { name: 'agree2', errorMessageId: 'agree2Error' }
  ];

  checkboxGroups.forEach(group => {
    const checkboxes = document.querySelectorAll(`input[name="${group.name}"]:checked`);
    const errorElement = document.getElementById(group.errorMessageId);

    if (checkboxes.length === 0) {
      errorElement.style.display = 'inline';
      isValid = false;
    } else {
      errorElement.style.display = 'none';
    }
  });

  return isValid;
}

const checkboxes = document.querySelectorAll('input[name="carType"]');
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    if (this.checked) {
      checkboxes.forEach((box) => {
        if (box !== this) {
          box.checked = false;
        }
      });
    }
  });
});

const checkboxesTime = document.querySelectorAll('input[name="time"]');
checkboxesTime.forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    if (this.checked) {
      checkboxesTime.forEach((box) => {
        if (box !== this) {
          box.checked = false;
        }
      });
    }
  });
});

const checkboxesPackage = document.querySelectorAll('input[name="package"]');
checkboxesPackage.forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    if (this.checked) {
      checkboxesPackage.forEach((box) => {
        if (box !== this) {
          box.checked = false;
        }
      });
    }
  });
});

const userName = document.getElementById("name");
const contact = document.getElementById("phone");
const address = document.getElementById("address");
const bookDate = document.getElementById("bookingDate");
const city = document.getElementById("city")
let price;
let timeSlot;
let package;
let pricingField;
let carType;
let calculatedprice;



// Dynamic form data
document.getElementById("bookingForm").addEventListener("change", function (e) {
  console.log(e.target.value)
  e.preventDefault();
  package = document.querySelector('input[name="package"]:checked')?.value;
  pricingField = document.getElementById("price_display");
  price = document.getElementById("price")
  carType = document.querySelector('input[name="carType"]:checked')?.value;
  timeSlot = document.querySelector('input[name="time"]:checked')?.value;

  calculatedprice = "";
  // console.log(package, carType, timeSlot);
  if (package && carType) {
    if (package === "quickshine") {
      if (carType === "hatchback") {
        calculatedprice = "₹349";
      } else if (carType === "sedan") {
        calculatedprice = "₹399";
      } else if (carType === "compact-suv") {
        calculatedprice = "₹399";
      } else if (carType === "SUV-5-seater") {
        calculatedprice = "₹449";
      } else if (carType === "SUV-7-seater") {
        calculatedprice = "₹449";
      }
    } else if (package === "deepCleaning") {
      if (carType === "hatchback") {
        calculatedprice = "₹799";
      } else if (carType === "sedan") {
        calculatedprice = "₹999";
      } else if (carType === "compact-suv") {
        calculatedprice = "₹999";
      } else if (carType === "SUV-5-seater") {
        calculatedprice = "₹1199";
      } else if (carType === "SUV-7-seater") {
        calculatedprice = "₹1399";
      }
    } else if (package === "rubbingPolishing") {
      if (carType === "hatchback") {
        calculatedprice = "₹1399";
      } else if (carType === "sedan") {
        calculatedprice = "₹1599";
      } else if (carType === "compact-suv") {
        calculatedprice = "₹1599";
      } else if (carType === "SUV-5-seater") {
        calculatedprice = "₹1799";
      } else if (carType === "SUV-7-seater") {
        calculatedprice = "₹1799";
      }
    } else if (package === "windshieldPolish") {
      if (carType === "hatchback") {
        calculatedprice = "₹799";
      } else if (carType === "sedan") {
        calculatedprice = "₹899";
      } else if (carType === "compact-suv") {
        calculatedprice = "₹899";
      } else if (carType === "SUV-5-seater") {
        calculatedprice = "₹999";
      } else if (carType === "SUV-7-seater") {
        calculatedprice = "₹999";
      }
    }
  }
  pricingField.value = calculatedprice;
});
document.getElementById("price").value = document.getElementById("price_display").value;

const inputElement = document.querySelector('.error-message')
document.getElementById("bookingForm").addEventListener("submit",  async function (e) {
  e.preventDefault()
  document.getElementById("price").value = document.getElementById("price_display").value;
  let isValid = true;
  function validateField(fieldId, errorMessageId, condition = true) {

    const field = document.getElementById(fieldId);
    const errorMessage = document.getElementById(errorMessageId);
    if (!field.value.trim() || !condition) {
      field.classList.add("error");
      errorMessage.style.display = "inlie";
      isValid = false;
    } else {
      field.classList.remove("error-message");
      errorMessage.style.display = "none";
    }
  }
  validateField("name", "nameError");
  validateField("phone", "phoneError", /^\d{10}$/.test(document.getElementById("phone").value));
  validateField("address", "addressError");
  validateField("city", "cityError");
  validateField("bookingDate", "bookingDateError");
  if (!validateCheckBoxes()) {
    return;
  }

  if(isValid){
    const formData = new FormData(e.target);

      try {
        const response =  await fetch(`https://script.google.com/macros/s/AKfycbyb1MljZBoHGvnLjTpIXBfUWaf2ezAR-bSjunc1yrA_dncLGhO_lMbYdCQHvDB4hiqg/exec`, {
          method: "POST",
          body: formData,
        });
    
        if (response.ok) {
          const result = await response.text();
          alert(result); // Show a success message
          window.location.href = "https://swassh.com/"; // Redirect to another page
        } else {
          alert("Form submission failed. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred. Please try again.");
      }
  }
})


