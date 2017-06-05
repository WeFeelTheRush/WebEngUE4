webpackJsonp([0,2],{

/***/ 118:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Definition für die Steuerungselemente eines Gerätes
 */
var ControlUnit = (function () {
    function ControlUnit() {
        /**
         * Aktueller Wert dieses ControlUnit
         * @type {number}
         */
        this.current = -1;
        /**
         * Minimaler Wert für dieses Steuerungslement (wir nur bei Kontinuierlichem Typ benötigt)
         * Legen Sie mit diesem Wert den minimalen Wert für eine Eingabe fest, um eine Falscheingabe zu verhindern
         *
         * @type {number}
         */
        this.min = -1;
        /**
         * Maximaler Wert für dieses Steuerungslement (wir nur bei Kontinuierlichem Typ benötigt)
         * Legen Sie mit diesem Wert den maximalen Wert für eine Eingabe fest, um eine Falscheingabe zu verhindern
         *
         * @type {number}
         */
        this.max = -1;
    }
    return ControlUnit;
}());
exports.ControlUnit = ControlUnit;
//# sourceMappingURL=controlUnit.js.map

/***/ }),

/***/ 119:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Definition eines Gerätes zur Repräsentation eines existierenden Smart Devices
 */
var Device = (function () {
    function Device() {
    }
    return Device;
}());
exports.Device = Device;
//# sourceMappingURL=device.js.map

/***/ }),

/***/ 177:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var router_1 = __webpack_require__(54);
var access_service_1 = __webpack_require__(42);
var LoginComponent = (function () {
    function LoginComponent(router, accessService) {
        this.router = router;
        this.accessService = accessService;
        this.loginError = false;
    }
    LoginComponent.prototype.onSubmit = function (form) {
        var _this = this;
        if (!form || !form.value || !form.value["username"] || !form.value["password"]) {
            this.loginError = true;
        }
        this.accessService.doLogin(form.value["username"], form.value["password"]).then(function (successfully) {
            _this.loginError = !successfully;
            if (successfully) {
                _this.router.navigate(['overview']);
            }
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'my-login',
            template: __webpack_require__(592)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, (typeof (_b = typeof access_service_1.AccessService !== 'undefined' && access_service_1.AccessService) === 'function' && _b) || Object])
    ], LoginComponent);
    return LoginComponent;
    var _a, _b;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ 178:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var access_service_1 = __webpack_require__(42);
var http_1 = __webpack_require__(73);
__webpack_require__(395);
var OptionsComponent = (function () {
    function OptionsComponent(accessService, http) {
        this.accessService = accessService;
        this.http = http;
        this.updatePasswordURL = "http://localhost:8081/updatePW";
    }
    ;
    OptionsComponent.prototype.ngOnInit = function () {
        this.updateError = false;
    };
    OptionsComponent.prototype.equalsPW = function (form) {
        if (!form || !form.value || !form.value["repeat-password"] || !form.value["new-password"]) {
            return false;
        }
        return form.value["repeat-password"] === form.value["new-password"];
    };
    OptionsComponent.prototype.onSubmit = function (form) {
        var _this = this;
        this.updateError = false;
        if (!form || !form.value || !form.value["new-password"] || !form.value["repeat-password"] || !form.value["old-password"]) {
            this.error_message = "Es wurden nicht alle benötigten Eingaben getätigt!";
            this.updateError = true;
            return;
        }
        var data = {
            old_password: form.value["old-password"],
            new_password: form.value["new-password"],
            repeat_password: form.value["repeat-password"]
        };
        this.http.post(this.updatePasswordURL, {
            old_password: form.value["old-password"],
            new_password: form.value["new-password"],
            repeat_password: form.value["repeat-password"]
        }, { headers: this.accessService.getTokenHeader() })
            .toPromise()
            .then(function (response) {
            response = response.json();
            console.log(response);
            if (response.status == 200) {
                form.reset();
                return;
            }
            switch (response["errorNum"]) {
                case 0:
                    _this.error_message = "Das alte Passwort ist nicht korrekt!";
                    _this.updateError = true;
                    break;
                case 1:
                    _this.error_message = "Passwörter stimmen nicht überein!";
                    _this.updateError = true;
                    break;
                case 2:
                    _this.error_message = "Das Passwort konnte nicht gespeichert werden!";
                    _this.updateError = true;
                    break;
            }
            return;
        });
    };
    OptionsComponent = __decorate([
        core_1.Component({
            selector: 'my-options',
            template: __webpack_require__(594)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof access_service_1.AccessService !== 'undefined' && access_service_1.AccessService) === 'function' && _a) || Object, (typeof (_b = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _b) || Object])
    ], OptionsComponent);
    return OptionsComponent;
    var _a, _b;
}());
exports.OptionsComponent = OptionsComponent;
//# sourceMappingURL=options.component.js.map

/***/ }),

/***/ 179:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var OverviewComponent = (function () {
    function OverviewComponent() {
        this.isAddDevice = false;
    }
    OverviewComponent.prototype.addDevice = function () {
        this.isAddDevice = true;
    };
    OverviewComponent.prototype.closeAddDeviceWindow = function () {
        this.isAddDevice = false;
    };
    OverviewComponent = __decorate([
        core_1.Component({
            selector: 'my-overview',
            template: __webpack_require__(596)
        }), 
        __metadata('design:paramtypes', [])
    ], OverviewComponent);
    return OverviewComponent;
}());
exports.OverviewComponent = OverviewComponent;
//# sourceMappingURL=overview.component.js.map

/***/ }),

/***/ 180:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Typen der Steuerungselemente
 */
(function (ControlType) {
    ControlType[ControlType["boolean"] = 0] = "boolean";
    ControlType[ControlType["enum"] = 1] = "enum";
    ControlType[ControlType["continuous"] = 2] = "continuous";
})(exports.ControlType || (exports.ControlType = {}));
var ControlType = exports.ControlType;
//# sourceMappingURL=controlType.js.map

/***/ }),

/***/ 276:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
__webpack_require__(603);
var core_1 = __webpack_require__(0);
var device_service_1 = __webpack_require__(43);
var router_1 = __webpack_require__(54);
var controlType_1 = __webpack_require__(180);
var DeviceDetailsComponent = (function () {
    function DeviceDetailsComponent(deviceService, route) {
        this.deviceService = deviceService;
        this.route = route;
    }
    DeviceDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.deviceService.getDevice(params['id']); })
            .subscribe(function (device) { return _this.device = device; });
    };
    DeviceDetailsComponent.prototype.isEnum = function (controlUnit) {
        return controlUnit.type === controlType_1.ControlType.enum;
    };
    DeviceDetailsComponent.prototype.isContinuous = function (controlUnit) {
        return controlUnit.type === controlType_1.ControlType.continuous;
    };
    DeviceDetailsComponent.prototype.isBoolean = function (controlUnit) {
        return controlUnit.type === controlType_1.ControlType.boolean;
    };
    DeviceDetailsComponent = __decorate([
        core_1.Component({
            selector: 'my-device-detail',
            template: __webpack_require__(589)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof device_service_1.DeviceService !== 'undefined' && device_service_1.DeviceService) === 'function' && _a) || Object, (typeof (_b = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _b) || Object])
    ], DeviceDetailsComponent);
    return DeviceDetailsComponent;
    var _a, _b;
}());
exports.DeviceDetailsComponent = DeviceDetailsComponent;
//# sourceMappingURL=device-details.component.js.map

/***/ }),

/***/ 277:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var controlType_1 = __webpack_require__(180);
var DeviceParserService = (function () {
    function DeviceParserService() {
        this.function_map = [{ id: "Heizkörperthermostat", value: drawThermometer }, {
                id: "Beleuchtung",
                value: drawBulb
            }, { id: "Webcam", value: drawCam }, { id: "Überwachungskamera", value: drawCam }, { id: "Rollladen", value: drawShutter }];
        this.update_map = [{ id: "Heizkörperthermostat", value: updateThermometer }, {
                id: "Beleuchtung",
                value: updateBulb
            }, { id: "Webcam", value: updateCam }, { id: "Überwachungskamera", value: updateCam }, {
                id: "Rollladen",
                value: updateShutter
            }];
    }
    DeviceParserService.prototype.parseDevice = function (dev) {
        var draw = this.function_map.filter(function (x) { return x.id === dev.type; })[0];
        var update = this.update_map.filter(function (x) { return x.id === dev.type; })[0];
        if (draw != null) {
            dev.draw_image = draw.value;
        }
        else if (dev.image != null) {
            dev.draw_image = addImage;
        }
        if (update != null) {
            dev.update_image = update.value;
        }
        for (var _i = 0, _a = dev.control_units; _i < _a.length; _i++) {
            var controlUnit = _a[_i];
            switch (controlUnit.type.toString()) {
                case "continuous":
                    controlUnit.type = controlType_1.ControlType.continuous;
                    break;
                case "enum":
                    controlUnit.type = controlType_1.ControlType.enum;
                    break;
                case "boolean":
                    controlUnit.type = controlType_1.ControlType.boolean;
                    break;
            }
        }
        return dev;
    };
    DeviceParserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DeviceParserService);
    return DeviceParserService;
}());
exports.DeviceParserService = DeviceParserService;
//# sourceMappingURL=device-parser.service.js.map

/***/ }),

/***/ 410:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 410;


/***/ }),

