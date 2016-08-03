/* */ 
define(["require", "exports", "./config", "@eriklieben/materialize-css"], function (require, exports, materialConfig) {
    "use strict";
    var MaterializeCssOptions = (function () {
        function MaterializeCssOptions() {
            this.enableAttributes = true;
            this.enableElements = true;
            this.attributeFilter = undefined;
            this.elementFilter = undefined;
            this.configuration = new materialConfig.Configuration();
        }
        return MaterializeCssOptions;
    }());
    exports.MaterializeCssOptions = MaterializeCssOptions;
    function configure(config, options) {
        options = Object.assign(new MaterializeCssOptions(), options);
        materialConfig.config = options.configuration;
        var attributes = [
            "./javascript/collapsible/collapsibleAttribute",
            "./javascript/collapsible/collapsibleBodyAttribute",
            "./javascript/collapsible/collapsibleHeaderAttribute",
            "./javascript/dropdown/dropdownAttribute",
            "./javascript/dropdown/dropdownDividerAttribute",
            "./javascript/media/boxedAttribute",
            "./javascript/modals/modalTriggerAttribute",
            "./javascript/pushpin/pushpinAttribute",
            "./javascript/scrollspy/scrollspyAttribute",
            "./components/forms/selectAttribute",
            "./components/forms/pickadateAttribute",
            "./components/badge/badgeAttribute",
            "./components/icon/iconAttribute",
            "./components/breadcrumbs/breadcrumbAttribute",
            "./components/breadcrumbs/breadcrumbsAttribute",
            "./components/card/cardAttribute",
            "./components/card/cardTitleAttribute",
            "./components/card/cardActionAttribute",
            "./components/card/cardImageAttribute",
            "./components/card/cardRevealAttribute",
            "./components/card/cardPanelAttribute",
        ];
        var elements = [
            "./javascript/collapsible/collapsibleElement",
            "./javascript/collapsible/collapsibleBodyElement",
            "./javascript/collapsible/collapsibleHeaderElement",
            "./javascript/collapsible/collapsibleItemElement",
            "./javascript/dropdown/dropdownElement",
            "./javascript/dropdown/dropdownDividerElement",
            "./javascript/dropdown/dropdownItemElement",
            "./javascript/media/slideElement",
            "./javascript/media/sliderElement",
            "./javascript/modals/modalContentElement",
            "./javascript/modals/modalElement",
            "./javascript/modals/modalFooterElement",
            "./javascript/pushpin/pushpinElement",
            "./javascript/scrollspy/scrollspyElement",
            "./components/badge/badgeElement",
            "./components/icon/iconElement",
            "./components/breadcrumbs/breadcrumbElement",
            "./components/breadcrumbs/breadcrumbsElement",
            "./components/card/cardElement",
            "./components/card/cardTitleElement",
            "./components/card/cardActionElement",
            "./components/card/cardImageElement",
            "./components/card/cardRevealElement",
            "./components/card/cardPanelElement",
        ];
        if (options.attributeFilter) {
            attributes = attributes.filter(options.attributeFilter);
        }
        if (options.elementFilter) {
            elements = elements.filter(options.elementFilter);
        }
        if (options.enableAttributes) {
            config.globalResources(attributes);
        }
        if (options.enableElements) {
            config.globalResources(elements);
        }
    }
    exports.configure = configure;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = MaterializeCssOptions;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBT0E7UUFBQTtZQUNXLHFCQUFnQixHQUFHLElBQUksQ0FBQztZQUN4QixtQkFBYyxHQUFHLElBQUksQ0FBQztZQUV0QixvQkFBZSxHQUErRCxTQUFTLENBQUM7WUFDeEYsa0JBQWEsR0FBK0QsU0FBUyxDQUFDO1lBRXRGLGtCQUFhLEdBQWtDLElBQUksY0FBYyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzdGLENBQUM7UUFBRCw0QkFBQztJQUFELENBUkEsQUFRQyxJQUFBO0lBUlksNkJBQXFCLHdCQVFqQyxDQUFBO0lBWUQsbUJBQTBCLE1BQThCLEVBQUUsT0FBZ0M7UUFFdEYsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxxQkFBcUIsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzlELGNBQWMsQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztRQUU5QyxJQUFJLFVBQVUsR0FBRztZQUNiLCtDQUErQztZQUMvQyxtREFBbUQ7WUFDbkQscURBQXFEO1lBRXJELHlDQUF5QztZQUN6QyxnREFBZ0Q7WUFFaEQsbUNBQW1DO1lBRW5DLDJDQUEyQztZQUUzQyx1Q0FBdUM7WUFFdkMsMkNBQTJDO1lBRTNDLG9DQUFvQztZQUNwQyx1Q0FBdUM7WUFFdkMsbUNBQW1DO1lBQ25DLGlDQUFpQztZQUVqQyw4Q0FBOEM7WUFDOUMsK0NBQStDO1lBRS9DLGlDQUFpQztZQUNqQyxzQ0FBc0M7WUFDdEMsdUNBQXVDO1lBQ3ZDLHNDQUFzQztZQUN0Qyx1Q0FBdUM7WUFDdkMsc0NBQXNDO1NBQ3pDLENBQUM7UUFFRixJQUFJLFFBQVEsR0FBRztZQUNYLDZDQUE2QztZQUM3QyxpREFBaUQ7WUFDakQsbURBQW1EO1lBQ25ELGlEQUFpRDtZQUVqRCx1Q0FBdUM7WUFDdkMsOENBQThDO1lBQzlDLDJDQUEyQztZQUUzQyxpQ0FBaUM7WUFDakMsa0NBQWtDO1lBRWxDLHlDQUF5QztZQUN6QyxrQ0FBa0M7WUFDbEMsd0NBQXdDO1lBRXhDLHFDQUFxQztZQUVyQyx5Q0FBeUM7WUFFekMsaUNBQWlDO1lBQ2pDLCtCQUErQjtZQUUvQiw0Q0FBNEM7WUFDNUMsNkNBQTZDO1lBRTdDLCtCQUErQjtZQUMvQixvQ0FBb0M7WUFDcEMscUNBQXFDO1lBQ3JDLG9DQUFvQztZQUNwQyxxQ0FBcUM7WUFDckMsb0NBQW9DO1NBQ3ZDLENBQUM7UUFHRixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUMxQixVQUFVLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDNUQsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLFFBQVEsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN0RCxDQUFDO1FBR0QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUMzQixNQUFNLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUN6QixNQUFNLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JDLENBQUM7SUFDTCxDQUFDO0lBMUZlLGlCQUFTLFlBMEZ4QixDQUFBO0lBRUQ7c0JBQWUscUJBQXFCLENBQUMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCJAZXJpa2xpZWJlbi9tYXRlcmlhbGl6ZS1jc3NcIjtcclxuaW1wb3J0IHsgRnJhbWV3b3JrQ29uZmlndXJhdGlvbiB9IGZyb20gXCJhdXJlbGlhLWZyYW1ld29ya1wiO1xyXG5pbXBvcnQgKiBhcyBtYXRlcmlhbENvbmZpZyBmcm9tIFwiLi9jb25maWdcIjtcclxuXHJcbi8vIGltcG9ydCB7VG9hc3RTZXJ2aWNlIGFzIHRvYXN0U2VydmljZX0gZnJvbSBcIi4vamF2YXNjcmlwdC90b2FzdC9Ub2FzdFNlcnZpY2VcIjtcclxuLy8gZXhwb3J0IGNvbnN0IFRvYXN0U2VydmljZSA9IG5ldyB0b2FzdFNlcnZpY2UoKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbGl6ZUNzc09wdGlvbnMgaW1wbGVtZW50cyBJTWF0ZXJpYWxpemVDc3NPcHRpb25zIHtcclxuICAgIHB1YmxpYyBlbmFibGVBdHRyaWJ1dGVzID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBlbmFibGVFbGVtZW50cyA9IHRydWU7XHJcblxyXG4gICAgcHVibGljIGF0dHJpYnV0ZUZpbHRlcjogKHZhbHVlOiBzdHJpbmcsIGluZGV4OiBudW1iZXIsIGFycmF5OiBzdHJpbmdbXSkgPT4gYm9vbGVhbiA9IHVuZGVmaW5lZDtcclxuICAgIHB1YmxpYyBlbGVtZW50RmlsdGVyOiAodmFsdWU6IHN0cmluZywgaW5kZXg6IG51bWJlciwgYXJyYXk6IHN0cmluZ1tdKSA9PiBib29sZWFuID0gdW5kZWZpbmVkO1xyXG5cclxuICAgIHB1YmxpYyBjb25maWd1cmF0aW9uOiBtYXRlcmlhbENvbmZpZy5JQ29uZmlndXJhdGlvbiA9IG5ldyBtYXRlcmlhbENvbmZpZy5Db25maWd1cmF0aW9uKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU1hdGVyaWFsaXplQ3NzT3B0aW9ucyB7XHJcbiAgICBlbmFibGVBdHRyaWJ1dGVzPzogYm9vbGVhbjtcclxuICAgIGVuYWJsZUVsZW1lbnRzPzogYm9vbGVhbjtcclxuXHJcbiAgICBhdHRyaWJ1dGVGaWx0ZXI/OiAodmFsdWU6IHN0cmluZywgaW5kZXg6IG51bWJlciwgYXJyYXk6IHN0cmluZ1tdKSA9PiBib29sZWFuO1xyXG4gICAgZWxlbWVudEZpbHRlcj86ICh2YWx1ZTogc3RyaW5nLCBpbmRleDogbnVtYmVyLCBhcnJheTogc3RyaW5nW10pID0+IGJvb2xlYW47XHJcblxyXG4gICAgY29uZmlndXJhdGlvbj86IG1hdGVyaWFsQ29uZmlnLklDb25maWd1cmF0aW9uO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY29uZmlndXJlKGNvbmZpZzogRnJhbWV3b3JrQ29uZmlndXJhdGlvbiwgb3B0aW9ucz86IElNYXRlcmlhbGl6ZUNzc09wdGlvbnMpIHtcclxuXHJcbiAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbihuZXcgTWF0ZXJpYWxpemVDc3NPcHRpb25zKCksIG9wdGlvbnMpO1xyXG4gICAgbWF0ZXJpYWxDb25maWcuY29uZmlnID0gb3B0aW9ucy5jb25maWd1cmF0aW9uO1xyXG5cclxuICAgIGxldCBhdHRyaWJ1dGVzID0gW1xyXG4gICAgICAgIFwiLi9qYXZhc2NyaXB0L2NvbGxhcHNpYmxlL2NvbGxhcHNpYmxlQXR0cmlidXRlXCIsXHJcbiAgICAgICAgXCIuL2phdmFzY3JpcHQvY29sbGFwc2libGUvY29sbGFwc2libGVCb2R5QXR0cmlidXRlXCIsXHJcbiAgICAgICAgXCIuL2phdmFzY3JpcHQvY29sbGFwc2libGUvY29sbGFwc2libGVIZWFkZXJBdHRyaWJ1dGVcIixcclxuXHJcbiAgICAgICAgXCIuL2phdmFzY3JpcHQvZHJvcGRvd24vZHJvcGRvd25BdHRyaWJ1dGVcIixcclxuICAgICAgICBcIi4vamF2YXNjcmlwdC9kcm9wZG93bi9kcm9wZG93bkRpdmlkZXJBdHRyaWJ1dGVcIixcclxuXHJcbiAgICAgICAgXCIuL2phdmFzY3JpcHQvbWVkaWEvYm94ZWRBdHRyaWJ1dGVcIixcclxuXHJcbiAgICAgICAgXCIuL2phdmFzY3JpcHQvbW9kYWxzL21vZGFsVHJpZ2dlckF0dHJpYnV0ZVwiLFxyXG5cclxuICAgICAgICBcIi4vamF2YXNjcmlwdC9wdXNocGluL3B1c2hwaW5BdHRyaWJ1dGVcIixcclxuXHJcbiAgICAgICAgXCIuL2phdmFzY3JpcHQvc2Nyb2xsc3B5L3Njcm9sbHNweUF0dHJpYnV0ZVwiLFxyXG5cclxuICAgICAgICBcIi4vY29tcG9uZW50cy9mb3Jtcy9zZWxlY3RBdHRyaWJ1dGVcIixcclxuICAgICAgICBcIi4vY29tcG9uZW50cy9mb3Jtcy9waWNrYWRhdGVBdHRyaWJ1dGVcIixcclxuXHJcbiAgICAgICAgXCIuL2NvbXBvbmVudHMvYmFkZ2UvYmFkZ2VBdHRyaWJ1dGVcIixcclxuICAgICAgICBcIi4vY29tcG9uZW50cy9pY29uL2ljb25BdHRyaWJ1dGVcIixcclxuXHJcbiAgICAgICAgXCIuL2NvbXBvbmVudHMvYnJlYWRjcnVtYnMvYnJlYWRjcnVtYkF0dHJpYnV0ZVwiLFxyXG4gICAgICAgIFwiLi9jb21wb25lbnRzL2JyZWFkY3J1bWJzL2JyZWFkY3J1bWJzQXR0cmlidXRlXCIsXHJcblxyXG4gICAgICAgIFwiLi9jb21wb25lbnRzL2NhcmQvY2FyZEF0dHJpYnV0ZVwiLFxyXG4gICAgICAgIFwiLi9jb21wb25lbnRzL2NhcmQvY2FyZFRpdGxlQXR0cmlidXRlXCIsXHJcbiAgICAgICAgXCIuL2NvbXBvbmVudHMvY2FyZC9jYXJkQWN0aW9uQXR0cmlidXRlXCIsXHJcbiAgICAgICAgXCIuL2NvbXBvbmVudHMvY2FyZC9jYXJkSW1hZ2VBdHRyaWJ1dGVcIixcclxuICAgICAgICBcIi4vY29tcG9uZW50cy9jYXJkL2NhcmRSZXZlYWxBdHRyaWJ1dGVcIixcclxuICAgICAgICBcIi4vY29tcG9uZW50cy9jYXJkL2NhcmRQYW5lbEF0dHJpYnV0ZVwiLFxyXG4gICAgXTtcclxuXHJcbiAgICBsZXQgZWxlbWVudHMgPSBbXHJcbiAgICAgICAgXCIuL2phdmFzY3JpcHQvY29sbGFwc2libGUvY29sbGFwc2libGVFbGVtZW50XCIsXHJcbiAgICAgICAgXCIuL2phdmFzY3JpcHQvY29sbGFwc2libGUvY29sbGFwc2libGVCb2R5RWxlbWVudFwiLFxyXG4gICAgICAgIFwiLi9qYXZhc2NyaXB0L2NvbGxhcHNpYmxlL2NvbGxhcHNpYmxlSGVhZGVyRWxlbWVudFwiLFxyXG4gICAgICAgIFwiLi9qYXZhc2NyaXB0L2NvbGxhcHNpYmxlL2NvbGxhcHNpYmxlSXRlbUVsZW1lbnRcIixcclxuXHJcbiAgICAgICAgXCIuL2phdmFzY3JpcHQvZHJvcGRvd24vZHJvcGRvd25FbGVtZW50XCIsXHJcbiAgICAgICAgXCIuL2phdmFzY3JpcHQvZHJvcGRvd24vZHJvcGRvd25EaXZpZGVyRWxlbWVudFwiLFxyXG4gICAgICAgIFwiLi9qYXZhc2NyaXB0L2Ryb3Bkb3duL2Ryb3Bkb3duSXRlbUVsZW1lbnRcIixcclxuXHJcbiAgICAgICAgXCIuL2phdmFzY3JpcHQvbWVkaWEvc2xpZGVFbGVtZW50XCIsXHJcbiAgICAgICAgXCIuL2phdmFzY3JpcHQvbWVkaWEvc2xpZGVyRWxlbWVudFwiLFxyXG5cclxuICAgICAgICBcIi4vamF2YXNjcmlwdC9tb2RhbHMvbW9kYWxDb250ZW50RWxlbWVudFwiLFxyXG4gICAgICAgIFwiLi9qYXZhc2NyaXB0L21vZGFscy9tb2RhbEVsZW1lbnRcIixcclxuICAgICAgICBcIi4vamF2YXNjcmlwdC9tb2RhbHMvbW9kYWxGb290ZXJFbGVtZW50XCIsXHJcblxyXG4gICAgICAgIFwiLi9qYXZhc2NyaXB0L3B1c2hwaW4vcHVzaHBpbkVsZW1lbnRcIixcclxuXHJcbiAgICAgICAgXCIuL2phdmFzY3JpcHQvc2Nyb2xsc3B5L3Njcm9sbHNweUVsZW1lbnRcIixcclxuXHJcbiAgICAgICAgXCIuL2NvbXBvbmVudHMvYmFkZ2UvYmFkZ2VFbGVtZW50XCIsXHJcbiAgICAgICAgXCIuL2NvbXBvbmVudHMvaWNvbi9pY29uRWxlbWVudFwiLFxyXG5cclxuICAgICAgICBcIi4vY29tcG9uZW50cy9icmVhZGNydW1icy9icmVhZGNydW1iRWxlbWVudFwiLFxyXG4gICAgICAgIFwiLi9jb21wb25lbnRzL2JyZWFkY3J1bWJzL2JyZWFkY3J1bWJzRWxlbWVudFwiLFxyXG5cclxuICAgICAgICBcIi4vY29tcG9uZW50cy9jYXJkL2NhcmRFbGVtZW50XCIsXHJcbiAgICAgICAgXCIuL2NvbXBvbmVudHMvY2FyZC9jYXJkVGl0bGVFbGVtZW50XCIsXHJcbiAgICAgICAgXCIuL2NvbXBvbmVudHMvY2FyZC9jYXJkQWN0aW9uRWxlbWVudFwiLFxyXG4gICAgICAgIFwiLi9jb21wb25lbnRzL2NhcmQvY2FyZEltYWdlRWxlbWVudFwiLFxyXG4gICAgICAgIFwiLi9jb21wb25lbnRzL2NhcmQvY2FyZFJldmVhbEVsZW1lbnRcIixcclxuICAgICAgICBcIi4vY29tcG9uZW50cy9jYXJkL2NhcmRQYW5lbEVsZW1lbnRcIixcclxuICAgIF07XHJcblxyXG4gICAgLy8gRmlsdGVyIG91dCBhdHRyaWJ1dGVzIGFuZCBlbGVtZW50c1xyXG4gICAgaWYgKG9wdGlvbnMuYXR0cmlidXRlRmlsdGVyKSB7XHJcbiAgICAgICAgYXR0cmlidXRlcyA9IGF0dHJpYnV0ZXMuZmlsdGVyKG9wdGlvbnMuYXR0cmlidXRlRmlsdGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3B0aW9ucy5lbGVtZW50RmlsdGVyKSB7XHJcbiAgICAgICAgZWxlbWVudHMgPSBlbGVtZW50cy5maWx0ZXIob3B0aW9ucy5lbGVtZW50RmlsdGVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBPbmx5IGxvYWQgYXR0cmlidXRlcyAmIGVsZW1lbnRzIGlmIHRoZXkgYXJlIGVuYWJsZWRcclxuICAgIGlmIChvcHRpb25zLmVuYWJsZUF0dHJpYnV0ZXMpIHtcclxuICAgICAgICBjb25maWcuZ2xvYmFsUmVzb3VyY2VzKGF0dHJpYnV0ZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcHRpb25zLmVuYWJsZUVsZW1lbnRzKSB7XHJcbiAgICAgICAgY29uZmlnLmdsb2JhbFJlc291cmNlcyhlbGVtZW50cyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1hdGVyaWFsaXplQ3NzT3B0aW9ucztcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
