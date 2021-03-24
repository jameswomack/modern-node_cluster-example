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
