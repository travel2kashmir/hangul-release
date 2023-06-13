import { createLogger, stdSerializers} from 'bunyan';
// import { createStream, createLogger, stdSerializers} from 'bunyan-kafka';

    
export const logger = createLogger({
    name: 'engage-theme-logs',
    stream: process.stdout,
    // stream: {
    //   level: 'info',
    //   type: 'raw',
    //   stream: createStream({
    //     kafka: {
    //       topic: 'themelogs',
    //       client: {
    //         kafkaHost: '103.136.36.27:9092'
    //       }
    //     }
    //   })
    // },
    // log INFO and above to stdout    
    serializers: {
      req: reqSerializer,
      res: stdSerializers.res,
      err: stdSerializers.err
    },
  });
  
  // logger.addStream({
  //   level: 'info',
  //   type: 'raw',
  //   stream: bunyanKafka.createStream({
  //     kafka: {
  //       topic: 'themelogs',
  //       client: {
  //         kafkaHost: '103.136.36.27:9092'
  //       }
  //     }
  //   })
  // });

 export function reqSerializer(req) {
    return {
      method: req.method,
      url: req.url,
      headers: req.headers,
      remoteAddress: req.remoteAddress,
      pathName:req.pathName,
      port:req.port
    };
  }

 