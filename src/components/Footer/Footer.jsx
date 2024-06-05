import React from "react";
import style from "./Footer.module.css";

const handleDragStart = (event) => {
  event.dataTransfer.setData("text/plain", "");
};
const handleDragEnd = (event) => {
  const x = event.clientX - event.target.offsetWidth / 2;
  event.target.style.position = "absolute";
  event.target.style.left = `${x}px`;
  event.target.style.animationPlayState = "running";
};

const Footer = () => {
  return (
    //footer for my highline heaven website about highlineing and the products you can buy
    <footer className={style.footer}>
      <div className={style.slackManContainer}>
        <div
          className={style.slackMan}
          draggable="true"
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          🚶‍♂️
        </div>
      </div>
      <div className={style.columnsTop}>
        <div className={style.column}>
          <h3>Over ons</h3>
          <h5>
            Ontdek meer over onze passie voor highline- en
            slackline-activiteiten en waarom wij dé specialisten zijn in
            outdoor-avontuur.
          </h5>
          <p>Missie en visie</p>
          <p>Ons team</p>
          <p>Onze locaties</p>
          <p>Duurzaamheid en milieubewustzijn</p>
        </div>

        <div className={style.column}>
          <h3>Producten</h3>
          <h5>
            Verken ons uitgebreide assortiment aan hoogwaardige highline- en
            slackline-uitrusting voor alle niveaus en behoeften.
          </h5>
          <p>Slacklines</p>

          <p>Highlines</p>

          <p>Veiligheidsuitrusting</p>

          <p>Accessoires</p>
        </div>

        <div className={style.column}>
          <h3>Klantenservice</h3>
          <h5>
            We zijn hier om je te helpen en ondersteunen bij al je vragen en
            behoeften.
          </h5>
          <p>Bestel- en verzendinformatie</p>
          <p>Retourbeleid en garantie</p>
          <p>Betaalmethoden</p>
          <p>Veelgestelde vragen (FAQ)</p>
          <p>Contacteer ons</p>
        </div>
      </div>

      <div className={style.columnsLow}>
        <div className={style.column}>
          <h3>Inspiratie en Informatie</h3>
          <h5>
            Ontdek nuttige tips, trucs en inspirerende verhalen om het meeste
            uit je highline- en slackline-ervaring te halen.
          </h5>
          <p>Blog</p>
          <p>Klantenverhalen en recenties</p>
          <p>Evenementen en workshops</p>
          <p>Veiligheidsgidsen en tutorials</p>
        </div>

        <div className={style.column}>
          <h3>Volg Ons</h3>
          <h5>
            Blijf op de hoogte van het laatste nieuws, aanbiedingen en avonturen
            door ons te volgen op sociale media:
          </h5>
          <p>Facebook</p>
          <p>Instagram</p>
          <p>YouTube</p>
          <p>Twitter</p>
        </div>
      </div>
      <div className={style.SignIn}>
        <h5>
          Meld je aan voor onze nieuwsbrief Ontvang exclusieve aanbiedingen,
          productupdates en avonturen rechtstreeks in je inbox.
        </h5>
      </div>
      <div className={style.At}>
        <h2>© HighLine Heaven</h2>
      </div>
    </footer>
  );
};

export default Footer;
