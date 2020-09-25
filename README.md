#  yves-frontend
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=StevenUniverseWiki_yves-frontend&metric=alert_status)](https://sonarcloud.io/dashboard?id=StevenUniverseWiki_yves-frontend) [![Bugs](https://sonarcloud.io/api/project_badges/measure?project=StevenUniverseWiki_yves-frontend&metric=bugs)](https://sonarcloud.io/dashboard?id=StevenUniverseWiki_yves-frontend) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=StevenUniverseWiki_yves-frontend&metric=code_smells)](https://sonarcloud.io/dashboard?id=StevenUniverseWiki_yves-frontend) [![CodeFactor](https://www.codefactor.io/repository/github/stevenuniversewiki/yves-frontend/badge)](https://www.codefactor.io/repository/github/stevenuniversewiki/yves-frontend) [![DeepScan grade](https://deepscan.io/api/teams/11054/projects/13973/branches/249091/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=11054&pid=13973&bid=249091) ![](https://img.shields.io/github/license/StevenUniverseWiki/yves-frontend)

[Steven Universe Wiki](https://steven-universe.fandom.com/es/)'s chat logs/stats front-end. Originally written using Svelte, later ported to Vue 3.


### Development
* Clone the repo
* `npm install`
* Start the dev server: `npm dev`
* Build for production: `npm build`
* Profit?
    #### Environment variables
    * `VITE_YVES_API`: Base URL of the [back-end](https://github.com/StevenUniverseWiki/yves) server. If not set, falls back to `http://localhost:3030`.