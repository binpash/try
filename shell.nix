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
    zsh
    (pkgs.callPackage ./package.nix {})
  ];
}

