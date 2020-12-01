import './App.css';
import HeaderContainer from "./components/Header/HeaderContainer"
import NavbarContainer from "./components/Navbar/NavbarContainer"
import News from "./components/News/News"
import Login from "./components/Login/Login"
import Music from "./components/Music/Music"
import UsersContainer from "./components/Users/UsersContainer"
import Settings from "./components/Settings/Settings"
import {Route, Switch, Redirect} from "react-router-dom"
import React from "react";
import {initializeApp} from "./redux/appReducer"
import {connect} from "react-redux"
import Preloader from "./components/common/Preloader/Preloader"


const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

class App extends React.Component {
    
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <div style={{textAlign: "center"}}><Preloader /></div>
        }
        return (
            <div className="app-wrapper">
                <HeaderContainer />
                <NavbarContainer />
                <div className="app-wrapper-content">
                    <Switch>
                        <Route exact path="/" render={() =>
                            <Redirect to={"/profile"}/>}/>
                        <Route path="/profile/:userId?" render={() =>
                            <React.Suspense fallback={<div>Загрузка...</div>}>
                                <ProfileContainer />
                            </React.Suspense>}/>
                        <Route path="/messages" render={() =>                  
                            <React.Suspense fallback={<div>Загрузка...</div>}>
                                <DialogsContainer/>
                            </React.Suspense>}/>
                        <Route path="/news" render={() =>
                            <News/>}/>
                        <Route path="/music" render={() =>
                            <Music/>}/>
                        <Route path="/users" render={() =>
                            <UsersContainer/>}/>
                        <Route path="/settings" render={() =>
                            <Settings/>}/>
                        <Route path="/login" render={() =>
                            <Login />}/>    
                        <Route path="*" render={() =>
                            <div>404 NOT FOUND</div>}/> 
                    </Switch>      
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

export default connect(mapStateToProps, {initializeApp})(App)

