{ pkgs ? import <nixpkgs> {}}:
let
  try = pkgs.callPackage ./package.nix {};
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
    bash
    curl
    try
  ];
  shellHook = ''
    export TRY_TOP="${try}/bin"
  '';
}