/***/ 411:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(0);
var platform_browser_dynamic_1 = __webpack_require__(496);
var app_module_1 = __webpack_require__(527);
var environment_1 = __webpack_require__(536);
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var http_1 = __webpack_require__(73);
var router_1 = __webpack_require__(54);
__webpack_require__(602);
__webpack_require__(601);
var AccessService = (function () {
    function AccessService(http, router) {
        this.http = http;
        this.router = router;
        this.token_name = "access-token";
        //TODO Passen Sie die URLs zu Ihrer REST-Schnittstelle, entsprechend der von Ihnen vorgenommenen Änderungen am Server, an
        this.loginURL = "https://localhost:8082/login";
        this.logoutURL = "https://localhost:8082/logout";
        this.statusURl = "https://localhost:8082/getStatus";
        this.token = null;
        this.server_start = new Date;
        this.failed_logins = 0;
    }
    ;
    /**
     * Aktivierungsfunktion für Guards
     * @returns {boolean}
     */
    AccessService.prototype.canActivate = function () {
        this.readToken();
        if (this.token != null) {
            return true;
        }
        else {
            this.router.navigate(['/login']);
            return false;
        }
    };
    /**
     * Liest Token vom LocalStorage und speichert diesen in this.token
     */
    AccessService.prototype.readToken = function () {
        var token = localStorage.getItem(this.token_name);
        if (token) {
            this.token = token;
        }
    };
    /**
     * Schreibt JWT in LocalStorage
     */
    AccessService.prototype.writeToken = function () {
        localStorage.setItem(this.token_name, this.token);
    };
    /**
     * Entfernt JWT aus LocalStorage
     */
    AccessService.prototype.removeToken = function () {
        localStorage.removeItem(this.token_name);
    };
    /**
     * Führt den Login mit den bereitgestellten Logindaten durch
     * @param username
     * @param password
     * @returns {Promise<TResult|boolean>|Promise<TResult2|boolean>|Promise<boolean>}
     */
    AccessService.prototype.doLogin = function (username, password) {
        var _this = this;
        return this.http.post(this.loginURL, { "username": username, "password": password }).toPromise().then(function (res) {
            res = res.json();
            if (res["status"] === 200) {
                _this.token = res["token"];
                _this.writeToken();
                _this.getServerStatus();
                return true;
            }
            return false;
        });
    };
    /**
     * Erzeugt einen http header, welcher den Token zur Authentifizierung enthält
     * @returns {any}
     */
    AccessService.prototype.getTokenHeader = function () {
        if (this.token == null) {
            return null;
        }
        var header = new http_1.Headers();
        header.append(this.token_name, this.token);
        return header;
    };
    /**
     * Führt einen Log-out für den eingeloggten Benutzer durch
     * @returns {Promise<TResult|boolean>|Promise<TResult2|boolean>|Promise<boolean>}
     */
    AccessService.prototype.doLogout = function () {
        var _this = this;
        return this.http.post(this.logoutURL, {}, { headers: this.getTokenHeader() }).toPromise().then(function (res) {
            res = res.json();
            if (res["status"] === 200) {
                _this.removeToken();
                return true;
            }
            return false;
        });
    };
    /**
     * Liest den Serverstatus (Startdatum, Anzahl der fehlgeschlagenen Log-ins) aus
     */
    AccessService.prototype.getServerStatus = function () {
        var _this = this;
        this.http.get(this.statusURl, { headers: this.getTokenHeader() }).toPromise().then(function (res) {
            res = res.json();
            if (res["status"] === 200) {
                _this.server_start = res["date"];
                _this.failed_logins = res["failed"];
            }
        });
    };
    AccessService.prototype.setToken = function (token) {
        this.token = token;
    };
    AccessService.prototype.getToken = function () {
        if (this.token) {
            return this.token;
        }
        return null;
    };
    AccessService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object])
    ], AccessService);
    return AccessService;
    var _a, _b;
}());
exports.AccessService = AccessService;
//# sourceMappingURL=access.service.js.map

/***/ }),

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var router_1 = __webpack_require__(54);
var core_1 = __webpack_require__(0);
var http_1 = __webpack_require__(73);
var access_service_1 = __webpack_require__(42);
var device_parser_service_1 = __webpack_require__(277);
__webpack_require__(395);
var common_1 = __webpack_require__(46);
var Subject_1 = __webpack_require__(33);
var DeviceService = (function () {
    function DeviceService(datePipe, activeRoute, http, parserService, accessService) {
        this.datePipe = datePipe;
        this.activeRoute = activeRoute;
        this.http = http;
        this.parserService = parserService;
        this.accessService = accessService;
        //TODO Passen Sie die URLs zu Ihrer REST-Schnittstelle, entsprechend der von Ihnen vorgenommenen Änderungen am Server, an
        this.listDevicesURL = 'http://localhost:8081/listDevices';
        this.updateDeviceURL = 'http://localhost:8081/updateDevice';
        this.deleteDeviceURL = 'http://localhost:8081/deleteDevice';
        this.createDeviceURL = 'http://localhost:8081/createDevice';
        this.connection = null;
        this.devices = null;
        this.updateRegister = new Subject_1.Subject();
    }
    /**
     * Löscht das gewünschte Gerät über die REST-Schnittstelle
     * @param device
     * @returns {Promise<TResult|boolean>|Promise<TResult2|boolean>|Promise<boolean>}
     */
    DeviceService.prototype.deleteDevice = function (device) {
        return this.http.post(this.deleteDeviceURL, { "id": device.id }, { headers: this.accessService.getTokenHeader() })
            .toPromise()
            .then(function (response) {
            response = response.json();
            if (response["status"] === 200) {
                return true;
            }
            return false;
        });
    };
    /**
     * Fügt das gewünschte Gerät über die REST-Schnittstelle hinzu
     * @param device
     * @returns {Promise<TResult|boolean>|Promise<TResult2|boolean>|Promise<boolean>}
     */
    DeviceService.prototype.createDevice = function (device) {
        return this.http.post(this.createDeviceURL, { "device": JSON.stringify(device) }, { headers: this.accessService.getTokenHeader() })
            .toPromise()
            .then(function (response) {
            response = response.json();
            if (response["status"] === 200) {
                return true;
            }
            else {
                return false;
            }
        });
    };
    /**
     * Aktualisiert das gewünschte Gerät über die REST-Schnittstelle
     * @param device
     * @returns {Promise<TResult|boolean>|Promise<TResult2|boolean>|Promise<boolean>}
     */
    DeviceService.prototype.updateDevice = function (device) {
        return this.http.post(this.updateDeviceURL, { "device": JSON.stringify(device) }, { headers: this.accessService.getTokenHeader() })
            .toPromise()
            .then(function (response) {
            response = response.json();
            if (response["status"] === 200) {
                return true;
            }
            return false;
        });
    };
    /**
     * Aktualisiert den aktuellen Zustand eines Gerätes über die REST-Schnittstelle
     * Verwendet dafür natives JavaScript
     * @param device
     * @param new_value
     * @param controlUnit
     */
    DeviceService.prototype.updateCurrent = function (device, new_value, controlUnit) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = this.stateChanged;
        request["controlUnit"] = controlUnit;
        request.open("POST", "http://localhost:8081/updateCurrent", true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.setRequestHeader("access-token", this.accessService.getToken());
        var unitId = device.control_units.indexOf(controlUnit);
        var data = "id=" + device.id + "&unitId=" + unitId + "&value=" + new_value;
        request.send(data);
    };
    /**
     * Wird bei Statusänderungen des XMLHTTPRequests aufgerufen und liest bei Abschluss die Werte aus
     * @param event
     */
    DeviceService.prototype.stateChanged = function (event) {
        var request = event.target;
        switch (request.readyState) {
            case 0:
                break; // unsent
            case 1:
                break; // opened
            case 2:
                break; // sent
            case 3:
                break; // loading
            case 4:
                if (request.status == 200) {
                    var response = JSON.parse(request.responseText);
                    if (response.status == 200) {
                        var controlUnit = request["controlUnit"];
                        controlUnit.log = response.message;
                        controlUnit.current = response.value;
                    }
                }
                break;
        }
    };
    /**
     * Öffnet einen Websocket zum Server und reagiert entsprechend auf Änderungen
     */
    DeviceService.prototype.openWebsocket = function () {
        var _this = this;
        if (this.connection != null) {
            return;
        }
        this.connection = new WebSocket("ws://localhost:8081/subscribe");
        var token = this.accessService.getToken();
        this.connection.onopen = function (event) {
            var con = event.target;
            con.send(JSON.stringify({ token: token }));
        };
        this.connection.onmessage = function (event) {
            var msg = JSON.parse(event.data);
            if (msg.method == -1 && !msg.message.includes("submitted")) {
                _this.connection.close();
                return;
            }
            // überprüfen welche der unterschiedlichen Updatemethoden verwendet wurden
            if (msg.method < 0) {
                return;
            }
            if (msg.method == 3) {
                var new_device = JSON.parse(msg.device);
                new_device = _this.parserService.parseDevice(new_device);
                _this.devices.push(new_device);
                _this.devices.slice();
                return;
            }
            // auslesen der aktualisierten Werte und speichern dieser
            var device = _this.devices.find(function (device) { return device.id === msg.deviceID; });
            switch (msg.method) {
                case 0:
                    var controlUnit = device.control_units[msg.control_unitID];
                    if (controlUnit.current != msg.value) {
                        controlUnit.current = msg.value;
                        controlUnit.log = msg.log;
                        if (controlUnit.primary && _this.activeRoute.url === "/overview") {
                            device.update_image(device.id, controlUnit.min, controlUnit.max, controlUnit.current, controlUnit.values);
                        }
                        _this.writeDeviceLog(device.id, msg.control_unitID, msg.value, msg.date);
                    }
                    break;
                case 1:
                    device.display_name = msg.value;
                    break;
                case 2:
                    _this.devices.splice(_this.devices.indexOf(device), 1);
                    break;
            }
        };
    };
    /**
     * Schreibt einen neuen Zustand eines Gerätes in den SessionStorage
     * @param id      id des Gerätes
     * @param unitId  id des Steuerungselements
     * @param value   neuer Zustand
     * @param time    Zeitpunkt der Wertänderung
     */
    DeviceService.prototype.writeDeviceLog = function (id, unitId, value, time) {
        var num = Number(sessionStorage.getItem(id + ":" + unitId));
        sessionStorage.setItem(id + ":" + unitId + ":" + num + ":value", value.toString());
        sessionStorage.setItem(id + ":" + unitId + ":" + num + ":time", this.datePipe.transform(time, "mediumTime"));
        sessionStorage.setItem(id + ":" + unitId, (num + 1) + "");
        this.updateRegister.next({ id: id, unitId: Number(unitId) });
    };
    /**
     * Liefert ein Subject zurück, welches überwacht werden kann um auf Änderungen an Gerätezuständen zu reagieren
     * @returns {Subject<{id: string, unitId: number}>}
     */
    DeviceService.prototype.getUpdateRegister = function () {
        return this.updateRegister;
    };
    /**
     * Liefert alle Geräte als Array zurück
     * @returns {Promise<any>}
     */
    DeviceService.prototype.getDevices = function () {
        var _this = this;
        return this.http.get(this.listDevicesURL, { headers: this.accessService.getTokenHeader() })
            .toPromise()
            .then(function (response) {
            var devices = response.json().message.devices;
            //parse devices from json to typescript to be usable with angular
            for (var i = 0; i < devices.length; i++) {
                devices[i] = _this.parserService.parseDevice(devices[i]);
            }
            _this.devices = devices;
            return devices;
        })
            .catch(this.handleError);
    };
    /**
     * Liefert das gewünschte Gerät zurück
     * @param id
     * @returns {Promise<Device[]>}
     */
    DeviceService.prototype.getDevice = function (id) {
        return this.getDevices()
            .then(function (devices) { return devices.find(function (device) { return device.id === id; }); });
    };
    DeviceService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    DeviceService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof common_1.DatePipe !== 'undefined' && common_1.DatePipe) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _c) || Object, (typeof (_d = typeof device_parser_service_1.DeviceParserService !== 'undefined' && device_parser_service_1.DeviceParserService) === 'function' && _d) || Object, (typeof (_e = typeof access_service_1.AccessService !== 'undefined' && access_service_1.AccessService) === 'function' && _e) || Object])
    ], DeviceService);
    return DeviceService;
    var _a, _b, _c, _d, _e;
}());
exports.DeviceService = DeviceService;
//# sourceMappingURL=device.service.js.map

