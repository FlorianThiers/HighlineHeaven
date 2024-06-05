import React, { useState, useEffect } from "react";
import style from "./Header.module.css";
import { Link } from "react-router-dom";
import ROUTES from "../../consts/Routes";
import { useProducts } from "../../Contexts/ProductContext";

const Header = () => {
  const { authService, user, products } = useProducts();
  const [categories, setCategories] = useState([]);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [topRowVisible, setTopRowVisible] = useState(false);
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    if (products.length > 0) {
      const categories = products.map((product) => product.category);
      const uniqueCategories = [...new Set(categories)];
      setCategories(uniqueCategories);
    }
  }, [products]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop =
        window.scrollY || document.documentElement.scrollTop;
      if (currentScrollTop < lastScrollTop) {
        setTopRowVisible(true);
      } else {
        setTopRowVisible(false);
      }
      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  useEffect(() => {
    const checkScroll = () => {
      setIsTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", checkScroll);

    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  return (
    <header className={style.header}>
      {isTop && (
        <div className={`${style.rowTop} ${topRowVisible ? "" : style.hidden}`}>
          <Link>
            <button>Garantie</button>
          </Link>
          <Link>
            <button>Contact</button>
          </Link>
          <Link>
            <button>Reviews</button>
          </Link>
          {user ? (
            
          <Link to={`${ROUTES.messages}`}>
            <button>Messages</button>
          </Link>
          ) : (
            <Link to={ROUTES.login}>
              <button>Messages</button>
            </Link>
          )}
        </div>
      )}

      <div className={style.rowLow}>
        <div className={style.row}>
          <div className={style.logo}>
            <Link to={ROUTES.home} className={style.header__logo}>
              Highline Heaven
            </Link>
          </div>



          <div className={style.icons}>
            {user ? (
              <Link to={ROUTES.myProducts}>
                <button>
                  <img src="/file-text.svg" alt="info" />
                </button>
              </Link>
            ) : (
              <Link to={ROUTES.login}>
                <button>
                  <img src="/file-text.svg" alt="info" />
                </button>
              </Link>
            )}
            {user ? (
              <Link to={ROUTES.profile}>
                <button>
                  <img src="/290735.png" alt="profile" />
                </button>
              </Link>
            ) : (
              <Link to={ROUTES.login}>
                <button>
                  <img src="/290735.png" alt="profile" />
                </button>
              </Link>
            )}
            {user ? (
              <Link to={ROUTES.shoppingcart}>
                <button>
                  <img src="/1413908.png" alt="shoppingcart" />
                </button>
              </Link>
            ) : (
              <Link to={ROUTES.login}>
                <button>
                  <img src="/1413908.png" alt="shoppingcart" />
                </button>
              </Link>
            )}
          </div>
        </div>
        <div className={style.bottumRow}>
          {/* styles */}
          <div className={style.rowBottum}>
            <Link to={ROUTES.home}>
              <button>Home</button>
            </Link>
            <Link to={`${ROUTES.category.to}${"0udaymb6jqtpncj"}`}>
              <button>Products</button>
            </Link>
            <Link to={ROUTES.library}>
              <button>Library</button>
            </Link>
          </div>

          {/* profile */}
          <div className={style.profile}>
            {user ? (
              <button
                className={style.logout}
                onClick={() => authService.logout()}
              >
                Logout
              </button>
            ) : (
              <Link to={ROUTES.login}>
                <button>Log in</button>
              </Link>
            )}
            {user ? <p>{user.username}</p> : <p>Guest</p>}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
