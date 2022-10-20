/** @param {NS} ns */
import {list_servers} from '/scripts/lib-servers.js'
// servers with RAM which can hack themselves
var localHackServers = [];
// servers without RAM which cannot be hacked locally
var remoteHackServers = [];
// servers without money but can used to hack
var freeRAMServers = [];

export function getHackScript() {
  return `/scripts/hack.js`;
}

function root(ns,server){
	let hackingPorts = 0;
	// check if we have enough hacking level
	if (ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(server)){
    	if (ns.fileExists('BruteSSH.exe')) {
        	ns.brutessh(server);
			hackingPorts++;
    	}
    	if (ns.fileExists('FTPCrack.exe')) {
        	ns.ftpcrack(server);
			hackingPorts++;
    	}
    	if (ns.fileExists('relaySMTP.exe')) {
        	ns.relaysmtp(server);
			hackingPorts++;
    	}
    	if (ns.fileExists('HTTPWorm.exe')) {
        	ns.httpworm(server);
			hackingPorts++;
    	}
    	if (ns.fileExists('SQLInject.exe')) {
        	ns.sqlinject(server);
			hackingPorts++;
    	}
		// check if we can hack that number of ports
		if(ns.getServerNumPortsRequired(server) > hackingPorts){
			return false;
		}
		else{
			ns.nuke(server);
			return true;
		}
	}
	else return false;
	// if we have enough ports and skill, let's nuke it

			//+ await ns.getServerBaseSecurityLevel(servers[i])
			//+ ":ports-"+ ns.getServerNumPortsRequired(servers[i])
	//nuke(serv);
	//	ns.tprint("Our hacking level:"+ns.getHackingLevel());
}

function deploy(ns,server){
	// hack script
	let hackScript = getHackScript();
	// copy hack script to server
	ns.scp(hackScript, server);
	// define number of threads
	let threads = Math.floor(ns.getServerMaxRam(server) / ns.getScriptRam(hackScript));
	// run hack script on server
	ns.exec(hackScript, server, threads, server);
}

function useLocalHackServers(ns){
	// deploy and run hack script on localHackServers
	for (const server of localHackServers){
		//check if we have root
		if(ns.hasRootAccess(server)){
			deploy(ns,server);
		}
		// otherwise try to root and deploy
		else {
			if (root(ns,server)) deploy(ns,server);
		}
	}
}

function distributeServers(ns){
	let servers = list_servers(ns);
	for (const server of servers){
		if (ns.getServerMaxMoney(server) > 0){
			ns.getServerMaxRam(server) > 0 ? localHackServers.push(server) : remoteHackServers.push(server);
		}
		else freeRAMServers.push(server);
	}
}

export async function main(ns) {
	// hack 
	// get list of servers with RAM - so they can hack themselves
	// create a list of servers which need to be hack remotely
	distributeServers(ns);
	useLocalHackServers(ns);


	//for(var i=0; i<servers.length; i++){
	//	ns.tprint(servers[i]+":" 
	//		+ await ns.getServerBaseSecurityLevel(servers[i])
	//		+ ":ports-"+ ns.getServerNumPortsRequired(servers[i])
	//		+ ":RAM"+ ns.getServerMaxRam(servers[i]));
	//}


	// get list of servers with 1 requirement
	

	// contract solver

	// stock
}