/***/ }),

/***/ 526:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var router_1 = __webpack_require__(54);
var overview_component_1 = __webpack_require__(179);
var login_component_1 = __webpack_require__(177);
var options_component_1 = __webpack_require__(178);
var device_details_component_1 = __webpack_require__(276);
var access_service_1 = __webpack_require__(42);
var routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'overview', component: overview_component_1.OverviewComponent, canActivate: [access_service_1.AccessService] },
    { path: 'options', component: options_component_1.OptionsComponent, canActivate: [access_service_1.AccessService] },
    { path: 'details/:id', component: device_details_component_1.DeviceDetailsComponent, canActivate: [access_service_1.AccessService] },
    { path: '**', redirectTo: '/login', pathMatch: 'full' },
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map

/***/ }),

/***/ 527:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var platform_browser_1 = __webpack_require__(115);
var forms_1 = __webpack_require__(487);
var http_1 = __webpack_require__(73);
var app_routing_module_1 = __webpack_require__(526);
var ng2_charts_1 = __webpack_require__(586);
var common_1 = __webpack_require__(46);
var app_component_1 = __webpack_require__(528);
var login_component_1 = __webpack_require__(177);
var sidebar_component_1 = __webpack_require__(535);
var devices_component_1 = __webpack_require__(531);
var navigation_component_1 = __webpack_require__(533);
var overview_component_1 = __webpack_require__(179);
var options_component_1 = __webpack_require__(178);
var device_service_1 = __webpack_require__(43);
var device_parser_service_1 = __webpack_require__(277);
var access_service_1 = __webpack_require__(42);
var device_details_component_1 = __webpack_require__(276);
var continuous_device_details_component_1 = __webpack_require__(530);
var enum_device_details_component_1 = __webpack_require__(532);
var boolean_device_details_component_1 = __webpack_require__(529);
var overlay_component_1 = __webpack_require__(534);
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                app_routing_module_1.AppRoutingModule,
                ng2_charts_1.ChartsModule,
            ],
            declarations: [
                app_component_1.AppComponent,
                sidebar_component_1.SidebarComponent,
                boolean_device_details_component_1.BooleanDeviceDetailsComponent,
                continuous_device_details_component_1.ContinuousDeviceDetailsComponent,
                enum_device_details_component_1.EnumDeviceDetailsComponent,
                devices_component_1.DevicesComponent,
                device_details_component_1.DeviceDetailsComponent,
                navigation_component_1.NavigationComponent,
                overview_component_1.OverviewComponent,
                options_component_1.OptionsComponent,
                login_component_1.LoginComponent,
                overlay_component_1.OverlayComponent,
            ],
            providers: [
                { provide: core_1.LOCALE_ID, useValue: "de-at" },
                access_service_1.AccessService,
                common_1.DatePipe,
                device_service_1.DeviceService,
                device_parser_service_1.DeviceParserService,
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 528:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: '<router-outlet></router-outlet>'
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 529:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var device_1 = __webpack_require__(119);
var controlUnit_1 = __webpack_require__(118);
var device_service_1 = __webpack_require__(43);
var BooleanDeviceDetailsComponent = (function () {
    function BooleanDeviceDetailsComponent(deviceService) {
        this.deviceService = deviceService;
        this.doughnutChartData = [0, 0];
        this.doughnutChartLabels = ['Aus', 'An'];
        this.doughnutChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
        };
        this.doughnutChartLegend = true;
        this.doughnutChartType = 'doughnut';
    }
    BooleanDeviceDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.new_value = this.controlUnit.current == 1;
        this.deviceService.getUpdateRegister().subscribe(function (values) {
            if (values.unitId == _this.device.control_units.indexOf(_this.controlUnit) && _this.device.id == values.id) {
                _this.updateChart();
            }
        });
        this.createChart();
    };
    BooleanDeviceDetailsComponent.prototype.createChart = function () {
        var id = this.device.id;
        var unitId = this.device.control_units.indexOf(this.controlUnit);
        var num = Number(sessionStorage.getItem(id + ":" + unitId));
        if (num > 0) {
            for (var i = 0; i < num; i++) {
                var value = Number(sessionStorage.getItem(id + ":" + unitId + ":" + i + ":value"));
                this.doughnutChartData[value ? 1 : 0]++;
            }
            this.doughnutChartData = this.doughnutChartData.slice();
        }
    };
    BooleanDeviceDetailsComponent.prototype.updateChart = function () {
        var id = this.device.id;
        var unitId = this.device.control_units.indexOf(this.controlUnit);
        var num = Number(sessionStorage.getItem(id + ":" + unitId));
        if (num > 0) {
            var value = Number(sessionStorage.getItem(id + ":" + unitId + ":" + (num - 1) + ":value"));
            this.doughnutChartData[value ? 1 : 0]++;
            this.doughnutChartData = this.doughnutChartData.slice();
        }
    };
    BooleanDeviceDetailsComponent.prototype.onSubmit = function () {
        this.deviceService.updateCurrent(this.device, this.new_value ? 1 : 0, this.controlUnit);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', (typeof (_a = typeof device_1.Device !== 'undefined' && device_1.Device) === 'function' && _a) || Object)
    ], BooleanDeviceDetailsComponent.prototype, "device", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', (typeof (_b = typeof controlUnit_1.ControlUnit !== 'undefined' && controlUnit_1.ControlUnit) === 'function' && _b) || Object)
    ], BooleanDeviceDetailsComponent.prototype, "controlUnit", void 0);
    BooleanDeviceDetailsComponent = __decorate([
        core_1.Component({
            selector: 'boolean-details',
            template: __webpack_require__(587)
        }), 
        __metadata('design:paramtypes', [(typeof (_c = typeof device_service_1.DeviceService !== 'undefined' && device_service_1.DeviceService) === 'function' && _c) || Object])
    ], BooleanDeviceDetailsComponent);
    return BooleanDeviceDetailsComponent;
    var _a, _b, _c;
}());
exports.BooleanDeviceDetailsComponent = BooleanDeviceDetailsComponent;
//# sourceMappingURL=boolean-device-details.component.js.map

/***/ }),

