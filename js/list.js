const $ = document.querySelector.bind(document);
const login = $(".login");
const loginForm = $(".login-form");
const logout = $(".logout");
function getAllStudents() {
  return JSON.parse(localStorage.getItem("students"));
}
function showStudent() {
  const tbody = $("tbody");
  const students = getAllStudents();

  for (let item of students) {
    const tr = document.createElement("tr");
    tr.classList.add("text-[0.75rem]");
    const id = document.createElement("td");
    id.className = "border border-slate-300";
    id.textContent = item?._id;

    const name = document.createElement("td");
    name.className = "border border-slate-300";
    name.textContent = item?._name;

    const birthdate = document.createElement("td");
    birthdate.className = "border border-slate-300";
    birthdate.textContent = item?._birthDate;

    const phone = document.createElement("td");
    phone.className = "border border-slate-300";
    phone.textContent = item?._phone;

    tr.appendChild(id);
    tr.appendChild(name);
    tr.appendChild(birthdate);
    tr.appendChild(phone);
    tbody.insertAdjacentElement("afterbegin", tr);
  }
}
showStudent();

function fakeDataAdmin() {
  let accounts = JSON.parse(localStorage.getItem("admin"));
  if (accounts === null) {
    accounts = [
      { name: 'admin', password: 'Aa@123456' },
      { name: 'admin2', password: 'admin123admin' }
    ];

  }
  localStorage.setItem("admin", JSON.stringify(accounts));

}
fakeDataAdmin();
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let isLogin = false;

  const name = this.elements["name"];
  const password = this.elements["password"];

  const valueName = name.value.trim();
  const valuePassword = password.value.trim();

  const accounts = JSON.parse(localStorage.getItem("admin"));

  for (const item of accounts) {
    if (item?.name == valueName && item?.password == valuePassword) {
      isLogin = true;
      break;
    }
  }
  if (isLogin) {
    login.classList.add("hidden");
    logout.classList.remove("hidden");
    localStorage.setItem("logout", "false");
  }
});

logout.addEventListener("click", function (e) {
  login.classList.remove("hidden");
  logout.classList.add("hidden");
  localStorage.setItem("logout", "true");
})

window.addEventListener("DOMContentLoaded", function(){
  if(localStorage.getItem("logout")){
    login.classList.remove("hidden");
    logout.classList.add("hidden");
  }
});