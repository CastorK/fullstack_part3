(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,n,t){e.exports=t(39)},21:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(13),c=t.n(o),i=(t(21),t(2)),u=function(e){var n=e.persons,t=e.setFilteredPersons,o=Object(a.useState)(""),c=Object(i.a)(o,2),u=c[0],l=c[1];return r.a.createElement("div",null,r.a.createElement("h3",null,"Rajaa n\xe4ytett\xe4vi\xe4"),r.a.createElement("input",{value:u,onChange:function(e){var a=e.target.value.toLowerCase();l(a),t(n.filter(function(e){return e.name.toLowerCase().includes(a)}))}}))},l=t(14),s=t(3),f=t.n(s),m="/api/persons",d=function(){return f.a.get(m).then(function(e){return e.data})},b=function(e){return f.a.post(m,e).then(function(e){return e.data})},p=function(e){return f.a.put("".concat(m,"/").concat(e.id),e).then(function(e){return e.data})},h=function(e){return f.a.delete("".concat(m,"/").concat(e)).then(function(e){return e})},v=function(e){var n=Object(a.useState)(""),t=Object(i.a)(n,2),o=t[0],c=t[1],u=Object(a.useState)(""),s=Object(i.a)(u,2),f=s[0],m=s[1],d=function(n,t){e.setPersonsAndFilteredPersons(n),e.showNotification(t?"Added ".concat(o):"Updated ".concat(o),"success"),c(""),m("")};return r.a.createElement("div",null,r.a.createElement("h3",null,"Lis\xe4\xe4 uusi"),r.a.createElement("form",{onSubmit:function(n){n.preventDefault();var t={name:o,number:f};if(e.persons.some(function(e){return e.name===t.name})){var a="".concat(t.name," is already added to phonebook. Do you want to replace the old number with ").concat(t.number,"?");if(window.confirm(a)){var r=e.persons.find(function(e){return e.name===t.name});p(Object(l.a)({},r,{name:t.name,number:t.number})).then(function(n){return d(e.persons.map(function(e){return e.id!==n.id?e:n},!1))}).catch(e.showNotification("Person ".concat(t.name," not found!"),"fail"))}}else b(t).then(function(n){var t=e.persons.concat(n);d(t,!0)}).catch(function(n){e.showNotification("".concat(n.response.data.error),"fail")})}},r.a.createElement("div",null,"nimi: ",r.a.createElement("input",{onChange:function(e){return c(e.target.value)},value:o}),r.a.createElement("br",null),"numero: ",r.a.createElement("input",{onChange:function(e){return m(e.target.value)},value:f})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"lis\xe4\xe4"))))},E=function(e){var n=e.filteredPersons,t=e.removePerson,a=e.showNotification;return r.a.createElement("div",null,r.a.createElement("h3",null,"Numerot"),r.a.createElement("ul",null,n.map(function(e){return r.a.createElement("li",{key:e.id},e.name," ",e.number," ",r.a.createElement("button",{onClick:function(){return function(e){window.confirm("Are you sure you want to delete ".concat(e.name))&&h(e.id).then(function(n){t(e.id),a("Successfully removed ".concat(e.name),"success")}).catch(a("Removing ".concat(e.name," failed"),"fail"))}(e)}},"Delete"))})))},w=function(e){var n=e.notification;if(!n.msg)return null;var t={background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10};switch(n.type){case"success":t.color="green";break;case"fail":t.color="red";break;default:t.color="blue"}return r.a.createElement("div",{style:t,className:"notification"},n.msg)},g=function(){var e=Object(a.useState)([]),n=Object(i.a)(e,2),t=n[0],o=n[1],c=Object(a.useState)(t),l=Object(i.a)(c,2),s=l[0],f=l[1],m=Object(a.useState)({msg:"",type:""}),b=Object(i.a)(m,2),p=b[0],h=b[1],g=function(e){o(e),f(e)},y=function(e,n){h({msg:e,type:n}),setTimeout(function(){h({msg:"",type:""})},3e3)};return Object(a.useEffect)(function(){d().then(function(e){g(e)})},[]),r.a.createElement("div",null,r.a.createElement("h2",null,"Puhelinluettelo"),r.a.createElement(w,{notification:p}),r.a.createElement(u,{persons:t,setFilteredPersons:f}),r.a.createElement(v,{persons:t,setPersonsAndFilteredPersons:g,showNotification:y}),r.a.createElement(E,{filteredPersons:s,removePerson:function(e){o(t.filter(function(n){return n.id!==e})),f(t.filter(function(n){return n.id!==e}))},showNotification:y}))};c.a.render(r.a.createElement(g,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.b6a87402.chunk.js.map