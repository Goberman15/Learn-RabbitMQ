import amqp from 'amqplib';

const produce = async () => {
  try {
    let queue = 'hello';
    let message = 'A message';

    const connection = await amqp.connect('amqp://localhost');

    const channel = await connection.createChannel();

    channel.assertQueue(queue, {
      durable: false
    });

    channel.sendToQueue(queue, Buffer.from(message));
    console.log(` [x] Sent ${message}`);

    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);
  } catch (error) {
    console.error(error);
  }
};

produce();
