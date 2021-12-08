import amqp from 'amqplib';

const consume = async () => {
  try {
    let queue = 'hello';

    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    channel.assertQueue(queue, {
      durable: false
    });

    console.log(` [*] Waiting for messages in ${queue}. To exit press CTRL+C`);

    channel.consume(
      queue,
      msg => {
        console.log(msg);
        console.log(` [x] Received ${msg.content.toString()}`);
      },
      {
        noAck: true
      }
    );
  } catch (error) {
    console.error(error);
  }
};

consume();
