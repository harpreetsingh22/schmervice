'use strict';

const Hapi = require('@hapi/hapi');
const Schmervice = require('@hapipal/schmervice');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    await server.register(Schmervice )   ;

    
    server.registerService(
        class MathService extends Schmervice.Service {

            add() {

                this.server.log(['math-service'], 'Adding');
                console.log("asdd") ;
                return "hello";
            }

            multiply(x, y) {

                this.server.log(['math-service'], 'Multiplying');

                return Number(x) * Number(y);
            }
        }
    );





     server.route([{
         method:'GET' ,
         path:'/' ,
         handler:(request,h)=>{
             return "hii!!" ;
         }
     },{
         method:'GET',
         path:  '/h/{a}/{b}' ,
         handler:(request,h)=>{
             
              const {a,b}=request.params ;
            const { mathService } = request.services();
          
            return mathService.multiply(a,b);
             
             
         }
     }])
    



     console.log(server) ;

      console.log()
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();