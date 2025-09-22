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
    rustc
    cargo
    rustfmt
    rust-analyzer
    clippy
    (pkgs.callPackage ./package.nix {})
  ];
}

