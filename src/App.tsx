import React, { useState } from 'react';
import { Bubble, Sender, Welcome } from '@ant-design/x';
import { Flex, Typography, theme } from 'antd';

const App: React.FC = () => {
  const { token } = theme.useToken();
  const [messages, setMessages] = useState<any[]>([]);

  const handleSend = (content: string) => {
    setMessages((prev) => [
      ...prev,
      {
        content,
        role: 'user',
        id: Date.now().toString(),
      },
    ]);

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          content: `This is a simulated response to: "${content}"`,
          role: 'ai',
          id: (Date.now() + 1).toString(),
        },
      ]);
    }, 1000);
  };

  return (
    <Flex vertical style={{ height: '100vh', padding: token.paddingLG }} gap="middle">
      <Typography.Title level={2} style={{ textAlign: 'center' }}>
        Ant Design X AI Assistant
      </Typography.Title>

      {messages.length === 0 ? (
        <Flex vertical align="center" justify="center" style={{ flex: 1 }}>
          <Welcome
            title="Welcome to Ant Design X"
            description="Start a conversation with your AI assistant built with Ant Design X."
          />
        </Flex>
      ) : (
        <Flex vertical style={{ flex: 1, overflowY: 'auto' }} gap="small">
          {messages.map((msg) => (
            <Bubble
              key={msg.id}
              content={msg.content}
              placement={msg.role === 'user' ? 'end' : 'start'}
            />
          ))}
        </Flex>
      )}

      <Sender
        onSubmit={handleSend}
        placeholder="Type your message here..."
      />
    </Flex>
  );
};

export default App;
