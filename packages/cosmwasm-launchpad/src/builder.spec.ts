import { isValidBuilder } from "./builder";

describe("builder", () => {
  describe("isValidBuilder", () => {
    // Valid cases

    it("returns true for simple examples", () => {
      expect(isValidBuilder("myorg/super-optimizer:0.1.2")).toEqual(true);
      expect(isValidBuilder("myorg/super-optimizer:42")).toEqual(true);
    });

    it("supports images with multi level names", () => {
      expect(isValidBuilder("myorg/department-x/office-y/technology-z/super-optimizer:0.1.2")).toEqual(true);
    });

    it("returns true for tags with lower and upper chars", () => {
      expect(isValidBuilder("myorg/super-optimizer:0.1.2-alpha")).toEqual(true);
      expect(isValidBuilder("myorg/super-optimizer:0.1.2-Alpha")).toEqual(true);
    });

    // Invalid cases

    it("returns false for missing or empty tag", () => {
      expect(isValidBuilder("myorg/super-optimizer")).toEqual(false);
      expect(isValidBuilder("myorg/super-optimizer:")).toEqual(false);
    });

    it("returns false for name components starting or ending with a separator", () => {
      expect(isValidBuilder(".myorg/super-optimizer:42")).toEqual(false);
      expect(isValidBuilder("-myorg/super-optimizer:42")).toEqual(false);
      expect(isValidBuilder("_myorg/super-optimizer:42")).toEqual(false);
      expect(isValidBuilder("myorg./super-optimizer:42")).toEqual(false);
      expect(isValidBuilder("myorg-/super-optimizer:42")).toEqual(false);
      expect(isValidBuilder("myorg_/super-optimizer:42")).toEqual(false);
      expect(isValidBuilder("myorg/.super-optimizer:42")).toEqual(false);
      expect(isValidBuilder("myorg/-super-optimizer:42")).toEqual(false);
      expect(isValidBuilder("myorg/_super-optimizer:42")).toEqual(false);
      expect(isValidBuilder("myorg/super-optimizer.:42")).toEqual(false);
      expect(isValidBuilder("myorg/super-optimizer-:42")).toEqual(false);
      expect(isValidBuilder("myorg/super-optimizer_:42")).toEqual(false);
    });

    it("returns false for upper case character in name component", () => {
      expect(isValidBuilder("mYorg/super-optimizer:42")).toEqual(false);
      expect(isValidBuilder("myorg/super-Optimizer:42")).toEqual(false);
    });

    it("returns false for long images", () => {
      expect(
        isValidBuilder(
          "myorgisnicenicenicenicenicenicenicenicenicenicenicenicenicenicenicenicenicenicenicenicenicenicenicenicenicenice/super-optimizer:42",
        ),
      ).toEqual(false);
    });

    it("returns false for images with no organization", () => {
      // Those are valid dockerhub images from https://hub.docker.com/_/ubuntu and https://hub.docker.com/_/rust
      // but not valid in the context of CosmWasm Verify
      expect(isValidBuilder("ubuntu:xenial-20200212")).toEqual(false);
      expect(isValidBuilder("rust:1.40.0")).toEqual(false);
    });
  });
});