/***/ 530:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var device_1 = __webpack_require__(119);
var controlUnit_1 = __webpack_require__(118);
var device_service_1 = __webpack_require__(43);
var ContinuousDeviceDetailsComponent = (function () {
    function ContinuousDeviceDetailsComponent(deviceService) {
        this.deviceService = deviceService;
        this.lineChartData = [
            { data: [], label: 'Verlauf' }
        ];
        this.lineChartLabels = [];
        this.lineChartOptions = {
            responsive: true,
            maintainAspectRatio: false
        };
        this.lineChartColors = [
            {
                backgroundColor: 'rgba(77,83,96,0.2)',
                borderColor: 'rgba(77,83,96,1)',
                pointBackgroundColor: 'rgba(77,83,96,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(77,83,96,1)'
            }
        ];
        this.lineChartLegend = true;
        this.lineChartType = 'line';
    }
    ;
    ContinuousDeviceDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.new_value = this.controlUnit.current;
        this.deviceService.getUpdateRegister().subscribe(function (values) {
            if (values.unitId == _this.device.control_units.indexOf(_this.controlUnit) && _this.device.id == values.id) {
                _this.updateChart();
            }
        });
        this.createChart();
    };
    ContinuousDeviceDetailsComponent.prototype.onSubmit = function () {
        this.deviceService.updateCurrent(this.device, this.new_value, this.controlUnit);
    };
    ContinuousDeviceDetailsComponent.prototype.createChart = function () {
        var id = this.device.id;
        var unitId = this.device.control_units.indexOf(this.controlUnit);
        var num = Number(sessionStorage.getItem(id + ":" + unitId));
        if (num > 0) {
            for (var i = 0; i < num; i++) {
                var value = sessionStorage.getItem(id + ":" + unitId + ":" + i + ":value");
                var time = sessionStorage.getItem(id + ":" + unitId + ":" + i + ":time");
                this.lineChartData[0].data.push(value);
                this.lineChartLabels.push(time);
            }
            this.lineChartData = this.lineChartData.slice();
        }
    };
    ContinuousDeviceDetailsComponent.prototype.updateChart = function () {
        var id = this.device.id;
        var unitId = this.device.control_units.indexOf(this.controlUnit);
        var num = Number(sessionStorage.getItem(id + ":" + unitId));
        var value = sessionStorage.getItem(id + ":" + unitId + ":" + (num - 1) + ":value");
        var time = sessionStorage.getItem(id + ":" + unitId + ":" + (num - 1) + ":time");
        this.lineChartData[0].data.push(value);
        this.lineChartLabels.push(time);
        this.lineChartData = this.lineChartData.slice();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', (typeof (_a = typeof device_1.Device !== 'undefined' && device_1.Device) === 'function' && _a) || Object)
    ], ContinuousDeviceDetailsComponent.prototype, "device", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', (typeof (_b = typeof controlUnit_1.ControlUnit !== 'undefined' && controlUnit_1.ControlUnit) === 'function' && _b) || Object)
    ], ContinuousDeviceDetailsComponent.prototype, "controlUnit", void 0);
    ContinuousDeviceDetailsComponent = __decorate([
        core_1.Component({
            selector: 'continuous-details',
            template: __webpack_require__(588)
        }), 
        __metadata('design:paramtypes', [(typeof (_c = typeof device_service_1.DeviceService !== 'undefined' && device_service_1.DeviceService) === 'function' && _c) || Object])
    ], ContinuousDeviceDetailsComponent);
    return ContinuousDeviceDetailsComponent;
    var _a, _b, _c;
}());
exports.ContinuousDeviceDetailsComponent = ContinuousDeviceDetailsComponent;
//# sourceMappingURL=continuous-device-details.component.js.map

/***/ }),

/***/ 531:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var device_service_1 = __webpack_require__(43);
var DevicesComponent = (function () {
    function DevicesComponent(deviceService) {
        this.deviceService = deviceService;
        this.update = true;
        this.device_num = 0;
    }
    DevicesComponent.prototype.ngOnInit = function () {
        this.update = true;
        this.listDevices();
        this.deviceService.openWebsocket();
    };
    DevicesComponent.prototype.ngAfterViewChecked = function () {
        if (this.devices != null && this.device_num != this.devices.length && this.device_num < this.devices.length) {
            this.update = true;
            this.device_num = this.devices.length;
        }
        if (this.devices != null && this.device_num > this.devices.length) {
            this.device_num = this.devices.length;
        }
        if (this.devices == null || !this.update) {
            return;
        }
        this.update = false;
        for (var _i = 0, _a = this.devices; _i < _a.length; _i++) {
            var device = _a[_i];
            if (device.draw_image == null) {
                continue;
            }
            for (var _b = 0, _c = device.control_units; _b < _c.length; _b++) {
                var control_unit = _c[_b];
                if (control_unit.primary) {
                    device.draw_image(device.id, device.image, control_unit.min, control_unit.max, control_unit.current, control_unit.values);
                }
            }
        }
    };
    DevicesComponent.prototype.listDevices = function () {
        var _this = this;
        this.deviceService.getDevices().then(function (devices) {
            _this.devices = devices;
            _this.edit = new Array(_this.devices.length);
            for (var i = 0; i < _this.devices.length; i++) {
                _this.edit[i] = { id: _this.devices[i].id, value: false };
            }
            _this.device_num = devices.length;
        });
    };
    DevicesComponent.prototype.isEdited = function (device) {
        var index = this.findStatus(device);
        if (index < 0) {
            return false;
        }
        return this.edit[index].value;
    };
    DevicesComponent.prototype.findStatus = function (device) {
        for (var i = 0; i < this.edit.length; i++) {
            if (device.id === this.edit[i].id) {
                return i;
            }
        }
        return -1;
    };
    DevicesComponent.prototype.editDevice = function (device) {
        var index = this.findStatus(device);
        if (index >= 0) {
            this.edit[index].value = true;
        }
        var device_outer = $(".device-outer[data-device-id=" + device.id + "]");
        var edit = device_outer.find(".device-edit");
        edit.hide();
        var remove = device_outer.find(".device-remove");
        remove.attr("src", "../images/ok.png");
    };
    DevicesComponent.prototype.finishEdit = function (device) {
        var _this = this;
        this.deviceService.updateDevice(device).then(function (result) {
            if (result) {
                _this.showLabel(device);
            }
            else {
                window.alert("Änderungen konnten nicht gespeichert werden.");
            }
        });
    };
    DevicesComponent.prototype.removeDevice = function (device) {
        this.deviceService.deleteDevice(device).then(function (result) {
            if (result) {
            }
            else {
                window.alert("Gerät konnte nicht gelöscht werden.");
            }
        });
    };
    DevicesComponent.prototype.showLabel = function (device) {
        var index = this.findStatus(device);
        if (index >= 0) {
            this.edit[index].value = false;
        }
        var device_outer = $(".device-outer[data-device-id=" + device.id + "]");
        var edit = device_outer.find(".device-edit");
        edit.show();
        var remove = device_outer.find(".device-remove");
        remove.attr("src", "../images/remove.png");
    };
    DevicesComponent = __decorate([
        core_1.Component({
            selector: 'my-devices',
            template: __webpack_require__(590)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof device_service_1.DeviceService !== 'undefined' && device_service_1.DeviceService) === 'function' && _a) || Object])
    ], DevicesComponent);
    return DevicesComponent;
    var _a;
}());
exports.DevicesComponent = DevicesComponent;
//# sourceMappingURL=devices.component.js.map

/***/ }),

/***/ 532:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var device_1 = __webpack_require__(119);
var controlUnit_1 = __webpack_require__(118);
var device_service_1 = __webpack_require__(43);
var EnumDeviceDetailsComponent = (function () {
    function EnumDeviceDetailsComponent(deviceService) {
        this.deviceService = deviceService;
        this.polarChartLabels = [];
        this.polarChartData = [];
        this.polarChartType = 'polarArea';
        this.polarChartOptions = {
            responsive: true,
            maintainAspectRatio: false
        };
        this.polarChartLegend = true;
    }
    ;
    EnumDeviceDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.new_value = this.controlUnit.values[this.controlUnit.current];
        this.deviceService.getUpdateRegister().subscribe(function (values) {
            if (values.unitId == _this.device.control_units.indexOf(_this.controlUnit) && _this.device.id == values.id) {
                _this.updateChart();
            }
        });
        this.createChart();
    };
    EnumDeviceDetailsComponent.prototype.updateChart = function () {
        var id = this.device.id;
        var unitId = this.device.control_units.indexOf(this.controlUnit);
        var num = Number(sessionStorage.getItem(id + ":" + unitId));
        if (num > 0) {
            var value = Number(sessionStorage.getItem(id + ":" + unitId + ":" + (num - 1) + ":value"));
            this.polarChartData[value]++;
            this.polarChartData = this.polarChartData.slice();
        }
    };
    EnumDeviceDetailsComponent.prototype.createChart = function () {
        for (var _i = 0, _a = this.controlUnit.values; _i < _a.length; _i++) {
            var val = _a[_i];
            this.polarChartLabels.push(val);
            this.polarChartData.push(0);
        }
        var id = this.device.id;
        var unitId = this.device.control_units.indexOf(this.controlUnit);
        var num = Number(sessionStorage.getItem(id + ":" + unitId));
        if (num > 0) {
            for (var i = 0; i < num; i++) {
                var value = Number(sessionStorage.getItem(id + ":" + unitId + ":" + i + ":value"));
                this.polarChartData[value]++;
            }
            this.polarChartData = this.polarChartData.slice();
        }
    };
    EnumDeviceDetailsComponent.prototype.onSubmit = function () {
        var index = this.controlUnit.values.indexOf(this.new_value);
        this.deviceService.updateCurrent(this.device, index, this.controlUnit);
    };
    EnumDeviceDetailsComponent.prototype.isSelected = function (val) {
        return val == this.new_value;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', (typeof (_a = typeof device_1.Device !== 'undefined' && device_1.Device) === 'function' && _a) || Object)
    ], EnumDeviceDetailsComponent.prototype, "device", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', (typeof (_b = typeof controlUnit_1.ControlUnit !== 'undefined' && controlUnit_1.ControlUnit) === 'function' && _b) || Object)
    ], EnumDeviceDetailsComponent.prototype, "controlUnit", void 0);
    EnumDeviceDetailsComponent = __decorate([
        core_1.Component({
            selector: 'enum-details',
            template: __webpack_require__(591)
        }), 
        __metadata('design:paramtypes', [(typeof (_c = typeof device_service_1.DeviceService !== 'undefined' && device_service_1.DeviceService) === 'function' && _c) || Object])
    ], EnumDeviceDetailsComponent);
    return EnumDeviceDetailsComponent;
    var _a, _b, _c;
}());
exports.EnumDeviceDetailsComponent = EnumDeviceDetailsComponent;
//# sourceMappingURL=enum-device-details.component.js.map

/***/ }),

