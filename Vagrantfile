Vagrant.configure("2") do |config|

  # Ubuntu Box Configuration
  config.vm.define "debian" do |debian|
    debian.vm.box = "debian/testing64"
    debian.vm.provision "file", source: "./", destination: "/home/vagrant/try"
    debian.vm.provision "shell", privileged: false, inline: "
      sudo apt update
      sudo apt install -y git expect
      sudo chown -R vagrant:vagrant try
      cd try
      TRY_TOP=$(pwd) bash test/run_tests.sh"
  end
end
