import {server} from './server/Server';


server.listen(process.env.PORT || 8080, ()=> console.log('App rodando!'));