/***/ 533:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var router_1 = __webpack_require__(54);
var options_component_1 = __webpack_require__(178);
var login_component_1 = __webpack_require__(177);
var access_service_1 = __webpack_require__(42);
var NavigationComponent = (function () {
    function NavigationComponent(router, route, accessService) {
        this.router = router;
        this.route = route;
        this.accessService = accessService;
    }
    ;
    NavigationComponent.prototype.isOptionsShown = function () {
        return !this.isOptionsite() && !this.isLoginSite();
    };
    NavigationComponent.prototype.isLogoutShown = function () {
        return !this.isLoginSite();
    };
    NavigationComponent.prototype.isOptionsite = function () {
        return this.route.component === options_component_1.OptionsComponent;
    };
    NavigationComponent.prototype.isLoginSite = function () {
        return this.route.component === login_component_1.LoginComponent;
    };
    NavigationComponent.prototype.doLogout = function () {
        var _this = this;
        console.log("doLogout");
        this.accessService.doLogout().then(function (successfully) {
            if (successfully) {
                _this.router.navigate(["/login"]);
            }
            else {
                window.alert("Sie konnten nicht abgemeldet werden.\nBitte versuchen Sie es erneut.");
            }
        });
    };
    NavigationComponent = __decorate([
        core_1.Component({
            selector: 'my-navigation',
            template: __webpack_require__(593)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, (typeof (_b = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _b) || Object, (typeof (_c = typeof access_service_1.AccessService !== 'undefined' && access_service_1.AccessService) === 'function' && _c) || Object])
    ], NavigationComponent);
    return NavigationComponent;
    var _a, _b, _c;
}());
exports.NavigationComponent = NavigationComponent;
//# sourceMappingURL=navigation.component.js.map

/***/ }),

/***/ 534:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var overview_component_1 = __webpack_require__(179);
var device_service_1 = __webpack_require__(43);
var device_1 = __webpack_require__(119);
var controlUnit_1 = __webpack_require__(118);
var controlType_1 = __webpack_require__(180);
var http_1 = __webpack_require__(73);
var OverlayComponent = (function () {
    function OverlayComponent(deviceService, http) {
        this.deviceService = deviceService;
        this.http = http;
        this.overviewComponent = null;
        this.selected_type = null;
        this.controlUnitType_selected = null;
        this.addError = false;
        this.createError = false;
        this.dbquery = "\n       select distinct ?label ?url WHERE {\n                ?set dct:subject dbc:Home_automation .\n                ?set rdf:type owl:Thing.\n                ?company dbo:product ?set.\n                ?set rdfs:label ?label.\n                ?set <http://dbpedia.org/ontology/thumbnail> ?url.\n                filter(lang(?label)='de')\n        }";
    }
    /**
     * Wird beim Start dieser Componente aufgerufen
     */
    OverlayComponent.prototype.ngOnInit = function () {
        this.device_types = ["Beleuchtung", "Heizkörperthermostat", "Rollladen", "Überwachungskamera", "Webcam"];
        this.controlUnit_types = ["Ein/Auschalter", "Diskrete Werte", "Kontinuierlicher Wert"];
        this.selected_type = this.device_types[0];
        this.controlUnitType_selected = this.controlUnit_types[0];
        this.getSPARQLTypes();
    };
    /**
     * Schließt das Overlay zum Hinzufügen von neuen Geräten
     */
    OverlayComponent.prototype.doClose = function () {
        if (this.overviewComponent != null) {
            this.overviewComponent.closeAddDeviceWindow();
        }
    };
    /**
     * Lies die Formulardaten ein und speichert diese über die REST-Schnittstelle
     * @param form
     */
    OverlayComponent.prototype.onSubmit = function (form) {
        var _this = this;
        this.createError = false;
        // Überprüfung ob alle Daten vorhanden
        if (!form || !form.value || !form.value["typename"] || !form.value["displayname"] || !form.value["elementname"]) {
            this.addError = true;
            return;
        }
        if (this.isEnumSelected() && (!form.value["discrete-values"]) || (form.value["discrete-values"] && form.value["discrete-values"].split(",").length == 0)) {
            this.addError = true;
            return;
        }
        var device = new device_1.Device();
        device.display_name = form.value["displayname"];
        device.type_name = form.value["typename"];
        // Fügt das dazugehörige Bild, die alternative Bildbeschreibung und die allgemeine Beschreibung zum neuen Gerät hinzu
        switch (this.selected_type) {
            case "Beleuchtung":
                device.image = "images/bulb.svg";
                device.image_alt = "Glühbirne als Indikator für Aktivierung";
                device.description = "Genauere Informationen zu diesem Beleuchtungselement";
                break;
            case "Heizkörperthermostat":
                device.image = "images/thermometer.svg";
                device.image_alt = "Thermometer zur Temperaturanzeige";
                device.description = "Genauere Informationen zu diesem Thermostat";
                break;
            case "Rollladen":
                device.image = "images/roller_shutter.svg";
                device.image_alt = "Rollladenbild als Indikator für Öffnungszustand";
                device.description = "Genauere Informationen zu diesem Rollladen";
                break;
            case "Überwachungskamera":
                device.image = "images/webcam.svg";
                device.image_alt = "Webcam als Indikator für Aktivierung";
                device.description = "Genauere Informationen zu dieser Überwachungskamera";
                break;
            case "Webcam":
                device.image = "images/webcam.svg";
                device.image_alt = "Webcam als Indikator für Aktivierung";
                device.description = "Genauere Informationen zu dieser Webcam";
                break;
            default:
                // Lesen Sie die SPARQL - Informationen aus dem SessionStorage und speichern Sie die entsprechenden Informationen zum Gerät
                var device_data = JSON.parse(sessionStorage.getItem("db-devices"));
                for (var _i = 0, device_data_1 = device_data; _i < device_data_1.length; _i++) {
                    var dbDevice = device_data_1[_i];
                    if (dbDevice["label"] == this.selected_type) {
                        device.image = dbDevice["url"];
                        device.image_alt = dbDevice["label"];
                        device.description = dbDevice["description"];
                    }
                }
                break;
        }
        device.type = this.selected_type;
        // Bestimmt welches Steuerungselement für dieses Gerät angezeigt werden soll
        var controlUnit = new controlUnit_1.ControlUnit();
        controlUnit.primary = true;
        switch (this.controlUnitType_selected) {
            case this.controlUnit_types[0]:
                controlUnit.type = controlType_1.ControlType.boolean;
                break;
            case this.controlUnit_types[1]:
                controlUnit.type = controlType_1.ControlType.enum;
                break;
            case this.controlUnit_types[2]:
                controlUnit.type = controlType_1.ControlType.continuous;
                break;
        }
        controlUnit.name = form.value["elementname"];
        if (this.isContinuousSelected()) {
            controlUnit.min = form.value["minimum-value"];
            controlUnit.max = form.value["maximum-value"];
            controlUnit.current = controlUnit.min;
            controlUnit.values = [""];
        }
        else {
            controlUnit.min = controlUnit.max = 0;
        }
        if (this.isBooleanSelected()) {
            controlUnit.current = 0;
            controlUnit.values = [""];
        }
        if (this.isEnumSelected()) {
            var values = form.value["discrete-values"].split(",");
            controlUnit.values = [""];
            controlUnit.values.length = 0;
            for (var i = 0; i < values.length; i++) {
                controlUnit.values.push(values[i].trim());
            }
            controlUnit.current = 0;
        }
        device.control_units = [controlUnit];
        // hinzufügen des Gerätes über die REST-Schnittstelle
        this.deviceService.createDevice(device).then(function (result) {
            if (result) {
                form.reset();
                _this.overviewComponent.closeAddDeviceWindow();
            }
            else {
                _this.createError = true;
            }
        });
    };
    OverlayComponent.prototype.getSPARQLTypes = function () {
        //Lesen Sie mittels SPARQL die gewünschten Daten (wie in der Angabe beschrieben) aus und speichern Sie diese im SessionStorage
        var _this = this;
        var params = new http_1.URLSearchParams();
        params.set('query', this.dbquery);
        var devices = sessionStorage.getItem("db-devices");
        if (!devices) {
            this.http.get("http://dbpedia.org/sparql", { search: params })
                .map(function (response) {
                var res = response.json();
                var results = res.results.bindings;
                var dbDevices = [];
                for (var _i = 0, results_1 = results; _i < results_1.length; _i++) {
                    var result = results_1[_i];
                    var label = result.label.value;
                    var url = result.url.value;
                    var description = "Genauere Informationen zu diesem/dieser" + label;
                    dbDevices.push({ label: label, description: description, url: url });
                }
                sessionStorage.setItem('db-devices', JSON.stringify(dbDevices));
                for (var _a = 0, dbDevices_1 = dbDevices; _a < dbDevices_1.length; _a++) {
                    var dbDevice = dbDevices_1[_a];
                    _this.device_types.push(dbDevice["label"]);
                }
            }).subscribe();
            devices = sessionStorage.getItem("db-devices");
        }
        else {
            devices = JSON.parse(devices);
            for (var _i = 0, devices_1 = devices; _i < devices_1.length; _i++) {
                var device = devices_1[_i];
                this.device_types.push(device["label"]);
            }
        }
    };
    /**
     * Überprüft ob ein bestimmter Gerätetyp bereits ausgewählt ist
     * @param type zu überprüfender Typ
     * @returns {boolean}
     */
    OverlayComponent.prototype.isSelected = function (type) {
        return type == this.device_types[0];
    };
    /**
     * Überprüft ob boolean als Steuerungseinheit gewählt wurde
     * @returns {boolean}
     */
    OverlayComponent.prototype.isBooleanSelected = function () {
        return this.controlUnitType_selected === this.controlUnit_types[0];
    };
    /**
     * Überprüft ob enum als Steuerungseinheit gewählt wurde
     * @returns {boolean}
     */
    OverlayComponent.prototype.isEnumSelected = function () {
        return this.controlUnitType_selected === this.controlUnit_types[1];
    };
    /**
     * Überprüft ob continuous als Steuerungseinheit gewählt wurde
     * @returns {boolean}
     */
    OverlayComponent.prototype.isContinuousSelected = function () {
        return this.controlUnitType_selected === this.controlUnit_types[2];
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', (typeof (_a = typeof overview_component_1.OverviewComponent !== 'undefined' && overview_component_1.OverviewComponent) === 'function' && _a) || Object)
    ], OverlayComponent.prototype, "overviewComponent", void 0);
    OverlayComponent = __decorate([
        core_1.Component({
            selector: 'my-overlay',
            template: __webpack_require__(595)
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof device_service_1.DeviceService !== 'undefined' && device_service_1.DeviceService) === 'function' && _b) || Object, (typeof (_c = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _c) || Object])
    ], OverlayComponent);
    return OverlayComponent;
    var _a, _b, _c;
}());
exports.OverlayComponent = OverlayComponent;
//# sourceMappingURL=overlay.component.js.map

