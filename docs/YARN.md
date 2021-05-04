# Yarn 2 Migration Guide

Upgrading a monorepo from Yarn v1 with Lerna.js to Yarn v2 makes use of the
weirdest versioning system I ever saw, and Yarn’s migration guide is not the
most helpful: although it purports to guide you through the process in
[a single document](https://yarnpkg.com/getting-started/migration), the
information you need is actually spread across multiple pages in quite a
confusing way, not helped by the poor English throughout. There is also an
[introductory blogpost](https://dev.to/arcanis/introducing-yarn-2-4eh1) which
you may find helpful.

This document is intended broadly as a replacement for the official
documentation (except where indicated), to help others get through the process
faster than I did. It won’t cover every feature of Yarn v2, just enough for you
to complete the migration and be confident it was worthwhile.

## Update Yarn v1 to the latest version (eg v1.22)

For example: `npm install --global yarn` or `brew upgrade yarn`.

## Enable Yarn v2 in your project

Navigate inside the project and run `yarn set version berry`.

From the
[docs](https://yarnpkg.com/getting-started/install#per-project-install):

> "Berry" is the codename for the Yarn 2 release line. It's also the name of our
> repository!

This will create a `.yarn/` directory with a `yarn-berry.cjs` release inside and
a `.yarnrc.yml` configuration file (a new format compared to the `.yarnrc` that
was previously used).

Now run `yarn set version latest` to get a specific berry version. (Why doesn’t
this happen when you set the version to berry? Good question!) You should see
the version number reflected in the `.yarn/releases/yarn-X.Y.Z.cjs` filename and
the `yarnPath` option in the `.yarnrc.yml` file.

Now if you run `yarn --version` in this repository it should tell you you’re
using v2. Note that it’s the same binary as v1 though! Ie:

```sh
$ which yarn && yarn --version
/usr/local/bin/yarn
2.4.1
$ (cd .. && which yarn && yarn --version)
/usr/local/bin/yarn
1.22.10
```

Weird, right? 🤷

## Transfer your configuration to the new configuration file

You might not have had either, but any configuration in a `.npmrc` or `.yarnrc`
file will need to be transferred to the newly created `.yarnrc.yml` file.

See
[Update your configuration to the new settings](https://yarnpkg.com/getting-started/migration#update-your-configuration-to-the-new-settings)
and [Configuration](https://yarnpkg.com/configuration/yarnrc). Note that these
options might secretly relate to plugins which you will need to install (for
example I added `changesetBaseRefs` and was informed it wasn’t a valid
configuration option until I added the `version` plugin).

## Set the Node linker to node-modules (for now)

One of the core concepts in Yarn v2 is the
[Zero Install](https://yarnpkg.com/features/zero-installs), ie packages that
don’t need you to run `yarn install` after you’ve downloaded them. Powering this
is Yarn v2’s Plug‘n’Play (or "PnP") installation strategy/module resolution
system. We’ll come back to this later, but at this point in the migration we
want to specify the traditional `node_modules` installation strategy and Node’s
own module resolution strategy, because that’s what Yarn v1 uses:

```yml
nodeLinker: "node-modules"
```

## Add any other basic configuration you need

For example:

```yml
# For more info see https://yarnpkg.com/advanced/telemetry
enableTelemetry: false
# See section on specifying missing dependencies below
preferInteractive: true
```

Refer to the
[configuration documentation](https://yarnpkg.com/configuration/yarnrc) (with
the same caveat as above).

## Migrate the lockfile

Run `yarn install` and Yarn will sort it all out. It will probably give you a
bunch of warnings. Note that `yarn.lock` is now valid YAML, unlike with Yarn v1.

## Tell VCS which files to ignore

Add all of this to your `.gitignore` (or whatever):

```
.yarn/*
!.yarn/patches
!.yarn/releases
!.yarn/plugins
!.yarn/sdks
!.yarn/versions
.pnp.*
```

Everything else that’s new or changed should be committed. We’ll come back to
this ignore list when we revisit Plug‘n’Play.

## Update Yarn CLI invocations and options in scripts

If are using the Yarn CLI tool in any scripts you will need to update some
command and option names which have changed from v1 to v2. For example
`--frozen-lockfile` has been deprecated in favour of `--immutable`. Other option
changes weren’t covered in the official documentation, so have fun finding out
which ones still work. A table of changes to commands can be found
[here](https://yarnpkg.com/getting-started/migration#renamed).

## Add the `workspace-tools` plugin

`yarn plugin import workspace-tools`.

Updates `.yarnrc.yml` Adds a plugin to `.yarn/plugins`

**NOTE:** The root project is a valid workspace, which means if you want to run
a script in all workspaces _except_ the root, other than running a script
defined in the root `package.json`, you have to filter it out.

**NOTE:** You probably want to use the `--parallel`, `--topological-dev` and
`--verbose` options in most cases.

## Specify missing dependencies

Yarn v2 claims to enforce dependencies strictly. You may be used to listing
development dependencies in the root of the project and then being able to use
the executables they define in workspaces. But Yarn v2 won’t let you, so if you
are using any of these executables in you `package.json` scripts you’ll need to
add the relevant development dependency to the workspace. This doesn't mean that
it will install duplicates, as long as you tell it not to via
`yarn add --interactive`. (You can also set `preferInteractive` in the
`.yarnrc.yml` file.)

Note that the dependency resolution appears to be inconsistent depending on
whether you are using the `workspace-tools` plugin, and how:

- `yarn run <executable>` within workspace -> dependency must be specified in
  workspace
- `yarn workspaces foreach run <executable>` in worktree -> OK if dependency is
  not specified in workspace as long as it is in the worktree
- `yarn workspaces foreach --include 'my-pattern/*' run <executable>` in
  worktree -> dependency must be specified in relevant workspaces
- `yarn workspaces foreach --include '*' run <executable>` in worktree -> OK if
  dependency is not specified in workspace as long as it is in the worktree
- `yarn workspaces foreach --exclude my-pattern/* run <executable>` in worktree
  -> OK if dependency is not specified in workspace as long as it is in the
  worktree

See https://yarnpkg.com/features/workspaces#what-does-it-mean-to-be-a-workspace

## Specify local dependencies as workspaces

I.e. `workspace:packages/xxx`

https://yarnpkg.com/features/workspaces#workspace-ranges-workspace

## Adjust lifecycle scripts

Unlike npm or Yarn v1, Yarn v2 won’t run arbitrary lifecycle scripts (i.e.
`prexxx` and `postxxx`). There are
[some exceptions](https://yarnpkg.com/advanced/lifecycle-scripts), including
`postinstall`, but if you’ve been relying on any other lifecycle scripts you
will need to
[explicitly call them](https://yarnpkg.com/getting-started/migration#explicitly-call-the-pre-and-post-scripts)
in the main script definition.

**NOTE:** Yarn
[recommends explicitly calling the lifecycle scripts](https://yarnpkg.com/getting-started/migration#explicitly-call-the-pre-and-post-scripts)
in the main script, but I would recommend not doing that, because it’s going to
get confusing if people start trying to use other package managers. It’s much
simpler just to put it all in the same script definition, or outsource to a
script file.

## Check it works

At this point you should have a working setup.

## Remove shx or equivalents (probably)

According to
[this blog post](https://dev.to/arcanis/introducing-yarn-2-4eh1#normalized-shell):

> Yarn 2 ships with a rudimentary shell interpreter that knows just enough to
> give you 90% of the language structures typically used in the scripts field.
> Thanks to this interpreter, your scripts will run just the same regardless of
> whether they're executed on OSX or Windows.

So you probably don’t need `shx` or any other tool that you were using for
cross-platform shell compatibility. Then again, maybe you do still need it
because you use a language structure outside the 90%. 🤷

## Consider using constraints

E.g. to ensure that each package specifies the right fields in its
`package.json`. Bonus: you get to learn Prolog!

https://yarnpkg.com/features/constraints

## TypeScript plugin

Automatically installs DefinitelyTyped `@types/*` definitions if the project
doesn’t have its own.

```sh
yarn plugin import typescript
```

https://github.com/yarnpkg/berry/tree/master/packages/plugin-typescript

## Version plugin

```sh
yarn plugin import version
```

## interactive-tools plugin

Most useful for `yarn upgrade-interactive`
https://yarnpkg.com/cli/upgrade-interactive

## Plug-n-play and node_modules

Read about the problems of `node_modules` and how Yarn aims to fix them here:
https://yarnpkg.com/features/pnp#the-node_modules-problem

### Check whether your project is ready

```sh
yarn dlx @yarnpkg/doctor@2
```

**NOTE:** You need to specify the `@2` because they released the incompatible v3
RC as `latest` on npm.

By the way, this uses another new feature of Yarn v2: `yarn dlx`. This is like
`npx`, but ...

### Remove the `nodeLinker` setting from `.yarnrc.yml`.

Uses default PnP setting.

### Install again

Run `yarn`. This will remove the `node_modules/` directory.

### Update the VCS ignore list

Remove what you put there before and add these:

```
.yarn/*
!.yarn/cache
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/sdks
!.yarn/versions
```

Basically we’re adding the cache and the `.pnp.js` file to VCS.

### Run node using yarn node

Replace calls to node outside of a `package.json` script with `yarn node`. For
example in shebangs in development scripts. (You probably don’t want to update
executables you will ship to your users because they may not be using Yarn.)

## Switch versioning from Lerna to Yarn

Lerna unfortunately appears to be unmaintained. Remove the dependency and the `lerna.json` configuration file.

https://next.yarnpkg.com/features/release-workflow

https://yarnpkg.com/features/workspaces#yarn-workspaces-vs-lerna
