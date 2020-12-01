import s from "./Header.module.css"
import {NavLink} from "react-router-dom"

// если 2 класса то в класс нейм: {`${s.item} ${s.active}`}

function Header(props) {
	return (
	  <header className={s.header}>
        <img src="https://riki.dotabuff.com/t/l/jGcY67ky8a.png"/>

        <div className={s.loginBlock}>
        	{props.isAuth ? <div className={s.log}>
        		<div className={s.login}>
	        		{props.login}
        		</div>
        		<div className={s.logout} onClick={props.logout}>
        			Log out
        		</div>
        	</div>
        		: <NavLink to={`/login`}>Login</NavLink>}
        </div>
      </header>
    )
}

export default Header