/***/ }),

/***/ 535:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var access_service_1 = __webpack_require__(42);
var SidebarComponent = (function () {
    function SidebarComponent(accessService) {
        this.accessService = accessService;
    }
    SidebarComponent.prototype.ngOnInit = function () {
        this.accessService.getServerStatus();
    };
    SidebarComponent = __decorate([
        core_1.Component({
            selector: 'my-sidebar',
            template: __webpack_require__(597)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof access_service_1.AccessService !== 'undefined' && access_service_1.AccessService) === 'function' && _a) || Object])
    ], SidebarComponent);
    return SidebarComponent;
    var _a;
}());
exports.SidebarComponent = SidebarComponent;
//# sourceMappingURL=sidebar.component.js.map

/***/ }),

/***/ 536:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

exports.environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 584:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 279,
	"./af.js": 279,
	"./ar": 286,
	"./ar-dz": 280,
	"./ar-dz.js": 280,
	"./ar-kw": 281,
	"./ar-kw.js": 281,
	"./ar-ly": 282,
	"./ar-ly.js": 282,
	"./ar-ma": 283,
	"./ar-ma.js": 283,
	"./ar-sa": 284,
	"./ar-sa.js": 284,
	"./ar-tn": 285,
	"./ar-tn.js": 285,
	"./ar.js": 286,
	"./az": 287,
	"./az.js": 287,
	"./be": 288,
	"./be.js": 288,
	"./bg": 289,
	"./bg.js": 289,
	"./bn": 290,
	"./bn.js": 290,
	"./bo": 291,
	"./bo.js": 291,
	"./br": 292,
	"./br.js": 292,
	"./bs": 293,
	"./bs.js": 293,
	"./ca": 294,
	"./ca.js": 294,
	"./cs": 295,
	"./cs.js": 295,
	"./cv": 296,
	"./cv.js": 296,
	"./cy": 297,
	"./cy.js": 297,
	"./da": 298,
	"./da.js": 298,
	"./de": 301,
	"./de-at": 299,
	"./de-at.js": 299,
	"./de-ch": 300,
	"./de-ch.js": 300,
	"./de.js": 301,
	"./dv": 302,
	"./dv.js": 302,
	"./el": 303,
	"./el.js": 303,
	"./en-au": 304,
	"./en-au.js": 304,
	"./en-ca": 305,
	"./en-ca.js": 305,
	"./en-gb": 306,
	"./en-gb.js": 306,
	"./en-ie": 307,
	"./en-ie.js": 307,
	"./en-nz": 308,
	"./en-nz.js": 308,
	"./eo": 309,
	"./eo.js": 309,
	"./es": 311,
	"./es-do": 310,
	"./es-do.js": 310,
	"./es.js": 311,
	"./et": 312,
	"./et.js": 312,
	"./eu": 313,
	"./eu.js": 313,
	"./fa": 314,
	"./fa.js": 314,
	"./fi": 315,
	"./fi.js": 315,
	"./fo": 316,
	"./fo.js": 316,
	"./fr": 319,
	"./fr-ca": 317,
	"./fr-ca.js": 317,
	"./fr-ch": 318,
	"./fr-ch.js": 318,
	"./fr.js": 319,
	"./fy": 320,
	"./fy.js": 320,
	"./gd": 321,
	"./gd.js": 321,
	"./gl": 322,
	"./gl.js": 322,
	"./gom-latn": 323,
	"./gom-latn.js": 323,
	"./he": 324,
	"./he.js": 324,
	"./hi": 325,
	"./hi.js": 325,
	"./hr": 326,
	"./hr.js": 326,
	"./hu": 327,
	"./hu.js": 327,
	"./hy-am": 328,
	"./hy-am.js": 328,
	"./id": 329,
	"./id.js": 329,
	"./is": 330,
	"./is.js": 330,
	"./it": 331,
	"./it.js": 331,
	"./ja": 332,
	"./ja.js": 332,
	"./jv": 333,
	"./jv.js": 333,
	"./ka": 334,
	"./ka.js": 334,
	"./kk": 335,
	"./kk.js": 335,
	"./km": 336,
	"./km.js": 336,
	"./kn": 337,
	"./kn.js": 337,
	"./ko": 338,
	"./ko.js": 338,
	"./ky": 339,
	"./ky.js": 339,
	"./lb": 340,
	"./lb.js": 340,
	"./lo": 341,
	"./lo.js": 341,
	"./lt": 342,
	"./lt.js": 342,
	"./lv": 343,
	"./lv.js": 343,
	"./me": 344,
	"./me.js": 344,
	"./mi": 345,
	"./mi.js": 345,
	"./mk": 346,
	"./mk.js": 346,
	"./ml": 347,
	"./ml.js": 347,
	"./mr": 348,
	"./mr.js": 348,
	"./ms": 350,
	"./ms-my": 349,
	"./ms-my.js": 349,
	"./ms.js": 350,
	"./my": 351,
	"./my.js": 351,
	"./nb": 352,
	"./nb.js": 352,
	"./ne": 353,
	"./ne.js": 353,
	"./nl": 355,
	"./nl-be": 354,
	"./nl-be.js": 354,
	"./nl.js": 355,
	"./nn": 356,
	"./nn.js": 356,
	"./pa-in": 357,
	"./pa-in.js": 357,
	"./pl": 358,
	"./pl.js": 358,
	"./pt": 360,
	"./pt-br": 359,
	"./pt-br.js": 359,
	"./pt.js": 360,
	"./ro": 361,
	"./ro.js": 361,
	"./ru": 362,
	"./ru.js": 362,
	"./sd": 363,
	"./sd.js": 363,
	"./se": 364,
	"./se.js": 364,
	"./si": 365,
	"./si.js": 365,
	"./sk": 366,
	"./sk.js": 366,
	"./sl": 367,
	"./sl.js": 367,
	"./sq": 368,
	"./sq.js": 368,
	"./sr": 370,
	"./sr-cyrl": 369,
	"./sr-cyrl.js": 369,
	"./sr.js": 370,
	"./ss": 371,
	"./ss.js": 371,
	"./sv": 372,
	"./sv.js": 372,
	"./sw": 373,
	"./sw.js": 373,
	"./ta": 374,
	"./ta.js": 374,
	"./te": 375,
	"./te.js": 375,
	"./tet": 376,
	"./tet.js": 376,
	"./th": 377,
	"./th.js": 377,
	"./tl-ph": 378,
	"./tl-ph.js": 378,
	"./tlh": 379,
	"./tlh.js": 379,
	"./tr": 380,
	"./tr.js": 380,
	"./tzl": 381,
	"./tzl.js": 381,
	"./tzm": 383,
	"./tzm-latn": 382,
	"./tzm-latn.js": 382,
	"./tzm.js": 383,
	"./uk": 384,
	"./uk.js": 384,
	"./ur": 385,
	"./ur.js": 385,
	"./uz": 387,
	"./uz-latn": 386,
	"./uz-latn.js": 386,
	"./uz.js": 387,
	"./vi": 388,
	"./vi.js": 388,
	"./x-pseudo": 389,
	"./x-pseudo.js": 389,
	"./yo": 390,
	"./yo.js": 390,
	"./zh-cn": 391,
	"./zh-cn.js": 391,
	"./zh-hk": 392,
	"./zh-hk.js": 392,
	"./zh-tw": 393,
	"./zh-tw.js": 393
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 584;


/***/ }),

/***/ 587:
/***/ (function(module, exports) {

module.exports = "<div class=\"details-image-container\">\n    <canvas alt=\"Donatdiagramm für das Gerät\" class=\"details-image\" baseChart\n            [data]=\"doughnutChartData\"\n            [labels]=\"doughnutChartLabels\"\n            [chartType]=\"doughnutChartType\"\n            [legend]=\"doughnutChartLegend\"\n            [options]=\"doughnutChartOptions\">\n    </canvas>\n</div>\n<div class=\"details-data\">\n    <label class=\"accessibility\" for=\"details-log\">Letzte Werteänderungen</label>\n    <textarea id=\"details-log\" class=\"detail-logs\" [(ngModel)]=\"controlUnit.log\" placeholder=\"Gerätelog\" readonly rows=\"6\"></textarea>\n    <div class=\"details-settings\">\n        <h3 class=\"details-headline\">{{controlUnit.name}}</h3>\n\n        <form class=\"update-form\" method=\"post\" #updateForm=\"ngForm\" (ngSubmit)=\"onSubmit()\">\n\n            <label class=\"update-form-field\" id=\"current-value\">\n                <span class=\"current-value\">derzeit: {{controlUnit.current==0 ? \"Deaktiviert\" : \"Aktiviert\"}}</span>\n            </label>\n\n            <label class=\"accessibility\" for=\"new-value\">Bitte gewünschten Wert auswählen.</label>\n            <input type=\"checkbox\" id=\"new-value\" [checked]=\"new_value==0 ? null: true\" [(ngModel)]=\"new_value\"\n                   class=\"update-checkbox-input form-input\"\n                   name=\"new-value\">\n            <input type=\"submit\" id=\"submit-value\" class=\"update-form-field button\" name=\"submit-value\"\n                   value=\"Wert setzen\">\n        </form>\n    </div>\n</div>\n"

/***/ }),

