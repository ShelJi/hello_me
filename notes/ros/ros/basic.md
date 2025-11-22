# ROS2

## Table of content

- [Acronym](#acronym)
- [Core Concept](#core-concepts)
- [Basics](#basics)
- [Tools](#debug-or-extra-options-availables)
- [Begining](#ros2-begining)
- [Serices](#services)
- [URDF](#urdf)
  - [XACRO](#xacro)
- [GAZEBO](#gazebo)
  - [SDF file](#sdf-file)
  - [World](#gazebo-world-file)
  - [Meshes](#gazebo-meshes)
  - [Config](#gazebo-config)

## Acronym

- API: Application Programming Interface
- DDS: Data Distribution Service
- UDP: User Datagram Protocol
- TCP: Transmission Control Protocol
- CLI: Command Line Interface
- QoS: Quality of Service
- SRDF: Semantic Robot Description
- TF: Transform
- URDF: Unified Robot Description Format
- RMW: ROS Middleware
- msg: Message file (defines a ROS message)
- srv: Service file (defines a ROS service)
- node: Executable unit in ROS
- launch: Used to start/coordinate multiple nodes
- bag: ROS bag file (used for recording/playback of topics)

- rclpy: ROS Client Library for Python
- rclcpp: ROS Client Library for C++
- colcon: Collective Construction (build tool used in ROS 2)
- ament: Advanced Meta Build System (build system for ROS 2)

- Rviz: ROS Visualization
- Gazebo: Simulation environment for robots
- SLAM: Simultaneous Localization And Mapping
- TCP: Transmission Control Protocol
- UDP: User Datagram Protocol
- MQTT: Message Queuing Telemetry Transport
- LAN: Local Area Network
- WAN: Wide Area Network
- IP: Internet Protocol

- open-rmf: Open Robotics Middleware Framework
- rosdep: ROS dependency installer
- vcstool: tool for handling multiple Git repositories at once
- SDF: Simulation Description Format

## Core Concepts

- Nodes
  - Smallest executable units.
  - Performs specific tasks like reading sensors, motor control.

- Topics
  - Channels through which nodes publish or subscribe data.
  - Message passing is asynchronous.
  - Example: /cmd_vel topic for velocity commands.

- Services
  - Synchronous request-response communication.
  - Example: /spawn_robot might be called to create a robot in simulation.

- Actions
  - For long-running tasks.
  - Provide feedback and allow cancellation.
  - Example: autonomous navigation or docking.

- Messages
  - Data structures used in topics, services, actions.
  - Defined using .msg or .srv files.
  
## Basics

ROS2 stands for Robotics Operating System 2. It is an open-source software framework and a set of tools, libraries and conventions for building software.

Reference: Youtube DIGIKEY

```bash
# activate ros env
source /opt/ros/jazzy/setup.bash

# chatter example
# talker
ros2 run demo_nodes_cpp talker

# listerner in new terminal
ros2 run demo_nodes_py listener
```

This example create a c++ talker which send "Hello World 1" each second and python listener which receives logs data from talker.

- This shows ROS2 can communicate between different languages.

## Debug or extra options availables

```bash
# shows all running topics
ros2 topic list

# shows info about the running topic
ros2 topic info /chatter

# quickly receives the message 
ros2 topic echo /chatter

# Likewise service,...
```

### RQT

rqt is the graphical framework for ROS 2. It provides a suite of tools for visualizing data and the system architecture.

```bash
rqt
# or
rqt_graph
```

## Ros2 begining

[https://github.com/ShawnHymel/introduction-to-ros/](https://github.com/ShawnHymel/introduction-to-ros/)

```bash
source /opt/ros/jazzy/setup.bash

mkdir src
cd src

ros2 pkg create --build-type ament_python my_py_pkg

```

- Ament is a build system for Python.

CREATE FILES (minimal_publisher, minimal_subscriber) inside FOLDERNAME

### Add created publisher to entry_points in setup.py

```py
...
entry_points={
        'console_scripts': [
            "minimal_publisher = my_py_pkg.my_minimal_publisher:main",
            ...
        ],
    },
...
```

```bash
cd ..

# This builds the project
colcon build

# use this to rebuild the edited package which reduce build time
colcon build --package-select my_py_pkg
```

New terminal

```bash
# Activate ros
source /opt/ros/jazzy/setup.bash

# install our script
source GitHub/ros-tutorial/install/setup.bash

# run the program
#        MY_PKG_NAME  FUNC_NAME
ros2 run my_py_pkg my_minimal_publisher
```

This create the custom publisher and lisener.

#### (optional) Register into package.xml for standardise

```xml
...
<depend>rclpy</depend>
<depend>example_interfaces</depend>
...
```

## Services

```bash
ros2 interface list

# Under services
# sample codes
...
example_interfaces/srv/AddTwoInts
example_interfaces/srv/SetBool
example_interfaces/srv/Trigger
...

# Check the details - returns type of i/p and o/p
ros2 srv interface show example_interfaces/srv/AddTwoInts
```

Create server(service)

```bash
# Run the service
# then check the running service
ros2 service list

ros2 service info /add_inits

ros2 service call /add_inits example_interfaces/srv/AddTwoInts "{a: 5, b: 2}"
# Spaces are necessory after colon {a: 2, b: 2}
```

Create Client (minimal_client)

## URDF

The URDF (Unified Robot Description Format) is an XML file format used in ROS (Robot Operating System) to fully describe a robot model.

- Physical each sections are called **links**.

### Common Joint Types

- Revolute
  - Rotational motion with fixed limits.

- Continuous
  - Rotational motions without limits

- Prismatic
  - Linear translational motion

- Fixed

```xml
<? xml version="1.0" ?>
<robot name="robot">
  <!-- Each section are called link -->
  <link></link>
  <joint></joint>
</robot>
```

### Link tag and its tags

- visual
  - geometry
  - orgin
  - material
- collision
  - geometry
  - orgin
- inertial
  - mass
  - origin
  - inertia

### XACRO

Xacro (XML Macros) is an XML macro language used primarily in the Robot Operating System (ROS) ecosystem to create shorter, more readable, and highly reusable URDF (Unified Robot Description Format) files.

Since standard URDF is pure XML and lacks features like variables, math, or file inclusion, Xacro acts as a preprocessor that resolves these advanced features and outputs a final, standard URDF file.

Use CDN link to convert urdf to xacro

`my_robot.urdf.xacro`

```xml
<!-- Main File -->
<?xml version="1.0"?>
<robot name="my_diff_bot" xmlns:xacro="http://www.ros.org/wiki/xacro">

<xacro:default_inertial mass="5.0" />

</robot>
```

```xml
<!-- Sub file -->
<?xml version="1.0"?>
<robot name="my_diff_bot" xmlns:xacro="http://www.ros.org/wiki/xacro">

<xacro:macro name="default_inertial" params="mass">
  <inertial>
    <mass value="${mass}" />
    <inertia ixx="1e-3" ixy="0.0" ... />
  </inertial>
</xacro:macro>

</robot>
```

## Gazebo

**Gazebo Harmonic v 8.9.0** is used in this tutorial

- gazebo uses sdf file. It also comes with a tool which converts urdf to sdf.
- gazebo and ros talks to each other using `bridge.yaml` file

```bash
# Launch gazebo with ros integrated
ros2 launch ros_gz_sim gz_sim.launch.py
```

### SDF file

[SDF file cheatsheet](http://sdformat.org/)

To find **sdf file version**, create a new gazebo world and save it in sdf file format. open the file to get the sdf file version.

### Gazebo world file

A Gazebo world file is written in SDF format (Simulation Description Format).

.sdf (most common)

.world (same content, just another extension)

Both .world and .sdf files are exactly the same format.

Three things together make a Gazebo model work.

- `meshes/` Contains 3D model files (STL, DAE, OBJ)
- `model.config` Metadata that tells Gazebo how to load the model
- `model.sdf` The actual robot/world description (links, sensors, joints)

#### Gazebo Meshes

Meshes are 3D shapes used to visually represent objects or robots in Gazebo.

- They are the 3D geometry of your robot
- They define how the robot looks
- They are NOT used for physics (collision shapes do that)

```bash
model_name/
   meshes/
      front_wheel.dae # (recommended)
      chassis.stl
      lidar_sensor.obj
```

Example:

```xml
<visual>
  <geometry>
    <mesh>
      <uri>model://my_robot/meshes/chassis.dae</uri>
    </mesh>
  </geometry>
</visual>
```

#### Gazebo config

This file describes metadata about the model

- Name of model
- Version
- Author
- Description
- Where the SDF file is
- Which files belong to the model

Example

```xml
<?xml version="1.0"?>
<model>
  <name>my_robot</name>
  <version>1.0</version>
  <sdf version="1.10">model.sdf</sdf>

  <author>
    <name>John Doe</name>
    <email>robotics@example.com</email>
  </author>

  <description>
    A 4-wheel robot with LiDAR and depth camera.
  </description>
</model>
```
