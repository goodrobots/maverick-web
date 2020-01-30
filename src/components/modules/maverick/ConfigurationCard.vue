<template>
  <v-container
    fluid
    fill-height
  >
    <v-row dense>
      <v-col cols="12">
        <v-card
          class="mx-auto"
          max-width="800"
          height="600"
          dark
          loading="mavgrey"
        >
          <div
            ref="editor"
            style="width: 100%; height: 100%; overflow:hidden;"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
//https://stackoverflow.com/questions/58592128/how-can-i-integrate-monaco-with-vue-js
import * as monaco from 'monaco-editor'

export default {
  name: 'ConfigurationCard',
  data () {
    return {
      code: ''
    }
  },
  mounted() {
    var jsonCode = [
      '{',
      "}"
    ].join('\n')
    var r = Math.random().toString(36).substring(7)
    var modelUri = monaco.Uri.parse("a://b/foo"+r+".json"); // a made up unique URI for our model
    var model = monaco.editor.createModel(jsonCode, "json", modelUri);

    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [{
          uri: "http://myserver/foo-schema.json", // id of the first schema
          fileMatch: [modelUri.toString()], // associate with our model
          schema: {
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
                            "maverick_analysis",
                            "maverick_desktop",
                            "maverick_dev",
                            "maverick_fc",
                            "maverick_gcs",
                            "maverick_hardware",
                            "maverick_intelligence",
                            "maverick_mavlink",
                            "maverick_network",
                            "maverick_ros",
                            "maverick_security",
                            "maverick_telemetry",
                            "maverick_vision",
                            "maverick_web"
                        ],
                        "enumDescriptions": [
                            "Base class\n\nThe Base class sets up the fundamental Maverick environment. It declares the puppet stages and defines the entire bootstrap stage,\n  and calls the other base classes in all stages.",
                            "Maverick_analysis class\n\nThis class controls all other classes in maverick_analysis module.",
                            "Maverick_desktop class\n\nThis class installs/manages the desktop environment.",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            ""
                        ]
                    }
                },
                "base::hostip::additional_entries": {
                    "description": "A hash that can contain additional Host/IP entries to be added to /etc/hosts\n\nBase::Python class\n\nThis class manages /etc/hosts.",
                    "default": "{}"
                },
                "base::locale::default_locale": {
                    "description": "Set the active default locale, in Debian/Ubuntu format.\n\nBase::Locale class\n\nThis class manages the System Locale.  It uses the en_GB (English GB dialect) locale by default, and sets Europe/London as the default timezone.",
                    "type": "string",
                    "default": "\"en_GB.UTF-8\""
                },
                "base::locale::locales": {
                    "description": "Any additional locales to be installed, so they can be also activated.\n\nBase::Locale class\n\nThis class manages the System Locale.  It uses the en_GB (English GB dialect) locale by default, and sets Europe/London as the default timezone.",
                    "default": "[\"en_GB.UTF-8 UTF-8\", \"en_US.UTF-8 UTF-8\"]"
                },
                "base::locale::timezone": {
                    "description": "The system timezone.\n\nBase::Locale class\n\nThis class manages the System Locale.  It uses the en_GB (English GB dialect) locale by default, and sets Europe/London as the default timezone.",
                    "type": "string",
                    "default": "\"Europe/London\""
                },
                "base::locale::language_pack": {
                    "description": "By default this is locales-all, which includes all the OS locales.  This can be set to specific locales but can cause problems.  If space is not a problem, leave as locales-all.\n\nBase::Locale class\n\nThis class manages the System Locale.  It uses the en_GB (English GB dialect) locale by default, and sets Europe/London as the default timezone.",
                    "type": "string",
                    "default": "\"locales-all\""
                },
                "base::maverick::maverick_branch": {
                    "description": "This determines which git branch is used for Maverick software (/srv/maverick/software/maverick)\n\nBase::Maverick class\n\nThis class sets up the basic Maverick environment - mav user, /srv/maverick directory structure, git branch, base containers for status,\n  various scripts and symlinks, and in bootstrap it clones the Maverick software itself (/srv/maverick/software/maverick)",
                    "type": "string",
                    "default": "\"stable\""
                },
                "base::maverick::git_credentials_cache": {
                    "description": "Whether to use credentials cache.  Unless using a shared machine set to true, to stop having to re-enter git credentials every push.\n\nBase::Maverick class\n\nThis class sets up the basic Maverick environment - mav user, /srv/maverick directory structure, git branch, base containers for status,\n  various scripts and symlinks, and in bootstrap it clones the Maverick software itself (/srv/maverick/software/maverick)",
                    "type": "boolean",
                    "default": true
                },
                "base::python::maverick_python": {
                    "description": "Whether to install the custom Maverick Python instance.  This should always be true, unless the OS provides a trusted 3.7 instance.\n\nBase::Python class\n\nThis class installs/manages Python software.\nIt manages the system python to some degree, but it focuses on\n  providing a custom optimised python build installed into /srv/maverick/software/python\nThis is currently the latest point release of Python 3.7",
                    "type": "boolean",
                    "default": true
                },
                "base::python::python_version": {
                    "description": "The custom version of Python to compile and install.\n\nBase::Python class\n\nThis class installs/manages Python software.\nIt manages the system python to some degree, but it focuses on\n  providing a custom optimised python build installed into /srv/maverick/software/python\nThis is currently the latest point release of Python 3.7",
                    "type": "string",
                    "default": "\"v3.7.6\""
                },
                "base::users::mav_password": {
                    "description": "Hashed password for mav user\n\nBase::Users class\n\nThis class manages the Maverick 'mav' user.",
                    "type": "string",
                    "default": "'$6$YuXyoBZR$cR/cNLGZV.Y/nfW6rvK//fjnr84kckI1HM0fhPnJ3MVVlsl7UxaK8vSw.bM4vTlkF4RTbOSAdi36c5d2hJ9Gj1'"
                },
                "base::users::mav_sudopass": {
                    "description": "If mav sudo should ask for password or not\n\nBase::Users class\n\nThis class manages the Maverick 'mav' user.",
                    "type": "boolean",
                    "default": false
                },
                "base::users::root_password": {
                    "description": "Hashed password for root user\n\nBase::Users class\n\nThis class manages the Maverick 'mav' user.",
                    "type": "string",
                    "default": "'$6$MIBUXpXc$AA8j.88LvHFBzvVKofKcHnEqvWdv5Cl5D8.O8aB446Mao2X4UkuJ.1VKSr2VcmsbZB7A5ypmmkO0MWGAZr37N.'"
                },
                "base::users::manage_root_password": {
                    "description": "If root password should be set by $root-password\n\nBase::Users class\n\nThis class manages the Maverick 'mav' user.",
                    "type": "boolean",
                    "default": false
                },
                "maverick_analysis::collect::active": {
                    "description": "If true, set the maverick-collectd service to running and enabled (at boot).\n\nMaverick_analysis::Collect class\n\nThis class installs/manages collectd software (collectd.org), which is used to log system metrics.",
                    "type": "boolean",
                    "default": true
                },
                "maverick_analysis::collect::install_type": {
                    "description": "If 'source', then compile collectd from git source.  Should always be set to source as it installs into custom location (~/software/collectd).\n\nMaverick_analysis::Collect class\n\nThis class installs/manages collectd software (collectd.org), which is used to log system metrics.",
                    "enum": [
                        "source",
                        "binary"
                    ],
                    "default": "\"source\""
                },
                "maverick_analysis::collect::git_source": {
                    "description": "Github repo location to clone source code from.\n\nMaverick_analysis::Collect class\n\nThis class installs/manages collectd software (collectd.org), which is used to log system metrics.",
                    "type": "string",
                    "default": "\"https://github.com/collectd/collectd.git\""
                },
                "maverick_analysis::collect::git_revision": {
                    "description": "Github branch to compile.\n\nMaverick_analysis::Collect class\n\nThis class installs/manages collectd software (collectd.org), which is used to log system metrics.",
                    "type": "string",
                    "default": "\"5.10.0\""
                },
                "maverick_analysis::grafana::active": {
                    "description": "If true, set the maverick-grafana service to running and enabled (at boot).\n\nMaverick_analysis::Grafana class\n\nThis class installs/manages Grafana software (grafana.com), which is used to display system and flight metrics.\nAs Grafana deliberately does not support real customistaion or embedding, it is likely this will be deprecated in the future in favour of custom solution that is more flexible.",
                    "type": "boolean",
                    "default": true
                },
                "maverick_analysis::grafana::webport": {
                    "description": "TCP port number to run the grafana service.  Note this is normally reverse-proxied to the end user so does not need to be open.\n\nMaverick_analysis::Grafana class\n\nThis class installs/manages Grafana software (grafana.com), which is used to display system and flight metrics.\nAs Grafana deliberately does not support real customistaion or embedding, it is likely this will be deprecated in the future in favour of custom solution that is more flexible.",
                    "type": "string",
                    "default": "\"6790\""
                },
                "maverick_analysis::grafana::host": {
                    "description": "Hostname/IP to run the grafana service under.  When reverse-proxied this can be set to localhost.\n\nMaverick_analysis::Grafana class\n\nThis class installs/manages Grafana software (grafana.com), which is used to display system and flight metrics.\nAs Grafana deliberately does not support real customistaion or embedding, it is likely this will be deprecated in the future in favour of custom solution that is more flexible.",
                    "type": "string",
                    "default": "\"127.0.0.1\""
                },
                "maverick_analysis::grafana::rootpath": {
                    "description": "Web root path - normally set to something other than / so it can be reverse-proxied without rewrites.\n\nMaverick_analysis::Grafana class\n\nThis class installs/manages Grafana software (grafana.com), which is used to display system and flight metrics.\nAs Grafana deliberately does not support real customistaion or embedding, it is likely this will be deprecated in the future in favour of custom solution that is more flexible.",
                    "type": "string",
                    "default": "\"/analysis/grafana/\""
                },
                "maverick_analysis::grafana::grafana_version": {
                    "description": "Can be set to a specific version but causes problems with system upgrades.  Easier set to installed.\n\nMaverick_analysis::Grafana class\n\nThis class installs/manages Grafana software (grafana.com), which is used to display system and flight metrics.\nAs Grafana deliberately does not support real customistaion or embedding, it is likely this will be deprecated in the future in favour of custom solution that is more flexible.",
                    "type": "string",
                    "default": "\"installed\""
                },
                "maverick_analysis::grafana::grafana_firewall_rules": {
                    "description": "If grafana service reverse-proxied, set to false as service port does not need to be open.\n\nMaverick_analysis::Grafana class\n\nThis class installs/manages Grafana software (grafana.com), which is used to display system and flight metrics.\nAs Grafana deliberately does not support real customistaion or embedding, it is likely this will be deprecated in the future in favour of custom solution that is more flexible.",
                    "type": "boolean",
                    "default": false
                },
                "maverick_analysis::grafana::mav_password": {
                    "description": "Hashed password for mav user (default is 'wingman')\n\nMaverick_analysis::Grafana class\n\nThis class installs/manages Grafana software (grafana.com), which is used to display system and flight metrics.\nAs Grafana deliberately does not support real customistaion or embedding, it is likely this will be deprecated in the future in favour of custom solution that is more flexible.",
                    "type": "string",
                    "default": "'e35f84e5859dfe5dfe2a9f6ed2086884c3a5e41d206c6e704b48cf45a0dda574ad85b4e9362e8d89eee3eb82e7ef34528ea4'"
                },
                "maverick_analysis::grafana::mav-salt": {
                    "description": "Salt for hashed password for mav user\n\nMaverick_analysis::Grafana class\n\nThis class installs/manages Grafana software (grafana.com), which is used to display system and flight metrics.\nAs Grafana deliberately does not support real customistaion or embedding, it is likely this will be deprecated in the future in favour of custom solution that is more flexible."
                },
                "maverick_analysis::grafana::admin_user": {
                    "description": "Name of the admin user\n\nMaverick_analysis::Grafana class\n\nThis class installs/manages Grafana software (grafana.com), which is used to display system and flight metrics.\nAs Grafana deliberately does not support real customistaion or embedding, it is likely this will be deprecated in the future in favour of custom solution that is more flexible.",
                    "type": "string",
                    "default": "'admin'"
                },
                "maverick_analysis::grafana::admin_hash": {
                    "description": "Hashed password of the admin user (default is 'theneedforspeed')\n\nMaverick_analysis::Grafana class\n\nThis class installs/manages Grafana software (grafana.com), which is used to display system and flight metrics.\nAs Grafana deliberately does not support real customistaion or embedding, it is likely this will be deprecated in the future in favour of custom solution that is more flexible.",
                    "type": "string",
                    "default": "'6eade3d424af57a87cb455d6577a7d92746517db17deda6b73fd40f22850b4491e6513d22763d9891d2a9206e8c61c9da3d6'"
                },
                "maverick_analysis::grafana::admin_salt": {
                    "description": "Salt for hashed password for root user\n\nMaverick_analysis::Grafana class\n\nThis class installs/manages Grafana software (grafana.com), which is used to display system and flight metrics.\nAs Grafana deliberately does not support real customistaion or embedding, it is likely this will be deprecated in the future in favour of custom solution that is more flexible.",
                    "type": "string",
                    "default": "'WwOYa3P4rc'"
                },
                "maverick_analysis::grafana::admin_rand": {
                    "description": "? - TODO\n\nMaverick_analysis::Grafana class\n\nThis class installs/manages Grafana software (grafana.com), which is used to display system and flight metrics.\nAs Grafana deliberately does not support real customistaion or embedding, it is likely this will be deprecated in the future in favour of custom solution that is more flexible.",
                    "type": "string",
                    "default": "'slhNQwWHa7'"
                },
                "maverick_analysis::grafana::admin_password": {
                    "description": "? - TODO\n\nMaverick_analysis::Grafana class\n\nThis class installs/manages Grafana software (grafana.com), which is used to display system and flight metrics.\nAs Grafana deliberately does not support real customistaion or embedding, it is likely this will be deprecated in the future in favour of custom solution that is more flexible.",
                    "type": "string",
                    "default": "'admin'"
                },
                "maverick_analysis::grafana::mav_salt": {
                    "description": "\n\nMaverick_analysis::Grafana class\n\nThis class installs/manages Grafana software (grafana.com), which is used to display system and flight metrics.\nAs Grafana deliberately does not support real customistaion or embedding, it is likely this will be deprecated in the future in favour of custom solution that is more flexible.",
                    "type": "string",
                    "default": "'ry48G1ZHyi'"
                },
                "maverick_analysis::influx::active": {
                    "description": "If true, set the maverick-influxd service to running and enabled (at boot).\n\nMaverick_analysis::Influx class\n\nThis class installs/manages InfluxDB software (www.influxdata.com), which is used to store time series metrics, including system and flight controller data.",
                    "type": "boolean",
                    "default": true
                },
                "maverick_analysis::mavlogd::active": {
                    "description": "If true, set the maverick-mavlogd service to running and enabled (at boot).\n\nMaverick_analysis::Mavlogd class\n\nThis class installs/manages Mavlogd, which is a bespoke script from Maverick that is used to import flight data into influxd.",
                    "type": "boolean",
                    "default": true
                },
                "maverick_analysis::mavlogd::grafana_port": {
                    "description": "The port used to communicate with Grafana.  By default taken from maverick_analysis::grafana::webport and should not be set.\n\nMaverick_analysis::Mavlogd class\n\nThis class installs/manages Mavlogd, which is a bespoke script from Maverick that is used to import flight data into influxd.",
                    "type": "string",
                    "default": "$maverick_analysis::grafana::webport"
                },
                "maverick_analysis::mavlogd::grafana_host": {
                    "description": "The hostname used to communicate with Grafana.  By default taken from maverick_analysis::grafana::host and should not be set.\n\nMaverick_analysis::Mavlogd class\n\nThis class installs/manages Mavlogd, which is a bespoke script from Maverick that is used to import flight data into influxd.",
                    "type": "string",
                    "default": "$maverick_analysis::grafana::host"
                },
                "maverick_analysis::mavlogd::grafana_adminpass": {
                    "description": "The admin password used to communicate with Grafana.  By default taken from maverick_analysis::grafana::admin_password and should not be set.\n\nMaverick_analysis::Mavlogd class\n\nThis class installs/manages Mavlogd, which is a bespoke script from Maverick that is used to import flight data into influxd.",
                    "type": "string",
                    "default": "$maverick_analysis::grafana::admin_password"
                },
                "maverick_dev::apsitl_dev::sitl_active": {
                    "description": "If true, the SITL service will be activated and enabled at boot time\n\n",
                    "default": "true"
                },
                "maverick_dev::apsitl_dev::vehicle_type": {
                    "description": "Type of Ardupilot vehicle to use, eg. copter, plane, sub etc\n\n",
                    "default": "\"copter\""
                },
                "maverick_dev::apsitl_dev::mavlink_proxy": {
                    "description": "Type of mavlink proxy to use, eg. mavlink-router, mavproxy or cmavnode\n\n",
                    "default": "\"mavlink-router\""
                },
                "maverick_dev::apsitl_dev::mavlink_active": {
                    "description": "If true, the mavlink proxy will be activated and enabled at boot time\n\n",
                    "default": "true"
                },
                "maverick_dev::apsitl_dev::mavlink_logging": {
                    "description": "If true and supported by the mavlink proxy software, then mavlink data will be logged to file\n\n",
                    "default": "false"
                },
                "maverick_dev::apsitl_dev::mavlink_serialout": {
                    "description": "If set, proxy mavlink data out on this serial port\n\n",
                    "default": "undef"
                },
                "maverick_dev::apsitl_dev::mavlink_outbaud": {
                    "description": "Baud rate of mavlink_serialout port\n\n",
                    "default": "115200"
                },
                "maverick_dev::apsitl_dev::mavlink_outflow": {
                    "description": "If mavlink_serialout port should use hardware flow control\n\n",
                    "default": "false"
                },
                "maverick_dev::apsitl_dev::ros_instance": {
                    "description": "If true, create a separate ROS instance for this SITL instance\n\n",
                    "default": "true"
                },
                "maverick_dev::apsitl_dev::rosmaster_active": {
                    "description": "If true, set this separate ROS instance active and enabled at boot time\n\n",
                    "default": "true"
                },
                "maverick_dev::apsitl_dev::mavros_active": {
                    "description": "If true, the separate MAVROS instance will be activated and enabled at boot time\n\n",
                    "default": "true"
                },
                "maverick_dev::apsitl_dev::mavros_startup_delay": {
                    "description": "This delay causes Mavros to wait before starting, to give ROS and SITL time to boot fully first.  Should be increased on slower boards/environments.\n\n",
                    "default": "10"
                },
                "maverick_dev::apsitl_dev::api_instance": {
                    "description": "If true, create a separate maverick-api instance\n\n",
                    "default": "true"
                },
                "maverick_dev::apsitl_dev::api_active": {
                    "description": "If true, this maverick-api instance will be activated and enabled at boot time\n\n",
                    "default": "true"
                },
                "maverick_dev::apsitl_dev::api_debug": {
                    "description": "If true, turn on the -api debug mode\n\n",
                    "default": "false"
                },
                "maverick_dev::apsitl_dev::api_devmode": {
                    "description": "If true, turn on the -api dev mode\n\n",
                    "default": "false"
                },
                "maverick_dev::ardupilot::ardupilot_source": {
                    "description": "Git repo to clone, that is used to compile ardupilot (in ~/code/ardupilot).  Change this if you want to use a forked repo.\n\n",
                    "type": "string",
                    "default": "\"https://github.com/ArduPilot/ardupilot.git\""
                },
                "maverick_dev::ardupilot::ardupilot_setupstream": {
                    "description": "If true, set the upstream repo.  Useful if using a forked repo for upstream updates and PRs.\n\n",
                    "type": "boolean",
                    "default": true
                },
                "maverick_dev::ardupilot::ardupilot_upstream": {
                    "description": "Upstream Git repo.  Should usually not be changed.\n\n",
                    "type": "string",
                    "default": "\"https://github.com/ArduPilot/ardupilot.git\""
                },
                "maverick_dev::ardupilot::ardupilot_branch": {
                    "description": "Git branch to use when compiling Arudpilot.\n\n",
                    "type": "string",
                    "default": "\"master\""
                },
                "maverick_dev::ardupilot::ardupilot_buildsystem": {
                    "description": "'waf' is the new buildsystem, 'make' is the old buildsystem.  Should pretty much always be 'waf' these days.\n\n",
                    "enum": [
                        "waf",
                        "make"
                    ],
                    "default": "\"waf\""
                },
                "maverick_dev::ardupilot::ardupilot_all_vehicles": {
                    "description": "The list of all vehicles to pre-compile for the SITL environment.  This makes all of these vehicle's firmware available to SITL instances.\n\n",
                    "default": "{\"copter\" => \"arducopter\", \"plane\" => \"arduplane\", \"rover\" => \"ardurover\", \"sub\" => \"ardusub\", \"heli\" => \"arducopter-heli\", \"antennatracker\" => \"antennatracker\"}"
                },
                "maverick_dev::ardupilot::ardupilot_vehicle": {
                    "description": "Which vehicle to build for the old 'make' buildsystem.\n\n",
                    "type": "string",
                    "default": "\"copter\""
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
                    "default": true
                },
                "maverick_dev::ardupilot::jsbsim_source": {
                    "description": "Git repo to use for jsbsim\n\n",
                    "type": "string",
                    "default": "\"http://github.com/JSBSim-Team/jsbsim.git\""
                },
                "maverick_dev::px4::px4_source": {
                    "description": "Git repo to use to compile PX4 firmware\n\n",
                    "type": "string",
                    "default": "\"https://github.com/PX4/Firmware.git\""
                },
                "maverick_dev::px4::px4_setupstream": {
                    "description": "If true, set the upstream repo.  Useful if using a forked repo for upstream updates and PRs.\n\n",
                    "type": "boolean",
                    "default": true
                },
                "maverick_dev::px4::px4_upstream": {
                    "description": "Upstream Git repo.  Should usually not be changed.\n\n",
                    "type": "string",
                    "default": "\"https://github.com/PX4/Firmware.git\""
                },
                "maverick_dev::px4::px4_branch": {
                    "description": "Git branch to use when compiling PX4.\n\n",
                    "type": "string",
                    "default": "\"v1.10.0\""
                },
                "maverick_dev::px4::sitl": {
                    "description": "If true, setup the PX4 SITL environment\n\n",
                    "type": "boolean",
                    "default": false
                },
                "maverick_dev::px4::sitl_active": {
                    "description": "\n\n",
                    "type": "boolean",
                    "default": true
                },
                "maverick_dev::px4::cross_compile": {
                    "description": "\n\n",
                    "type": "boolean",
                    "default": true
                },
                "maverick_dev::px4::mavlink_proxy": {
                    "description": "\n\n",
                    "type": "string",
                    "default": "\"mavlink-router\""
                },
                "maverick_dev::px4::mavlink_logging": {
                    "description": "\n\n",
                    "type": "boolean",
                    "default": false
                },
                "maverick_dev::px4::mavlink_active": {
                    "description": "\n\n",
                    "type": "boolean",
                    "default": true
                },
                "maverick_dev::px4::mavlink_startingtcp": {
                    "description": "\n\n",
                    "type": "number",
                    "default": 5790
                },
                "maverick_dev::px4::mavlink_tcpports": {
                    "description": "\n\n",
                    "type": "number",
                    "default": 3
                },
                "maverick_dev::px4::mavlink_startingudp": {
                    "description": "\n\n",
                    "type": "number",
                    "default": 14590
                },
                "maverick_dev::px4::mavlink_udpports": {
                    "description": "\n\n",
                    "type": "number",
                    "default": 3
                },
                "maverick_dev::px4::mavlink_udpinports": {
                    "description": "\n\n",
                    "type": "number",
                    "default": 3
                },
                "maverick_dev::px4::mavlink_serialout": {
                    "description": "\n\n",
                    "type": "string",
                    "default": "undef"
                },
                "maverick_dev::px4::mavlink_outbaud": {
                    "description": "\n\n",
                    "type": "number",
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
                    "default": true
                },
                "maverick_dev::px4::ros_instance": {
                    "description": "\n\n",
                    "type": "boolean",
                    "default": true
                },
                "maverick_dev::px4::rosmaster_active": {
                    "description": "\n\n",
                    "type": "boolean",
                    "default": true
                },
                "maverick_dev::px4::rosmaster_port": {
                    "description": "\n\n",
                    "type": "number",
                    "default": 11315
                },
                "maverick_dev::px4::mavros_active": {
                    "description": "\n\n",
                    "type": "boolean",
                    "default": true
                },
                "maverick_dev::px4::mavros_startup_delay": {
                    "description": "\n\n",
                    "type": "number",
                    "default": 10
                },
                "maverick_dev::px4::mavlink_port": {
                    "description": "\n\n",
                    "type": "number",
                    "default": 5790
                },
                "maverick_dev::px4::api_instance": {
                    "description": "\n\n",
                    "type": "boolean",
                    "default": true
                },
                "maverick_dev::px4::api_active": {
                    "description": "\n\n",
                    "type": "boolean",
                    "default": true
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
                    "default": true
                },
                "maverick_dev::px4::status_priority": {
                    "description": "\n\n",
                    "type": "string",
                    "default": "\"152\""
                },
                "maverick_dev::px4::status_entries": {
                    "description": "\n\n",
                    "type": "boolean",
                    "default": true
                },
                "maverick_hardware::beagle::included_cloud9": {
                    "description": "\n\n",
                    "default": "false"
                },
                "maverick_hardware::intel::mraa": {
                    "description": "\n\n",
                    "default": "true"
                },
                "maverick_hardware::intel::intel_graphics": {
                    "description": "\n\n",
                    "default": "true"
                },
                "maverick_hardware::intel::opencl": {
                    "description": "\n\n",
                    "default": "true"
                },
                "maverick_hardware::joule::remove_more_packages": {
                    "description": "\n\n",
                    "default": "true"
                },
                "maverick_hardware::joule::ipu4_blacklist": {
                    "description": "\n\n",
                    "default": "true"
                },
                "maverick_hardware::joule::serialconsole": {
                    "description": "\n\n",
                    "default": "false"
                },
                "maverick_hardware::joule::install_caspa": {
                    "description": "\n\n",
                    "default": "true"
                },
                "maverick_hardware::odroid::governor_atboot": {
                    "description": "\n\n",
                    "default": "\"performance\""
                },
                "maverick_hardware::odroid::kernel4x": {
                    "description": "\n\n",
                    "default": "false"
                },
                "maverick_hardware::odroid::remove_more_packages": {
                    "description": "\n\n",
                    "default": "true"
                },
                "maverick_hardware::peripheral::flirone::active": {
                    "description": "\n\n",
                    "default": "false"
                },
                "maverick_hardware::peripheral::picam::docs": {
                    "description": "\n\n",
                    "default": "false"
                },
                "maverick_hardware::peripheral::realsense::sdk1": {
                    "description": "\n\n",
                    "default": "false"
                },
                "maverick_hardware::peripheral::realsense::sdk2": {
                    "description": "\n\n",
                    "default": "true"
                },
                "maverick_hardware::raspberry::expand_root": {
                    "description": "\n\n",
                    "default": "true"
                },
                "maverick_hardware::raspberry::gpumem": {
                    "description": "\n\n",
                    "default": "128"
                },
                "maverick_hardware::raspberry::overclock": {
                    "description": "\n\n",
                    "default": "\"None\""
                },
                "maverick_hardware::raspberry::devicetree": {
                    "description": "\n\n",
                    "default": "true"
                },
                "maverick_hardware::raspberry::spi": {
                    "description": "\n\n",
                    "default": "true"
                },
                "maverick_hardware::raspberry::i2c": {
                    "description": "\n\n",
                    "default": "true"
                },
                "maverick_hardware::raspberry::serialconsole": {
                    "description": "\n\n",
                    "default": "false"
                },
                "maverick_hardware::raspberry::serialoverride": {
                    "description": "\n\n",
                    "default": "true"
                },
                "maverick_hardware::raspberry::camera": {
                    "description": "\n\n",
                    "default": "true"
                },
                "maverick_hardware::raspberry::xgl": {
                    "description": "\n\n",
                    "default": "false"
                },
                "maverick_hardware::raspberry::v4l2": {
                    "description": "\n\n",
                    "default": "true"
                },
                "maverick_hardware::raspberry::overpower_usb": {
                    "description": "\n\n",
                    "default": "false"
                },
                "maverick_hardware::raspberry::auto_login": {
                    "description": "\n\n",
                    "default": "false"
                },
                "maverick_hardware::raspberry::desktop_autologin_user": {
                    "description": "\n\n",
                    "default": "\"mav\""
                },
                "maverick_hardware::raspberry::manage_pi_password": {
                    "description": "\n\n",
                    "default": "false"
                },
                "maverick_hardware::raspberry::pi_password": {
                    "description": "\n\n",
                    "default": "'$6$YuXyoBZR$cR/cNLGZV.Y/nfW6rvK//fjnr84kckI1HM0fhPnJ3MVVlsl7UxaK8vSw.bM4vTlkF4RTbOSAdi36c5d2hJ9Gj1'"
                },
                "maverick_hardware::raspberry::remove_extrapackages": {
                    "description": "\n\n",
                    "default": "true"
                },
                "maverick_hardware::raspberry::remove_more_extrapackages": {
                    "description": "\n\n",
                    "default": "false"
                },
                "maverick_hardware::raspberry::remove_glpackages": {
                    "description": "\n\n",
                    "default": "false"
                },
                "maverick_hardware::raspberry::swapsize": {
                    "description": "\n\n",
                    "default": "1024"
                },
                "maverick_hardware::raspberry::console::width": {
                    "description": "\n\n",
                    "default": "800"
                },
                "maverick_hardware::raspberry::console::height": {
                    "description": "\n\n",
                    "default": "600"
                },
                "maverick_hardware::tegra::jtx1inst": {
                    "description": "\n\n",
                    "default": "false"
                },
                "maverick_hardware::up::swapsize": {
                    "description": "\n\n",
                    "default": "1000"
                },
                "maverick_intelligence::pytorch::source": {
                    "description": "\n\n",
                    "default": "\"https://github.com/pytorch/pytorch.git\""
                },
                "maverick_intelligence::pytorch::source_version": {
                    "description": "\n\n",
                    "default": "\"1.4\""
                },
                "maverick_intelligence::tensorflow::source": {
                    "description": "\n\n",
                    "default": "\"https://github.com/tensorflow/tensorflow.git\""
                },
                "maverick_intelligence::tensorflow::version": {
                    "description": "\n\n",
                    "default": "\"2\""
                },
                "maverick_intelligence::tensorflow::source_version": {
                    "description": "\n\n",
                    "default": "\"v2.1.0\""
                },
                "maverick_intelligence::tensorflow::bazel_version": {
                    "description": "\n\n",
                    "default": "\"0.13.0\""
                },
                "maverick_intelligence::tensorflow::arch": {
                    "description": "\n\n",
                    "default": "undef"
                },
                "maverick_intelligence::tensorflow::active": {
                    "description": "\n\n",
                    "default": "false"
                },
                "maverick_intelligence::tensorflow::install_type": {
                    "description": "\n\n",
                    "default": "undef"
                },
                "maverick_mavlink::dronekit::dronekit_la_install": {
                    "description": "\n\n",
                    "default": "false"
                },
                "maverick_mavlink::dronekit::dronekit_la_source": {
                    "description": "\n\n",
                    "default": "\"https://github.com/dronekit/dronekit-la.git\""
                },
                "maverick_network::avahi::explicit_naming": {
                    "description": "\n\n",
                    "default": "false"
                },
                "maverick_network::dnsclient::servers": {
                    "description": "\n\nNote this shouldn't be used normally on debian/ubuntu if resolvconf is used.\nInstead, add 'nameservers' parameter to interface definitions",
                    "default": "['127.0.0.1', '8.8.8.8', '8.8.4.4', '8.26.56.26', '8.20.247.20', '209.244.0.3', '209.244.0.4']"
                },
                "maverick_network::dnsclient::domain": {
                    "description": "\n\nNote this shouldn't be used normally on debian/ubuntu if resolvconf is used.\nInstead, add 'nameservers' parameter to interface definitions",
                    "default": "\"home\""
                },
                "maverick_network::dnsclient::search_domains": {
                    "description": "\n\nNote this shouldn't be used normally on debian/ubuntu if resolvconf is used.\nInstead, add 'nameservers' parameter to interface definitions",
                    "default": "[\"home\", \"local\"]"
                },
                "maverick_network::timesync::servers": {
                    "description": "\n\n",
                    "default": "['0.pool.ntp.org', '1.pool.ntp.org', '2.pool.ntp.org', '3.pool.ntp.org']"
                },
                "maverick_network::timesync::active": {
                    "description": "\n\n",
                    "default": "undef"
                },
                "maverick_network::timesync::type": {
                    "description": "\n\n",
                    "default": "undef"
                },
                "maverick_network::wifibroadcast::type": {
                    "description": "\n\n",
                    "default": "\"svpcom\""
                },
                "maverick_network::wifibroadcast::tx_active": {
                    "description": "\n\n",
                    "default": "false"
                },
                "maverick_network::wifibroadcast::rx_active": {
                    "description": "\n\n",
                    "default": "false"
                },
                "maverick_network::zerotier::libzt": {
                    "description": "\n\n",
                    "default": "false"
                },
                "maverick_network::zerotier::active": {
                    "description": "\n\n",
                    "default": "false"
                },
                "maverick_network::zerotier::join_network": {
                    "description": "\n\n",
                    "default": "true"
                },
                "maverick_network::zerotier::network_id": {
                    "description": "\n\n",
                    "default": "\"8056c2e21c000001\""
                },
                "maverick_puppet::client::puppetlabs": {
                    "description": "\n\n",
                    "default": "false"
                },
                "maverick_ros::ros1::installtype": {
                    "description": "\n\n",
                    "default": "\"auto\""
                },
                "maverick_ros::ros1::distribution": {
                    "description": "\n\n",
                    "default": "\"auto\""
                },
                "maverick_ros::ros1::buildtype": {
                    "description": "\n\n",
                    "default": "\"ros_comm\""
                },
                "maverick_ros::ros1::builddir": {
                    "description": "\n\n",
                    "default": "\"/srv/maverick/var/build/ros_catkin_ws\""
                },
                "maverick_ros::ros1::installdir": {
                    "description": "\n\n",
                    "default": "\"/srv/maverick/software/ros\""
                },
                "maverick_ros::ros1::module_mavros": {
                    "description": "\n\n",
                    "default": "true"
                },
                "maverick_ros::ros1::module_realsense": {
                    "description": "\n\n",
                    "default": "false"
                },
                "maverick_ros::ros1::module_opencv": {
                    "description": "\n\n",
                    "default": "false"
                },
                "maverick_ros::ros2::installtype": {
                    "description": "\n\n",
                    "default": "\"auto\""
                },
                "maverick_ros::ros2::distribution": {
                    "description": "\n\n",
                    "default": "\"auto\""
                },
                "maverick_ros::ros2::builddir": {
                    "description": "\n\n",
                    "default": "\"/srv/maverick/var/build/ros2\""
                },
                "maverick_ros::ros2::installdir": {
                    "description": "\n\n",
                    "default": "\"/srv/maverick/software/ros2\""
                },
                "maverick_ros::ros2::metapackage": {
                    "description": "\n\n",
                    "default": "\"ros-base\""
                },
                "maverick_ros::ros2::ros1_bridge": {
                    "description": "\n\n",
                    "default": "true"
                },
                "maverick_security::fail2ban::alertemail": {
                    "description": "\n\n",
                    "default": "\"admin@example.com\""
                },
                "maverick_security::firewall::cronupdate": {
                    "description": "\n\n",
                    "default": "false"
                },
                "maverick_security::ldap_client::base": {
                    "description": "\n\n",
                    "default": "\"dc=maverick,dc=one\""
                },
                "maverick_security::ldap_server::server_type": {
                    "description": "\n\n",
                    "default": "\"openldap\""
                },
                "maverick_security::ldap_server::base": {
                    "description": "\n\n",
                    "default": "\"dc=maverick,dc=one\""
                },
                "maverick_security::ldap_server::roothash": {
                    "description": "\n\n",
                    "default": "\"{SHA512}8dba3660197daf7642b9eaeaf77ef817ae9471f3b3d672bfb4fd94100dd5801cd9c990dd64938822e17643b8810cd31ee0ae87b9370884a7d880cfbc5307a573\""
                },
                "maverick_security::ldap_server::cert_country": {
                    "description": "\n\n",
                    "default": "\"US\""
                },
                "maverick_security::ldap_server::cert_state": {
                    "description": "\n\n",
                    "default": "\"State of Being\""
                },
                "maverick_security::ldap_server::cert_locality": {
                    "description": "\n\n",
                    "default": "\"Moving frequently\""
                },
                "maverick_security::ldap_server::cert_orgname": {
                    "description": "\n\n",
                    "default": "\"Maverick\""
                },
                "maverick_security::ldap_server::cert_orgunit": {
                    "description": "\n\n",
                    "default": "\"Robots\""
                },
                "maverick_security::ldap_server::cert_cname": {
                    "description": "\n\n",
                    "default": "\"slapd\""
                },
                "maverick_security::ldap_server::server_fqdn": {
                    "description": "\n\n",
                    "default": "$::fqdn"
                },
                "maverick_security::scanners::rkhunter": {
                    "description": "\n\n",
                    "default": "false"
                },
                "maverick_security::scanners::clamav": {
                    "description": "\n\n",
                    "default": "false"
                },
                "maverick_security::ssl::create_ca": {
                    "description": "\n\n",
                    "default": "true"
                },
                "maverick_security::ssl::ca_passphrase": {
                    "description": "\n\n",
                    "default": "\"iceman\""
                },
                "maverick_security::ssl::ca_country": {
                    "description": "\n\n",
                    "default": "\"US\""
                },
                "maverick_security::ssl::ca_state": {
                    "description": "\n\n",
                    "default": "\"State of Being\""
                },
                "maverick_security::ssl::ca_locality": {
                    "description": "\n\n",
                    "default": "\"Moving frequently\""
                },
                "maverick_security::ssl::ca_orgname": {
                    "description": "\n\n",
                    "default": "\"Maverick CA\""
                },
                "maverick_security::ssl::ca_orgunit": {
                    "description": "\n\n",
                    "default": "\"Security\""
                },
                "maverick_security::ssl::ca_cname": {
                    "description": "\n\n",
                    "default": "\"MaverickCA ${::hostname}\""
                },
                "maverick_telemetry::teensy::teensy_loader_cli_revision": {
                    "description": "\n\n",
                    "default": "\"master\""
                },
                "maverick_telemetry::teensy::teensy_hwversion": {
                    "description": "\n\n",
                    "default": "\"mkl26z64\""
                },
                "maverick_vision::aruco::aruco_gitsource": {
                    "description": "\n\n",
                    "default": "\"https://github.com/fnoop/aruco.git\""
                },
                "maverick_vision::aruco::aruco_gitbranch": {
                    "description": "\n\n",
                    "default": "\"master\""
                },
                "maverick_vision::camera_manager::camera_manager_source": {
                    "description": "\n\n",
                    "default": "\"https://github.com/Dronecode/camera-manager.git\""
                },
                "maverick_vision::camera_manager::rtsp_port": {
                    "description": "\n\n",
                    "default": "8554"
                },
                "maverick_vision::camera_manager::active": {
                    "description": "\n\n",
                    "default": "false"
                },
                "maverick_vision::collision_avoidance::source": {
                    "description": "\n\n",
                    "default": "\"https://github.com/intel/collision-avoidance-library.git\""
                },
                "maverick_vision::collision_avoidance::revision": {
                    "description": "\n\n",
                    "default": "\"master\""
                },
                "maverick_vision::collision_avoidance::active": {
                    "description": "\n\n",
                    "default": "false"
                },
                "maverick_vision::gstreamer::gstreamer_installtype": {
                    "description": "\n\n",
                    "default": "\"source\""
                },
                "maverick_vision::gstreamer::gstreamer_version": {
                    "description": "\n\n",
                    "default": "\"1.16.2\""
                },
                "maverick_vision::gstreamer::libx264": {
                    "description": "\n\n",
                    "default": "\"installed\""
                },
                "maverick_vision::opencv::contrib": {
                    "description": "\n\n",
                    "default": "true"
                },
                "maverick_vision::opencv::opencv_version": {
                    "description": "\n\n",
                    "default": "\"4.2.0\""
                },
                "maverick_vision::opencv::release": {
                    "description": "\n\n",
                    "default": "\"Release\""
                },
                "maverick_vision::opencv::precompile_headers": {
                    "description": "\n\n",
                    "default": "false"
                },
                "maverick_vision::opencv::armv7l_optimize": {
                    "description": "\n\n",
                    "default": "false"
                },
                "maverick_vision::opencv::opencv_dldt_version": {
                    "description": "\n\n",
                    "default": "\"2019\""
                },
                "maverick_vision::opencv::openvino": {
                    "description": "\n\n",
                    "default": "false"
                },
                "maverick_vision::orb_slam2::ros_build": {
                    "description": "\n\n",
                    "default": "false"
                },
                "maverick_vision::rtabmap::source": {
                    "description": "\n\n",
                    "default": "\"https://github.com/introlab/rtabmap.git\""
                },
                "maverick_vision::rtabmap::revision": {
                    "description": "\n\n",
                    "default": "\"master\""
                },
                "maverick_vision::vision_landing::active": {
                    "description": "\n\n",
                    "default": "false"
                },
                "maverick_vision::vision_landing::vision_landing_source": {
                    "description": "\n\n",
                    "default": "\"https://github.com/goodrobots/vision_landing.git\""
                },
                "maverick_vision::vision_landing::vision_landing_revision": {
                    "description": "\n\n",
                    "default": "\"master\""
                },
                "maverick_vision::vision_seek::active": {
                    "description": "\n\n",
                    "default": "false"
                },
                "maverick_vision::vision_seek::libseek_thermal": {
                    "description": "\n\n",
                    "default": "true"
                },
                "maverick_vision::vision_seek::libseek_thermal_source": {
                    "description": "\n\n",
                    "default": "\"https://github.com/fnoop/libseek-thermal.git\""
                },
                "maverick_vision::vision_seek::libseek_thermal_revision": {
                    "description": "\n\n",
                    "default": "\"master\""
                },
                "maverick_vision::visiond::active": {
                    "description": "\n\n",
                    "default": "true"
                },
                "maverick_vision::visiond::rtsp_port": {
                    "description": "\n\n",
                    "default": "5600"
                },
                "maverick_vision::visiond::webvision_active": {
                    "description": "\n\n",
                    "default": "true"
                },
                "maverick_vision::visionlibs::tbb": {
                    "description": "\n\n",
                    "default": "true"
                },
                "maverick_vision::visionlibs::tbb_version": {
                    "description": "\n\n",
                    "default": "\"v2020.0\""
                },
                "maverick_vision::visionlibs::openblas": {
                    "description": "\n\n",
                    "default": "true"
                },
                "maverick_vision::visionlibs::openblas_version": {
                    "description": "\n\n",
                    "default": "\"v0.3.7\""
                },
                "maverick_web::apache::port": {
                    "description": "\n\n"
                },
                "maverick_web::apache::ssl_port": {
                    "description": "\n\n"
                },
                "maverick_web::apache::server_hostname": {
                    "description": "\n\n",
                    "default": "$maverick_web::server_fqdn"
                },
                "maverick_web::cloud9::cloud9_active": {
                    "description": "\n\n",
                    "default": "false"
                },
                "maverick_web::cloud9::webport": {
                    "description": "\n\n",
                    "default": "\"6789\""
                },
                "maverick_web::cloud9::basepath": {
                    "description": "\n\n",
                    "default": "\"/srv/maverick\""
                },
                "maverick_web::cloud9::cloud9_password": {
                    "description": "\n\n",
                    "default": "\"wingman\""
                },
                "maverick_web::codeserver::active": {
                    "description": "\n\n",
                    "default": "true"
                },
                "maverick_web::codeserver::webport": {
                    "description": "\n\n",
                    "default": "\"6789\""
                },
                "maverick_web::codeserver::basepath": {
                    "description": "\n\n",
                    "default": "\"/srv/maverick\""
                },
                "maverick_web::codeserver::password": {
                    "description": "\n\n",
                    "default": "\"wingman\""
                },
                "maverick_web::codeserver::replace_password": {
                    "description": "\n\n",
                    "default": "false"
                },
                "maverick_web::codeserver::vscode_version": {
                    "description": "\n\n",
                    "default": "\"1.41.1\""
                },
                "maverick_web::codeserver::build_type": {
                    "description": "\n\n",
                    "default": "\"production\""
                },
                "maverick_web::maverick_docs::server_hostname": {
                    "description": "\n\n",
                    "default": "$maverick_web::server_fqdn"
                },
                "maverick_web::maverick_docs::ardupilot_docs": {
                    "description": "\n\n",
                    "default": "true"
                },
                "maverick_web::maverick_docs::px4_docs": {
                    "description": "\n\n",
                    "default": "true"
                },
                "maverick_web::maverick_web::webport": {
                    "description": "\n\n",
                    "default": "6794"
                },
                "maverick_web::maverick_web::active": {
                    "description": "\n\n",
                    "default": "false"
                },
                "maverick_web::maverick_web::webpath_dev": {
                    "description": "\n\n",
                    "default": "'/dev/maverick'"
                },
                "maverick_web::maverick_web::webpath_prod": {
                    "description": "\n\n",
                    "default": "'/web/maverick'"
                },
                "maverick_web::maverick_web::server_hostname": {
                    "description": "\n\n",
                    "default": "$maverick_web::server_fqdn"
                },
                "maverick_web::maverick_web::auth_message": {
                    "description": "\n\n",
                    "default": "undef"
                },
                "maverick_web::maverick_web::auth_file": {
                    "description": "\n\n",
                    "default": "undef"
                },
                "maverick_web::nginx::active": {
                    "description": "\n\n",
                    "default": "true"
                },
                "maverick_web::nginx::port": {
                    "description": "\n\n"
                },
                "maverick_web::nginx::ssl_port": {
                    "description": "\n\n"
                },
                "maverick_web::nginx::server_hostname": {
                    "description": "\n\n",
                    "default": "$maverick_web::server_fqdn"
                },
                "maverick_web::nginx::downloads": {
                    "description": "\n\n",
                    "default": "false"
                },
                "maverick_web::nginx::downloads_dir": {
                    "description": "\n\n",
                    "default": "\"/var/www/html/maverick/downloads\""
                },
                "maverick_web::nginx::downloads_location": {
                    "description": "\n\n",
                    "default": "\"/maverick/downloads\""
                },
                "maverick_web::nginx::www_root": {
                    "description": "\n\n",
                    "default": "'/srv/maverick/software/maverick-fcs/public'"
                },
                "maverick_web::ssl::cert_country": {
                    "description": "\n\n",
                    "default": "\"US\""
                },
                "maverick_web::ssl::cert_state": {
                    "description": "\n\n",
                    "default": "\"State of Being\""
                },
                "maverick_web::ssl::cert_locality": {
                    "description": "\n\n",
                    "default": "\"Moving frequently\""
                },
                "maverick_web::ssl::cert_orgname": {
                    "description": "\n\n",
                    "default": "\"Maverick\""
                },
                "maverick_web::ssl::cert_orgunit": {
                    "description": "\n\n",
                    "default": "\"Robots\""
                },
                "maverick_web::ssl::cert_cname": {
                    "description": "\n\n",
                    "default": "$maverick_web::server_fqdn"
                },
                "maverick_web::theia::active": {
                    "description": "\n\n",
                    "default": "true"
                },
                "maverick_web::theia::webport": {
                    "description": "\n\n",
                    "default": "\"6789\""
                },
                "maverick_web::theia::basepath": {
                    "description": "\n\n",
                    "default": "\"/srv/maverick\""
                },
                "maverick_web::theia::password": {
                    "description": "\n\n",
                    "default": "\"wingman\""
                }
            },
            "additionalProperties": false
        }
      }]
    })

    const el = this.$refs.editor;
    this.editor = monaco.editor.create(el, {
      // theme: 'vs-dark',
      suggestOnTriggerCharacters: true,
      language: 'json',
      model: model,
      automaticLayout: true,
      scrollBeyondLastLine: false,
      allowComments: false
    })
  },
  destroyed() {
    this.editor.dispose()
  }
}

</script>