{
  stdenv,
  autoreconfHook,
  lib,
  fetchFromGitHub,
  util-linux,
  mergerfs,
  attr,
  makeWrapper,
  pandoc,
  coreutils,
  installShellFiles,
  versionCheckHook,
}:
stdenv.mkDerivation {
  pname = "try";
  version = "0.3.0";

  src = fetchFromGitHub {
    owner = "binpash";
    repo = "try";
    rev = "b66970d20e320f5dbbdca547cafa363aeba16ee2";
    hash = "sha256-WZ35228zEfTw8fF+wgs6dZlzuPrgPnepChmM0OMYDX4=";
  };

  # skip TRY_REQUIRE_PROG as it detects executable dependencies by running it
  postPatch = ''
    sed -i '/^AC_DEFUN(\[TRY_REQUIRE_PROG\]/,/^])$/c\AC_DEFUN([TRY_REQUIRE_PROG], [])' configure.ac
  '';

  nativeBuildInputs = [
    makeWrapper
    autoreconfHook
    pandoc
    installShellFiles
  ];

  installPhase = ''
    runHook preInstall
    install -Dt $out/bin try
    install -Dt $out/bin utils/try-commit
    install -Dt $out/bin utils/try-summary
    wrapProgram $out/bin/try --prefix PATH : ${
      lib.makeBinPath [
        coreutils
        util-linux
        mergerfs
        attr
      ]
    }
    installManPage man/try.1.gz
    installShellCompletion --bash --name try.bash completions/try.bash
    runHook postInstall
  '';

  doInstallCheck = true;
  nativeInstallCheckInputs = [
    versionCheckHook
  ];
  versionCheckProgramArg = "-v";

  meta = {
    homepage = "https://github.com/binpash/try";
    description = "Lets you run a command and inspect its effects before changing your live system";
    mainProgram = "try";
    maintainers = with lib.maintainers; [
      pasqui23
      ezrizhu
    ];
    license = with lib.licenses; [ mit ];
    platforms = lib.platforms.linux;
  };
}

