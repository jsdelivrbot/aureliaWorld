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
define(["require", "exports", "aurelia-framework", "./../../config"], function (require, exports, aurelia_framework_1, config_1) {
    "use strict";
    var CollapsibleElement = (function () {
        function CollapsibleElement() {
        }
        CollapsibleElement.prototype.attached = function () {
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
        CollapsibleElement.prototype.detached = function () {
            this.element.removeAttribute("data-collapsible");
            for (var i = 0; i < this.element.classList.length; i++) {
                this.element.classList.remove(this.element.classList[i]);
            }
        };
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], CollapsibleElement.prototype, "id", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultValue: "accordion" }), 
            __metadata('design:type', String)
        ], CollapsibleElement.prototype, "type", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultValue: "" }), 
            __metadata('design:type', String)
        ], CollapsibleElement.prototype, "class", void 0);
        CollapsibleElement = __decorate([
            aurelia_framework_1.customElement(config_1.config.collapsible),
            aurelia_framework_1.containerless,
            aurelia_framework_1.inlineView("<template><ul ref='element' id='${id}'><content></content></ul></template>"), 
            __metadata('design:paramtypes', [])
        ], CollapsibleElement);
        return CollapsibleElement;
    }());
    exports.CollapsibleElement = CollapsibleElement;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImphdmFzY3JpcHQvY29sbGFwc2libGUvY29sbGFwc2libGVFbGVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBTUE7UUFBQTtRQXFDQSxDQUFDO1FBeEJVLHFDQUFRLEdBQWY7WUFBQSxpQkFjQztZQVpHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFekQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNsRCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPO29CQUNqQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDakIsS0FBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUN4QyxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQztZQUVELENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbEMsQ0FBQztRQUVNLHFDQUFRLEdBQWY7WUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBR2pELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ3JELElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdELENBQUM7UUFDTCxDQUFDO1FBaENEO1lBQUMsNEJBQVEsRUFBRTs7c0RBQUE7UUFHWDtZQUFDLDRCQUFRLENBQUMsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLENBQUM7O3dEQUFBO1FBR3hDO1lBQUMsNEJBQVEsQ0FBQyxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsQ0FBQzs7eURBQUE7UUFibkM7WUFBQyxpQ0FBYSxDQUFDLGVBQU0sQ0FBQyxXQUFXLENBQUM7WUFDakMsaUNBQWE7WUFDYiw4QkFBVSxDQUFDLDRFQUE0RSxDQUFDOzs4QkFBQTtRQXNDekYseUJBQUM7SUFBRCxDQXJDQSxBQXFDQyxJQUFBO0lBckNZLDBCQUFrQixxQkFxQzlCLENBQUEiLCJmaWxlIjoiamF2YXNjcmlwdC9jb2xsYXBzaWJsZS9jb2xsYXBzaWJsZUVsZW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBiaW5kYWJsZSwgY3VzdG9tRWxlbWVudCwgY29udGFpbmVybGVzcywgaW5saW5lVmlldyB9IGZyb20gXCJhdXJlbGlhLWZyYW1ld29ya1wiO1xyXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tIFwiLi8uLi8uLi9jb25maWdcIjtcclxuXHJcbkBjdXN0b21FbGVtZW50KGNvbmZpZy5jb2xsYXBzaWJsZSlcclxuQGNvbnRhaW5lcmxlc3NcclxuQGlubGluZVZpZXcoXCI8dGVtcGxhdGU+PHVsIHJlZj0nZWxlbWVudCcgaWQ9JyR7aWR9Jz48Y29udGVudD48L2NvbnRlbnQ+PC91bD48L3RlbXBsYXRlPlwiKVxyXG5leHBvcnQgY2xhc3MgQ29sbGFwc2libGVFbGVtZW50IHtcclxuXHJcbiAgICBwdWJsaWMgZWxlbWVudDogSFRNTFVMaXN0RWxlbWVudDtcclxuXHJcbiAgICBAYmluZGFibGUoKVxyXG4gICAgcHVibGljIGlkOiBzdHJpbmc7XHJcblxyXG4gICAgQGJpbmRhYmxlKHsgZGVmYXVsdFZhbHVlOiBcImFjY29yZGlvblwiIH0pXHJcbiAgICBwdWJsaWMgdHlwZTogc3RyaW5nO1xyXG5cclxuICAgIEBiaW5kYWJsZSh7IGRlZmF1bHRWYWx1ZTogXCJcIiB9KVxyXG4gICAgcHVibGljIGNsYXNzOiBzdHJpbmc7XHJcblxyXG4gICAgcHVibGljIGF0dGFjaGVkKCkge1xyXG5cclxuICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImNvbGxhcHNpYmxlXCIpO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbGxhcHNpYmxlXCIsIHRoaXMudHlwZSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmNsYXNzICE9PSB1bmRlZmluZWQgJiYgdGhpcy5jbGFzcyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLmNsYXNzLnNwbGl0KFwiIFwiKS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChlbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKHRoaXMuZWxlbWVudCkuY29sbGFwc2libGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGV0YWNoZWQoKSB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShcImRhdGEtY29sbGFwc2libGVcIik7XHJcblxyXG4gICAgICAgIC8vIFRoZXJlIHNob3VsZCBub3QgYmUgYW55IGNzcyBjbGFzcyBvbiB0aGUgdWwuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZWxlbWVudC5jbGFzc0xpc3RbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
