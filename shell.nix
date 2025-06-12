{ pkgs ? import <nixpkgs> {}}:

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
    (pkgs.callPackage ./package.nix {})
  ];
}

