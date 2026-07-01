import type { LearningTopic } from "./types";
import { phaseReconnaissance } from "./phases/reconnaissance";
import { phaseScanning } from "./phases/scanning";
import { phaseEnumeration } from "./phases/enumeration";
import { phaseVulnAssessment } from "./phases/vulnerability-assessment";
import { phaseExploitation } from "./phases/exploitation";
import { phasePostExploitation } from "./phases/post-exploitation";
import { toolNmap } from "./tools/nmap";
import { toolWireshark } from "./tools/wireshark";
import { toolBurp } from "./tools/burp";
import { toolGobuster } from "./tools/gobuster";
import { toolHydra } from "./tools/hydra";
import { toolMetasploit } from "./tools/metasploit";
import { toolSqlmap } from "./tools/sqlmap";
import { toolHashcat } from "./tools/hashcat";

export const phases: LearningTopic[] = [
  phaseReconnaissance,
  phaseScanning,
  phaseEnumeration,
  phaseVulnAssessment,
  phaseExploitation,
  phasePostExploitation,
];

export const tools: LearningTopic[] = [
  toolNmap,
  toolWireshark,
  toolBurp,
  toolGobuster,
  toolHydra,
  toolMetasploit,
  toolSqlmap,
  toolHashcat,
];

export const upcomingTools = [
  "Nikto", "Dirsearch", "John", "Responder", "BloodHound", "Amass", "Subfinder",
  "Assetfinder", "theHarvester", "Recon-ng", "Maltego", "Shodan", "Censys",
  "WhatWeb", "Netcat", "Socat", "Feroxbuster", "OWASP ZAP", "Searchsploit",
  "WPScan", "Enum4linux", "CrackMapExec", "ffuf", "Masscan", "Rustscan",
  "DNSrecon", "SMBclient", "Impacket", "LinPEAS", "WinPEAS", "GTFOBins", "LOLBAS",
];

export function getPhase(slug: string) {
  return phases.find((p) => p.slug === slug);
}
export function getTool(slug: string) {
  return tools.find((t) => t.slug === slug);
}
