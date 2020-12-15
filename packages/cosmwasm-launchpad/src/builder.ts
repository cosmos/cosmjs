// A docker image regexp. We remove support for non-standard registries for simplicity.
// https://docs.docker.com/engine/reference/commandline/tag/#extended-description
//
// An image name is made up of slash-separated name components (optionally prefixed by a registry hostname).
// Name components may contain lowercase characters, digits and separators.
// A separator is defined as a period, one or two underscores, or one or more dashes. A name component may not start or end with a separator.
//
// A tag name must be valid ASCII and may contain lowercase and uppercase letters, digits, underscores, periods and dashes.
// A tag name may not start with a period or a dash and may contain a maximum of 128 characters.
const dockerImagePattern = new RegExp(
  "^[a-z0-9][a-z0-9._-]*[a-z0-9](/[a-z0-9][a-z0-9._-]*[a-z0-9])+:[a-zA-Z0-9_][a-zA-Z0-9_.-]{0,127}$",
);

/** Max length in bytes/characters (regexp enforces all ASCII, even if that is not required by the standard) */
const builderMaxLength = 128;

export function isValidBuilder(builder: string): boolean {
  if (builder.length > builderMaxLength) return false;
  return !!builder.match(dockerImagePattern);
}
