{ pkgs ? import <nixpkgs> {}}:

pkgs.mkShell {
  buildInputs = with pkgs; [
    expect
    mergerfs
    attr
    time
    shellcheck
  ];
}
