// Nodes is an array of objects with latitude and longitude properties
let nodes = [    {lat: 41.01, lng: 28.97},    {lat: 41.02, lng: 28.96},    {lat: 41.03, lng: 28.95},    {lat: 41.04, lng: 28.94}];

// Create a list of distances between nodes
let distances = [];
for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
        let d = calculateDistance(nodes[i], nodes[j]);
        distances.push({i: i, j: j, d: d});
    }
}

// Sort the distances in ascending order
distances.sort((a, b) => a.d - b.d);

// Create a list of positions starting from the first node
let positions = [nodes[0]];
let usedNodes = [0];
for (let i = 0; i < distances.length; i++) {
    let node1 = distances[i].i;
    let node2 = distances[i].j;
    if (!usedNodes.includes(node1) || !usedNodes.includes(node2)) {
        usedNodes.push(node1, node2);
        positions.push(nodes[node2]);
    }
    if (usedNodes.length === nodes.length) {
        break;
    }
}

// Calculate the distance between two nodes using the Haversine formula
function calculateDistance(node1, node2) {
    let R = 6371e3; // Earth's radius in meters
    let lat1 = node1.lat * Math.PI / 180;
    let lat2 = node2.lat * Math.PI / 180;
    let deltaLat = (node2.lat - node1.lat) * Math.PI / 180;
    let deltaLng = (node2.lng - node1.lng) * Math.PI / 180;

    let a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;

    return d;
}
