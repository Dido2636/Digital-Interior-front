import React from "react";
import { Link  } from "react-router-dom";

function Footer() {
  return (
    <div className="down">
      <div className="footer-one">
        <img src="Logo/Logo footer.svg" alt="" />
        <div className="footer-one-icone">
          <img src="Icone Footer/ballon .svg" alt="" />
          <img src="Icone Footer/Behance.svg" alt="" />
          <img src="Icone Footer/instagram.svg" alt="" />
          <img src="Icone Footer/linkedin.svg" alt="" />
        </div>
      </div>

      <div className="footer-two">
        <div>
          <h5 className="footer-explore">
            Voulez-vous être recontacter par notre décorateur?
          </h5>
        </div>
        <div>
          <form className="subscribe">
            <input
              className="input-update"
              placeholder="Votre adresse Email"
              type="text"
              id="email"
              name="Email"
            />
          </form>
        </div>
        <button className="btn-update-details">
          Envoyer <img className="button-arrow" src="flechebouton.svg" alt="" />
        </button>
      </div>

      <div className="footer-contact">
        <h5 className="contact-footer">Contact</h5>
        <div className="footer-location">
          <h5>66 Road Broklyn Street, 600</h5>
        </div>
        <div className="footer-call">
          <h5>(509) 562-1912</h5>
        </div>
        <div className="footer-sms">
          <h5>contact@creativedesign.com</h5>
        </div>
      </div>

      <div className="footer-four">
        <h5 className="footer-explore-menu">Menu</h5>
        <div className="footer-about">
          <Link className="footer-explore" to={""}>About</Link>
          <Link className="footer-explore" to={"/users/login"}>Client</Link>
          <Link className="footer-explore" to={"/decorator/login"}>Decorateur</Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
