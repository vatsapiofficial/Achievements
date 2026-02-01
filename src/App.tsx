import React, { useState } from 'react';
import { Bubble, Sender, Welcome } from '@ant-design/x';
import { Flex, Typography, theme, Button, message } from 'antd';
import { ConsoleSqlOutlined } from '@ant-design/icons';
import ollama from 'ollama/browser';
import Terminal from './Terminal';

const App: React.FC = () => {
  const { token } = theme.useToken();
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);

  const handleSend = async (content: string) => {
    if (!content.trim()) return;

    setLoading(true);
    const userMessageId = Date.now().toString();

    const newMessages = [
      ...messages,
      {
        content: content.trim(),
        role: 'user' as const,
        id: userMessageId,
      },
    ];

    setMessages(newMessages);

    try {
      const response = await ollama.chat({
        model: 'llama3.2',
        messages: newMessages.map((msg) => ({
          role: msg.role === 'ai' ? 'assistant' : 'user',
          content: msg.content,
        })),
      });

      setMessages((prev) => [
        ...prev,
        {
          content: response.message.content,
          role: 'ai',
          id: Date.now().toString(),
        },
      ]);
    } catch (error) {
      console.error('Ollama error:', error);
      message.error('Failed to connect to Ollama. Please ensure it is running.');

      // Fallback to simulated response for demo purposes
      setMessages((prev) => [
        ...prev,
        {
          content: `(Fallback) I couldn't reach Ollama, but I heard you say: "${content}"`,
          role: 'ai',
          id: Date.now().toString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex
      vertical
      style={{
        height: '100vh',
        padding: token.paddingLG,
        backgroundColor: token.colorBgLayout, // Background 2: Secondary background
      }}
      gap="middle"
    >
      <Typography.Title level={2} style={{ textAlign: 'center', margin: 0 }}>
        Ant Design X AI Assistant
      </Typography.Title>

      <Flex
        vertical
        style={{
          flex: 1,
          backgroundColor: token.colorBgContainer, // Background 1: Default element background
          borderRadius: token.borderRadiusLG,
          padding: token.padding,
          overflow: 'hidden',
          boxShadow: token.boxShadowTertiary,
          minWidth: 0, // MUST: Flex children need min-w-0 to allow truncation
        }}
      >
        {messages.length === 0 ? (
          <Flex vertical align="center" justify="center" style={{ flex: 1, minWidth: 0 }}>
            <Welcome
              title="Welcome to Ant Design X"
              description="Start a conversation with your AI assistant built with Ant Design X."
            />
          </Flex>
        ) : (
          <Flex vertical style={{ flex: 1, overflowY: 'auto', minWidth: 0 }} gap="small">
            {messages.map((msg) => (
              <Bubble
                key={msg.id}
                content={msg.content}
                placement={msg.role === 'user' ? 'end' : 'start'}
              />
            ))}
            {loading && (
              <Bubble
                key="loading"
                content="Typing…" // MUST: Use … character
                placement="start"
                typing={{ effect: 'typing', step: 1, interval: 50 }}
              />
            )}
          </Flex>
        )}
      </Flex>

      <Sender
        onSubmit={handleSend}
        placeholder="Type your message here…" // SHOULD: Placeholders end with …
        loading={loading} // MUST: Loading buttons show spinner
        prefix={
          <Button
            type="text"
            icon={<ConsoleSqlOutlined />}
            onClick={() => setShowTerminal(!showTerminal)}
            title="Toggle Terminal"
          />
        }
      />

      {showTerminal && (
        <Flex
          vertical
          style={{
            height: '300px',
            backgroundColor: '#1e1e1e',
            borderRadius: token.borderRadiusLG,
            overflow: 'hidden',
          }}
        >
          <Terminal />
        </Flex>
      )}
    </Flex>
  );
};

export default App;
