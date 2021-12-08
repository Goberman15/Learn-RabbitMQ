import amqp from 'amqplib';

const consume = async () => {
  try {
    let queue = 'task_queues';

    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    channel.assertQueue(queue, {
      durable: true
    });

    channel.prefetch(1);

    console.log(` [*] Waiting for messages in ${queue}. To exit press CTRL+C`);

    channel.consume(queue, msg => {
      const content = msg.content.toString();
      const secs = content.split('.').length - 1;

      console.log(`[x] Received ${content}`);

      setTimeout(() => {
        console.log(`[x] Done! Finish processing ${content}`);

        channel.ack(msg);
      }, secs * 1000);
    });
  } catch (error) {
    console.error(error);
  }
};

consume();
