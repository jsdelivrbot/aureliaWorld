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
    var CardRevealAttribute = (function () {
        function CardRevealAttribute(element) {
            this.element = element;
        }
        CardRevealAttribute.prototype.attached = function () {
            this.element.classList.add("card-reveal");
        };
        CardRevealAttribute.prototype.detached = function () {
            this.element.classList.remove("card-reveal");
        };
        CardRevealAttribute = __decorate([
            aurelia_framework_1.customAttribute(config_1.config.cardReveal),
            aurelia_dependency_injection_1.inject(Element), 
            __metadata('design:paramtypes', [Element])
        ], CardRevealAttribute);
        return CardRevealAttribute;
    }());
    exports.CardRevealAttribute = CardRevealAttribute;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY2FyZC9jYXJkUmV2ZWFsQXR0cmlidXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBTUE7UUFFSSw2QkFBbUIsT0FBZ0I7WUFBaEIsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUVuQyxDQUFDO1FBRU0sc0NBQVEsR0FBZjtZQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM5QyxDQUFDO1FBRU0sc0NBQVEsR0FBZjtZQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNqRCxDQUFDO1FBZEw7WUFBQyxtQ0FBZSxDQUFDLGVBQU0sQ0FBQyxVQUFVLENBQUM7WUFDbEMscUNBQU0sQ0FBQyxPQUFPLENBQUM7OytCQUFBO1FBY2hCLDBCQUFDO0lBQUQsQ0FiQSxBQWFDLElBQUE7SUFiWSwyQkFBbUIsc0JBYS9CLENBQUEiLCJmaWxlIjoiY29tcG9uZW50cy9jYXJkL2NhcmRSZXZlYWxBdHRyaWJ1dGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjdXN0b21BdHRyaWJ1dGUgfSBmcm9tIFwiYXVyZWxpYS1mcmFtZXdvcmtcIjtcclxuaW1wb3J0IHsgaW5qZWN0IH0gZnJvbSBcImF1cmVsaWEtZGVwZW5kZW5jeS1pbmplY3Rpb25cIjtcclxuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSBcIi4vLi4vLi4vY29uZmlnXCI7XHJcblxyXG5AY3VzdG9tQXR0cmlidXRlKGNvbmZpZy5jYXJkUmV2ZWFsKVxyXG5AaW5qZWN0KEVsZW1lbnQpXHJcbmV4cG9ydCBjbGFzcyBDYXJkUmV2ZWFsQXR0cmlidXRlIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXR0YWNoZWQoKSB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJjYXJkLXJldmVhbFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGV0YWNoZWQoKSB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJjYXJkLXJldmVhbFwiKTtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
