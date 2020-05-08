class User {
  constructor(
    name,
    email,
    isMP,
    phone,
    IC,
    profPic,
    intro,
    gender,
    age,
    ADUN,
    isPrivate
  ) {
    this.name = name;
    this.email = email;
    this.isMP = isMP;
    this.phone = phone;
    this.IC = IC;
    this.profPic = profPic;
    this.intro = intro;
    this.gender = gender;
    this.age = age;
    this.ADUN = ADUN;
    this.isPrivate = isPrivate;
  }
}
module.exports = User;
