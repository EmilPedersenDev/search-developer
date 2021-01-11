let defaultSocialLink = {
  id: '',
  github: '',
  linkedIn: ''
};

class Developer {
  constructor(id, firstname, lastname, information, socialLink, email) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.information = information;
    this.socialLink = socialLink || defaultSocialLink;
    this.email = email;
  }
}

export default Developer;
