if (typeof dashboardConfig === "undefined") {

    var dbApp = document.getElementById("db-app");
    dbApp.innerHTML = '<div><strong>Error!</strong> Please add a <strong>config.js</strong> file to the project. <br /><br />' +
                      'Go to <a href="https://github.com/papa-ogen/cravenDashBoard/blob/master/README.md" target="self">DashBoard on GitHub</a> for more information and correct syntax.</div>';
    dbApp.className += " db-error";

} else {

    (function (config) {
        "use strict";

        var c = document.getElementById("db-links-container");
        var id = "toggle-";
        var linkCount = 0;
        var credentialCount = 0;
        var cols = {
            col1: _createElement ("div", { classList: "db-size-1of2" }, c),
            col2: _createElement ("div", { classList: "db-size-1of2" }, c) 
        }

        config.forEach(addMarkup);

        function addMarkup (element, index) {
            var mainCol = index % 2 ? cols.col2 : cols.col1;
            var col = _createElement ("div", { classList: "db-size-1of1 db-links-collection" }, element.col !== undefined ? cols[element.col] : mainCol);
            var subCol = _createElement ("div", { classList: "db-grid-content" }, col);
            var header = _createElement ("header", { classList: "db-links-header " + setHeaderColor(index) }, subCol);
            var title = _createElement ("h2", { text: element.title }, header);
            var linkList = _createElement ("ul", { classList: "db-links" }, subCol);

            for(var i=0; i < element.credentials.length; i++) {
                var li = _createElement ("li", {}, linkList);
                var label = _createElement ("label", { attr: [ [ "for", id+linkCount ] ] }, li);
                var h4 = _createElement ("h4", { text: element.credentials[i].name }, label);
                var expanded = element.expanded !== undefined && element.expanded || false;
                var checkbox = _createElement ("input", { classList: "db-toggle", attr: [ [ "type", "checkbox", expanded ], [ "id", id+linkCount ] ] }, li);
                var details = _createElement ("div", { classList: "db-details" }, li);
                var descr = _createElement ("summary", { text: element.credentials[i].descr, classList: "db-descr" }, details);
                var links = _createElement("ul", {}, details);

                addLinks(links, element.credentials[i]);

                linkCount++;
            }

        }

        function addLinks (linkList, credentials) {

            var li, label, ahref, input, url, username, password;

            if(credentials.url !== undefined) {
                for(var i=0; i < credentials.url.length; i++) {
                    url = credentials.url[i];

                    if(url) {
                        li = _createElement("li", {}, linkList);
                        label = _createElement("label", { text: "URL" }, li);
                        ahref = _createElement("a", { text: url, attr: [ [ "href", url ], [ "target", "self" ] ] }, li);
                    }
                }
            }

            if(credentials.username !== undefined && credentials.username)  {
                username = credentials.username;

                li = _createElement ("li", {}, linkList);

                label = _createElement ("label", {
                    text: "Username",
                    attr: [ [ "for", "name"+credentialCount ] ]
                }, li);

                input = _createElement ("input", {
                    attr: [ [ "type", "text" ], [ "id", "name"+credentialCount ], [ "value", username ] ]
                }, li);

                input.addEventListener("focus", selectIinputValue);

                credentialCount++;
            }

            if(credentials.password !== undefined && credentials.password) {
                password = credentials.password;

                li = _createElement ("li", {}, linkList);

                label = _createElement ("label", {
                    text: "Password",
                    attr: [ [ "for", "name"+credentialCount ] ]
                }, li);

                input = _createElement ("input", {
                    attr: [ [ "type", "password" ], [ "id", "name"+credentialCount ], [ "value", password ] ]
                }, li);

                input.addEventListener("focus", togglePassword);
                input.addEventListener("blur", togglePassword);

                credentialCount++;
            }
        }

        function selectIinputValue(e) {
            e.preventDefault;

            var text = e.target.value;
            e.target.select();
        }

        function togglePassword(e) {
            var input = e.target;

            input.type = input.type === "text" ? "password" : "text";

            if(e.type === "focus") input.select();
        }
        /*
            Create a HTML Object dynamically
            Example: 
            var obj = {
                classList: "class1 class2",
                attr: [ ["id", "123"], ["name", "test"] ]
            };
            var e = createElement("div", obj, li);
        */
        function _createElement (element, obj, parent, insertBefore) {
            var e = document.createElement(element);

            if(obj.text) {
                var t = document.createTextNode(obj.text);
                e.appendChild(t);
            }

            if(obj.classList) {
                e.classList = obj.classList;
            }

            if(obj.attr) {
                obj.attr.forEach(function (attr) {

                    if(attr[0] === "type" && attr[1] === "checkbox") {
                        e.checked = attr[2];
                    }
                    
                    e.setAttribute(attr[0], attr[1]);
                
                });
            }

            if(insertBefore) {
                parent.insertBefore(e, parent.children[0]);
            } else {
                parent.appendChild(e);
            }

            return e;
        }

        function setHeaderColor(index) {

            switch(index) {
                case 0:
                default:
                    return "db-header-color-blue";
                case 1:
                case 4:
                    return "db-header-color-green";
                case 2:
                case 5:
                    return "db-header-color-yellow";   
                case 3:
                case 6:
                    return "db-header-color-red";                                       
            }
        }

    })(dashboardConfig);
}