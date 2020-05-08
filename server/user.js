class User {
  constructor(
    name,
    email,
    isMP,
    mobNum,
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
    this.mobNum = mobNum;
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