/***/ 588:
/***/ (function(module, exports) {

module.exports = "<div class=\"details-image-container\">\n  <canvas alt=\"Liniendiagramm für das Gerät\" class=\"details-image\" baseChart\n          [datasets]=\"lineChartData\"\n          [labels]=\"lineChartLabels\"\n          [options]=\"lineChartOptions\"\n          [colors]=\"lineChartColors\"\n          [legend]=\"lineChartLegend\"\n          [chartType]=\"lineChartType\">\n  </canvas>\n</div>\n<div class=\"details-data\">\n  <label class=\"accessibility\" for=\"details-log\">Letzte Werteänderungen</label>\n  <textarea id=\"details-log\" class=\"detail-logs\" [(ngModel)]=\"controlUnit.log\" placeholder=\"Gerätelog\" readonly rows=\"6\"></textarea>\n  <div class=\"details-settings\">\n    <h3 class=\"details-headline\">{{controlUnit.name}}</h3>\n\n    <form class=\"update-form\" #updateForm=\"ngForm\" method=\"post\" (ngSubmit)=\"onSubmit()\" >\n\n      <label class=\"update-form-field\" id=\"current-value\">\n        <span class=\"current-value\">derzeit: {{controlUnit.current}}</span>\n      </label>\n\n      <label class=\"accessibility\" for=\"new-value\">Bitte gewünschten Wert eingeben.</label>\n      <input type=\"number\" step=\"0.01\" [min]=\"controlUnit.min\" [max]=\"controlUnit.max\" id=\"new-value\" [value]=\"new_value\" [(ngModel)]=\"new_value\"\n             class=\"update-form-field form-input\" name=\"new-value\" required >\n      <input [disabled]=\"!updateForm.form.valid\" type=\"submit\" id=\"submit-value\" class=\"update-form-field button\" name=\"submit-value\"\n             value=\"Wert setzen\">\n    </form>\n  </div>\n</div>\n"

/***/ }),

/***/ 589:
/***/ (function(module, exports) {

module.exports = "<body data-decimal-separator=\",\" data-grouping-separator=\".\">\n<div role=\"navigation\">\n    <a href=\"#devicessheadline\" class=\"accessibility\">Zum Inhalt springen</a>\n</div>\n\n<my-navigation></my-navigation>\n<div class=\"main-container\">\n    <aside class=\"sidebar\" aria-labelledby=\"serverinfoheadline\">\n        <my-sidebar></my-sidebar>\n    </aside>\n    <main *ngIf=\"device\" aria-labelledby=\"deviceheadline\" class=\"details-container\">\n\n        <div [attr.data-device-id]=\"device.id\" class=\"details-headline\">\n            <h2 class=\"main-headline\" id=\"deviceheadline\">{{device.display_name}}</h2>\n        </div>\n        <div class=\"details-holder\" *ngFor=\"let control_unit of device.control_units\">\n            <div *ngFor=\"let control_unit of device.control_units\"  class=\"details-outer\">\n                <continuous-details *ngIf=\"isContinuous(control_unit)\" [device]=\"device\" [controlUnit]=\"control_unit\"></continuous-details>\n                <enum-details *ngIf=\"isEnum(control_unit)\" [device]=\"device\" [controlUnit]=\"control_unit\"></enum-details>\n                <boolean-details *ngIf=\"isBoolean(control_unit)\"  [device]=\"device\" [controlUnit]=\"control_unit\"></boolean-details>\n            </div>\n        </div>\n    </main>\n</div>\n<footer>\n    © 2017 BIG Smart Home\n</footer>\n</body>\n"

/***/ }),

/***/ 590:
/***/ (function(module, exports) {

module.exports = "<div class=\"devices\">\n\n  <div *ngFor=\"let device of devices\" class=\"device-outer\" [attr.data-device-id]=\"device.id\">\n    <a class=\"device\" [routerLink]=\"isEdited(device) ? null : ['/details', device.id]\"\n       [attr.title]=\"device.description\">\n      <dl class=\"device-properties\">\n        <dt>Anzeigename</dt>\n        <dd *ngIf=\"!isEdited(device)\" class=\"device-displayname\">{{device.display_name}}</dd>\n        <dd *ngIf=\"isEdited(device)\" class=\"device-displayname\">\n          <input id=\"device_displayname_input\" (keyup.enter)=\"finishEdit(device)\" [(ngModel)]=\"device.display_name\"\n                 value='\" + text + \"'/>\n        </dd>\n        <dt>Gerätetyp</dt>\n        <dd class=\"device-type\">{{device.type}}</dd>\n        <dt>Gerätename</dt>\n        <dd class=\"device-name\">{{device.type_name}}</dd>\n      </dl>\n      <div class=\"device-image-container\">\n        <svg width=\"100%\" height=\"100%\" class=\"device-image\"></svg>\n      </div>\n    </a>\n    <ul class=\"device-actions\">\n      <li>\n        <a (click)=\"editDevice(device)\">\n          <img class=\"device-edit\" src=\"images/edit.png\" alt=\"Gerät bearbeiten\">\n        </a>\n      </li>\n      <li>\n        <a (click)=\"isEdited(device) ? finishEdit(device): removeDevice(device)\">\n          <img class=\"device-remove\" src=\"images/remove.png\" alt=\"Gerät entfernen\">\n        </a>\n      </li>\n    </ul>\n  </div>\n\n</div>\n"

/***/ }),

/***/ 591:
/***/ (function(module, exports) {

module.exports = "<div class=\"details-image-container\">\n  <canvas alt=\"Polardiagramm für das Gerät\" class=\"details-image\" baseChart\n          [data]=\"polarChartData\"\n          [labels]=\"polarChartLabels\"\n          [chartType]=\"polarChartType\"\n          [legend]=\"polarChartLegend\"\n          [options]=\"polarChartOptions\">\n  </canvas>\n</div>\n<div class=\"details-data\">\n  <label class=\"accessibility\" for=\"details-log\">Letzte Werteänderungen</label>\n  <textarea id=\"details-log\" class=\"detail-logs\" [(ngModel)]=\"controlUnit.log\" placeholder=\"Gerätelog\" readonly rows=\"6\"></textarea>\n  <div class=\"details-settings\">\n    <h3 class=\"details-headline\">{{controlUnit.name}}</h3>\n\n    <form class=\"update-form\" method=\"post\" #updateForm=\"ngForm\" (ngSubmit)=\"onSubmit()\">\n\n      <label class=\"update-form-field\" id=\"current-value\">\n        <span class=\"current-value\">derzeit: {{controlUnit.values[controlUnit.current]}}</span>\n      </label>\n\n      <label class=\"accessibility\" for=\"new-value\">Bitte gewünschten Wert aus Menü auswählen.</label>\n      <select id=\"new-value\" class=\"update-form-field form-input\" name=\"new-value\" [(ngModel)]=\"new_value\" required>\n       <option [value]=\"val\" [selected]=\"isSelected(val) ? true: null\"  *ngFor=\"let val of controlUnit.values\">{{val}}</option>\n      </select>\n      <input type=\"submit\" id=\"submit-value\" class=\"update-form-field button\" name=\"submit-value\"\n             value=\"Wert setzen\">\n    </form>\n  </div>\n</div>\n"

/***/ }),

/***/ 592:
/***/ (function(module, exports) {

module.exports = "<body data-decimal-separator=\",\" data-grouping-separator=\".\">\n\n<div role=\"navigation\" aria-label=\"jumplinks\">\n  <a href=\"#formheadline\" class=\"accessibility\">Zum Inhalt springen</a>\n</div>\n\n<my-navigation></my-navigation>\n<div class=\"main-container\">\n  <main aria-labelledby=\"formheadline\">\n    <form class=\"form\" method=\"post\" #loginForm=\"ngForm\" (ngSubmit)=\"onSubmit(loginForm)\">\n      <h2 id=\"formheadline\" class=\"registration-headline\">Anmelden</h2>\n      <div class=\"form-row\">\n        <label class=\"form-label\" for=\"username-input\">\n          Benutzername\n        </label>\n        <input type=\"text\" name=\"username\" id=\"username-input\" required class=\"form-input\" ngModel>\n      </div>\n      <div class=\"form-row\">\n        <label class=\"form-label\" for=\"password-input\">\n          Passwort\n        </label>\n        <input type=\"password\" name=\"password\" id=\"password-input\" required class=\"form-input\" minlength=\"4\"\n               maxlength=\"12\" ngModel>\n      </div>\n      <div *ngIf=\"loginError\" class=\"form-row form-row-center form-error\" id=\"login-error\">Benutzername oder Passwort nicht korrekt!</div>\n      <div class=\"form-row form-row-center\">\n        <input type=\"submit\" class=\"button button-submit\" value=\"Anmelden\"/>\n      </div>\n    </form>\n  </main>\n</div>\n<footer>\n  © 2017 BIG Smart Home\n</footer>\n</body>\n"

/***/ }),

