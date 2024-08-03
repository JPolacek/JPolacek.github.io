# jakepolacek.com AKA JPolacek.github.io
This repo contains the code for my personal site &mdash; [jakepolacek.com](jakepolacek.com).
This site is created using a React app and hosted as a Github page. I plan on using this 
README.md to document dev practices, how to deploy, and other learnings that I find. I 
think that future Jake will find this semi-helpful as long as I keep up the documentation.
If I don't keep it up, shame on you future Jake, shame on you.

## Structure
`master` is a the protected base branch, meaning that a PR is required in order to merge 
changes into the branch. However, *`master` is not where the actual site code is hosted* 
&mdash; this lives on the `gh-pages` branch thanks to Settings > Code and automation > Pages
\> Build and deployment > Branch (see [here](https://github.com/JPolacek/JPolacek.github.io/settings/pages)).
Please note that `gh-pages` should **never** be merged, and feature branches should only
be merged into `master`.

The React app (created using `npm create-react-app jpolacek-dot-com`) lives within the 
[`jpolacek-dot-com`](https://github.com/JPolacek/JPolacek.github.io/jpolacek-dot-com/) 
directory in this repo. All other docs that aren't required when building and deploying
the React app should live in root on `master`.

## Development & Deployment
All development should be done on a feature branch (i.e. **NOT ON** `master` **OR** `gh-pages`
). With the feature branch checked out, changes can be tested out locally by running:
```
$ cd jpolacek-dot-com
$ npm start
```
http://localhost:3000/ will then open with the latest changes. When developing, you can
just edit, save, and refresh the localhost tab in order to see any changes!

If you're messing with the london-tube-game, make sure you have the local secrets somewhere and use them instead of the environment variables in jpolacek-dot-com/public/london-tube-game/consts.js

When you're happy with your changes, open up a PR, and then approve and merge the changes.
Once the changes are merged, check out the latest version of `master` and run `npm run deploy`
from `jpolacek-dot-com`. This will build the React app with `npm` and then deploy the page
to the `gh-pages` branch using `gh-pages -d build`. This deployment structure was kicked
off following [these instructions](https://www.letsreact.org/deploy-react-js-application-to-github-pages/).
After deploying, you will need to go to Settings > Pages > Custom Domain and update the 
domain to jakepolacek.com. I'm sure there's a way to fix this, but I really don't want to
mess around with this site too much rn.

## Random learnings

<!-- when I learn stuff I will put it here -->
* Shrugs

## What **TODO:**
* I should look into creating a `gh-pages-master` that is protected and the source branch.
This could protect from any feature branch just haphazardly being deployed.
* What other security do I need to make sure that no one else comes along and just pushes
random garbage to my site?

