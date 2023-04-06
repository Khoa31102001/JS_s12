import Student from "./model/Student";

const $ = document.querySelector.bind(document);
const form = $(".form");

const errorEmpty = "is not empty";
const errorFormat = "is incorrect format";

const regexCharacter = /^[a-zA-Z ]+$/;
const regexNumber = /^\d+$/;
const regexBirthDate = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const id = this.elements["id"];
  const name = this.elements["name"];
  const birthDate = this.elements["birthdate"];
  const phone = this.elements["phone"];

  let validId = true;
  let validName = true;
  let validbirthDate = true;
  let validPhone = true;

  let valueId = id.value;
  let valueName = name.value;
  let valueBirthDate = birthDate.value;
  let valuePhone = phone.value;

  let errorId = "";
  let errorName = "";
  let errorBirthDate = "";
  let errorPhone = "";

  const elementsError = document.createElement("p");
  elementsError.classList = "text-red-500 text-xs italic mt-2";

  if (validateEmpty(valueId)) {
    errorId = `Id ${errorEmpty}`;
    validId = false;
  } else if (!validRegex(regexNumber, valueId)) {
    errorId = `Id ${errorFormat}`;
    validId = false;
  }

  if (validateEmpty(valueName)) {
    errorName = `Name ${errorEmpty}`;
    validName = false;
  } else if (!validRegex(regexCharacter, valueName)) {
    errorName = `Name ${errorFormat}`;
    validName = false;
  } else if (!validateLengthName(valueName)) {
    errorName = "Name length must between 5 and 15";
    validName = false;
  }

  if (validateEmpty(valueBirthDate)) {
    errorBirthDate = `BirthDate ${errorEmpty}`;
    validbirthDate = false;
  } else if (!validRegex(regexBirthDate, valueBirthDate)) {
    errorBirthDate = `BirthDate ${errorFormat}`;
    validbirthDate = false;
  } else if (validateBirthDateAge(valueBirthDate)) {
    errorBirthDate = "Age must between 5 and 15";
    validbirthDate = false;
  }

  if (validateEmpty(valuePhone)) {
    errorPhone = `Phone ${errorEmpty}`;
    validPhone = false;
  } else if (!validRegex(regexNumber, valuePhone)) {
    errorPhone = `Phone ${errorFormat}`;
    validPhone = false;
  } else if (!validatePhoneLength(valuePhone)) {
    errorPhone = "Phone length must be ten";
    validPhone = false;
  }

  if (!validId) {
    const tmpElementsError = elementsError.cloneNode(true);
    tmpElementsError.textContent = errorId;
    id.insertAdjacentElement("afterend", tmpElementsError);
  }

  if (!validName) {
    const tmpElementsError = elementsError.cloneNode(true);
    tmpElementsError.textContent = errorName;
    name.insertAdjacentElement("afterend", tmpElementsError);
  }

  if (!validPhone) {
    const tmpElementsError = elementsError.cloneNode(true);
    tmpElementsError.textContent = errorPhone;
    phone.insertAdjacentElement("afterend", tmpElementsError);
  }

  if (!validbirthDate) {
    const tmpElementsError = elementsError.cloneNode(true);
    tmpElementsError.textContent = errorBirthDate;
    birthDate.insertAdjacentElement("afterend", tmpElementsError);
  }

  if (validId && validName && validPhone && validbirthDate) {
    let existStudent = false;
    let students = JSON.parse(localStorage.getItem("students"));
    if (students === null) {
      students = [];
    }
    for(let item of students) {
      if(item?._id == valueId){
        item._name = validName;
        item._birthDate = valueBirthDate;
        item._phone = valuePhone;
        existStudent = true;
        break;
      }
    }
    if(!existStudent){
      const student = new Student(valueId, valueName, valueBirthDate, valuePhone);
      students.push(student);
    }
    localStorage.setItem("students", JSON.stringify(students));
    const listURL = `${location.origin}/list.html`;
    location.href = listURL;
  }
});

function validRegex(regex, value) {
  return regex.test(value.trim());
}

function validateEmpty(value) {
  return !value;
}

function validateLengthName(value) {
  return (value.length < 5 || value.length > 15) ? false : true;
}

function validateBirthDateAge(value) {
  return +value <= 18 || +value > 0;
}

function validatePhoneLength(value) {
  return value.trim().length <= 10;
}