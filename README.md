# Massage Therapy

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.5.

## Features

The entry point is app.component.ts, it loads among others CoreModule and SharedModule, inits i18n logic.
- core --> contains singletons, constants, decorators, upper-level routing and i18n.
- shared --> contains dumb UI components, pipes, utils, directives and abstract classes.
- interfaces --> is the entry point for all app-wide interfaces that are used in more than one module.
- modules --> is the place for business modules (in "lazy" folder because they are lazy loadable) and UI modules (e.g. dialog).

## Styles

External packages used:
- bootstrap-4-grid - lightweight collection of utility classes from Bootstrap.
Wherever it is possible BEM structure is used, where block__element and block__element--modifier syntax is used.
The application uses SCSS preprocessor as well as SCSS variables.
Global styles are conventionally in /src/assets/styles folder, which are then imported to /styles.scss.
Structure and semantics of global style files:
- components.scss - contains SCSS classes used for styling of entire components.
- fonts.scss - collection of @font-face to include fonts to the global SCSS styles.
- global.scss - is a entry point.
- mixins.scss - globally used SCSS mixins and utilities.
- normalize.scss - reset of standart CSS styles.
- util-classes.scss - collection of classes for most used cases, e.g. .bg-white.
- variables.scss - collection of global SCSS variables.

## Localization

External packages used:
- @ngx-translate/core
- @ngx-translate/http-loader
There is a wrapper over @ngx-translate functionality: CoreTranslationModule, which has forRoot and forChild methods.
This module is included into CoreModule.
Supported languages:
- English;
- Ukrainian;
Language specific files stored conventionally in /src/assets/i18n.
Initial setup is done in app.component.ts, based on the current browser settings.

## Environments

The application has two environments:
- development: environment.ts
- production: environment.prod.ts

## CLI commands

- `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
- `ng generate component component-name` to generate a new component, or `ng generate directive|pipe|service|class|guard|interface|enum|module`.
- `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
- `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
- `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Design reference

https://www.figma.com/file/9o0IEDrd6YT2DfmODFqG5p/The-Day-Beauty---Landing-Page-for-Beauty-%26-SPA-Service-(Community)?type=design&node-id=0-1&mode=design
