const $ = document.querySelector.bind(document);
function getAllStudents(){
  return JSON.parse(localStorage.getItem("students"));
}
function showStudent(){
  const tbody = $("tbody");
  const students = getAllStudents();
  const listTr = [];
  
  for(let item of students){
    const tr = document.createElement("tr");
    tr.classList.add("text-[0.75rem]");
    const id = document.createElement("td");
    id.className ="border border-slate-300";
    id.textContent = item?._id;

    const name = document.createElement("td");
    name.className ="border border-slate-300";
    name.textContent = item?._name;

    const birthdate = document.createElement("td");
    birthdate.className ="border border-slate-300";
    birthdate.textContent = item?._birthDate;

    const phone = document.createElement("td");
    phone.className ="border border-slate-300";
    phone.textContent = item?._phone;

    tr.appendChild(id);
    tr.appendChild(name);
    tr.appendChild(birthdate);
    tr.appendChild(phone);
    tbody.insertAdjacentElement("afterbegin", tr);
  }
}
showStudent();