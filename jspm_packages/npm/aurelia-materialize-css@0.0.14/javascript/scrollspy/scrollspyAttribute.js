/* */ 
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "aurelia-dependency-injection", "./../../config"], function (require, exports, aurelia_framework_1, aurelia_dependency_injection_1, config_1) {
    "use strict";
    var ScrollSpyAttribute = (function () {
        function ScrollSpyAttribute(element) {
            this.element = element;
        }
        ScrollSpyAttribute.prototype.attached = function () {
            $("*[id]", this.element).scrollSpy();
        };
        ScrollSpyAttribute = __decorate([
            aurelia_framework_1.customAttribute(config_1.config.scrollSpy),
            aurelia_dependency_injection_1.inject(Element), 
            __metadata('design:paramtypes', [Element])
        ], ScrollSpyAttribute);
        return ScrollSpyAttribute;
    }());
    exports.ScrollSpyAttribute = ScrollSpyAttribute;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImphdmFzY3JpcHQvc2Nyb2xsc3B5L3Njcm9sbHNweUF0dHJpYnV0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQU1BO1FBRUksNEJBQW9CLE9BQWdCO1lBQWhCLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFDcEMsQ0FBQztRQUVNLHFDQUFRLEdBQWY7WUFDSSxDQUFDLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN6QyxDQUFDO1FBVEw7WUFBQyxtQ0FBZSxDQUFDLGVBQU0sQ0FBQyxTQUFTLENBQUM7WUFDakMscUNBQU0sQ0FBQyxPQUFPLENBQUM7OzhCQUFBO1FBU2hCLHlCQUFDO0lBQUQsQ0FSQSxBQVFDLElBQUE7SUFSWSwwQkFBa0IscUJBUTlCLENBQUEiLCJmaWxlIjoiamF2YXNjcmlwdC9zY3JvbGxzcHkvc2Nyb2xsc3B5QXR0cmlidXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3VzdG9tQXR0cmlidXRlIH0gZnJvbSBcImF1cmVsaWEtZnJhbWV3b3JrXCI7XHJcbmltcG9ydCB7IGluamVjdCB9IGZyb20gXCJhdXJlbGlhLWRlcGVuZGVuY3ktaW5qZWN0aW9uXCI7XHJcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gXCIuLy4uLy4uL2NvbmZpZ1wiO1xyXG5cclxuQGN1c3RvbUF0dHJpYnV0ZShjb25maWcuc2Nyb2xsU3B5KVxyXG5AaW5qZWN0KEVsZW1lbnQpXHJcbmV4cG9ydCBjbGFzcyBTY3JvbGxTcHlBdHRyaWJ1dGUge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudDogRWxlbWVudCkge1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhdHRhY2hlZCgpIHtcclxuICAgICAgICAkKFwiKltpZF1cIiwgdGhpcy5lbGVtZW50KS5zY3JvbGxTcHkoKTtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
