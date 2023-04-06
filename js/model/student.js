class Student {
  constructor(id, name, birthDate, phone) {
    this.id = id;
    this.name = name;
    this.birthDate = birthDate;
    this.phone = phone;
  }
  get id() {
    return this._id;
  }
  set id(id) {
    this._id = id;
  }

  get name() {
    return this._name;
  }
  set name(name) {
    this._name = name;
  }

  get phone() {
    this._phone = phone;
  }

  set phone(phone) {
    this._phone = phone;
  }

  get birthDate() {
    this._birthDate = birthDate;
  }

  set birthDate(birthDate) {
    this._birthDate = birthDate;
  }
}

export default Student;