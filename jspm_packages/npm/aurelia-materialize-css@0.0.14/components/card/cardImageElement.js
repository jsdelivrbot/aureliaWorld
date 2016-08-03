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
    var CardImageElement = (function () {
        function CardImageElement() {
        }
        CardImageElement.prototype.attached = function () {
            this.element.classList.add("card-image");
            this.titleElement.classList.add("card-title");
            this.imageElement.src = this.imageUrl;
            this.titleElement.textContent = this.title;
        };
        CardImageElement.prototype.detached = function () {
            this.element.classList.remove("card-image");
            this.titleElement.classList.remove("card-title");
            this.imageElement.removeAttribute("src");
            this.titleElement.textContent = "";
        };
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], CardImageElement.prototype, "imageUrl", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], CardImageElement.prototype, "title", void 0);
        CardImageElement = __decorate([
            aurelia_framework_1.customElement(config_1.config.cardImage),
            aurelia_framework_1.inlineView("<template><div ref='element'><img ref='imageElement'></image><span ref='titleElement'></span></div></template>"), 
            __metadata('design:paramtypes', [])
        ], CardImageElement);
        return CardImageElement;
    }());
    exports.CardImageElement = CardImageElement;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY2FyZC9jYXJkSW1hZ2VFbGVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBS0E7UUFBQTtRQXlCQSxDQUFDO1FBYlUsbUNBQVEsR0FBZjtZQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUN0QyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQy9DLENBQUM7UUFFTSxtQ0FBUSxHQUFmO1lBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDdkMsQ0FBQztRQWxCRDtZQUFDLDRCQUFRLEVBQUU7OzBEQUFBO1FBR1g7WUFBQyw0QkFBUSxFQUFFOzt1REFBQTtRQVhmO1lBQUMsaUNBQWEsQ0FBQyxlQUFNLENBQUMsU0FBUyxDQUFDO1lBQy9CLDhCQUFVLENBQUMsZ0hBQWdILENBQUM7OzRCQUFBO1FBMEI3SCx1QkFBQztJQUFELENBekJBLEFBeUJDLElBQUE7SUF6Qlksd0JBQWdCLG1CQXlCNUIsQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL2NhcmQvY2FyZEltYWdlRWxlbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGJpbmRhYmxlLCBjdXN0b21FbGVtZW50LCBpbmxpbmVWaWV3IH0gZnJvbSBcImF1cmVsaWEtZnJhbWV3b3JrXCI7XHJcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gXCIuLy4uLy4uL2NvbmZpZ1wiO1xyXG5cclxuQGN1c3RvbUVsZW1lbnQoY29uZmlnLmNhcmRJbWFnZSlcclxuQGlubGluZVZpZXcoXCI8dGVtcGxhdGU+PGRpdiByZWY9J2VsZW1lbnQnPjxpbWcgcmVmPSdpbWFnZUVsZW1lbnQnPjwvaW1hZ2U+PHNwYW4gcmVmPSd0aXRsZUVsZW1lbnQnPjwvc3Bhbj48L2Rpdj48L3RlbXBsYXRlPlwiKVxyXG5leHBvcnQgY2xhc3MgQ2FyZEltYWdlRWxlbWVudCB7XHJcblxyXG4gICAgcHVibGljIGVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgcHVibGljIGltYWdlRWxlbWVudDogSFRNTEltYWdlRWxlbWVudDtcclxuICAgIHB1YmxpYyB0aXRsZUVsZW1lbnQ6IEhUTUxTcGFuRWxlbWVudDtcclxuXHJcbiAgICBAYmluZGFibGUoKVxyXG4gICAgcHVibGljIGltYWdlVXJsOiBzdHJpbmc7XHJcblxyXG4gICAgQGJpbmRhYmxlKClcclxuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xyXG5cclxuICAgIHB1YmxpYyBhdHRhY2hlZCgpIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImNhcmQtaW1hZ2VcIik7XHJcbiAgICAgICAgdGhpcy50aXRsZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImNhcmQtdGl0bGVcIik7XHJcbiAgICAgICAgdGhpcy5pbWFnZUVsZW1lbnQuc3JjID0gdGhpcy5pbWFnZVVybDtcclxuICAgICAgICB0aGlzLnRpdGxlRWxlbWVudC50ZXh0Q29udGVudCA9IHRoaXMudGl0bGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRldGFjaGVkKCkge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiY2FyZC1pbWFnZVwiKTtcclxuICAgICAgICB0aGlzLnRpdGxlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiY2FyZC10aXRsZVwiKTtcclxuICAgICAgICB0aGlzLmltYWdlRWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoXCJzcmNcIik7XHJcbiAgICAgICAgdGhpcy50aXRsZUVsZW1lbnQudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
