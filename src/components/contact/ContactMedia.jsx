const ContactMedia = ({ avatar, name, lastName }) => {
  const fullName = `${name.toUpperCase()} ${lastName.toUpperCase()}`;

  return (
    <>
      <div className="contact-media">
        <img className="contact-media_avatar" src={avatar.picture} alt="" />
        <h2 className="contact-media_fullname">{fullName}</h2>
      </div>
    </>
  );
};

export default ContactMedia;
