//import {MaterializeCssOptions} from 'aurelia-materialize';
//import {MaterialValidationViewStrategy} from 'aurelia-materialize';

export function configure(aurelia) {
    aurelia.use
        .defaultBindingLanguage()
        .defaultResources()
        .developmentLogging()
        .router()
        .history()
        .eventAggregator()
        .plugin("aurelia-materialize-css")
        .plugin('aurelia-react-loader')
        .feature('aurelia-chart');

    aurelia.start().then(() => aurelia.setRoot());
}