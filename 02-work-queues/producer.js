import amqp from 'amqplib';

const produce = async () => {
  try {
    let queue = 'task_queues';
    let message = process.argv.slice(2).join(' ') || 'Empty Message';

    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    channel.assertQueue(queue, { durable: true });

    channel.sendToQueue(queue, Buffer.from(message), {
      persistent: true
    });
    console.log(`[x] Sent ${message}`);

    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);
  } catch (error) {
    console.error(error);
  }
};

produce();
