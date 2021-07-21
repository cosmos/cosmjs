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

Overall I would say that the Yarn vision is pretty impressive:

- zero installs are very cool,
- enforcing strict dependency specification gives us confidence we never had
  with `node_modules`,
- delegating dependency resolution to the package manager makes a lot of sense.

However, it’s an open source project with limited resources, hence the difficult
documentation and slightly unstable feel. Moreover the ecosystem often does not
live up to the high standards required to reap all the benefits (eg packages not
listing all their dependencies).

## Step 1: Update Yarn v1 to the latest version (eg v1.22)

For example: `npm install --global yarn` or `brew upgrade yarn`.

## Step 2: Enable Yarn v2 in your project

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

## Step 3: Transfer your configuration to the new configuration file

You might not have had either, but any configuration in a `.npmrc` or `.yarnrc`
file will need to be transferred to the newly created `.yarnrc.yml` file.

See
[Update your configuration to the new settings](https://yarnpkg.com/getting-started/migration#update-your-configuration-to-the-new-settings)
and [Configuration](https://yarnpkg.com/configuration/yarnrc). Note that these
options might secretly relate to plugins which you will need to install (for
example I added `changesetBaseRefs` and was informed it wasn’t a valid
configuration option until I added the `version` plugin).

## Step 4: Set the Node linker to node-modules (for now)

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

## Step 5: Add any other basic configuration you need

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

## Step 6: Migrate the lockfile

Run `yarn install` and Yarn will sort it all out. It will probably give you a
bunch of warnings. Note that `yarn.lock` is now valid YAML, unlike with Yarn v1.

## Step 7: Tell VCS which files to ignore

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

## Step 8: Update Yarn CLI invocations and options in scripts

If are using the Yarn CLI tool in any scripts you will need to update some
command and option names which have changed from v1 to v2. For example
`--frozen-lockfile` has been deprecated in favour of `--immutable`. Other option
changes weren’t covered in the official documentation, so have fun finding out
which ones still work. A table of changes to commands can be found
[here](https://yarnpkg.com/getting-started/migration#renamed).

## Step 9: Add plugins

Adding a plugin updates the `.yarnrc.yml` file and adds a plugin to
`.yarn/plugins`. Here are some helpful ones, but there are more and you can even
write your own.

### `workspace-tools`

```sh
yarn plugin import workspace-tools
```

Most importantly this will let you use the `yarn workspaces foreach` command.
See [the docs](https://yarnpkg.com/cli/workspaces/foreach) for more information.

**NOTE:** The root project is a valid workspace, which means if you want to run
a script using `foreach` in all workspaces _except_ the root, other than running
a script defined in the root `package.json`, you have to filter it out.

**NOTE:** You probably want to use the `--parallel`, `--topological-dev` and
`--verbose` options in most cases.

### `version`

```sh
yarn plugin import version
```

This lets you do version things. More info: https://yarnpkg.com/cli/version

### `interactive-tools`

```sh
yarn plugin import interactive-tools
```

Most useful for `yarn upgrade-interactive`: see
https://yarnpkg.com/cli/upgrade-interactive

### `typescript` (maybe)

Automatically installs DefinitelyTyped `@types/*` definitions if the project
doesn’t have its own. This sounds useful, but might actually be annoying because
sometimes you don’t need the type definitions even when they’re available (eg
for tools). I installed it initially but ended up removing it.

```sh
yarn plugin import typescript
```

More info:
https://github.com/yarnpkg/berry/tree/master/packages/plugin-typescript

## Step 10: Specify missing dependencies

Yarn v2 wants to enforce dependencies strictly. You may be used to listing
development dependencies in the root of the project and then being able to use
the executables they define in workspaces. But Yarn v2 won’t let you, so if you
are using any of these executables in your `package.json` scripts you’ll need to
add the relevant development dependency to the workspace. This doesn’t mean that
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

(This might depend on which linker you’re using.) See
https://yarnpkg.com/features/workspaces#what-does-it-mean-to-be-a-workspace for
more information on workspaces.

## Step 11: Specify local dependencies as workspaces

In packages which depend on other packages in the same monorepo, you can specify
these dependencies using the `workspace:packages/my-other-package` format. This
way you don’t need to constantly update the versions manually, it’ll all be
calculated for you at publication time.

More info: https://yarnpkg.com/features/workspaces#workspace-ranges-workspace

## Step 12: Adjust lifecycle scripts

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

## Intermission: Check it works

At this point you should have a working setup. Make sure you can build, test,
lint, run scripts etc.

## Step 13: Remove shx or equivalents (probably)

According to
[this blog post](https://dev.to/arcanis/introducing-yarn-2-4eh1#normalized-shell):

> Yarn 2 ships with a rudimentary shell interpreter that knows just enough to
> give you 90% of the language structures typically used in the scripts field.
> Thanks to this interpreter, your scripts will run just the same regardless of
> whether they're executed on OSX or Windows.

So you probably don’t need `shx` or any other tool that you were using for
cross-platform shell compatibility. Then again, maybe you do still need it
because you use a language structure outside the 90%. 🤷

## Step 14: Enable plug-n-play

Read about the problems of `node_modules` and how Yarn aims to fix them here:
https://yarnpkg.com/features/pnp#the-node_modules-problem

The rest of this section will take you through adding PnP. This was the most
painful part of the process, introducing many shiny new things that the rest of
the ecosystem doesn’t seem quite ready for.
[Die Idee ist gut, doch die Welt noch nicht bereit](https://www.youtube.com/watch?v=SW8a7svcQGY).
If you choose to skip this section that is a totally legitimate decision.

### Check whether your project is ready

```sh
yarn dlx @yarnpkg/doctor@2
```

**NOTE:** You need to specify the `@2` because the incompatible v3 release
candidate was released as `latest` on npm.

By the way, this uses another new feature of Yarn v2: `yarn dlx`. This is like
`npx`, but downloads the package only temporarily and then throws it away.

### Remove the `nodeLinker` setting from `.yarnrc.yml`.

This uses the default PnP setting, which is the real Yarn v2 magic.

### Install again

Run `yarn`. This will remove the `node_modules/` directory and store lots of zip
files in `.yarn/cache`.

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

Basically we’re adding the cache and the `.pnp.js` file to VCS. It might seems
weird to add all those zip files to version control, but the reasoning is in the
article listed above.

Before you add these to the VCS index, you might want to think about how you
want to store the large zip files. For example, if you’re using Git LFS you
could get it to handle zip files by adding the following to `.gitattributes`:

```
*.zip filter=lfs diff=lfs merge=lfs -text
```

### Run node using yarn node

Replace calls to `node` outside of a `package.json` script with `yarn node`. For
example in shebangs in development scripts. You can pass the `-S` option to make
this work like this:

```sh
#!/usr/bin/env -S yarn node
```

You probably don’t want to update executables you will ship to your users
because they may not be using Yarn, but that means you’ll have to remember to
run them using `yarn node` from within your project rather than just executing
them directly.

### Add in support for ESM (if needed)

Running Node via Yarn v2 does not handle ESM as described in this issue:
https://github.com/yarnpkg/berry/issues/638

For a quick solution, you can run `yarn add -D esm` in every relevant package,
and then replace every `yarn node script.js` with a
`yarn node --require esm script.js`.

For a more general workaround, check out this repo:
https://github.com/DaneTheory/yarn-pnp-with-esm

### Maybe don’t use Node v15+ until you upgrade to Yarn v3(!!!)

It might not affect you but there’s an issue with the `fs` patch and `bigint`,
which is solved in v3, but won’t be backported to v2:
https://github.com/yarnpkg/berry/issues/2232#issuecomment-818514929

### Setup your IDE

Make sure you have everything you want your IDE to use installed in the root of
the project. I suggest `typescript` and `prettier` at least. Then run

```sh
yarn dlx @yarnpkg/sdks
```

This will set up your IDE and put a bunch of things in `.yarn/sdks`, which
you’ll want to add to VCS. If you’re using VSCode, it will also add some stuff
to `.vscode/extensions.json` and `.vscode/settings.json`. You may or may not
want to add these to VCS—talk to your colleagues.

https://next.yarnpkg.com/advanced/pnpify#ide-support

## Step 15: Switch versioning from Lerna to Yarn

Lerna unfortunately appears to be unmaintained. Remove the dependency and the
`lerna.json` configuration file.

You can read about Yarn’s release workflow here:
https://next.yarnpkg.com/features/release-workflow

## Step 16: Consider using constraints

E.g. to ensure that each package specifies the right fields in its
`package.json`. Bonus: you get to learn Prolog! (I for one did not have time.)

More info: https://yarnpkg.com/features/constraints

## Conclusion

That’s it! There’s a lot more configuration available that has not been covered
here, but hopefully you made it through all that and your code still works.

## Links

Here are some additional resources I found helpful:

- https://www.huy.dev/yarn-v2-workspace-docker-vs-code-2020-03-23/
- https://github.com/DerekZiemba/yarn-V2-workspaces-simple-monorepo/issues/1
