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
    var CardAttribute = (function () {
        function CardAttribute(element) {
            this.element = element;
        }
        CardAttribute.prototype.attached = function () {
            this.element.classList.add("card");
            if (this.size) {
                this.element.classList.add(this.size);
            }
        };
        CardAttribute.prototype.detached = function () {
            this.element.classList.remove("card", "small", "medium", "large");
        };
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], CardAttribute.prototype, "size", void 0);
        CardAttribute = __decorate([
            aurelia_framework_1.customAttribute(config_1.config.card),
            aurelia_dependency_injection_1.inject(Element), 
            __metadata('design:paramtypes', [Element])
        ], CardAttribute);
        return CardAttribute;
    }());
    exports.CardAttribute = CardAttribute;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY2FyZC9jYXJkQXR0cmlidXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBTUE7UUFFSSx1QkFBbUIsT0FBZ0I7WUFBaEIsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUVuQyxDQUFDO1FBS00sZ0NBQVEsR0FBZjtZQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDWixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFDLENBQUM7UUFDTCxDQUFDO1FBRU0sZ0NBQVEsR0FBZjtZQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN0RSxDQUFDO1FBWkQ7WUFBQyw0QkFBUSxFQUFFOzttREFBQTtRQVJmO1lBQUMsbUNBQWUsQ0FBQyxlQUFNLENBQUMsSUFBSSxDQUFDO1lBQzVCLHFDQUFNLENBQUMsT0FBTyxDQUFDOzt5QkFBQTtRQW9CaEIsb0JBQUM7SUFBRCxDQW5CQSxBQW1CQyxJQUFBO0lBbkJZLHFCQUFhLGdCQW1CekIsQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL2NhcmQvY2FyZEF0dHJpYnV0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGJpbmRhYmxlLCBjdXN0b21BdHRyaWJ1dGUgfSBmcm9tIFwiYXVyZWxpYS1mcmFtZXdvcmtcIjtcclxuaW1wb3J0IHsgaW5qZWN0IH0gZnJvbSBcImF1cmVsaWEtZGVwZW5kZW5jeS1pbmplY3Rpb25cIjtcclxuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSBcIi4vLi4vLi4vY29uZmlnXCI7XHJcblxyXG5AY3VzdG9tQXR0cmlidXRlKGNvbmZpZy5jYXJkKVxyXG5AaW5qZWN0KEVsZW1lbnQpXHJcbmV4cG9ydCBjbGFzcyBDYXJkQXR0cmlidXRlIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBAYmluZGFibGUoKVxyXG4gICAgcHVibGljIHNpemU6IHN0cmluZztcclxuXHJcbiAgICBwdWJsaWMgYXR0YWNoZWQoKSB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJjYXJkXCIpO1xyXG4gICAgICAgIGlmICh0aGlzLnNpemUpIHtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5zaXplKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRldGFjaGVkKCkge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiY2FyZFwiLCBcInNtYWxsXCIsIFwibWVkaXVtXCIsIFwibGFyZ2VcIik7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
