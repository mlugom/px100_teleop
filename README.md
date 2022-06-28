# LABSIR PX-100 Robot Teleoperation package
This is a ROS package used for teleoperating the PhantomX-100 Robot (PincherX-100) by Trossen Robotics using a web interface. Developed with academic purposes and aimed to the students of Robotics in the National University of Colombia.

The package is, by now, restricted to operate the robot joint by joint, including the motor associated with the open-close movement of the gripper.

<b>Author:</b> Manuel Esteban Lugo Madrid. Mainly for use in the Intelligent and Robotics Systems Laboratory (LabSIR) from the National University of Colombia.

## How to use this package:

**Requirements**
1. Ubuntu 20.XX, recommended Ubuntu 20.04 LTS
2. ROS installed on your machine (for creating this package, ROS Noetic was used. Probably a few things change in case you use another distro)
3. Dynamixel Workbench package installed
4. Rosbridge Package installed
5. PhantomX-100 Robot
6. Future Technology Devices International chip (FTDI) for PhantomX-100 Dynamixel motors


**Preparation:**
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
  * Public IP address of your default gateway

Ensure you can acknowledge all of these depending on your case.

The general process for preparing the package is the following one:
- Create a workspace for ROS packages
- Clone this repo on the '/src' directory of your workspace
- Build the workspace
- Go to '/web/js/functions.js'

Now, depending on the operating mode you will use, do the following:
- For local work:
  - Go to '/web/js/functions.js' and set the value for 'url' atribute as 'ws://localhost:9090' in the ros variable creation code section.
- For LAN work:
  - Go to '/web/js/functions.js' and set the value for 'url' attribute as 'ws://{IP_ADDRESS}:9090' in the same section as previous one, replacing {IP_ADDRESS} for your private machine IP address.
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
  - Go to '/web/js/functions.js' and set the value for 'url' attribute as 'ws://{IP_ADDRESS}:9090

As you might have noticed, the process in each case is basically setting an IP address. What changes is the address per sé. This is good to know 


Preparation
Process
