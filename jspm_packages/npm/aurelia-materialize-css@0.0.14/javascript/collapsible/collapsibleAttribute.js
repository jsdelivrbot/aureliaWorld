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
    var CollapsibleAttribute = (function () {
        function CollapsibleAttribute(element) {
            this.element = element;
        }
        CollapsibleAttribute.prototype.attached = function () {
            var _this = this;
            this.element.classList.add("collapsible");
            this.element.setAttribute("data-collapsible", this.type);
            if (this.class !== undefined && this.class !== null) {
                this.class.split(" ").forEach(function (element) {
                    if (element !== "") {
                        _this.element.classList.add(element);
                    }
                });
            }
            $(this.element).collapsible();
        };
        CollapsibleAttribute.prototype.detached = function () {
            this.element.removeAttribute("data-collapsible");
            for (var i = 0; i < this.element.classList.length; i++) {
                this.element.classList.remove(this.element.classList[i]);
            }
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultValue: "accordion" }), 
            __metadata('design:type', String)
        ], CollapsibleAttribute.prototype, "type", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultValue: "" }), 
            __metadata('design:type', String)
        ], CollapsibleAttribute.prototype, "class", void 0);
        CollapsibleAttribute = __decorate([
            aurelia_framework_1.customAttribute(config_1.config.collapsible),
            aurelia_dependency_injection_1.inject(Element), 
            __metadata('design:paramtypes', [HTMLUListElement])
        ], CollapsibleAttribute);
        return CollapsibleAttribute;
    }());
    exports.CollapsibleAttribute = CollapsibleAttribute;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImphdmFzY3JpcHQvY29sbGFwc2libGUvY29sbGFwc2libGVBdHRyaWJ1dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFPQTtRQVFJLDhCQUFvQixPQUF5QjtZQUF6QixZQUFPLEdBQVAsT0FBTyxDQUFrQjtRQUM3QyxDQUFDO1FBRU0sdUNBQVEsR0FBZjtZQUFBLGlCQWNDO1lBWkcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUV6RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2xELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLE9BQU87b0JBQ2pDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUNqQixLQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3hDLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDO1lBRUQsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNsQyxDQUFDO1FBRU0sdUNBQVEsR0FBZjtZQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFHakQsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDckQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0QsQ0FBQztRQUNMLENBQUM7UUFoQ0Q7WUFBQyw0QkFBUSxDQUFDLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxDQUFDOzswREFBQTtRQUd4QztZQUFDLDRCQUFRLENBQUMsRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLENBQUM7OzJEQUFBO1FBUG5DO1lBQUMsbUNBQWUsQ0FBQyxlQUFNLENBQUMsV0FBVyxDQUFDO1lBQ25DLHFDQUFNLENBQUMsT0FBTyxDQUFDOztnQ0FBQTtRQW9DaEIsMkJBQUM7SUFBRCxDQW5DQSxBQW1DQyxJQUFBO0lBbkNZLDRCQUFvQix1QkFtQ2hDLENBQUEiLCJmaWxlIjoiamF2YXNjcmlwdC9jb2xsYXBzaWJsZS9jb2xsYXBzaWJsZUF0dHJpYnV0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBiaW5kYWJsZSwgY3VzdG9tQXR0cmlidXRlIH0gZnJvbSBcImF1cmVsaWEtZnJhbWV3b3JrXCI7XHJcbmltcG9ydCB7IGluamVjdCB9IGZyb20gXCJhdXJlbGlhLWRlcGVuZGVuY3ktaW5qZWN0aW9uXCI7XHJcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gXCIuLy4uLy4uL2NvbmZpZ1wiO1xyXG5cclxuQGN1c3RvbUF0dHJpYnV0ZShjb25maWcuY29sbGFwc2libGUpXHJcbkBpbmplY3QoRWxlbWVudClcclxuZXhwb3J0IGNsYXNzIENvbGxhcHNpYmxlQXR0cmlidXRlIHtcclxuXHJcbiAgICBAYmluZGFibGUoeyBkZWZhdWx0VmFsdWU6IFwiYWNjb3JkaW9uXCIgfSlcclxuICAgIHB1YmxpYyB0eXBlOiBzdHJpbmc7XHJcblxyXG4gICAgQGJpbmRhYmxlKHsgZGVmYXVsdFZhbHVlOiBcIlwiIH0pXHJcbiAgICBwdWJsaWMgY2xhc3M6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnQ6IEhUTUxVTGlzdEVsZW1lbnQpIHtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXR0YWNoZWQoKSB7XHJcblxyXG4gICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiY29sbGFwc2libGVcIik7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtY29sbGFwc2libGVcIiwgdGhpcy50eXBlKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY2xhc3MgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmNsYXNzICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xhc3Muc3BsaXQoXCIgXCIpLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudCAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQodGhpcy5lbGVtZW50KS5jb2xsYXBzaWJsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZXRhY2hlZCgpIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKFwiZGF0YS1jb2xsYXBzaWJsZVwiKTtcclxuXHJcbiAgICAgICAgLy8gVGhlcmUgc2hvdWxkIG5vdCBiZSBhbnkgY3NzIGNsYXNzIG9uIHRoZSB1bC5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZWxlbWVudC5jbGFzc0xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5lbGVtZW50LmNsYXNzTGlzdFtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
