# Webpack5 
- 

# SHELL architecture:
> A separate composition service or technique does the final assembly
> https://learning.oreilly.com/library/view/building-micro-frontends/9781492082989/ch07.html#implementation_details

Responsibility:
- init app
- mount/unmount MFE
- share API layer
- store/retrieve data from web-store
- ROUTE between MFEs based on url

MICRO-FRONT VS LAYERED
Feature based team: less friction, all work on the same
- web fragments

## Composition
- Server-side composition, for example with SSI, ESI, Tailor or Podium              
- Client-side composition, 
  - frames
  - Ajax
  - Web Components
## Communication



## Async modules
> in W5 release: https://webpack.js.org/blog/2020-10-10-webpack-5-release/#async-modules
- can be used via `import` or `require()=>Promise`
Ways to have async module
- WebAssembly modules
- Top-Level-Await ES-modules
- WebAsm modules

## Code splitting
> https://create-react-app.dev/docs/code-splitting/
> https://webpack.js.org/guides/code-splitting/#

BBB
- entry points
- SplitChunksPlugin
- Dynamic Imports

## Standard


# IDEA webmod

  brainstorm
  - manifest load
  - module interface


# WAYS TO ASYNC

`In webpack there are multiple ways to have async modules:`

Module federation:
> https://www.youtube.com/watch?v=-ei6RqZilYI


## 1 Top level await
> EA proppsal
> https://github.com/tc39/proposal-top-level-await>

# FEDERATION

## Resources
https://rangle.io/blog/module-federation-federated-application-architectures


# MICRO-FRONTEND!!
https://github.com/billyjov/microfrontend-resources
> https://micro-frontends.org/
> https://martinfowler.com/articles/micro-frontends.html

https://single-spa.js.org/


# MicroFrontTeam
- With the micro frontends approach, teams are in full control of their technology stack (micro architecture). 
- A fragment is a mini-application that is self-contained, which means it brings everything it needs with it.
- the application gets divided into multiple vertical slices that span from database to user interface.
- Being able to choose the technology that’s best for the job