import React, { useEffect, useRef } from 'react';
import { Terminal as XTerm } from '@xterm/xterm';
import '@xterm/xterm/css/xterm.css';

const Terminal: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new XTerm({
      cursorBlink: true,
      theme: {
        background: '#1e1e1e',
      },
    });

    term.open(terminalRef.current);
    term.writeln('Welcome to the AI Assistant Terminal');
    term.writeln('Type something to interact...');
    term.write('\r\n$ ');

    term.onData((data) => {
      const code = data.charCodeAt(0);
      if (code === 13) {
        // Enter
        term.write('\r\n$ ');
      } else if (code === 127) {
        // Backspace
        term.write('\b \b');
      } else {
        term.write(data);
      }
    });

    xtermRef.current = term;

    return () => {
      term.dispose();
    };
  }, []);

  return <div ref={terminalRef} style={{ height: '300px', width: '100%' }} />;
};

export default Terminal;
