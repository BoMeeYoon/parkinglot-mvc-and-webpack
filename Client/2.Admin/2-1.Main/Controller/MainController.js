const log = console.log;
const tag = '[MainController..js]'

import HeaderView from "../View/HeaderView.js";
import LoginView from "../View/LoginView.js"
import FooterView from "../View/FooterView.js";

import MemberController from '../../2-2.Member/Controller/MemberController.js';

import {$} from "../../../1.Common/View/ElementsHooks.js";
import {authorize} from "../../../1.Common/Model/Auth.js";
import {login, logout} from '../Model/LoginModel.js'

export default class MainController {
    constructor() {
        const headerViewEl = $("#header");
        const loginViewlEl = $("#modal");
        const footerViewEl = $("#footer");

        this.headerView = new HeaderView(headerViewEl)
            .on("@logout", e => this.logoutHandler())
            .on("@changePage", e => this.goin(e.detail.pageName))
        this.loginView = new LoginView(loginViewlEl)
            .on("@login", e => this.loginHandler(e.detail))
        this.footerView = new FooterView(footerViewEl);

        this.authHandler();
    }
    authHandler() {
        const _auth = authorize();
        _auth === "login" ? this.login() : this.goin()
    }
    login() {

        this.headerView.init("입출차관리", "LOGIN");
        this.loginView.init();

    }
    goin(pageName = "goMember") {
        switch(pageName) {
            case "goMember" : 
                this.headerView.init("입출차관리", "LOGOUT");
                new MemberController();
                break;
            case "goParking" :
                location.assign('/parking/main');
                break;
            }
    }
    loginHandler = ({id, pw}) => {
        this.loginView.bindRemove();
        this.headerView.bindRemove();
        login(id, pw);
        
        this.goin("goMember");
        
    }
    logoutHandler() {
        this.headerView.bindRemove();
        this.sectionRemoveHandler();
        logout();
        this.login();
    }
    sectionRemoveHandler() {
        const menuViewEl = $("#menu");
        const contentEl = $("#content");

        if(!menuViewEl.firstChild) return this;
        while(menuViewEl.firstChild) {
            menuViewEl.firstChild.remove(menuViewEl.firstChild)
        };
        if(!contentEl.firstChild) return this;
        while(contentEl.firstChild) {
            contentEl.firstChild.remove(contentEl.firstChild)
        };
    }
    
}
