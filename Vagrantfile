Vagrant.configure("2") do |config|

  # Ubuntu Box Configuration
  config.vm.define "debian" do |debian|
    debian.vm.box = "debian/testing64"
    debian.vm.provision "file", source: "./", destination: "/home/vagrant/try"
    debian.vm.provision "shell", inline: "
      sudo apt update
      sudo apt install -y git
      bash /home/vagrant/try/test/run_tests.sh"
  end

  # Arch Linux Box Configuration
  config.vm.define "arch" do |arch|
    arch.vm.box = "generic/arch"
    arch.vm.provision "file", source: "./", destination: "/try"
    arch.vm.provision "shell", inline: "bash /home/vagrant/try/test/run_tests.sh"
  end

  # Rocky Linux Box Configuration
  config.vm.define "rocky" do |rocky|
    rocky.vm.box = "generic/rocky8"
    rocky.vm.provision "file", source: "./", destination: "/home/vagrant/try"
    rocky.vm.provision "shell", inline: "bash /home/vagrant/try/testsrun_tests.sh"
  end
end
