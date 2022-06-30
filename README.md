# LABSIR PX-100 Robot Teleoperation package
This is a ROS package used for teleoperating the PhantomX-100 Robot (PincherX-100) by Trossen Robotics using a web interface. Developed with academic purposes and aimed to the students of Robotics in the National University of Colombia.

The package is, by now, restricted to operate the robot joint by joint, including the motor associated with the open-close movement of the gripper.

<b>Author:</b> Manuel Esteban Lugo Madrid. Mainly for use in the Intelligent and Robotics Systems Laboratory (LabSIR) from the National University of Colombia.

## How to use this package:

### Requirements
1. Ubuntu 20.XX, recommended Ubuntu 20.04 LTS
2. ROS installed on your machine (for creating this package, ROS Noetic was used. Probably a few things change in case you use another distro)
  Take a look to the following repo to see the [installation process for Ubuntu and ROS](https://github.com/fegonzalez7/rob_unal_clase2).
3. Dynamixel Workbench package installed
  ~~~~
  sudo apt install ros-noetic-dynamixel-workbench
  ~~~~
4. Rosbridge Server Package installed
  ~~~~
  sudo apt install ros-noetic-rosbridge-server
  ~~~~
5. PhantomX-100 Robot
6. Future Technology Devices International chip (FTDI) for PhantomX-100 Dynamixel motors

### Preparation
You can use this package on three modes of operation:
1. Locally (one machine)
2. On the same local area network (LAN)
3. Through the internet (external network)

For all of them, some IP addresses are needed, particularly these ones depending on your operation mode:
* When working locally:
  * No IP address needed. Just access with "localhost".
* When working on the same LAN:
  * Private IP address of your machine (the one which is connected to the robot)
* When working through the internet:
  * Private IP address of your machine
  * Private IP address of your default gateway
  * Public IP address of your network

Ensure you can acknowledge all of these depending on your case.

The general process for preparing the package is the following one:
- Create a workspace for ROS packages
- Clone this repo on the '/src' directory of your workspace
- Build the workspace

Now, depending on the operating mode you will use, do the following:
- For local work:
  - Go to '/web/htmlPX/js/functions.js', find the ros-variable-creation code section and set the value for 'url' atribute as 'ws://localhost:9090'.
- For LAN work:
  - Go to '/web/htmlPX/js/functions.js' and set the value for 'url' attribute as 'ws://{IP_ADDRESS}:9090' in the same section as previous one, replacing {IP_ADDRESS} with your private machine IP address.
- For Internet work: in order to ensure communications along the internet, a *port forwarding* process is needed.
  - Check for your private default gateway IP address.
  - Access to that IP address through a web browser.
  - Log-in with router credentials (you may need to contact your Internet service provider for this step).
  - Access to the 'port forwarding' option.
  - Enable port forwarding by switching a button or a slider.
  - Create two port-forwarding services, as follows:
    - Set the same target IP address for both of them. This must be your private machine IP address.
    - For the first one, set the port as 5000 (you are creating a HTTP port forwarding service with this) and set the service name as you want.
    - For the second one, set the port as 9090 (you are creating a WebSocket port forwarding service with this) and set the service name as you want.
  - Save configuration and log-out
  Once the port forwarding process is done, you can continue with the following:
  - Go to '/web/htmlPX/js/functions.js' and set the value for 'url' attribute as 'ws://{IP_ADDRESS}:9090', replacing {IP_ADDRESS} with the public IP address of your network.

As you might have noticed, the process in each case is basically setting an IP address. What changes is the address per sé. This is good to know, because it is needed when typing the url in web browser.

### Hands-on
Once prepared the package, on the machine which is connected to the robot, follow the next steps to make it work:
1. Connect the FTDI from the robot to the machine, and then connect the power supply.
2. Grant permissions of use to the USB port by running the following command on a terminal
  ~~~~
  sudo chmod 777 /dev/ttyUSB0
  ~~~~
3. Launch a terminal and run the following command to start the master node
  ~~~~
  roscore
  ~~~~
4. Launch a new terminal and run the following command
  ~~~~
  roslaunch px_100_teleop px_teleop.launch
  ~~~~

That should be enough to start all the services needed to operate. Now, on the device which will operate the robot, follow the next steps:
1. Start a web browser
2. Type on the search bar '{IP_ADDRESS}:5000'.
   
   **Note:** {IP_ADDRESS} should be replaced with the real IP address which is needed according to the workcase. If it is local, you should use 'localhost'; if it is on a LAN, you should use your private machine IP; and if it is through the Internet, you should use your public network IP.
3. You should be watching the web interface by now. Press the 'Read Joint States' button to make the interface catch the actual joint angles on the robot. This is just for safety, to avoid rushed moves and unexpected collisions
4. That's all. You can play with the sliders to move the robot joints.


## Videos

[LAN Operation Video](https://youtu.be/FJkg0pcfAt8)


[Internet Operation Video](https://youtu.be/y2Nrk69Bfws)

## Robot Inspection Report 
For the development of the practice, an inspection report was done. It can be found on [this link](assets/Informe%20de%20inspecci%C3%B3n%20PX-100.pdf). Likewise, a complete tracing of the practice was done in [Coda](https://coda.io/d/_d19biUTqpPx/Practica-en-Teleoperacion-de-Robots_suyHu).