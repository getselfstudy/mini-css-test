
# Simple project to show dev and production builds with and without esModule for css

The normal esModule: true can be done in dev using `yarn start`
and in production `yarn build; yarn serve`

The esModule: false can be done in dev using `yarn start-non-module`
and in production `yarn build-non-module; yarn serve`

They all listen on localhost:8080
It will print out the JSON for an empty and a populate CSS.
The "empty" css has css rules, but none starting with a "."

