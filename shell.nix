{ pkgs ? import <nixpkgs> {}}:

let
  tryPkg = pkgs.callPackage ./package.nix {};
in
pkgs.mkShell {
  buildInputs = with pkgs; [
    expect
    mergerfs
    attr
    util-linux
    time
    shellcheck
    autoconf
    pandoc
    tryPkg
    tryPkg.test
  ];
}

