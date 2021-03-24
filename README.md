# Modern Node

## Cluster Example

An example of running cluster on Node 14, including w/ ESM & semantic updates for ES2020


```js
import cluster from 'cluster';
import {createServer} from 'http';
import {cpus} from 'os';

const isMainCluster = cluster.isMaster;
const {length:CPUCount} = cpus();

if (isMainCluster) {
  console.log(`Main ${process.pid} is running`);

  // Fork workers.
  for (let currentCPU = 0; currentCPU < CPUCount; currentCPU++)
    cluster.fork();

  cluster.on('exit', worker =>
    console.log(`worker ${worker.process.pid} died`));
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
  }).listen(8000);

  console.log(`Worker ${process.pid} started`);
}
```

Changes from the current Node.js 'cluster' docs include:
1. Using `import` over `require`
1. Using named imports over the default where feasible 
1. Using clearer, more semantic identifier names, e.g. `currentCPU` v. `i`
1. Replacing archaic terminology, e.g. `Master` w/ `Main`

Output w/ CJS Node code
```sh
> $ node index.js                                                                        ⬡ 14.15.1 [±main ●]
Master 55677 is running
Worker 55678 started
Worker 55679 started
Worker 55684 started
Worker 55683 started
Worker 55682 started
Worker 55681 started
Worker 55680 started
Worker 55686 started
Worker 55685 started
Worker 55687 started
Worker 55688 started
Worker 55689 started
```

Output w/ ESM Node code w/ syntactical & semantic updates
```sh
> $ node index.mjs                                                                       ⬡ 14.15.1 [±main ●]
Main 57290 is running
Worker 57292 started
Worker 57295 started
Worker 57291 started
Worker 57294 started
Worker 57293 started
Worker 57296 started
Worker 57298 started
Worker 57297 started
Worker 57299 started
Worker 57300 started
Worker 57302 started
Worker 57301 started
```