/***/ 593:
/***/ (function(module, exports) {

module.exports = "<header aria-labelledby=\"bannerheadline\">\n  <!--<a [routerLink]=\"['/overview']\"><img class=\"title-image\" src=\"images/big-logo-small.png\" alt=\"BIG Bid logo\"></a>-->\n  <a [routerLink]=\"isLoginSite() ? ['/login'] : ['/overview']\"><img class=\"title-image\" src=\"images/big-logo-small.png\"\n                                                                    alt=\"BIG Bid logo\"></a>\n  <h1 class=\"header-title\" id=\"bannerheadline\">\n    BIG Smart Home\n  </h1>\n  <nav aria-labelledby=\"navigationheadline\">\n    <h2 class=\"accessibility\" id=\"navigationheadline\">Navigation</h2>\n    <ul class=\"navigation-list\">\n      <li class=\"nav-items\">\n        <ul>\n          <li *ngIf=\"isOptionsShown()\">\n            <a [routerLink]=\"['/options']\" class=\"button\" accesskey=\"2\">Optionen</a>\n          </li>\n          <li *ngIf=\"isLogoutShown()\">\n            <a (click)=\"doLogout()\" class=\"button\" accesskey=\"1\">Abmelden</a>\n          </li>\n        </ul>\n      </li>\n      <li class=\"overflow-icon\">\n        <a href=\"#\" class=\"button\" accesskey=\"1\">☰</a>\n      </li>\n    </ul>\n  </nav>\n</header>\n"

/***/ }),

/***/ 594:
/***/ (function(module, exports) {

module.exports = "<div role=\"navigation\" aria-label=\"jumplinks\">\n  <a href=\"#formheadline\" class=\"accessibility\">Zum Inhalt springen</a>\n</div>\n\n<my-navigation></my-navigation>\n<div class=\"main-container\">\n  <main aria-labelledby=\"formheadline\">\n    <form class=\"form\" method=\"post\" #optionsForm=\"ngForm\" (ngSubmit)=\"onSubmit(optionsForm)\">\n      <h2 id=\"formheadline\" class=\"options-headline\">Passwort ändern</h2>\n      <div class=\"form-row\">\n        <label class=\"form-label\" for=\"old-password-input\">\n          Altes Passwort\n        </label>\n        <input type=\"password\" name=\"old-password\" id=\"old-password-input\" required class=\"form-input\"\n               placeholder=\"Altes Passwort\" ngModel>\n      </div>\n      <div class=\"form-row\">\n        <label class=\"form-label\" for=\"new-password-input\">\n          Neues Passwort\n        </label>\n        <input type=\"password\" name=\"new-password\" id=\"new-password-input\" placeholder=\"Neues Passwort\" required\n               class=\"form-input\" minlength=\"8\"\n               maxlength=\"12\" pattern=\"(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}\" ngModel>\n      </div>\n      <div class=\"form-row\">\n        <label class=\"form-label\" for=\"repeat-password-input\">\n          Passwort wiederholen\n        </label>\n        <input type=\"password\" name=\"repeat-password\" id=\"repeat-password-input\"\n               placeholder=\"Neues Passwort wiederholen\"\n               required class=\"form-input\" minlength=\"8\"\n               maxlength=\"12\" pattern=\"(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}\" ngModel>\n      </div>\n      <div *ngIf=\"updateError\" class=\"form-row form-row-center form-error\" id=\"update-error\">{{error_message}}</div>\n      <div class=\"form-row form-row-center\">\n        <input [disabled]=\"!(equalsPW(optionsForm) && optionsForm.form.valid)\" type=\"submit\" id=\"save-changes-button\"\n               class=\"button button-submit\"\n               value=\" Änderung speichern\"/>\n      </div>\n    </form>\n  </main>\n</div>\n<footer>\n  © 2017 BIG Smart Home\n</footer>\n"

/***/ }),

/***/ 595:
/***/ (function(module, exports) {

module.exports = "<div class=\"overlay\">\n  <div class=\"overlay-content\">\n    <a (click)=\"doClose()\" class=\"overlay-exit\"><img  src=\"images/close.png\" alt=\"close overlay\" width=\"10\" height=\"10\"/></a>\n    <form name=\"addForm\" class=\"form overlay-form\" method=\"post\" #addForm=\"ngForm\" (ngSubmit)=\"onSubmit(addForm)\">\n      <h2 id=\"formheadline\" class=\"create-headline\">Gerät anlegen</h2>\n      <div class=\"form-row\">\n        <label class=\"form-label\" for=\"displayname-input\">\n          Anzeigename\n        </label>\n        <input type=\"text\" name=\"displayname\" id=\"displayname-input\" required class=\"form-input\" ngModel>\n      </div>\n      <div class=\"form-row\">\n        <label class=\"form-label\" for=\"type-input\">\n          Gerätetyp\n        </label>\n\n        <select [(ngModel)]=\"selected_type\" name=\"type-input\" class=\"form-input\" required id=\"type-input\">\n          <option [value]=\"val\"  *ngFor=\"let val of device_types\">{{val}}</option>\n        </select>\n      </div>\n      <div class=\"form-row\">\n        <label class=\"form-label\" for=\"typename-input\">\n          Typenbezeichnung\n        </label>\n        <input type=\"text\" name=\"typename\" id=\"typename-input\" required class=\"form-input\" ngModel>\n      </div>\n      <hr>\n      <div class=\"form-row\">\n        <label class=\"form-label\" >\n          <b>Steuerungselement</b>\n        </label>\n      </div>\n      <div class=\"form-row\">\n        <label class=\"form-label\" for=\"elementname-input\">\n          Bezeichnung\n        </label>\n        <input type=\"text\" name=\"elementname\" id=\"elementname-input\" required class=\"form-input\" ngModel>\n      </div>\n      <div class=\"form-row\">\n        <label class=\"form-label\" for=\"elementtype-input\">\n          Typ\n        </label>\n        <select name=\"elementtype-input\" class=\"form-input\" [(ngModel)]=\"controlUnitType_selected\" required id=\"elementtype-input\">\n          <option [value]=\"val\"  *ngFor=\"let val of controlUnit_types\">{{val}}</option>\n        </select>\n      </div>\n      <div *ngIf=\"isContinuousSelected()\" class=\"form-row\">\n        <label class=\"form-label\" for=\"minimum-input\">\n          Minimum\n        </label>\n        <input type=\"number\" name=\"minimum-value\" id=\"minimum-input\" required class=\"form-input\" ngModel>\n      </div>\n      <div *ngIf=\"isContinuousSelected()\" class=\"form-row\">\n        <label class=\"form-label\" for=\"maximum-input\">\n          Maximum\n        </label>\n        <input type=\"number\" name=\"maximum-value\" id=\"maximum-input\" required class=\"form-input\" ngModel>\n      </div>\n      <div *ngIf=\"isEnumSelected()\" class=\"form-row\">\n        <label class=\"form-label\" for=\"values-input\">\n          Mögliche Werte\n        </label>\n        <textarea name=\"discrete-values\" ngModel id=\"values-input\" required class=\"form-input\" placeholder=\"offen, halb geöffnet, geschlossen\"></textarea>\n      </div>\n      <div *ngIf=\"addError\" class=\"form-row form-row-center form-error\" id=\"add-error\">Es wurden nicht alle Angaben wie benötigt vorgenommen!</div>\n      <div *ngIf=\"createError\" class=\"form-row form-row-center form-error\" id=\"create-error\">Aufgrund eine Serverfehlers konnte das Geräte nicht erstellt werden!</div>\n      <div class=\"form-row form-row-center form-row-bottom\">\n        <button [disabled]=\"!addForm.form.valid\" class=\"button button-submit\">\n          Gerät hinzufügen\n        </button>\n      </div>\n    </form>\n  </div>\n</div>\n"

/***/ }),

/***/ 596:
/***/ (function(module, exports) {

module.exports = "<body data-decimal-separator=\",\" data-grouping-separator=\".\">\n<div role=\"navigation\" aria-label=\"jumplinks\">\n  <a href=\"#devicesheadline\" class=\"accessibility\">Zum Inhalt springen</a>\n</div>\n\n<my-navigation></my-navigation>\n<div class=\"main-container\">\n  <aside class=\"sidebar\" aria-labelledby=\"serverinfoheadline\">\n    <my-sidebar></my-sidebar>\n  </aside>\n  <main aria-labelledby=\"devicesheadline;\">\n    <div class=\"headline-container\">\n      <h2 class=\"main-headline\" id=\"devicesheadline\">Geräte</h2>\n      <a (click)=\"addDevice()\"><img height=\"20\" width=\"20\" src=\"../../images/add.png\" alt=\"Gerät hinzufügen\"/></a>\n    </div>\n    <my-devices></my-devices>\n    <my-overlay [overviewComponent]=\"this\" [hidden]=\"isAddDevice ? null : true\"></my-overlay>\n  </main>\n</div>\n\n<footer>\n  © 2017 BIG Smart Home\n</footer>\n</body>\n"

/***/ }),

/***/ 597:
/***/ (function(module, exports) {

module.exports = "<div class=\"server-info-container\">\n  <h2 class=\"accessibility\" id=\"serverinfoheadline\">Serverstatus</h2>\n  <dl class=\"server-data properties\">\n    <dt class=\"accessibility\">Serverstatus:</dt>\n    <dd class=\"server-status\">Serverstatus:</dd>\n    <dt>Benutzer</dt>\n    <dd>\n      <span class=\"system-start-time\">Administrator</span>\n    </dd>\n    <dt>Systemstartzeit</dt>\n    <dd>\n      <span class=\"system-start-time\">{{accessService.server_start | date: 'shortTime'}}</span>\n    </dd>\n    <dt>Systemstartdatum</dt>\n    <dd>\n      <span class=\"system-start-datum\">{{accessService.server_start  | date: 'shortDate'}}</span>\n    </dd>\n    <dt>Fehlgeschlagene Logins</dt>\n    <dd>\n      <span class=\"failed-logins\">{{accessService.failed_logins}}</span>\n    </dd>\n  </dl>\n</div>\n"

/***/ }),

/***/ 617:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(411);


/***/ })

},[617]);
//# sourceMappingURL=main.bundle.js.map