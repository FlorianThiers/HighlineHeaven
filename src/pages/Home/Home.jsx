import React from "react";
import style from "./Home.module.css";
import { Link } from "react-router-dom";
import ROUTES from "../../consts/Routes";

const Home = () => {

  return (
    <div className={style.container}>
      <h1>Home</h1>
      <div className={style.product}>
        <img src="/image.png" alt="slack" />
        <div className={style.productInfo}>
          <h3>Gibbon Slackline 'Flowline Treewear'</h3>
          <p>
            De Gibbon Flowline "Treewear" is slechts 2,5 cm breed in plaats van
            5 cm, zoals gebruikelijk bij de beuglijnen. De afzonderlijke zijden
            van de lijn zijn verschillend gekleurd om verdraaien van de tape
            tijdens de montage te voorkomen. De beuglijn kenmerkt zich door een
            zeer lage rekwaarde. Als gevolg hiervan is het al met heel weinig
            spanning en op zeer lage hoogtes kan worden gebruikt … voor
            beginners. Ook de kracht die nodig is bij het spannen met de
            dubbelgetande ratel is laag. Vanwege de kleinere bandbreedte heeft
            de ratel ook plaatshouders, afstandhouders genoemd, zodat de lijn
            toch stevig en veilig kan worden opgespannen.
          </p>
          <Link to={`${ROUTES.detail.to}${"e6p8litbkkt6mxa"}`}>
            <button>See more</button>
          </Link>
        </div>
      </div>
      <div className={style.productL}>
        <img src="/image2.png" alt="slack" />
        <div className={style.productInfoR}>
          <h3>Gibbon Slackline-set 'Hal'</h3>
          <p>
            De Gibbon Slackline Halen-set maakt indruk met hoogwaardige
            afwerking en componenten en is zelfs bestand tegen hoge belastingen.
            Het Gibbon Slack Frame biedt de ideale houvast voor de slackline:
            openingen in 3 verschillende hoogtes in het slack frame zorgen
            ervoor dat de slackline opgehangen kan worden op 30 cm, 50 cm en 70
            cm. Hierdoor kunt u de lengte snel aanpassen aan de betreffende
            leeftijdsgroep.
          </p>
          <Link to={`${ROUTES.detail.to}${"psscztb2ur00vmb"}`}>
            <button>See more</button>
          </Link>
        </div>
      </div>
      <div className={style.product}>
        <img src="/image1.png" alt="slack" />
        <div className={style.productInfo}>
          <h3>Slackers Boombeschermingsset 'Tree Huggerz XXL'</h3>
          <p>
            De boombeschermingsset "Tree Huggerz" is in een paar eenvoudige
            stappen aan te brengen. Leg hem eenvoudig om de boom en zet hem vast
            met de klittenbandsluitingen. Lussen op de boombeschermer voorkomen
            dat de lijn naar beneden glijdt.
          </p>
          <Link to={`${ROUTES.detail.to}${"co0fac67z0yqnfy"}`}>
            <button>See more</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
