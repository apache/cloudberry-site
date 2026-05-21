---
title: Example Ansible Playbook
---

# Example Ansible Playbook

A sample Ansible playbook to install an Apache Cloudberry software release onto the hosts that will comprise an Apache Cloudberry system.

This Ansible playbook shows how tasks described in [Installing the Apache Cloudberry Software](./install_cloudberry.md) might be automated using [Ansible](https://docs.ansible.com).

:::important
This playbook is provided as an *example only* to illustrate how Apache Cloudberry cluster configuration and software installation tasks can be automated using provisioning tools such as Ansible, Chef, or Puppet. The Apache Cloudberry community does not provide support for Ansible or for the playbook presented in this example.
:::

The example playbook is designed for use with RHEL/Rocky Linux. It creates the `gpadmin` user, installs the Apache Cloudberry software release, sets the owner and group of the installed software to `gpadmin`, and sets the PAM security limits for the `gpadmin` user.

You can revise the script to work with your operating system platform and to perform additional host configuration tasks.

Following are steps to use this Ansible playbook.

1. Install Ansible on the control node using your package manager. See the [Ansible documentation](https://docs.ansible.com) for help with installation.

2. Set up passwordless SSH from the control node to all hosts that will be a part of the Apache Cloudberry cluster. You can use the `ssh-copy-id` command to install your public SSH key on each host in the cluster. Alternatively, your provisioning software may provide more convenient ways to securely install public keys on multiple hosts.

3. Create an Ansible inventory by creating a file called `hosts` with a list of the hosts that will comprise your Apache Cloudberry cluster. For example:

    ```
    cdw
    scdw
    sdw1
    sdw2
    sdw3
    ```

    This file can be edited and used with the Apache Cloudberry `gpssh-exkeys` and `gpinitsystem` utilities later on.

4. Copy the playbook code below to a file `ansible-playbook.yml` on your Ansible control node.

5. Edit the playbook variables at the top of the playbook, such as the `gpadmin` administrative user and password to create, and the version of Apache Cloudberry you are installing.

6. Run the playbook, passing the package to be installed to the `package_path` parameter.

    ```bash
    ansible-playbook ansible-playbook.yml -i hosts -e package_path=./apache-cloudberry-db-incubating-2.1.0.el8.x86_64.rpm
    ```

## Ansible Playbook - Apache Cloudberry Installation for RHEL/Rocky Linux

```yaml
---

- hosts: all
  vars:
    - version: "2.1.0"
    - cloudberry_admin_user: "gpadmin"
    - cloudberry_admin_password: "changeme"
    # - package_path: passed via the command line with: -e package_path=./apache-cloudberry-db-incubating-2.1.0.el8.x86_64.rpm
  remote_user: root
  become: yes
  become_method: sudo
  connection: ssh
  gather_facts: yes
  tasks:
    - name: create cloudberry admin user
      user:
        name: "{{ cloudberry_admin_user }}"
        password: "{{ cloudberry_admin_password | password_hash('sha512', 'DvkPtCtNH+UdbePZfm9muQ9pU') }}"
    - name: copy package to host
      copy:
        src: "{{ package_path }}"
        dest: /tmp
    - name: install package
      yum:
        name: "/tmp/{{ package_path | basename }}"
        state: present
    - name: cleanup package file from host
      file:
        path: "/tmp/{{ package_path | basename }}"
        state: absent
    - name: find install directory
      find:
        paths: /usr/local
        patterns: 'cloudberry*'
        file_type: directory
      register: installed_dir
    - name: change install directory ownership
      file:
        path: '{{ item.path }}'
        owner: "{{ cloudberry_admin_user }}"
        group: "{{ cloudberry_admin_user }}"
        recurse: yes
      with_items: "{{ installed_dir.files }}"
    - name: update pam_limits
      pam_limits:
        domain: "{{ cloudberry_admin_user }}"
        limit_type: '-'
        limit_item: "{{ item.key }}"
        value: "{{ item.value }}"
      with_dict:
        nofile: 524288
        nproc: 131072
    - name: find installed cloudberry version
      shell: . /usr/local/cloudberry-db/cloudberry-env.sh && /usr/local/cloudberry-db/bin/postgres --gp-version
      register: postgres_gp_version
    - name: fail if the correct cloudberry version is not installed
      fail:
        msg: "Expected cloudberry version {{ version }}, but found '{{ postgres_gp_version.stdout }}'"
      when: "version is not defined or version not in postgres_gp_version.stdout"
```

When the playbook has run successfully, you can proceed with [Creating the Data Storage Areas](./create_data_dirs.md) and [Initializing an Apache Cloudberry System](./init_cloudberry.md).

