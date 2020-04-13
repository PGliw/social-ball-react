(this["webpackJsonpsocial-ball-react"]=this["webpackJsonpsocial-ball-react"]||[]).push([[0],{17:function(e,a,t){},22:function(e,a,t){e.exports=t(35)},27:function(e,a,t){},28:function(e,a,t){},34:function(e,a,t){},35:function(e,a,t){"use strict";t.r(a);var n=t(0),s=t.n(n),r=t(19),l=t.n(r),i=(t(27),t(9)),o=t(10),c=t(12),u=t(11),m=t(5),h=t(7);t(17),t(28);function d(e){return s.a.createElement("label",null,e.label,s.a.createElement("input",{value:e.value,name:e.name,type:e.type,onChange:function(a){return e.onChange(a)}}),s.a.createElement("div",{className:"error-message"},e.error))}var p="https://social-ball-spring.herokuapp.com",g=function(e){Object(c.a)(t,e);var a=Object(u.a)(t);function t(e){var n;return Object(i.a)(this,t),(n=a.call(this,e)).handleInputChange=function(e){var a=n.state.fields,t=e.target,s=t.name,r="hasAccepted"===s?t.checked:t.value;a[s]=r;var l=n.state.errors;switch(s){case"firstName":l.firstName=r.length<1?"Imi\u0119 nie moze by\u0107 puste!":null;break;case"lastName":l.lastName=r.length<1?"Nazwisko nie mo\u017ce by\u0107 puste!":null;break;case"email":var i=RegExp(/^(([^<>()\\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);l.email=i.test(r)?null:"To nie jest poprawny adres email";break;case"birthday":var o=new Date(r),c=new Date;c.setFullYear(c.getFullYear()-13),l.birthday=o<c?null:"\u017beby samodzielnie si\u0119 zarejestrowa\u0107 musisz mie\u0107 uko\u0144czone 13 lat";break;case"password":l.password=r.length<8?"Has\u0142o musi mie\u0107 przynajmniej 8 znak\xf3w":null;break;case"replyPassword":l.replyPassword=r===a.password?null:"Has\u0142a musz\u0105 by\u0107 identyczne";break;case"hasAccepted":l.hasAccepted=r?null:"Zgoda jest wymagana"}n.setState({fields:a,errors:l,isSubmitButtonEnabled:null===l.firstName&&null===l.lastName&&null===l.email&&null===l.password&&null===l.birthday&&null===l.replyPassword&&null===l.hasAccepted})},n.renderErrorMessage=function(e){return e?s.a.createElement("div",{className:"error-message"},e):null},n.onSubmit=function(e){e.preventDefault();var a=n.state.fields;fetch("".concat(p,"/users"),{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({id:Math.floor(1e3*Math.random()),firstName:a.firstName,lastName:a.lastName,dateOfBirth:new Date(a.birthday).toISOString().split("T")[0],password:a.password,email:a.email,username:a.email})}).then((function(e){return 200===e.status&&n.setState({isRegistrationSuccessful:!0}),e.json()})).then((function(e){e.message&&alert(e.message)}))},n.state={fields:{hasAccepted:!1},errors:{},isSubmitButtonEnabled:!1,isRegistrationSuccessful:!1},n}return Object(o.a)(t,[{key:"render",value:function(){return!0===this.state.isRegistrationSuccessful?s.a.createElement(m.a,{to:"/login"}):s.a.createElement("div",{className:"registration-card"},s.a.createElement("h1",null,"Rejestracja"),s.a.createElement("form",{onSubmit:this.onSubmit},s.a.createElement(d,{label:"Imi\u0119",name:"firstName",type:"text",value:this.state.fields.firstName||"",onChange:this.handleInputChange,error:this.state.errors.firstName}),s.a.createElement(d,{label:"Nazwisko",name:"lastName",type:"text",value:this.state.fields.lastName||"",onChange:this.handleInputChange,error:this.state.errors.lastName}),s.a.createElement(d,{label:"Data urodzenia",name:"birthday",type:"date",value:this.state.fields.birthday||"",onChange:this.handleInputChange,error:this.state.errors.birthday}),s.a.createElement(d,{label:"Adres e-mail",name:"email",type:"email",value:this.state.fields.email||"",onChange:this.handleInputChange,error:this.state.errors.email}),s.a.createElement(d,{label:"Has\u0142o",name:"password",type:"password",value:this.state.fields.password||"",onChange:this.handleInputChange,error:this.state.errors.password}),s.a.createElement(d,{label:"Powt\xf3rz has\u0142o",name:"replyPassword",type:"replyPassword",value:this.state.fields.replyPassword||"",onChange:this.handleInputChange,error:this.state.errors.replyPassword}),s.a.createElement("label",null,s.a.createElement("input",{type:"checkbox",name:"hasAccepted",checked:this.state.fields.hasAccepted,onChange:this.handleInputChange}),"Akceptuj\u0119 warunki regulaminu (wymagane)",this.renderErrorMessage(this.state.errors.hasAccepted)),s.a.createElement("input",{type:"submit",value:"Zarejestruj si\u0119",disabled:!this.state.isSubmitButtonEnabled}),s.a.createElement("p",null,"Masz ju\u017c konto? ",s.a.createElement(h.b,{to:"/"},"Przejd\u017a do logowania"))))}}]),t}(s.a.Component),b=function(e){Object(c.a)(t,e);var a=Object(u.a)(t);function t(e){var n;return Object(i.a)(this,t),(n=a.call(this,e)).handleInputChange=function(e){var a=n.state.fields,t=e.target,s=t.name,r="keepLoggedIn"===s?t.checked:t.value;a[s]=r;var l=n.state.errors;switch(s){case"email":var i=RegExp(/^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i);l.email=i.test(r)?null:"To nie jest poprawny adres email";break;case"password":l.password=r.length<8?"Has\u0142o musi mie\u0107 przynajmniej 8 znak\xf3w":null}n.setState({fields:a,errors:l,isSubmitButtonEnabled:null===l.email&&null===l.password})},n.onSubmit=function(e){e.preventDefault(),fetch("".concat(p,"/token/generate-token"),{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(n.state.fields)}).then((function(e){return 200===e.status&&n.setState({isLoginSuccessful:!0}),console.log(e.status),e.json()})).then((function(e){e.message&&alert(e.message)}))},n.state={fields:{keepLoggedIn:!1},errors:{},isSubmitButtonEnabled:!1,isLoginSuccessful:!1},n}return Object(o.a)(t,[{key:"render",value:function(){return!0===this.state.isLoginSuccessful?s.a.createElement(m.a,{to:"/profile"}):s.a.createElement("div",{className:"registration-card"},s.a.createElement("h1",null,"Logowanie"),s.a.createElement("form",{onSubmit:this.onSubmit},s.a.createElement(d,{label:"Adres e-mail",type:"email",name:"email",value:this.state.fields.email||"",onChange:this.handleInputChange,error:this.state.errors.email}),s.a.createElement(d,{label:"Has\u0142o",type:"password",name:"password",value:this.state.fields.password||"",onChange:this.handleInputChange,error:this.state.errors.password}),s.a.createElement("label",null,s.a.createElement("input",{type:"checkbox",name:"keepLoggedIn",checked:this.state.fields.keepLoggedIn,onChange:this.handleInputChange}),"Nie wylogowuj mnie"),s.a.createElement("input",{type:"submit",value:"Zaloguj si\u0119",disabled:!this.state.isSubmitButtonEnabled}),s.a.createElement("p",null,"Nie masz konta? ",s.a.createElement(h.b,{to:"/register"},"Zarejestruj si\u0119!"))))}}]),t}(s.a.Component);function f(){return s.a.createElement("span",null,"Witaj na swoim profilu!")}t(34);var w=function(){return s.a.createElement("div",{className:"App"},s.a.createElement(h.a,null,s.a.createElement("div",{className:"container"},s.a.createElement(m.b,{exact:!0,path:"/",component:b}),s.a.createElement(m.b,{path:"/login",component:b}),s.a.createElement(m.b,{path:"/register",component:g}),s.a.createElement(m.b,{path:"/profile",component:f}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(w,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[22,1,2]]]);
//# sourceMappingURL=main.2cf013a8.chunk.js.map