/** @param {NS} ns */
function scan(ns, parent, server, list) {
    const children = ns.scan(server);
    for (let child of children) {
        if (parent == child) {
            continue;
        }
        list.push(child);     
        scan(ns, server, child, list);
    }
}

//get list of servers without purchased ones
export function list_servers(ns) {
    const list = [];
    scan(ns, '', 'home', list);
    let servers = list;
    const boughtServers = ns.getPurchasedServers(ns);
    servers = servers.filter(s => !boughtServers.includes(s));
    return servers;
}

export async function main(ns) {
    const args = ns.flags([["help", false]]);
    if (args.help) {
        ns.tprint("This script helps you find servers.");
        ns.tprint(`Usage: run ${ns.getScriptName()}`);
        ns.tprint("Example:");
        ns.tprint(`> run ${ns.getScriptName()}`);
        return;
    }
	ns.tprint(list_servers(ns));
}