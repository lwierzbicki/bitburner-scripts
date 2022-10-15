/** @param {NS} ns */
import {list_servers} from 'scripts/lib-servers.js'
import {solveContract} from 'scripts/solve-contract.js'
export async function main(ns) {

	let servers = list_servers(ns);
    for (var i = 0; i < servers.length; ++i) {
	    var contracts = ns.ls(servers[i], "cct");
	    for(var j = 0; j < contracts.length; ++j) {
    		solveContract(ns, servers[i], contracts[j], 0);
	    }
    }
	
}