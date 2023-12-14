import React from "react";
import "./Menu.css";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();
  const navLinks = [
    // { to: "/", text: "Ծառայություններ" },
    { to: "/payment", text: "Վճարումներ" },
    { to: "/complaints", text: "Բողոքներ" },
    { to: "/users", text: "Օգտատերեր" },
    { to: "/cars", text: "Մեքենաներ" },
    // { to: "/", text: "Կարգավորումներ" },
    // { to: "/", text: "Ծառ․ կատեգորիա" },
  ];
  return (
    <div
      style={{
        width: 250 + "px",
        height:805+"px",
        marginTop:25+"px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "11px 9px 13px 0px rgba(34, 60, 80, 0.2)",
      }}
    >
      {navLinks.map((link,i) => {
       if(i===navLinks.length-1){
        return(
          <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
          isActive ? ['active', 'chlid'].join(" ") : 'chlid'
        } 
        id={'chlid'}
      >
          {link.text}
        </NavLink>
      )
        }
        return(
          <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            isActive ? ['active', 'chlid'].join(" ") : 'chlid'
          }
          >
          {link.text}
        </NavLink>
)
})}
</div>
  );
};

export default Menu;
