
function validateForm() {
  let isValid = true;

  // Define the required fields
  const requiredFields = [
    { id: 'name', messageId: 'nameError' },
    { id: 'phone', messageId: 'phoneError' },
    { id: 'city', messageId: 'cityError' },
    { id: 'address', messageId: 'addressError' },
    { id: 'bookingDate', messageId: 'bookingDateError' },
    { id: 'agree', messageId: 'agreeError' },
    { id: 'agree2', messageId: 'agree2Error' }
  ];

  requiredFields.forEach(field => {
    const inputElement = document.getElementById(field.id);
    const errorElement = document.getElementById(field.messageId);

    if (inputElement.type === 'checkbox') {
      if (!inputElement.checked) {
        errorElement.style.display = 'inline';
        isValid = false;
      } else {
        errorElement.style.display = 'none';
      }
    } else {
      if (!inputElement.value.trim()) {
        inputElement.classList.add('input-error'); // Add error class
        errorElement.style.display = 'inline';
        isValid = false;
      } else {
        inputElement.classList.remove('input-error'); // Remove error class
        errorElement.style.display = 'none';
      }
    }
  });

  const checkboxGroups = [
    { name: 'time', errorMessageId: 'timeError' },
    { name: 'package', errorMessageId: 'packageError' },
    { name: 'carType', errorMessageId: 'carTypeError' }
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
let timeSlot;
let package;
let pricingField;
let carType;
let price;

// Dynamic form data
document.getElementById("bookingForm").addEventListener("change", function (e) {
  e.preventDefault();

  validateForm()
  package = document.querySelector('input[name="package"]:checked')?.value;
  pricingField = document.getElementById("price_display");
  carType = document.querySelector('input[name="carType"]:checked')?.value;
  timeSlot = document.querySelector('input[name="time"]:checked')?.value;

  price = "";
  console.log(package, carType, timeSlot);
  if (package && carType) {
    if (package === "quickshine") {
      if (carType === "hatchback") {
        price = "₹349";
      } else if (carType === "sedan") {
        price = "₹399";
      } else if (carType === "compact-suv") {
        price = "₹399";
      } else if (carType === "SUV-5-seater") {
        price = "₹449";
      } else if (carType === "SUV-7-seater") {
        price = "₹449";
      }
    } else if (package === "deepCleaning") {
      if (carType === "hatchback") {
        price = "₹799";
      } else if (carType === "sedan") {
        price = "₹999";
      } else if (carType === "compact-suv") {
        price = "₹999";
      } else if (carType === "SUV-5-seater") {
        price = "₹1199";
      } else if (carType === "SUV-7-seater") {
        price = "₹1399";
      }
    } else if (package === "rubbingPolishing") {
      if (carType === "hatchback") {
        price = "₹1399";
      } else if (carType === "sedan") {
        price = "₹1599";
      } else if (carType === "compact-suv") {
        price = "₹1599";
      } else if (carType === "SUV-5-seater") {
        price = "₹1799";
      } else if (carType === "SUV-7-seater") {
        price = "₹1799";
      }
    } else if (package === "windshieldPolish") {
      if (carType === "hatchback") {
        price = "₹799";
      } else if (carType === "sedan") {
        price = "₹899";
      } else if (carType === "compact-suv") {
        price = "₹899";
      } else if (carType === "SUV-5-seater") {
        price = "₹999";
      } else if (carType === "SUV-7-seater") {
        price = "₹999";
      }
    }
  }
  pricingField.value = price;
});

const inputElement = document.querySelector('.error-message')

document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();
 
    const agreeCheckbox = document.getElementById("agree");
    if (!agreeCheckbox.checked) {
      alert("You must agree to the terms and conditions.");
      return;
    }

    const objData = {
      Name: userName.value,
      "phone no.": contact.value,
      "city" : city.value,
      "Address": address.value,
      "booking-date": bookDate.value,
      "time-Slot": timeSlot,
      "package": package,
      "car-variant": carType,
      "price": pricingField.value,
    };
    console.log(objData);

    Email.send({
      Host: "smtp.elasticemail.com",
      Username: "email",
      Password: "fillyourpasswordhere",
      To: "info@swassh.com",
      From: "info@swassh.com",
      Subject: "This is the subject",
      Body: objData,
    }).then((message) => {
      // Show the modal
      console.log(message)
    });

    const modal = document.getElementById("thankYouModal");
      const span = document.getElementsByClassName("close")[0];
      
      modal.style.display = "block";

      // Close the modal when the user clicks on <span> (x)
      span.onclick = function() {
        modal.style.display = "none";
      }

      // Close the modal when the user clicks anywhere outside of the modal
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
    this.reset()
  }
);
