Vagrant.configure('2') do |config|
  config.vm.box = 'debian/stretch64'

  config.vm.synced_folder ".", "/vagrant", type: 'nfs'

  config.vm.provider 'virtualbox' do |vb|
    vb.gui = false
    vb.memory = '2048'
    vb.name = 'memory.vagrant'
    vb.linked_clone = true
    vb.customize ['modifyvm', :id, '--cpuexecutioncap', '50']
    vb.customize ['modifyvm', :id,'--memory', '4096']
  end

  config.vm.hostname = 'memory.vagrant'
  config.vm.network  'forwarded_port', guest: 3000, host: 3000
  config.vm.network  'forwarded_port', guest: 9229, host: 9229
  config.vm.network "private_network", type: "dhcp"

  config.vm.provision 'shell', path: 'node_setup.sh'
  config.vm.provision 'shell', inline: 'sudo apt-get install -y nodejs gcc g++ make'
end
