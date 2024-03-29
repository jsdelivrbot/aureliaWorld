/* */ 
define(["require", "exports"], function (require, exports) {
    "use strict";
    var Configuration = (function () {
        function Configuration() {
            this.prefix = "m:";
            this.collapsible = (this.prefix + "collapsible").trim();
            this.collapsibleBody = (this.prefix + "collapsible-body").trim();
            this.collapsibleHeader = (this.prefix + "collapsible-header").trim();
            this.collapsibleItem = (this.prefix + "collapsible-item").trim();
            this.dropdown = (this.prefix + "dropdown").trim();
            this.dropdownDivider = (this.prefix + "dropdown-divider").trim();
            this.dropdownItem = (this.prefix + "dropdown-item").trim();
            this.boxed = (this.prefix + "boxed").trim();
            this.slide = (this.prefix + "slide").trim();
            this.slider = (this.prefix + "slider").trim();
            this.modal = (this.prefix + "modal").trim();
            this.modalTrigger = (this.prefix + "modal-trigger").trim();
            this.modalContent = (this.prefix + "modal-content").trim();
            this.modalFooter = (this.prefix + "modal-footer").trim();
            this.pushpin = (this.prefix + "pushpin").trim();
            this.scrollSpy = (this.prefix + "scrollspy").trim();
            this.badge = (this.prefix + "badge").trim();
            this.icon = (this.prefix + "icon").trim();
            this.button = (this.prefix + "button").trim();
            this.breadcrumb = (this.prefix + "breadcrumb").trim();
            this.breadcrumbs = (this.prefix + "breadcrumbs").trim();
            this.materialSelect = (this.prefix + "select").trim();
            this.pickadate = (this.prefix + "pickadate").trim();
            this.card = (this.prefix + "card").trim();
            this.cardTitle = (this.prefix + "card-title").trim();
            this.cardAction = (this.prefix + "card-action").trim();
            this.cardImage = (this.prefix + "card-image").trim();
            this.cardReveal = (this.prefix + "card-reveal").trim();
            this.cardPanel = (this.prefix + "card-panel").trim();
            this.allowedWaves = ["light", "red", "yellow", "orange", "purple", "green", "teal"];
        }
        return Configuration;
    }());
    exports.Configuration = Configuration;
    exports.config = new Configuration();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = exports.config;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQUFBO1FBQUE7WUFFVyxXQUFNLEdBQUcsSUFBSSxDQUFDO1lBRWQsZ0JBQVcsR0FBRyxDQUFHLElBQUksQ0FBQyxNQUFNLGlCQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDakQsb0JBQWUsR0FBRyxDQUFHLElBQUksQ0FBQyxNQUFNLHNCQUFrQixDQUFDLElBQUksRUFBRSxDQUFDO1lBQzFELHNCQUFpQixHQUFHLENBQUcsSUFBSSxDQUFDLE1BQU0sd0JBQW9CLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDOUQsb0JBQWUsR0FBRyxDQUFHLElBQUksQ0FBQyxNQUFNLHNCQUFrQixDQUFDLElBQUksRUFBRSxDQUFDO1lBRTFELGFBQVEsR0FBRyxDQUFHLElBQUksQ0FBQyxNQUFNLGNBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMzQyxvQkFBZSxHQUFHLENBQUcsSUFBSSxDQUFDLE1BQU0sc0JBQWtCLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDMUQsaUJBQVksR0FBRyxDQUFHLElBQUksQ0FBQyxNQUFNLG1CQUFlLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFcEQsVUFBSyxHQUFHLENBQUcsSUFBSSxDQUFDLE1BQU0sV0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3JDLFVBQUssR0FBRyxDQUFHLElBQUksQ0FBQyxNQUFNLFdBQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNyQyxXQUFNLEdBQUcsQ0FBRyxJQUFJLENBQUMsTUFBTSxZQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFdkMsVUFBSyxHQUFHLENBQUcsSUFBSSxDQUFDLE1BQU0sV0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3JDLGlCQUFZLEdBQUcsQ0FBRyxJQUFJLENBQUMsTUFBTSxtQkFBZSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3BELGlCQUFZLEdBQUcsQ0FBRyxJQUFJLENBQUMsTUFBTSxtQkFBZSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3BELGdCQUFXLEdBQUcsQ0FBRyxJQUFJLENBQUMsTUFBTSxrQkFBYyxDQUFDLElBQUksRUFBRSxDQUFDO1lBRWxELFlBQU8sR0FBRyxDQUFHLElBQUksQ0FBQyxNQUFNLGFBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUV6QyxjQUFTLEdBQUcsQ0FBRyxJQUFJLENBQUMsTUFBTSxlQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFN0MsVUFBSyxHQUFHLENBQUcsSUFBSSxDQUFDLE1BQU0sV0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3JDLFNBQUksR0FBRyxDQUFHLElBQUksQ0FBQyxNQUFNLFVBQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNuQyxXQUFNLEdBQUcsQ0FBRyxJQUFJLENBQUMsTUFBTSxZQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFdkMsZUFBVSxHQUFHLENBQUcsSUFBSSxDQUFDLE1BQU0sZ0JBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMvQyxnQkFBVyxHQUFHLENBQUcsSUFBSSxDQUFDLE1BQU0saUJBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUVqRCxtQkFBYyxHQUFHLENBQUcsSUFBSSxDQUFDLE1BQU0sWUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQy9DLGNBQVMsR0FBRyxDQUFHLElBQUksQ0FBQyxNQUFNLGVBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUU3QyxTQUFJLEdBQUcsQ0FBRyxJQUFJLENBQUMsTUFBTSxVQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbkMsY0FBUyxHQUFHLENBQUcsSUFBSSxDQUFDLE1BQU0sZ0JBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUM5QyxlQUFVLEdBQUcsQ0FBRyxJQUFJLENBQUMsTUFBTSxpQkFBYSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2hELGNBQVMsR0FBRyxDQUFHLElBQUksQ0FBQyxNQUFNLGdCQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDOUMsZUFBVSxHQUFHLENBQUcsSUFBSSxDQUFDLE1BQU0saUJBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNoRCxjQUFTLEdBQUcsQ0FBRyxJQUFJLENBQUMsTUFBTSxnQkFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1lBRTlDLGlCQUFZLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUUsQ0FBQztRQUMzRixDQUFDO1FBQUQsb0JBQUM7SUFBRCxDQTVDQSxBQTRDQyxJQUFBO0lBNUNZLHFCQUFhLGdCQTRDekIsQ0FBQTtJQStDVSxjQUFNLEdBQW1CLElBQUksYUFBYSxFQUFFLENBQUM7SUFDeEQ7c0JBQWUsY0FBTSxDQUFDIiwiZmlsZSI6ImNvbmZpZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBDb25maWd1cmF0aW9uIGltcGxlbWVudHMgSUNvbmZpZ3VyYXRpb24ge1xyXG5cclxuICAgIHB1YmxpYyBwcmVmaXggPSBcIm06XCI7XHJcblxyXG4gICAgcHVibGljIGNvbGxhcHNpYmxlID0gYCR7dGhpcy5wcmVmaXh9Y29sbGFwc2libGVgLnRyaW0oKTtcclxuICAgIHB1YmxpYyBjb2xsYXBzaWJsZUJvZHkgPSBgJHt0aGlzLnByZWZpeH1jb2xsYXBzaWJsZS1ib2R5YC50cmltKCk7XHJcbiAgICBwdWJsaWMgY29sbGFwc2libGVIZWFkZXIgPSBgJHt0aGlzLnByZWZpeH1jb2xsYXBzaWJsZS1oZWFkZXJgLnRyaW0oKTtcclxuICAgIHB1YmxpYyBjb2xsYXBzaWJsZUl0ZW0gPSBgJHt0aGlzLnByZWZpeH1jb2xsYXBzaWJsZS1pdGVtYC50cmltKCk7XHJcblxyXG4gICAgcHVibGljIGRyb3Bkb3duID0gYCR7dGhpcy5wcmVmaXh9ZHJvcGRvd25gLnRyaW0oKTtcclxuICAgIHB1YmxpYyBkcm9wZG93bkRpdmlkZXIgPSBgJHt0aGlzLnByZWZpeH1kcm9wZG93bi1kaXZpZGVyYC50cmltKCk7XHJcbiAgICBwdWJsaWMgZHJvcGRvd25JdGVtID0gYCR7dGhpcy5wcmVmaXh9ZHJvcGRvd24taXRlbWAudHJpbSgpO1xyXG5cclxuICAgIHB1YmxpYyBib3hlZCA9IGAke3RoaXMucHJlZml4fWJveGVkYC50cmltKCk7XHJcbiAgICBwdWJsaWMgc2xpZGUgPSBgJHt0aGlzLnByZWZpeH1zbGlkZWAudHJpbSgpO1xyXG4gICAgcHVibGljIHNsaWRlciA9IGAke3RoaXMucHJlZml4fXNsaWRlcmAudHJpbSgpO1xyXG5cclxuICAgIHB1YmxpYyBtb2RhbCA9IGAke3RoaXMucHJlZml4fW1vZGFsYC50cmltKCk7XHJcbiAgICBwdWJsaWMgbW9kYWxUcmlnZ2VyID0gYCR7dGhpcy5wcmVmaXh9bW9kYWwtdHJpZ2dlcmAudHJpbSgpO1xyXG4gICAgcHVibGljIG1vZGFsQ29udGVudCA9IGAke3RoaXMucHJlZml4fW1vZGFsLWNvbnRlbnRgLnRyaW0oKTtcclxuICAgIHB1YmxpYyBtb2RhbEZvb3RlciA9IGAke3RoaXMucHJlZml4fW1vZGFsLWZvb3RlcmAudHJpbSgpO1xyXG5cclxuICAgIHB1YmxpYyBwdXNocGluID0gYCR7dGhpcy5wcmVmaXh9cHVzaHBpbmAudHJpbSgpO1xyXG5cclxuICAgIHB1YmxpYyBzY3JvbGxTcHkgPSBgJHt0aGlzLnByZWZpeH1zY3JvbGxzcHlgLnRyaW0oKTtcclxuXHJcbiAgICBwdWJsaWMgYmFkZ2UgPSBgJHt0aGlzLnByZWZpeH1iYWRnZWAudHJpbSgpO1xyXG4gICAgcHVibGljIGljb24gPSBgJHt0aGlzLnByZWZpeH1pY29uYC50cmltKCk7XHJcbiAgICBwdWJsaWMgYnV0dG9uID0gYCR7dGhpcy5wcmVmaXh9YnV0dG9uYC50cmltKCk7XHJcblxyXG4gICAgcHVibGljIGJyZWFkY3J1bWIgPSBgJHt0aGlzLnByZWZpeH1icmVhZGNydW1iYC50cmltKCk7XHJcbiAgICBwdWJsaWMgYnJlYWRjcnVtYnMgPSBgJHt0aGlzLnByZWZpeH1icmVhZGNydW1ic2AudHJpbSgpO1xyXG5cclxuICAgIHB1YmxpYyBtYXRlcmlhbFNlbGVjdCA9IGAke3RoaXMucHJlZml4fXNlbGVjdGAudHJpbSgpO1xyXG4gICAgcHVibGljIHBpY2thZGF0ZSA9IGAke3RoaXMucHJlZml4fXBpY2thZGF0ZWAudHJpbSgpO1xyXG5cclxuICAgIHB1YmxpYyBjYXJkID0gYCR7dGhpcy5wcmVmaXh9Y2FyZGAudHJpbSgpO1xyXG4gICAgcHVibGljIGNhcmRUaXRsZSA9IGAke3RoaXMucHJlZml4fWNhcmQtdGl0bGVgLnRyaW0oKTtcclxuICAgIHB1YmxpYyBjYXJkQWN0aW9uID0gYCR7dGhpcy5wcmVmaXh9Y2FyZC1hY3Rpb25gLnRyaW0oKTtcclxuICAgIHB1YmxpYyBjYXJkSW1hZ2UgPSBgJHt0aGlzLnByZWZpeH1jYXJkLWltYWdlYC50cmltKCk7XHJcbiAgICBwdWJsaWMgY2FyZFJldmVhbCA9IGAke3RoaXMucHJlZml4fWNhcmQtcmV2ZWFsYC50cmltKCk7XHJcbiAgICBwdWJsaWMgY2FyZFBhbmVsID0gYCR7dGhpcy5wcmVmaXh9Y2FyZC1wYW5lbGAudHJpbSgpO1xyXG5cclxuICAgIHB1YmxpYyBhbGxvd2VkV2F2ZXMgPSBbXCJsaWdodFwiLCBcInJlZFwiLCBcInllbGxvd1wiLCBcIm9yYW5nZVwiLCBcInB1cnBsZVwiLCBcImdyZWVuXCIsIFwidGVhbFwiIF07XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUNvbmZpZ3VyYXRpb24ge1xyXG4gICAgcHJlZml4Pzogc3RyaW5nO1xyXG5cclxuICAgIGNvbGxhcHNpYmxlPzogc3RyaW5nO1xyXG4gICAgY29sbGFwc2libGVCb2R5Pzogc3RyaW5nO1xyXG4gICAgY29sbGFwc2libGVIZWFkZXI/OiBzdHJpbmc7XHJcbiAgICBjb2xsYXBzaWJsZUl0ZW0/OiBzdHJpbmc7XHJcblxyXG4gICAgZHJvcGRvd24/OiBzdHJpbmc7XHJcbiAgICBkcm9wZG93bkRpdmlkZXI/OiBzdHJpbmc7XHJcbiAgICBkcm9wZG93bkl0ZW0/OiBzdHJpbmc7XHJcblxyXG4gICAgYm94ZWQ/OiBzdHJpbmc7XHJcbiAgICBzbGlkZT86IHN0cmluZztcclxuICAgIHNsaWRlcj86IHN0cmluZztcclxuXHJcbiAgICBtb2RhbD86IHN0cmluZztcclxuICAgIG1vZGFsVHJpZ2dlcj86IHN0cmluZztcclxuICAgIG1vZGFsQ29udGVudD86IHN0cmluZztcclxuICAgIG1vZGFsRm9vdGVyPzogc3RyaW5nO1xyXG5cclxuICAgIHB1c2hwaW4/OiBzdHJpbmc7XHJcblxyXG4gICAgc2Nyb2xsU3B5Pzogc3RyaW5nO1xyXG5cclxuICAgIGJhZGdlPzogc3RyaW5nO1xyXG4gICAgaWNvbj86IHN0cmluZztcclxuICAgIGJ1dHRvbj86IHN0cmluZztcclxuXHJcbiAgICBicmVhZGNydW1iPzogc3RyaW5nO1xyXG4gICAgYnJlYWRjcnVtYnM/OiBzdHJpbmc7XHJcblxyXG4gICAgbWF0ZXJpYWxTZWxlY3Q/OiBzdHJpbmc7XHJcbiAgICBwaWNrYWRhdGU/OiBzdHJpbmc7XHJcblxyXG4gICAgY2FyZD86IHN0cmluZztcclxuICAgIGNhcmRUaXRsZT86IHN0cmluZztcclxuICAgIGNhcmRBY3Rpb24/OiBzdHJpbmc7XHJcbiAgICBjYXJkSW1hZ2U/OiBzdHJpbmc7XHJcbiAgICBjYXJkUmV2ZWFsPzogc3RyaW5nO1xyXG4gICAgY2FyZFBhbmVsPzogc3RyaW5nO1xyXG5cclxuICAgIGFsbG93ZWRXYXZlcz86IEFycmF5PHN0cmluZz47XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgY29uZmlnOiBJQ29uZmlndXJhdGlvbiA9IG5ldyBDb25maWd1cmF0aW9uKCk7XHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
