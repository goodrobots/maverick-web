export const schema = {
    "allowComments": true,
    "type": "object",
    "properties": {
        "classes": {
            "type": "array",
            "description": "puppet classes included in this array are active",
            "items": {
                "type": "string",
                "enum": [
                    "base",
                    "base::console",
                    "base::defaults",
                    "base::desktop",
                    "base::functions",
                    "base::hostip",
                    "base::locale",
                    "base::maverick",
                    "base::minimal",
                    "base::packages",
                    "base::puppet",
                    "base::python",
                    "base::services",
                    "base::stages",
                    "base::sysctl",
                    "base::users",
                    "maverick_analysis",
                    "maverick_analysis::collect",
                    "maverick_analysis::grafana",
                    "maverick_analysis::influx",
                    "maverick_analysis::mavlogd",
                    "maverick_dev",
                    "maverick_dev::apsitl_dev",
                    "maverick_dev::ardupilot",
                    "maverick_dev::px4",
                    "maverick_fc",
                    "maverick_hardware",
                    "maverick_hardware::beagle",
                    "maverick_hardware::intel",
                    "maverick_hardware::joule",
                    "maverick_hardware::odroid",
                    "maverick_hardware::peripheral::caspa",
                    "maverick_hardware::peripheral::flirone",
                    "maverick_hardware::peripheral::ocam",
                    "maverick_hardware::peripheral::picam",
                    "maverick_hardware::peripheral::realsense",
                    "maverick_hardware::raspberry",
                    "maverick_hardware::tegra",
                    "maverick_hardware::up",
                    "maverick_intelligence",
                    "maverick_intelligence::pytorch",
                    "maverick_intelligence::tensorflow",
                    "maverick_mavlink",
                    "maverick_mavlink::dronekit",
                    "maverick_mavlink::mavsdk",
                    "maverick_network",
                    "maverick_network::avahi",
                    "maverick_network::dnsclient",
                    "maverick_network::dnsmasq",
                    "maverick_network::timesync",
                    "maverick_network::wifibroadcast",
                    "maverick_network::zerotier",
                    "maverick_ros",
                    "maverick_ros::ros1",
                    "maverick_ros::ros2",
                    "maverick_security",
                    "maverick_security::disable_services",
                    "maverick_security::fail2ban",
                    "maverick_security::firewall",
                    "maverick_security::firewall_common",
                    "maverick_security::firewall_post",
                    "maverick_security::firewall_pre",
                    "maverick_security::ldap_client",
                    "maverick_security::ldap_server",
                    "maverick_security::scanners",
                    "maverick_security::ssh",
                    "maverick_security::ssl",
                    "maverick_vision",
                    "maverick_vision::aruco",
                    "maverick_vision::camera_manager",
                    "maverick_vision::collision_avoidance",
                    "maverick_vision::gstreamer",
                    "maverick_vision::mjpg_streamer",
                    "maverick_vision::opencv",
                    "maverick_vision::orb_slam2",
                    "maverick_vision::rtabmap",
                    "maverick_vision::vision_landing",
                    "maverick_vision::vision_seek",
                    "maverick_vision::visiond",
                    "maverick_vision::visionlibs",
                    "maverick_web",
                    "maverick_web::apache",
                    "maverick_web::cloud9",
                    "maverick_web::codeserver",
                    "maverick_web::fcs",
                    "maverick_web::maverick_api",
                    "maverick_web::maverick_docs",
                    "maverick_web::maverick_web",
                    "maverick_web::nginx",
                    "maverick_web::nodejs",
                    "maverick_web::ssl",
                    "maverick_web::theia"
                ],
                "enumDescriptions": [
                    "Base class\nThe Base class sets up the fundamental Maverick environment. It declares the puppet stages and defines the entire bootstrap stage,\nand calls the other base classes in all stages.",
                    "Base::Console class\nThis class manages the system console.",
                    "Base::Defaults class\nThis class sets some defaults that Puppet uses when constructing the node graph.",
                    "Base::Desktop class\nThis class installs/manages the desktop environment.",
                    "Base::Python class\nThis class declares some common functions that can be used in any other manifests.",
                    "Base::Python class\nThis class manages /etc/hosts.",
                    "Base::Locale class\nThis class manages the System Locale.  It uses the en_GB (English GB dialect) locale by default, and sets Europe/London as the default timezone.",
                    "Base::Maverick class\nThis class sets up the basic Maverick environment - mav user, /srv/maverick directory structure, git branch, base containers for status,\nvarious scripts and symlinks, and in bootstrap it clones the Maverick software itself (/srv/maverick/software/maverick)",
                    "Base::Minimal class\nThis class can be used instead of the usual Base class, but makes absolutely minimal changes to the system.\nIt can be used to apply just a very specific small subset of Maverick to an existing system with the most monimal changes.",
                    "Base::Packages class\nThis class installs/manages basic system software.\nIt strips out a bunch of software that is unlikely to ever be used on a UAV, and installs basic packages that are commonly used.",
                    "Base::Puppet class\nThis class installs/manages the puppet client.",
                    "Base::Python class\nThis class installs/manages Python software.\nIt manages the system python to some degree, but it focuses on providing a custom optimised python build installed into /srv/maverick/software/python.\nThis currently installs the latest point release of Python 3.7.",
                    "Base::Services class\nThis class primarily disables any services that typically don't need to be running on a UAV.",
                    "Base::Stages class\nThis class declares puppet stages.",
                    "Base::Sysctl class\nThis class manages system sysctl settings.",
                    "Base::Users class\nThis class manages the Maverick 'mav' user.",
                    "Maverick_analysis class\nThis class controls all other classes in maverick_analysis module.",
                    "Maverick_analysis::Collect class\nThis class installs/manages collectd software (collectd.org), which is used to log system metrics.",
                    "Maverick_analysis::Grafana class\nThis class installs/manages Grafana software (grafana.com), which is used to display system and flight metrics.\nAs Grafana deliberately does not support real customistaion or embedding, it is likely this will be deprecated in the future in favour of custom solution that is more flexible.",
                    "Maverick_analysis::Influx class\nThis class installs/manages InfluxDB software (www.influxdata.com), which is used to store time series metrics, including system and flight controller data.",
                    "Maverick_analysis::Mavlogd class\nThis class installs/manages Mavlogd, which is a bespoke script from Maverick that is used to import flight data into influxd.",
                    "Maverick_dev class\nThis class manages the development environment.",
                    "Maverick_dev::apsitl_dev class\nThis class declares the default Ardupilot SITL instance.  It then calls maverick_dev::apsitl that creates the actual SITL instance",
                    "Maverick_dev::ardupilot class\nThis class installs/manages the Ardupilot software/firmware environment.",
                    "Maverick_dev::px4 class\nThis class installs/manages the PX4 software/firmware environment.",
                    "Maverick_fc class\nThis class manages the flight controller environment, in particular mavlink proxy and services that connect to the flight controller.",
                    "Maverick_hardware class\nThis class controls all other classes in maverick_hardware module.",
                    "Maverick_hardware::Beagle class\nThis class installs/manages the Beaglebone hardware environment",
                    "Maverick_hardware::Intel class\nThis class installs/manages the common Intel hardware environment",
                    "Maverick_hardware::Joule class\nThis class installs/manages the Intel Joule hardware environment",
                    "Maverick_hardware::Odroid class\nThis class installs/manages the Odroid XU4 hardware environment",
                    "Maverick_hardware::Peripheral::Caspa class\nThis class installs/manages the Intel Caspa camera support.",
                    "Maverick_hardware::Peripheral::Flirone class\nThis class installs/manages the FLIR One thermal imager support.",
                    "Maverick_hardware::Peripheral::Ocam class\nThis class installs/manages the Odroid Ocam camera support.",
                    "Maverick_hardware::Peripheral::Picam class\nThis class installs/manages the Raspberry Pi camera support.",
                    "Maverick_hardware::Peripheral::Realsense class\nThis class installs/manages the Intel Realsense camera support.",
                    "Maverick_hardware::Raspberry class\nThis class installs/manages the Raspberry Pi hardware environment",
                    "Maverick_hardware::Tegra class\nThis class installs/manages the Nvidia Tegra hardware environment, including support for TX1/TX2 and Jetson Nano.",
                    "Maverick_hardware::Up class\nThis class installs/manages the Aaeon Up hardware environment",
                    "Maverick_intelligence class\nThis class controls all other classes in maverick_intelligence module.\nThe maverick_intelligence class covers Machine Learning/Artificial Intelligence software.",
                    "Maverick_intelligence:pytorch class\nThis class installs/manages the pytorch Machine Learning software (pytorch.org).",
                    "Maverick_intelligence:tensorflow class\nThis class installs/manages the tensorflow Machine Learning software (tensorflow.org).",
                    "Maverick_mavlink class\nThis class controls all other classes in maverick_mavlink module.",
                    "Maverick_mavlink::Dronekit class\nThis class installs Dronekit and associated software.",
                    "Maverick_mavlink::Mavsdk class\nThis class installs MavSDK software.",
                    "Maverick_network class\nThis class controls all other classes in maverick_network module.",
                    "Maverick_network::Avahi class\nThis class installs/manages Avahi zeroconf software/service.",
                    "Maverick_network::Dnsclient class\nThis class installs/manages /etc/resolv.conf network dns client config.",
                    "Maverick_network::Dnsmasq class\nThis class installs/manages the dnsmasq software and configuration.",
                    "Maverick_network::Timesync class\nThis class installs/manages system time synchronization software/configuration.",
                    "Maverick_network::Wifibroadcast class\nThis class installs/manages wifibroadcast software/configuration.",
                    "Maverick_network::Zerotier class\nThis class installs/manages Zerotier network software/configuration.",
                    "Maverick_ros class\nThis class controls all other classes in maverick_ros module.",
                    "Maverick_ros::Ros1 class\nThis class installs/manages ROS (ros.org).",
                    "Maverick_ros::Ros2 class\nThis class installs/manages ROS2 (ros.org).",
                    "Maverick_security class\nThis class controls all other classes in maverick_security module.",
                    "Maverick_security::disable_services class\nThis class disables various system services that are typically not needed or a good idea for security.",
                    "Maverick_security::fail2ban class\nThis class installs and manages the fail2ban service.  This provides protection against brute force attacks.",
                    "Maverick_security::firewall class\nThis class installs and manages the network firewall.",
                    "Maverick_security::firewall_common class\nThis class declares standard common firewall rules",
                    "Maverick_security::firewall_post class\nThis class declares post-firewall rules",
                    "Maverick_security::firewall_pre class\nThis class declares pre-firewall rules",
                    "Maverick_security::ldap_client class\nThis class configures an ldap client",
                    "Maverick_security::ldap_server class\nThis class installs and manages an LDAP server.",
                    "Maverick_security::scanners class\nThis class installs and manages security scanners.",
                    "Maverick_security::ssh class\nThis class installs and manages SSH service and login banners.",
                    "Maverick_security::Ssl class\nThis class installs and manages the Maverick SSL environment.",
                    "Maverick_vision class\nThis class controls all other classes in maverick_vision module.",
                    "Maverick_vision::Aruco class\nThis class installs and manages the Aruco software.",
                    "Maverick_vision::Camera_manager class\nThis class installs and manages the Intel CameraManager software.",
                    "Maverick_vision::Collision_avoidance class\nThis class installs and manages the Intel Collision Avoidance library.",
                    "Maverick_vision::Gstreamer class\nThis class installs and manages the Gstreamer library.",
                    "Maverick_vision::mjpg_streamer class\nThis class installs and manages the mjpg_streamer library.",
                    "Maverick_vision::Opencv class\nThis class installs and manages the OpenCV software.",
                    "Maverick_vision::Orb_slam2 class\nThis class installs and manages the Orb_slam2 software.",
                    "Maverick_vision::Rtabmap class\nThis class installs and manages the Rtabmap software.",
                    "Maverick_vision::Vision_landing class\nThis class installs and manages the GoodRobots Vision_Landing software.",
                    "Maverick_vision::Vision_seek class\nThis class installs and manages software to support the Seek Thermal imagers.",
                    "Maverick_vision::Visiond class\nThis class installs and manages the Maverick visiond software.",
                    "Maverick_vision::Visionlibs class\nThis class installs and manages support libraries for other vision components.",
                    "Maverick_web class\nThis class controls all other classes in maverick_web module.",
                    "Maverick_web::Apache class\nThis class installs and manages the Apache webserver.",
                    "Maverick_web::Cloud9 class\nThis class installs and manages the Cloud9 IDE.",
                    "Maverick_web::Codeserver class\nThis class installs and manages the Codeserver IDE.",
                    "Maverick_web::Fcs class\nThis class installs/manages the legacy 'FCS' environment, which will disappear as soon as maverick-web is ready.",
                    "Maverick_web::Maverick_api class\nThis class installs and manages the Maverick-api software.",
                    "Maverick_web::Maverick_docs class\nThis class installs and manages the Maverick documentation.",
                    "Maverick_web::Maverick_web class\nThis class installs and manages the Maverick-web software.",
                    "Maverick_web::Nginx class\nThis class installs and manages the Nginx webserver.",
                    "Maverick_web::Nodejs class\nThis class installs and manages the NodeJS software.",
                    "Maverick_web::Ssl class\nThis class installs and manages the web SSL configuration.",
                    "Maverick_web::Theia class\nThis class installs and manages the Theia IDE."
                ]
            }
        },
        "base::desktop::enable": {
            "description": "Whether the desktop environment should be set as active and enabled or not.\n\n",
            "type": "boolean",
            "default": false
        },
        "base::locale::default_locale": {
            "description": "Set the active default locale, in Debian/Ubuntu format.\n\n",
            "type": "string",
            "default": "en_GB.UTF-8"
        },
        "base::locale::locales": {
            "description": "Any additional locales to be installed, so they can be also activated.\n\n",
            "type": "array",
            "items": {
                "type": "string"
            },
            "default": [
                "en_GB.UTF-8 UTF-8",
                "en_US.UTF-8 UTF-8"
            ]
        },
        "base::locale::timezone": {
            "description": "The system timezone.\n\n",
            "type": "string",
            "default": "Europe/London"
        },
        "base::locale::language_pack": {
            "description": "By default this is locales-all, which includes all the OS locales.  This can be set to specific locales but can cause problems.  If space is not a problem, leave as locales-all.\n\n",
            "type": "string",
            "default": "locales-all"
        },
        "base::maverick::maverick_branch": {
            "description": "This determines which git branch is used for Maverick software (/srv/maverick/software/maverick)\n\n",
            "type": "string",
            "default": "stable"
        },
        "base::maverick::git_credentials_cache": {
            "description": "Whether to use credentials cache.  Unless using a shared machine set to true, to stop having to re-enter git credentials every push.\n\n",
            "type": "boolean",
            "default": false
        },
        "base::python::maverick_python": {
            "description": "Whether to install the custom Maverick Python instance.  This should always be true, unless the OS provides a trusted 3.7 instance.\n\n",
            "type": "boolean",
            "default": false
        },
        "base::python::python_version": {
            "description": "The custom version of Python to compile and install.\n\n",
            "type": "string",
            "default": "v3.7.6"
        },
        "base::users::mav_password": {
            "description": "Hashed password for mav user\n\n",
            "type": "string",
            "default": "$6$YuXyoBZR$cR/cNLGZV.Y/nfW6rvK//fjnr84kckI1HM0fhPnJ3MVVlsl7UxaK8vSw.bM4vTlkF4RTbOSAdi36c5d2hJ9Gj1"
        },
        "base::users::mav_sudopass": {
            "description": "If mav sudo should ask for password or not\n\n",
            "type": "boolean",
            "default": false
        },
        "base::users::root_password": {
            "description": "Hashed password for root user\n\n",
            "type": "string",
            "default": "$6$MIBUXpXc$AA8j.88LvHFBzvVKofKcHnEqvWdv5Cl5D8.O8aB446Mao2X4UkuJ.1VKSr2VcmsbZB7A5ypmmkO0MWGAZr37N."
        },
        "base::users::manage_root_password": {
            "description": "If root password should be set by $root-password\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_analysis::influxdb": {
            "description": "Whether to include the maverick_analysis::influxdb class.  Note this doesn't activate influxdb itself, just includes the class.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_analysis::collectd": {
            "description": "Whether to include the maverick_analysis::mavlogd class.  Note this doesn't activate mavlogd itself, just includes the class.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_analysis::grafana": {
            "description": "\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_analysis::mavlogd": {
            "description": "\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_analysis::collect::active": {
            "description": "If true, set the maverick-collectd service to running and enabled (at boot).\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_analysis::collect::install_type": {
            "description": "If 'source', then compile collectd from git source.  Should always be set to source as it installs into custom location (~/software/collectd).\n\n",
            "enum": [
                "source",
                "binary"
            ],
            "default": "source"
        },
        "maverick_analysis::collect::git_source": {
            "description": "Github repo location to clone source code from.\n\n",
            "type": "string",
            "default": "https://github.com/collectd/collectd.git"
        },
        "maverick_analysis::collect::git_revision": {
            "description": "Github branch to compile.\n\n",
            "type": "string",
            "default": "5.10.0"
        },
        "maverick_analysis::grafana::active": {
            "description": "If true, set the maverick-grafana service to running and enabled (at boot).\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_analysis::grafana::webport": {
            "description": "TCP port number to run the grafana service.  Note this is normally reverse-proxied to the end user so does not need to be open.\n\n",
            "type": "string",
            "default": "6790"
        },
        "maverick_analysis::grafana::host": {
            "description": "Hostname/IP to run the grafana service under.  When reverse-proxied this can be set to localhost.\n\n",
            "type": "string",
            "default": "127.0.0.1"
        },
        "maverick_analysis::grafana::rootpath": {
            "description": "Web root path - normally set to something other than / so it can be reverse-proxied without rewrites.\n\n",
            "type": "string",
            "default": "/analysis/grafana/"
        },
        "maverick_analysis::grafana::grafana_version": {
            "description": "Can be set to a specific version but causes problems with system upgrades.  Easier set to installed.\n\n",
            "type": "string",
            "default": "installed"
        },
        "maverick_analysis::grafana::grafana_firewall_rules": {
            "description": "If grafana service reverse-proxied, set to false as service port does not need to be open.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_analysis::grafana::mav_password": {
            "description": "Hashed password for mav user (default is 'wingman')\n\n",
            "type": "string",
            "default": "e35f84e5859dfe5dfe2a9f6ed2086884c3a5e41d206c6e704b48cf45a0dda574ad85b4e9362e8d89eee3eb82e7ef34528ea4"
        },
        "maverick_analysis::grafana::mav-salt": {
            "description": "Salt for hashed password for mav user\n\n"
        },
        "maverick_analysis::grafana::admin_user": {
            "description": "Name of the admin user\n\n",
            "type": "string",
            "default": "admin"
        },
        "maverick_analysis::grafana::admin_hash": {
            "description": "Hashed password of the admin user (default is 'theneedforspeed')\n\n",
            "type": "string",
            "default": "6eade3d424af57a87cb455d6577a7d92746517db17deda6b73fd40f22850b4491e6513d22763d9891d2a9206e8c61c9da3d6"
        },
        "maverick_analysis::grafana::admin_salt": {
            "description": "Salt for hashed password for root user\n\n",
            "type": "string",
            "default": "WwOYa3P4rc"
        },
        "maverick_analysis::grafana::admin_rand": {
            "description": "? - TODO\n\n",
            "type": "string",
            "default": "slhNQwWHa7"
        },
        "maverick_analysis::grafana::admin_password": {
            "description": "? - TODO\n\n",
            "type": "string",
            "default": "admin"
        },
        "maverick_analysis::grafana::mav_salt": {
            "description": "\n\n",
            "type": "string",
            "default": "ry48G1ZHyi"
        },
        "maverick_analysis::influx::active": {
            "description": "If true, set the maverick-influxd service to running and enabled (at boot).\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_analysis::mavlogd::active": {
            "description": "If true, set the maverick-mavlogd service to running and enabled (at boot).\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_analysis::mavlogd::grafana_port": {
            "description": "The port used to communicate with Grafana.  By default taken from maverick_analysis::grafana::webport and should not be set.\n\n",
            "type": "string",
            "default": "$maverick_analysis::grafana::webport"
        },
        "maverick_analysis::mavlogd::grafana_host": {
            "description": "The hostname used to communicate with Grafana.  By default taken from maverick_analysis::grafana::host and should not be set.\n\n",
            "type": "string",
            "default": "$maverick_analysis::grafana::host"
        },
        "maverick_analysis::mavlogd::grafana_adminpass": {
            "description": "The admin password used to communicate with Grafana.  By default taken from maverick_analysis::grafana::admin_password and should not be set.\n\n",
            "type": "string",
            "default": "$maverick_analysis::grafana::admin_password"
        },
        "maverick_dev::ardupilot": {
            "description": "If set to true, include the maverick_dev::ardupilot class which clones and compiles the Ardupilot firmware, both for local development and uploading to flight controllers.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::apsitl_dev": {
            "description": "If set to true, set up the default Ardupilot SITL instance.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::px4": {
            "description": "If set to true, include the maverick_dev::px4 class which clones and compiles the PX4Pro firmware.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::px4sitl_dev": {
            "description": "If set to true, setup the PX4 SITL environment\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::file_watchers": {
            "description": "The max number of OS inotify file watchers that are allowed.  This allows IDEs to track more files, at the expense of kernel/system memory.\n\n",
            "type": "number",
            "_type": "integer",
            "default": 8192
        },
        "maverick_dev::apsitl_dev::sitl_active": {
            "description": "If true, the SITL service will be activated and enabled at boot time\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::apsitl_dev::vehicle_type": {
            "description": "Type of Ardupilot vehicle to use, eg. copter, plane, sub etc\n\n",
            "default": "copter"
        },
        "maverick_dev::apsitl_dev::mavlink_proxy": {
            "description": "Type of mavlink proxy to use, eg. mavlink-router, mavproxy or cmavnode\n\n",
            "default": "mavlink-router"
        },
        "maverick_dev::apsitl_dev::mavlink_active": {
            "description": "If true, the mavlink proxy will be activated and enabled at boot time\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::apsitl_dev::mavlink_logging": {
            "description": "If true and supported by the mavlink proxy software, then mavlink data will be logged to file\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::apsitl_dev::mavlink_outbaud": {
            "description": "Baud rate of mavlink_serialout port\n\n",
            "default": "115200"
        },
        "maverick_dev::apsitl_dev::mavlink_outflow": {
            "description": "If mavlink_serialout port should use hardware flow control\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::apsitl_dev::ros_instance": {
            "description": "If true, create a separate ROS instance for this SITL instance\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::apsitl_dev::rosmaster_active": {
            "description": "If true, set this separate ROS instance active and enabled at boot time\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::apsitl_dev::mavros_active": {
            "description": "If true, the separate MAVROS instance will be activated and enabled at boot time\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::apsitl_dev::mavros_startup_delay": {
            "description": "This delay causes Mavros to wait before starting, to give ROS and SITL time to boot fully first.  Should be increased on slower boards/environments.\n\n",
            "default": "10"
        },
        "maverick_dev::apsitl_dev::api_instance": {
            "description": "If true, create a separate maverick-api instance\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::apsitl_dev::api_active": {
            "description": "If true, this maverick-api instance will be activated and enabled at boot time\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::apsitl_dev::api_debug": {
            "description": "If true, turn on the -api debug mode\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::apsitl_dev::api_devmode": {
            "description": "If true, turn on the -api dev mode\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::ardupilot::ardupilot_source": {
            "description": "Git repo to clone, that is used to compile ardupilot (in ~/code/ardupilot).  Change this if you want to use a forked repo.\n\n",
            "type": "string",
            "default": "https://github.com/ArduPilot/ardupilot.git"
        },
        "maverick_dev::ardupilot::ardupilot_setupstream": {
            "description": "If true, set the upstream repo.  Useful if using a forked repo for upstream updates and PRs.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::ardupilot::ardupilot_upstream": {
            "description": "Upstream Git repo.  Should usually not be changed.\n\n",
            "type": "string",
            "default": "https://github.com/ArduPilot/ardupilot.git"
        },
        "maverick_dev::ardupilot::ardupilot_branch": {
            "description": "Git branch to use when compiling Arudpilot.\n\n",
            "type": "string",
            "default": "master"
        },
        "maverick_dev::ardupilot::ardupilot_buildsystem": {
            "description": "'waf' is the new buildsystem, 'make' is the old buildsystem.  Should pretty much always be 'waf' these days.\n\n",
            "enum": [
                "waf",
                "make"
            ],
            "default": "waf"
        },
        "maverick_dev::ardupilot::ardupilot_vehicle": {
            "description": "Which vehicle to build for the old 'make' buildsystem.\n\n",
            "type": "string",
            "default": "copter"
        },
        "maverick_dev::ardupilot::sitl": {
            "description": "If set to true, compile firmware for the SITL environment.\n\n",
            "type": "boolean"
        },
        "maverick_dev::ardupilot::armeabi_packages": {
            "description": "If set to true, install the compiler chain software needed to cross-compile firmware for actual flight controller hardware.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::ardupilot::install_jsbsim": {
            "description": "If set to true, compile and install the jsbsim software which is needed to run ArduPlane SITL.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::ardupilot::jsbsim_source": {
            "description": "Git repo to use for jsbsim\n\n",
            "type": "string",
            "default": "http://github.com/JSBSim-Team/jsbsim.git"
        },
        "maverick_dev::px4::px4_source": {
            "description": "Git repo to use to compile PX4 firmware\n\n",
            "type": "string",
            "default": "https://github.com/PX4/Firmware.git"
        },
        "maverick_dev::px4::px4_setupstream": {
            "description": "If true, set the upstream repo.  Useful if using a forked repo for upstream updates and PRs.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::px4::px4_upstream": {
            "description": "Upstream Git repo.  Should usually not be changed.\n\n",
            "type": "string",
            "default": "https://github.com/PX4/Firmware.git"
        },
        "maverick_dev::px4::px4_branch": {
            "description": "Git branch to use when compiling PX4.\n\n",
            "type": "string",
            "default": "v1.10.1"
        },
        "maverick_dev::px4::rtps_branch": {
            "description": "Git branch to use when compiling FastRTPS.\n\n",
            "type": "string",
            "default": "v1.8.2"
        },
        "maverick_dev::px4::sitl": {
            "description": "If true, setup the PX4 SITL environment\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::px4::sitl_active": {
            "description": "\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::px4::cross_compile": {
            "description": "\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::px4::mavlink_proxy": {
            "description": "\n\n",
            "type": "string",
            "default": "mavlink-router"
        },
        "maverick_dev::px4::mavlink_logging": {
            "description": "\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::px4::mavlink_active": {
            "description": "\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::px4::mavlink_startingtcp": {
            "description": "\n\n",
            "type": "number",
            "_type": "integer",
            "default": 5790
        },
        "maverick_dev::px4::mavlink_tcpports": {
            "description": "\n\n",
            "type": "number",
            "_type": "integer",
            "default": 3
        },
        "maverick_dev::px4::mavlink_startingudp": {
            "description": "\n\n",
            "type": "number",
            "_type": "integer",
            "default": 14590
        },
        "maverick_dev::px4::mavlink_udpports": {
            "description": "\n\n",
            "type": "number",
            "_type": "integer",
            "default": 3
        },
        "maverick_dev::px4::mavlink_udpinports": {
            "description": "\n\n",
            "type": "number",
            "_type": "integer",
            "default": 3
        },
        "maverick_dev::px4::mavlink_outbaud": {
            "description": "\n\n",
            "type": "number",
            "_type": "integer",
            "default": 115200
        },
        "maverick_dev::px4::mavlink_outflow": {
            "description": "\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::px4::mavlink_replaceconfig": {
            "description": "\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::px4::ros_instance": {
            "description": "\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::px4::rosmaster_active": {
            "description": "\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::px4::rosmaster_port": {
            "description": "\n\n",
            "type": "number",
            "_type": "integer",
            "default": 11315
        },
        "maverick_dev::px4::mavros_active": {
            "description": "\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::px4::mavros_startup_delay": {
            "description": "\n\n",
            "type": "number",
            "_type": "integer",
            "default": 10
        },
        "maverick_dev::px4::mavlink_port": {
            "description": "\n\n",
            "type": "number",
            "_type": "integer",
            "default": 5790
        },
        "maverick_dev::px4::api_instance": {
            "description": "\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::px4::api_active": {
            "description": "\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::px4::api_devmode": {
            "description": "\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::px4::api_debug": {
            "description": "\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::px4::api_replaceconfig": {
            "description": "\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::px4::status_priority": {
            "description": "\n\n",
            "type": "string",
            "default": "152"
        },
        "maverick_dev::px4::status_entries": {
            "description": "\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_fc::mavlink_proxy": {
            "description": "Type of mavlink proxy to use, eg. mavlink-router, mavproxy or cmavnode\n\n",
            "type": "string",
            "default": "mavlink-router"
        },
        "maverick_fc::mavlink_active": {
            "description": "If true, the mavlink proxy will be activated and enabled at boot time\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_fc::mavlink_logging": {
            "description": "If true and supported by the mavlink proxy software, then mavlink data will be logged to file\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_fc::mavlink_input": {
            "description": "Path to serial device that connects to the FC.  This is different for each board, and is usually set in the board sample manifests (~/software/maverick/conf/sample-nodes)\n\n",
            "type": "string",
            "default": "/dev/ttyAMA0"
        },
        "maverick_fc::mavlink_inbaud": {
            "description": "Baud rate for serial FC connection\n\n",
            "type": "number",
            "_type": "integer",
            "default": 115200
        },
        "maverick_fc::mavlink_inflow": {
            "description": "If set to true, turns on hardware flow control on the FC serial connection.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_fc::mavlink_startingtcp": {
            "description": "Start TCP port - if more than one port then each one will be incremented from this starting value\n\n",
            "type": "number",
            "_type": "integer",
            "default": 5770
        },
        "maverick_fc::mavlink_tcpports": {
            "description": "Number of TCP ports that the mavlink proxy will listen on\n\n",
            "type": "number",
            "_type": "integer",
            "default": 3
        },
        "maverick_fc::mavlink_startingudp": {
            "description": "Start UDP port - if more than one port then each one will be incremented from this starting value\n\n",
            "type": "number",
            "_type": "integer",
            "default": 14570
        },
        "maverick_fc::mavlink_udpports": {
            "description": "Number of UDP ports to listen on\n\n",
            "type": "number",
            "_type": "integer",
            "default": 3
        },
        "maverick_fc::mavlink_udpinports": {
            "description": "Number of UDP In ports to listen on\n\n",
            "type": "number",
            "_type": "integer",
            "default": 3
        },
        "maverick_fc::mavlink_outbaud": {
            "description": "Baud rate of mavlink_serialout port\n\n",
            "type": "number",
            "_type": "integer",
            "default": 115200
        },
        "maverick_fc::mavlink_outflow": {
            "description": "If mavlink_serialout port should use hardware flow control\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_fc::mavlink_replaceconfig": {
            "description": "If set to true, this will overwrite the mavlink proxy config file.  If false, edits can be made directly to the config file without being managed/overwritten\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_fc::ros_instance": {
            "description": "If true, create a separate ROS instance for this SITL instance\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_fc::rosmaster_active": {
            "description": "If true, set this separate ROS instance active and enabled at boot time\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_fc::rosmaster_port": {
            "description": "Define the port number that the ROS master will listen on.  This must be unique across all ROS instances.\n\n",
            "type": "number",
            "_type": "integer",
            "default": 11311
        },
        "maverick_fc::mavros_active": {
            "description": "If true, the separate MAVROS instance will be activated and enabled at boot time\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_fc::mavros_startup_delay": {
            "description": "This delay causes Mavros to wait before starting, to give ROS and SITL time to boot fully first.  Should be increased on slower boards/environments.\n\n",
            "type": "number",
            "_type": "integer",
            "default": 10
        },
        "maverick_fc::api_instance": {
            "description": "If true, create a separate maverick-api instance\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_fc::api_active": {
            "description": "If true, this maverick-api instance will be activated and enabled at boot time\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_fc::mavlink_flow": {
            "description": "\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_hardware::raspberry_install": {
            "description": "If true, include the maverick_hardware::raspberry support class\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_hardware::beagle_install": {
            "description": "If true, include the maverick_hardware::beagle support class\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_hardware::odroid_install": {
            "description": "If true, include the maverick_hardware::odroid support class\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_hardware::joule_install": {
            "description": "If true, include the maverick_hardware::joule support class\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_hardware::up_install": {
            "description": "If true, include the maverick_hardware::up support class\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_hardware::tegra_install": {
            "description": "If true, include the maverick_hardware::tegra support class\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_hardware::camera_ocam_install": {
            "description": "If true, include the maverick_hardware::camera_ocam support class\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_hardware::camera_picam_install": {
            "description": "If true, include the maverick_hardware::camera_picam support class\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_hardware::realsense": {
            "description": "install\nIf true, include the maverick_hardware::realsense support class\n\n"
        },
        "maverick_hardware::flirone_install": {
            "description": "If true, include the maverick_hardware::flirone support class\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_hardware::realsense_install": {
            "description": "\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_hardware::beagle::included_cloud9": {
            "description": "If false (default), disable the provided cloud9 IDE.  Maverick provides it's own cloud9 environment.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_hardware::intel::mraa": {
            "description": "If true, install the MRAA GPIO access library.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_hardware::intel::intel_graphics": {
            "description": "If true, install accelerated Intel graphics support.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_hardware::intel::opencl": {
            "description": "If true, install Beignet OpenCL software\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_hardware::joule::remove_more_packages": {
            "description": "If true, remove packages that won't normally be used in a UAV environment to reclaim necessary space.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_hardware::joule::ipu4_blacklist": {
            "description": "If true, add the buggy ipu4 modules to kernel blacklist.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_hardware::joule::serialconsole": {
            "description": "If true, enable the serial console.  This should be disabled by default, to allow serial communication with the flight controller.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_hardware::joule::install_caspa": {
            "description": "If true, install the caspa camera software support.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_hardware::odroid::governor_atboot": {
            "description": "This determines the hardware power governor to use.  Recommended to use performance.\n\n",
            "type": "string",
            "default": "performance"
        },
        "maverick_hardware::odroid::remove_more_packages": {
            "description": "If true, remove large packages that should not be needed in UAV environment to reclaim useful space.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_hardware::peripheral::flirone::active": {
            "description": "If true, activate the maverick-flirone service\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_hardware::peripheral::picam::docs": {
            "description": "If true, install documentation for picam\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_hardware::peripheral::realsense::sdk1": {
            "description": "Install SDK1 software.  Used for legacy realsense devices like R200.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_hardware::peripheral::realsense::sdk2": {
            "description": "Install SDK2 software.  Used for all modern realsense hardware.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_hardware::raspberry::expand_root": {
            "description": "If true, expand the root filesystem to the full size of the SD card\n\n\u00a0@param camera\n  If true, install raspberry picam support.",
            "type": "boolean",
            "default": false
        },
        "maverick_hardware::raspberry::gpumem": {
            "description": "Set the split of cpu/gpu memory.  128M is recommended to fully enable GPU functions.\n\n\u00a0@param camera\n  If true, install raspberry picam support.",
            "type": "number",
            "_type": "integer",
            "default": 128
        },
        "maverick_hardware::raspberry::overclock": {
            "description": "Set the overclocking state of the CPU.  Recommended to keep None unless cooling hardware and a specific need.\n\n\u00a0@param camera\n  If true, install raspberry picam support.",
            "enum": [
                "None",
                "High",
                "Turbo"
            ],
            "default": "None"
        },
        "maverick_hardware::raspberry::devicetree": {
            "description": "If true, enable devicetree in kernel boot.  Should almost always be true.\n\n\u00a0@param camera\n  If true, install raspberry picam support.",
            "type": "boolean",
            "default": false
        },
        "maverick_hardware::raspberry::spi": {
            "description": "If true, enable SPI support in the kernel.\n\n\u00a0@param camera\n  If true, install raspberry picam support.",
            "type": "boolean",
            "default": false
        },
        "maverick_hardware::raspberry::i2c": {
            "description": "If true, enable I2C support in the kernel.\n\n\u00a0@param camera\n  If true, install raspberry picam support.",
            "type": "boolean",
            "default": false
        },
        "maverick_hardware::raspberry::serialconsole": {
            "description": "Should be set to false to disable the console on the hardware serial port, so it can be used for flight controller link.\n\n\u00a0@param camera\n  If true, install raspberry picam support.",
            "type": "boolean",
            "default": false
        },
        "maverick_hardware::raspberry::serialoverride": {
            "description": "If true, move the serial link back to the more reliable hardware pins.  This gives better high speed serial link.\n\n\u00a0@param camera\n  If true, install raspberry picam support.",
            "type": "boolean",
            "default": false
        },
        "maverick_hardware::raspberry::xgl": {
            "description": "If true, Add X GL support.  Only needed if using 3D desktop functions.\n\n\u00a0@param camera\n  If true, install raspberry picam support.",
            "type": "boolean",
            "default": false
        },
        "maverick_hardware::raspberry::v4l2": {
            "description": "If true, add specific kernel support for V4L2 device.\n\n\u00a0@param camera\n  If true, install raspberry picam support.",
            "type": "boolean",
            "default": false
        },
        "maverick_hardware::raspberry::overpower_usb": {
            "description": "If true, allow the USB ports to draw more power than the USB standards.  Useful, but use with care.\n\n\u00a0@param camera\n  If true, install raspberry picam support.",
            "type": "boolean",
            "default": false
        },
        "maverick_hardware::raspberry::auto_login": {
            "description": "If true and using desktop enivronment, automatically login without need for password.\n\n\u00a0@param camera\n  If true, install raspberry picam support.",
            "type": "boolean",
            "default": false
        },
        "maverick_hardware::raspberry::desktop_autologin_user": {
            "description": "The username used to login automatically to the desktop, if auto_login is set.\n\n\u00a0@param camera\n  If true, install raspberry picam support.",
            "type": "string",
            "default": "mav"
        },
        "maverick_hardware::raspberry::manage_pi_password": {
            "description": "If true, manage the pi user password, and shut off the default password warnings\n\n\u00a0@param camera\n  If true, install raspberry picam support.",
            "type": "boolean",
            "default": false
        },
        "maverick_hardware::raspberry::pi_password": {
            "description": "Hashed pi user password to set.\n\n\u00a0@param camera\n  If true, install raspberry picam support.",
            "type": "string",
            "default": "$6$YuXyoBZR$cR/cNLGZV.Y/nfW6rvK//fjnr84kckI1HM0fhPnJ3MVVlsl7UxaK8vSw.bM4vTlkF4RTbOSAdi36c5d2hJ9Gj1"
        },
        "maverick_hardware::raspberry::remove_extrapackages": {
            "description": "If true, remove large packages that should not be needed in UAV environment, to free up useful space.\n\n\u00a0@param camera\n  If true, install raspberry picam support.",
            "type": "boolean",
            "default": false
        },
        "maverick_hardware::raspberry::remove_glpackages": {
            "description": "If true, remove packages that provide GL support\n\n\u00a0@param camera\n  If true, install raspberry picam support.",
            "type": "boolean",
            "default": false
        },
        "maverick_hardware::raspberry::swapsize": {
            "description": "Set the filesystem swap size.  Default should only normally be changed when needing to compile large components.\n\n\u00a0@param camera\n  If true, install raspberry picam support.",
            "type": "number",
            "_type": "integer",
            "default": 1024
        },
        "maverick_hardware::raspberry::camera": {
            "description": "\n\n\u00a0@param camera\n  If true, install raspberry picam support.",
            "type": "boolean",
            "default": false
        },
        "maverick_hardware::tegra::jtx1inst": {
            "description": "If true, install software that can be used to monitor the TX1 power use.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_hardware::up::swapsize": {
            "description": "Set the swap size using file.\n\n",
            "type": "number",
            "_type": "integer",
            "default": 1024
        },
        "maverick_intelligence::tensorflow": {
            "description": "If true, include the maverick_intelligence::tensorflow class.  Note this doesn't activate tensorflow itself, just includes the class.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_intelligence::pytorch": {
            "description": "If true, include the maverick_intelligence::pytorch class.  Note this doesn't activate pytorch itself, just includes the class.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_intelligence::pytorch::source": {
            "description": "Github repo to use when compiling from source.\n\n",
            "default": "https://github.com/pytorch/pytorch.git"
        },
        "maverick_intelligence::pytorch::source_version": {
            "description": "Github tag/branch to use when compiling from source.\n\n",
            "default": "1.4"
        },
        "maverick_intelligence::tensorflow::source": {
            "description": "Github repo to use when compiling from source.\n\n",
            "type": "string",
            "default": "https://github.com/tensorflow/tensorflow.git"
        },
        "maverick_intelligence::tensorflow::source_version": {
            "description": "Github tag/branch to use when compiling from source.\n\n",
            "type": "string",
            "default": "v2.1.0"
        },
        "maverick_intelligence::tensorflow::bazel_version": {
            "description": "Version of bazel to use when compiling from source.\n\n",
            "type": "string",
            "default": "0.13.0"
        },
        "maverick_intelligence::tensorflow::version": {
            "description": "Major version to use - 1 or 2.  Now defaults to 2.\n\n",
            "type": "string",
            "default": "2"
        },
        "maverick_mavlink::cmavnode_install": {
            "description": "If true, install cmavnode software.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_mavlink::cmavnode_source": {
            "description": "Github repo to use to install cmavnode.\n\n",
            "type": "string",
            "default": "https://github.com/MonashUAS/cmavnode.git"
        },
        "maverick_mavlink::mavlink_router_install": {
            "description": "If true, install mavlink-router software.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_mavlink::mavlink_router_source": {
            "description": "Git repo to use to install mavlink-router.\n\n",
            "type": "string",
            "default": "https://github.com/intel/mavlink-router.git"
        },
        "maverick_mavlink::mavproxy_install": {
            "description": "If true, install mavproxy software.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_mavlink::mavproxy_type": {
            "description": "Whether to install mavproxy from source or through pip.\n\n",
            "enum": [
                "pip",
                "source"
            ],
            "default": "pip"
        },
        "maverick_mavlink::mavcesium_install": {
            "description": "If true, install mavcesium software.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_mavlink::mavcesium_apikey": {
            "description": "API key for Bing maps to be used in mavcesium.\n\n",
            "type": "string",
            "default": "Auw42O7s-dxnXl0f0HdmOoIAD3bvbPjFOVKDN9nNKrf1uroCCBxetdPowaQF4XaG"
        },
        "maverick_mavlink::mavcesium_port": {
            "description": "TCP port to run mavcesium service.\n\n",
            "type": "string",
            "default": "6791"
        },
        "maverick_mavlink::mavcesium_mavlink_port": {
            "description": "TCP port to connect mavcesium to for mavlink data.\n\n",
            "type": "string",
            "default": "5770"
        },
        "maverick_mavlink::mavcesium_source": {
            "description": "Git repo to use to install mavcesium.\n\n",
            "type": "string",
            "default": "https://github.com/SamuelDudley/MAVCesium.git"
        },
        "maverick_mavlink::mavcesium_active": {
            "description": "If true, activate the mavcesium service and enable at boot time.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_mavlink::cuav_install": {
            "description": "If true, install CUAV software.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_mavlink::gooey_version": {
            "description": "Gooey is a CUAV dependency, can be version sensitive.\n\n",
            "type": "string",
            "default": "1.0.2"
        },
        "maverick_mavlink::mavsdk": {
            "description": "If true, install MavSDK software.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_mavlink::dronekit": {
            "description": "If true, install Dronekit software.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_mavlink::mavproxy_source": {
            "description": "\n\n",
            "type": "string",
            "default": "https://github.com/ArduPilot/MAVProxy.git"
        },
        "maverick_network::netman": {
            "description": "If false, disable network management software - ie. connman or NetworkManager.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_network::predictable": {
            "description": "If true, use 'predictable' network naming.  Although technically more consistent, the naming convention is more difficult to work with in an automated fashion.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_network::dhcpcd": {
            "description": "If false, turn off dhcpcd and rely on dhclient/wpa_supplicant\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_network::avahi": {
            "description": "If true, include maverick_network::avahi class which manages avahi zeroconf networking.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_network::dnsmasq": {
            "description": "If true, include maverick_network::dnsmasq class which manages the dnsmasq software/service.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_network::dnsclient": {
            "description": "If true, include maverick_network::dnsclient class which manages the dnsclient configuration.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_network::wpasupplicant_template": {
            "description": "If true, use templates to manage /etc/wpa_supplicant/wpa_supplicant.conf\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_network::zerotier": {
            "description": "If true, include maverick_network::zerotier class which manages zerotier software and configuration.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_network::timesync": {
            "description": "If true, include maverick_network::timesync class which manages the various timesync services.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_network::wifibroadcast": {
            "description": "If true, include maverick_network::wifibc class which manages wifibroadcast software.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_network::avahi::explicit_naming": {
            "description": "If false, turns on 'publish-addresses' avahi config setting.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_network::dnsclient::servers": {
            "description": "List of DNS servers to use for dns resolution.\n\n",
            "type": "array",
            "items": {
                "type": "string"
            },
            "default": [
                "127.0.0.1",
                "8.8.8.8",
                "8.8.4.4",
                "8.26.56.26",
                "8.20.247.20",
                "209.244.0.3",
                "209.244.0.4"
            ]
        },
        "maverick_network::dnsclient::domain": {
            "description": "Default domain that this system belongs to.\n\n",
            "type": "string",
            "default": "home"
        },
        "maverick_network::dnsclient::search_domains": {
            "description": "List of domains that are suffixed to hostnames if a fully qualified lookup does not return.\n\n",
            "type": "array",
            "items": {
                "type": "string"
            },
            "default": [
                "home",
                "local"
            ]
        },
        "maverick_network::timesync::servers": {
            "description": "List of ntp servers to use for synchronization.\n\n",
            "type": "array",
            "items": {
                "type": "string"
            },
            "default": [
                "0.pool.ntp.org",
                "1.pool.ntp.org",
                "2.pool.ntp.org",
                "3.pool.ntp.org"
            ]
        },
        "maverick_network::wifibroadcast::type": {
            "description": "Determines if the befinitiv or svpcom software should be used.\n\n",
            "enum": [
                "svpcom",
                "befinitiv"
            ],
            "default": "svpcom"
        },
        "maverick_network::wifibroadcast::tx_active": {
            "description": "If true, activate the wifibc_tx service and enable at boot time.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_network::wifibroadcast::rx_active": {
            "description": "If true, activate the wifibc_rx service and enable at boot time.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_network::zerotier::active": {
            "description": "If true, starts the zerotier service and enables at boot time.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_network::zerotier::libzt": {
            "description": "If true, compiles and installs the libzt component.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_network::zerotier::join_network": {
            "description": "If true, network specified in $network_id param will eb joined.  If false, the network will be left.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_network::zerotier::network_id": {
            "description": "The zerotier network to use.\n\n",
            "type": "string",
            "default": "8056c2e21c000001"
        },
        "maverick_ros::ros1": {
            "description": "If true, include the maverick_ros::ros1 class which manages ROS1.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_ros::ros2": {
            "description": "If true, include the maverick_ros::ros2 class which manages ROS2.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_ros::ros1::installtype": {
            "description": "If 'auto' then the type of install needed will be detected based on the operating system version and architecture.  This can be overidden with 'native' or 'source'.\n\n",
            "enum": [
                "native",
                "source",
                "auto"
            ],
            "default": "auto"
        },
        "maverick_ros::ros1::distribution": {
            "description": "Specify the ROS distribution to use - eg. kinetic, melodic\n\n",
            "type": "string",
            "default": "auto"
        },
        "maverick_ros::ros1::buildtype": {
            "description": "ROS core variant, ros_comm is base without GUI, can also be desktop, desktop_full.  mobile and perception variants useful for drones.  desktop_full includes everything.\n\n",
            "type": "string",
            "default": "ros_comm"
        },
        "maverick_ros::ros1::builddir": {
            "description": "Set the build location.\n\n",
            "type": "string",
            "default": "/srv/maverick/var/build/ros_catkin_ws"
        },
        "maverick_ros::ros1::installdir": {
            "description": "Set the install location, should always be /srv/maverick/sofware/ros (which is symlinked to /opt/ros) in Maverick\n\n",
            "type": "string",
            "default": "/srv/maverick/software/ros"
        },
        "maverick_ros::ros1::module_mavros": {
            "description": "If true, install mavros\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_ros::ros1::module_realsense": {
            "description": "If true, install realsense support\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_ros::ros1::module_opencv": {
            "description": "If true, install opencv ros module\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_ros::ros2::installtype": {
            "description": "If 'auto' then the type of install needed will be detected based on the operating system version and architecture.  This can be overidden with 'native' or 'source'.\n\n",
            "enum": [
                "native",
                "source",
                "auto"
            ],
            "default": "auto"
        },
        "maverick_ros::ros2::distribution": {
            "description": "Specify the ROS distribution to use - eg. kinetic, melodic\n\n",
            "type": "string",
            "default": "auto"
        },
        "maverick_ros::ros2::builddir": {
            "description": "Set the build location.\n\n",
            "type": "string",
            "default": "/srv/maverick/var/build/ros2"
        },
        "maverick_ros::ros2::installdir": {
            "description": "Set the install location, should always be /srv/maverick/sofware/ros2 (which is symlinked to /opt/ros2) in Maverick\n\n",
            "type": "string",
            "default": "/srv/maverick/software/ros2"
        },
        "maverick_ros::ros2::metapackage": {
            "description": "The metapackage to use for binary install.\n\n",
            "type": "string",
            "default": "ros-base"
        },
        "maverick_ros::ros2::ros1_bridge": {
            "description": "If true, build and install the ROS1 bridge.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_security::firewall": {
            "description": "If true, include the maverick_security::firewall class which manages network filtering.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_security::fail2ban": {
            "description": "If true, include the maverick_security::fail2ban class which manages brute force proteciton software.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_security::rkhunter": {
            "description": "If true, activate the rkhunter rootkit finder sofwtare.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_security::clamav": {
            "description": "If true, activate the clamav antivirus software.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_security::ssl": {
            "description": "If true, include the maverick_security::ssl class which sets up the SSL environment.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_security::ldap_server": {
            "description": "If true, include the maverick_security::ldap_server class which sets up the ldap server software and configuration.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_security::disable_services": {
            "description": "If true, include the maverick_security::disable_services class which stop typically unnecessary services in a UAV environment.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_security::fail2ban::$alertemail": {
            "description": "Email address to send alerts to.\n\n"
        },
        "maverick_security::firewall::$cronupdate": {
            "description": "If true, this sets up an hourly system cron job that updates the firewall.  This is useful if using dynamic dns, to refresh updated IP addresses.\n\n"
        },
        "maverick_security::firewall::cronupdate": {
            "description": "\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_security::ldap_client::base": {
            "description": "Set the LDAP base DN\n\n",
            "type": "string",
            "default": "dc=maverick,dc=one"
        },
        "maverick_security::ldap_server::$server_type": {
            "description": "Type of LDAP server software - currently only openldap is supported\n\n"
        },
        "maverick_security::ldap_server::base": {
            "description": "Base DN\n\n",
            "type": "string",
            "default": "dc=maverick,dc=one"
        },
        "maverick_security::ldap_server::roothash": {
            "description": "Root hashed password.  Create sha hashes here: http://www.mytecbits.com/tools/cryptography/sha2generator\n\n",
            "type": "string",
            "default": "{SHA512}8dba3660197daf7642b9eaeaf77ef817ae9471f3b3d672bfb4fd94100dd5801cd9c990dd64938822e17643b8810cd31ee0ae87b9370884a7d880cfbc5307a573"
        },
        "maverick_security::ldap_server::server_type": {
            "description": "\n\n",
            "type": "string",
            "default": "openldap"
        },
        "maverick_security::ldap_server::cert_country": {
            "description": "\n\n",
            "type": "string",
            "default": "US"
        },
        "maverick_security::ldap_server::cert_state": {
            "description": "\n\n",
            "type": "string",
            "default": "State of Being"
        },
        "maverick_security::ldap_server::cert_locality": {
            "description": "\n\n",
            "type": "string",
            "default": "Moving frequently"
        },
        "maverick_security::ldap_server::cert_orgname": {
            "description": "\n\n",
            "type": "string",
            "default": "Maverick"
        },
        "maverick_security::ldap_server::cert_orgunit": {
            "description": "\n\n",
            "type": "string",
            "default": "Robots"
        },
        "maverick_security::ldap_server::cert_cname": {
            "description": "\n\n",
            "type": "string",
            "default": "slapd"
        },
        "maverick_security::scanners::rkhunter": {
            "description": "If true, setup and activate rkhunter, a rootkit hunter.  This monitors the filesystem and process table for changes and suspicious processes.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_security::scanners::clamav": {
            "description": "If true, setup and run clamav.  Note that clamav can take a reasonable amount of resources.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_security::ssl::create_ca": {
            "description": "If true, create and configure a central Maverick Certificate Authority, which can sign other SSL certificates.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_security::ssl::ca_passphrase": {
            "description": "Passphrase used to protect access to the CA.\n\n",
            "type": "string",
            "default": "iceman"
        },
        "maverick_security::ssl::ca_country": {
            "description": "Country field used when creating CA.\n\n",
            "type": "string",
            "default": "US"
        },
        "maverick_security::ssl::ca_state": {
            "description": "State field used when creating CA.\n\n",
            "type": "string",
            "default": "State of Being"
        },
        "maverick_security::ssl::ca_locality": {
            "description": "Locality field used when creating CA.\n\n",
            "type": "string",
            "default": "Moving frequently"
        },
        "maverick_security::ssl::ca_orgname": {
            "description": "Organisation Name field used when creating CA.\n\n",
            "type": "string",
            "default": "Maverick CA"
        },
        "maverick_security::ssl::ca_orgunit": {
            "description": "Organisation Unit field used when creating CA.\n\n",
            "type": "string",
            "default": "Security"
        },
        "maverick_security::ssl::ca_cname": {
            "description": "Canonical Name field used when creating CA.\n\n",
            "type": "string",
            "default": "MaverickCA ${::hostname}"
        },
        "maverick_vision::visiond": {
            "description": "If true, include the maverick_vision::visiond class which manages the Maverick visiond service.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_vision::gstreamer": {
            "description": "If true, include the maverick_vision::gstreamer class which installs/configures gstreamer software.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_vision::opencv": {
            "description": "If true, include the maverick_vision::opencv class which installs/configures OpenCV software.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_vision::visionlibs": {
            "description": "If true, include the maverick_vision::visionlibs class which installs/configures various supporting vision libraries.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_vision::mjpg_streamer": {
            "description": "If true, include the maverick_vision::mjpg_streamer class which installs/configures mjpg_streamer software.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_vision::aruco": {
            "description": "If true, include the maverick_vision::aruco class which installs/configures aruco software.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_vision::orb_slam2": {
            "description": "If true, include the maverick_vision::orb_slam2 class which installs/configures the orb/slam2 software.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_vision::vision_landing": {
            "description": "If true, include the maverick_vision::vision_landing class which installs/configures the vision_landing software.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_vision::vision_seek": {
            "description": "If true, include the maverick_vision::vision_seek class which installs/configures software for the seek thermal camera.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_vision::camera_manager": {
            "description": "If true, include the maverick_vision::collision_avoidance class which installs/configures the collission avoidance software.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_vision::rtabmap": {
            "description": "If true, include the maverick_vision::rtabmap class which installs/configures the rtabmap software.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_vision::collision_avoidance": {
            "description": "\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_vision::aruco::aruco_gitsource": {
            "description": "Git repo to use to compile/install Aruco\n\n",
            "type": "string",
            "default": "https://github.com/fnoop/aruco.git"
        },
        "maverick_vision::aruco::aruco_gitbranch": {
            "description": "Which git branch to use to compile/install Aruco\n\n",
            "type": "string",
            "default": "master"
        },
        "maverick_vision::camera_manager::active": {
            "description": "If true, start the service and enable at boot time.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_vision::camera_manager::gitsource": {
            "description": "Which Git repo to use to compile/install the software.\n\n",
            "type": "string",
            "default": "https://github.com/Dronecode/camera-manager.git"
        },
        "maverick_vision::camera_manager::rtsp_port": {
            "description": "The port number to listen on for RTSP.\n\n",
            "type": "number",
            "_type": "integer",
            "default": 8554
        },
        "maverick_vision::collision_avoidance::active": {
            "description": "If true, start the service and enable at boot time.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_vision::collision_avoidance::source": {
            "description": "Which Git repo to use to compile/install the software.\n\n",
            "type": "string",
            "default": "https://github.com/intel/collision-avoidance-library.git"
        },
        "maverick_vision::collision_avoidance::revision": {
            "description": "The git branch to use to compile the software.\n\n",
            "type": "string",
            "default": "master"
        },
        "maverick_vision::gstreamer::gstreamer_installtype": {
            "description": "Whether to install gstreamer through source code or native packages.\n\n",
            "enum": [
                "source",
                "native"
            ],
            "default": "source"
        },
        "maverick_vision::gstreamer::gstreamer_version": {
            "description": "Which git version to use to clone and compile/install\n\n",
            "type": "string",
            "default": "1.16.2"
        },
        "maverick_vision::gstreamer::libx264": {
            "description": "If 'installed' then will be installed and used by the gstreamer compile.\n\n",
            "enum": [
                "installed",
                "absent"
            ],
            "default": "installed"
        },
        "maverick_vision::opencv::contrib": {
            "description": "If true, compile and install the opencv-contrib software.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_vision::opencv::opencv_version": {
            "description": "The version of OpenCV to clone, compile and install.\n\n",
            "type": "string",
            "default": "4.2.0"
        },
        "maverick_vision::opencv::release": {
            "description": "Type of build - Release or Debug.\n\n",
            "enum": [
                "Release",
                "Debug"
            ],
            "default": "Release"
        },
        "maverick_vision::opencv::precompile_headers": {
            "description": "If true, will take a massive amount of disk space to compile, so set to false unless needed.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_vision::opencv::armv7l_optimize": {
            "description": "Compile options to optimise armv7l (Raspberry Pi 3/4) build.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_vision::opencv::opencv_dldt_version": {
            "description": "Which version of OpenVino DLDT to clone/compile/install.\n\n",
            "type": "string",
            "default": "2019"
        },
        "maverick_vision::opencv::openvino": {
            "description": "If true, install the OpenVino modules.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_vision::orb_slam2::ros_build": {
            "description": "If true, add the orb_slam2 ROS components\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_vision::rtabmap::source": {
            "description": "The git repo to use to compile and install the software.\n\n",
            "type": "string",
            "default": "https://github.com/introlab/rtabmap.git"
        },
        "maverick_vision::rtabmap::revision": {
            "description": "Which git branch/revision to compile and install the software.\n\n",
            "type": "string",
            "default": "master"
        },
        "maverick_vision::vision_landing::active": {
            "description": "If true, start the vision_landing service and enable at boot time.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_vision::vision_landing::vision_landing_source": {
            "description": "The git repo to use to compile and install the vision_landing software.\n\n",
            "type": "string",
            "default": "https://github.com/goodrobots/vision_landing.git"
        },
        "maverick_vision::vision_landing::vision_landing_revision": {
            "description": "The git branch/revision to use to compile and install the software.\n\n",
            "type": "string",
            "default": "master"
        },
        "maverick_vision::vision_seek::active": {
            "description": "If true, start the vision_seek service and enable at boot time.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_vision::vision_seek::libseek_thermal": {
            "description": "If true, install the libseek library that supports the seek thermal hardware.  Should always be true.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_vision::vision_seek::libseek_thermal_source": {
            "description": "Git repo to use to clone/compile/install libseek software.\n\n",
            "type": "string",
            "default": "https://github.com/fnoop/libseek-thermal.git"
        },
        "maverick_vision::vision_seek::libseek_thermal_revision": {
            "description": "Git branch/revision to use to clone/compile/install libseek software.\n\n",
            "type": "string",
            "default": "master"
        },
        "maverick_vision::visiond::active": {
            "description": "If true, start the visiond service and enable at boot time.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_vision::visiond::rtsp_port": {
            "description": "Port number to listen on for RTSP stream requests - 5600 is the 'default' RTSP port\n\n",
            "type": "number",
            "_type": "integer",
            "default": 5600
        },
        "maverick_vision::visiond::webvision_active": {
            "description": "If true, start the webvision service and enable at boot time.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_vision::visionlibs::tbb": {
            "description": "If true, install Intel TBB multithreading library.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_vision::visionlibs::tbb_version": {
            "description": "Version of TBB to clone, compile and install.\n\n",
            "type": "string",
            "default": "v2020.0"
        },
        "maverick_vision::visionlibs::openblas": {
            "description": "If true, install OpenBLAS library.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_vision::visionlibs::openblas_version": {
            "description": "Version of OpenBLAS to clone, compile and install.\n\n",
            "type": "string",
            "default": "v0.3.7"
        },
        "maverick_web::cloud9": {
            "description": "If true, include the maverick_web::cloud9 class which installs and manages the Cloud9 IDE software.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_web::codeserver": {
            "description": "If true, include the maverick_web::codeserver class which installs and manages the Codeserver/VsCode IDE software.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_web::theia": {
            "description": "If true, include the maverick_web::theia class which installs and manages the Theia IDE software.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_web::nodejs": {
            "description": "If true, install NodeJS software.  Lots of other Maverick components depend on NodeJS, this should be true.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_web::webserver": {
            "description": "If true, install, start and manage a Maverick webserver.  Lots of other Maverick components depend on NodeJS, this should be true.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_web::webserver_type": {
            "description": "Apache or Nginx can be specified, but only Nginx is currently supported.\n\n",
            "enum": [
                "nginx",
                "apache"
            ],
            "default": "nginx"
        },
        "maverick_web::webserver_port": {
            "description": "Unencrypted webserver port to listen on.  Default for web browsers is port 80.\n\n",
            "type": "number",
            "_type": "integer",
            "default": 80
        },
        "maverick_web::webserver_sslport": {
            "description": "Encrypted webserver port to listen on.  Default for web browsers is port 443.\n\n",
            "type": "number",
            "_type": "integer",
            "default": 443
        },
        "maverick_web::maverick_docs": {
            "description": "If true, install Maverick documentation.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_web::ssl": {
            "description": "If true, include maverick_web::ssl class which manages the SSL environment for web services.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_web::maverick_web": {
            "description": "If true, include maverick_web::maverick_web class which installs and manages the Maverick-web software.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_web::maverick_api": {
            "description": "If true, include maverick_web::maverick_api class which installs and manages the Maverick-api software.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_web::fcs": {
            "description": "If true, include maverick_web::fcs class which manages the legacy FCS content.  This will be replaced with -web and -api in the future.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_web::server_fqdn": {
            "description": "This is set to the system fqdn by default, but can be specified here.  It is used by a lot of other maverick_web classes.\n\n",
            "type": "string",
            "default": "$::fqdn"
        },
        "maverick_web::apache::port": {
            "description": "Unencrypted webserver port to listen on.  Default for web browsers is port 80.\n\n",
            "type": "number",
            "_type": "integer",
            "default": 80
        },
        "maverick_web::apache::ssl_port": {
            "description": "Encrypted webserver port to listen on.  Default for web browsers is port 443.\n\n",
            "type": "number",
            "_type": "integer",
            "default": 443
        },
        "maverick_web::apache::server_hostname": {
            "description": "Server FQDN to use to create default vhost.\n\n",
            "type": "string",
            "default": "$maverick_web::server_fqdn"
        },
        "maverick_web::cloud9::active": {
            "description": "If true, start cloud9 service and enable at boot time.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_web::cloud9::webport": {
            "description": "TCP port for Cloud9 to listen on.\n\n",
            "type": "number",
            "_type": "integer",
            "default": 6789
        },
        "maverick_web::cloud9::basepath": {
            "description": "The base path for Cloud9 to present in filesystem explorer.\n\n",
            "type": "string",
            "default": "/srv/maverick"
        },
        "maverick_web::cloud9::cloud9_password": {
            "description": "Password to use for web connections.\n\n",
            "type": "string",
            "default": "wingman"
        },
        "maverick_web::codeserver::active": {
            "description": "If true, start codeserver service and enable at boot time.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_web::codeserver::webport": {
            "description": "TCP port to listen on.\n\n",
            "type": "number",
            "_type": "integer",
            "default": 6789
        },
        "maverick_web::codeserver::basepath": {
            "description": "The base path for Codeserver to present in filesystem explorer.\n\n",
            "type": "string",
            "default": "/srv/maverick"
        },
        "maverick_web::codeserver::password": {
            "description": "Set the password to be used for connections.\n\n",
            "type": "string",
            "default": "wingman"
        },
        "maverick_web::codeserver::replace_password": {
            "description": "If true, the password file will be fully managed and overwritten with the password parameter set here.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_web::codeserver::vscode_version": {
            "description": "Version of cdr/vscode to compile and install.\n\n",
            "type": "string",
            "default": "1.41.1"
        },
        "maverick_web::codeserver::build_type": {
            "description": "Type of codeserver build to compile - production or debug.\n\n",
            "type": "string",
            "default": "production"
        },
        "maverick_web::maverick_docs::server_hostname": {
            "description": "Specifies which webserver vhost to use for the documentation.  Should not be set in normal circumstances.\n\n",
            "type": "string",
            "default": "$maverick_web::server_fqdn"
        },
        "maverick_web::maverick_docs::arudpilot_docs": {
            "description": "If true, compile and install the Ardupilot reference documentation.\n\n"
        },
        "maverick_web::maverick_docs::px4_docs": {
            "description": "If true, compile and install the PX4 reference documentation.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_web::maverick_docs::ardupilot_docs": {
            "description": "\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_web::maverick_web::active": {
            "description": "If true, start service and enable at boot time.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_web::maverick_web::webport": {
            "description": "The port to listen for connections.\n\n",
            "type": "number",
            "_type": "integer",
            "default": 6794
        },
        "maverick_web::maverick_web::webpath_dev": {
            "description": "The web path to use for the dev -web content.\n\n",
            "type": "string",
            "default": "/dev/maverick"
        },
        "maverick_web::maverick_web::webpath_prod": {
            "description": "The web path to use for the production -web content.\n\n",
            "type": "string",
            "default": "/web/maverick"
        },
        "maverick_web::maverick_web::server_hostname": {
            "description": "Specify the webserver vhost to use.\n\n",
            "type": "string",
            "default": "$maverick_web::server_fqdn"
        },
        "maverick_web::nginx::active": {
            "description": "If true, start nginx service and enable at boot time.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_web::nginx::port": {
            "description": "Unencrypted webserver port to listen on.  Default for web browsers is port 80.\n\n",
            "type": "number",
            "_type": "integer",
            "default": 80
        },
        "maverick_web::nginx::ssl_port": {
            "description": "Encrypted webserver port to listen on.  Default for web browsers is port 443.\n\n",
            "type": "number",
            "_type": "integer",
            "default": 443
        },
        "maverick_web::nginx::server_hostname": {
            "description": "Server FQDN to use to create default vhost.\n\n",
            "type": "string",
            "default": "$maverick_web::server_fqdn"
        },
        "maverick_web::nginx::downloads": {
            "description": "If true, activate a downloads web content.  This is useful to present large downloads to users.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_web::nginx::downloads_dir": {
            "description": "Filesystem path to use to serve downloads.\n\n",
            "type": "string",
            "default": "/var/www/html/maverick/downloads"
        },
        "maverick_web::nginx::downloads_location": {
            "description": "Web path for downloads.\n\n",
            "type": "string",
            "default": "/maverick/downloads"
        },
        "maverick_web::nginx::www_root": {
            "description": "Filesystem root to serve legacy web content.\n\n",
            "type": "string",
            "default": "/srv/maverick/software/maverick-fcs/public"
        },
        "maverick_web::ssl::cert_country": {
            "description": "\n\n",
            "default": "US"
        },
        "maverick_web::ssl::cert_state": {
            "description": "\n\n",
            "default": "State of Being"
        },
        "maverick_web::ssl::cert_locality": {
            "description": "\n\n",
            "default": "Moving frequently"
        },
        "maverick_web::ssl::cert_orgname": {
            "description": "\n\n",
            "default": "Maverick"
        },
        "maverick_web::ssl::cert_orgunit": {
            "description": "\n\n",
            "default": "Robots"
        },
        "maverick_web::ssl::cert_cname": {
            "description": "\n\n",
            "default": "$maverick_web::server_fqdn"
        },
        "maverick_web::theia::active": {
            "description": "If true, start the Theia service and enable at boot time.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_web::theia::webport": {
            "description": "TCP port to listen on for connection.\n\n",
            "type": "number",
            "_type": "integer",
            "default": 6789
        },
        "maverick_web::theia::basepath": {
            "description": "The base path for Theia to present in filesystem explorer.\n\n",
            "type": "string",
            "default": "/srv/maverick"
        },
        "maverick_web::theia::password": {
            "description": "Password to use for web connections.\n\n",
            "type": "string",
            "default": "wingman"
        },
        "base::sysctl::conf::value": {
            "description": "\n\n"
        },
        "maverick_dev::apsitl::instance_name": {
            "description": "Name of the SITL instance - this is a short name used to generate file/service names, eg. 'apsitl'\n\n",
            "type": "string",
            "default": "apsitl"
        },
        "maverick_dev::apsitl::instance_number": {
            "description": "This must be a unique integer, used to identify the instance\n\n",
            "type": "number",
            "_type": "integer",
            "default": 0
        },
        "maverick_dev::apsitl::sitl_active": {
            "description": "If true, the SITL service will be activated and enabled at boot time\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::apsitl::sitl_port": {
            "description": "Port number that SITL listens onlyif\n\n",
            "type": "number",
            "_type": "integer",
            "default": 5000
        },
        "maverick_dev::apsitl::rcin_port": {
            "description": "Port number that SITL RC in listens on\n\n",
            "type": "number",
            "_type": "integer",
            "default": 5500
        },
        "maverick_dev::apsitl::vehicle_type": {
            "description": "Type of Ardupilot vehicle to use, eg. copter, plane, sub etc\n\n",
            "type": "string",
            "default": "copter"
        },
        "maverick_dev::apsitl::mavlink_proxy": {
            "description": "Type of mavlink proxy to use, eg. mavlink-router, mavproxy or cmavnode\n\n",
            "type": "string",
            "default": "mavlink-router"
        },
        "maverick_dev::apsitl::mavlink_active": {
            "description": "If true, the mavlink proxy will be activated and enabled at boot time\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::apsitl::mavlink_logging": {
            "description": "If true and supported by the mavlink proxy software, then mavlink data will be logged to file\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::apsitl::mavlink_startingtcp": {
            "description": "Start TCP port - if more than one port then each one will be incremented from this starting value\n\n",
            "type": "number",
            "_type": "integer",
            "default": 6000
        },
        "maverick_dev::apsitl::mavlink_tcpports": {
            "description": "Number of TCP ports that the mavlink proxy will listen on\n\n",
            "type": "number",
            "_type": "integer",
            "default": 3
        },
        "maverick_dev::apsitl::mavlink_startingudp": {
            "description": "Start UDP port - if more than one port then each one will be incremented from this starting value\n\n",
            "type": "number",
            "_type": "integer",
            "default": 14000
        },
        "maverick_dev::apsitl::mavlink_udpports": {
            "description": "Number of UDP ports to listen on\n\n",
            "type": "number",
            "_type": "integer",
            "default": 3
        },
        "maverick_dev::apsitl::mavlink_udpinports": {
            "description": "Number of UDP In ports to listen on\n\n",
            "type": "number",
            "_type": "integer",
            "default": 3
        },
        "maverick_dev::apsitl::mavlink_outbaud": {
            "description": "Baud rate of mavlink_serialout port\n\n",
            "type": "number",
            "_type": "integer",
            "default": 115200
        },
        "maverick_dev::apsitl::mavlink_outflow": {
            "description": "If mavlink_serialout port should use hardware flow control\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::apsitl::mavlink_replaceconfig": {
            "description": "If set to true, this will overwrite the mavlink proxy config file.  If false, edits can be made directly to the config file without being managed/overwritten\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::apsitl::ros_instance": {
            "description": "If true, create a separate ROS instance for this SITL instance\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::apsitl::rosmaster_active": {
            "description": "If true, set this separate ROS instance active and enabled at boot time\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::apsitl::rosmaster_port": {
            "description": "Define the port number that the ROS master will listen on.  This must be unique across all ROS instances.\n\n",
            "type": "number",
            "_type": "integer",
            "default": 11000
        },
        "maverick_dev::apsitl::mavros_active": {
            "description": "If true, the separate MAVROS instance will be activated and enabled at boot time\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::apsitl::mavros_startup_delay": {
            "description": "This delay causes Mavros to wait before starting, to give ROS and SITL time to boot fully first.  Should be increased on slower boards/environments.\n\n",
            "type": "number",
            "_type": "integer",
            "default": 10
        },
        "maverick_dev::apsitl::api_instance": {
            "description": "If true, create a separate maverick-api instance\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::apsitl::api_active": {
            "description": "If true, this maverick-api instance will be activated and enabled at boot time\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::apsitl::api_port": {
            "description": "Port number that the separate maverick-api instance will listen on.  Must be unique across all -api instances.\n\n",
            "type": "number",
            "_type": "integer",
            "default": 7000
        },
        "maverick_dev::apsitl::api_debug": {
            "description": "If true, turn on the -api debug mode\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::apsitl::api_devmode": {
            "description": "If true, turn on the -api dev mode\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::apsitl::api_replaceconfig": {
            "description": "If set to true, this will overwrite the -api config file.  If false, edits can be made directly to the config file without being managed/overwritten\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::apsitl::status_priority": {
            "description": "This defines the priority of maverick status.d entry for this instance.  This determines the display order in `maverick status`\n\n",
            "type": "string",
            "default": "151"
        },
        "maverick_dev::apsitl::status_entries": {
            "description": "\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_dev::fwbuildwaf::buildfile": {
            "description": "Filename of the compiled firwmare.  This is used to test if the compiled firmware already exists.\n\n",
            "type": "string"
        },
        "maverick_dev::fwbuildwaf::vehicle": {
            "description": "The vehicle type to compile, eg. copter, plane, rover, sub, heli, antennatracker\n\n",
            "type": "string"
        },
        "maverick_dev::fwbuildwaf::board": {
            "description": "Hardware target - eg. sitl, px4-v4\n\n",
            "type": "string"
        },
        "maverick_mavlink::cmavnode::inputtype": {
            "description": "The type of mavlink input into cmavnode.  Serial by default, can also take a tcp or udp data stream.\n\n",
            "enum": [
                "serial",
                "tcp",
                "udp"
            ],
            "default": "serial"
        },
        "maverick_mavlink::cmavnode::inputbaud": {
            "description": "If using serial input, baud rate to use.\n\n",
            "type": "number",
            "_type": "integer",
            "default": 115200
        },
        "maverick_mavlink::cmavnode::inputflow": {
            "description": "If using serial input, whether to use hardware flow control.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_mavlink::cmavnode::startingudp": {
            "description": "Starting udp port number to listen on.\n\n",
            "type": "number",
            "_type": "integer",
            "default": 14570
        },
        "maverick_mavlink::cmavnode::udpports": {
            "description": "Number of udp ports to define.\n\n",
            "type": "number",
            "_type": "integer",
            "default": 3
        },
        "maverick_mavlink::cmavnode::udpinports": {
            "description": "Number of udp in ports to define.\n\n",
            "type": "number",
            "_type": "integer",
            "default": 3
        },
        "maverick_mavlink::cmavnode::startingtcp": {
            "description": "Starting TCP port to listen on.\n\n",
            "type": "number",
            "_type": "integer",
            "default": 5770
        },
        "maverick_mavlink::cmavnode::tcpports": {
            "description": "Number of TCP ports to listen on.\n\n",
            "type": "number",
            "_type": "integer",
            "default": 3
        },
        "maverick_mavlink::cmavnode::outflow": {
            "description": "If set, defines the serialout hardware flow control.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_mavlink::cmavnode::replaceconfig": {
            "description": "If true, fully manage the cmavnode instance configuration and overwrite each configure run.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_mavlink::mavlink_router::inputtype": {
            "description": "The type of mavlink input into cmavnode.  Serial by default, can also take a tcp or udp data stream.\n\n",
            "enum": [
                "serial",
                "tcp",
                "udp"
            ],
            "default": "serial"
        },
        "maverick_mavlink::mavlink_router::inputflow": {
            "description": "If using serial input, whether to use hardware flow control.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_mavlink::mavlink_router::startingudp": {
            "description": "Starting udp port number to listen on.\n\n",
            "type": "number",
            "_type": "integer",
            "default": 14570
        },
        "maverick_mavlink::mavlink_router::udpports": {
            "description": "Number of udp ports to define.\n\n",
            "type": "number",
            "_type": "integer",
            "default": 3
        },
        "maverick_mavlink::mavlink_router::udpinports": {
            "description": "Number of udp in ports to define.\n\n",
            "type": "number",
            "_type": "integer",
            "default": 3
        },
        "maverick_mavlink::mavlink_router::startingtcp": {
            "description": "Starting TCP port to listen on.\n\n",
            "type": "number",
            "_type": "integer",
            "default": 5770
        },
        "maverick_mavlink::mavlink_router::tcpports": {
            "description": "Number of TCP ports to listen on.\n\n",
            "type": "number",
            "_type": "integer",
            "default": 3
        },
        "maverick_mavlink::mavlink_router::outflow": {
            "description": "If set, defines the serialout hardware flow control.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_mavlink::mavlink_router::logging": {
            "description": "If true, log mavlink dataflash telemetry to datafiles.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_mavlink::mavlink_router::replaceconfig": {
            "description": "If true, fully manage the cmavnode instance configuration and overwrite each configure run.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_mavlink::mavproxy::inputflow": {
            "description": "If using serial input, whether to use hardware flow control.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_mavlink::mavproxy::startingudp": {
            "description": "Starting udp port number to listen on.\n\n",
            "type": "number",
            "_type": "integer",
            "default": 14570
        },
        "maverick_mavlink::mavproxy::udpports": {
            "description": "Number of udp ports to define.\n\n",
            "type": "number",
            "_type": "integer",
            "default": 3
        },
        "maverick_mavlink::mavproxy::udpinports": {
            "description": "Number of udp in ports to define.\n\n",
            "type": "number",
            "_type": "integer",
            "default": 3
        },
        "maverick_mavlink::mavproxy::startingtcp": {
            "description": "Starting TCP port to listen on.\n\n",
            "type": "number",
            "_type": "integer",
            "default": 5770
        },
        "maverick_mavlink::mavproxy::tcpports": {
            "description": "Number of TCP ports to listen on.\n\n",
            "type": "number",
            "_type": "integer",
            "default": 3
        },
        "maverick_mavlink::mavproxy::outflow": {
            "description": "If set, defines the serialout hardware flow control.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_mavlink::mavproxy::replaceconfig": {
            "description": "If true, fully manage the cmavnode instance configuration and overwrite each configure run.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_mavlink::mavproxy::instance": {
            "description": "\n\n",
            "type": "number",
            "_type": "integer",
            "default": 0
        },
        "maverick_network::interface_ap::ssid": {
            "description": "The SSID to use to create this AP.\n\n",
            "type": "string",
            "default": "Maverick"
        },
        "maverick_network::interface_ap::dhcp_range": {
            "description": "If defining a wireless AP, use this range of IP addresses for associated clients\n\n",
            "type": "string",
            "default": "192.168.10.10,192.168.10.50"
        },
        "maverick_network::interface_ap::dhcp_leasetime": {
            "description": "Length of lease time to use for dhcp server\n\n",
            "type": "string",
            "default": "24h"
        },
        "maverick_network::interface_ap::forward": {
            "description": "If defining an AP interface, turn on network forwarding to bridge network flow between interfaces.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_network::interface_ap::psk": {
            "description": "\n\n",
            "type": "string",
            "default": "8097a204e44b0a740d5daad37d0e34ac16e4df353bc827dcd57d49b36d49740d"
        },
        "maverick_network::interface_ap::driver": {
            "description": "\n\n",
            "type": "string",
            "default": "nl80211"
        },
        "maverick_network::interface_ap::channel": {
            "description": "\n\n",
            "type": "number",
            "_type": "integer",
            "default": 1
        },
        "maverick_network::interface_ap::hw_mode": {
            "description": "\n\n",
            "type": "string",
            "default": "g"
        },
        "maverick_network::interface_ap::disable_broadcast_ssid": {
            "description": "\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_network::interface_managed::type": {
            "description": "\n\nDefines the interface type - ethernet or wireless.\nDefines the type of addressing for the internet - dhcp, static or master.",
            "enum": [
                "ethernet",
                "wireless"
            ],
            "default": "ethernet"
        },
        "maverick_network::interface_managed::addressing": {
            "description": "\n\nDefines the interface type - ethernet or wireless.\nDefines the type of addressing for the internet - dhcp, static or master.",
            "enum": [
                "dhcp",
                "static",
                "master"
            ],
            "default": "dhcp"
        },
        "maverick_network::process_interface::mode": {
            "description": "Defines the interface mode.  Currently managed, monitor and ap are supported.\n\n",
            "enum": [
                "managed",
                "monitor",
                "ap"
            ],
            "default": "managed"
        },
        "maverick_network::process_interface::type": {
            "description": "Defines the interface type - ethernet or wireless.\n\n",
            "enum": [
                "ethernet",
                "wireless"
            ],
            "default": "ethernet"
        },
        "maverick_network::process_interface::addressing": {
            "description": "Defines the type of addressing for the internet - dhcp, static or master.\n\n",
            "enum": [
                "dhcp",
                "static",
                "master"
            ],
            "default": "dhcp"
        },
        "maverick_network::process_interface::apaddress": {
            "description": "If defining an AP interface, this sets the master address of the interface.\n\n",
            "type": "string",
            "default": "192.168.10.1"
        },
        "maverick_network::process_interface::driver": {
            "description": "Set the kernel driver to be used.\n\n",
            "type": "string",
            "default": "nl80211"
        },
        "maverick_network::process_interface::hw_mode": {
            "description": "Define the wireless mode.\n\n",
            "type": "string",
            "default": "g"
        },
        "maverick_network::process_interface::disable_broadcast_ssid": {
            "description": "If true, do not broadcast the SSID if an AP.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_network::process_interface::dhcp_range": {
            "description": "If defining a wireless AP, use this range of IP addresses for associated clients\n\n",
            "type": "string",
            "default": "192.168.10.10,192.168.10.50"
        },
        "maverick_network::process_interface::dhcp_leasetime": {
            "description": "Length of lease time to use for dhcp server\n\n",
            "type": "string",
            "default": "24h"
        },
        "maverick_network::process_interface::forward": {
            "description": "If defining an AP interface, turn on network forwarding to bridge network flow between interfaces.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_ros::mavros::active": {
            "description": "If true, starts the maverick-mavros@[instance] service and enables at boot.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_ros::mavros::rosmaster_port": {
            "description": "The rosmaster port that this instance of mavros connects to.\n\n",
            "type": "number",
            "_type": "integer",
            "default": 11311
        },
        "maverick_ros::mavros::mavlink_port": {
            "description": "The mavlink port that this instance of mavros connects to.\n\n",
            "type": "number",
            "_type": "integer",
            "default": 5770
        },
        "maverick_ros::mavros::mavros_startup_delay": {
            "description": "This is a delay fudge for slower boards to ensure rosmaster and mavlink proxies have had time to fully start.\n\n",
            "type": "number",
            "_type": "integer",
            "default": 10
        },
        "maverick_ros::mavros::mavros_launcher": {
            "description": "The ros/mavros launcher to use to start mavros.\n\n",
            "type": "string",
            "default": "apm.launch"
        },
        "maverick_ros::rosmaster::active": {
            "description": "If true, starts the maverick-rosmaster@[instance] service and enables at boot.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_ros::rosmaster::port": {
            "description": "The port that the rosmaster instance will be set to listen on.\n\n",
            "type": "number",
            "_type": "integer",
            "default": 11311
        },
        "maverick_security::firewall::firerule::ports": {
            "description": "\n\n"
        },
        "maverick_security::firewall::firerule::ips": {
            "description": "\n\n"
        },
        "maverick_security::firewall::firerule::proto": {
            "description": "\n\n",
            "default": "tcp"
        },
        "maverick_web::api::active": {
            "description": "If true, start the maverick-api@[xxx] service and enable at boot time.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_web::api::instance": {
            "description": "Name of the -api instance.  This must be unique.\n\n",
            "type": "string",
            "default": "fc"
        },
        "maverick_web::api::apiport": {
            "description": "TCP port for the api to listen on.\n\n",
            "type": "number",
            "_type": "integer",
            "default": 6800
        },
        "maverick_web::api::rosport": {
            "description": "ROS rosmaster port for -api instance to connect to.\n\n",
            "type": "number",
            "_type": "integer",
            "default": 11311
        },
        "maverick_web::api::server_hostname": {
            "description": "Webserver vhost to use for reverse proxy.\n\n",
            "type": "string",
            "default": "$maverick_web::server_fqdn"
        },
        "maverick_web::api::devmode": {
            "description": "If true, activate -api development mode.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_web::api::debug": {
            "description": "If true, activet -api debug mode.\n\n",
            "type": "boolean",
            "default": false
        },
        "maverick_web::api::replaceconfig": {
            "description": "If true, fully manage the -api config and overwrite with values from parameters set here.\n\n",
            "type": "boolean",
            "default": false
        }
    },
    "additionalProperties": false
}