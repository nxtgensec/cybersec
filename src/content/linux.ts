export type LinuxCommand = {
  cmd: string;
  category: string;
  desc: string;
  example?: string;
  output?: string;
};

export const linuxCategories = [
  "Filesystem",
  "Users & Permissions",
  "Processes",
  "Networking",
  "Package Management",
  "Bash Scripting",
  "Searching",
  "Compression",
  "System Monitoring",
  "Security",
];

export const linuxCommands: LinuxCommand[] = [
  // Filesystem
  { cmd: "pwd", category: "Filesystem", desc: "Print working directory", example: "pwd", output: "/home/kali" },
  { cmd: "ls -la", category: "Filesystem", desc: "List files with details, including hidden", example: "ls -la /etc" },
  { cmd: "cd", category: "Filesystem", desc: "Change directory. `cd -` returns to previous.", example: "cd /var/log" },
  { cmd: "mkdir -p", category: "Filesystem", desc: "Create directories including parents", example: "mkdir -p projects/recon/subdomains" },
  { cmd: "cp -r", category: "Filesystem", desc: "Copy files/directories recursively", example: "cp -r src/ backup/" },
  { cmd: "mv", category: "Filesystem", desc: "Move or rename", example: "mv old.txt new.txt" },
  { cmd: "rm -rf", category: "Filesystem", desc: "Remove recursively and forcefully (dangerous)", example: "rm -rf /tmp/oldlogs" },
  { cmd: "cat", category: "Filesystem", desc: "Print file contents", example: "cat /etc/passwd" },
  { cmd: "less", category: "Filesystem", desc: "Paged file viewer", example: "less /var/log/syslog" },
  { cmd: "head -n 20", category: "Filesystem", desc: "First N lines", example: "head -n 20 file.txt" },
  { cmd: "tail -f", category: "Filesystem", desc: "Print & follow last lines (log watching)", example: "tail -f /var/log/nginx/access.log" },
  { cmd: "touch", category: "Filesystem", desc: "Create empty file / update timestamp", example: "touch notes.md" },
  { cmd: "ln -s", category: "Filesystem", desc: "Create symbolic link", example: "ln -s /opt/tools/nmap ~/nmap" },
  { cmd: "stat", category: "Filesystem", desc: "Show file metadata", example: "stat /etc/shadow" },

  // Users & Permissions
  { cmd: "whoami", category: "Users & Permissions", desc: "Current user", output: "kali" },
  { cmd: "id", category: "Users & Permissions", desc: "UID, GID, groups", output: "uid=1000(kali) gid=1000(kali) groups=1000(kali),27(sudo)" },
  { cmd: "sudo -l", category: "Users & Permissions", desc: "List sudo rights for current user (priv-esc gold)" },
  { cmd: "chmod 755", category: "Users & Permissions", desc: "Set permissions octally (rwxr-xr-x)", example: "chmod 755 script.sh" },
  { cmd: "chmod +x", category: "Users & Permissions", desc: "Add execute for all", example: "chmod +x tool.sh" },
  { cmd: "chown user:group", category: "Users & Permissions", desc: "Change file ownership", example: "chown kali:kali file.txt" },
  { cmd: "passwd", category: "Users & Permissions", desc: "Change your password" },
  { cmd: "useradd", category: "Users & Permissions", desc: "Create user (system-level)", example: "useradd -m -s /bin/bash alice" },
  { cmd: "su -", category: "Users & Permissions", desc: "Switch user (login shell)", example: "su - root" },

  // Processes
  { cmd: "ps aux", category: "Processes", desc: "All processes, all users" },
  { cmd: "top", category: "Processes", desc: "Live process view (press q to quit)" },
  { cmd: "htop", category: "Processes", desc: "Interactive top with colors" },
  { cmd: "kill -9", category: "Processes", desc: "Force kill by PID", example: "kill -9 4231" },
  { cmd: "pkill -f", category: "Processes", desc: "Kill by matching command line", example: "pkill -f malware.py" },
  { cmd: "pgrep", category: "Processes", desc: "Find PIDs by name", example: "pgrep -a ssh" },
  { cmd: "jobs / fg / bg", category: "Processes", desc: "Manage background jobs" },
  { cmd: "nohup ... &", category: "Processes", desc: "Run in background surviving logout" },

  // Networking
  { cmd: "ip a", category: "Networking", desc: "Show interfaces and addresses" },
  { cmd: "ip route", category: "Networking", desc: "Routing table" },
  { cmd: "ss -tulpn", category: "Networking", desc: "Listening TCP/UDP sockets with process" },
  { cmd: "netstat -tulpn", category: "Networking", desc: "Legacy equivalent of ss" },
  { cmd: "ping -c 4", category: "Networking", desc: "Send 4 ICMP echo requests", example: "ping -c 4 8.8.8.8" },
  { cmd: "curl -I", category: "Networking", desc: "Fetch HTTP headers only", example: "curl -I https://example.com" },
  { cmd: "wget", category: "Networking", desc: "Download URL to file", example: "wget https://example.com/f.zip" },
  { cmd: "dig", category: "Networking", desc: "DNS lookup", example: "dig example.com ANY +noall +answer" },
  { cmd: "nslookup", category: "Networking", desc: "Classic DNS lookup", example: "nslookup example.com 8.8.8.8" },
  { cmd: "traceroute", category: "Networking", desc: "Trace path to host", example: "traceroute 1.1.1.1" },
  { cmd: "nc -lvnp", category: "Networking", desc: "Netcat listener (reverse shells)", example: "nc -lvnp 4444" },
  { cmd: "ssh user@host", category: "Networking", desc: "Secure shell", example: "ssh -p 2222 kali@10.0.0.5" },
  { cmd: "scp", category: "Networking", desc: "Secure copy over SSH", example: "scp file.txt kali@10.0.0.5:/tmp/" },
  { cmd: "iptables -L", category: "Networking", desc: "List firewall rules" },

  // Package Management
  { cmd: "apt update && apt upgrade", category: "Package Management", desc: "Refresh & upgrade packages (Debian/Kali/Ubuntu)" },
  { cmd: "apt install <pkg>", category: "Package Management", desc: "Install a package" },
  { cmd: "apt search <term>", category: "Package Management", desc: "Search apt repositories" },
  { cmd: "dpkg -l | grep <pkg>", category: "Package Management", desc: "Is a package installed?" },
  { cmd: "pip install <pkg>", category: "Package Management", desc: "Install Python package (prefer venv)" },
  { cmd: "snap install / dnf install / yum install", category: "Package Management", desc: "Other distro package managers" },

  // Bash
  { cmd: "for i in $(seq 1 5); do echo $i; done", category: "Bash Scripting", desc: "For loop 1..5" },
  { cmd: "if [ -f file ]; then ...; fi", category: "Bash Scripting", desc: "Test if file exists" },
  { cmd: "while read line; do ...; done < file", category: "Bash Scripting", desc: "Read file line by line" },
  { cmd: "cmd1 | tee output.txt", category: "Bash Scripting", desc: "Show and save output" },
  { cmd: "cmd > out 2> err", category: "Bash Scripting", desc: "Redirect stdout and stderr separately" },
  { cmd: "cmd &> combined", category: "Bash Scripting", desc: "Redirect both to same file" },
  { cmd: "alias ll='ls -la'", category: "Bash Scripting", desc: "Create alias" },
  { cmd: "export VAR=value", category: "Bash Scripting", desc: "Export env var" },
  { cmd: "$(cmd)", category: "Bash Scripting", desc: "Command substitution" },
  { cmd: "crontab -e", category: "Bash Scripting", desc: "Edit user cron schedule" },

  // Searching
  { cmd: "grep -r 'pattern' .", category: "Searching", desc: "Recursive text search in current dir" },
  { cmd: "grep -Ei 'password|secret' file", category: "Searching", desc: "Case-insensitive extended regex" },
  { cmd: "find / -name '*.conf' 2>/dev/null", category: "Searching", desc: "Find by name, silence errors" },
  { cmd: "find / -perm -4000", category: "Searching", desc: "Find SUID binaries (priv-esc!)" },
  { cmd: "locate", category: "Searching", desc: "Fast filename search (needs updatedb)" },
  { cmd: "which cmd / whereis cmd", category: "Searching", desc: "Find binary paths" },

  // Compression
  { cmd: "tar czf x.tgz dir/", category: "Compression", desc: "Create gzipped tarball" },
  { cmd: "tar xzf x.tgz", category: "Compression", desc: "Extract gzipped tarball" },
  { cmd: "zip -r x.zip dir/", category: "Compression", desc: "Create zip archive" },
  { cmd: "unzip x.zip", category: "Compression", desc: "Extract zip" },
  { cmd: "gzip / gunzip", category: "Compression", desc: "Compress/decompress single files" },

  // System monitoring
  { cmd: "uname -a", category: "System Monitoring", desc: "Kernel/OS info" },
  { cmd: "uptime", category: "System Monitoring", desc: "Load average + uptime" },
  { cmd: "df -h", category: "System Monitoring", desc: "Disk usage per mount, human-readable" },
  { cmd: "du -sh *", category: "System Monitoring", desc: "Directory sizes" },
  { cmd: "free -h", category: "System Monitoring", desc: "Memory usage" },
  { cmd: "systemctl status <svc>", category: "System Monitoring", desc: "Service status" },
  { cmd: "journalctl -u <svc> -f", category: "System Monitoring", desc: "Follow service logs" },
  { cmd: "dmesg | tail", category: "System Monitoring", desc: "Kernel ring buffer" },

  // Security
  { cmd: "openssl s_client -connect host:443", category: "Security", desc: "Inspect TLS handshake & cert" },
  { cmd: "ssh-keygen -t ed25519", category: "Security", desc: "Generate SSH keypair (modern)" },
  { cmd: "gpg --gen-key", category: "Security", desc: "Generate PGP key" },
  { cmd: "md5sum / sha256sum", category: "Security", desc: "Verify file integrity" },
  { cmd: "ufw status / enable / allow 22/tcp", category: "Security", desc: "Simple firewall (Ubuntu)" },
  { cmd: "iptables -A INPUT ...", category: "Security", desc: "Fine-grained firewall rules" },
];
